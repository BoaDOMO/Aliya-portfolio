# Design System

This document describes the current visual design as implemented in the React + shadcn + Tailwind v4 codebase.

---

## Stack

- **Framework**: React 19 + TypeScript 6 + Vite 8
- **UI Components**: shadcn (base-ui)
- **Styling**: Tailwind CSS v4 + `tw-animate-css`
- **Icons**: `@phosphor-icons/react`
- **Theme**: `next-themes` with `class` strategy (`class="dark"` on `<html>`)
- **Animation**: Framer Motion (page transitions, message animations), CSS transitions (micro-interactions)

---

## Brand Colors — Light Mode

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#FCFCF9` | Page background — flat near-white |
| `--foreground` | `#1A1A1A` | Body text, headings |
| `--card` | `#FFFFFF` | Card, sheet, popover backgrounds |
| `--card-foreground` | `#1A1A1A` | Card text |
| `--primary` | `#185FA5` | Blue accent — buttons, links, focus rings, hero headings |
| `--primary-foreground` | `#FFFFFF` | Text on primary bg |
| `--secondary` | `#E6DECF` | Beige — alternate backgrounds, muted elements |
| `--secondary-foreground` | `#1A1A1A` | Text on secondary bg |
| `--muted` | `#E6DECF` | Muted section backgrounds (skills, education) |
| `--muted-foreground` | `#787878` | Secondary text, dates, role titles |
| `--accent` | `#E6DECF` | Hover/tab backgrounds |
| `--accent-foreground` | `#1A1A1A` | Text on accent |
| `--destructive` | `#d32f2f` | Error states |
| `--border` | `rgba(0,0,0,0.08)` | Borders, dividers |
| `--input` | `rgba(0,0,0,0.08)` | Input borders |
| `--ring` | `#185FA5` | Focus rings |
| `--surface` | `#9CAF88` | Sage — navbar, footer background |

## Brand Colors — Dark Mode

Dark mode is activated via `class="dark"` on `<html>` (set by `next-themes`). FOUC prevention script in `<head>` reads `localStorage('aliya-theme')` and applies the class before first paint.

| Token | Value | Notes |
|---|---|---|
| `--background` | `#0A0A0A` | Obsidian page background |
| `--foreground` | `#F3F4F6` | Near-white body text |
| `--card` | `#18181A` | Card, sheet, popover backgrounds |
| `--primary` | `#A3B18A` | Electric Sage — replaces blue as primary accent |
| `--primary-foreground` | `#0F172A` | Text on primary (dark for contrast on sage) |
| `--secondary` | `#161618` | Subtle beige replacement |
| `--muted` | `#161618` | Muted section backgrounds |
| `--muted-foreground` | `#6B7280` | Secondary text |
| `--accent` | `#161618` | Hover/tab backgrounds |
| `--surface` | `rgba(11,17,32,0.85)` | Frosted navy glass for navbar |
| `--destructive` | `#EF4444` | Error states |
| `--border` | `rgba(255,255,255,0.06)` | Subtle light borders |
| `--ring` | `#A3B18A` | Sage focus rings |

All blue accent elements in light mode shift to sage in dark mode.

---

## Card Glow & Shadows

Cards get a warm top-glow via CSS `::before` pseudo-element:

```css
--card-glow: radial-gradient(ellipse at 50% 0%, rgba(255, 235, 200, 0.65) 0%, rgba(255, 240, 225, 0.3) 40%, transparent 80%);
```

Dark mode uses a subtle sage glow:

```css
--card-glow: radial-gradient(ellipse at 50% 0%, rgba(163, 177, 138, 0.04), transparent 70%);
```

Shadows:

| Token | Light | Dark |
|---|---|---|
| `--shadow-card` | `0 0 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.03)` | `0 4px 16px rgba(0,0,0,0.7)` |
| `--shadow-card-hover` | `0 0 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.05)` | `0 16px 56px rgba(0,0,0,0.9)` |

---

## Page Background

- **Light mode**: flat `#FCFCF9` — no gradient, cards provide visual contrast
- **Dark mode**: radial gradient `#0f0f18 → #0A0A0A → #050508` for depth

---

## Typography

All fonts loaded via Google Fonts in `index.html`:

| Font | Usage | CSS Variable |
|---|---|---|
| `Archivo Narrow` 400–700 | Hero name, display headings | `--font-display` |
| `Inter` 300–700 | Body, nav, buttons, headings (h2–h6) | `--font-sans` |
| `JetBrains Mono` 400, 500 | Labels, code, body text (p, li) | `--font-mono` |

Body text uses Inter with `line-height: 1.625`. The `font-mono` utility class is applied to `<p>` and `<li>` elements for a distinctive body-text feel. Paragraphs use `leading-relaxed`.

---

## Layout

- **Container**: `max-w-7xl` centered with `px-6` side padding
- **Navbar**: fixed pill shape (`rounded-full`), `h-12 px-4 mt-3`, `bg-surface`, always visible
- **Section dividers**: `section + section` hairline border via CSS `@layer base`

---

## Components

### Navbar

- Fixed pill, `bg-surface` sage in light mode / frosted navy glass in dark
- Desktop: logo left, links right (NavLinkItem with `text-foreground/60` resting, `text-foreground` active/hover)
- Mobile: hamburger sheet (shadcn `<Sheet>`) with collapsible Lab submenu
- ModeToggle (sun/moon) at `text-foreground/60` resting → `text-foreground` on hover via outline button's `hover:text-foreground`
- No transparent-at-top state — always solid

### ModeToggle

- shadcn `<Button variant="outline" size="icon">`
- `<Sun>` / `<Moon>` icons from `@phosphor-icons/react`
- CSS transition: rotate + scale swap on theme change
- Resting text color: `text-foreground/60` (inherited from button)

### Card

- shadcn `<Card>` (`data-slot="card"`)
- `py-4` padding, `gap-4` between children
- `::before` pseudo-element for warm glow overlay
- White bg light / `#18181A` dark

### Button

- shadcn `<Button>` via `@base-ui/react`
- Variants: `default` (primary fill), `outline` (border + transparent bg), `secondary` (beige), `ghost` (transparent), `destructive`, `link`
- `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`

### Timeline

- Custom component (`<Timeline>`, `<TimelineItem>`)
- Left border line, dot markers (`h-3 w-3`, `bg-dark-blue` light / `ring` dark)
- Current role: `animate-ping` pulse effect on dot
- Uses Lucide `CalendarBlank` icon for date display

### FloatingLabelInput / FloatingLabelTextarea

- Custom components wrapping shadcn `<Input>` / `<Textarea>`
- Cream `bg-background` in light mode
- Label animates from center to top-left (`-translate-y-1/2` → `-translate-y-[calc(100%+0.125rem)]` `scale-75`) on focus/fill
- Wrappers use `flex-1` in flex layout so textarea fills available space

### BackToTop

- Fixed bottom-right button (`right-6 bottom-6`)
- Hidden until 300px scroll (`opacity-0 pointer-events-none`)
- SVG progress ring (`circle` with `stroke-dasharray`/`stroke-dashoffset` driven by scroll position)
- `CaretUp` icon from `@phosphor-icons/react`

### SectionLabel

- Eyebrow-style label (`text-xs font-semibold tracking-wider text-muted-foreground`)
- Accepts optional `className` for overrides

### FadeInWhenVisible

- Wraps children in `motion.div` with `whileInView={{ opacity: 1, y: 0 }}`
- Single trigger, 0.4s ease-out

### Lab Hero Card

- Wrapped in `<Card>` matching Profile summary pattern
- `<SectionLabel>` + heading + underline bar
- Projects listed below in `bg-muted/30` alternating section

### Contact Form

- Two-column layout: heading + contact info (Phone, Email, LinkedIn) left, form card right
- Form uses `<FloatingLabelInput>` and `<FloatingLabelTextarea>` for each field
- Card uses `pb-0` on `<Card>` + `pb-4` on `<CardContent>` for even padding
- Textarea uses `field-sizing: fixed` to fill flex space
- **Formspree POST** with loading, success, and error states
- Submit button sits at bottom of flex chain

### Footer

- Simple `border-t` with muted-foreground text
- Copyright line

---

## RAG Chatbot Page

- `POST /api/chat` Vercel serverless function using Google Gemini 2.5 Flash
- Two-column layout: Dashboard (left, 360px) + ChatArea (right, flex)
- Dashboard shows: status, pipeline stage visualization, session stats, suggestion chips, company picker
- ChatArea: message bubbles (user: primary bg, bot: muted bg), typing indicator, suggestion chips, input with Enter-to-send
- 12 pre-built company templates with full persona + knowledge base
- State persisted to `localStorage`

---

## Animations

- **Page load**: `<main>` fades in 0.4s `cubic-bezier(0.16, 1, 0.3, 1)` via CSS `@keyframes page-fade-in`
- **Chat messages**: Framer Motion `AnimatePresence` with stagger delay
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables page animation

---

## Icons

All icons from `@phosphor-icons/react`:
- Navigation: `List` (hamburger), `CaretDown` (submenu)
- Theme: `Sun`, `Moon`
- Chat: `PaperPlaneTilt`, `User`, `Buildings`, `Copy`, `Stop`
- UI: `CaretUp` (back-to-top), `Buildings` (company picker)
- Timeline: `CalendarBlank` (Lucide)

---

## Theme Toggle

- FOUC prevention: inline `<script>` in `<head>` reads `localStorage('aliya-theme')`, applies `dark` class if needed
- `next-themes` handles runtime theme switching
- Persisted to `localStorage` key `aliya-theme`

---

## Spacing & Radii

All values via shadcn defaults overridden in `@theme`:

- Radius: `0.625rem` base (`--radius`), with `--radius-sm` through `--radius-4xl` scale (0.6× to 2.6×)
- Spacing: standard Tailwind v4 scale (p-2 = 8px, p-4 = 16px, etc.)

Component-level spacing:
- Navbar: `h-12 px-4`
- Card body: `py-4 gap-4 px-4` (children), `px-4` on both CardHeader/CardContent
- Section padding: `py-16` or `py-12`
- Chat messages: `p-4 space-y-4`
- Form inputs: `p-3` (Textarea), `h-8` (Input)

---

## Selection Colors

```css
::selection {
  background: #1A1A1A;
  color: #F5F1E8;
}
.dark ::selection {
  background: #F3F4F6;
  color: #0A0A0A;
}
```

---

## Section Separator

```css
section + section {
  border-top: 1px solid var(--border);
}
```

Automatically adds a hairline separator between adjacent sections. No class needed.
