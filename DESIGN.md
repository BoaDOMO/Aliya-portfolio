# Current Design System

This document describes the existing visual design as implemented in `style.css` and the HTML pages.

---

## Brand Colors — Light Mode

| Name        | Value                | Usage                                                            |
| ----------- | -------------------- | ---------------------------------------------------------------- |
| Cream       | `#F5F1E8`            | Page background base                                             |
| Beige       | `#E6DECF`            | Alternate section backgrounds (skills, education)                |
| Sage Green  | `#9CAF88`            | Navigation bar, footer                                           |
| Blue        | `#185FA5`            | Hero headings, links, accent elements, focus rings               |
| Dark Blue   | `#26428b`            | Skill icons, timeline dots, photo borders, some buttons/headings |
| Near Black  | `#1A1A1A`            | Nav text, button bg (send), strong text                          |
| Text Gray   | `rgb(85, 85, 85)`    | Body text, list items                                            |
| Text Muted  | `rgb(120, 120, 120)` | Secondary text, role titles, dates                               |
| Label Gray  | `#999999`            | Form labels, info labels                                         |
| White       | `#FFFFFF`            | Card backgrounds                                                 |
| Red (error) | `#d32f2f`            | Invalid form input borders                                       |

## Brand Colors — Dark Mode

Dark mode is activated via `data-theme="dark"` on `<html>`, persisted to `localStorage('theme')`. A FOUC-prevention script in `<head>` reads the stored preference (or system `prefers-color-scheme`) before first paint.

### Token Overrides (`src/tokens.css`)

All light-mode tokens are overridden inside `:root[data-theme="dark"]`:

| Token                    | Value                                                                            | Notes                                                          |
| ------------------------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `--color-cream`          | `#0A0A0A`                                                                        | Matte Obsidian page background                                 |
| `--color-beige`          | `#161618`                                                                        | Alternate section background                                   |
| `--color-green`          | `#0D0D0D`                                                                        | (Reserved, nav/footer use `rgba(11, 17, 32, 0.85)` with glass) |
| `--color-blue`           | `#A3B18A`                                                                        | Electric Sage — primary accent replaces blue                   |
| `--color-dark-blue`      | `#8CA07A`                                                                        | Distinct muted sage — secondary accent (nav/photo/timeline)    |
| `--color-sage-hover`     | `#8A9E78`                                                                        | Hover state for sage elements                                  |
| `--color-blue-hover`     | `#8A9E78`                                                                        | Hover state for blue/sage accent elements                      |
| `--color-dark-text`      | `#0F172A`                                                                        | Dark text on glass elements (sage buttons in dark mode)        |
| `--color-success`        | `#34D399`                                                                        | Success states (RAG chatbot badges)                            |
| `--color-warning`        | `#f59e0b`                                                                        | Warning states                                                 |
| `--color-info`           | `#60A5FA`                                                                        | Info states                                                    |
| `--color-near-black`     | `#F3F4F6`                                                                        | Near-white text                                                |
| `--color-text-gray`      | `#9CA3AF`                                                                        | Body text                                                      |
| `--color-text-muted`     | `#6B7280`                                                                        | Secondary text                                                 |
| `--color-label-gray`     | `#6B7280`                                                                        | Labels                                                         |
| `--color-card`           | `#18181A`                                                                        | Card backgrounds                                               |
| `--color-border`         | `rgba(255, 255, 255, 0.06)`                                                      | Subtle light borders on dark                                   |
| `--color-red`            | `#EF4444`                                                                        | Errors                                                         |
| `--dm-card-shadow`       | `0 4px 16px rgba(0, 0, 0, 0.7)`                                                  | Card shadow (dark)                                             |
| `--dm-card-hover-shadow` | `0 16px 56px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.06)`            | Card hover shadow (dark)                                       |
| `--card-glow`            | `none`                                                                           | Disables warm glow in dark mode                                |
| `--card-glow-dark`       | `radial-gradient(ellipse at 50% 0%, rgba(163, 177, 138, 0.04), transparent 70%)` | Subtle sage top-glow on dark cards                             |

### Additional Background Tokens

Defined in `:root` and `:root[data-theme="dark"]` blocks (not Tailwind theme tokens):

| Token                 | Light                                                                        | Dark                                                                        |
| --------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `--bg-gradient-light` | `radial-gradient(ellipse at 50% 30%, #FCF8F0 0%, #F5F1E8 50%, #EDE6DF 100%)` | —                                                                           |
| `--bg-gradient-dark`  | —                                                                            | `radial-gradient(ellipse at 50% 0%, #0f0f18 0%, #0A0A0A 50%, #050508 100%)` |

### Key Design Decisions (Dark Mode)

| Element                  | Light                                              | Dark                                                                         |
| ------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| Page background          | Warm radial gradient `#FCF8F0 → #F5F1E8 → #EDE6DF` | Cool deep radial gradient `#0f0f18 → #0A0A0A → #050508` + 1.5% noise texture |
| Nav / Footer             | Sage `#9CAF88`                                     | Frosted navy `rgba(11, 17, 32, 0.85)` + `blur(14px)`                         |
| Nav links text           | Near-black `#1A1A1A`                               | Near-white `var(--color-near-black)`                                         |
| Nav logo                 | Near-black                                         | Near-white                                                                   |
| Primary accent           | Blue `#185FA5`                                     | Electric Sage `#A3B18A`                                                      |
| Secondary accent         | Dark blue `#26428b`                                | Electric Sage (same)                                                         |
| Hero name / headings     | Blue                                               | Sage                                                                         |
| Skill icons / arrows     | Dark blue                                          | Sage                                                                         |
| Timeline dots            | Dark blue                                          | Sage                                                                         |
| Back-to-top button       | Dark blue                                          | Sage + frosted `blur(10px)` → hover `blur(14px)`                             |
| Skill cards              | White + enhanced golden glow + warm crisp shadow   | `var(--color-card)` `#18181A` + subtle sage glow + glass border              |
| Buttons (filled)         | Near-black `var(--color-near-black)`        | Sage `rgba(163, 177, 138, 0.88)` + frosted `blur(8px)`, glass border, text `#0F172A` |
| Buttons (filled hover)   | Black `#000000` + warm layered shadow        | Darker sage `#8A9E78`                                                        |
| Buttons (outlined)       | Near-black border/text, transparent           | Sage border/text, transparent                                                  |
| Buttons (outlined hover) | Fills near-black                              | Fills frosted sage                                                              |
| Contact form card        | White + enhanced golden glow + warm crisp shadow   | `var(--color-card)` + frosted `blur(14px)` + subtle sage glow                |
| Form inputs              | Cream `#F5F1E8`                                    | `#1A1A1A`                                                                    |
| Tagline / hero text      | `var(--color-text-muted)`                          | `var(--color-near-black)` (near-white)                                       |
| Footer text              | Near-black                                         | `var(--color-text-gray)`                                                     |

### Nav & Footer (Dark Mode)

- Background: frosted `rgba(11, 17, 32, 0.85)` with `backdrop-filter: blur(14px)`
- Border: `1px solid var(--color-border)`
- Menu dropdown: solid `#0B1120`, matches nav
- Theme toggle button: near-white icon, `backdrop-filter: blur(8px)` with frosted hover

### Glass Morphism (Dark Mode)

Frosted glass is applied to the following elements in dark mode only:

| Element                                        | `backdrop-filter`                 | Background                               |
| ---------------------------------------------- | --------------------------------- | ---------------------------------------- |
| Nav (`#nav`)                                   | `blur(14px)`                      | `rgba(11, 17, 32, 0.85)`                 |
| Footer                                         | `blur(14px)`                      | `rgba(11, 17, 32, 0.85)`                 |
| Skill cards (`.skill-category`)                | `blur(12px)` → hover `blur(24px)` | `var(--color-card)` + `--card-glow-dark` |
| Contact form card (`.contact-form-card`)       | `blur(14px)`                      | `var(--color-card)` + `--card-glow-dark` |
| Buttons (`.btn-color-1`, `.btn-color-2:hover`) | `blur(8px)`                       | `rgba(163, 177, 138, 0.88)`              |
| Back-to-top (`.back-to-top`)                   | `blur(10px)` → hover `blur(14px)` | `rgba(163, 177, 138, 0.85)`              |
| Theme toggle (`.theme-toggle`)                 | `blur(8px)`                       | transparent border                       |
| Contact send (`.btn-send`)                     | `blur(8px)`                       | `rgba(163, 177, 138, 0.88)`              |
| RAG send (`.send-btn`)                         | `blur(8px)`                       | `rgba(163, 177, 138, 0.88)`              |
| RAG tab active (`.tab-btn.active[data-tab="preview"]`) | `blur(8px`)              | `rgba(163, 177, 138, 0.88)`              |
| RAG save (`.btn-code-primary`)                 | `blur(8px)`                       | `rgba(163, 177, 138, 0.88)`              |
| Lab mini-chat send (`.mini-chat-send`)         | `blur(6px)`                       | `rgba(163, 177, 138, 0.88)`              |
| Chat widgets (`.mini-chat`, `.preview-card`)   | `blur(14px)`                      | `rgba(20, 20, 20, 0.85)`                 |
| RAG instruction card (`.instruction-card`)     | `blur(14px)`                      | `rgba(22, 22, 24, 0.85)`                 |
| RAG tab bar (`.tab-bar`)                       | `blur(8px)`                       | `rgba(255, 255, 255, 0.06)`              |

The consistent glass pattern uses:

```css
border: 1px solid var(--color-border);
border-top: 1px solid rgba(255, 255, 255, 0.12);
backdrop-filter: blur(Npx);
-webkit-backdrop-filter: blur(Npx);
```

This creates a frosted glass look with a subtle white top highlight. All glass effects are scoped to `:root[data-theme="dark"]` — light mode uses warm ambient glow instead.

### Warm Ambient Glow + Crisp Shadows (Light Mode)

Light mode cards get the opposite treatment of dark mode's frosted glass — warm, solid, and crisp:

| Element                                     | Effect                                     | Implementation                                                                                                                        |
| ------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Skill cards (`.skill-category`)             | Enhanced golden glow + warm layered shadow | `--card-glow` (enhanced golden) + `box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.03)` |
| Contact form card (`.contact-form-card`)    | Enhanced golden glow + warm layered shadow | Same pattern                                                                                                                          |
| Project sections (`.project-section:hover`) | Layered hover shadow                       | `0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.05)`                                               |
| Hero content box (`.hero-content-box`)      | Solid dark blue                            | No frosted effect — backdrop blur only in dark mode                                                                                   |

The warm glow is controlled via CSS custom properties:

```css
:root {
  --bg-gradient-light: radial-gradient(
    ellipse at 50% 30%,
    #fcf8f0 0%,
    #f5f1e8 50%,
    #ede6df 100%
  );
  --card-glow: radial-gradient(
    ellipse at 50% 0%,
    rgba(255, 235, 200, 0.65) 0%,
    rgba(255, 240, 225, 0.3) 40%,
    transparent 80%
  );
}
:root[data-theme="dark"] {
  --bg-gradient-dark: radial-gradient(
    ellipse at 50% 0%,
    #0f0f18 0%,
    #0a0a0a 50%,
    #050508 100%
  );
  --card-glow: none;
  --card-glow-dark: radial-gradient(
    ellipse at 50% 0%,
    rgba(163, 177, 138, 0.04),
    transparent 70%
  );
}
```

Light mode page background creates a warm "golden hour" vignette — brightest at the center-top content area, gently deepening to a toasted beige at the edges. Cards catch light from above with an enhanced golden glow, paired with warm-tinted crisp shadows.

Dark mode page background creates a "midnight premium" atmosphere — a whisper of deep indigo at the top fading to pure obsidian at the bottom. Cards float with enhanced frosted glass, a barely-there sage top-glow, and deeper dimensional shadows.

### Theme Toggle

- Located in desktop nav (as `<li>` in `.nav-links`) and alongside hamburger icon (flex row, `gap: 1.25rem`)
- Uses `fa-moon` / `fa-sun` Font Awesome icons
- JavaScript updates all `.theme-toggle i` elements via `querySelectorAll`

### Impact Summary

Everything that is blue in light mode turns to sage (`#A3B18A`) in dark mode. The frosted navy (`rgba(11, 17, 32, 0.85)` + `blur(14px)`) nav/footer provides a glassy grounded frame, while the 1.5% noise overlay prevents dead blacks on OLED screens. The background shifts from a warm golden-hour radial gradient to a cool midnight radial gradient, creating dramatic contrast between themes.

## Typography

All font stacks are defined as CSS custom properties in `src/tokens.css` — never hardcoded:

| Token            | Font Stack                                                       | Usage                                         |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------- |
| `--font-display` | `"Archivo Narrow", "Arial Narrow", sans-serif` → `"Inter", system-ui, -apple-system, sans-serif` (moved to Inter) | Hero name (h1), bold display typography (now Inter thin italic for hero) |
| `--font-body`    | `"Inter", system-ui, -apple-system, sans-serif`                  | Body, nav, buttons, headings (h2-h6), UI text |
| `--font-mono`    | `"JetBrains Mono", ui-monospace, monospace`                      | Labels, code, dates, body text (p, li), chat  |

### Type Scale

All tokens defined in `src/tokens.css` under the `@theme` block. Values in `rem` on a **4px sub-grid for type**, 8px grid for everything else. Scale follows the [plan/linen-system.css](plan/linen-system.css) reference.

| Token | rem | px | Usage |
|-------|-----|----|-------|
| `--text-display-xl` | 7.5rem | 120px | Hero display — largest heading |
| `--text-display-lg` | 5.5rem | 88px | Large display heading |
| `--text-headline-lg` | 3.5rem | 56px | Section headline, hero name desktop |
| `--text-headline` | 2.5rem | 40px | Hero mobile, profile hero |
| `--text-heading-lg` | 2rem | 32px | Project titles, page-hero-sm |
| `--text-headline-sm` | 1.75rem | 28px | Card titles, section subheadings |
| `--text-heading` | 1.5rem | 24px | Project titles mobile, preview headings |
| `--text-heading-sm` | 1.25rem | 20px | Nav logo, small section headings |
| `--text-body` | 1rem | 16px | Taglines, nav, buttons, footer, body copy |
| `--text-label` | 0.75rem | 12px | Project labels, tab buttons, uppercase labels |
| `--text-mono` | 0.75rem | 12px | Meta data, pill tags, figure captions |
| `--text-caption` | 0.5rem | 8px | Pipeline badges, status dots, dash labels |

### Typography Utility Classes

Defined in `src/typography.css`. Framework-agnostic CSS classes consuming the tokens above:

| Class | Font | Size | line-height | tracking |
|-------|------|------|-------------|----------|
| `.t-display-xl` | Archivo Narrow 700 | `clamp(72px, 11vw, var(--text-display-xl))` | `--leading-tight` | `--track-display` |
| `.t-display-lg` | Archivo Narrow 700 | `clamp(56px, 8vw, var(--text-display-lg))` | `--leading-snug` | `--track-display` |
| `.t-headline-lg` | Archivo Narrow 700 | `var(--text-headline-lg)` (56px) | `--leading-snug` | `--track-display` |
| `.t-headline-md` | Archivo Narrow 600 | `var(--text-heading-sm)` (20px) | 1.1 | — |
| `.t-headline-sm` | Inter 500 | `var(--text-heading-sm)` (20px) | `--leading-normal` | — |
| `.t-body` | Inter 400 | `var(--text-body)` (16px) | `--leading-relaxed` | — |
| `.t-body-sm` | Inter 400 | `var(--text-body)` (16px) | `--leading-relaxed` | — |
| `.t-label` | Inter 500 | `var(--text-label)` (12px) | — | `--track-label` + uppercase |
| `.t-mono` | JetBrains Mono 400 | `var(--text-mono)` (12px) | — | `--track-mono` |

### Base Styles

Defined in `src/style-original.css`:

- **`body`** — `line-height: var(--leading-relaxed)` with `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`
- **`a`** — `border-bottom: 1px solid currentColor` (subtle hairline), hover: `text-blue underline` with `0.5rem` offset
- **`::selection`** — `background: var(--color-near-black); color: var(--color-cream)`
- **`hr`** — `border: 0; border-top: 1px solid var(--color-border); margin: 0`
- **`:focus-visible`** — `outline: 2px solid var(--color-near-black); outline-offset: 2px`

## Layout

### Layout

- **Grid options**: 8-column (`--grid-template-columns-8`) and 12-column (`--grid-template-columns-12`) CSS grids available
- **Layout primitives**: `.l-grid` (12-col), `.l-stack` (flex column), `.l-row` (flex row), `.l-page` (page container), `.l-rule` (hairline divider), `.eyebrow` (uppercase label)
- **Container**: `max-width: var(--width-page)` (1280px), centered, `var(--page-padding)` (40px) side padding
- **Spacing scale**: 8px base (`--spacing-*` tokens) with Linen aliases (`--space-xs` through `--space-3xl`)
- **Size tokens**: Context-specific component sizes (`--size-dot`, `--size-photo`, `--width-form`, etc.)

### Breakpoints

| Name             | Max Width | Nav       | Font Size | Grid                        |
| ---------------- | --------- | --------- | --------- | --------------------------- |
| Mobile           | 639px     | Hamburger | `--text-body-sm` | 1 column              |
| Tablet portrait  | 767px     | Hamburger | `--text-body` | Variable                    |
| Tablet landscape | 1023px    | Hamburger | `--text-body` | Variable                    |
| Desktop          | 1919px    | Desktop   | `--text-body` | 8-col / 12-col available    |
| Ultrawide        | 1920px+   | Desktop   | `--text-body-lg` | Scaled variant            |

### Spacing Standard

All spacing uses the 8px scale defined in `--spacing-*` tokens:

- Section padding: `--spacing-10` (80px) top/bottom, `--page-padding` (40px) sides
- Card padding: `--spacing-5` (40px) or `--spacing-6` (48px)
- Component gaps: `--spacing-2` through `--spacing-4` (16px–32px)

## Token Reference

### Color Tokens

Defined in `src/tokens.css` under `@theme`:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-cream` | `#F5F1E8` | `#0A0A0A` | Page background base |
| `--color-beige` | `#E6DECF` | `#161618` | Alternate section backgrounds |
| `--color-green` | `#9CAF88` | `#0D0D0D` | Nav/footer background |
| `--color-blue` | `#185FA5` | `#A3B18A` | Primary accent, links, headings |
| `--color-dark-blue` | `#26428b` | `#A3B18A` | Skill icons, timeline dots |
| `--color-near-black` | `#1A1A1A` | `#F3F4F6` | Strong text, button bg |
| `--color-text-gray` | `rgb(85,85,85)` | `#9CA3AF` | Body text |
| `--color-text-muted` | `rgb(120,120,120)` | `#6B7280` | Secondary text, dates |
| `--color-label-gray` | `#999999` | `#6B7280` | Form labels |
| `--color-card` | `#FFFFFF` | `#18181A` | Card backgrounds |
| `--color-border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.06)` | Borders, dividers |
| `--color-sage-hover` | `#8A9E78` | `#8A9E78` | Sage hover states |
| `--color-blue-hover` | `#0d4f8c` | `#8A9E78` | Blue accent hover |
| `--color-dark-text` | `#0F172A` | `#0F172A` | Dark text on glass elements |
| `--color-success` | `#16a34a` | `#34D399` | Success states |
| `--color-warning` | `#d97706` | `#f59e0b` | Warning states |
| `--color-info` | `#2563eb` | `#60A5FA` | Info states |
| `--color-red` | `#d32f2f` | `#EF4444` | Error states |

### Size Tokens

Defined in `:root` in `src/tokens.css`. Context-specific component dimensions:

| Token | rem | px | Usage |
|-------|-----|----|-------|
| `--size-dot` | 0.5rem | 8px | Timeline dots, status indicators |
| `--size-icon` | 1rem | 16px | Inline icons |
| `--size-icon-md` | 2rem | 32px | Medium icons |
| `--size-icon-lg` | 2rem | 32px | Large icons |
| `--size-btn-icon` | 2.5rem | 40px | Icon buttons |
| `--size-backtotop` | 3rem | 48px | Back-to-top button |
| `--size-photo-sm` | 9rem | 144px | Small profile photo |
| `--size-photo-md` | 12.5rem | 200px | Medium profile photo |
| `--size-photo` | 15rem | 240px | Hero profile photo |
| `--width-tagline` | 30rem | 480px | Hero tagline max-width |
| `--width-hero-box` | 50rem | 800px | Lab hero content box |
| `--width-form-sm` | 26rem | 416px | Compact form width |
| `--width-form` | 30rem | 480px | Contact form width |
| `--width-page` | 80rem | 1280px | Page container max-width |
| `--height-chat` | 24rem | 384px | Chat widget height |
| `--height-textarea` | 10rem | 160px | Textarea height |
| `--height-nav` | 4.5rem | 72px | Nav bar height |

### Radius Tokens

| Token | rem | px | Usage |
|-------|-----|----|-------|
| `--radius-sm` | 0.5rem | 8px | Small radii, inputs |
| `--radius-lg` | 1rem | 16px | Large card radius |
| `--radius-pill` | 2rem | 32px | Pill badges, tags |
| `--radius-card` | 1rem | 16px | Cards, inputs |
| `--radius-form` | 1.5rem | 24px | Contact form card |
| `--radius-input` | 0.5rem | 8px | Form inputs |
| `--radius-circle` | 50% | — | Circular elements |

### Shadow Tokens

Defined in `:root` in `src/tokens.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 0 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.03)` | Card shadow (light) / `--dm-card-shadow` (dark) |
| `--shadow-card-hover` | `0 0 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.05)` | Card hover shadow (light) / `--dm-card-hover-shadow` (dark) |
| `--shadow-focus-blue` | `0 0 0 4px rgba(24, 95, 165, 0.1)` | Blue focus ring |
| `--shadow-focus-sage` | `0 0 0 4px rgba(163, 177, 138, 0.15)` | Sage focus ring |
| `--shadow-focus-red` | `0 0 0 4px rgba(211, 47, 47, 0.08)` | Red error focus ring (light) |
| `--shadow-focus-red-dark` | `0 0 0 4px rgba(239, 68, 68, 0.15)` | Red error focus ring (dark) |
| `--shadow-btt` | `0 4px 16px rgba(38, 66, 139, 0.3)` | Back-to-top button |
| `--shadow-hero-card` | `0 8px 32px rgba(0, 0, 0, 0.15)` | Lab hero content box |
| `--shadow-photo` | `0 8px 32px rgba(0, 0, 0, 0.1)` | Profile photo |
| `--shadow-photo-hover` | `0 16px 40px rgba(0, 0, 0, 0.15)` | Profile photo hover |
| `--shadow-btn-hover` | `0 8px 24px rgba(0, 0, 0, 0.15)` | Button hover state |
| `--shadow-btn-active` | `0 0 8px rgba(0, 0, 0, 0.1)` | Button active/press state |

### Glass Tokens

Defined in `:root` for dark-mode glass morphism:

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-border-top` | `rgba(255, 255, 255, 0.12)` | White top highlight on glass elements |
| `--color-sage-glass` | `rgba(163, 177, 138, 0.88)` | Frosted sage button backgrounds |
| `--color-nav-bg` | `rgba(11, 17, 32, 0.85)` | Frosted navy nav/footer background |

### Border-Width Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--border-width-input` | 2px | Form input borders |
| `--border-width-active` | 4px | Active/focus indicator borders |
| `--border-width-timeline` | 2px | Timeline vertical line |

### Tracking Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--track-display` | -0.01em | Display heading letter-spacing |
| `--track-label` | 0.14em | Uppercase label letter-spacing |
| `--track-mono` | 0.04em | Monospace body text letter-spacing |

### Spacing Aliases (Linen)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Micro gaps |
| `--space-sm` | 8px | Tight gaps, icon margins |
| `--space-md` | 16px | Default component gap |
| `--space-lg` | 24px | Section element gaps |
| `--space-xl` | 32px | Large gaps |
| `--space-2xl` | 48px | Section padding, card gaps |
| `--space-3xl` | 72px | Wide section spacing |

### Grid Tokens

| Token | Value |
|-------|-------|
| `--grid-template-columns-8` | `repeat(8, minmax(0, 1fr))` |
| `--grid-template-columns-12` | `repeat(12, minmax(0, 1fr))` |
| `--grid-column-span-1` through `--grid-column-span-8` | Span 1–8 columns (8-col grid) |
| `--grid-column-span-9` through `--grid-column-span-12` | Span 9–12 columns (12-col grid) |

### Layout Aliases

| Token | Value | Usage |
|-------|-------|-------|
| `--page-padding` | 2.5rem (40px), shrinks to 24px at ≤768px | Page-level side padding |
| `--gutter` | var(--spacing-4), shrinks to 16px at ≤768px | Standard grid gutter |
| `--page-max` | 1280px | Page container max-width |

## Layout Primitives

CSS classes defined in `src/style-original.css` for consistent page layout:

| Class | CSS | Usage |
|-------|-----|-------|
| `.l-page` | `max-width: var(--width-page); margin: 0 auto; padding: 0 var(--page-padding)` | Page-level centered container |
| `.l-grid` | `display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--spacing-4)` | 12-column responsive grid |
| `.l-stack` | `display: flex; flex-direction: column; gap: var(--spacing-2)` | Vertical stack with consistent gap |
| `.l-row` | `display: flex; align-items: center; gap: var(--spacing-2)` | Horizontal row with consistent gap |
| `.l-rule` | `height: 1px; background: var(--color-border); width: 100%; border: 0` | Hairline divider |
| `.eyebrow` | `font: var(--font-mono) var(--text-caption); letter-spacing: var(--track-label); text-transform: uppercase; color: var(--color-label-gray)` | Uppercase label above headings |
| `.grid-container` | `max-width: var(--width-page); margin: 0 auto; padding: 0 var(--page-padding); width: 100%` | Original page container (used by existing sections) |
| `.hamburger-row` | `display: flex; align-items: center; gap: var(--space-lg)` | Hamburger icon + theme toggle row |

### Section Hairline Rule

```css
section + section {
  border-top: 1px solid var(--color-border);
}
```

Automatically adds a hairline separator between adjacent sections. No class needed — applies globally to all `section` elements that follow another `section`.

### Canvas Background

```css
#bgCanvas {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0; pointer-events: none;
}
```

Defined in `src/style-original.css`. Auto-initialized via `src/canvas-bg.js` — no inline script needed on any page.

## Components

### Navigation

- Desktop (`#desktop-nav`): Logo left, links right with 2rem gap
- Mobile (`#hamburger-nav`): Shown at ≤1024px. Hamburger icon (3 lines → X when open). Menu slides in from left (100vw, top 70px, `#9CAF88` light / `#0B1120` dark bg)
- Menu-links container has no `py-8` padding — links start flush at top
- Active page indicator: 4px blue dot below via `::after` (desktop), 3px blue left accent bar via `border-left` (mobile hamburger menu)
- Logo hover: opacity 0.65, translateY(-1px) light / near-white dark
- Link hover: opacity 0.6 (desktop), background shift (mobile)

### Hamburger Overlay

- When hamburger menu opens, a `#hamburgerOverlay` `<div>` is dynamically created by `toggleMenu()` in `script.js` and appended to `body`
- Fixed fullscreen (`inset: 0`), `z-index: 80` (below `.menu-links` at 90, above page content)
- Light: `rgba(0, 0, 0, 0.4)`; Dark: `rgba(0, 0, 0, 0.6)`
- Fades in via CSS `opacity` + `transition: opacity 0.3s ease`
- `pointer-events: none` when hidden, `auto` when active
- Tapping the overlay calls `toggleMenu()` to close the menu
- Removed from DOM? No — overlay element persists in DOM while menu is open, is hidden via class removal

### Theme Toggle

- Desktop: `<li>` in `.nav-links`, last position
- Mobile/hamburger: sits alongside `.hamburger-icon` in a flex row with `gap: 1.25rem`
- Icon swaps `fa-moon` ↔ `fa-sun` on click
- All theme toggle icons stay in sync via shared `src/theme-toggle.js` — listens on all `.theme-toggle i` elements
- Logic deduplicated into single file, loaded on all pages after `script.js`

### Hero (Home)

- Centered, min-height 86vh
- Label fades down → name letters stagger in → tagline fades up → buttons scale in

### Hero (Lab)

- Left-aligned, `position: relative`, `overflow: hidden`
- Dark blue content box (`#26428b` light / `rgba(163, 177, 138, 0.08)` dark) with white text, rounded 12px, frosted blur in dark mode only
- Neural links particle canvas (`#neuralCanvas`) layered below as `position: absolute`, `z-index: -1`, `pointer-events: none`
- Label blurs in → heading fades up → underline draws → tagline fades up → card fades up

### Hero (Contact)

- Two-column: photo + text left, form card right (flex layout, vertically centered)
- Fills remaining viewport height (`calc(100vh - 140px)`), matching index hero behavior
- Photo zooms out → label fades down → heading bounces in → tagline fades up → info items slide in
- Photo: 240px circle, no border in dark mode, shadow, hover scale(1.03)
- Mobile: stacks vertically, contact info (PHONE/EMAIL/LINKEDIN) left-aligned

### Skill Cards (Profile)

- 3-column grid (2-col ≤1024px, 1-col ≤700px)
- White card + enhanced golden glow + warm layered shadow light / `var(--color-card)` + subtle sage glow + glass border + frosted `blur(12px)` dark, rounded 12px, text-center
- Hover: translateY(-8px), shadow intensifies, blur increases to `24px` in dark mode
- List items: `→` prefix in `#26428b` light / `var(--color-blue)` dark

### Timeline (Profile)

- Left border line, dot markers (12px, `#26428b` light / `var(--color-blue)` dark, white border, outer shadow)
- Current role dot pulses with sage glow in dark mode. All dots scale on hover
- Sections: Skills on `#E6DECF`, Experience + Education on default cream

### Buttons

Three-tier system that maps to the warm glow/glass morphism design duality:

| Tier | Light mode | Dark mode |
|------|-------------|-----------|
| **Primary** (filled) | Solid `var(--color-near-black)` bg, white text. Hover: darker + warm layered shadow | Frosted sage glass: `backdrop-filter: blur(8px)`, `border: 1px solid var(--color-border)`, `border-top: 1px solid rgba(255,255,255,0.12)`, `rgba(163,177,138,0.88)` bg, `#0F172A` text. Hover: solid `#8A9E78` |
| **Secondary** (outlined) | `var(--color-near-black)` border/text, transparent bg. Hover: fills primary dark bg | Transparent, sage border/text. Hover: fills frosted sage primary |
| **Ghost** (text/icon) | `var(--color-blue)` text, transparent. Hover: subtle blue tint bg | `var(--color-blue)` (sage) text, transparent. Hover: subtle sage glass bg |

- **Active**: `scale(0.97)` press effect with reduced shadow
- **Focus-visible**: `2px solid var(--color-blue)`, `2px offset` — on all button elements
- **Disabled**: `opacity 0.5`, `cursor not-allowed`, no transform/shadow
- **Reduced motion**: `transition: none`, `transform: none`, `backdrop-filter: none`

All buttons that extend `.btn` inherit the shimmer overlay (`::before` pseudo-element, `.white 15%` gradient, slides in on hover).

### Contact Form

- White card + enhanced golden glow + warm layered shadow light / `var(--color-card)` + subtle sage glow + frosted `blur(14px)` dark, rounded 20px, padding 3rem, 480px width
- Inputs: `#F5F1E8` bg light / `#1A1A1A` bg dark, rounded 12px, monospace text
- Floating labels transition from center to top on focus/fill
- Send button: full-width, `var(--color-near-black)` light / frosted sage glass dark, hover lift + shimmer, icon shifts on hover

### Back-to-Top

- 44px circle, `#26428b` light / `var(--color-blue)` dark, fixed bottom-right
- Hidden by default (`opacity: 0`, `pointer-events: none`), visible after 300px scroll
- **Progress ring**: SVG ring injected via JS on page load. Background circle (thin, 15% opacity) + foreground circle that fills proportionally to scroll progress (0–100% `stroke-dashoffset`). Updates on `scroll` and `resize` (both passive). Foreground circle starts at 3 o'clock via `rotate(-90)`, uses `stroke-linecap: round`
- Dark mode: ring stroke uses `var(--color-blue)` (sage)

### Project Card (Lab)

- 2-column grid (info + widget preview)
- Tech pills: blue tint bg light / sage tint bg dark, border, rounded pill
- Hover: slight lift, pill stagger scale
- Mini chat widget: white card light / frosted dark card (`rgba(20,20,20,0.85)` + `blur(14px)`) with frosted gradient header (`blur(12px)`), green pulsing dot, monospace messages
- Chat messages: bot bubbles `#eeebe5` light / frosted `rgba(26,26,26,0.85)` + `blur(6px)` dark, user bubbles `#26428b` light / sage dark

### RAG Chatbot Page

- Standalone tester page (no main nav), but fully integrated with global design tokens
- **Header**: branded mini-nav with "ALIYA KOY" logo (links to home) + breadcrumb `Lab / RAG Chatbot` + LIVE DEMO badge + theme toggle. Light: sage `var(--color-green)`. Dark: frosted navy `rgba(11,17,32,0.85)` + `blur(14px)` — matches main nav
- **Layout**: full-viewport two-column grid (440px left + 1fr right), no scroll needed. Both panels have `48px` top/bottom and `16px` inner-gap padding for consistent alignment. The inner gap between panels is `32px` (16px right padding on left panel + 16px left padding on right panel)
- **Left panel (`.instruction-card`)**: dashboard-style sidebar with no-tutorial-approach. 6 sections:
  - **System Status**: Bot name + company name from persona data, live status dot (Ready / Retrieving / Generating / Offline) in a pill badge
  - **RAG Pipeline**: 4-node horizontal flow (Query → Retriever → LLM → Response). Nodes are 18px circles with labels below, connected by flex-grow lines. Nodes light up blue sequentially during active queries and reset after response. Connector lines also animate. Idle: muted gray. Active: blue fill + glow ring. Status label updates: "Retrieving…" → "Generating…" → "Ready"
  - **Session + Quick Actions**: Relative session timer ("Just now · 0 exchanges") with clock icon. Two action buttons: Reset (clears chat) and Copy Log (copies conversation to clipboard, shows "Copied!" feedback for 1.5s). Both use `.action-btn` style — flex-1, blue tint bg, blue border, 8px radius
  - **Session Stats**: Inline row showing Messages count + Avg Response Time. Mini log below: "Last: 1.2s · 3 total" or "No queries yet"
  - **Suggestion Chips**: "Try asking" section with 4 dynamic chips (KB-specific questions + fallbacks). Chips use blue tint bg, pill shape, `0.65rem` mono font. Text inside has left indent (1.25rem left padding vs 0.85rem right). Chips are left-aligned within card with `0.75rem` group padding
   - **Company Picker**: "Try a different company?" button at bottom of left panel (desktop) or "↔ Company" button in tab bar (mobile). Opens a modal overlay with 12 pre-built companies. Each company card shows emoji + name + industry tag in a 4-column grid. Cards have hover lift + blue border. Selected card: blue border + blue tint bg. Confirm button fades in on selection (uses `visibility` + `opacity` for stable layout). Cancel + Confirm sit centered together with `0.4rem` gap. Subtle notice below title: *"Pick a pre-built company to explore. Switching will clear your current chat."* Clicking Confirm loads template instantly (no API call), animates pipeline, adds reset notice, switches to Preview tab
- **Chat card (`.preview-card`)**: same card treatment — warm golden glow + shadow light, frosted glass + sage glow dark. Header gradient cream→beige. Messages: user bubbles `var(--color-blue)`, bot bubbles `var(--bot-bg)`. Welcome message is dynamic — reads from `data.persona.company` on every render (both fresh load and history restore)
- **Console tab**: side-panel knowledge base editor restyled to site-native forms (cream inputs, blue focus rings, beige sidebar) instead of VS Code dark theme. Light: card glow. Dark: frosted glass. Footer has no border-top — seamless blend with editor body
- **Templates**: 12 pre-built companies stored client-side in JS (`TEMPLATES` array). Industries: Finance, E-commerce, Hospitality, Technology, Fitness, Food & Beverage, SaaS, Creative, Transportation, Healthcare, Education, Telecom. Each has full persona + KB (about, products, FAQ, policies). Zero API calls — instant swap on selection
- **Preview/Console tabs**: glass-morphism tab bar. Active states: light blue bg + white text, dark sage glass + `#0F172A` text
- **Footer**: standard site copyright bar, sage background light, frosted navy glass dark
- **Animations**: page-load fade-in (`.page-load-anim`), message slide-in, pulsing status dots, pipeline sequential light-up (200ms intervals), modal fade-in with `backdrop-filter: blur(4px)`
- **Mobile**: left panel hidden, chat fills width, Console uses accordion sections, "↔ Company" button in tab bar for company switching, standard footer
- **Dynamic**: suggestion chips, chat header, welcome message, dashboard stats, session timer, and bot persona all update from Console changes and template loads

### Canvas Background

- Powered by `src/canvas-bg.js` — a vanilla JS `CanvasBackground` class that manages a full-viewport `<canvas>` element behind all content
- Fixed `position: fixed`, `z-index: 0`, `pointer-events: none` — never interferes with interaction
- **Auto-initializes** — if a `<canvas id="bgCanvas">` element exists, `canvas-bg.js` instantiates itself on `DOMContentLoaded`. No inline init script needed on any page.
- **Theme detection**: reads `data-theme` attribute on `<html>` via `MutationObserver` — switches modes instantly when user toggles theme
- **Dark mode (constellations)**:
  - 100 stars in 3 tiers: 15 core (2–3.5px, slow drift), 30 medium (1–1.8px, medium drift), 55 field (0.3–0.8px, fastest)
  - Stars have random `hue` for subtle warm/cool color variation
  - Twinkle: each star's alpha pulses via unique `sin(time * speed + phase)` — varies per star
  - Shooting stars: spawn every 5–13s from either left or right edge (50/50 chance), random color/speed/duration/width — streak lasts 0.8–2.5s
  - Connections removed (stars are standalone)
  - Star count scales with viewport area (`Math.min(200, w * h / 13000)`), capped at 200
  - Nebula gradient: `rgba(30,10,45,0.5)` → `rgba(18,12,30,0.3)` → transparent — single `fillRect()`
- **Light mode (warm glow)**:
  - Corner Overlap gradient: gold `rgba(255,235,200,0.3)` → fade → transparent, from top-right to bottom-left
  - `multiply` blend mode reacts with the cream `#F5F1E8` page background
  - Subtle vignette: radial gradient darkening corners (`rgba(100,70,50,0.06–0.09)`)
  - Gentle pulse: whole gradient breathes via `sin()` oscillation of overlay alpha
- **Performance**: no blur, no blend modes (multiply is lightweight), no per-frame particle systems in light mode — runs at 60fps on all devices
- **Reduced motion**: checks `window.matchMedia('(prefers-reduced-motion: reduce)')` before starting animation — exits early if true. Listens for runtime changes via `change` event and calls `stop()` to cancel the animation loop
- **Page Visibility**: listens on `document.visibilitychange`. When hidden: sets `paused = true`, cancels `requestAnimationFrame`. When visible: resets timestamp, restarts the loop. Prevents CPU waste while tab is backgrounded
- **Pages**: integrated on index.html, lab.html, contact.html, rag-chatbot.html. Excluded from profile.html

## Touch Device Feedback

A `@media (hover: none)` query adds tactile feedback for touch devices where hover states have no effect:

- `.btn:active`, `.btn-send:active`, `.back-to-top:active`, `.skill-category:active`: `scale(0.97)` with `transition: transform 0.1s ease`

This replaces hover-based visual feedback (lift, shadow, shimmer) with a compress-on-press response that feels native on touch screens. The reduced-motion media query disables this transform.

## Animation Timing

All entrance animations use `cubic-bezier(0.16, 1, 0.3, 1)` easing. The `prefers-reduced-motion: reduce` media query disables all CSS animations (`animation: none !important`, `transition: none !important`) and prevents the canvas background from starting. A secondary catch-all in dark mode sets `animation-duration: 0.01ms !important` for any missed elements.

## Icons

Currently uses **Font Awesome 6.5** via CDN. Free/regular/brand sets used for:

- Navigation icons, social links, contact info icons, back-to-top chevron, lab buttons, chat avatar
- Theme toggle: `fa-moon` (dark) / `fa-sun` (light)

## Images

- `/assets/profile-pic.jpg` — Profile photo, circular crop. Only image asset — all other images (10 PNGs, resume PDF) removed to reduce page weight from ~1.2MB to ~150KB

## External CSS/JS Files

Inline `<style>` and `<script>` blocks extracted into cacheable external files:

| File | Origin | Size |
|------|--------|------|
| `src/theme-toggle.js` | Shared theme toggle logic (was inline on every page) | 828 B |
| `src/rag-chatbot.css` | Extracted from `rag-chatbot.html` inline `<style>` (~1,142 lines) | 31 KB |
| `src/rag-chatbot.js` | Extracted from `rag-chatbot.html` inline `<script>` (~710 lines) | 18 KB |
| `src/lab.css` | Extracted from `lab.html` inline `<style>` (~340 lines) | 7 KB |
| `src/mini-chatbot.js` | Extracted from `lab.html` inline `<script>` (~161 lines) | 4 KB |
| `src/contact.js` | Extracted from `contact.html` inline `<script>` (~32 lines) | 1 KB |
| `src/canvas-bg.js` | Auto-init added — no inline init script needed on any page | 8 KB |
| `src/typography.css` | Linen typography utility classes (`.t-display-xl`, `.t-body`, etc.) | 2 KB |

### Inline Patterns Eliminated

After extraction, inline code on main pages is limited to:

| Pattern | Status | Reason |
|---------|--------|--------|
| Theme detection IIFE (`<head>`) | **Kept inline** | Must run before first paint to prevent FOUC |
| `onclick` handlers on interactive elements | **Eliminated** | Replaced with `addEventListener` in external JS files |
| `style=""` attributes on demo widgets | **Eliminated** | Lab color scale → CSS classes |
| `#bgCanvas` `<style>` block | **Eliminated** | Moved to `src/style-original.css` |
| Canvas init `<script>` | **Eliminated** | Auto-init added to `src/canvas-bg.js` |
| Experience toggle CSS + JS | **Eliminated** | Moved to `src/style-original.css` + `script.js` |
| Hamburger row `style=""` | **Eliminated** | Replaced with `.hamburger-row` class |
| Hamburger nav `onclick` | **Eliminated** | Replaced with `addEventListener` in `script.js` |

All pages now preconnect to `cdnjs.cloudflare.com` in `<head>` for faster Font Awesome delivery. Stylesheet references include cache-busting query parameter (`style.css?v=2`).
