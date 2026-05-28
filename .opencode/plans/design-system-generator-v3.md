# Design System Token Picker — v3 (Single-Page + Documentation Preview)

## Goal

Revise the existing `design-system.html` from a cluttered multi-tab tool with unnecessary features into a **focused, two-column token picker** with a clean documentation-style preview panel. Users hop in, pick a color and fonts, see them in a design system spec preview, and export.

---

## Core Philosophy

**Pick a color → Pick fonts → See spec → Export.** That's the entire flow. No AI generation. No effects tabs. No accessibility matrix. No state overrides. No presets. The controls panel is lean; the preview panel shows a full design system documentation page (colors, typography, layout) that updates in real time.

---

## Layout

```
┌────────────────────────────────────────────────────────────────────────────┐
│  HEADER: ALIYA KOY | Lab / Design System  |  LIVE DEMO  | [☀/🌙]         │
├────────────────────────────────┬───────────────────────────────────────────┤
│                                │                                           │
│  CONTROLS (left, ~35%)         │  PREVIEW (right, ~65%)                    │
│  Site design language          │  Clean white aesthetic (like sample)      │
│  (cream/beige cards)           │  (white cards, clean labels)              │
│                                │                                           │
│  ┌ Colors ─────────────────┐  │  ┌ Colors ────────────────────────────┐   │
│  │ Primary: [swatch] [#hex] │  │  │ Theme Colors (Solids)              │   │
│  │ Scale: [50]...[950]      │  │  │ [Primary] [Secondary] [Success]    │   │
│  │ Contrast: AA ✓ AAA ✓     │  │  │ [Gradients row]                   │   │
│  │ Neutral: [Pure Gray ▼]   │  │  │ [Solid Shades row]                │   │
│  │ + neutral swatch row     │  │  │ Gray Colors (50-950 grid)          │   │
│  └──────────────────────────┘  │  │ Surface Colors                     │   │
│                                │  └────────────────────────────────────┘   │
│  ┌ Typography ──────────────┐  │                                           │
│  │ Heading: [search + pills] │  │  ┌ Typography ───────────────────────┐   │
│  │ Body: [search + pills]    │  │  │ Font info                         │   │
│  │ Base: [16] Scale: [▼]    │  │  │ Alphabet (A-Z in heading font)     │   │
│  └──────────────────────────┘  │  │ Display 1-6 sizes                  │   │
│                                │  │ Heading 1-6                        │   │
│  ┌ Export ───────────────────┐  │  │ Paragraph / Lead / Small          │   │
│  │ [CSS] [Tailwind] [SCSS]   │  │  └────────────────────────────────────┘   │
│  │ [JSON]                     │  │                                           │
│  │ [Copy] [Download] [Share]  │  │  ┌ Layout ───────────────────────────┐   │
│  └──────────────────────────┘  │  │  Spacing scale (8px base)           │   │
│                                │  │  Dashboard Grid                     │   │
│                                │  │  Application Grid                   │   │
│                                │  │  Page Grid                          │   │
│                                │  │  Mobile Grid                        │   │
│                                │  │  Shadows                            │   │
│                                │  └────────────────────────────────────┘   │
├────────────────────────────────┴───────────────────────────────────────────┤
│  FOOTER: Copyright © 2026 Aliya Koy. All Rights Reserved.                   │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Features: Kept vs Removed

### KEPT (simplified/improved)

| Feature | Changes |
|---------|---------|
| Primary color picker | Bigger swatch, click to open native color picker, hex input field |
| Color scale (50-950) | Inline horizontal swatch row of 11 steps |
| Contrast badge | Small AA/AAA pass/fail indicator below primary swatch (on white) |
| Neutral palette | 2 modes only: **Pure Gray** + **Brand-Tinted**, inline swatch row |
| Heading font search | Input with autocomplete dropdown + suggestion pills |
| Body font search | Input with autocomplete dropdown + suggestion pills |
| Font preview | Heading + body sample text inline in typography section |
| Base font size | Input field (12-24px range) |
| Type scale | Dropdown: Compact, Default, Spacious |
| Font size scale table | Compact table showing h1-caption with rem/px |
| Format toggle | [CSS] [Tailwind] [SCSS] [JSON] button group |
| Code output | Syntax-highlighted code block |
| Copy / Download / Share | Action buttons |
| URL serialization | `?ds=` parameter for sharing state |
| Theme toggle | Keep as-is |
| Canvas background | Keep as-is |
| Demo header + footer | Keep as-is |
| Back-to-top button | Keep as-is |
| Google Fonts dynamic loading | Keep — individual font loading via `<link>` works fine |
| Google Fonts autocomplete | Keep — use existing `FALLBACK_FONTS` array (150+ fonts, no API fetch) |

### REMOVED

| Feature | Reason |
|---------|--------|
| AI generation section | Not core to "pick color → pick font → export" |
| Right-side preview panel (current) | Replaced entirely with new documentation-style preview |
| Effects tab (radius, shadows controls) | Not needed — shadows shown in preview output only |
| Accessibility tab (contrast matrix, color blindness sim, WCAG checklist) | Too complex — contrast badge replaces it |
| Interactive states overrides (default/hover/active/disabled) | Auto-generated, no customization needed |
| Semantic colors overrides (success/error/warning/info) | Auto-generated, no customization needed |
| Harmony picker (adding +2 to +4 additional colors) | Only one primary color |
| Multi-color support (up to 6 colors) | Single primary color |
| Presets save/load | Not needed for core flow |
| Visibility score tool | Inline contrast badge handles this |
| Spacing grid (visual bars in controls) | Removed from controls — shown in preview |
| Print button | Not useful for code output |
| Preview panel tabs (Page / Components / Dark / Type / Colors) | Replaced by documentation-style layout |
| Preview theme/viewport toggles | Documentation preview is static/clean white |
| Google Fonts metadata API fetch | CORS-blocked — use FALLBACK_FONTS array instead |

---

## Controls Panel (Left, ~35%) — Detailed Spec

### Colors Section

```
┌─────────────────────────────────────────┐
│  🎨 Colors                               │
│                                          │
│  Primary Color                           │
│  ┌──────────┐  ┌──────────────────────┐  │
│  │          │  │  #26428b             │  │
│  │  swatch  │  │  [manual hex input]  │  │
│  │          │  └──────────────────────┘  │
│  └──────────┘                            │
│  AA ✓  AAA ✓  (contrast badge)          │
│                                          │
│  Scale (click swatch to copy hex)         │
│  [50][100][200][300][400]                │
│  [500][600][700][800][900][950]          │
│                                          │
│  Neutral Scale                           │
│  [Pure Gray ▼]                           │
│  [50][100][200][300][400]                │
│  [500][600][700][800][900][950]          │
└─────────────────────────────────────────┘
```

### Typography Section

```
┌─────────────────────────────────────────┐
│  🔤 Typography                           │
│                                          │
│  Heading Font                            │
│  ┌─────────────────────────────────────┐ │
│  │  Type to search Google Fonts...     │ │
│  └─────────────────────────────────────┘ │
│  [Georgia] [Playfair] [DM Serif] [Lora]  │
│                                          │
│  Body Font                               │
│  ┌─────────────────────────────────────┐ │
│  │  Type to search Google Fonts...     │ │
│  └─────────────────────────────────────┘ │
│  [Inter] [Source Sans] [DM Sans] [Nunito]│
│                                          │
│  ┌─ Preview ──────────────────────────┐  │
│  │  The Quick Brown Fox (heading)      │  │
│  │  Body paragraph sample text...      │  │
│  └─────────────────────────────────────┘  │
│                                          │
│  Base: [16]px  Scale: [Default ▼]       │
│                                          │
│  h1   2.441rem  (39.1px)                 │
│  h2   1.953rem  (31.2px)                 │
│  h3   1.563rem  (25.0px)                 │
│  h4   1.250rem  (20.0px)                 │
│  body 1.000rem  (16.0px)                 │
│  small 0.800rem (12.8px)                 │
└─────────────────────────────────────────┘
```

### Export Section

```
┌─────────────────────────────────────────┐
│  📤 Export                               │
│                                          │
│  [CSS] [Tailwind] [SCSS] [JSON]          │
│                                          │
│  ┌─ Code output ──────────────────────┐  │
│  │  :root {                           │  │
│  │    --color-primary: #26428b;        │  │
│  │    --color-primary-50: #eef1ff;    │  │
│  │    ...                             │  │
│  │  }                                 │  │
│  └─────────────────────────────────────┘  │
│                                          │
│  [📋 Copy]  [⬇ Download]  [🔗 Share]    │
└─────────────────────────────────────────┘
```

---

## Preview Panel (Right, ~65%) — Detailed Spec

### Preview: Colors Section

```
┌─────────────────────────────────────────────────┐
│  Colors                                          │
│                                                  │
│  ── Theme Colors (Solids) ──                     │
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ #26428b  │ │ Derived  │ │ #16a34a  │  ...    │
│  │ Primary  │ │Secondary │ │ Success  │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│                                                  │
│  ── Gradients ──                                  │
│                                                  │
│  [gradient bar Primary] [gradient bar Secondary]  │
│  [gradient bar Success] [gradient bar Warning]    │
│                                                  │
│  ── Solid Shades ──                               │
│                                                  │
│  [two-tone Primary] [two-tone Secondary] ...      │
│                                                  │
│  ── Gray Colors ──                                │
│                                                  │
│  [50] [100] [200] [300] [400] [500]              │
│  [600] [700] [800] [900]                         │
│                                                  │
│  ── Surface Colors ──                             │
│                                                  │
│  [Primary Surface] [Secondary Surface]            │
│  [Light Surface] [Dark Surface]                   │
└─────────────────────────────────────────────────┘
```

### Preview: Typography Section

```
┌─────────────────────────────────────────────────┐
│  Typography                                      │
│                                                  │
│  Font used: Georgia (display) / Inter (body)     │
│                                                  │
│  ── Alphabet ──                                   │
│                                                  │
│  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm         │
│  Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz         │
│                                                  │
│  ── Display Sizes ──                              │
│                                                  │
│  Display 1  2.986rem  (47.8px)                   │
│  Display 2  2.488rem  (39.8px)                   │
│  Display 3  2.074rem  (33.2px)                   │
│  Display 4  1.728rem  (27.6px)                   │
│  Display 5  1.440rem  (23.0px)                   │
│  Display 6  1.200rem  (19.2px)                   │
│                                                  │
│  ── Headings ──                                   │
│                                                  │
│  Heading 1  The Quick Brown Fox                   │
│  Heading 2  The Quick Brown Fox                   │
│  Heading 3  The Quick Brown Fox                   │
│  Heading 4  The Quick Brown Fox                   │
│  Heading 5  The Quick Brown Fox                   │
│  Heading 6  The Quick Brown Fox                   │
│                                                  │
│  ── Paragraphs and Texts ──                       │
│                                                  │
│  Lead: This is a lead paragraph for emphasis.     │
│  Body: Standard body text at base font size.      │
│  Small: Small text for secondary content.         │
└─────────────────────────────────────────────────┘
```

### Preview: Layout Section

```
┌─────────────────────────────────────────────────┐
│  Layout                                          │
│                                                  │
│  ── Spacing ──                                    │
│                                                  │
│  1  ████  8px                                    │
│  2  ████████  16px                               │
│  3  ████████████  24px                           │
│  4  ████████████████  32px                       │
│  5  ████████████████████  40px                   │
│  6  ████████████████████████  48px               │
│  7  ████████████████████████████  56px           │
│  8  ██████████████████████████████████  64px     │
│                                                  │
│  ── Dashboard Grid ──                             │
│                                                  │
│  ┌──────────┬──────────────────────────────┐    │
│  │ Sidebar  │  Content Area                 │    │
│  │          │  ┌────┬────┬────┬────┐       │    │
│  │          │  │ C1 │ C2 │ C3 │ C4 │       │    │
│  │          │  ├────┴────┴────┴────┤       │    │
│  │  Nav     │  │    Main Table     │       │    │
│  │          │  └──────────────────┘       │    │
│  └──────────┴──────────────────────────────┘    │
│                                                  │
│  ── Application Grid ──                          │
│                                                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  │    │ │    │ │    │ │    │ │    │ │    │       │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘    │
│                                                  │
│  ── Page Grid ──                                  │
│                                                  │
│  ┌────────────────┬──────────────┬──────────────┐│
│  │     40%        │     30%      │     30%      ││
│  └────────────────┴──────────────┴──────────────┘│
│                                                  │
│  ── Mobile Grid ──                                │
│                                                  │
│  ┌──────────────┬──────────────┐                 │
│  │     50%      │     50%      │                 │
│  └──────────────┴──────────────┘                 │
│                                                  │
│  ── Shadows ──                                    │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Shadow  │  │  Shadow  │  │  Shadow  │      │
│  │  SM      │  │  MD      │  │  LG      │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

---

## Aesthetic Direction

### Controls Panel (Left)
- Uses the site's existing design language
- Cream/beige card backgrounds (`var(--color-cream)`, `var(--color-beige)`)
- Blue accent for active/interactive elements (`var(--color-blue)`)
- Georgia for section headers, system fonts for controls
- Card-based sections with 16px border radius
- Generous padding (24-32px inside cards)

### Preview Panel (Right)
- Clean white aesthetic matching the sample image
- White backgrounds, subtle `rgba(0,0,0,0.06)` borders
- Clean sans-serif labels (system fonts)
- Colored swatches and grids with clear labels
- Section separators with subtle borders
- **Flat, scrolly, no tab switching** — everything visible at once

---

## Technical Changes

### Files

| File | Action | Before | After |
|------|--------|--------|-------|
| `design-system.html` | **REWRITE** | ~2186 lines with inline JS | ~600 lines HTML skeleton |
| `src/design-system.css` | **REWRITE** | ~2311 lines (preview, AI, effects, a11y) | ~1200 lines (controls styles + preview documentation styles) |
| `src/design-system.js` | **CREATE** | — | ~700 lines (extracted from HTML, cleaned up) |

### JavaScript Architecture

State object (simplified):

```js
var DS = {
  colors: [{ hex: '#26428b' }],
  neutralMode: 'gray',
  headingFont: 'Georgia, serif',
  bodyFont: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif',
  baseFontSize: 16,
  typeScale: 'default',
  format: 'css',
};
```

Core render functions:

| Function | Purpose |
|----------|---------|
| `updateColors()` | Render primary swatch, scale, neutral swatches, contrast badge |
| `updateTypography()` | Render font preview, size scale table |
| `updateAll()` | Call both + trigger preview + export |
| `renderPreview()` | Render the right-side documentation preview |
| `renderPreviewColors()` | Render color solids, gradients, shades, gray scale, surfaces |
| `renderPreviewTypography()` | Render alphabet, display/heading sizes, text styles |
| `renderPreviewLayout()` | Render spacing, grids, shadows |
| `updateExport()` | Generate code output for selected format |

### Fixes

| Issue | Fix |
|-------|-----|
| Google Fonts metadata CORS error | Remove the broken `fetch('https://fonts.google.com/metadata/fonts')`. Use existing `FALLBACK_FONTS` array (150+ fonts) as sole source for autocomplete. Individual font loading via `<link>` still works. |
| Inline JS bloat (~1800 lines) | Extract to `src/design-system.js` |
| Unused CSS | Remove all preview panel styles, AI styles, effects styles, a11y styles, state override styles, harmony picker styles |

---

## Implementation Order

### Step 1: Plan (this document)
Research and spec complete. Approved by user.

### Step 2: UI Design (sub-agent: frontend-design skill)
- Create the HTML/CSS skeleton for the new layout
- Controls panel markup (colors, typography, export sections)
- Preview panel markup (colors, typography, layout sections with sample content)
- Clean white aesthetic for preview, site design language for controls

### Step 3: Code (sub-agent: DeepSeek V4 Flash)
- Extract inline JS to `src/design-system.js`
- Implement simplified state management
- Wire up all controls to trigger preview + export updates
- Implement preview rendering functions
- Test all interactions work

### Step 4: Test (sub-agent: Qwen3.6 Plus)
- Verify color picker → scale generation → preview update
- Verify font search + selection → preview update
- Verify neutral mode switching
- Verify export output for all 4 formats
- Verify copy/download/share buttons
- Check browser console for errors

### Step 5: Guardrail (sub-agent: MiniMax M2.5 Free)
- Lint HTML/CSS/JS
- Check for remaining dead code references
- Verify no broken API calls
- Append session log
