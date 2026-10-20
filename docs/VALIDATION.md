# Implementation validation

Recorded on 20 October 2026 against the production static export.

CI trace review identified delayed client-side case-study transitions under software WebGL even though route requests completed immediately. Project links now use standard document navigation, keeping static-route navigation independent of scene teardown. Navigation remains covered in desktop, mobile, and no-JavaScript acceptance tests.

## Automated checks

- `npm run lint`: passes with zero warnings.
- `npm run typecheck`: strict TypeScript and generated route types pass.
- `npm run build`: Next.js 16.4.2 production static export succeeds. Only BOR and AI-Powered IDS are generated as case studies.
- `npm test`: four export integrity tests pass (routes, canonical URLs/assets/CNAME, shipped-content audit, absence of source maps).
- `npm run test:browser`: ten Chromium acceptance tests pass, including mobile widths 320/375/390px, tablet 768/1024px, desktop 1440px, keyboard navigation, Escape, anonymous locked cards, working case-study links, pause/play, WebGL unavailable/context loss, reduced motion, data saving, and readable content without JavaScript.
- Automated axe WCAG A/AA checks: zero violations on all three routes at 1440px and 390px.
- `npm audit`: zero reported vulnerabilities in the pinned dependency tree.

Node.js 24.15.0, TypeScript 6.0.3, and Playwright Chromium were used locally. Browser testing uses software WebGL for repeatability. Real-device GPU, Safari/Firefox, and assistive-technology testing remain useful owner review steps; no claim of manual screen-reader certification is made.

## Visual inspection

Reviewed production screenshots of the desktop hero and complete homepage, selected work, locked cards on desktop/mobile, mobile homepage, and both case studies. The sculpture renders with local chrome/violet lighting, all sections are readable, cards remain anonymous, conceptual graphics are labeled, and narrow layouts show no horizontal overflow.

Review images are included in `docs/preview/`. Case-study pages use only the approved short factual narratives; no screenshots, dates, metrics, or source links are invented.

## Publication safety

The original files retain their exact Git blob hashes:

| File         | Git blob SHA                               |
| ------------ | ------------------------------------------ |
| `index.html` | `2e88052b8372768e488639c81592895a8ef6b9a3` |
| `k.png`      | `4bd74cbb19b2f0aa2c00fabae52002e90de9d791` |
| `CNAME`      | `07637ec82edc5d0046fc112b70e3840947b68f50` |

The replacement is confined to the feature branch. No merge, deployment, Pages setting, or domain change was performed. CI only validates. Publishing requires a separately approved manual workflow run on `main` with the approval input enabled.

## Local environment note

Drive C: ran out of space during the first dependency installation. Dependencies, browser binaries, and the production build were moved to a dedicated task directory on drive D:. The source remains in the workspace; the validated build uses a matching source snapshot on D: to avoid Windows cross-drive webpack resolution. No machine-specific paths or TLS workarounds are part of the committed app. Fonts are pinned local Fontsource assets loaded by `next/font/local`, so the build does not depend on Google Fonts requests. Standard `npm ci` / `npm run check` commands remain portable to a normal checkout and CI.
