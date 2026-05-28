# Lab Project: Design System Quick Start Tool — v2 (Split-Panel Redesign)

## Goal

Transform the existing `design-system.html` from a cramped single-column widget into a **professional split-panel design tool** with a live preview panel on the right side. Users configure tokens on the left and see real-time results on the right — no tab switching required for preview.

---

## Overview

### Core Philosophy

**Left panel = Controls, Right panel = Live Preview.** Every change on the left instantly reflects on the right. The preview panel shows actual UI components built with the current design tokens, giving users immediate visual feedback.

### Core Flow (Enhanced)

1. **Generate with AI** — describe your brand → Gemini suggests primary color + font pairing with rationale
2. **Pick a primary color** → auto-generates color scale (50–950), neutral palette, and 8 state colors — each overrideable
3. **Pick fonts** → heading + body with full Google Fonts catalog autocomplete + system font pills
4. **Configure effects** → border radius, shadows, spacing — all with live previews
5. **See everything applied** to a rich live preview panel (right side) showing real UI components
6. **Check accessibility** — comprehensive contrast matrix, WCAG compliance, color blindness simulation
7. **Export** as CSS custom properties, Tailwind config, SCSS, or JSON — copy, download, or print
8. **Save favorites** to localStorage, share via URL params

### Feature Gap Analysis

| Feature | Current (v1) | Planned (v2) | Status |
|---------|-------------|-------------|--------|
| Color palette + scales | ✅ | ✅ Enhanced | Keep + improve |
| Neutral palette modes | ✅ | ✅ | Keep |
| State/semantic colors | ✅ (6) | ✅ (8) | Add hover, active |
| WCAG contrast scoring | ✅ (basic) | ✅ (comprehensive) | Expand |
| Typography + Google Fonts | ✅ | ✅ Enhanced | Keep + improve |
| Font size scale | ✅ | ✅ | Keep |
| Spacing scale | ✅ | ✅ Visual | Keep + improve |
| Border radius | ✅ | ✅ Enhanced | Keep |
| Shadows | ✅ | ✅ Enhanced | Keep |
| Live preview card | ✅ (basic) | ✅ (rich, multi-component) | Major upgrade |
| Export (CSS/Tailwind) | ✅ | ✅ (4 formats) | Add SCSS, JSON |
| Presets | ✅ | ✅ Enhanced | Keep |
| AI generation | ✅ | ✅ Enhanced | Keep |
| Harmony color picker | ✅ | ✅ | Keep |
| **Split-panel layout** | ❌ | ✅ **NEW** | ✅ Done |
| **Component library preview** | ❌ | ✅ **NEW** | ✅ Done |
| **Dark mode preview** | ❌ | ✅ **NEW** | ✅ Done |
| **Responsive viewport toggle** | ❌ | ✅ **NEW** | ✅ Done |
| **Accessibility report tab** | ❌ | ✅ **NEW** | Full a11y audit |
| **Token inspector** | ❌ | ✅ **NEW** | Click to see token values |
| **History/Undo** | ❌ | ✅ **NEW** | Track changes |
| **Color blindness simulation** | ❌ | ✅ **NEW** | 8 types |
| **Typography hierarchy preview** | ❌ | ✅ **NEW** | ✅ Done |

---

## Architecture: Split-Panel Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Breadcrumb | Theme Toggle | LIVE DEMO badge            │
├──────────────────────────────┬──────────────────────────────────────────┤
│                              │                                          │
│  CONTROL PANEL (40%)         │  LIVE PREVIEW PANEL (60%)               │
│  Scrollable                  │  Sticky (stays visible)                  │
│                              │                                          │
│  ┌─ AI Generation ────────┐  │  ┌─ View Mode Tabs ─────────────────┐  │
│  │ [Collapsed by default] │  │  │ [Page] [Components] [Dark] [Type]│  │
│  └────────────────────────┘  │  └──────────────────────────────────┘  │
│                              │                                          │
│  ┌─ Tab Navigation ───────┐  │  ┌───────────────────────────────────┐ │
│  │ 🎨 Colors              │  │  │                                   │ │
│  │ 🔤 Typography          │  │  │   REAL-TIME PREVIEW               │ │
│  │ ✨ Effects             │  │  │   Shows actual UI elements         │ │
│  │ ♿ Accessibility        │  │  │   using current tokens             │ │
│  │ 📤 Export              │  │  │                                   │ │
│  └────────────────────────┘  │  │   ┌─ Preview Content ──────────┐  │ │
│                              │  │   │ Hero section                 │  │ │
│  ┌─ Active Tab Content ───┐  │  │   │ Buttons & inputs             │  │ │
│  │                        │  │  │   │ Cards & alerts               │  │ │
│  │  Color controls        │  │  │   │ Typography showcase          │  │ │
│  │  Pickers, sliders      │  │  │   │ Color applications           │  │ │
│  │  State editors         │  │  │   │ Navigation pattern           │  │ │
│  │                        │  │  │   │ Spacing examples             │  │ │
│  └────────────────────────┘  │  │   └──────────────────────────────┘  │ │
│                              │                                          │
│                              │  ┌─ View Controls ───────────────────┐  │
│                              │  │ [☀ Light] [🌙 Dark] [📱 💻 🖥]   │  │
│                              │  └───────────────────────────────────┘  │
├──────────────────────────────┴──────────────────────────────────────────┤
│  FOOTER: Copyright | Back to Top                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### Responsive Behavior

| Viewport | Layout |
|----------|--------|
| ≥ 1280px | Full split-panel (40/60) |
| 1024–1279px | Split-panel (45/55) |
| 768–1023px | Stacked vertically, preview below controls |
| < 768px | Controls only, preview in modal/tab |

---

## Part 1: Layout & Container

### Container
- `max-width: 1400px` (up from 800px)
- Split using CSS Grid: `grid-template-columns: 1fr 1.5fr`
- Gap: `1.5rem`
- Panel heights: control panel auto-scrolls, preview panel `position: sticky; top: 1.5rem`

### CSS Structure
```css
.ds-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;
  align-items: start;
}

.ds-control-panel {
  /* scrolls naturally */
}

.ds-preview-panel {
  position: sticky;
  top: 1.5rem;
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
}
```

---

## Part 2: Control Panel (Left Side)

### Tab Restructure (5 tabs → 5 tabs, reorganized)

| Tab | Icon | Content |
|-----|------|---------|
| Colors | 🎨 | Primary color, scales, neutral palette, state colors, semantic colors, harmony picker, visibility score |
| Typography | 🔤 | Heading/body fonts, font size scale, spacing scale, type hierarchy preview |
| Effects | ✨ | Border radius, shadows, intensity controls |
| Accessibility | ♿ | Contrast matrix, WCAG report, color blindness simulation, checklist |
| Export | 📤 | Format toggle, code output, actions, presets |

### AI Section (Enhanced)
- Positioned above tabs, collapsible
- Better loading animation (pulse + shimmer)
- Results show individual "Apply" buttons per suggestion (not just "Apply All")
- History of last 3 generations (expandable)

### Tab Content Improvements

#### Colors Tab
- Larger color swatches (48px height for scale strips, up from 14px)
- Tooltips on hover showing hex + step name
- Better neutral palette display with gradient preview
- State colors in a 4×2 grid (up from 3-column)
- Semantic colors with icon indicators
- Visibility score enhanced with sample text preview

#### Typography Tab
- Enhanced font search with visual previews in dropdown
- Better font pairing suggestions
- Live type scale preview with actual heading sizes
- Spacing scale with visual boxes showing proportions

#### Effects Tab
- Larger radius preview boxes (80px height)
- Shadow previews with depth visualization
- Better intensity selector with visual comparison

#### Accessibility Tab (NEW)
```
┌──────────────────────────────────────┐
│  ── Contrast Matrix ──               │
│  Table showing all color combinations│
│  with AA/AAA pass/fail badges        │
│                                      │
│  ── Color Blindness Simulation ──    │
│  [Normal] [Red] [Green] [Blue]       │
│  [Tritanopia] [Achromatopsia] [...]  │
│  Preview shows how palette appears   │
│                                      │
│  ── WCAG 2.1 Checklist ──            │
│  ☑ Color contrast (AA)              │
│  ☑ Focus indicators                 │
│  ☐ Text size minimum                │
│  ☐ Color not sole indicator         │
│                                      │
│  ── Recommendations ──               │
│  • Increase contrast for warning     │
│  • Add focus states for buttons      │
└──────────────────────────────────────┘
```

#### Export Tab (Enhanced)
- 4 format options: CSS Variables, Tailwind Config, SCSS, JSON
- Syntax-highlighted code output
- Theme-adaptive code block (light/dark)
- Copy individual sections
- Download as ZIP with multiple formats
- Share via URL (encoded tokens in query params)

---

## Part 3: Live Preview Panel (Right Side)

### View Mode Tabs

| Mode | Description |
|------|-------------|
| Page | Full page layout with hero, content sections, footer |
| Components | Individual UI components (buttons, cards, forms, alerts) |
| Dark | Side-by-side light/dark comparison |
| Type | Full typography hierarchy showcase |
| Colors | Color applications across UI elements |

### View Controls

| Control | Options |
|---------|---------|
| Theme | ☀ Light, 🌙 Dark, ↔ Both |
| Viewport | 📱 Mobile (375px), 📱 Tablet (768px), 💻 Desktop (full) |
| Zoom | 75%, 100%, 125% |
| Grid | Toggle background grid overlay |

### Preview Content by Mode

#### Page Mode
```
┌──────────────────────────────────────┐
│  [Navigation bar using tokens]       │
│  Logo    Home    About    Contact    │
├──────────────────────────────────────┤
│  [Hero section]                      │
│  Headline (h1, heading font)         │
│  Subtitle (body font)                │
│  [Primary Button] [Secondary Button] │
├──────────────────────────────────────┤
│  [Card section]                      │
│  ┌──────┐ ┌──────┐ ┌──────┐         │
│  │Card 1│ │Card 2│ │Card 3│         │
│  └──────┘ └──────┘ └──────┘         │
├──────────────────────────────────────┤
│  [Form section]                      │
│  Input fields, textarea, submit btn  │
├──────────────────────────────────────┤
│  [Alert section]                     │
│  Success, Warning, Error, Info       │
├──────────────────────────────────────┤
│  [Footer]                            │
│  Copyright, links                    │
└──────────────────────────────────────┘
```

#### Components Mode
```
┌──────────────────────────────────────┐
│  ── Buttons ──                       │
│  [Primary] [Secondary] [Ghost]       │
│  [Success] [Error] [Warning]         │
│                                      │
│  ── Form Elements ──                 │
│  [Input with label]                  │
│  [Textarea]                          │
│  [Select dropdown ▼]                 │
│  [Checkbox] Option 1                 │
│  [Radio] Option A                    │
│                                      │
│  ── Cards ──                         │
│  ┌──────────────────────────────┐    │
│  │ [Icon] Card Title            │    │
│  │ Description text here...     │    │
│  │ [Tag1] [Tag2]                │    │
│  │ [Action Button]              │    │
│  └──────────────────────────────┘    │
│                                      │
│  ── Alerts ──                        │
│  [✓] Success alert message           │
│  [!] Warning alert message           │
│  [✗] Error alert message             │
│  [i] Info alert message              │
│                                      │
│  ── Badges & Tags ──                 │
│  [Primary] [Success] [Error] [Info]  │
└──────────────────────────────────────┘
```

#### Dark Mode (Side-by-Side)
```
┌──────────────────┬──────────────────┐
│  LIGHT MODE      │  DARK MODE       │
│                  │                  │
│  [Preview card]  │  [Preview card]  │
│  [Buttons]       │  [Buttons]       │
│  [Form]          │  [Form]          │
│                  │                  │
└──────────────────┴──────────────────┘
```

#### Typography Mode
```
┌──────────────────────────────────────┐
│  ── Heading Font: Georgia ──         │
│  H1: The Quick Brown Fox (3rem)      │
│  H2: The Quick Brown Fox (2.25rem)   │
│  H3: The Quick Brown Fox (1.5rem)    │
│  H4: The Quick Brown Fox (1.125rem)  │
│                                      │
│  ── Body Font: Inter ──              │
│  Body: The quick brown fox jumps...  │
│  Small: The quick brown fox jumps... │
│  Caption: The quick brown fox...     │
│                                      │
│  ── Font Pairing Preview ──          │
│  H2: Article Title                   │
│  Body: Lorem ipsum dolor sit amet,   │
│  consectetur adipiscing elit. Sed    │
│  do eiusmod tempor incididunt ut     │
│  labore et dolore magna aliqua.      │
└──────────────────────────────────────┘
```

#### Colors Mode
```
┌──────────────────────────────────────┐
│  ── Primary Scale ──                 │
│  [50][100][200][300][400]            │
│  [500][600][700][800][900][950]      │
│                                      │
│  ── Neutral Scale ──                 │
│  [50][100][200][300][400]            │
│  [500][600][700][800][900][950]      │
│                                      │
│  ── State Colors ──                  │
│  [Success] [Error] [Warning] [Info]  │
│  [Hover] [Active] [Disabled]         │
│                                      │
│  ── Color Applications ──            │
│  [Button with primary]               │
│  [Card with neutral bg]              │
│  [Alert with success color]          │
│  [Badge with warning color]          │
└──────────────────────────────────────┘
```

### Preview Panel CSS Structure
```css
.ds-preview-panel {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
}

.ds-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.ds-preview-tabs {
  display: flex;
  gap: 0.25rem;
}

.ds-preview-tab {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 200ms ease;
}

.ds-preview-tab.active {
  background: var(--color-blue);
  color: white;
}

.ds-preview-viewport {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ds-preview-content {
  padding: 1.5rem;
  min-height: 500px;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 23px,
    rgba(0,0,0,0.03) 23px,
    rgba(0,0,0,0.03) 24px
  );
}

.ds-preview-frame {
  margin: 0 auto;
  transition: width 300ms ease;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.ds-preview-frame.mobile { width: 375px; }
.ds-preview-frame.tablet { width: 768px; }
.ds-preview-frame.desktop { width: 100%; }
```

---

## Part 4: Files to Create / Modify

| File | Action | Notes |
|------|--------|-------|
| `design-system.html` | **REWRITE** | Split-panel layout, enhanced preview |
| `src/design-system.css` | **REWRITE** | All `.ds-*` styles for new layout |
| `lab.html` | **MODIFY** | Update project card description |
| `api/generate-design.js` | **KEEP** | No changes needed |

### Not changed
- `index.html`, `profile.html`, `contact.html`, `cv.html`, `rag-chatbot.html`
- `style.css`, `src/style-original.css`, `src/tokens.css`
- `script.js`, `src/theme-toggle.js`, `src/canvas-bg.js`, `src/lab.css`

---

## Part 5: JavaScript Architecture

### State Management (Enhanced)
```js
var DS = {
  // Colors
  colors: [{ hex: '#26428b' }],
  neutralMode: 'gray',
  customNeutralHue: 0,
  
  // Typography
  headingFont: 'Georgia, serif',
  bodyFont: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif',
  baseFontSize: 16,
  typeScale: 'default',
  
  // Effects
  baseRadius: 8,
  radiusOverrides: {},
  shadowIntensity: 'medium',
  shadowOverrides: {},
  
  // State overrides
  stateOverrides: {},
  
  // Preview
  previewMode: 'page',
  previewTheme: 'light',
  previewViewport: 'desktop',
  previewZoom: 100,
  
  // Export
  format: 'css',
  
  // Accessibility
  colorBlindMode: 'normal',
  
  // History
  history: [],
  historyIndex: -1,
};
```

### Core Functions
- `updateAll()` — triggers all panel updates
- `updateColors()` — renders color cards, scales, states
- `updateTypography()` — renders font preview, type scale, spacing
- `updateEffects()` — renders radius, shadows
- `updatePreview()` — renders live preview panel content
- `updateAccessibility()` — renders a11y report
- `updateExport()` — generates code output
- `pushHistory()` — saves state to history for undo
- `undo()` / `redo()` — navigate history

### Event-Driven Updates
- All control inputs emit changes to central state
- State changes trigger debounced preview updates (150ms)
- Preview updates use `requestAnimationFrame` for smooth rendering

---

## Part 6: CSS Architecture

### Design Tokens (CSS Custom Properties)
All tokens use CSS custom properties for real-time updates:
```css
:root {
  /* Colors */
  --ds-primary: #26428b;
  --ds-primary-50: #e8edf5;
  /* ... all scale steps */
  
  /* Typography */
  --ds-font-heading: Georgia, serif;
  --ds-font-body: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif;
  --ds-font-size-h1: 3rem;
  /* ... all sizes */
  
  /* Effects */
  --ds-radius-sm: 4px;
  --ds-radius-md: 8px;
  /* ... all radii */
  --ds-shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  /* ... all shadows */
  
  /* Spacing */
  --ds-spacing-1: 0.5rem;
  /* ... all spacing */
}
```

### Transition System
- Smooth transitions on all preview elements (200-300ms)
- Debounced updates prevent janky rendering
- `requestAnimationFrame` for batch DOM updates

### Dark Mode
- Consistent dark mode across all elements
- Better contrast ratios
- Improved visual depth with card glow effects

---

## Part 7: Accessibility Features

### Contrast Matrix
- Table showing all foreground/background combinations
- AA/AAA pass/fail badges
- Color-coded cells (green = pass, red = fail)

### Color Blindness Simulation
- 8 types: Normal, Red (Protanopia), Green (Deuteranopia), Blue (Tritanopia),
  Protanomaly, Deuteranomaly, Tritanomaly, Achromatopsia
- CSS filter-based simulation
- Preview shows how palette appears to each type

### WCAG 2.1 Checklist
- Automated checks where possible
- Manual checks with guidance
- Export includes a11y report

---

## Part 8: Export Enhancements

### Format Options
1. **CSS Variables** — `:root { --token: value; }`
2. **Tailwind Config** — `module.exports = { theme: { extend: { ... } } }`
3. **SCSS Variables** — `$token: value;`
4. **JSON Tokens** — W3C Design Tokens format

### Actions
- Copy to clipboard (with feedback)
- Download as file (format-specific extension)
- Download as ZIP (all formats)
- Print (clean layout)
- Share via URL (encoded tokens)

---

## Implementation Order

### Phase 1: Layout & Structure
1. Rewrite `design-system.html` with split-panel layout
2. Create `src/design-system.css` with new layout styles
3. Implement responsive breakpoints (Completed)

### Phase 2: Live Preview Panel
1. Build preview panel shell with view mode tabs (Completed)
2. Implement Page mode preview (Completed)
3. Implement Components mode preview (Completed)
4. Add view controls (theme, viewport, zoom) (Completed)

### Phase 3: Enhanced Control Panel
1. Improve Colors tab UI (Completed)
2. Improve Typography tab UI (Completed)
3. Improve Effects tab UI (Completed)
4. Enhance AI section (Completed)

### Phase 4: Accessibility Tab (Completed)
1. Build contrast matrix
2. Implement color blindness simulation
3. Add WCAG checklist
4. Generate recommendations

### Phase 5: Export Enhancements (Completed)
1. Add SCSS and JSON formats
2. Implement syntax highlighting
3. Add ZIP download (skipped — requires external library)
4. Add URL sharing

### Phase 6: Polish & Testing (Completed)
1. Smooth transitions and animations
2. Dark mode consistency
3. Responsive testing
4. Performance optimization

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Split-panel layout | 40/60 ratio | Preview deserves more space for real UI components |
| Sticky preview panel | Right side stays visible | Users can scroll controls while keeping preview in view |
| CSS Grid for layout | `grid-template-columns: 1fr 1.5fr` | Clean, responsive, easy to adjust |
| View mode tabs | Page, Components, Dark, Type, Colors | Covers all preview needs without clutter |
| Viewport toggle | Mobile/Tablet/Desktop | Essential for responsive design validation |
| Color blindness simulation | CSS filter-based | No dependencies, fast, covers 8 types |
| Debounced preview updates | 150ms | Smooth UX without janky rendering |
| History/Undo | Array-based state snapshots | Simple, effective, max 50 states |
| Export formats | CSS, Tailwind, SCSS, JSON | Covers all major use cases |
| URL sharing | Encoded tokens in query params | No server needed, shareable links |
| Accessibility tab | Comprehensive report | Beyond contrast, covers full WCAG 2.1 |

---

## Trade-offs & Considerations

1. **Performance**: Rich preview with many components may slow down on lower-end devices. Solution: debounce updates, use `requestAnimationFrame`, lazy-render off-screen content.

2. **Complexity**: More features = more code. Solution: modular CSS, well-organized JS, clear separation of concerns.

3. **Mobile UX**: Split-panel doesn't work well on mobile. Solution: stack vertically, preview in modal/tab, simplify controls.

4. **Browser Support**: CSS Grid, `position: sticky`, CSS filters. Solution: graceful degradation, fallbacks for older browsers.

5. **File Size**: Enhanced CSS and JS will be larger. Solution: minify in production, lazy-load Google Fonts.

---

## Success Metrics

- **UX Improvement**: Users can see changes in real-time without tab switching
- **Feature Completeness**: Covers all major design system needs (colors, type, effects, a11y, export)
- **Professional Quality**: Matches industry-standard design tools (Figma, Storybook)
- **Accessibility**: Comprehensive a11y checks and color blindness simulation
- **Export Flexibility**: 4 formats, multiple actions, shareable URLs
- **Responsive Design**: Works on all screen sizes with appropriate layouts
