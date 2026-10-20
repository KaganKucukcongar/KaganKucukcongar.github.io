# Kağan Küçükçongar — validation record

The visual identity and interaction have been rebuilt around the owner's name, a two-mode language/signal inspection bench, two distinct exhibits, and a sealed archive. The old sculpture, colors, repeated project cards, and generic homepage slogans have been removed from the replacement app.

The portfolio identity uses Kağan Küçükçongar and a KK monogram across navigation, footer, browser metadata, favicon, and sharing artwork. Archive labels use PERSONAL ARCHIVE. The export regression check verifies the owner's page title and excludes retired branding from shipped assets.

## Production validation — 20 October 2026

- `npm run check` passes: lint with zero warnings, strict route/type checks, a successful Next.js 16.4.2 static production build, **5 export integrity tests**, and **11 Chromium acceptance tests**.
- The instrument is tested with keyboard tabs/arrows/Home/End, a keyboard range input, real pointer movement, touch input, and pause/resume. Each changes the intended visual state or inspection axis.
- Native links traverse both exhibits and retain the exact regional awards. Only the two approved project routes are exported.
- Responsive navigation and page overflow checks pass at 320, 375, 390, 768, 1024, and 1440px across all three routes.
- Mobile/data saving starts paused. Reduced motion keeps inspection functional without autonomous motion or perspective. WebGL-disabled browsers receive the same vector instrument. Identity, SVG artwork, case-study content, and contact links remain usable without JavaScript.
- Sealed files are anonymous, keyboard-focusable, and have no links, buttons, hidden routes, private data, percentages, or release dates.
- axe reports **zero automated WCAG A/AA violations** on the homepage and both exhibits at 1440px and 390px. Manual contrast review also corrected secondary text on the stone file surface.
- `npm audit` reports **zero vulnerabilities** after removing the old sculpture dependencies and replacing its display font.
- The export audit verifies canonical URLs, static chunk paths, CNAME, source-map exclusion, absence of legacy private details, and absence of the retired visual palette/slogan from shipped assets.

Desktop LANGUAGE/SIGNAL states, complete desktop/mobile pages, the sealed archive, and both distinct case-study pages were captured and visually reviewed. Current images are in `docs/preview/`. Fonts and graphics are local; no external models, textures, HDR, or font requests are needed.

Validation used Node.js 24.15.0, TypeScript 6.0.3, and Chromium. Real-device ergonomics, Safari/Firefox, and assistive-technology review remain useful owner review steps; automated checks are not screen-reader certification.

The original published file hashes must remain:

- `index.html`: `2e88052b8372768e488639c81592895a8ef6b9a3`
- `k.png`: `4bd74cbb19b2f0aa2c00fabae52002e90de9d791`
- `CNAME`: `07637ec82edc5d0046fc112b70e3840947b68f50`

Local dependencies and builds use the task's dedicated drive D: storage because C: lacked space during the original implementation. The source remains in the workspace, with a matching build snapshot. No machine-specific paths are committed. Standard Node/npm commands run in CI.
