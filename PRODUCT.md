# Product Context — iManipur

## Platform

web

## Audience

Educators, researchers, cultural contributors, and curious people from Manipur and the Meitei diaspora. The secondary audience is anyone with a serious interest in Northeast Indian culture, history, and language. The visitor is usually informed and intentional — they are not browsing casually. They came because they care.

## Purpose

iManipur is an independent, non-commercial initiative that preserves cultural knowledge and advances education and innovation for Manipur. It is not a government body, a media outlet, or a social network. It is closer to a research collective — one that treats the culture of Manipur with the same seriousness that a university treats scholarship.

## Positioning

Unlike government cultural portals (which are bureaucratic and underdesigned) or social media pages (which are ephemeral and noise-heavy), iManipur is independently operated, editorially serious, and built to last. A neighboring project could not truthfully claim: non-commercial independence + long-term cultural stewardship + serious editorial voice + modern design craft — all four at once.

## Brand Commitments

- **No rounding.** Zero border-radius everywhere. Sharp corners are part of the visual identity — they signal precision, seriousness, editorial discipline.
- **Gold as the single accent color.** `oklch(0.697 0.137 79.5)` — warm, authoritative, not aggressive.
- **Dark background, warm text.** Not pure black; a very dark warm near-black. Not white text; warm ivory (`oklch(0.940 0.018 78.2)`).
- **Editorial left-alignment for body text.** Headers may center; body is left-aligned.
- **No filler.** Every section must justify its presence. No padding content, no vague mission statements that any NGO could copy.
- **Motion serves meaning.** Scroll-triggered reveals, parallax on the hero, fade-in on sections — all purposeful, never decorative.

## Evidence and Constraints

- Active team of 6 contributors spanning tech, academia, creative arts, and education.
- 3 active projects: a folk tales collection, a Meitei language resource, and a historical stories archive.
- The site uses TanStack Router + React + Tailwind CSS v4 + motion/react.
- Shadcn UI components adapted to 0px radius throughout.
- Content is managed via an EditableBlock system with Supabase backend.
- The design system uses CSS custom properties with oklch color values.

## What Must Future Work Preserve

1. Zero border-radius on every element — no exceptions without explicit sign-off.
2. The gold palette (`--gold-primary`, `--gold-hover`, `--gold-dark`, `--gold-light`) as the only accent family.
3. The dark surface system: `--background` (#121212 equivalent), `--surface`, `--surface-2`, `--surface-3`.
4. Warm ivory text, not pure white.
5. The font-mono `label-mono` class pattern for section labels.
6. The `section-rule` gradient divider pattern between major sections.
7. Editorial tone: serious, warm, precise. Not corporate, not casual.
