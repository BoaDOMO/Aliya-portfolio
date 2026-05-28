# Linen Adaptation Plan — Complete Tokenization

## Scope

Eliminate every hardcoded **font-size**, **component size** (width/height/min-height/max-width),
and **spacing** value across the entire codebase. Replace with design tokens.

**Not in this pass (deferred):** colors, border-radius, box-shadow.

---

## Part A: New Tokens — `src/tokens.css`

### A1. Type Scale (inside `@theme` block)

These 12 tokens replace every hardcoded `font-size` in the codebase.

| Token | Value | What it covers |
|-------|-------|----------------|
| `--text-caption` | 0.625rem (10px) | pipeline labels, status badges, dashboard labels |
| `--text-label` | 0.6875rem (11px) | breadcrumbs, pills, tech tags, form labels |
| `--text-label-lg` | 0.75rem (12px) | project labels, tab buttons, CV text, meta |
| `--text-body-xs` | 0.82rem (13px) | chat bubbles, mini-messages, compact input |
| `--text-body-sm` | 0.875rem (14px) | nav links, buttons, skill list, footer |
| `--text-body` | 1rem (16px) | taglines, form inputs, body copy |
| `--text-body-lg` | 1.125rem (18px) | card titles, emphasis, skill headings |
| `--text-heading-sm` | 1.25rem (20px) | nav logo, small section headings |
| `--text-heading` | 1.5rem (24px) | project titles mobile, preview headings |
| `--text-heading-lg` | 2rem (32px) | project titles, page-hero-sm name |
| `--text-headline` | 2.5rem (40px) | hero mobile, profile hero, contact hero sm |
| `--text-display` | 4rem (64px) | hero name desktop |

**Code to add** (after the existing `--font-*` block in `@theme`):

```css
/* ── Linen Type Scale ── */
--text-caption: 0.625rem;    /* 10px — pipeline, badges, dash labels */
--text-label: 0.6875rem;     /* 11px — breadcrumbs, pills, tags */
--text-label-lg: 0.75rem;    /* 12px — project labels, tabs, CV */
--text-body-xs: 0.82rem;     /* 13px — chat bubbles, compact input */
--text-body-sm: 0.875rem;    /* 14px — nav links, buttons, footer */
--text-body: 1rem;           /* 16px — taglines, form inputs */
--text-body-lg: 1.125rem;    /* 18px — card titles, emphasis */
--text-heading-sm: 1.25rem;  /* 20px — nav logo, section headings */
--text-heading: 1.5rem;      /* 24px — project title mobile */
--text-heading-lg: 2rem;     /* 32px — project titles, hero-sm */
--text-headline: 2.5rem;     /* 40px — hero mobile, profile hero */
--text-display: 4rem;        /* 64px — hero name desktop */
```

### A2. Component Size Tokens (inside `:root` block)

These ~18 tokens cover every hardcoded width/height/min-height/max-width.

```css
/* ── Size Tokens ── */
--size-dot: 8px;             /* status dots, header dots */
--size-icon: 16px;           /* chat icons, checkboxes, pipeline dots */
--size-icon-md: 30px;        /* chat avatars */
--size-icon-lg: 32px;        /* theme toggle, mobile icons */
--size-btn-icon: 38px;       /* send buttons */
--size-backtotop: 44px;      /* back-to-top circle */

--size-photo-sm: 140px;      /* profile photo — mobile */
--size-photo-md: 200px;      /* profile photo — tablet */
--size-photo: 240px;         /* profile photo — desktop */

--width-tagline: 480px;      /* hero tagline max-width */
--width-hero-box: 800px;     /* lab hero content box */
--width-form-sm: 420px;      /* contact form — tablet */
--width-form: 480px;         /* contact form — desktop */
--width-page: 1280px;        /* container max-width */

--height-chat: 380px;        /* mini-chat message body */
--height-textarea: 160px;    /* form/console textarea min-height */
--height-nav: 70px;          /* navigation bar / demo header */
```

### A3. Tracking Tokens (inside `:root` block)

```css
--track-label: 0.14em;       /* uppercase labels */
--track-mono: 0.04em;        /* monospace elements */
```

---

## Part B: `src/style-original.css` — Mappings

### B1. `.grid-container` width + padding (lines 27–33)

```css
/* Before */
.grid-container {
  max-width: 1200px;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

/* After */
.grid-container {
  max-width: var(--width-page);
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}
```

### B2. Font-size — base elements

| Line | Current | Replace with |
|------|---------|-------------|
| 12 | `font-size: 16px` | `font-size: var(--text-body)` |
| 100 | `font-size: 0.9375rem` | `font-size: var(--text-body)` |
| 113 | `font-size: 1.1rem` | `font-size: var(--text-body-lg)` |
| 294 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |
| 364 | `font-size: 1.1rem` | `font-size: var(--text-body-lg)` |
| 390 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |

### B3. Font-size — navigation

| Line | Current | Replace with |
|------|---------|-------------|
| 135 | `font-size: 20px` | `font-size: var(--text-heading-sm)` |
| 157 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |
| 217 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |

### B4. Font-size — footer

| Line | Current | Replace with |
|------|---------|-------------|
| 447 | `font-size: 14px` | `font-size: var(--text-body-sm)` |

### B5. Font-size — hero

| Line | Current | Replace with |
|------|---------|-------------|
| 546 | `font-size: 4rem` | `font-size: var(--text-display)` |
| 550 | `font-size: 2.5rem` | `font-size: var(--text-headline)` |
| 555 | `font-size: 1rem` | `font-size: var(--text-body)` |
| 610 | `font-size: 4.5rem` | `font-size: var(--text-display)` |

### B6. Font-size — contact

| Line | Current | Replace with |
|------|---------|-------------|
| 625 | `font-size: 1rem` | `font-size: var(--text-body)` |
| 638 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |
| 654 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 659 | `font-size: 0.9375rem` | `font-size: var(--text-body)` |

### B7. Font-size — forms

| Line | Current | Replace with |
|------|---------|-------------|
| 737 | `font-size: 0.875rem` | `font-size: var(--text-body-sm)` |
| 752 | `font-size: 0.7rem` | `font-size: var(--text-label)` |
| 762 | `font-size: 0.9375rem` | `font-size: var(--text-body)` |
| 799 | `font-size: 1rem` | `font-size: var(--text-body)` |

### B8. Font-size — misc

| Line | Current | Replace with |
|------|---------|-------------|
| 459 | `font-size: 1rem` | `font-size: var(--text-body)` |
| 1543 | `font-size: 1rem` | `font-size: var(--text-body)` |

### B9. Component sizes

| Line | Current | Replace with |
|------|---------|-------------|
| 530 | `max-width: 800px` | `max-width: var(--width-hero-box)` |
| 556 | `max-width: 480px` | `max-width: var(--width-tagline)` |
| 581 | `width: 240px; height: 240px` | `width: var(--size-photo); height: var(--size-photo)` |
| 697 | `width: 480px` | `width: var(--width-form)` |
| 790 | `min-height: 160px` | `min-height: var(--height-textarea)` |

### B10. Font-size — responsive breakpoints (≤1023px, ≤639px)

| Line | Current | Replace with |
|------|---------|-------------|
| 1380 | `font-size: 3.5rem` | `font-size: var(--text-display)` |
| 1393 | `font-size: 1.9rem` | `font-size: var(--text-heading-lg)` |
| 1400 | `font-size: 0.875rem` | `font-size: var(--text-body-sm)` |
| 1429 | `font-size: 2.75rem` | `font-size: var(--text-headline)` |
| 1433 | `font-size: 2rem` | `font-size: var(--text-heading-lg)` |
| 1470 | `font-size: 2.5rem` | `font-size: var(--text-headline)` |
| 1490 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 1512 | `font-size: 1.6rem` | `font-size: var(--text-heading)` |
| 1532 | `font-size: 1.15rem` | `font-size: var(--text-body-lg)` |

### B11. Component sizes — responsive breakpoints

| Line | Current | Replace with |
|------|---------|-------------|
| 1374–1376 | `width: 200px; height: 200px` | `width: var(--size-photo-md); height: var(--size-photo-md)` |
| 1459–1461 | `width: 140px; height: 140px` | `width: var(--size-photo-sm); height: var(--size-photo-sm)` |

### B12. Font-size — print overrides

| Line | Current | Replace with |
|------|---------|-------------|
| 1294 | `font-size: 1.1rem` | `font-size: var(--text-body-lg)` |
| 1314 | `font-size: 1.25rem` | `font-size: var(--text-heading-sm)` |
| 1319 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 1324 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 1345 | `font-size: 0.8rem` | `font-size: var(--text-body-xs)` |
| 1349 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |

### B13. Section hairline rule (after line 273)

```css
section + section {
  border-top: 1px solid var(--color-border);
}
```

### B14. Layout primitive classes (after the `.grid-container` block)

```css
/* ── Linen Layout Primitives ── */
.l-page {
  max-width: var(--width-page);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}
.l-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-4);
  width: 100%;
}
.l-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}
.l-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}
.l-rule {
  height: 1px;
  background: var(--color-border);
  width: 100%;
  border: 0;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-caption);
  font-weight: 500;
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--color-label-gray);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
}
```

---

## Part C: `src/lab.css` — Lab Page Mappings

### C1. Font-size

| Line | Current | Replace with |
|------|---------|-------------|
| 44 | `font-size: 1.9rem` | `font-size: var(--text-heading-lg)` |
| 55 | `font-size: 1.6rem` | `font-size: var(--text-heading)` |
| 61 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 68 | `font-size: 2.25rem` | `font-size: var(--text-heading-lg)` |
| 84 | `font-size: 0.72rem` | `font-size: var(--text-label)` |
| 98 | `font-size: 0.95rem` | `font-size: var(--text-body-sm)` |
| 150 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |
| 159 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 166 | `font-size: 0.7rem` | `font-size: var(--text-label)` |
| 198 | `font-size: 0.8rem` | `font-size: var(--text-body-xs)` |
| 253 | `font-size: 0.7rem` | `font-size: var(--text-label)` |
| 276 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 304 | `font-size: 0.8rem` | `font-size: var(--text-body-xs)` |
| 322 | `font-size: 0.82rem` | `font-size: var(--text-body-xs)` |

### C2. Component sizes

| Line | Current | Replace with |
|------|---------|-------------|
| 126 | `width: 9px; height: 9px` | `width: var(--size-dot); height: var(--size-dot)` |
| 177 | `height: 380px` | `height: var(--height-chat)` |
| 233 | `width: 16px; height: 16px` | `width: var(--size-icon); height: var(--size-icon)` |

**Intentionally kept as raw values** (micro-sizes that collapse into a single token harms readability):
- `width: 5px; height: 5px` (typing dot — trivial, context-obvious)
- `font-size: 0.5rem` (mini-msg-icon — icon-only context)

---

## Part D: `src/rag-chatbot.css` — RAG Page Mappings

### D1. Font-size

| Line | Current | Replace with |
|------|---------|-------------|
| 52 | `font-size: 20px` | `font-size: var(--text-heading-sm)` |
| 71 | `font-size: 0.72rem` | `font-size: var(--text-label)` |
| 98 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 160 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 179 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |
| 187 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 197 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 257 | `font-size: 0.55rem` | `font-size: var(--text-caption)` |
| 292 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 301 | `font-size: 0.55rem` | `font-size: var(--text-caption)` |
| 313 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 346 | `font-size: 0.85rem` | `font-size: var(--text-body-sm)` |
| 353 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 361 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 370 | `font-size: 0.55rem` | `font-size: var(--text-caption)` |
| 384 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 455 | `font-size: 1rem` | `font-size: var(--text-body)` |
| 463 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 513 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 534 | `font-size: 0.7rem` | `font-size: var(--text-label)` |
| 542 | `font-size: 0.55rem` | `font-size: var(--text-caption)` |
| 549 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 567 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 594 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 694 | `font-size: 1.05rem` | `font-size: var(--text-body)` |
| 702 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 715 | `font-size: 0.72rem` | `font-size: var(--text-label)` |
| 786 | `font-size: 0.82rem` | `font-size: var(--text-body-xs)` |
| 813 | `font-size: 0.72rem` | `font-size: var(--text-label)` |
| 832 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 867 | `font-size: 0.82rem` | `font-size: var(--text-body-xs)` |
| 898 | `font-size: 0.85rem` | `font-size: var(--text-body-sm)` |
| 970 | `font-size: 0.62rem` | `font-size: var(--text-caption)` |
| 988 | `font-size: 0.78rem` | `font-size: var(--text-label-lg)` |
| 1039 | `font-size: 0.65rem` | `font-size: var(--text-caption)` |
| 1047 | `font-size: 0.9rem` | `font-size: var(--text-body-sm)` |
| 1066 | `font-size: 0.82rem` | `font-size: var(--text-body-xs)` |
| 1088 | `font-size: 0.8rem` | `font-size: var(--text-body-xs)` |
| 1113 | `font-size: 0.72rem` | `font-size: var(--text-label)` |
| 1151 | `font-size: 0.85rem` | `font-size: var(--text-body-sm)` |
| 1159 | `font-size: 0.7rem` | `font-size: var(--text-label)` |
| 1186 | `font-size: 14px` | `font-size: var(--text-body-sm)` |

### D2. Component sizes

| Line | Current | Replace with |
|------|---------|-------------|
| 41 | `height: 70px` | `height: var(--height-nav)` |
| 207–208 | `width: 7px; height: 7px` | `width: var(--size-dot); height: var(--size-dot)` |
| 235–236 | `width: 18px; height: 18px` | `width: var(--size-icon); height: var(--size-icon)` |
| 672–673 | `width: 9px; height: 9px` | `width: var(--size-dot); height: var(--size-dot)` |
| 770–771 | `width: 30px; height: 30px` | `width: var(--size-icon-md); height: var(--size-icon-md)` |
| 887–888 | `width: 38px; height: 38px` | `width: var(--size-btn-icon); height: var(--size-btn-icon)` |
| 1073 | `min-height: 180px` | `min-height: var(--height-textarea)` |

**Intentionally kept as raw values:**
- `width: 6px; height: 6px` (typing dot — trivial)
- `width: 180px` (code sidebar — one-off layout)
- `min-height: 140px` (accordion textarea — context-specific)

---

## Part E: `src/design-system.css` — Design System Page Mappings

Only tokenize the UI chrome (controls, inputs, buttons). Keep demo/preview content sizes as-is.

### E1. Font-size — UI chrome only

| Line | Current | Replace with |
|------|---------|-------------|
| 44 | `font-size: 1.125rem` | `font-size: var(--text-body-lg)` |
| 59 | `font-size: 0.68rem` | `font-size: var(--text-caption)` |
| 71 | `font-size: 0.62rem` | `font-size: var(--text-caption)` |
| 117 | `font-size: 1rem` | `font-size: var(--text-body)` |
| 356 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 393 | `font-size: 0.8125rem` | `font-size: var(--text-body-xs)` |

All other font-size declarations in `design-system.css` are for demo content (swatches, preview type samples, spacing visualizers) and intentionally kept hardcoded — they are test fixtures, not production components.

---

## Part F: `cv.html` — CV Page Mappings

The CV page uses inline styles within a `<style>` block. Custom properties are still accessible since `:root` tokens are global.

| Line | Current | Replace with |
|------|---------|-------------|
| 36 | `font-size: 0.85rem` | `font-size: var(--text-body-sm)` |
| 48 | `font-size: 0.85rem` | `font-size: var(--text-body-sm)` |
| 105 | `font-size: 1.9rem` | `font-size: var(--text-heading-lg)` |
| 112 | `font-size: 0.82rem` | `font-size: var(--text-body-xs)` |
| 119 | `font-size: 0.73rem` | `font-size: var(--text-label)` |
| 136 | `font-size: 0.8rem` | `font-size: var(--text-body-xs)` |
| 148 | `font-size: 0.78rem` | `font-size: var(--text-label-lg)` |
| 168 | `font-size: 0.72rem` | `font-size: var(--text-label)` |
| 184 | `font-size: 0.7rem` | `font-size: var(--text-label)` |
| 196 | `font-size: 0.6rem` | `font-size: var(--text-caption)` |
| 220 | `font-size: 0.88rem` | `font-size: var(--text-body-sm)` |
| 226 | `font-size: 0.68rem` | `font-size: var(--text-caption)` |
| 234 | `font-size: 0.75rem` | `font-size: var(--text-label-lg)` |
| 246 | `font-size: 0.73rem` | `font-size: var(--text-label)` |
| 271 | `font-size: 0.72rem` | `font-size: var(--text-label)` |

---

## Part G: `DESIGN.md` — Documentation Update

Update these sections:
- **Layout** — `max-width: 1200px` → `var(--width-page)` (1280px), 12-column grid available
- **Spacing** — document new size tokens table
- **Typography** — document the 12-step type scale table, replacing Georgia with Archivo Narrow
- **Components** — note that sizes now use tokens; mention new layout primitives

---

## Execution Order

```
1. src/tokens.css          → Add A1 (type scale), A2 (size tokens), A3 (tracking tokens)
2. src/style-original.css  → Apply B1–B14 (all mappings + layout primitives + hairline rules)
3. src/lab.css             → Apply C1–C2
4. src/rag-chatbot.css     → Apply D1–D2
5. src/design-system.css   → Apply E1 (UI chrome only)
6. cv.html                 → Apply F1 (inline font-sizes)
7. npm run build           → Rebuild Tailwind output
8. Visual review           → Open index.html, profile.html, contact.html, lab.html, rag-chatbot.html in browser
```

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Consolidating 0.55–0.6rem → 0.625rem makes some text larger | Medium | This is desirable — improves readability on tiny labels |
| 0.9rem → 0.875rem shifts nav/button sizes by ~3% | Low | Imperceptible at this scale |
| Contact hero 4.5rem → 4rem (standardized with index hero) | Low | Intentional — both heroes now match |
| Chat bubble text 0.82rem stays 0.82rem | None | `--text-body-xs` = 0.82rem, exact match |
| Token names wrong for context | Low | Context-specific naming (`--size-photo`, not `--size-md`) ensures clarity |
| Build breaks from syntax errors | Low | Each file edited one at a time, rebuild after each |
