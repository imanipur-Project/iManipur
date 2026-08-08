# Design System — iManipur

## Overview

iManipur uses a handcrafted dark design system built on CSS custom properties with oklch color values. The visual language is editorial, precise, and sharp — informed by print design traditions and modern web minimalism.

**Stack:** React + TanStack Router + Tailwind CSS v4 + motion/react + Shadcn UI (adapted)

---

## Colors

### Primary Palette

| Token            | Value                     | Use                              |
| ---------------- | ------------------------- | -------------------------------- |
| `--gold-primary` | `oklch(0.697 0.137 79.5)` | Primary accent, CTAs, highlights |
| `--gold-hover`   | `oklch(0.753 0.142 84.1)` | Gold hover state                 |
| `--gold-dark`    | `oklch(0.474 0.093 71.7)` | Secondary gold, muted accents    |
| `--gold-light`   | `oklch(0.853 0.130 90.5)` | Light gold highlights            |

### Backgrounds

| Token          | Value                     | Description                      |
| -------------- | ------------------------- | -------------------------------- |
| `--background` | `oklch(0.182 0.000 89.9)` | Page background (#121212 equiv.) |
| `--surface`    | `oklch(0.134 0.000 89.9)` | Deepest surface (#080808)        |
| `--surface-2`  | `oklch(0.173 0.000 89.9)` | Card background (#101010)        |
| `--surface-3`  | `oklch(0.205 0.000 89.9)` | Elevated card (#171717)          |

### Text

| Token              | Value                     | Description            |
| ------------------ | ------------------------- | ---------------------- |
| `--text-primary`   | `oklch(0.940 0.018 78.2)` | Main text — warm ivory |
| `--text-secondary` | `oklch(0.861 0.019 78.2)` | Body text              |
| `--text-muted`     | `oklch(0.616 0.015 78.2)` | Muted / metadata text  |

### Tailwind Mappings

```
--primary       → var(--gold-primary)
--foreground    → var(--text-primary)
--card          → var(--surface-2)
--muted-foreground → var(--text-muted)
--border        → oklch(0.25 0.005 80) approx.
```

---

## Typography

### Font Families

| Role                 | Font                   | Weight Range |
| -------------------- | ---------------------- | ------------ |
| Display / headings   | **Cormorant Garamond** | 300–600      |
| Body / subtitles     | **Inter**              | 400–600      |
| Mono / labels / code | **IBM Plex Mono**      | 400–500      |

### Type Scale

```css
/* Section labels */
.label-mono {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
}

/* Body */
text-[16px] leading-relaxed   /* standard body */
text-sm leading-[1.7]         /* secondary body */
```

### Typography Rules

- **h1** headline: `font-bold tracking-tight` — max 4xl–6xl scale
- **Section headings**: `h2` with `text-foreground` + `<span className="text-primary">` for accent word
- **Body paragraphs**: left-aligned, `text-muted-foreground` or `text-foreground/80`
- **No orphans** on headings under 500px — use `text-balance`
- **Widows**: avoid single words on final line of paragraphs

---

## Spacing & Layout

- **Max content width:** `max-w-[1200px]` centered
- **Page padding:** `px-5 md:px-8`
- **Section vertical rhythm:** `py-20` for major sections
- **Grid gaps:** `gap-4` (tight), `gap-8` (standard), `gap-12` (loose)
- **SectionRule dividers** between all major sections — gradient line using `--color-primary`

---

## Border Radius

**Zero. Everywhere.**

```css
--radius-sm: 0px;
--radius-md: 0px;
--radius-lg: 0px;
--radius-xl: 0px;
--radius-2xl: 0px;
--radius-full: 0px;
```

No `rounded-*` Tailwind classes. No `border-radius` in any component. The only permitted value is `0`. This is enforced globally in `src/styles.css`.

---

## Components

### Buttons

```
Primary CTA: bg-primary text-primary-foreground px-5 py-2.5 rounded-none
             font-semibold text-[11px] tracking-[0.14em] uppercase
Secondary:   border border-border px-5 py-2.5 rounded-none
             hover:border-primary/60 hover:text-foreground transition
```

### Cards

```
bg-card border border-border p-6 md:p-8
No border-radius ever
Hover: border-primary/50 + shadow-[inset_0_0_15px_rgba(202,146,29,0.1)]
```

### Section Labels

```jsx
<p className="label-mono text-primary/70">Section Name</p>
```

### Section Headings

```jsx
<h2>
  Title with <span className="text-primary">accent word.</span>
</h2>
```

### SectionRule

```jsx
<motion.div
  initial={{ scaleX: 0, opacity: 0 }}
  whileInView={{ scaleX: 1, opacity: 1 }}
  className="section-rule mx-auto"
/>
```

A 1px gradient line: transparent → border → primary → border → transparent.

### FAQ Accordion

Chat-bubble style. Questions are right-aligned gold bubbles. Answers are left-aligned muted bubbles. Uses Shadcn Accordion with hidden chevron.

### Navbar

Slim, sticky. Logo left. Nav links center. Transparent on scroll start, solid on scroll. All links `uppercase tracking-widest text-[11px] font-mono`.

---

## Motion

Framework: `motion/react` (Framer Motion v11+)

### Entry animations

```js
// Section containers
variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}

// Individual items
variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
```

### Scroll parallax

```js
const heroY = useTransform(scrollY, [0, 800], [0, 200]);
const opacity = useTransform(scrollY, [0, 600], [1, 0]);
```

### Rules

- All section entries: `whileInView` + `viewport={{ once: true, margin: "-80px" }}`
- Hover states: `whileHover={{ scale: 1.05 }}` on buttons only, never on cards
- No layout-shift causing animations
- Prefer opacity + translateY; avoid scale on large elements

---

## Design Rules (Do / Don't)

| ✅ Do                           | ❌ Don't                                   |
| ------------------------------- | ------------------------------------------ |
| Use `rounded-none` explicitly   | Use any `rounded-*` class that adds radius |
| Ensure `<html lang="en">`       | Forget the document language attribute     |
| Use CSS custom property tokens  | Hardcode hex or rgb values                 |
| Left-align body paragraphs      | Center body text blocks                    |
| Use `text-balance` on headings  | Let h1/h2 break awkwardly                  |
| Use `oklch()` for new colors    | Use `hex`, `rgb()`, or HSL                 |
| Name sections with `label-mono` | Skip the section label pattern             |
| Use `motion/react` for entries  | Use CSS animations for complex sequences   |
| Keep max-width at 1200px        | Allow content to exceed the grid           |

---

## Impeccable Notes

- **Surface mode:** Persuade (marketing homepage that earns attention)
- **Voice:** Serious, warm, precise. Editorial without being academic. Ambitious without being corporate.
- **Design anti-pattern to flag:** Any `rounded-*` class, any hardcoded color hex, any centered body text.
- **Detector rules:** `design-system-radius` (anything > 0), `design-system-color` (off-palette values)
