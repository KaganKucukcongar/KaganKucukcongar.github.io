# Creative developer portfolio: implementation brief

## Product intent
Build a polished, young, dynamic, experimental but credible personal portfolio. The style is **Dark Editorial × Creative Engineering**. It should not resemble a corporate SaaS template, classroom exercise, or generic AI-generated cyberpunk page.

## Truth and visibility rules
**Completed, publicly described projects only:**
1. BOR — Turkish Programming Language; TÜBİTAK Kayseri regional first place; Turkish-language programming project aimed at introducing coding to middle school students.
2. AI-Powered IDS — AI-assisted intrusion detection project; TÜBİTAK Kayseri regional second place.

These may have full case-study routes (`/projects/bor`, `/projects/ai-ids`). Do not fabricate implementation details, metrics, dates, source links, award categories, or datasets. If a field is unverified, omit it.

**Other projects:** Show 3 anonymized locked cards titled Project 03/04/05, with statuses Currently Building / Locked / Exploring. No internal project names, features, code, screenshots, client-side payloads, hidden routes, source maps, or metadata. "Locked" is a visual treatment, not access control.

## Stack
- Next.js App Router, TypeScript strict, Tailwind CSS
- React Three Fiber, Three.js, Drei for hero
- Motion for React for restrained UI transitions
- next/font, Lucide icons
- Use compatible current stable package versions. Avoid unnecessary dependencies.

## Routes and sections
Homepage: navigation, 3D hero, About, Selected Work, Locked Projects, Achievements, Skills & Interests, Contact, Footer.
Case studies: `/projects/bor`, `/projects/ai-ids`. No routes for locked work.

## Hero
Large editorial headline, short natural introduction, CTA ("Explore my work" and "Get in touch"), layered procedural abstract 3D sculpture based on connected systems. Subtle cursor parallax and slow rotation. No globes, brains, gratuitous particle clouds, or exaggerated neon.

## Projects
Distinct presentation for each completed project, with full but truthful Challenge / Approach / Outcome structure and verified awards. Use conceptual graphics where no genuine screenshots exist, clearly avoiding fake app mockups presented as real evidence.

## Locked work
Attractive blur, layered depth, lock icon, non-functional details intentionally omitted, pointer/focus feedback, no invented release date or fake progress indicator. Do not create links on these cards.

## Skills
Separate demonstrated skills (Programming, Software Development, AI, Cybersecurity, Problem Solving) from interests and active learning (Computer Science, Software Engineering, Cloud Engineering, Machine Learning, Product Development). Avoid fake numeric proficiency bars or claims of seniority.

## Requirements
- Responsive, accessible semantic markup with keyboard focus and contrast.
- Reduced-motion and WebGL-unavailable fallbacks.
- Lazy-load scene, optimized images/fonts, no horizontal overflow.
- Real links only from site config; do not invent contact details.
- Production build, typecheck, lint, testing, and readable README.
- GitHub Pages: Next.js static export, Pages deployment via GitHub Actions, root-relative paths appropriate to username Pages repository, preserve `CNAME`/existing site until ready.

## Suggested layout
`src/app`, `src/components/{layout,sections,projects,three,ui}`, `src/content`, `src/config`, `src/styles`.

## Acceptance criteria
Fully working desktop/mobile site, intentional art direction, two completed case studies, anonymous locked cards, working nav, 3D fallback, reduced motion, passing checks, no unauthorized public information. Do not deploy or merge without owner approval.
