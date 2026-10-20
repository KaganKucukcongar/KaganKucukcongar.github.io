# The Open Lab — creative and implementation brief

## Concept

Present Kağan Küçükçongar's work as an open experiment bench and a small digital collection. His real identity comes first: **KAĞAN KÜÇÜKÇONGAR / Computer Engineering Student / Software / AI / Experiments**. Use experimental editorial composition, Swiss typographic discipline, and industrial archive cues without copying a reference portfolio.

The previous visual direction is retired. This document and `DESIGN.md` govern new changes.

## Signature

One inspection field has two genuinely different states:

- **01 / LANGUAGE**: B, O, R become movable typographic specimens. A shared inspection axis changes spacing; pointer position gives subtle spatial depth.
- **02 / SIGNAL**: synthetic traces respond to the same inspection axis. Pointer, touch, and a labeled range input move a sampling line through the field.

Keyboard tabs switch states with arrow keys/Home/End. Every control has a real effect. Animation is optional, pauses offscreen/when the document is hidden, and stays off for reduced motion. Mobile and data-saving visitors start with a static field but retain the study switch and inspection control. No WebGL is required; spatial depth belongs to the typography and paper layers.

## Composition

Identity → interactive bench → distinct BOR exhibit → dark signal exhibit → sealed archive → personal field notes → contact. Avoid the familiar slogan/about/card-grid/skill-pill rhythm. Do not add repeated decorative labels or dividers to every section.

BOR and IDS must look like separate exhibits, with their own visual language and dedicated static case studies. BOR is typographic, tactile, and paper-led; IDS is dark, linear, and signal-led. Their awards remain accurate. Case-study narratives retain Idea / Challenge / Approach / Outcome and contain only verified facts.

## Public/private boundary

Public projects:

1. BOR — Turkish Programming Language, for middle school students; TÜBİTAK Kayseri Regional 1st Place.
2. AI-Powered IDS — AI-assisted intrusion detection project; TÜBİTAK Kayseri Regional 2nd Place.

No unverified syntax, implementation stacks, metrics, datasets, screenshots, dates, demos, or source repositories. Conceptual typography is not a BOR code sample. Signal graphics are synthetic, not security evidence.

Other work: **CASE 003 / Currently building**, **CASE 004 / Locked**, **CASE 005 / Exploring**. Three distinct sealed file surfaces with paper layers and focus/hover feedback. They do not open. No progress percentages, release dates, private payloads, or hidden routes. The seal is visual treatment, not access control.

## Technical acceptance

- Next.js App Router, strict TypeScript, Tailwind, local `next/font`, purposeful Motion transitions.
- Responsive layouts without horizontal overflow; readable text and AA contrast; semantic headings and landmarks.
- Mouse, touch, and keyboard inspection; accessible tabs/range/pause; reduced-motion and no-JavaScript content.
- Only `/projects/bor/` and `/projects/ai-ids/`; working canonical root, static assets, sitemap, robots, and 404.
- Static export and GitHub Pages compatibility; preserve original files/CNAME and `main`.
- Lint, typecheck, production build, export/privacy audit, browser tests, axe, and reviewed desktop/mobile screenshots.
- Update existing branch and PR #2. No merge or deployment.
