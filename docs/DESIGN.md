# Kağan Küçükçongar — design system

## Central idea

An editorial identity wrapped around an optical bench: the visitor changes how one field is read, from **language** to **signal**. Project concepts are the visual system, rather than decoration attached to a portfolio template. A tactile, sealed archive is the counterpart to the open public exhibits.

## Palette

| Token            | Value     | Use                                                       |
| ---------------- | --------- | --------------------------------------------------------- |
| Warm Paper       | `#F0ECE3` | Identity, BOR, notes, reading surfaces                    |
| Deep Ink         | `#191B1B` | Primary type, inspection bench, IDS, footer               |
| Signal Orange    | `#E75B39` | Selected study, sampling line, contact, spatial accents   |
| Industrial Stone | `#B5B7A9` | Archive ground, secondary ink-surface text, paper backing |
| Muted Steel      | `#536B68` | Secondary paper-surface text, sealed file surface         |

Use deliberate surface changes. The homepage is neither all light nor all dark. Small text uses Ink on Paper/Orange/Stone, Steel on Paper, and Paper/Stone on Ink. Paper text on Steel is supported. Orange is mostly a surface or graphic accent, not small body text on Paper. A darker stamp ink (`#A1361F`) provides readable paper seals.

## Type

- **Manrope**: monumental uppercase name and utilitarian identity; tightly spaced, heavy, with a separate smaller role block.
- **Bricolage Grotesque**: exhibition typography, oversized BOR specimens, spatial letter layers, expressive auxiliary headings.
- **DM Sans**: readable narrative copy.
- **JetBrains Mono**: control labels, inspection instructions, file indices, project metadata.

All are bundled, pinned Fontsource assets hosted via `next/font/local`, including Turkish glyph subsets. No runtime font or asset requests. Type sizes and whitespace establish hierarchy; avoid label overload, logo walls, generic pill tags, and proficiency charts.

## Composition

The owner's name occupies the opening field. A side note identifies his role; it is not replaced by a marketing headline. The bench sits below in an asymmetric layout. BOR uses a rotated, hard-edged paper specimen beside editorial copy. IDS changes the whole ground to Ink and gives synthetic traces more lateral space. Archive files have distinct material patterns, staggered resting angles, tabs, redaction marks, and seals. Personal notes mix a short introduction, learning lists, and factual recognition in one notebook composition. Contact is a clear Orange ground with native links.

No rounded SaaS panels, glowing gradients, metallic sculpture, generic particles, repeated identical project cards, or decorative icons. The header menu icons serve navigation; arrows indicate actual links.

## Interaction and motion

`Experiment` is the shared instrument. A LANGUAGE/SIGNAL tablist switches between different geometric systems. A range input and pointer/touch position drive the same inspection axis. LANGUAGE changes letter spacing and light spatial depth; SIGNAL changes the sampling line and the analytical traces around it. Both remain explicitly conceptual.

SVG is intentional here: glyphs and traces remain sharp, inspectable, lightweight, and independent of WebGL. CSS perspective gives the instrument and sealed files spatial behavior. There are no unrelated 3D objects. Heavy WebGL dependencies from the earlier implementation are removed.

Desktop animation is capped at 25 updates/second and paused offscreen or in a hidden tab. Mobile/data-saving views start paused, with deliberate opt-in animation. Reduced motion keeps geometry static, removes transform/reveal/hover animation, and preserves direct tab/range interaction. Use 180–250ms controls, 250–350ms paper tilt, roughly 600ms purposeful reveals, and 300ms page entrance. Content never starts hidden.

## Mobile and access

Use a separate stacked composition: large first name, single-line surname scaled to the viewport, role below, a compact control desk, vertically arranged exhibits, and unrotated archive files. Touch keeps vertical page scrolling; a slider provides an equally capable alternative to pointer movement. Tabs support arrows/Home/End; focus is visible and Escape closes the menu. Files are labeled articles, never fake buttons. All factual content and native project/contact links remain usable without JavaScript. No hidden project routes exist.

Inspect desktop, tablet, 320–390px mobile, reduced motion, no WebGL, data saving, no JavaScript, keyboard focus, and full page compositions before updating the PR.
