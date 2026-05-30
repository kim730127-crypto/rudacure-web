# LinkedIn auto-posting (Seunghoon Kim personal account)

Post English content (text + image + first comment) to your own LinkedIn feed
via the official Posts API. Claude drafts → you approve → Claude runs `post.mjs`.

- `auth.mjs` — one-time OAuth, saves `token.json` (gitignored)
- `post.mjs` — publishes a post (text + optional image + optional first comment)
- `token.json`, `.env.linkedin` — secrets, **never committed**

---

## One-time setup (you do this once)

### 1. Create a LinkedIn developer app
1. Go to https://developer.linkedin.com/ → **My Apps** → **Create app**.
2. Associate it with the **RudaCure LinkedIn Page** (you must be a Page admin).
3. Submit. The app is created in dev mode — fine for posting to your own profile.

### 2. Add the required products
On the app's **Products** tab, request (both are self-serve):
- **Share on LinkedIn** → grants `w_member_social` (post on your behalf)
- **Sign In with LinkedIn using OpenID Connect** → grants `openid profile` (to resolve your member URN)

### 3. Register the redirect URL
On the **Auth** tab → **Authorized redirect URLs for your app**, add exactly:
```
http://localhost:3737/callback
```

### 4. Create the env file
Copy your **Client ID** and **Client Secret** (Auth tab) into a new file
`scripts/linkedin/.env.linkedin` (gitignored):

```
LINKEDIN_CLIENT_ID=xxxxxxxxxxxx
LINKEDIN_CLIENT_SECRET=xxxxxxxxxxxx
LINKEDIN_REDIRECT_URI=http://localhost:3737/callback
LINKEDIN_VERSION=202505
```

### 5. Authorize (gets your token)
```
node scripts/linkedin/auth.mjs
```
A browser opens → approve → token is saved to `token.json`.
The access token lasts ~60 days; re-run this command when it expires.

---

## Posting (Claude runs this after you approve a draft)

Text + image + first comment (link):
```
node scripts/linkedin/post.mjs \
  --text-file /tmp/li-draft.txt \
  --image /path/to/photo.jpg \
  --alt "RCI001 Phase 2 milestone graphic" \
  --comment "More on our platform → https://www.rudacure.com/en/science"
```

Preview without posting:
```
node scripts/linkedin/post.mjs --text-file /tmp/li-draft.txt --dry-run
```

Flags: `--text` / `--text-file`, `--image`, `--alt`, `--comment`, `--dry-run`.

---

## Notes
- **Confirm-before-publish:** Claude always shows the final draft and waits for
  your "go" before running `post.mjs`. No blind auto-publishing.
- Links go in `--comment` (first comment), not the body — LinkedIn suppresses
  reach on posts with outbound links in the body.
- Hashtags: write them in the body text; `#` is preserved.
- Voice/format rules: see `../../docs/marketing/05-linkedin-playbook-seunghoon-kim.md`.
