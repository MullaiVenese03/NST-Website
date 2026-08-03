# NebulaSafeTech — Web Application

Production codebase for **[NebulaSafeTech](https://www.nebulasafetech.com)** — a cybersecurity and digital solutions company based in Hosur, Tamil Nadu, India. Providing VAPT, secure engineering, full-stack web development, UI/UX design, and EdTech training programs.

---

## 🔗 Production URL

- **Live Website**: [https://www.nebulasafetech.com](https://www.nebulasafetech.com)
- **Deployment Platform**: Vercel

---

## 🛠️ Technology Stack

| Category | Technology | Version / Specification |
|---|---|---|
| **Framework** | [React](https://react.dev/) | `18.3.1` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `ES2020` target (strict mode) |
| **Build Tool** | [Vite](https://vitejs.dev/) | `6.4.2` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `4.1.12` (via `@tailwindcss/vite`) |
| **Routing** | [React Router](https://reactrouter.com/) | `7.13.0` (code-split SPA routing) |
| **Animation** | [Motion](https://motion.dev/) | `12.23.24` (Framer Motion) |
| **SEO & Meta** | [react-helmet-async](https://github.com/stayunbroken/react-helmet-async) | `^3.0.0` |
| **Forms** | [Formspree](https://formspree.io/) | `@formspree/react` `^3.0.0` + `@formspree/core` `^4.0.0` |
| **Icons** | [Lucide React](https://lucide.dev/) | `0.487.0` |
| **Image Engine** | [Sharp](https://sharp.pixelplumbing.com/) | `^0.34.5` (dev/build asset generation) |

---

## 📂 Project Structure

```
NST-Website/
├── index.html                      # HTML shell entry point (analytics placeholders, critical CSS)
├── vite.config.ts                  # Vite config (plugins, code splitting, preview CSP headers)
├── vercel.json                     # Vercel deployment config (SPA rewrites, security headers, caching)
├── package.json                    # Dependency manifest and build scripts
├── tsconfig.json                   # TypeScript compiler settings
├── .env.example                    # Environment variable documentation (commit-safe template)
│
├── public/                         # Public static assets
│   ├── robots.txt                  # Search crawler directives referencing sitemap.xml
│   ├── sitemap.xml                 # Production sitemap (auto-generated during build)
│   ├── site.webmanifest            # PWA web manifest
│   ├── favicon.ico                 # Root favicons and apple touch icons
│   ├── og-image.png                # Source image for Open Graph generator
│   ├── og-image.webp               # Production Open Graph share image
│   └── media/                      # 39 optimized responsive media directories (WebP/AVIF)
│
├── scripts/                        # Node.js build-time asset & metadata scripts
│   ├── generate-sitemap.mjs        # Generates public/sitemap.xml for all public routes
│   ├── generate-favicons.mjs       # Generates public root favicons and icons
│   ├── optimize-og.mjs             # Generates public/og-image.webp
│   └── optimize-fonts.mjs          # Subsets TTF font sources into WOFF2 binaries
│
└── src/                            # Source application code
    ├── main.tsx                    # React root entry point
    ├── brandMark.ts                # Brand watermark asset URL reference
    ├── styles/                     # Global CSS, Tailwind v4 imports, theme tokens, font faces
    ├── analytics/                  # GTM, Clarity, Cloudflare Beacon, and route tracking hooks
    ├── seo/                        # SeoHead, JSON-LD schemas, page meta configs, canonical URLs
    ├── imports/                    # Pre-computed inline SVG path data per UI section
    └── app/
        ├── App.tsx                 # Root component with RouterProvider & Vercel telemetry
        ├── routes.tsx              # React Router v7 browser router configuration
        ├── config/                 # Formspree configuration loader
        ├── data/                   # Media manifest, clients data, service detail content
        ├── pages/                  # 8 page components (HomePage, AboutPage, ServicesPage, etc.)
        ├── components/             # 25 reusable UI components
        └── utils/                  # Media srcsets, scroll behavior, form validation helpers
```

---

## 🚀 Available Routes & Pages

All active routes are code-split using React `lazy` and `Suspense`:

| Route Path | Page Component | Description |
|---|---|---|
| `/` | `HomePage.tsx` | Main landing page (hero, services, testimonials, clients) |
| `/about` | `AboutPage.tsx` | Company mission, vision, leadership, and NAP business data |
| `/services` | `ServicesPage.tsx` | Overview of cybersecurity, development, UI/UX, and EdTech services |
| `/services/cybersecurity` | `ServiceDetailPage.tsx` | Cybersecurity assessment & VAPT detail page |
| `/services/web-development` | `ServiceDetailPage.tsx` | Full-stack web engineering detail page |
| `/services/ui-ux-design` | `ServiceDetailPage.tsx` | Product design & UI/UX detail page |
| `/services/edtech-training` | `ServiceDetailPage.tsx` | Institutional cybersecurity training detail page |
| `/clients` | `ClientsPage.tsx` | Partner institutions, client programs grid, and impact statistics |
| `/edtech` | `EdTechPage.tsx` | Academic collaborations, workshops, and student learning paths |
| `/privacy-policy` | `PrivacyPolicyPage.tsx` | Official privacy policy document |
| `/terms-and-conditions` | `TermsAndConditionsPage.tsx` | Terms and conditions document |

---

## 💻 Installation & Local Development

### Prerequisites

- **Node.js**: `18.x` or higher
- **npm**: `9.x` or higher

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MullaiVenese03/NST-Website.git
   cd NST-Website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up local environment variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Start local development server**:
   ```bash
   npm run dev
   ```
   The dev server will run locally at `http://localhost:5173`.

---

## ⚙️ Environment Variables Setup

Environment variables are documented in [.env.example](file:///.env.example). **Never commit active secret files (`.env`, `.env.local`) to version control.**

All client-facing variables use the `VITE_` prefix:

```env
# Formspree Form Hash (from https://formspree.io/forms/<id>)
VITE_FORMSPREE_FORM_ID=xgoqvrkb

# Analytics Controls (enabled automatically in production unless set to false)
VITE_ENABLE_ANALYTICS=true
VITE_GTM_ID=GTM-WTQS44T7
VITE_CLARITY_PROJECT_ID=wum1ijwahj

# GA4 Measurement ID (linked inside Google Tag Manager)
VITE_GA_ID=G-WQXJLGNBT6

# Cloudflare Web Analytics Beacon Token
VITE_CF_BEACON_TOKEN=e27bb43bf2644576bd8d4fee82a98414

# Google Search Console Verification Meta Tag Content
VITE_GSC_VERIFICATION=of0W2w2D8JJApY0VCJZzEVQxsXMUZAOXcIkBuWICAjc
```

---

## 📊 Analytics & Telemetry Architecture

The website uses a non-duplicating multi-tier telemetry stack:

- **Google Tag Manager (GTM)**: Injected into `index.html` via `vite.config.ts`. GA4 property (`G-WQXJLGNBT6`) routes entirely inside GTM tags.
- **Microsoft Clarity**: Initialized via `@microsoft/clarity` NPM package (`src/analytics/clarity.ts`). No duplicate script in GTM.
- **Cloudflare Web Analytics**: Dynamic beacon script loaded in `src/analytics/cloudflareBeacon.ts`.
- **Vercel Analytics & Speed Insights**: Embedded in `src/app/App.tsx` for real-time Web Vitals metrics.
- **SPA Pageview Tracking**: `useRouteAnalytics` hook pushes `event: "page_view"` events to GTM `dataLayer` on route navigation, skipping the initial page load to prevent double-counting.

---

## 🔍 SEO & Metadata Architecture

- **Meta Management**: `SeoHead.tsx` uses `react-helmet-async` to render titles, descriptions, canonical URLs, OG images, and Twitter cards.
- **JSON-LD Schemas**: Injected via `GlobalStructuredData.tsx` and route components (`Organization`, `LocalBusiness`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`).
- **Dynamic Sitemap**: `scripts/generate-sitemap.mjs` runs during `npm run build` to output `public/sitemap.xml` matching all 11 production routes.
- **Search Engine Crawling**: `public/robots.txt` allows full crawling of public routes and references `https://www.nebulasafetech.com/sitemap.xml`.

---

## 📩 Formspree Form Integration

- **Form Component**: `src/app/components/ContactForm.tsx` handles inquiry submissions.
- **Validation**: `src/app/utils/contactFormValidation.ts` enforces client-side rules for name, email format, phone format, and message length.
- **Error Handling**: `src/app/utils/contactFormspree.ts` translates API responses into user-friendly error messages.

---

## 🌐 Build & Vercel Deployment

### Build Script

```bash
npm run build
```

The build process automatically runs:
1. `generate:sitemap` ➔ Generates `public/sitemap.xml`
2. `generate:favicons` ➔ Generates root favicon binaries and WebP icons
3. `optimize:og` ➔ Generates `public/og-image.webp`
4. `vite build` ➔ Bundles assets into `dist/` with gzip/brotli compression and vendor chunk splitting

### Vercel Integration ([vercel.json](file:///vercel.json))

- **SPA Rewrites**: `/(.*)` ➔ `/index.html`
- **Security Headers**: HSTS, Content-Security-Policy (CSP whitelisting GTM, Clarity, Cloudflare, Formspree, Vercel), X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`).
- **Asset Caching**: `Cache-Control: public, max-age=31536000, immutable` for immutable bundle chunks.

---

## 📜 Utility NPM Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local development server (`http://localhost:5173`) |
| `npm run build` | Runs sitemap, favicons, OG generator, and builds production output in `dist/` |
| `npm run preview` | Serves production build locally with CSP header emulation |
| `npm run generate:sitemap` | Regenerates `public/sitemap.xml` from active routes |
| `npm run generate:favicons` | Regenerates favicon assets in `public/` |
| `npm run optimize:og` | Generates `public/og-image.webp` |
| `npm run optimize:fonts` | Subsets TTF fonts in `scripts/font-sources/` to WOFF2 in `src/assets/fonts/` |

---

## 📄 License

This repository is proprietary software belonging to **NebulaSafeTech**. All rights reserved.