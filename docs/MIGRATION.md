# Tailwind CSS Migration

Migrate the vanilla CSS to Tailwind CSS v4 while preserving the exact visual appearance.

## Strategy

**Zero HTML changes.** The existing HTML files stay untouched. Only the CSS pipeline and `style.css` content change. Tailwind compiles into the same `style.css` file that pages already reference.

## Phase 1 — Build Pipeline Setup

1. Install `postcss-cli` and `@tailwindcss/postcss`
2. Create `postcss.config.js` with the Tailwind plugin
3. Create `src/style.css` as entry point with `@import "tailwindcss"` + `@theme` tokens + original CSS content
4. Add build scripts to `package.json`
5. Build output overwrites `style.css`

## Phase 2 — Token Mapping

All existing design values become Tailwind theme tokens:

| Token | Value | Usage |
|---|---|---|
| `--color-cream` | `#F5F1E8` | Page background |
| `--color-beige` | `#EDE9DF` | Section backgrounds |
| `--color-green` | `#9CAF88` | Nav, footer |
| `--color-blue` | `#185FA5` | Accent, links |
| `--color-dark-blue` | `#26428b` | Strong accents |
| `--color-near-black` | `#1A1A1A` | Dark text |
| `--color-text-gray` | `rgb(85, 85, 85)` | Body text |
| `--color-text-muted` | `rgb(120, 120, 120)` | Secondary text |
| `--color-label-gray` | `#999999` | Labels |
| `--color-card` | `#FFFFFF` | Card surfaces |
| `--color-border` | `rgba(0,0,0,0.08)` | Borders |
| `--color-red` | `#d32f2f` | Form errors |
| `--font-body` | system stack | Body, nav, buttons |
| `--font-display` | Georgia, serif | Headings |
| `--font-mono` | monospace stack | Labels, code |

## Phase 3 — CSS Conversion

Go through `style.css` section by section, replacing hardcoded values with `@apply`:

```
Global styles → Nav → Hero → Buttons → Skills → Timeline → Contact Form → Animations → Media Queries
```

Each rule like:
```css
.main-wrapper {
  max-width: 2560px;
  margin: 0 auto;
  background: #F5F1E8;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
```
Becomes:
```css
.main-wrapper {
  @apply bg-cream max-w-[2560px] mx-auto min-h-screen flex flex-col;
  min-width: 320px;
  overflow-x: hidden;
}
```

## Phase 4 — Media Queries

Migrate `mediaqueries.css` rules into `src/style.css` using Tailwind responsive variants where appropriate, keeping exact breakpoint values (700px, 1024px, 1920px, 2560px).

## What Stays

- All `@keyframes` animations
- All HTML structure unchanged
- All JavaScript
- Font Awesome CDN
- External page styles (CV, RAG Chatbot inline styles)

## Verification

After each phase, build and compare pages visually on 375px, 768px, 1440px, and 2560px viewports to ensure no visual drift.
