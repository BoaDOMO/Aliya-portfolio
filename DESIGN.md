# Current Design System

This document describes the existing visual design as implemented in `style.css`, `mediaqueries.css`, and the HTML pages.

---

## Brand Colors — Light Mode

| Name | Value | Usage |
|---|---|---|
| Cream | `#F5F1E8` | Page background, main wrapper |
| Beige | `#EDE9DF` | Alternate section backgrounds (skills, education) |
| Sage Green | `#9CAF88` | Navigation bar, footer |
| Blue | `#185FA5` | Hero headings, links, accent elements, focus rings |
| Dark Blue | `#26428b` | Skill icons, timeline dots, photo borders, some buttons/headings |
| Near Black | `#1A1A1A` | Nav text, button bg (send), strong text |
| Text Gray | `rgb(85, 85, 85)` | Body text, list items |
| Text Muted | `rgb(120, 120, 120)` | Secondary text, role titles, dates |
| Label Gray | `#999999` | Form labels, info labels |
| White | `#FFFFFF` | Card backgrounds |
| Red (error) | `#d32f2f` | Invalid form input borders |

## Brand Colors — Dark Mode

Dark mode is activated via `data-theme="dark"` on `<html>`, persisted to `localStorage('theme')`. A FOUC-prevention script in `<head>` reads the stored preference (or system `prefers-color-scheme`) before first paint.

### Token Overrides (`src/tokens.css`)

All light-mode tokens are overridden inside `:root[data-theme="dark"]`:

| Token | Value | Notes |
|---|---|---|---|
| `--color-cream` | `#0A0A0A` | Matte Obsidian page background |
| `--color-beige` | `#121212` | Alternate section background |
| `--color-green` | `#0D0D0D` | (Reserved, nav/footer use `rgba(11, 17, 32, 0.85)` with glass) |
| `--color-blue` | `#A3B18A` | Electric Sage — primary accent replaces blue |
| `--color-dark-blue` | `#A3B18A` | Same as sage — everything blue in light → sage in dark |
| `--color-near-black` | `#F3F4F6` | Near-white text |
| `--color-text-gray` | `#9CA3AF` | Body text |
| `--color-text-muted` | `#6B7280` | Secondary text |
| `--color-label-gray` | `#6B7280` | Labels |
| `--color-card` | `#141414` | Card backgrounds |
| `--color-border` | `rgba(255, 255, 255, 0.05)` | Subtle light borders on dark |
| `--color-red` | `#EF4444` | Errors |
| `--dm-card-shadow` | `0 4px 12px rgba(0, 0, 0, 0.6)` | Card shadow |
| `--dm-card-hover-shadow` | `0 12px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.04)` | Card hover shadow |
| `--card-glow` | `none` | Disables warm glow in dark mode; light mode uses a warm radial gradient |

### Key Design Decisions (Dark Mode)

| Element | Light | Dark |
|---|---|---|
| Page background | Cream `#F5F1E8` | Matte Obsidian `#0A0A0A` + 1.5% noise texture |
| Nav / Footer | Sage `#9CAF88` | Frosted navy `rgba(11, 17, 32, 0.85)` + `blur(12px)` |
| Nav links text | Near-black `#1A1A1A` | Near-white `var(--color-near-black)` |
| Nav logo | Near-black | Near-white |
| Primary accent | Blue `#185FA5` | Electric Sage `#A3B18A` |
| Secondary accent | Dark blue `#26428b` | Electric Sage (same) |
| Hero name / headings | Blue | Sage |
| Skill icons / arrows | Dark blue | Sage |
| Timeline dots | Dark blue | Sage |
| Back-to-top button | Dark blue | Sage + frosted `blur(8px)` → hover `blur(12px)` |
| Skill cards | White `#FFFFFF` + warm glow + crisp shadow | `var(--color-card)` `#141414` + glass border |
| Buttons (filled) | Blue | Sage `rgba(163, 177, 138, 0.88)` + frosted `blur(8px)`, text `#0F172A` |
| Buttons (filled hover) | Black `#000000` | Darker sage `#8A9E78` |
| Buttons (outlined hover) | Fills dark | Fills sage |
| Contact form card | White + warm glow + crisp shadow | `var(--color-card)` + frosted `blur(12px)` |
| Form inputs | Cream `#F5F1E8` | `#1A1A1A` |
| Tagline / hero text | `var(--color-text-muted)` | `var(--color-near-black)` (near-white) |
| Footer text | Near-black | `var(--color-text-gray)` |

### Nav & Footer (Dark Mode)

- Background: frosted `rgba(11, 17, 32, 0.85)` with `backdrop-filter: blur(12px)`
- Border: `1px solid var(--color-border)`
- Menu dropdown: solid `#0B1120`, matches nav
- Theme toggle button: near-white icon, `backdrop-filter: blur(8px)` with frosted hover

### Glass Morphism (Dark Mode)

Frosted glass is applied to the following elements in dark mode only:

| Element | `backdrop-filter` | Background |
|---|---|---|
| Nav (`#nav`) | `blur(12px)` | `rgba(11, 17, 32, 0.85)` |
| Footer | `blur(12px)` | `rgba(11, 17, 32, 0.85)` |
| Skill cards (`.skill-category`) | `blur(10px)` → hover `blur(20px)` | `var(--color-card)` |
| AI demo cards (`.ai-demo-card`) | `blur(8px)` → hover `blur(16px)` | `var(--color-card)` |
| Contact form card (`.contact-form-card`) | `blur(12px)` | `var(--color-card)` |
| Buttons (`.btn-color-1`, `.btn-color-2:hover`) | `blur(8px)` | `rgba(163, 177, 138, 0.88)` |
| Back-to-top (`.back-to-top`) | `blur(8px)` → hover `blur(12px)` | `rgba(163, 177, 138, 0.85)` |
| Theme toggle (`.theme-toggle`) | `blur(8px)` | transparent border |
| Chat widgets (`.mini-chat`, `.preview-card`) | `blur(12px)` | `rgba(20, 20, 20, 0.85)` |
| RAG panel (`.panel-instructions`) | `blur(12px)` | `rgba(10, 10, 10, 0.85)` |
| RAG tab bar (`.tab-bar`) | `blur(8px)` | `rgba(255, 255, 255, 0.06)` |
| RAG expand button (`.expand-btn`) | `blur(8px)` | `rgba(255, 255, 255, 0.06)` |

The consistent glass pattern uses:
```css
border: 1px solid var(--color-border);
border-top: 1px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(Npx);
-webkit-backdrop-filter: blur(Npx);
```

This creates a frosted glass look with a subtle white top highlight. All glass effects are scoped to `:root[data-theme="dark"]` — light mode uses warm ambient glow instead.

### Warm Ambient Glow + Crisp Shadows (Light Mode)

Light mode cards get the opposite treatment of dark mode's frosted glass — warm, solid, and crisp:

| Element | Effect | Implementation |
|---|---|---|
| Skill cards (`.skill-category`) | Warm glow + layered shadow | `--card-glow` + `box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.03)` |
| AI demo cards (`.ai-demo-card`) | Warm glow + layered shadow | Same pattern |
| Contact form card (`.contact-form-card`) | Warm glow + layered shadow | Same pattern |
| Project sections (`.project-section:hover`) | Layered hover shadow | `0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.05)` |
| Hero content box (`.hero-content-box`) | Solid dark blue | No frosted effect — backdrop blur only in dark mode |

The warm glow is controlled via a CSS custom property:
```css
:root {
  --card-glow: radial-gradient(ellipse at 50% 0%, rgba(255, 240, 225, 0.5), transparent 70%);
}
:root[data-theme="dark"] {
  --card-glow: none;
}
```

This creates a subtle warm radiant gradient from the top of each card, like paper catching sunlight, paired with three-layer crisp shadows that feel sharp and grounded — the visual opposite of dark mode's blurred, ethereal frosted glass.

### Theme Toggle

- Located in desktop nav (as `<li>` in `.nav-links`) and alongside hamburger icon (flex row, `gap: 1.25rem`)
- Uses `fa-moon` / `fa-sun` Font Awesome icons
- JavaScript updates all `.theme-toggle i` elements via `querySelectorAll`

### Impact Summary

Everything that is blue in light mode turns to sage (`#A3B18A`) in dark mode. The frosted navy (`rgba(11, 17, 32, 0.85)` + `blur(12px)`) nav/footer provides a glassy grounded frame, while the 1.5% noise overlay prevents dead blacks on OLED screens.

## Typography

| Element | Font | Notes |
|---|---|---|
| Body / Nav / Buttons / Headings (h2-h6) | `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif` | System font stack |
| Hero name (h1) | `Georgia, serif` | Italic, `#185FA5` light / `#A3B18A` dark, 4rem desktop / 2.75rem mobile |
| Labels / Code / Dates | `ui-monospace, "SF Mono", Menlo, monospace` | Monospace stack |
| Body text (p, li) | Monospace stack | 0.9375rem, `rgb(85, 85, 85)` light / `#9CA3AF` dark |
| Section titles (.title) | Monospace stack | 1.5rem, uppercase, 0.1em tracking |
| Hero label | Monospace stack | 0.75rem, uppercase, 0.2em tracking, `#185FA5` light / `#A3B18A` dark |
| Company name (.name1) | System stack | Bold, `#26428b` light / `#A3B18A` dark |
| Role (.name2) | System stack | Italic, `rgb(120, 120, 120)` light / `#9CA3AF` dark |
| Footer text | System stack | 14px, 500 weight, `#1A1A1A` light / `#9CA3AF` dark |
| Demo title (RAG chatbot) | System stack | 20px, 600 weight, `#1A1A1A` light / `var(--text)` dark |

**Loaded Google Fonts:** Source Code Pro (200–900), Oswald (200–700)

## Layout

### Layout

- **Grid**: 8-column CSS grid system
- **Container**: `max-width: 1200px`, centered, `2rem` (32px) side padding
- **Grid classes**: `.grid-8` for the grid, `.col-span-{1-8}` for column spans
- **Spacing scale**: 8px base. See `--spacing-*` tokens in `src/tokens.css`

### Breakpoints

| Name | Max Width | Nav | Grid |
|------|-----------|-----|------|
| Mobile | 639px | Hamburger | 1 column |
| Tablet portrait | 767px | Hamburger | 8-col (stacked) |
| Tablet landscape | 1023px | Hamburger | 8-col (split) |
| Desktop | 1279px | Desktop | 8-col (full) |
| Large desktop | 1535px | Desktop | 8-col (constrained) |
| Ultrawide | 1536px+ | Desktop | 8-col (constrained, scaled) |

### Spacing Standard

All spacing uses the 8px scale defined in `--spacing-*` tokens:
- Section padding: `--spacing-10` (80px) top/bottom, `--spacing-4` (32px) sides
- Card padding: `--spacing-5` (40px) or `--spacing-6` (48px)
- Component gaps: `--spacing-2` through `--spacing-4` (16px–32px)

## Components

### Navigation
- Desktop (`#desktop-nav`): Logo left, links right with 2rem gap
- Mobile (`#hamburger-nav`): Shown at ≤1024px. Hamburger icon (3 lines → X when open). Menu slides in from left (100vw, top 70px, `#9CAF88` light / `#0B1120` dark bg)
- Menu-links container has no `py-8` padding — links start flush at top
- Active page link: 4px dot below via `::after`
- Logo hover: opacity 0.65, translateY(-1px) light / near-white dark
- Link hover: opacity 0.6 (desktop), background shift (mobile)

### Theme Toggle
- Desktop: `<li>` in `.nav-links`, last position
- Mobile/hamburger: sits alongside `.hamburger-icon` in a flex row with `gap: 1.25rem`
- Icon swaps `fa-moon` ↔ `fa-sun` on click
- All theme toggle icons stay in sync via `querySelectorAll('.theme-toggle i')`

### Hero (Home)
- Centered, min-height 86vh
- Label fades down → name letters stagger in → tagline fades up → buttons scale in

### Hero (Lab)
- Left-aligned
- Dark blue content box (`#26428b` light / `rgba(163, 177, 138, 0.08)` dark) with white text, rounded 12px, frosted blur in dark mode only
- Label blurs in → heading fades up → underline draws → tagline fades up → card fades up

### Hero (Contact)
- Two-column: photo + text left, form card right
- Photo zooms out → label fades down → heading bounces in → tagline fades up → info items slide in
- Photo: 240px circle, no border in dark mode, shadow, hover scale(1.03)

### Skill Cards (Profile)
- 3-column grid (2-col ≤1024px, 1-col ≤700px)
- White card + warm glow + crisp layered shadow light / `var(--color-card)` + glass border dark, rounded 12px, text-center
- Hover: translateY(-8px), shadow intensifies. Icon appears from above, list slides down, title repositions
- List items: `→` prefix in `#26428b` light / `var(--color-blue)` dark

### Timeline (Profile)
- Left border line, dot markers (12px, `#26428b` light / `var(--color-blue)` dark, white border, outer shadow)
- Current role dot pulses with sage glow in dark mode. All dots scale on hover
- Sections: Skills on `#EDE9DF`, Experience + Education on default cream

### Contact Form
- White card + warm glow + crisp layered shadow light / `var(--color-card)` + frosted `blur(12px)` dark, rounded 20px, padding 3rem, 480px width
- Inputs: `#F5F1E8` bg light / `#1A1A1A` bg dark, rounded 12px, monospace text
- Floating labels transition from center to top on focus/fill
- Send button: full-width, `#1A1A1A` light / sage dark, hover lift + shimmer, icon shifts on hover

### Back-to-Top
- 44px circle, `#26428b` light / `var(--color-blue)` dark, fixed bottom-right
- Hidden by default, visible after 300px scroll

### Project Card (Lab)
- 2-column grid (info + widget preview)
- Tech pills: blue tint bg light / sage tint bg dark, border, rounded pill
- Hover: slight lift, pill stagger scale
- Mini chat widget: white card light / frosted dark card (`rgba(20,20,20,0.85)` + `blur(12px)`) with frosted gradient header (`blur(10px)`), green pulsing dot, monospace messages
- Chat messages: bot bubbles `#eeebe5` light / frosted `rgba(26,26,26,0.85)` + `blur(6px)` dark, user bubbles `#26428b` light / sage dark

### RAG Chatbot Page
- Standalone page with its own inline CSS variables
- Dark mode: `:root[data-theme="dark"]` overrides all local variables
  - `--bg: #0A0A0A`, `--panel: #141414`, `--text: #F3F4F6`, `--accent: #A3B18A`
- Header: solid `#0B1120` in dark mode
- Chat card (`.preview-card`): frosted `rgba(20,20,20,0.85)` + `blur(12px)`
- Chat header (`.preview-header`): frosted gradient + `blur(10px)`
- Left panel (`.panel-instructions`): frosted `rgba(10,10,10,0.85)` + `blur(12px)` in dark mode only
- Tab bar (`.tab-bar`): frosted `rgba(255,255,255,0.06)` + `blur(8px)` in dark mode only
- Expand button (`.expand-btn`): frosted `rgba(255,255,255,0.06)` + `blur(8px)` in dark mode only
- Small buttons (`.btn-sm`): `backdrop-filter: blur(6px)` → hover `blur(10px)`
- Chat message bubbles follow the same patterns as the mini-chat widget
- Code editor/sidebar keeps its existing dark theme with sage accent labels
- All hardcoded `rgba(24, 95, 165, ...)` blue tones → sage `rgba(163, 177, 138, ...)`

## Animation Timing

All entrance animations use `cubic-bezier(0.16, 1, 0.3, 1)` easing. Reduced motion media query disables all animations.

## Icons

Currently uses **Font Awesome 6.5** via CDN. Free/regular/brand sets used for:
- Navigation icons, social links, contact info icons, back-to-top chevron, lab buttons, chat avatar
- Theme toggle: `fa-moon` (dark) / `fa-sun` (light)

## Images

- `/assets/profile-pic.jpg` — Profile photo, circular crop
- `/assets/profile-pic.png` — Same photo, PNG format
