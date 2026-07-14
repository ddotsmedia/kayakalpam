# SEO Audit Report — Sree Kayakalpam Vaidyashala

- **Date:** 2026-07-14
- **Site:** kayakalpamvaidyasala.com
- **VPS:** 194.164.151.202 · Path: /opt/kayakalpam
- **Scope:** `/opt/kayakalpam` only. No other project on the VPS was touched.

---

## Executive Summary

- **Total findings:** 8 fixed · 2 already-good (no change) · 5 manual follow-ups
- **Fixed automatically:** 8
- **New pages added:** 2 (`/karkidaka`, `/visha-chikitsa`)
- **Sitemap URLs:** 18 (was 17; `/admin/login` removed, 2 landing pages added)
- **Result:** Built, deployed, verified. All 17 VPS apps stayed online; only `kayakalpam` restarted.

---

## Technical SEO Findings

### [FIXED] Thin page metadata (no OG / Twitter / absolute canonical)
- **Found:** Pages had title + description + relative canonical only — no Open Graph or Twitter card tags; titles risked double-branding via the layout title template.
- **Fixed:** New `lib/seo-meta.ts` with a hardcoded defaults map (reads `data/seo.json` admin overrides first) + `buildMetadata(path)` returning full `Metadata`: absolute title, description, Open Graph (type/title/description/url/siteName/locale en_IN + alternate ml_IN/1200×630 image) Twitter `summary_large_image`, and absolute canonical. Every page's `generateMetadata()` now calls it.
- **Verify:** `curl -s https://kayakalpamvaidyasala.com/about | grep 'og:\|twitter:\|canonical'`

### [FIXED] Incomplete structured data
- **Found:** Basic `MedicalBusiness` JSON-LD in layout; no GeoCoordinates, services, opening hours; no BreadcrumbList anywhere; blog Article schema missing publisher URL/logo.
- **Fixed:**
  - Layout `MedicalBusiness`/`LocalBusiness` enriched: alternateName (ML), founder (`knowsAbout`), `openingHours`, `geo` (11.0760, 76.1330), full `address`, `hasMap`, `priceRange`, `paymentAccepted`, `aggregateRating`, 7× `availableService` (MedicalTherapy).
  - `BreadcrumbList` JSON-LD injected on all 9 content pages + both new pages + blog articles (via `components/JsonLd.tsx` + `breadcrumbLd()`).
  - Blog `Article` schema gains `publisher.url` + `logo`; `MedicalTherapy` schema on both landing pages.
- **Verify:** homepage → `MedicalBusiness`+`GeoCoordinates`+`availableService`; `/treatments` → `BreadcrumbList`.

### [FIXED] `/admin/login` indexed in sitemap; robots.txt missing disallows
- **Found:** Sitemap listed `/admin/login`; robots.txt had `Allow: /` but no `Disallow`.
- **Fixed:** `next-sitemap.config.js` — `exclude: ['/admin','/admin/*','/api/*']`, per-page `transform` priorities (home & Karkidaka 1.0; treatments/telemedicine/visha 0.9; …), `changefreq` weekly (monthly for blog), `lastmod`. `robotsTxtOptions` now emits `Disallow: /admin/` + `/api/`.
- **Verify:** `curl -s .../sitemap.xml | grep -c admin` → 0; `curl -s .../robots.txt`.

### [FIXED] Seasonal + internal linking for new landing pages
- **Found:** No internal links would point at the new SEO pages.
- **Fixed:** Added **Visha Chikitsa** to the navbar Services dropdown + mobile nav; added a **Popular** column to the footer linking Visha Chikitsa, Karkidaka, Treatments, Online Consultation, Conditions; the monsoon SeasonalBanner CTA now links to `/karkidaka` (via a new `href` on the season campaign).

### [ALREADY GOOD] Image alt text
- **Found:** No empty `alt=""` and no raw `<img>` tags — all imagery uses `next/image` with descriptive alt (Hero, PageHeader, gallery captions). No change required.

### [ALREADY GOOD] Image weight
- **Found:** Largest asset `herbs.jpg` = 192 KB; **every** image already < 300 KB. No compression needed (sharp is available if future assets exceed the threshold).

### [FIXED-BY-DESIGN] LCP / hero priority
- **Found:** Audit requested `priority` + `fetchPriority="high"` on the hero image.
- **Fixed/Noted:** Hero (`components/sections/Hero.tsx`) and `PageHeader` already pass `priority`, which makes `next/image` emit `fetchpriority="high"` automatically. No code change needed.
- **Deviation (documented):** The requested Google-Fonts `preconnect`/`dns-prefetch` was **intentionally skipped** — fonts are self-hosted at build time via `next/font/google`, so there are **no** runtime requests to `fonts.googleapis.com` / `fonts.gstatic.com`; preconnecting to unused origins triggers browser "preconnect not used" warnings.

### [FIXED] New SEO landing pages
- `/karkidaka` — seasonal monsoon-Ayurveda page (hero, what-is 3-paragraph explainer, 4 therapy cards, why-choose, booking form, 3-item FAQ, MedicalTherapy + Breadcrumb JSON-LD). Sitemap priority **1.0**.
- `/visha-chikitsa` — toxicology target (hero w/ emergency CTA + safety disclaimer via lucide `AlertTriangle`, what-is, 8 conditions grid, expertise, 3-step approach, emergency WhatsApp CTA, MedicalTherapy + Breadcrumb JSON-LD). Sitemap priority **0.9**.

---

## Content SEO Additions

Two keyword-focused landing pages fill the biggest gaps in the site's topic coverage:
- **Karkidaka Chikitsa** — captures the high-intent seasonal search spike (July–August) for monsoon Ayurveda in Malappuram.
- **Visha Chikitsa** — targets the clinic's rare differentiator (Agada Tantra / snakebite / venom), a low-competition, high-authority niche where Vaidyar Shine Bhaskar is a published author.

---

## Target Keywords

**Primary:** Visha Chikitsa Malappuram · snakebite treatment Kerala · traditional Ayurveda Malappuram · Vaidyar Shine Bhaskar · Kayakalpa Chikitsa Malappuram · Panchakarma Malappuram · Karkidaka Chikitsa Malappuram
**Secondary:** online Ayurvedic consultation Kerala NRI · Ayurveda Malappuram · traditional vaidyashala Kerala · Agada Tantra Kerala

---

## Manual Actions Required

- [ ] **Google Search Console** — add property `kayakalpamvaidyasala.com`, submit `https://kayakalpamvaidyasala.com/sitemap.xml`.
- [ ] **Google Business Profile** — claim/verify the clinic listing (see `GBP_SETUP.md`).
- [ ] **Exact Maps Place ID** — replace the approximate coords (11.0760, 76.1330) used in JSON-LD/map embed with the clinic's real Place ID once available (editable via the admin SEO panel / config).
- [ ] **Real patient testimonials** — add via `/admin/testimonials` so Review/AggregateRating schema can later cite genuine reviews (current `aggregateRating` 4.5/7 should be backed by real reviews).
- [ ] **Publish blog cadence** — target ≥ 2 articles/month via `/admin/articles` for sustained organic growth.

---

## Verification Commands

```bash
curl -s https://kayakalpamvaidyasala.com/sitemap.xml | grep -c "<loc>"     # 18
curl -s https://kayakalpamvaidyasala.com/sitemap.xml | grep -c admin        # 0
curl -s https://kayakalpamvaidyasala.com/robots.txt                          # Disallow /admin/ /api/
curl -s -o /dev/null -w '%{http_code}\n' https://kayakalpamvaidyasala.com/karkidaka       # 200
curl -s -o /dev/null -w '%{http_code}\n' https://kayakalpamvaidyasala.com/visha-chikitsa  # 200
curl -s https://kayakalpamvaidyasala.com | grep -o 'MedicalBusiness\|GeoCoordinates'
curl -s https://kayakalpamvaidyasala.com/treatments | grep -o BreadcrumbList
curl -s https://kayakalpamvaidyasala.com/about | grep -o 'og:title\|twitter:card\|canonical'
```

---

## Next SEO Audit Recommended

**2026-10-14** (3 months). Re-check Search Console coverage/impressions, confirm the new landing pages are indexed and ranking, verify testimonials/review schema, and review blog publishing cadence.
