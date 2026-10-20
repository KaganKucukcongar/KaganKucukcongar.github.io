# Kağan Küçükçongar — portfolio

A static, accessible **Dark Editorial × Creative Engineering** portfolio built with Next.js App Router, strict TypeScript, Tailwind CSS, React Three Fiber, Three.js, Drei, and Motion. Public copy comes from `docs/CONTENT.md`.

## Run locally

Use Node.js 24 LTS and npm. Dependencies are pinned in `package-lock.json`.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open http://127.0.0.1:3000. The production export can be reviewed with:

```sh
npm run lint
npm run typecheck
npm run build
npm test
npm run test:browser
npm run preview
```

`npm run check` runs the complete validation sequence. Browser tests start the production preview server automatically. `npm run preview` serves **out/**, not the legacy root HTML. On Linux CI, Playwright installs Chromium with `--with-deps`.

## Structure and content

- `src/app`: homepage, the two statically generated case studies, metadata, sitemap, and 404.
- `src/components/three`: lazy-loaded procedural sculpture and its static SVG counterpart. No external models, textures, HDR files, or runtime font requests.
- `src/components/projects`: clearly labeled conceptual artwork, not purported project screenshots.
- `src/content/projects.ts`: approved public content and three anonymous teaser records.
- `src/config/site.ts`: canonical root URL and verified GitHub/email links. LinkedIn is omitted because no verified URL was supplied.
- `src/styles/globals.css`: responsive layout, design tokens, focus states, motion preferences.
- `tests`: static export integrity checks and Chromium acceptance/accessibility tests.

Only `/projects/bor/` and `/projects/ai-ids/` exist. Project 03/04/05 are focusable articles with visual feedback and **no links, buttons, hidden routes, private metadata, or internal project details**. Blur is decoration, not access control. No invented dates, metrics, source links, credentials, or release information are used.

Case-study links use standard document navigation. This keeps static Pages navigation independent of the WebGL scene's React lifecycle, including on software-rendered or slower graphics devices; the new page still uses the restrained entrance transition.

## Performance and accessibility

The content is pre-rendered and remains readable without JavaScript. Fonts are bundled from pinned Fontsource packages and self-hosted using `next/font/local`; builds do not request Google Fonts. The scene is imported separately on eligible desktops, with a capped device pixel ratio and low-power preference. Geometry and lighting are generated locally. Mobile, reduced-motion, data-saving, unavailable WebGL2, scene errors, and context loss use the static sculpture. Rendering pauses when offscreen or the document is hidden; a keyboard-accessible pause/play control is provided. Content transitions never start hidden.

Navigation includes a skip link, visible keyboard focus, an Escape-dismissible mobile menu, and real contact links. Automated axe checks cover WCAG A/AA rules on the homepage and both case studies at desktop/mobile widths. Automated checks do not replace assistive-technology or real-device testing.

The build emits `out/` with trailing-slash routes for GitHub Pages, a root canonical URL, copied `CNAME`, `.nojekyll`, favicon, and generated PNG social artwork. Production browser source maps are disabled. Export tests scan shipped HTML, RSC data, and JavaScript for legacy unpublished project details and verify asset paths.

## Preserve the current publication

The original root `index.html`, `k.png`, and `CNAME` remain unchanged. The Next app is added alongside them; the new export exists only in ignored `out/`. The feature branch and PR do not alter `main` or the Pages hosting configuration. CI validates the new app but does not publish it.

## Publish only after owner approval

1. Review the PR, verify CI, and review the production export on desktop and mobile, including keyboard use and WebGL/reduced-motion fallbacks.
2. Obtain the owner's explicit approval before merging or replacing the published website.
3. After approval and merge, choose **GitHub Actions** as the Pages source in repository Settings → Pages. This is a separate owner-controlled hosting change.
4. Run **Publish portfolio (manual approval only)** on **main**, checking the approval input. The workflow rejects other branches or an unchecked approval, validates/builds the app, uploads only `out/`, and deploys it using the `github-pages` environment. Configure required environment reviewers in repository settings if desired.
5. Verify the published root and both case-study URLs. Preserve the current `CNAME`; obtain separate approval before changing the domain.

There is intentionally no deployment on push, PR, or merge. This implementation task does not run the publishing workflow or modify Pages settings. The workflow becomes available for manual runs after it is merged into the default branch.

To roll back after an approved publication, select/redeploy the previously approved Pages deployment or revert through a reviewed PR and rerun the manual workflow. Keep the original root site available until the replacement is approved.

## Visual review checklist

- Desktop 1440px and tablet 768px: headline composition, sculpture interaction, pause/play, project cards, and contact panel.
- Mobile 320–390px: no horizontal overflow; menu touch targets, cards, and case-study content stay readable.
- Reduced motion and disabled WebGL: static artwork, readable content, functional navigation.
- Keyboard: skip link, menu + Escape, all real links, and locked-card focus feedback.
- Public content: only BOR and AI-Powered IDS have case studies and verified regional awards.

See `docs/VALIDATION.md` for the recorded implementation checks.
