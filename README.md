# The Open Lab — Kağan Küçükçongar

A personal experiment bench and digital project collection built with Next.js App Router, strict TypeScript, Tailwind CSS, and Motion. The identity, two-mode LANGUAGE/SIGNAL instrument, distinct BOR/IDS exhibits, and sealed archive form one project-led design system. See `docs/DESIGN.md` for the current art direction.

## Run and validate

Use Node.js 24 LTS and npm.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open http://127.0.0.1:3000. To validate the production export:

```sh
npm run check
npm run preview
```

`check` runs lint, strict route/type checks, production build, export/privacy tests, and Chromium acceptance/axe checks. Browser tests start their own static server. On Linux CI the browser install uses `--with-deps`. Individual commands are `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, and `npm run test:browser`.

## Source map

- `src/components/lab`: semantic tabs, optional motion, shared inspection axis, typographic and synthetic signal fields. SVG/DOM is deliberate: no decorative GPU scene, external models, textures, or HDR assets.
- `src/components/archive`: three sealed file surfaces with restrained CSS perspective and keyboard feedback.
- `src/app`: identity/collection/notebook homepage, two static case studies, 404, sitemap, metadata.
- `src/content/projects.ts`: approved facts and anonymous statuses only.
- `src/config/site.ts`: canonical URL and verified GitHub/email. No unverified LinkedIn URL.
- `src/styles/globals.css`: Warm Paper / Deep Ink / Signal Orange / Industrial Stone / Muted Steel, responsive composition, focus and motion behavior.
- `docs/preview`: desktop, mobile, and sealed archive review images.

## Interaction and content boundaries

LANGUAGE arranges B/O/R as typographic specimens, not real BOR syntax. SIGNAL uses analytical synthetic traces, not attack data, live telemetry, or model performance. The visitor's pointer, touch, and labeled range input change the inspection axis. Tabs also work with arrows/Home/End. Motion can be paused, stops offscreen/when hidden, starts paused on mobile/data saving, and is disabled for reduced motion. Mobile has its own stacked composition. All factual content and native project links remain readable and usable without JavaScript.

Only `/projects/bor/` and `/projects/ai-ids/` exist. CASE 003/004/005 are non-opening articles; visual seals/redaction marks contain no hidden private data. No private names, technology details, fake progress, release dates, screenshots, or routes are added. Public awards remain TÜBİTAK Kayseri Regional 1st Place for BOR and Regional 2nd Place for AI-Powered IDS.

Fonts are locally bundled from pinned Manrope, Bricolage Grotesque, DM Sans, and JetBrains Mono packages using `next/font/local`. The scene has no WebGL dependency, so WebGL-disabled browsers receive the same instrument. Static routes use ordinary document navigation. Production source maps are disabled and shipped HTML/JS/RSC are audited for private legacy details.

## Preserve and publish

The original root `index.html`, `k.png`, and `CNAME` remain byte-for-byte unchanged. The Next app sits beside them; `out/` is ignored. `main`, Pages settings, and the published site are untouched by this feature branch and PR #2.

After **separate owner approval** to merge and publish:

1. Review PR #2, its checks, screenshots, and the production export on desktop/mobile and with keyboard/reduced motion.
2. Merge only after explicit owner approval.
3. Select GitHub Actions as the Pages source in repository Settings → Pages, only when the publication is approved.
4. Manually run **Publish portfolio (manual approval only)** on **main** and enable its approval input. It rejects other branches and an unchecked approval, validates/builds, and uploads only `out/`.
5. Check the root and both case-study URLs. Preserve `CNAME`; a domain change needs separate approval.

There is no deployment on push, PR, or merge. No publishing workflow is run as part of this redesign. The export copies CNAME/favicon/`.nojekyll`, emits a PNG social image, uses root canonical URLs and trailing-slash routes, and works on username GitHub Pages.

To roll back after an approved publication, redeploy a previous approved Pages deployment or revert through a reviewed PR and run the manual workflow. Keep the original site files until the replacement has been approved.

See `docs/VALIDATION.md` for the recorded checks and verification limits.
