# Security Audit Report — Sree Kayakalpam Vaidyashala

- **Date:** 2026-07-14
- **Site:** kayakalpamvaidyasala.com
- **VPS:** 194.164.151.202
- **Scope:** `/opt/kayakalpam` + its own nginx site + VPS-wide defensive services (fail2ban). No other project on the VPS was modified.

---

## Executive Summary

- **Total findings:** 9 actionable (+ 6 checks that already passed)
- **Critical:** 0 | **High:** 0 | **Medium:** 4 | **Low:** 5
- **Fixed automatically:** 9
- **Requires manual action:** 2 (npm moderate advisory, SSH password auth)
- **Result:** All automated fixes applied, built, deployed, and verified. All 17 VPS apps remained online throughout; only `kayakalpam` was restarted.

---

## Findings

### [MEDIUM] App bound to all network interfaces (0.0.0.0:3080)
- **Status:** FIXED
- **Found:** `next start -p 3080` bound to `*:3080` (all interfaces). UFW (default-deny incoming, 3080 not allowed) already blocked external access, but the bind was not restricted at the app layer.
- **Fixed:** `ecosystem.config.js` → `args: "start -p 3080 -H 127.0.0.1"` and `env.HOSTNAME=127.0.0.1`; `pm2 delete && start` to apply. Now binds `127.0.0.1:3080`.
- **Verify:** `ss -tlnp | grep 3080` → `127.0.0.1:3080`

### [MEDIUM] Missing HTTP security headers
- **Status:** FIXED
- **Found:** Only `X-Frame-Options` and `X-Content-Type-Options` present. Missing HSTS, Referrer-Policy, Permissions-Policy, X-XSS-Protection; `server_tokens` not explicitly disabled.
- **Fixed:** Added full header set (with `always`) + `server_tokens off;` to the kayakalpam nginx server block, and a `headers()` block in `next.config.ts` (incl. `no-store` + `noindex` for `/admin/*`).
- **Verify:** `curl -sI https://kayakalpamvaidyasala.com | grep -iE 'strict-transport|referrer|permissions|x-xss'`

### [MEDIUM] Media upload lacked content validation & rate limiting
- **Status:** FIXED
- **Found:** `/api/admin/media/upload` checked extension only — no magic-byte verification, no rate limit, no explicit path-traversal guard (a `.jpg`-named non-image or a crafted name could pass).
- **Fixed:** Rewrote the route: auth → rate-limit (20/IP/hr) → 5 MB size cap → extension allow-list → **magic-byte check** (JPEG/PNG/WEBP signatures) → `sanitise.filename()` → resolved-path traversal guard (`startsWith(IMAGES_DIR)`).
- **Verify:** upload a renamed `.txt` → `400 "File content does not match type"`.

### [MEDIUM] fail2ban protected SSH only
- **Status:** FIXED
- **Found:** fail2ban running with a single `sshd` jail; no nginx jails, no `jail.local`.
- **Fixed:** Added `/etc/fail2ban/jail.local` — hardened defaults (bantime 1h, findtime 10m, maxretry 5, `ignoreip 127.0.0.1/8 ::1`) + enabled `sshd`, `nginx-http-auth`, `nginx-limit-req`. Config validated; auto-revert guard was in place in case restart failed.
- **Verify:** `fail2ban-client status` → 3 jails.

### [LOW] No web-server blocking of dotfiles / sensitive extensions / CMS probes
- **Status:** FIXED
- **Found:** nginx served any path to Next with no deny rules for `.env`, `.git`, `.sql`, backups, or `wp-*`/`.php` scanner probes.
- **Fixed:** Added nginx `location` deny blocks: dotfiles (**`.well-known` excluded** so ACME cert renewal keeps working), sensitive extensions `env|git|sql|bak|log|sh|config` (**`.json` intentionally excluded** — Next requires it), and `wp-admin|wp-login|.php|phpmyadmin|xmlrpc`. Also added request limits (`client_max_body_size 6M`, body/header/send timeouts, keepalive 15s).
- **Verify:** `curl -sI https://kayakalpamvaidyasala.com/.env` → 404; `/wp-login.php` → 404.

### [LOW] Middleware had no scanner / attack-tool blocking
- **Status:** FIXED
- **Found:** Middleware only did admin cookie gating.
- **Fixed:** Added a suspicious-UA block (`sqlmap, nikto, nmap, masscan, zgrab, python-requests, go-http-client, dirbuster, hydra, havij`) → 403, exempting `127.0.0.1` (health checks). Broadened `matcher` to run site-wide (excluding static assets) so the block is effective everywhere; admin cookie logic stays path-scoped.
- **Note (deviation):** The audit's supplied Fix-D middleware would have `401`'d `/api/admin/auth` and `/api/admin/track` for un-cookied requests, **breaking login and analytics**. I merged the scanner block into the existing correct middleware that exempts those two public endpoints instead.
- **Verify:** `curl -H 'X-Real-IP: 8.8.8.8' -H 'User-Agent: sqlmap' http://127.0.0.1:3080/` → 403; normal UA → 200.

### [LOW] No centralised input sanitisation
- **Status:** FIXED
- **Found:** No `lib/sanitise.ts`; user input persisted/echoed with validation (zod on contact) but no defence-in-depth sanitisation.
- **Fixed:** Added `lib/sanitise.ts` (`text`, `phone`, `filename`, `html`, `slug`, `deep`). Applied:
  - `/api/contact` → `text` on name/message/treatmentInterest/email, `phone` on phone.
  - `/api/admin/articles` → `html` on contentEn/contentML (strips `<script>`/`<iframe>`/`on*=`/`javascript:`), `text` on titles/excerpt/tags, `slug` on slug.
  - `/api/admin/content` → `deep` sanitise of all string fields.
  - `/api/admin/media/upload` → `filename`.
- **Verify:** article with `<script>` in body is stored stripped.

### [LOW] No shared rate-limit utility; upload route unprotected
- **Status:** FIXED
- **Found:** contact / admin-auth / track had working inline rate limits, but the upload route had none and there was no reusable limiter.
- **Fixed:** Added `lib/rate-limit.ts` (`rateLimit`, `getIP`) and applied it to the upload route (20/IP/hr). Existing inline limiters on contact (5/hr), admin-auth (5/15min) and track (throttled) were left intact — they already function.
- **Verify:** 21 uploads within an hour from one IP → 21st returns 429.

### [INFO / PASS] Checks that already passed (no change needed)
- **Status:** VERIFIED
- Sensitive files not web-exposed: `.env`, `.env.local`, `package.json`, `.git/config`, `data/*.json` all → **404**.
- Admin routes protected: `/admin` → **307**, `/api/admin/analytics` → **401**.
- `iron-session` hardened: `httpOnly`, `secure` (prod), `sameSite=strict`, 8h maxAge, password from 64-char `ADMIN_SECRET`.
- `ADMIN_SECRET` set (64 chars) — no change required.
- No world-writable files under the project (excluding node_modules/.next/data).
- `data/` is **not** under `public/` and not web-reachable (`/data/articles.json` → 404).
- UFW active, default-deny incoming; port 3080 not in the external allow-list.
- TLS cert valid (Let's Encrypt, ~63 days to expiry, auto-renewing via certbot).

---

## Manual Actions Required

### [MANUAL] npm — 2 moderate advisories (postcss via Next)
- `postcss <8.5.10` (GHSA-qx2v-qp2m-jg93, XSS in CSS stringify output) is pulled in transitively by `next`. `npm audit fix` (non-breaking) does **not** resolve it; the only fix is `npm audit fix --force`, which **downgrades Next to 9.x (breaking)** — NOT applied per policy.
- **Risk:** Low in practice — this is a build-time CSS-stringification issue, not a runtime vector for this SSR site.
- **Recommendation:** Upgrade Next when a release bundling `postcss ≥ 8.5.10` is available, then re-run `npm audit`.

### [MANUAL] SSH — password authentication effectively enabled
- `sshd -T` reports `passwordauthentication yes` (from `/etc/ssh/sshd_config.d/50-cloud-init.conf`, which overrides the `no` in `60-cloudimg-settings.conf`). `PermitRootLogin` is `prohibit-password` (key-only root — good).
- **Recommendation:** Disable password auth (keys only) by setting `PasswordAuthentication no` in `50-cloud-init.conf` (or a higher-priority drop-in). **Not changed** — per audit scope this is log-only, and it is a shared host-level setting affecting all VPS access.

### [INFO] Duplicate security headers
- A few headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) are emitted by **both** nginx and Next per the audit's design. Harmless; can be de-duplicated later by choosing a single layer.

---

## Verification Commands (re-run the audit)

```bash
# Headers
curl -sI https://kayakalpamvaidyasala.com | grep -iE 'strict-transport|x-frame|x-content|referrer|permissions|x-xss'
# Port binding (expect 127.0.0.1:3080)
ss -tlnp | grep 3080
# Sensitive files (all 404)
for f in .env .env.local package.json .git/config data/articles.json data/submissions.json; do
  echo "$f → $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3080/$f)"; done
# nginx deny blocks (404)
curl -s -o /dev/null -w '%{http_code}\n' https://kayakalpamvaidyasala.com/.env
curl -s -o /dev/null -w '%{http_code}\n' https://kayakalpamvaidyasala.com/wp-login.php
# Admin protection (307 / 401)
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3080/admin
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3080/api/admin/analytics
# Scanner UA block (403 external, 200 normal)
curl -s -o /dev/null -w '%{http_code}\n' -H 'X-Real-IP: 8.8.8.8' -H 'User-Agent: sqlmap' http://127.0.0.1:3080/
# fail2ban / SSL / nginx
fail2ban-client status
certbot certificates | grep -A1 kayakalpamvaidyasala | grep Expiry
nginx -t
```

---

## Next Audit Recommended

**2026-10-14** (3 months). Re-run the verification commands above, re-check `npm audit`, and confirm the Next/postcss advisory can be cleared by then.
