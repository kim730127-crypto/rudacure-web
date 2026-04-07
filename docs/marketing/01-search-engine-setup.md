# Search Engine Verification — Step-by-Step Setup Guide

> Goal: Verify ownership of `www.rudacure.com` on 4 major search consoles within 30 minutes.

## Prerequisites
- Vercel project access (Settings → Environment Variables)
- Email access to `sh.kim@rudacure.com` (for verification emails)
- Already deployed: `src/app/layout.tsx` reads `NEXT_PUBLIC_*_SITE_VERIFICATION` env vars

---

## 1. Google Search Console (HIGHEST PRIORITY)

**Time:** 5 minutes

### Steps
1. Visit https://search.google.com/search-console
2. Click **Add property** → choose **URL prefix** (not Domain)
3. Enter: `https://www.rudacure.com`
4. Choose verification method: **HTML tag**
5. Copy the `content="..."` value from the meta tag (e.g., `abc123def456...`)
6. In Vercel:
   ```
   Settings → Environment Variables → Add New
   Key:   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
   Value: abc123def456...   (paste content value only, no quotes)
   Scope: Production
   ```
7. Redeploy (Vercel → Deployments → "..." → Redeploy)
8. Wait ~2 minutes, return to Search Console, click **Verify**

### After verification
- **Submit sitemap**: Sitemaps → Add new sitemap → enter `sitemap.xml` → Submit
- **Request indexing**: URL inspection → enter `https://www.rudacure.com/en` → Request indexing
- Repeat URL inspection for: `/en/pipeline`, `/en/ir`, `/en/cro`, `/en/about`, `/en/contact`

---

## 2. NAVER Webmaster Tools (Korean traffic)

**Time:** 5 minutes

### Steps
1. Visit https://searchadvisor.naver.com/console/board
2. NAVER 로그인
3. **사이트 등록** → enter `https://www.rudacure.com`
4. 소유확인 → **HTML 태그** 선택
5. Copy the meta tag content value
6. Vercel env var:
   ```
   NEXT_PUBLIC_NAVER_SITE_VERIFICATION=<value>
   ```
7. Redeploy → return to NAVER → 확인

### After verification
- 사이트맵 제출: 요청 → 사이트맵 제출 → `https://www.rudacure.com/sitemap.xml`
- RSS 등록 (선택): News 페이지에 RSS 추가 후 등록 가능
- 웹 페이지 수집: 요청 → 웹 페이지 수집 → 각 핵심 페이지 URL 입력

---

## 3. Bing Webmaster Tools

**Time:** 3 minutes (fastest with Google import)

### Steps
1. Visit https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. **Import from Google Search Console** (recommended — saves verification step)
   - OR manually: Add a Site → enter URL → choose Meta tag verification
4. If manual: copy `content` value → Vercel env var:
   ```
   NEXT_PUBLIC_BING_SITE_VERIFICATION=<value>
   ```
5. Redeploy → Verify

### After verification
- Submit sitemap: Sitemaps → Submit sitemap → `https://www.rudacure.com/sitemap.xml`
- Enable IndexNow: Settings → IndexNow → upload key file (already deployed at `/389da52ef996f0b07c2fd146b724b816.txt`)

---

## 4. Baidu 站长平台 (Chinese traffic)

**Time:** 10 minutes (more friction)

### Note
- Baidu sometimes requires a Chinese ID or company info for full verification
- May not be priority unless China BD/partnership is active
- ICP filing technically required for Chinese hosting, but can index foreign sites

### Steps
1. Visit https://ziyuan.baidu.com/site/index
2. Register Baidu account (Chinese phone number ideal but not strict)
3. 添加网站 → enter `https://www.rudacure.com`
4. 验证方式 → HTML 标签验证
5. Copy content value → Vercel env var:
   ```
   NEXT_PUBLIC_BAIDU_SITE_VERIFICATION=<value>
   ```
6. Redeploy → 验证

---

## 5. Post-Setup: Run IndexNow

After all 4 verifications complete and Vercel has redeployed:

```bash
# From rudacure-web project root
npm run notify-search
```

Expected output:
```
[ping] 200 https://www.google.com/ping?sitemap=...
[ping] 200 https://www.bing.com/ping?sitemap=...
[indexnow] 200 OK (54 URLs submitted)
```

This pushes all 54 URLs to Bing/Yandex/NAVER/Seznam at once via IndexNow.

---

## 6. Verification Checklist

Run this 24 hours after setup to confirm everything works:

| Check | URL | Expected |
|---|---|---|
| Robots accessible | https://www.rudacure.com/robots.txt | 200 OK, contains sitemap line |
| Sitemap accessible | https://www.rudacure.com/sitemap.xml | 200 OK, 54 URLs |
| IndexNow key | https://www.rudacure.com/389da52ef996f0b07c2fd146b724b816.txt | 200 OK, plain text key |
| Schema valid | https://search.google.com/test/rich-results?url=https://www.rudacure.com/en/pipeline | Drug schema detected |
| Schema valid | https://search.google.com/test/rich-results?url=https://www.rudacure.com/en/news/180 | NewsArticle schema detected |

---

## 7. Weekly Maintenance (Set Calendar Reminder)

Every Monday morning, 5 min:
- [ ] Google Search Console → Performance → check impressions/clicks trend
- [ ] NAVER Webmaster → 검색노출 → 키워드 순위 추이
- [ ] Re-run `npm run notify-search` if 5+ new pages have been added
- [ ] Check Coverage report for any new errors
