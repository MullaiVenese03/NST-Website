# NebulaSafeTech — SEO & Analytics Setup

Production site: **https://www.nebulasafetech.com**

## Environment variables (Vercel / host)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_ENABLE_ANALYTICS` | No | `true` / `false`. Default: enabled on production builds only. |
| `VITE_GTM_ID` | No | Default: `GTM-WTQS44T7` |
| `VITE_CLARITY_PROJECT_ID` | No | Default: `wum1ijwahj` |
| `VITE_CF_BEACON_TOKEN` | No | Cloudflare Web Analytics token |
| `VITE_GSC_VERIFICATION` | No | Google Search Console meta verification string |
| `VITE_FORMSPREE_FORM_ID` | Yes (forms) | Formspree form hash |

Copy `.env.example` to `.env.local` for local testing with analytics.

## Google Tag Manager

Container: **GTM-WTQS44T7**

Snippets are injected at build time into `index.html` (head + body noscript).

### GA4 (configure in GTM — not in repo)

1. Open [Google Tag Manager](https://tagmanager.google.com/) → container `GTM-WTQS44T7`
2. **Tags** → New → **Google Analytics: GA4 Configuration**
3. Enter your Measurement ID (`G-XXXXXXXX`)
4. Trigger: **All Pages**
5. For SPA route changes, create:
   - **Trigger**: Custom Event → Event name `page_view`
   - **Tag**: GA4 Event `page_view` (or use GA4 Configuration with History Change if you prefer)
6. **Submit** → Publish

The React app pushes `page_view` to `dataLayer` on client-side navigations (after the first load).

## Microsoft Clarity

Project ID: **wum1ijwahj** (injected in `<head>` on production builds).

Dashboard: [https://clarity.microsoft.com/](https://clarity.microsoft.com/)

Do **not** add a second Clarity tag in GTM.

## Cloudflare Web Analytics

1. Cloudflare dashboard → Analytics → Web Analytics → Add site
2. Copy the beacon **token**
3. Set `VITE_CF_BEACON_TOKEN` on Vercel → redeploy

## Google Search Console

1. Add property: `https://www.nebulasafetech.com`
2. Verify via HTML tag → copy the `content` value only into `VITE_GSC_VERIFICATION`
3. Submit sitemap: `https://www.nebulasafetech.com/sitemap.xml`
4. Link GA4 property to GSC (Admin → Product links)

## Sitemap

Generated on each build:

```bash
npm run generate:sitemap
```

Source of truth: `SITEMAP_STATIC_PATHS` in `src/seo/pageMeta.ts` (keep in sync with `scripts/generate-sitemap.mjs`).

## Google Business Profile (off-site)

Match NAP exactly:

- **Name:** NebulaSafeTech
- **Phone:** +91 63810 13086
- **Email:** info@nebulasafetech.com
- **Address:** Hosur, Tamil Nadu, India
- **Website:** https://www.nebulasafetech.com

Suggested categories: Cybersecurity service, Software company, Educational consultant.

List services aligned with `/services/*` URLs.

## Deployment

```bash
npm run build
```

Build order: sitemap → OG image optimize → Vite bundle.

After deploy:

1. Browser DevTools → Console: no CSP errors for GTM/Clarity/GA4
2. Network: `gtm.js`, Clarity, `collect` (GA4) on load and after in-app navigation
3. GTM Preview mode on staging/production URL

## Post-launch checklist

- [ ] GSC property verified and sitemap submitted
- [ ] GTM container published with GA4 Configuration tag
- [ ] GA4 receiving page views (initial + SPA navigations)
- [ ] Clarity recordings visible
- [ ] Cloudflare beacon active (if token set)
- [ ] Rich Results Test: Organization, LocalBusiness, FAQ on `/services`
- [ ] Lighthouse: SEO 100, Performance 90+ on `/`, `/services`, `/services/cybersecurity`
- [ ] GBP claimed with matching NAP and website link
- [ ] Only one GA4 config in GTM (no duplicate tags)

## Architecture

| Layer | Location |
|-------|----------|
| GTM + Clarity | `index.html` placeholders + `vite.config.ts` inject plugin |
| SPA page views | `src/analytics/useRouteAnalytics.ts` |
| Cloudflare | `src/analytics/cloudflareBeacon.ts` |
| Meta / JSON-LD | `src/seo/` |
| CSP | `vercel.json` |

Vercel Analytics and Speed Insights remain enabled in `App.tsx`.
