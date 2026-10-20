# Dark Editorial × Creative Engineering — Design and motion specification

## Visual intent
Young, dynamic, creative and engaging but not childish or overly corporate. Distinctive typography and composition should remain compelling even if 3D is disabled.

## Tokens
- background: `#0B0D12`
- surface: `#151923`
- elevated: `#222937`
- text-primary: `#F4F1EB`
- text-secondary: `#A6ACBA`
- accent-lime: `#D7FF72`
- accent-violet: `#9276FF`
- border: `#303543`

Use lime as a selective interactive accent and violet for restrained 3D detailing. Avoid continuous rainbow gradients and aggressive neon.

## Fonts
- Display: Space Grotesk (500–700)
- UI / body: DM Sans (400–600)
- Technical metadata: JetBrains Mono (400–500)

Fluid hero sizing approximately 88–104px on desktop (space permitting), 42–60px on mobile. Comfortable readable body size.

## Layout
Maximum container ~1320px. Asymmetric editorial grid, strong whitespace and typography, 48–72px desktop gutters, 24–40px tablet, 20–24px mobile.

Hero: left headline and CTA, right procedural interactive 3D sculpture.  
About: short editorial text, two columns on large screens.  
Completed work: two distinct featured cards, dedicated case study routes.  
Locked work: three compact mysterious dark cards with a lock icon and limited hover effect.  
Achievements: prominent typographic rankings, no fake dates.  
Skills: separate demonstrated work from interests.  
Contact: distinctive contrasting lime block with genuine contact CTAs.

## 3D scene
Abstract sculpture expressing interconnected systems: chrome/frosted-glass geometries, rings/layers, soft lighting, gentle idle rotation and cursor parallax. Responsive adaptive pixel ratio; load lazily. Support fallback without WebGL, on smaller/slower devices, and for reduced-motion preference.

Avoid orbiting globes, floating AI brains, full-screen particle storms, meaningless pseudo-code and motion causing scroll jank.

## Timing
Button hover 160–220ms  
Card hover 220–350ms  
Section reveal 450–700ms  
Hero reveal sequence 700–1100ms  
Route transitions 250–450ms

Prefer CSS transforms/opacity. No animation should obscure reading, require hover, or block keyboard interactions.

## Quality
- Mobile-first robustness, no horizontal overflow
- Touch, keyboard and focus states
- WCAG AA-level contrast where possible
- Semantic HTML and descriptive headings
- Lazy-loaded heavy code, optimized media and fonts
- Reduced-motion behavior respected
- No fake loading screens, fake interactive elements, meaningless statistics or repeated generic cards

Test desktop/mobile with WebGL enabled and disabled before publication.
