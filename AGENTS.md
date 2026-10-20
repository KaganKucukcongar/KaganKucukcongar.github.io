# Codex instructions: personal portfolio redesign

Before editing application code, read:
1. `docs/BRIEF.md`
2. `docs/CONTENT.md`
3. `docs/DESIGN.md`

This repository currently deploys a live static portfolio from `main`, including `index.html`, `k.png`, and `CNAME`. **Do not delete or overwrite the live site until the replacement is implemented, tested, and explicitly approved.** Work on the feature branch and propose changes through a pull request.

Goal: implement a distinctive, high-performance, accessible 3D personal portfolio with Next.js, TypeScript, Tailwind CSS, React Three Fiber/Three.js, and Motion. Two completed projects may have public case studies: BOR and AI-Powered IDS. All other work is locked and anonymized. Never invent credentials, dates, technology stacks, screenshots, repository links, or releases.

GitHub Pages hosts static output, so configure Next.js static export (`output: 'export'`) and use a compatible GitHub Actions Pages deployment workflow. Ensure static routes, assets, and the site's canonical root URL work. Preserve the existing CNAME until the owner approves a domain change.

Read the existing site before implementing. First outline the approach, then implement the complete website. Run typecheck, lint, tests where present, and production build. Document how to test and publish. Do not merge or deploy without approval.
