#!/usr/bin/env node
// Post to the authenticated member's LinkedIn feed via the Posts API.
// Supports text, an optional image (3-step upload), and an optional first
// comment (e.g. the outbound link, which we keep out of the post body so
// LinkedIn doesn't suppress reach).
//
// Auth first: node scripts/linkedin/auth.mjs   (creates token.json)
//
// Usage:
//   node scripts/linkedin/post.mjs --text-file draft.txt --image photo.jpg \
//        --alt "Lab photo" --comment "More: https://www.rudacure.com/en"
//   node scripts/linkedin/post.mjs --text "Short post" --dry-run
//
// Flags:
//   --text "..."        post body (or use --text-file)
//   --text-file PATH    read post body from a UTF-8 file
//   --image PATH        attach one image
//   --alt "..."         image alt text (accessibility; default generic)
//   --comment "..."     add a first comment after publishing (e.g. the link)
//   --dry-run           print the resolved payload and exit without posting

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const API = "https://api.linkedin.com";

function loadEnv() {
  try {
    const raw = readFileSync(join(HERE, ".env.linkedin"), "utf8");
    const env = {};
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
    return env;
  } catch {
    return {};
  }
}

function loadToken() {
  let tok;
  try {
    tok = JSON.parse(readFileSync(join(HERE, "token.json"), "utf8"));
  } catch {
    console.error("No token.json — run: node scripts/linkedin/auth.mjs");
    process.exit(1);
  }
  if (tok.expires_at && Date.now() > tok.expires_at) {
    console.error("Access token expired — re-run: node scripts/linkedin/auth.mjs");
    process.exit(1);
  }
  return tok;
}

function parseArgs(argv) {
  const a = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--dry-run") a.dryRun = true;
    else if (k === "--text") a.text = argv[++i];
    else if (k === "--text-file") a.textFile = argv[++i];
    else if (k === "--image") a.image = argv[++i];
    else if (k === "--alt") a.alt = argv[++i];
    else if (k === "--comment") a.comment = argv[++i];
  }
  return a;
}

// Posts API "commentary" uses Little Text format: these characters must be
// backslash-escaped. We intentionally do NOT escape '#' so trailing hashtags
// still render as tags.
function escapeCommentary(s) {
  return s.replace(/[\\()\[\]{}<>@|*_~]/g, (c) => `\\${c}`);
}

const env = loadEnv();
// LinkedIn-Version (YYYYMM). Versions are active ~12 months; bump when expired.
// process.env override lets us change it without editing the credentials file.
const VERSION = process.env.LINKEDIN_VERSION || env.LINKEDIN_VERSION || "202601";
const token = loadToken();
const args = parseArgs(process.argv.slice(2));

let body = args.text;
if (args.textFile) body = readFileSync(args.textFile, "utf8");
if (!body || !body.trim()) {
  console.error("No post text. Use --text or --text-file.");
  process.exit(1);
}
body = body.trim();

const headers = {
  Authorization: `Bearer ${token.access_token}`,
  "Content-Type": "application/json",
  "LinkedIn-Version": VERSION,
  "X-Restli-Protocol-Version": "2.0.0",
};

async function uploadImage(imagePath) {
  // 1. initialize upload
  const initRes = await fetch(`${API}/rest/images?action=initializeUpload`, {
    method: "POST",
    headers,
    body: JSON.stringify({ initializeUploadRequest: { owner: token.member_urn } }),
  });
  const init = await initRes.json();
  if (!initRes.ok) throw new Error(`image init failed: ${JSON.stringify(init)}`);
  const { uploadUrl, image } = init.value;

  // 2. PUT the binary
  const bytes = readFileSync(imagePath);
  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token.access_token}` },
    body: bytes,
  });
  if (!putRes.ok) throw new Error(`image upload failed: HTTP ${putRes.status}`);
  return image; // urn:li:image:...
}

async function main() {
  let imageUrn = null;
  if (args.image) imageUrn = args.dryRun ? "urn:li:image:DRYRUN" : await uploadImage(args.image);

  const payload = {
    author: token.member_urn,
    commentary: escapeCommentary(body),
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };
  if (imageUrn) {
    payload.content = { media: { id: imageUrn, altText: args.alt || "RudaCure" } };
  }

  if (args.dryRun) {
    console.log("DRY RUN — payload that would be posted:\n");
    console.log(JSON.stringify(payload, null, 2));
    if (args.comment) console.log(`\nFirst comment:\n${args.comment}`);
    return;
  }

  const res = await fetch(`${API}/rest/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!(res.status === 201 || res.status === 200)) {
    const err = await res.text();
    throw new Error(`post failed: HTTP ${res.status} — ${err}`);
  }
  const postUrn = res.headers.get("x-restli-id");
  console.log(`✅ Posted: ${postUrn}`);
  if (postUrn) {
    console.log(`   View: https://www.linkedin.com/feed/update/${encodeURIComponent(postUrn)}`);
  }

  // Optional first comment (e.g. the outbound link)
  if (args.comment && postUrn) {
    const cRes = await fetch(
      `${API}/rest/socialActions/${encodeURIComponent(postUrn)}/comments`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          actor: token.member_urn,
          object: postUrn,
          message: { text: escapeCommentary(args.comment) },
        }),
      },
    );
    if (cRes.ok || cRes.status === 201) console.log("   ✅ First comment added.");
    else console.log(`   ⚠️  Comment failed: HTTP ${cRes.status} — ${await cRes.text()}`);
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
