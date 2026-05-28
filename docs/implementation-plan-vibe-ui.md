# VIBE UI — Implementation Plan

> **Status**: Build-ready
> **PRD**: `docs/prd-vibe-ui.md`
> **Stack**: Vanilla HTML/CSS/JS, Tailwind CSS v4, Chroma.js, Google Fonts
> **Deployment**: Vercel static (`vibe-ui/index.html` served at `/vibe-ui/`)


---

## 1. File Manifest

```
vibe-ui/
├── index.html          # Entry point. Demo header, control panel, preview, footer.
├── style.css           # Page-specific styles (layout, controls, preview components).
├── engine.js           # Theme generation engine — pure functions, no DOM.
├── presets.js          # Curated data: presets, font pool, harmony rules.
├── exports.js          # Export template functions for all 7 formats.
├── ui.js               # DOM bindings, state management, event handlers.
└── README.md           # Lab project description + link to PRD.

Modified existing files:
├── lab.html            # Add VIBE UI project card (after RAG chatbot card).
└── docs/
    ├── prd-vibe-ui.md           # Source-of-truth spec.
    └── implementation-plan-vibe-ui.md  # This file.
```

### File responsibilities

| File | Concern | Dependencies |
|---|---|---|
| `engine.js` | Color generation (OKLCH), typography pairing, spacing scales, radius/shadows. Pure functions. Returns `ThemeDNA`. | `presets.js` (reads preset definitions, font matrix) |
| `presets.js` | Static data. 10 aesthetic presets, ~50 font definitions, harmony rules, spacing philosophies. No imports. | None |
| `exports.js` | 7 pure template functions. Each takes `ThemeDNA` → returns formatted string. No DOM. | None |
| `ui.js` | App state (`ThemeDNA` + lock state), DOM rendering, event listeners, localStorage, URL sharing, clipboard. | `engine.js`, `exports.js` |
| `style.css` | Control panel chrome, preview component styles. Uses `var(--*)` injected by `ui.js`. | None (standalone, loaded after `style.css`) |
| `index.html` | Skeleton: header, left panel (presets, randomize, locks, sliders, export), right panel (preview), footer. | `style.css`, `vibe-ui/style.css`, `engine.js`, `presets.js`, `exports.js`, `ui.js` |


---

## 2. ThemeDNA Data Structure

The central state object. One instance per session. Stored in `ui.js`, read by preview renderer and export functions.

```typescript
// Conceptual — JavaScript object, no TypeScript required.
const ThemeDNA = {
  id: string,                           // "vibe_a1b2c3d4"
  name: string,                         // "Warm Brutalist" (auto-generated)
  seed: number,                         // reproducible random seed
  aesthetic: string,                    // "brutalist" | "soft-saas" | ...

  colors: {
    light: {
      primary: string,                  // oklch(...) or #HEX
      primaryForeground: string,
      background: string,
      foreground: string,
      surface: string,
      surfaceElevated: string,
      muted: string,
      mutedForeground: string,
      border: string,
      input: string,
      ring: string,
      accent: string,
      accentForeground: string,
      secondary: string,
      secondaryForeground: string,
      success: string,
      warning: string,
      error: string,
      info: string,
    },
    dark: { /* same keys as light */ },
  },

  typography: {
    headingFont: string,                // "Instrument Serif"
    headingWeight: number,              // 400
    bodyFont: string,                   // "Inter"
    bodyWeight: number,                 // 400
    monoFont: string,                   // "JetBrains Mono"
    monoWeight: number,                 // 400
    scaleRatio: number,                 // 1.25
    baseSizePx: number,                 // 16
    lineHeight: number,                 // 1.6
  },

  spacing: {
    baseUnit: number,                   // 4
    density: string,                    // "compact" | "comfortable" | "airy"
    scale: number[],                    // [4, 8, 12, 16, 24, 32, 48, 64, 96]
    pagePadding: string,                // "40px"
    sectionGap: string,                 // "80px"
    cardPadding: string,                // "24px"
    componentGap: string,              // "16px"
  },

  radius: {
    sm: string,                         // "4px"
    md: string,                         // "8px"
    lg: string,                         // "16px"
    full: string,                       // "9999px"
  },

  shadows: {
    sm: string,                         // box-shadow value
    md: string,
    lg: string,
    xl: string,
    '2xl': string,
    color: string,                      // shadow tint in oklch
    softness: number,                   // 0–1
  },

  borders: {
    width: string,                      // "1px"
    style: string,                      // "sharp" | "soft" | "barely-there"
  },

  personality: {
    energy: number,                     // 0–1
    warmth: number,                     // 0–1
    modernity: number,                  // 0–1
    playfulness: number,                // 0–1
  },
};
```

### Lock state (separate, in `ui.js`)

```javascript
const lockState = {
  colors: false,
  fonts: false,
  spacing: false,
  radius: false,
  shadows: false,
};
```


---

## 3. Function Inventory

### 3.1 `engine.js` — Theme Generation

| Function | Signature | Description |
|---|---|---|
| `generateTheme(lockState?, previousTheme?)` | `→ ThemeDNA` | Full theme generation. Respects locks. |
| `generateColors(aesthetic, lockState?, previous?)` | `→ { light: ColorRoles, dark: ColorRoles }` | OKLCH color palette generation with harmony rules |
| `generateTypography(aesthetic, lockState?, previous?)` | `→ Typography` | Font pairing from matrix |
| `generateSpacing(aesthetic, lockState?, previous?)` | `→ Spacing` | Scale + density from philosophy |
| `generateRadius(aesthetic, lockState?, previous?)` | `→ Radius` | Radius system from category |
| `generateShadows(aesthetic, lockState?, previous?)` | `→ Shadows` | Elevation-based shadows with tint |
| `generateName(themeDNA)` | `→ string` | Auto-name from aesthetic + color adjectives |
| `generatePersonality(aesthetic)` | `→ Personality` | Personality dimensions from preset |
| `randomHue(baseAngle?)` | `→ number` | Curated hue sampling (not uniform 0–360) |
| `harmonyHues(baseHue, rule)` | `→ number[]` | Generate harmony hue set |
| `oklchToHex(l, c, h)` | `→ string` | Convert OKLCH to hex (uses Chroma.js) |
| `ensureContrast(fg, bg, minRatio)` | `→ string` | Adjust lightness to meet contrast (uses Chroma.js) |
| `buildShadow(elevation, tint, softness)` | `→ string` | Generate box-shadow string |
| `seededRandom(seed)` | `→ function` | Seeded PRNG for reproducibility |

### 3.2 `presets.js` — Curated Data

| Export | Type | Description |
|---|---|---|
| `AESTHETIC_PRESETS` | `Object` | 10 presets, each with ranges for all dimensions |
| `FONT_POOL` | `Object` | ~50 fonts grouped by category (geometric, humanist, grotesque, serif, slab, display, mono) |
| `FONT_PAIRINGS` | `Object` | Matrix of compatible heading+body combinations |
| `COLOR_HARMONY_RULES` | `Array` | ["monochromatic", "analogous", "complementary", "split-complementary", "triadic"] |
| `SPACING_PHILOSOPHIES` | `Object` | 3 philosophies: compact, comfortable, airy — each with scale arrays |
| `COLOR_NAMES` | `Object` | Adjective + hue name pairs for theme naming |

### 3.3 `exports.js` — Export Templates

| Function | Signature | Description |
|---|---|---|
| `exportDESIGN_MD(theme)` | `→ string` | Full DESIGN.md following Google's draft spec |
| `exportCSS_Vars(theme)` | `→ string` | Generic CSS custom properties with `:root` and `.dark` |
| `exportShadcnUI(theme)` | `→ string` | shadcn/ui `globals.css` format |
| `exportTailwindV4(theme)` | `→ string` | Tailwind v4 `@theme` block |
| `exportDaisyUI(theme)` | `→ string` | daisyUI `@plugin "daisyui/theme"` block |
| `exportJSON_Tokens(theme)` | `→ string` | W3C DTCG-compatible JSON |
| `exportAI_Prompt(theme)` | `→ string` | Structured AI prompt context |

### 3.4 `ui.js` — Application Logic

| Function | Signature | Description |
|---|---|---|
| `init()` | — | Bootstrap. Generate theme, render UI, bind events. |
| `applyPreset(name)` | — | Apply preset to unlocked dimensions, regenerate unlocked |
| `randomizeAll()` | — | Generate full new theme |
| `randomizeDimension(dim)` | — | Regenerate one dimension, respecting locks |
| `toggleLock(dim)` | — | Toggle lock for dimension |
| `updateSlider(dim, value)` | — | Apply slider change to specific dimension |
| `renderPreview(theme)` | — | Inject CSS vars into preview container, update DOM |
| `renderControls(theme, locks)` | — | Update lock icons, preset highlight, slider positions |
| `copyToClipboard(text)` | — | Copy string to clipboard, show feedback |
| `downloadFile(content, filename)` | — | Trigger file download |
| `saveState()` | — | Persist ThemeDNA + locks to localStorage |
| `loadState()` | `→ ThemeDNA \| null` | Restore from localStorage |
| `encodeURL(theme)` | `→ string` | Encode theme as URL hash |
| `decodeURL()` | `→ ThemeDNA \| null` | Decode theme from URL hash |
| `loadFont(family, weight)` | — | Dynamically load a Google Font |
| `applyFontsToPreview(theme)` | — | Load and apply heading+body+mono fonts to preview |


---

## 4. Build Phases

### Phase 1: Engine + Bare Preview (Core Foundation)

**Goal**: `engine.js` + `presets.js` work. A minimal `index.html` calls `generateTheme()` and renders a basic preview.

**Files created**: `vibe-ui/engine.js`, `vibe-ui/presets.js`, `vibe-ui/index.html` (skeleton), `vibe-ui/ui.js` (minimal: `init()`, `renderPreview()`)

**Acceptance criteria**:
- [ ] `generateTheme()` returns a valid `ThemeDNA` object
- [ ] Color palette has WCAG AA contrast for text/background pairs
- [ ] Font pairing is valid (both fonts exist in pool)
- [ ] Spacing scale is mathematically coherent
- [ ] Preview shows: 3 buttons (primary, secondary, ghost), 1 card, H1/H2/body text
- [ ] Theme auto-generates on page load
- [ ] Preview uses injected CSS custom properties (generic CSS variable format)

**Key implementation notes**:
- Chroma.js added via CDN `<script>` tag (or npm if you prefer: `npm install chroma-js`)
- Manual OKLCH ↔ HEX conversion requires `color-mix()` CSS function — simpler to use Chroma.js
- Seeded PRNG: use a simple mulberry32 or xoshiro128 implementation (~10 lines)
- Font loading: use `document.fonts.load()` with Google Fonts CSS API

### Phase 2: Controls + Lock System

**Goal**: User can randomize, lock dimensions, select presets, and adjust sliders.

**Files modified**: `vibe-ui/ui.js`, `vibe-ui/index.html`, `vibe-ui/style.css`

**Acceptance criteria**:
- [ ] "Randomize All" button generates a new complete theme
- [ ] Per-dimension randomize buttons (🎲 Colors, 🎲 Fonts, etc.) work
- [ ] Lock toggles prevent locked dimensions from being randomized
- [ ] Lock icons update visually (🔒/🔓)
- [ ] Preset selector (dropdown or pill row) applies preset to unlocked dimensions
- [ ] Sliders (radius, spacing density, shadow softness, color energy, contrast) update theme in real-time
- [ ] Font family dropdown filters preview
- [ ] Font pairing dropdown filters preview
- [ ] Preview updates within 50ms of any control change

**Key implementation notes**:
- Lock state: plain object, updated via `toggleLock()`, checked by `generateTheme()` before regenerating each dimension
- Sliders: `<input type="range">` elements. Values mapped to dimension-specific logic (e.g., radius slider 0–100 maps to 0px–24px)
- Presets: dropdown of 10 options. Selecting one calls `applyPreset()` which updates aesthetic and regenerates
- Debounce slider updates at 16ms (one frame) to avoid excessive re-renders

### Phase 3: Export System

**Goal**: All 7 export formats work. Copy and download.

**Files created**: `vibe-ui/exports.js`
**Files modified**: `vibe-ui/ui.js`, `vibe-ui/index.html`, `vibe-ui/style.css`

**Acceptance criteria**:
- [ ] DESIGN.md export matches Google's draft spec format
- [ ] CSS variables export includes `:root` and `.dark` blocks with semantic names
- [ ] shadcn/ui export maps to `--primary`, `--background`, `--foreground`, `--muted`, `--accent`, `--border`, `--input`, `--ring`, `--destructive`, `--radius`, chart colors
- [ ] daisyUI export maps to `@plugin "daisyui/theme"` with `--color-primary`, `--color-base-100`, etc.
- [ ] Tailwind v4 export produces `@theme { ... }` block
- [ ] JSON export is valid W3C DTCG format
- [ ] AI prompt export is structured, pasteable into Cursor/Claude/OpenCode/ChatGPT
- [ ] Copy-to-clipboard button works for each format (with success feedback)
- [ ] Download-as-file button works for each format (correct filename + extension)
- [ ] Export section shows all 7 formats with copy + download per row

**Key implementation notes**:
- Each export function is a pure string template function. No side effects.
- Filename convention: `vibe-ui-[name]-[theme-name].[ext]` (e.g., `vibe-ui-warm-brutalist.css`)
- Copy uses `navigator.clipboard.writeText()`. Fallback: `document.execCommand('copy')` for older browsers.
- Download uses `Blob` + `URL.createObjectURL()` + programmatic `<a>` click.

### Phase 4: Polish + Integration

**Goal**: Full preview, persistence, sharing, lab page integration, README.

**Files created**: `vibe-ui/README.md`
**Files modified**: `vibe-ui/index.html`, `vibe-ui/style.css`, `vibe-ui/ui.js`, `lab.html`

**Acceptance criteria**:
- [ ] Full preview panel: buttons (all states), cards (2 variants), forms (5 inputs), typography (H1–H6, body, caption), nav bar, modal, table, alerts (4 types), dashboard grid
- [ ] Light/dark preview toggle (swaps `data-theme` on preview container)
- [ ] Theme persists to localStorage, restores on reload
- [ ] Reset button clears state and generates new random theme
- [ ] Shareable URL: `?state=<base64-encoded-theme>` in URL, decoded on load
- [ ] Theme name displayed prominently (auto-generated)
- [ ] VIBE UI project card added to `lab.html` (after RAG chatbot card)
- [ ] README.md explains the project, links to PRD
- [ ] Page loads in <2s on 3G (verify with DevTools throttling)
- [ ] All console errors resolved
- [ ] Works in Chrome, Firefox, Safari, Edge (latest 2 versions)

**Key implementation notes**:
- Preview components: hand-written HTML/CSS. No component library. Each component uses the injected CSS variables.
- Light/dark toggle: toggles `data-theme="dark"` on the preview container (not the whole page — the product UI stays in its own theme).
- URL sharing: encode ThemeDNA as base64 (minus lockState). Decode on load if URL param present. Keep URL short enough to share.
- Lab card: follow existing `.project-section` pattern with `.project-info` + `.project-widget`. Widget could be a mini preview or screenshot.


---

## 5. UI Component Tree

### Control Panel (left, ~400px)

```
.control-panel
├── .preset-selector
│   └── <select> or pill row (10 presets)
├── .randomize-all-btn
│   └── <button class="btn-randomize-all">🎲 Randomize All</button>
├── .dimension-locks
│   ├── .lock-row (Colors)
│   │   ├── <button class="lock-toggle" data-dim="colors">🔒</button>
│   │   ├── <span>Colors</span>
│   │   └── <button class="reroll-dim" data-dim="colors">🎲</button>
│   ├── .lock-row (Fonts)
│   ├── .lock-row (Spacing)
│   ├── .lock-row (Radius)
│   └── .lock-row (Shadows)
├── .fine-tune
│   ├── .slider-group (Font Family — <select>)
│   ├── .slider-group (Font Pairing — <select>)
│   ├── .slider-group (Radius — <input type="range">)
│   ├── .slider-group (Spacing Density — <input type="range">)
│   ├── .slider-group (Shadow Softness — <input type="range">)
│   ├── .slider-group (Color Energy — <input type="range">)
│   └── .slider-group (Contrast — <input type="range">)
├── .export-section
│   ├── .export-row × 7
│   │   ├── <span>DESIGN.md</span>
│   │   ├── <button class="btn-copy">📋 Copy</button>
│   │   └── <button class="btn-download">⬇ Download</button>
└── .theme-name-display
    └── <h2>"Warm Brutalist"</h2>
```

### Preview Panel (right, flexible)

```
.preview-panel[data-theme]
├── .preview-toolbar
│   ├── <button class="preview-mode-toggle">◐ Light / ☽ Dark</button>
│   └── <span>Preview</span>
├── .preview-scroll
│   ├── .preview-section (Buttons)
│   │   ├── <button class="preview-btn-primary">Primary</button>
│   │   ├── <button class="preview-btn-secondary">Secondary</button>
│   │   ├── <button class="preview-btn-ghost">Ghost</button>
│   │   └── <button class="preview-btn-disabled" disabled>Disabled</button>
│   ├── .preview-section (Cards)
│   │   ├── .preview-card (default)
│   │   └── .preview-card (with actions)
│   ├── .preview-section (Forms)
│   │   ├── <input type="text" placeholder="Text input">
│   │   ├── <select>...</select>
│   │   ├── <input type="checkbox">
│   │   ├── <input type="radio">
│   │   ├── <label class="toggle">...</label>
│   │   └── <textarea>...</textarea>
│   ├── .preview-section (Typography)
│   │   ├── <h1>Heading 1</h1>
│   │   ...through...
│   │   ├── <h6>Heading 6</h6>
│   │   ├── <p>Body text...</p>
│   │   ├── <span class="caption">Caption</span>
│   │   ├── <span class="label">LABEL</span>
│   │   └── <code>inline code</code>
│   ├── .preview-section (Navigation)
│   │   └── <nav>...</nav>
│   ├── .preview-section (Feedback — Alerts)
│   │   ├── .alert-success
│   │   ├── .alert-warning
│   │   ├── .alert-error
│   │   └── .alert-info
│   ├── .preview-section (Data)
│   │   ├── <table>...</table>
│   │   └── <span class="badge">Badge</span>
│   └── .preview-section (Modal)
│       └── .preview-modal-backdrop > .preview-modal
```

### Page Shell

```
body.vibe-ui-page
├── canvas#bgCanvas (shared from canvas-bg.js)
├── .demo-header (same pattern as rag-chatbot.html)
│   ├── .demo-header-left
│   │   ├── <a href="./index.html" class="demo-logo">ALIYA KOY</a>
│   │   └── .header-breadcrumb
│   │       ├── <a href="./lab.html">Lab</a>
│   │       ├── <span>/</span>
│   │       └── <span>VIBE UI</span>
│   └── .header-right
│       ├── <span class="demo-badge">LIVE DEMO</span>
│       └── <button class="theme-toggle">...</button>
├── main.vibe-ui-main
│   ├── .control-panel
│   └── .preview-panel
└── footer
```


---

## 6. Data Flow

```
User Action            ui.js Handler              Engine / Exports           DOM Update
───────────            ─────────────               ────────────────           ──────────

Page load     →  init()
                   ├─ loadState() → stored theme or null
                   ├─ decodeURL() → shared theme or null
                   ├─ generateTheme(locks, prev) → engine.js
                   │     ├─ generateColors()
                   │     ├─ generateTypography()
                   │     ├─ generateSpacing()
                   │     ├─ generateRadius()
                   │     └─ generateShadows()
                   ├─ renderPreview(theme)         → update preview DOM
                   ├─ renderControls(theme, locks) → update lock icons, sliders
                   └─ applyFontsToPreview(theme)   → load Google Fonts

Randomize All → randomizeAll()
                   └─ generateTheme(locks) → same as above

Randomize Dim → randomizeDimension('colors')
                   └─ generateColors(aesthetic, locks, prev)
                       └─ (returns only colors, merged into current theme)
                   └─ renderPreview(updatedTheme)

Toggle Lock  → toggleLock('colors')
                   └─ lockState.colors = !lockState.colors
                   └─ renderControls() → update lock icon

Slider Move  → updateSlider('radius', 50)
                   └─ theme.radius.md = mapSliderToRadius(50) → "12px"
                   └─ renderPreview(theme)

Preset Click → applyPreset('brutalist')
                   └─ set theme.aesthetic = 'brutalist'
                   └─ generateTheme(/* respect locks */)
                   └─ renderPreview() + renderControls()

Export Click → copyToClipboard( exportDESIGN_MD(theme) )
                   └─ navigator.clipboard.writeText()
                   └─ show "Copied!" toast

Download     → downloadFile( exportCSS_Vars(theme), 'vibe-ui-theme.css' )
```

### CSS Variable Injection

The preview panel uses a scoped approach:

```javascript
function renderPreview(theme) {
  const preview = document.querySelector('.preview-panel');
  const vars = buildCSSVariables(theme); // generic format

  // Set all CSS custom properties on the preview container
  Object.entries(vars.light).forEach(([key, value]) => {
    preview.style.setProperty(`--${key}`, value);
  });

  // Preview components reference these vars:
  // .preview-btn-primary { background: var(--primary); color: var(--primary-foreground); }
}

function buildCSSVariables(theme) {
  // Maps ThemeDNA.colorRoles → CSS variable names
  // Uses the generic CSS variable naming (not shadcn, not daisyUI)
  return {
    light: {
      'primary': theme.colors.light.primary,
      'primary-foreground': theme.colors.light.primaryForeground,
      'background': theme.colors.light.background,
      // ... etc
    },
    dark: { /* same */ },
  };
}
```

When the light/dark toggle is clicked, it sets `data-theme="dark"` on `.preview-panel`, and the CSS references `[data-theme="dark"]` variants of the variables.


---

## 7. Edge Cases & Error States

| Scenario | Handling |
|---|---|
| **Chroma.js fails to load** | Fall back to hex-only color generation (no OKLCH). Show a console warning. Core generation still works. |
| **Google Fonts fails to load** | Fall back to system font stacks. Preview still renders. Export still contains the intended font names. |
| **localStorage full or disabled** | Catch `QuotaExceededError`. Theme still works in-memory. Show subtle "session only" indicator. |
| **Clipboard API unavailable** | Fall back to `document.execCommand('copy')`. If that also fails, show the text in a modal for manual copy. |
| **URL too long for sharing** | Truncate to 2000 chars. Compress ThemeDNA before encoding (remove default values, use short keys). |
| **Extreme slider values produce inaccessible colors** | Clamp to WCAG AA minimum. If slider pushes below 4.5:1, auto-adjust lightness and show subtle warning. |
| **Browser doesn't support `oklch()` CSS** | Engine still uses OKLCH internally for generation. Export always provides hex fallback values. Preview uses hex. |
| **User locks all 5 dimensions then hits Randomize All** | Show nothing changes. Optionally show a subtle "all dimensions locked" tooltip. |
| **Very narrow viewport (mobile)** | Stack panels vertically. Preview on top (read-only scroll), controls below. Sliders become full-width. |
| **Font pairing has no valid combination for current aesthetic** | Fall back to the most neutral pairing (Inter + Inter). |


---

## 8. Dependencies

| Dependency | Version | Purpose | Loading |
|---|---|---|---|
| **Chroma.js** | ^3.x | OKLCH ↔ HEX, contrast ratio, shade generation | CDN `<script>` in `<head>` |
| **Tailwind CSS** | v4 (already in project) | Utility classes for control panel chrome | Via `style.css` (already compiled) |
| **Font Awesome** | 6.5 (already in project) | Lock/unlock icons, dice icon, copy/download icons | CDN `<link>` in `<head>` |
| **Google Fonts** | Dynamic | Font loading for preview | `document.fonts.load()` + Google Fonts CSS API |
| **canvas-bg.js** | Existing | Background constellation/warm-glow canvas | `<script src="src/canvas-bg.js">` |
| **theme-toggle.js** | Existing | Dark/light toggle for product UI chrome | `<script src="src/theme-toggle.js">` |

No additional npm packages needed. No build step.


---

## 9. Lab Page Integration

Add a second `.project-section` to `lab.html` after the RAG chatbot card:

```html
<section id="vibe-ui" class="project-section anim-lab-card">
  <div class="project-info">
    <p class="project-label">PROJECT 02 — LIVE DEMO</p>
    <h2 class="project-title">VIBE UI — AI Theme Generator</h2>
    <p class="project-desc">
      Generate intentional visual identities for AI coding workflows.
      Curated randomization meets framework-agnostic design tokens — export to shadcn/ui, daisyUI, Tailwind, or a universal DESIGN.md.
    </p>
    <div class="tech-pills">
      <span class="tech-pill">Vanilla JS</span>
      <span class="tech-pill">OKLCH</span>
      <span class="tech-pill">Chroma.js</span>
      <span class="tech-pill">Design Tokens</span>
    </div>
    <button class="btn btn-color-1 btn-cta" data-href="./vibe-ui/">
      Try the demo <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>

  <div class="project-widget">
    <!-- Mini preview: a static representation of the VIBE UI interface -->
    <div class="vibe-ui-teaser">
      <!-- Abstract visual: color swatches + a button + a card silhouette -->
      <div class="teaser-swatches">
        <span class="teaser-swatch" style="background: var(--color-blue)"></span>
        <span class="teaser-swatch" style="background: var(--color-dark-blue)"></span>
        <span class="teaser-swatch" style="background: var(--color-green)"></span>
        <span class="teaser-swatch" style="background: var(--color-cream)"></span>
      </div>
      <div class="teaser-label">🎲 Generate → Lock → Export</div>
    </div>
  </div>
</section>
```


---

## 10. Vercel Routing Note

Vercel's static file serving with `"outputDirectory": "."` will serve `vibe-ui/index.html` at:

- `/vibe-ui/` (directory index — auto-resolved)
- `/vibe-ui/index.html` (direct path)

No `vercel.json` changes needed. No rewrites required. Standard static hosting behavior.

The lab page links to `./vibe-ui/`, which resolves to `https://aliyakoy.com/vibe-ui/`.


---

## 11. README Template

`vibe-ui/README.md`:

```markdown
# VIBE UI

An AI-powered UI intention and theme generator for vibe coding workflows.

Generate coherent, beautiful visual identities before generating UI components with AI coding tools.

## How it works

1. A theme auto-generates on load
2. Lock what you like, reroll what you don't
3. Fine-tune with sliders
4. Export to your stack: shadcn/ui, daisyUI, Tailwind, CSS variables, or a universal DESIGN.md

## Stack

Vanilla HTML/CSS/JS, Tailwind CSS v4, Chroma.js, Google Fonts.

## Files

- `index.html` — Entry point
- `engine.js` — Theme generation (pure functions, zero DOM)
- `presets.js` — Curated font pool, harmony rules, aesthetic presets
- `exports.js` — 7 export format templates
- `ui.js` — App state, DOM bindings, rendering

## Related

- [Full PRD](../docs/prd-vibe-ui.md)
- [Implementation Plan](../docs/implementation-plan-vibe-ui.md)
```


---

## 12. Development Order

Build in this order. Each phase is self-contained and testable.

```
Phase 1: Engine + Bare Preview     (~3–4 hours)
Phase 2: Controls + Lock System    (~3–4 hours)
Phase 3: Export System             (~2–3 hours)
Phase 4: Polish + Integration      (~2–3 hours)
                                   ─────────
Total estimated:                   10–14 hours
```

---

**Document version**: 1.0
**Status**: Ready for Phase 1 implementation
**Next**: Run the pipeline (Plan → UI → Code → Test → Guardrail) for Phase 1
