#!/usr/bin/env node
// LinkedIn OAuth 2.0 (3-legged) — one-time authorization to obtain a member
// access token with `w_member_social` (post on your own behalf) + OpenID to
// resolve your member URN. Saves to scripts/linkedin/token.json (gitignored).
//
// Prereq: a LinkedIn developer app with the "Share on LinkedIn" and
// "Sign In with LinkedIn using OpenID Connect" products, and this exact
// redirect URL registered. Configure scripts/linkedin/.env.linkedin first.
//
// Usage:  node scripts/linkedin/auth.mjs

import http from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFile } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const path = join(HERE, ".env.linkedin");
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    console.error(`Missing ${path}. Copy .env.linkedin.example and fill it in.`);
    process.exit(1);
  }
  const env = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

const env = loadEnv();
const CLIENT_ID = env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = env.LINKEDIN_REDIRECT_URI || "http://localhost:3737/callback";
const SCOPES = "openid profile w_member_social";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("LINKEDIN_CLIENT_ID / LINKEDIN_CLIENT_SECRET not set in .env.linkedin");
  process.exit(1);
}

const port = Number(new URL(REDIRECT_URI).port || 3737);
const state = `rc_${Date.now().toString(36)}`;

const authUrl =
  "https://www.linkedin.com/oauth/v2/authorization?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state,
    scope: SCOPES,
  }).toString();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== new URL(REDIRECT_URI).pathname) {
    res.writeHead(404).end("Not found");
    return;
  }
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400).end(`OAuth error: ${error} — ${url.searchParams.get("error_description")}`);
    console.error("OAuth error:", error, url.searchParams.get("error_description"));
    server.close();
    process.exit(1);
  }
  if (returnedState !== state) {
    res.writeHead(400).end("State mismatch");
    server.close();
    process.exit(1);
  }

  try {
    // Exchange code -> access token
    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });
    const token = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(`Token exchange failed: ${JSON.stringify(token)}`);

    // Resolve member URN via OpenID userinfo
    const infoRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const info = await infoRes.json();
    if (!infoRes.ok) throw new Error(`userinfo failed: ${JSON.stringify(info)}`);

    const out = {
      access_token: token.access_token,
      refresh_token: token.refresh_token || null,
      expires_at: Date.now() + (token.expires_in ?? 0) * 1000,
      refresh_token_expires_at: token.refresh_token_expires_in
        ? Date.now() + token.refresh_token_expires_in * 1000
        : null,
      member_urn: `urn:li:person:${info.sub}`,
      name: info.name || null,
      saved_at: new Date().toISOString(),
    };
    writeFileSync(join(HERE, "token.json"), JSON.stringify(out, null, 2));

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(
      `<h2>✅ LinkedIn authorized</h2><p>Signed in as <b>${out.name ?? out.member_urn}</b>.<br/>Token saved. You can close this tab and return to the terminal.</p>`,
    );
    console.log(`\n✅ Authorized as ${out.name ?? out.member_urn}`);
    console.log(`   Token saved to scripts/linkedin/token.json`);
    console.log(`   Access token expires: ${new Date(out.expires_at).toLocaleString()}`);
    if (!out.refresh_token) {
      console.log("   ⚠️  No refresh_token returned — re-run this script when the token expires (~60 days).");
    }
    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500).end(String(e));
    console.error(e);
    server.close();
    process.exit(1);
  }
});

server.listen(port, () => {
  console.log(`Opening LinkedIn authorization in your browser...`);
  console.log(`If it doesn't open, visit:\n${authUrl}\n`);
  execFile("open", [authUrl]); // macOS — no shell, no injection risk
});
