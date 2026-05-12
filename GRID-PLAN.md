# 8-Grid System Implementation Plan

## Overview

Migrate the current ad-hoc layout system to a formal **8-column grid** with an **8px-based spacing scale**, aligned with **Tailwind v4 standard breakpoints**.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/tokens.css` | Add 8px spacing scale + 8-col grid tokens |
| `src/style-original.css` | Convert spacing → tokens, add grid system, rewrite media queries |
| `lab.html` | Replace inline `.project-section` grid with 8-col grid |
| `rag-chatbot.html` | Minimal spacing cleanup (standalone app page) |
| `DESIGN.md` | Document new grid system |
| All `.html` files | Wrap content in `.grid-container` elements |

### Not changed

- `cv.html` — standalone A4 print page, separate layout
- `mediaqueries.css` — already a placeholder
- `script.js` — no layout changes needed
- `package.json`, `postcss.config.js` — no config changes needed

---

## Part 1: 8px Spacing Scale

### `src/tokens.css` — Add to existing `@theme`

```css
@theme {
  /* ── 8px Spacing Scale ── */
  --spacing-1: 0.5rem;    /* 8px */
  --spacing-2: 1rem;      /* 16px */
  --spacing-3: 1.5rem;    /* 24px */
  --spacing-4: 2rem;      /* 32px */
  --spacing-5: 2.5rem;    /* 40px */
  --spacing-6: 3rem;      /* 48px */
  --spacing-7: 3.5rem;    /* 56px */
  --spacing-8: 4rem;      /* 64px */
  --spacing-9: 4.5rem;    /* 72px */
  --spacing-10: 5rem;     /* 80px */
  --spacing-12: 6rem;     /* 96px */
  --spacing-14: 7rem;     /* 112px */
  --spacing-16: 8rem;     /* 128px */
  --spacing-20: 10rem;    /* 160px */
  --spacing-24: 12rem;    /* 192px */

  /* ── 8-Column Grid Tokens ── */
  --grid-template-columns-8: repeat(8, minmax(0, 1fr));
  --grid-column-span-1: span 1 / span 1;
  --grid-column-span-2: span 2 / span 2;
  --grid-column-span-3: span 3 / span 3;
  --grid-column-span-4: span 4 / span 4;
  --grid-column-span-5: span 5 / span 5;
  --grid-column-span-6: span 6 / span 6;
  --grid-column-span-7: span 7 / span 7;
  --grid-column-span-8: span 8 / span 8;
}
```

> **Note**: Tailwind's default `--spacing` is NOT overridden. Only explicit 8px tokens are added. The existing Tailwind spacing utilities (`gap-4`, `p-2`, etc.) remain at their 4px-base defaults for backward compatibility.

---

## Part 2: Breakpoint Strategy

### Current → New

| Breakpoint | Old | New (Tailwind standard) |
|---|---|---|
| Mobile | `≤700px` | **`≤639px`** | `<sm` |
| Tablet portrait | — | **`640px–767px`** | `sm`–`md` |
| Tablet landscape | `≤1024px` | **`768px–1023px`** | `md`–`lg` |
| Desktop | `701–1920px` | **`1024px–1279px`** | `lg`–`xl` |
| Large desktop | — | **`1280px–1535px`** | `xl`–`2xl` |
| Ultrawide | `≥1920px` / `≥2560px` | **`≥1536px`** | `≥2xl` |

### Font-size scaling

| Range | `html` font-size | `2rem` actual |
|---|---|---|
| `≤639px` | `0.875rem` | 28px |
| `640px–1535px` | `1rem` | 32px |
| `≥1536px` | `1.75rem` | 56px |

### Content container

Add a max-width container for readability on wide screens:

```css
.grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}
```

**Recommendation**: **1200px** — standard width, optimal line length for readability, widely adopted across modern frameworks. Current `.main-wrapper` max-width of 2560px is too wide.

---

## Part 3: Layout Behavior Per Breakpoint

### `≤639px` — Mobile

- **All pages**: 8-col grid collapses to 1 column
- **Nav**: hamburger menu visible
- **Home (`index.html`)**: hero content stacked, buttons full-width
- **Profile (`profile.html`)**: skills stack vertically (1-col), timeline single-col
- **Lab (`lab.html`)**: hero compact, project info + widget stack
- **Contact (`contact.html`)**: photo → text → form stack, form full-width

**Section padding**: `var(--spacing-8)` top/bottom (4rem), `var(--spacing-4)` sides (2rem)

### `640px–767px` — Tablet Portrait

- **Nav**: hamburger menu visible
- **Home**: hero content spans col-2 to col-7 (centered within 8-col)
- **Profile**: skills 2-col layout (3 items → 2+1 wrap), timeline normal
- **Lab**: project info + widget stack (col-span-8 each)
- **Contact**: left column + right column stack vertically

**Section padding**: `var(--spacing-10)` top/bottom (5rem), `var(--spacing-4)` sides (2rem)

### `768px–1023px` — Tablet Landscape

- **Nav**: hamburger menu visible
- **Home**: hero content col-2 to col-7
- **Profile**: skills 3-col within 8-col container, timeline normal
- **Lab**: project info col-span-3, widget col-span-5
- **Contact**: 8-col grid active: left col-span-4, right col-span-4

**Section padding**: `var(--spacing-10)` top/bottom (5rem), `var(--spacing-4)` sides (2rem)

### `1024px–1279px` — Desktop

- **Nav**: desktop nav visible
- **Home**: hero content col-3 to col-6
- **Profile**: full 8-col layouts
- **Lab**: project info col-span-3, widget col-span-5
- **Contact**: left col-span-4, right col-span-4

**Section padding**: `var(--spacing-10)` top/bottom (5rem), `var(--spacing-4)` sides (2rem)

### `1280px–1535px` — Large Desktop

- Same as desktop but **container max-width** constrains content
- Content centered on screen
- All layouts same as 1024px–1279px

### `≥1536px` — Ultrawide

- `html` font-size: `1.75rem` (scales spacing proportionally)
- Container max-width constrains content
- All content centered

---

## Part 4: Specific CSS Changes

### 4A. `src/style-original.css` — Spacing conversions

Every hardcoded spacing value maps to the new 8px scale:

| Line(s) | Current | New |
|---------|---------|-----|
| 257 | `section { padding: 5rem 2rem; }` | `section { padding: var(--spacing-10) var(--spacing-4); }` |
| 265 | `.first-section { @apply pt-20; }` | `.first-section { padding-top: var(--spacing-10); }` |
| 272 | `#profile { gap: 5rem; }` | (replaced by 8-col grid) |
| 297 | `.social-links { gap: 0.5rem; }` | `.social-links { gap: var(--spacing-1); }` |
| 316 | `.btn-container { gap: 1rem; }` | `.btn-container { gap: var(--spacing-2); }` |
| 322 | `.btn { padding: 1rem; width: 8rem; }` | `.btn { padding: var(--spacing-2); }` |
| 360 | `.skills-categories { gap: 2.5rem; }` | `.skills-categories { gap: var(--spacing-5); }` |
| 365 | `.skill-category { padding: 2.5rem 1.5rem; }` | `.skill-category { padding: var(--spacing-5) var(--spacing-3); }` |
| 374 | `.skill-category:hover { padding: 2rem 1.5rem; }` | `.skill-category:hover { padding: var(--spacing-4) var(--spacing-3); }` |
| 436 | `.experience-timeline { padding-left: 2.75rem; }` | `.experience-timeline { padding-left: var(--spacing-5); }` |
| 445 | `.experience { margin-bottom: 2.25rem; }` | `.experience { margin-bottom: var(--spacing-5); }` |
| 471 | `footer { padding: 1.25rem 2rem; }` | `footer { padding: var(--spacing-3) var(--spacing-4); }` |
| 485 | `.back-to-top { bottom: 2rem; right: 2rem; }` | `.back-to-top { bottom: var(--spacing-4); right: var(--spacing-4); }` |
| 574 | `.page-hero { padding: 4rem 5%; }` | `.page-hero { padding: var(--spacing-8) 5%; }` |
| 580 | `.page-hero-sm { padding: 8rem 5% 4rem; }` | `.page-hero-sm { padding: var(--spacing-16) 5% var(--spacing-8); }` |
| 589 | `.lab-hero { padding: 5rem 5%; }` | `.lab-hero { padding: var(--spacing-10) 5%; }` |
| 648 | `.contact-hero { gap: 7rem; padding: 8rem 5% 5rem; }` | `.contact-hero { gap: var(--spacing-14); padding: var(--spacing-16) 5% var(--spacing-10); }` |
| 679 | `.contact-hero-text { gap: 1.25rem; }` | `.contact-hero-text { gap: var(--spacing-3); }` |
| 692 | `.contact-info-list { gap: 1rem; margin-top: 1.5rem; }` | `.contact-info-list { gap: var(--spacing-2); margin-top: var(--spacing-3); }` |
| 742 | `.contact-hero-left { gap: 2rem; }` | `.contact-hero-left { gap: var(--spacing-4); }` |
| 751 | `.contact-form-card { padding: 3rem; width: 480px; }` | `.contact-form-card { padding: var(--spacing-6); }` (width stays 480px) |
| 774 | `.contact-form { gap: 1.5rem; }` | `.contact-form { gap: var(--spacing-3); }` |
| 816 | `.form-input, .form-textarea { padding: 1.1rem 1.25rem; }` | `.form-input, .form-textarea { padding: var(--spacing-2) var(--spacing-3); }` |
| 853 | `.btn-send { padding: 1.1rem 2rem; }` | `.btn-send { padding: var(--spacing-2) var(--spacing-4); }` |

### 4B. Adding the grid container utility

```css
.grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
  width: 100%;
}

/* 8-column grid convenience */
.grid-8 {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--spacing-4);
}

@media (max-width: 639px) {
  .grid-8 {
    grid-template-columns: 1fr;
  }
}
```

### 4C. Converting `#profile` (homepage hero) from flex to 8-col grid

```css
#profile {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;
  gap: var(--spacing-10);
  min-height: 86vh;
  margin-bottom: 0;
}

.profile_pic_container {
  grid-column: span 3;
}

.profile_text {
  grid-column: span 5;
}

@media (max-width: 767px) {
  #profile {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
    text-align: center;
  }

  .profile_pic_container,
  .profile_text {
    grid-column: span 1;
  }
}
```

### 4D. Converting `.contact-hero` from flex to 8-col grid

```css
.contact-hero {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--spacing-14);
  align-items: center;
  min-height: 80vh;
  padding: var(--spacing-16) 5% var(--spacing-10);
}

.contact-hero-left {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.contact-hero-right {
  grid-column: span 4;
}

@media (max-width: 1023px) {
  .contact-hero {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
    text-align: center;
  }

  .contact-hero-left,
  .contact-hero-right {
    grid-column: span 1;
  }
}
```

### 4E. Media query rewrites

Replace all current media queries (lines 1441–1640) with:

```css
/* ── TABLET PORTRAIT: 640px – 767px ── */
@media screen and (max-width: 767px) {
  .skills-categories {
    grid-template-columns: 1fr 1fr;
  }

  .contact-form-card {
    width: 100%;
    padding: var(--spacing-5);
  }
}

/* ── TABLET LANDSCAPE: 768px – 1023px ── */
@media screen and (max-width: 1023px) {
  #desktop-nav {
    display: none;
  }

  #hamburger-nav {
    display: flex;
  }

  .contact-hero-photo {
    width: 200px;
    height: 200px;
  }

  .contact-hero-text .hero-name {
    font-size: 3.5rem;
  }

  .contact-form-card {
    width: 420px;
  }

  .project-info {
    align-items: center;
    text-align: center;
  }

  .project-title {
    font-size: 1.9rem;
  }
}

/* ── MOBILE: ≤639px ── */
@media screen and (max-width: 639px) {
  html {
    font-size: 0.875rem;
  }

  section {
    padding: var(--spacing-8) 5%;
  }

  .first-section {
    padding-top: var(--spacing-12);
  }

  .page-hero {
    padding: var(--spacing-8) 5%;
    gap: var(--spacing-2);
  }

  .page-hero-sm {
    padding: var(--spacing-12) 5% var(--spacing-6);
  }

  .lab-hero {
    padding: var(--spacing-16) 5% var(--spacing-6);
  }

  .hero-name {
    font-size: 2.75rem;
  }

  .page-hero-sm .hero-name {
    font-size: 2rem;
  }

  .hero-btns {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 280px;
  }

  .hero-btn {
    width: 100% !important;
    text-align: center;
    justify-content: center;
    display: flex;
  }

  .contact-hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-4);
    min-height: auto;
    padding: var(--spacing-8) 5%;
  }

  .contact-hero-photo {
    width: 140px;
    height: 140px;
  }

  .contact-hero-text {
    align-items: center;
    text-align: center;
  }

  .contact-hero-text .hero-name {
    font-size: 2.5rem;
  }

  .contact-hero-text .hero-tagline {
    text-align: center;
  }

  .contact-info-item {
    gap: 0.75rem;
  }

  .contact-info-icon {
    width: 34px;
    height: 34px;
    font-size: 0.75rem;
    border-radius: 10px;
  }

  .contact-hero-left {
    align-items: center;
  }

  .contact-hero-right {
    width: 100%;
  }

  .contact-form-card {
    width: 100%;
    padding: var(--spacing-4);
  }

  .form-heading-line {
    margin-bottom: 1.5rem;
  }

  .project-title {
    font-size: 1.6rem;
  }

  .skills-categories {
    grid-template-columns: 1fr;
  }

  .experience-timeline {
    padding-left: var(--spacing-4);
  }

  .btn-container {
    flex-direction: column;
    align-items: center;
  }

  .btn-container .btn {
    width: 12rem !important;
  }

  .menu-links {
    left: -100vw;
    width: 100vw;
  }
}

/* ── LARGE SCREENS: ≥1536px ── */
@media screen and (min-width: 1536px) {
  html {
    font-size: 1.75rem;
  }
}
```

---

## Part 5: lab.html — Inline Style Changes

### 5A. Replace `.project-section` grid (lines 25–46)

**Remove** the current rules and replace with:

```css
.project-section {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--spacing-8);
  align-items: center;
  padding: 10vh 5%;
}

.project-info {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-3);
  text-align: left;
}

.project-widget {
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
}

@media screen and (max-width: 1023px) {
  .project-section {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
    padding: var(--spacing-16) 5% var(--spacing-10);
  }

  .project-info,
  .project-widget {
    grid-column: span 1;
  }

  .project-info {
    align-items: center;
    text-align: center;
  }

  .project-title {
    font-size: 1.9rem;
  }
}

@media screen and (max-width: 639px) {
  .project-section {
    gap: var(--spacing-4);
    padding: var(--spacing-12) 5% var(--spacing-8);
  }

  .project-title {
    font-size: 1.6rem;
  }
}
```

### 5B. Minor spacing updates

- `.tech-pills` gap: `0.5rem` → `var(--spacing-1)`
- `.project-info` gap (already `var(--spacing-3)` from above)

---

## Part 6: rag-chatbot.html — Spacing Cleanup

Minimal changes since this is a standalone app:

| Line(s) | Current | New |
|---------|---------|-----|
| 250 | `.panel-main { padding: 2rem; }` | `.panel-main { padding: var(--spacing-4); }` |
| 173 | `.instructions-body { padding: 1.5rem 1.25rem; }` | `.instructions-body { padding: var(--spacing-3); }` |
| 536 | `.chat-input-area { padding: 0.75rem 1.25rem; }` | `.chat-input-area { padding: var(--spacing-2) var(--spacing-3); }` |

---

## Part 7: HTML Structure Changes

### All pages: Wrap main content in `.grid-container`

**index.html**:
```html
<main class="page-load-anim">
  <div class="grid-container">
    <section id="profile" class="page-hero">
      ...
    </section>
  </div>
</main>
```

**profile.html**:
```html
<main class="page-load-anim">
  <div class="grid-container">
    <section id="skills" class="fade-in first-section">
      ...
    </section>
    <section id="experience" class="fade-in">
      ...
    </section>
    <section id="education" class="fade-in">
      ...
    </section>
  </div>
</main>
```

**lab.html** (hero section):
```html
<main class="page-load-anim">
  <div class="grid-container">
    <section class="page-hero page-hero-sm lab-hero">
      ...
    </section>
  </div>
  <!-- .project-section already has its own padding — stays outside container or inside with full-width -->
</main>
```

**contact.html**:
```html
<main class="page-load-anim">
  <div class="grid-container">
    <section class="contact-hero">
      ...
    </section>
  </div>
</main>
```

---

## Part 8: `DESIGN.md` Documentation Updates

Replace the **Layout** and **Padding Standard** sections with:

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

---

## Implementation Order

1. **`src/tokens.css`** — Add spacing tokens + grid tokens
2. **`src/style-original.css`** — Add `.grid-container` + `.grid-8` utilities, convert spacing values, rewrite media queries, convert `#profile` and `.contact-hero` to grid
3. **`lab.html`** — Replace inline `.project-section` grid, add spacing tokens
4. **`rag-chatbot.html`** — Minor spacing updates
5. **All `.html` files** — Wrap content in `.grid-container`
6. **`DESIGN.md`** — Document new system
7. **Build + verify**: `npm run build` and visually check

---

## Open Questions

## Recommendations

1. **Container max-width**: **1200px** — standard width, optimal line length for readability, widely adopted.
2. **`.grid-container` scope**: **Main content only** — nav and footer span full width for visual impact (current behavior). `.grid-container` wraps `<main>` content only.
3. **Font-size at 640–767px**: **`1rem`** — tablet portrait is still a "real" device size (768px). Using `0.875rem` at this width makes text unnecessarily small.
