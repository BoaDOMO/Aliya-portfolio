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
| `--color-dark-blue`      | `#A3B18A`                                                                        | Same as sage — everything blue in light → sage in dark         |
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
| Buttons (filled)         | Blue                                               | Sage `rgba(163, 177, 138, 0.88)` + frosted `blur(8px)`, text `#0F172A`       |
| Buttons (filled hover)   | Black `#000000`                                    | Darker sage `#8A9E78`                                                        |
| Buttons (outlined hover) | Fills dark                                         | Fills sage                                                                   |
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
| AI demo cards (`.ai-demo-card`)                | `blur(10px)` → hover `blur(20px)` | `var(--color-card)` + `--card-glow-dark` |
| Contact form card (`.contact-form-card`)       | `blur(14px)`                      | `var(--color-card)` + `--card-glow-dark` |
| Buttons (`.btn-color-1`, `.btn-color-2:hover`) | `blur(8px)`                       | `rgba(163, 177, 138, 0.88)`              |
| Back-to-top (`.back-to-top`)                   | `blur(10px)` → hover `blur(14px)` | `rgba(163, 177, 138, 0.85)`              |
| Theme toggle (`.theme-toggle`)                 | `blur(8px)`                       | transparent border                       |
| Chat widgets (`.mini-chat`, `.preview-card`)   | `blur(14px)`                      | `rgba(20, 20, 20, 0.85)`                 |
| RAG panel (`.panel-instructions`)              | `blur(14px)`                      | `rgba(10, 10, 10, 0.85)`                 |
| RAG tab bar (`.tab-bar`)                       | `blur(8px)`                       | `rgba(255, 255, 255, 0.06)`              |
| RAG expand button (`.expand-btn`)              | `blur(8px)`                       | `rgba(255, 255, 255, 0.06)`              |

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
| AI demo cards (`.ai-demo-card`)             | Enhanced golden glow + warm layered shadow | Same pattern                                                                                                                          |
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

| Token            | Font Stack                                                                      | Usage                                                     |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `--font-body`    | `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif` | Body, nav, buttons, headings (h2-h6), UI text             |
| `--font-display` | `Georgia, serif`                                                                | Hero name (h1) — italic, `#185FA5` light / `#A3B18A` dark |
| `--font-mono`    | `ui-monospace, "SF Mono", Menlo, monospace`                                     | Labels, code, dates, body text (p, li), chat messages     |

| Element                  | Font               | Notes                                                                |
| ------------------------ | ------------------ | -------------------------------------------------------------------- |
| Body text (p, li)        | `var(--font-mono)` | 0.9375rem, `rgb(85, 85, 85)` light / `#9CA3AF` dark                  |
| Section titles (.title)  | `var(--font-mono)` | 1.5rem, uppercase, 0.1em tracking                                    |
| Hero label               | `var(--font-mono)` | 0.75rem, uppercase, 0.2em tracking, `#185FA5` light / `#A3B18A` dark |
| Company name (.name1)    | `var(--font-body)` | Bold, `#26428b` light / `#A3B18A` dark                               |
| Role (.name2)            | `var(--font-body)` | Italic, `rgb(120, 120, 120)` light / `#9CA3AF` dark                  |
| Footer text              | `var(--font-body)` | 14px, 500 weight, `#1A1A1A` light / `#9CA3AF` dark                   |
| Demo title (RAG chatbot) | `var(--font-body)` | 20px, 600 weight                                                     |

**Google Fonts:** None. All font stacks are system-native — no external font dependencies are loaded.

## Layout

### Layout

- **Grid**: 8-column CSS grid system
- **Container**: `max-width: 1200px`, centered, `2rem` (32px) side padding
- **Grid classes**: `.grid-8` for the grid, `.col-span-{1-8}` for column spans
- **Spacing scale**: 8px base. See `--spacing-*` tokens in `src/tokens.css`

### Breakpoints

| Name             | Max Width | Nav       | Font Size | Grid                        |
| ---------------- | --------- | --------- | --------- | --------------------------- |
| Mobile           | 639px     | Hamburger | 0.875rem  | 1 column                    |
| Tablet portrait  | 767px     | Hamburger | 1rem      | 8-col (stacked)             |
| Tablet landscape | 1023px    | Hamburger | 1rem      | 8-col (split)               |
| Desktop          | 1279px    | Desktop   | 1rem      | 8-col (full)                |
| Large desktop    | 1535px    | Desktop   | 1.05rem   | 8-col (constrained)         |
| Ultrawide        | 1920px+   | Desktop   | 1.15rem   | 8-col (constrained, scaled) |

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
- White card + enhanced golden glow + warm layered shadow light / `var(--color-card)` + subtle sage glow + glass border + frosted `blur(12px)` dark, rounded 12px, text-center
- Hover: translateY(-8px), shadow intensifies, blur increases to `24px` in dark mode
- List items: `→` prefix in `#26428b` light / `var(--color-blue)` dark

### Timeline (Profile)

- Left border line, dot markers (12px, `#26428b` light / `var(--color-blue)` dark, white border, outer shadow)
- Current role dot pulses with sage glow in dark mode. All dots scale on hover
- Sections: Skills on `#E6DECF`, Experience + Education on default cream

### Contact Form

- White card + enhanced golden glow + warm layered shadow light / `var(--color-card)` + subtle sage glow + frosted `blur(14px)` dark, rounded 20px, padding 3rem, 480px width
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
- Mini chat widget: white card light / frosted dark card (`rgba(20,20,20,0.85)` + `blur(14px)`) with frosted gradient header (`blur(12px)`), green pulsing dot, monospace messages
- Chat messages: bot bubbles `#eeebe5` light / frosted `rgba(26,26,26,0.85)` + `blur(6px)` dark, user bubbles `#26428b` light / sage dark

### RAG Chatbot Page

- Standalone tester page (no main nav), but fully integrated with global design tokens
- **Header**: branded mini-nav with "ALIYA KOY" logo (links to home) + breadcrumb `Lab / RAG Chatbot` + LIVE DEMO badge + theme toggle. Light: sage `var(--color-green)`. Dark: frosted navy `rgba(11,17,32,0.85)` + `blur(14px)` — matches main nav
- **Layout**: full-viewport two-column grid (320px left + 1fr right), no scroll needed to reach chat
- **Left panel (`.profile-card`)**: dynamic AI Profile Card — gradient initials avatar (derived from company name), company name in serif italic, role, pulsing "Active" status, 4 knowledge section rows with filled/empty dots, "Edit in Console" link pinned to bottom. Light: warm glow + layered shadow. Dark: frosted `rgba(22,22,24,0.85)` + `blur(14px)` + sage glow
- **Chat card (`.preview-card`)**: same card treatment — warm golden glow + shadow light, frosted glass + sage glow dark. Header gradient cream→beige. Messages: user bubbles `var(--color-blue)`, bot bubbles `var(--bot-bg)`
- **Console tab**: side-panel knowledge base editor restyled to site-native forms (cream inputs, blue focus rings, beige sidebar) instead of VS Code dark theme. Light: card glow. Dark: frosted glass
- **Footer**: standard site copyright bar, sage background light, frosted navy glass dark
- **Animations**: page-load fade-in (`.page-load-anim`), message slide-in, pulsing status dots
- **Page-specific variables**: `--panel-alt`, `--success`, `--user-bg`, `--bot-bg`, `--input-bg`, `--sidebar-bg`, `--editor-bg`, `--editor-border`, `--accent`, `--text`
- **Mobile**: left panel hidden, chat fills width, Console uses accordion sections, standard footer
- **Dynamic**: profile card, chat header, and suggestion questions all update from Console changes (company name, role, KB sections)

## Animation Timing

All entrance animations use `cubic-bezier(0.16, 1, 0.3, 1)` easing. Reduced motion media query disables all animations.

## Icons

Currently uses **Font Awesome 6.5** via CDN. Free/regular/brand sets used for:

- Navigation icons, social links, contact info icons, back-to-top chevron, lab buttons, chat avatar
- Theme toggle: `fa-moon` (dark) / `fa-sun` (light)

## Images

- `/assets/profile-pic.jpg` — Profile photo, circular crop
- `/assets/profile-pic.png` — Same photo, PNG format
