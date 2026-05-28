# VIBE UI — Product Requirements Document

> **Version**: 1.0
> **Status**: Draft — awaiting approval
> **Product**: AI-powered UI intention and theme generator for vibe coding workflows
> **Repository**: Aliya Koy portfolio — lab project

---

## 1. Executive Summary

**VIBE UI** is a free, browser-based tool that generates intentional visual identities for developers who build interfaces with AI coding tools. It does not generate UI components — it generates the visual DNA that makes AI-generated UI feel human-designed.

The product creates a framework-agnostic visual direction that users explore through curated randomization, then exports into whatever CSS library or framework they use: shadcn/ui, daisyUI, Tailwind, plain CSS variables, or a universal DESIGN.md that any AI coding agent can consume.

**Why it exists**: AI-generated interfaces converge on 8 identical visual patterns because AI models were trained on the same corpus and start generating components before establishing intentional visual identity. VIBE UI injects design intention _before_ code generation — the missing step in every vibe coding workflow.

**Business model**: Free. Part of Aliya Koy's lab projects. Designed to showcase product thinking and full-stack capability. Path to SaaS if traction warrants it.

---

## 2. Product Vision

A world where every AI-generated interface has a soul.

VIBE UI makes "having taste" accessible to developers who don't have design training. It doesn't replace designers — it bridges the gap between "I know what I want it to feel like" and "here are the exact values that create that feeling, in whatever format your stack needs."

The product teaches by doing: every generated theme is a lesson in how typography, spacing, color, shadow, and radius work together to create emotional response — regardless of which CSS library the user ultimately adopts.

---

## 3. Problem Statement

### The structural problem

Vibe coding tools (Cursor, Claude Code, v0, Bolt, Lovable) generate interfaces that converge toward visual sameness. A 2025 study of 600 vibe-coded apps found that apps without design systems had 67% worse UI consistency. An academic paper (arXiv:2603.13036) identified "design homogenization" as a sociotechnical risk — the push for frictionless generation incentivizes accepting the LLM's default output.

### The root cause

AI coding tools are pattern-matching machines trained on the same corpus: shadcn/ui components, Vercel templates, YC startup marketing pages (2022–2024), and Tailwind documentation examples. Without explicit visual constraints, they default to safe, high-frequency patterns.

### The missing step

The vibe coding lifecycle jumps from "I want a dashboard" straight to component generation. There is no step for _visual intention setting_. VIBE UI inserts that step.

### Why framework-agnostic design matters

Existing theme tools couple their output to a specific library (usually daisyUI or shadcn/ui). This creates friction: users don't always know which library they'll use when they're exploring visual directions. A user might start with shadcn/ui and switch to Tailwind. Or they might use a library that doesn't exist yet. VIBE UI generates visual intention — the library is just a delivery format.

---

## 4. Market Opportunity

### Ecosystem tailwinds

| Signal                                                       | Source                                   | What it means                                                      |
| ------------------------------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------ |
| DESIGN.md open-sourced as draft spec                         | Google Labs, April 2026                  | AI-readable design specs are becoming infra, not a product feature |
| Claude Code + Cursor consume DESIGN.md natively              | GeekyAnts, Vibe Coder Blog, May 2026     | Export target exists and is growing                                |
| Stitch MCP server bridges design → code                      | Google Labs, March 2026                  | Design-to-code pipeline is becoming standardized                   |
| "Vibe coding" as a term exploding in developer consciousness | Twitter, Hacker News, YouTube, 2025–2026 | The audience is massive and growing fast                           |

### Competitive gap

Existing tools either generate components (v0, Bolt), generate full design systems from one prompt (FORGE, AI Design System Generator), or operate as API/MCP servers (DesignMCP). None combine **playful visual exploration** with **curated aesthetic taste** in a browser-first, zero-friction experience. None are framework-agnostic — they all lock you into a specific CSS library's token structure.

VIBE UI's positioning: the **universal exploration layer** that sits _before_ any CSS framework or AI coding tool.

---

## 5. Target Users

### Primary: The Vibe Coder

- Uses Cursor, Claude Code, v0, Bolt, or Lovable
- Builds MVPs, side projects, internal tools
- Knows what they want it to _feel like_ but can't articulate it in design terms
- Has tried prompting AI for "beautiful UI" and gotten generic results
- May not know which CSS library they'll ultimately use
- Would use design tokens if they were easy to generate and library-agnostic

### Secondary: The Early-Stage Founder

- Building an MVP for investor demos
- No design budget, no design co-founder
- Needs the product to look credible, not just functional
- Wants to move fast without looking amateur
- The last thing they want is to be locked into a CSS framework before they've validated their idea

### Tertiary: The Designer-Developer

- Has design taste but doesn't want to build a design system from scratch
- Uses the tool for rapid exploration before committing to a direction
- Appreciates the export formats for integration with their workflow
- Values framework-agnostic output — they might hand off to a team using a different stack

---

## 6. User Personas

### Alex — The Indie Hacker

- **Context**: Building a SaaS side project with Cursor. Ships 3–4 MVPs per year.
- **Pain point**: "Every project looks the same. I spend more time fixing AI's generic UI than building features."
- **Goal**: Generate a visually distinct identity in 5 minutes and get back to coding.
- **Behavior**: Clicks "Randomize" 20 times, locks what they like, exports DESIGN.md, drops it into their repo. Doesn't know or care which CSS framework — the DESIGN.md tells the AI what to do.
- **Framework**: Whatever Cursor generates. Usually shadcn/ui. Sometimes raw Tailwind.

### Maya — The Solo Founder

- **Context**: Raising a pre-seed round. Needs a demo that looks like a real product.
- **Pain point**: "I can't afford a designer. My AI-built dashboard looks like a template."
- **Goal**: Create a credible, polished visual identity that investors take seriously.
- **Behavior**: Browses aesthetic presets, fine-tunes with sliders, exports DESIGN.md + shadcn/ui CSS variables.
- **Framework**: shadcn/ui (default for most AI coding tools).

### Jordan — The Full-Stack Dev

- **Context**: Builds internal tools for a company. Has design opinions but no time.
- **Pain point**: "I know the vibe I want. I just need the values to make it happen."
- **Goal**: Rapid visual prototyping before committing code.
- **Behavior**: Uses presets as starting points, tweaks individual tokens, exports as plain CSS variables for maximum portability.
- **Framework**: Plain CSS. Maybe Tailwind later. Doesn't want prescriptive token naming.

---

## 7. User Stories

### Theme Generation

- As a vibe coder, I want to auto-generate a complete theme so I can see a visual identity immediately.
- As a user, I want to randomize only colors while keeping everything else locked so I can explore color directions.
- As a user, I want to randomize only typography while keeping colors locked so I can find the right font pairing.
- As a user, I want "smart randomness" that produces curated, tasteful results — not chaotic randomness.

### Theme Locking

- As a user, I want to lock individual theme dimensions (colors, fonts, spacing, radius, shadows) so I can selectively reroll what I don't like.
- As a user, I want to see which dimensions are locked via visual indicators (lock icons).

### Visual Controls

- As a user, I want to adjust font family and pairing via dropdowns so I can fine-tune typography.
- As a user, I want slider controls for border radius, spacing density, shadow softness, color energy, and contrast so I can dial in the exact feel.
- As a user, I want to see changes reflected instantly in the live preview.

### Aesthetic Presets

- As a user, I want to browse aesthetic presets (brutalist, soft SaaS, swiss minimal, glassmorphism, etc.) as starting points.
- As a user, I want selecting a preset to update all unlocked dimensions coherently.

### Live Preview

- As a user, I want to see buttons, cards, forms, typography, navigation, modals, tables, and alerts rendered with the current theme so I can evaluate the visual identity.
- As a user, I want the preview to be read-only — I'm here to evaluate, not edit components.

### Export

- As a shadcn/ui user, I want to export a `globals.css` with `--primary`, `--background`, `--foreground`, `--muted`, `--border`, etc. so I can drop it into my project.
- As a daisyUI user, I want to export a daisyUI theme block so I can plug it into my Tailwind config.
- As a plain CSS user, I want to export generic CSS variables so they work in any project regardless of framework.
- As a Tailwind user, I want to export a Tailwind config so I can integrate with my existing stack.
- As someone who hasn't chosen a framework yet, I want to export a DESIGN.md so my AI coding tool can apply the theme to whatever library it generates.
- As a user, I want to export AI prompt context (Cursor, Claude Code, OpenCode) so I can paste it directly into my coding session.
- As a user, I want to export JSON tokens for programmatic use.

---

## 8. Product Principles

1. **Lightweight over comprehensive** — A theme should take 30 seconds to generate, not 30 minutes to configure.
2. **Taste over control** — Curated randomness produces better results than infinite sliders. Guide, don't overwhelm.
3. **Exportable, not editable** — The output is designed to travel. Themes leave VIBE UI and live in codebases.
4. **Playful over professional** — This is a creative tool, not enterprise software. It should feel fun to use.
5. **AI-assisted, not AI-replaced** — The AI suggests; the human decides. The lock/reroll mechanic embodies this.
6. **Framework-agnostic by design** — The engine stores abstract values. Exports are mapping functions. No CSS library owns the theme.
7. **No component generation** — This is the hardest principle to hold, but the most important. We generate _intention_, not _implementation_. Components are the user's job (with their AI coding tool).
8. **Semantic, not prescriptive** — Colors have roles (primary, surface, text), not library-specific names. The roles are universal; the naming is a delivery detail.

---

## 9. Functional Requirements

### FR1: Theme Generation Engine

- **FR1.1**: Generate a complete theme from scratch on page load
- **FR1.2**: "Randomize All" button generates a new complete theme
- **FR1.3**: "Randomize Colors" regenerates only the color palette
- **FR1.4**: "Randomize Fonts" regenerates only typography tokens
- **FR1.5**: "Randomize Spacing" regenerates spacing scale
- **FR1.6**: "Randomize Radius" regenerates border radius tokens
- **FR1.7**: "Randomize Shadows" regenerates shadow tokens
- **FR1.8**: All randomization uses curated pools, not pure random generation

### FR2: Theme Locking

- **FR2.1**: Lock toggle per dimension (colors, fonts, spacing, radius, shadows)
- **FR2.2**: Locked dimensions are excluded from randomization
- **FR2.3**: Visual lock indicator (lock/unlock icon) per dimension
- **FR2.4**: Lock state persists within session

### FR3: Visual Controls

- **FR3.1**: Font family selector (dropdown of curated fonts)
- **FR3.2**: Font pairing selector (heading + body combinations)
- **FR3.3**: Border radius slider (0 = sharp, 100 = fully rounded)
- **FR3.4**: Spacing density slider (compact ↔ airy)
- **FR3.5**: Shadow softness slider (crisp ↔ diffuse)
- **FR3.6**: Color energy slider (muted ↔ vibrant)
- **FR3.7**: Contrast level slider (low ↔ high)
- **FR3.8**: All sliders update theme tokens in real-time

### FR4: Aesthetic Presets

- **FR4.1**: Preset selector with at least 10 aesthetic directions
- **FR4.2**: Each preset defines compatible ranges for all token dimensions
- **FR4.3**: Selecting a preset applies to all unlocked dimensions
- **FR4.4**: Presets include: brutalist, soft SaaS, swiss minimal, glassmorphism, cyberpunk, monochrome luxury, retro, terminal hacker, japanese minimal, claymorphism

### FR5: Live Preview

- **FR5.1**: Preview panel shows UI components rendered with current theme
- **FR5.2**: Components include: buttons (primary, secondary, ghost, disabled), cards, form inputs, typography hierarchy (H1–H6, body, caption), navigation bar, modal dialog, dashboard blocks, data table, alerts (success, warning, error, info)
- **FR5.3**: Preview is read-only (no editing)
- **FR5.4**: Preview updates in real-time as tokens change
- **FR5.5**: Toggle between light mode and dark mode preview

### FR6: Export System

- **FR6.1**: Export as DESIGN.md (universal, library-agnostic, AI-readable)
- **FR6.2**: Export as generic CSS custom properties (`:root` block with semantic names)
- **FR6.3**: Export as Tailwind v4 config (`@theme` block)
- **FR6.4**: Export as shadcn/ui `globals.css` (`--primary`, `--background`, `--foreground`, `--muted`, `--accent`, `--border`, `--input`, `--ring`, `--destructive`, chart colors)
- **FR6.5**: Export as daisyUI theme (`@plugin "daisyui/theme"` block)
- **FR6.6**: Export as JSON tokens (W3C DTCG-compatible)
- **FR6.7**: Export as AI prompt context (structured markdown for Cursor, Claude Code, OpenCode, ChatGPT)
- **FR6.8**: Copy-to-clipboard button for each format
- **FR6.9**: Download-as-file button for each format

### FR7: Theme Persistence

- **FR7.1**: Current theme saved to localStorage
- **FR7.2**: Theme restored on page reload
- **FR7.3**: "Reset" button clears saved theme and generates new one
- **FR7.4**: Shareable URL via encoded state in URL hash

---

## 10. Non-Functional Requirements

### NFR1: Performance

- Theme generation must complete in under 500ms (client-side)
- Slider interactions must feel instant (<50ms to UI update)
- Initial page load under 2 seconds on 3G

### NFR2: Accessibility

- All slider controls must be keyboard-operable
- Preview text must meet WCAG AA contrast (4.5:1) at minimum
- Screen reader support for theme state changes

### NFR3: Responsiveness

- Works on desktop (primary), tablet (usable), mobile (viewable)
- Preview panel stacks below controls on narrow viewports

### NFR4: Browser Support

- Latest 2 versions of Chrome, Firefox, Safari, Edge
- No IE11 support

### NFR5: Offline Capability

- Theme generation works entirely client-side (no API dependency for core generation)
- AI-assisted features (text-to-theme, preset recommendations) may use API but degrade gracefully offline

### NFR6: Code Quality

- Minimal external runtime dependencies
- All randomization and token logic in vanilla JavaScript
- Chroma.js permitted for color science (OKLCH conversions, contrast ratios)

---

## 11. UX Principles

1. **Immediate gratification**: The first theme appears on page load. No setup, no onboarding, no prompt required.
2. **Progressive disclosure**: Start with "Randomize All" as the primary action. Reveal fine-tuning controls as secondary.
3. **Undo by re-randomizing**: No undo stack. If you don't like a reroll, reroll again. The mechanic is forgiving.
4. **Visual feedback for everything**: Lock toggles animate. Sliders show live preview changes. Exports show success checkmarks.
5. **Single-page, no routing**: Everything happens on one page. No multi-step wizards, no tabs (except light/dark preview toggle).
6. **Learn by exploring**: No tutorials. The interface teaches through interaction — lock what you like, reroll what you don't.
7. **Framework-blind by default**: Users shouldn't need to choose a CSS library before exploring. The export section handles translation — the creative flow doesn't care about framework.

---

## 12. Design Philosophy

The product's own UI should embody its principles:

- **Minimal chrome**: The interface recedes. The theme preview is the star.
- **Monochromatic UI shell**: The control panel uses neutral tones so it doesn't compete with the generated theme.
- **Typography-led**: The product's own typography should demonstrate the power of good type — use distinctive fonts for product UI, not system defaults.
- **Dark-first**: Given the developer audience, default to dark mode but respect system preference.
- **No shadows on chrome**: The tool UI is flat. Shadows belong in the preview — that's the canvas.

---

## 13. Theme Generation Engine

### Architecture

The engine is a **deterministic system fed by curated probability distributions**, not a pure AI black box. This ensures:

- Reproducibility (the same seed produces the same theme)
- Speed (no API call for basic generation)
- Taste (distributions are hand-curated, not model-hallucinated)
- Framework-agnosticism (the engine produces abstract values, not library tokens)

### Generation Pipeline

```
1. Select aesthetic category (random or user-chosen preset)
2. Apply category constraints to value ranges
3. Within each dimension, sample from curated distributions:
   a. Colors: OKLCH-space sampling with harmony rules
   b. Fonts: Pairing matrix lookup
   c. Spacing: Ratio-based scale generation
   d. Radius: Category-appropriate range sampling
   e. Shadows: Elevation + softness parameterization
4. Validate coherence (contrast checks, consistency rules)
5. Apply user lock state (skip locked dimensions)
6. Output abstract ThemeDNA (framework-agnostic values)
```

### OKLCH Color Generation

All color generation operates in OKLCH space for perceptual uniformity:

1. **Base hue**: Randomly selected from a curated set of "starting angles" — not uniform 0–360, as certain hues are more versatile as primaries
2. **Harmony rule**: Randomly chosen from: monochromatic, analogous (±30°), complementary (180°), split-complementary, triadic
3. **Lightness mapping**: Fixed semantic ranges:
   - Background: 95–98% L
   - Surface: 90–95% L
   - Surface elevated: 85–92% L
   - Text: 10–20% L
   - Text muted: 35–50% L
   - Border: 80–90% L
4. **Chroma bounds**: Category-appropriate saturation:
   - Brutalist: 0–0.05 C
   - Soft SaaS: 0.05–0.12 C
   - Cyberpunk: 0.15–0.30 C
   - And so on per aesthetic category
5. **Contrast enforcement**: Text/background pairs must meet WCAG AA (4.5:1). Auto-adjust L values if needed.

---

## 14. Randomization System

### Curated Randomness vs. Pure Randomness

| Dimension | Pure Random                                              | Curated Random                                                                       |
| --------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Colors    | Random hex codes → clashing, inaccessible                | OKLCH sampling with harmony rules → coherent palettes                                |
| Fonts     | Any Google Font → terrible pairings, loading perf issues | Pre-vetted pairing matrix of ~50 high-quality fonts → guaranteed good combinations   |
| Spacing   | Random px values → inconsistent rhythm                   | Ratio-based scales (1.25, 1.33, 1.5) with 4px/8px base → mathematical harmony        |
| Radius    | Random px → sharp cards with round buttons               | Coherent radius system (0px, 4px, 8px, 16px, full) with consistent application rules |
| Shadows   | Random box-shadows → muddy, unrealistic                  | Elevation-based system (5 levels) with consistent light source and color tinting     |

### The Taste Engine

The "taste" comes from human-curated constraints:

1. **Font pool**: ~50 fonts across 6 categories (geometric sans, humanist sans, grotesque sans, serif, slab serif, display). Each has pre-tested pairings rated for compatibility.
2. **Color harmony rules**: Not all mathematical harmonies look good. The system has "soft bans" on certain hue ranges for certain aesthetic categories.
3. **Spacing philosophy**: Three spacing philosophies (compact/8px-grid, comfortable/4px-grid, airy/modular-scale) mapped to aesthetic categories.
4. **Shadow realism**: Shadows aren't just blur + offset. They're tinted with the surface color, have multi-layer construction, and respect a consistent light source angle.

---

## 15. Theme DNA Architecture

The internal theme representation is **framework-agnostic**. It stores abstract design values — not library-specific tokens. Each export target maps these abstract values into the naming convention the user's stack expects.

### Abstract ThemeDNA

```typescript
interface ThemeDNA {
  id: string;
  name: string; // Auto-generated ("Warm Brutalist", "Cyber Garden")
  aesthetic: AestheticCategory;
  seed: number; // Reproducible random seed

  colors: {
    light: ColorRoles;
    dark: ColorRoles;
  };

  typography: {
    headingFont: string; // "Instrument Serif"
    bodyFont: string; // "Inter"
    monoFont: string; // "JetBrains Mono"
    scaleRatio: number; // 1.25 (major third), 1.333 (perfect fourth), etc.
    baseSizePx: number; // 16
    headingWeight: number; // 700
    bodyWeight: number; // 400
    lineHeight: number; // 1.6
  };

  spacing: {
    unit: number; // 4 (px)
    density: "compact" | "comfortable" | "airy";
    scale: number[]; // [4, 8, 12, 16, 24, 32, 48, 64, 96]
    pagePadding: string; // "40px"
    sectionGap: string; // "80px"
  };

  radius: {
    sm: string; // "4px" — inputs, badges, checkboxes
    md: string; // "8px" — cards, buttons, dropdowns
    lg: string; // "16px" — modals, sheets
    full: string; // "9999px" — pills, avatars
  };

  shadows: {
    sm: ShadowValue; // Subtle lift (cards at rest)
    md: ShadowValue; // Moderate lift (cards on hover)
    lg: ShadowValue; // Strong lift (modals, dropdowns)
    xl: ShadowValue; // Maximum lift (sheets, drawers)
    "2xl": ShadowValue; // Extreme (rarely used)
    color: string; // Shadow tint in OKLCH (all shadows tinted same hue)
    softness: number; // 0 (crisp) to 1 (diffuse)
  };

  borders: {
    width: string; // "1px"
    style: "sharp" | "soft" | "barely-there";
  };

  personality: {
    energy: number; // 0 (calm) to 1 (energetic)
    warmth: number; // 0 (cool) to 1 (warm)
    modernity: number; // 0 (classic) to 1 (futuristic)
    playfulness: number; // 0 (serious) to 1 (playful)
  };
}

interface ColorRoles {
  // Semantic roles — not framework tokens
  primary: string; // Brand color, buttons, links, active states
  primaryForeground: string; // Text/icons on primary
  secondary: string; // Secondary brand, hover states
  secondaryForeground: string; // Text on secondary
  accent: string; // Highlights, badges, focus indicators
  accentForeground: string; // Text on accent
  background: string; // Page background
  foreground: string; // Body text
  surface: string; // Card/container background
  surfaceElevated: string; // Modal/dropdown/popover background
  muted: string; // Muted surface for secondary content
  mutedForeground: string; // Secondary text, captions, placeholders
  border: string; // Default border color
  input: string; // Form input background
  ring: string; // Focus ring color
  success: string; // Success feedback
  warning: string; // Warning feedback
  error: string; // Error feedback
  info: string; // Info feedback
}

interface ShadowValue {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  // Color is inherited from shadows.color, tinted by elevation
}
```

### Why Abstract, Not Prescriptive

The `ColorRoles` structure uses semantic names (primary, surface, muted) that map to _roles_ a color plays, not _where in a CSS file_ it goes. This is intentional:

- **shadcn/ui users** get these mapped to `--primary`, `--background`, `--foreground`, `--muted`, etc.
- **daisyUI users** get these mapped to `--color-primary`, `--color-base-100`, `--color-base-content`, etc.
- **Plain CSS users** get these mapped to generic `--primary`, `--text`, `--surface`, etc.
- **DESIGN.md readers** (both human and AI) get these described in natural language: "Primary: the main brand color, used for buttons and links."

The internal model stays clean. The export functions handle translation. If a new CSS library emerges tomorrow, we write one mapping function — the engine doesn't change.

---

## 16. Export System Architecture

### Two-Layer Design

```
                    Abstract ThemeDNA
                    (framework-agnostic)
                           │
          ┌────────────────┼────────────────┐
          │                │                 │
          ▼                ▼                  ▼
    DESIGN.md        CSS Variables       Framework-Specific
    (universal)      (generic)           Exports
          │                │                 │
          │                │          ┌──────┴──────┐
          │                │          ▼             ▼
          │                │     shadcn/ui      daisyUI
          │                │     globals.css    theme block
          │                │          │
          │                │          ▼
          │                │     Tailwind v4
          │                │     @theme block
          │                │
          ▼                ▼
    JSON Tokens        AI Prompt
    (W3C DTCG)         Context
```

### Export Formats

#### 1. DESIGN.md (Primary — Universal)

Following Google's open-source draft specification (April 2026). Contains semantic roles described in natural language, with raw color values. Any AI coding agent can read this and apply it to any framework.

```markdown
# Design System: Warm Brutalist

## Personality

- Energy: 0.3 — Calm, deliberate
- Warmth: 0.7 — Warm, inviting
- Modernity: 0.2 — Classic, timeless
- Playfulness: 0.1 — Serious, functional

## Aesthetic Direction

A warm brutalist aesthetic that balances raw structural honesty with inviting earth tones. Strong typography carries the visual weight. Colors are muted and natural. Shadows are crisp and intentional, never decorative. Borders are visible — you can see the structure.

## Colors

### Primary

- **Role**: Main brand color. Used for primary buttons, links, active states.
- **Light**: `#B8401C` / `oklch(0.52 0.17 30)`
- **Dark**: `#E07A4C` / `oklch(0.62 0.15 30)`
- **WCAG on white (light)**: 5.2:1 (AA ✓, AAA ✗)
- **WCAG on black (dark)**: 5.8:1 (AA ✓, AAA ✗)

### Background

- **Role**: Page background. The canvas everything sits on.
- **Light**: `#FAF8F5` / `oklch(0.97 0.005 85)`
- **Dark**: `#1A1816` / `oklch(0.12 0.005 85)`

### Surface

- **Role**: Card and container backgrounds. Sits above the page background.
- **Light**: `#FFFFFF` / `oklch(1.0 0 0)`
- **Dark**: `#252321` / `oklch(0.18 0.005 85)`

[...continued for all semantic color roles...]

## Typography

### Heading

- **Family**: Instrument Serif
- **Weight**: 400
- **Style**: Editorial serif — conveys trust, permanence, tradition
- **Scale**: Major third (1.25) from 16px base
  - H1: 39px (2.441rem)
  - H2: 31px (1.953rem)
  - H3: 25px (1.563rem)
  - H4: 20px (1.25rem)

### Body

- **Family**: Inter
- **Weight**: 400
- **Size**: 16px
- **Line height**: 1.6
- **Style**: Clean, neutral sans-serif for readability

### Mono

- **Family**: JetBrains Mono
- **Weight**: 400
- **Size**: 14px
- **Usage**: Code blocks, data labels, technical content

## Spacing

- **Philosophy**: Comfortable — breathing room without being wasteful
- **Base unit**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96
- **Page padding**: 40px
- **Section gap**: 80px
- **Card padding**: 24px
- **Component gap**: 16px

## Border Radius

- **Small** (4px): Inputs, badges, tags, checkboxes
- **Medium** (6px): Cards, buttons, dropdowns
- **Large** (12px): Modals, sheets
- **Full** (9999px): Pills, avatars, chips

## Shadows

- **Light source**: Top-left, warm tint
- **Shadow color**: `oklch(0.3 0.02 70)` — warm neutral
- **Level 1** (cards at rest): `0 1px 2px rgba(warm, 0.06), 0 1px 3px rgba(warm, 0.1)`
- **Level 2** (cards on hover): `0 4px 6px rgba(warm, 0.07), 0 2px 4px rgba(warm, 0.06)`
- **Level 3** (dropdowns): `0 10px 15px rgba(warm, 0.1), 0 4px 6px rgba(warm, 0.05)`
- **Level 4** (modals): `0 20px 25px rgba(warm, 0.1), 0 10px 10px rgba(warm, 0.04)`
- **Level 5** (sheets): `0 25px 50px rgba(warm, 0.12)`

## Borders

- **Width**: 2px
- **Style**: Sharp, structural — borders are intentional, not decorative
- **Light**: `oklch(0.85 0.01 80)`
- **Dark**: `oklch(0.25 0.01 80)`

## Interaction Tone

- Buttons are bold and structural — thick borders, minimal rounding
- Hover states use background fill, not shadow
- Focus rings are thick (3px) and high-contrast
- Transitions are snappy (150ms) — no slow fades
- This UI feels deliberate, not delicate
```

#### 2. Generic CSS Variables

```css
:root {
  /* Semantic color roles */
  --primary: #b8401c;
  --primary-foreground: #ffffff;
  --secondary: #f5f0eb;
  --secondary-foreground: #1a1816;
  --accent: #d4a574;
  --accent-foreground: #1a1816;
  --background: #faf8f5;
  --foreground: #1a1816;
  --surface: #ffffff;
  --surface-elevated: #ffffff;
  --muted: #f5f0eb;
  --muted-foreground: #78716c;
  --border: #e7e0d8;
  --input: #faf8f5;
  --ring: #b8401c;
  --success: #4a7c59;
  --warning: #b8860b;
  --error: #b8401c;
  --info: #4a6fa5;

  /* Typography */
  --font-heading: "Instrument Serif", Georgia, serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --text-base: 16px;
  --text-scale: 1.25;
  --leading-body: 1.6;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm:
    0 1px 2px rgba(80, 50, 30, 0.06), 0 1px 3px rgba(80, 50, 30, 0.1);
  --shadow-md:
    0 4px 6px rgba(80, 50, 30, 0.07), 0 2px 4px rgba(80, 50, 30, 0.06);
  --shadow-lg:
    0 10px 15px rgba(80, 50, 30, 0.1), 0 4px 6px rgba(80, 50, 30, 0.05);
  --shadow-xl:
    0 20px 25px rgba(80, 50, 30, 0.1), 0 10px 10px rgba(80, 50, 30, 0.04);
  --shadow-2xl: 0 25px 50px rgba(80, 50, 30, 0.12);

  /* Borders */
  --border-width: 2px;
}

.dark {
  --primary: #e07a4c;
  --primary-foreground: #1a1816;
  --secondary: #2a2724;
  --secondary-foreground: #faf8f5;
  --accent: #c49464;
  --accent-foreground: #1a1816;
  --background: #1a1816;
  --foreground: #faf8f5;
  --surface: #252321;
  --surface-elevated: #2f2c29;
  --muted: #2a2724;
  --muted-foreground: #a8a29e;
  --border: #3d3935;
  --input: #252321;
  --ring: #e07a4c;
  --success: #5c9a6f;
  --warning: #d4a017;
  --error: #e07a4c;
  --info: #5b8fcc;
}
```

#### 3. shadcn/ui globals.css

```css
@layer base {
  :root {
    --background: #faf8f5;
    --foreground: #1a1816;
    --card: #ffffff;
    --card-foreground: #1a1816;
    --popover: #ffffff;
    --popover-foreground: #1a1816;
    --primary: #b8401c;
    --primary-foreground: #ffffff;
    --secondary: #f5f0eb;
    --secondary-foreground: #1a1816;
    --muted: #f5f0eb;
    --muted-foreground: #78716c;
    --accent: #f5f0eb;
    --accent-foreground: #1a1816;
    --destructive: #b8401c;
    --destructive-foreground: #ffffff;
    --border: #e7e0d8;
    --input: #faf8f5;
    --ring: #b8401c;
    --radius: 0.375rem;
    --chart-1: #d4a574;
    --chart-2: #8b9d83;
    --chart-3: #4a6fa5;
    --chart-4: #b8860b;
    --chart-5: #4a7c59;
  }

  .dark {
    --background: #1a1816;
    --foreground: #faf8f5;
    --card: #252321;
    --card-foreground: #faf8f5;
    --popover: #252321;
    --popover-foreground: #faf8f5;
    --primary: #e07a4c;
    --primary-foreground: #1a1816;
    --secondary: #2a2724;
    --secondary-foreground: #faf8f5;
    --muted: #2a2724;
    --muted-foreground: #a8a29e;
    --accent: #2a2724;
    --accent-foreground: #faf8f5;
    --destructive: #e07a4c;
    --destructive-foreground: #1a1816;
    --border: #3d3935;
    --input: #252321;
    --ring: #e07a4c;
    --chart-1: #d4a574;
    --chart-2: #8b9d83;
    --chart-3: #4a6fa5;
    --chart-4: #b8860b;
    --chart-5: #4a7c59;
  }
}
```

#### 4. daisyUI Theme

```css
@plugin "daisyui/theme" {
  name: "warm-brutalist";
  default: false;
  prefersdark: false;
  color-scheme: light;

  --color-base-100: oklch(0.97 0.005 85);
  --color-base-200: oklch(0.95 0.005 85);
  --color-base-300: oklch(0.92 0.005 85);
  --color-base-content: oklch(0.12 0.005 85);
  --color-primary: oklch(0.52 0.17 30);
  --color-primary-content: oklch(1 0 0);
  --color-secondary: oklch(0.9 0.01 80);
  --color-secondary-content: oklch(0.12 0.005 85);
  --color-accent: oklch(0.72 0.08 70);
  --color-accent-content: oklch(0.12 0.005 85);
  --color-neutral: oklch(0.3 0.01 80);
  --color-neutral-content: oklch(0.97 0.005 85);
  --color-info: oklch(0.55 0.1 250);
  --color-info-content: oklch(1 0 0);
  --color-success: oklch(0.5 0.1 145);
  --color-success-content: oklch(1 0 0);
  --color-warning: oklch(0.6 0.12 85);
  --color-warning-content: oklch(0.12 0.005 85);
  --color-error: oklch(0.52 0.17 30);
  --color-error-content: oklch(1 0 0);

  --radius-selector: 0.25rem;
  --radius-field: 0.25rem;
  --radius-box: 0.375rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 2px;
  --depth: 0;
  --noise: 0;
}
```

#### 5. Tailwind v4 Config

```css
@theme {
  --color-primary: #b8401c;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f5f0eb;
  --color-secondary-foreground: #1a1816;
  --color-accent: #d4a574;
  --color-accent-foreground: #1a1816;
  --color-background: #faf8f5;
  --color-foreground: #1a1816;
  --color-surface: #ffffff;
  --color-surface-elevated: #ffffff;
  --color-muted: #f5f0eb;
  --color-muted-foreground: #78716c;
  --color-border: #e7e0d8;
  --color-input: #faf8f5;
  --color-ring: #b8401c;
  --color-success: #4a7c59;
  --color-warning: #b8860b;
  --color-error: #b8401c;
  --color-info: #4a6fa5;

  --font-heading: "Instrument Serif", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

#### 6. AI Prompt Context

```
You are building a UI for a product with the following visual identity.
Apply these design rules to every component you generate.

AESTHETIC: Warm Brutalist
Raw structural honesty with inviting earth tones. Strong typography.
Colors are muted and natural. Shadows are crisp and intentional.
Borders are visible — structure is celebrated, not hidden.

COLORS:
- Primary (buttons, links, active): Light #B8401C, Dark #E07A4C
- Background (page): Light #FAF8F5, Dark #1A1816
- Surface (cards): Light #FFFFFF, Dark #252321
- Text: Light #1A1816, Dark #FAF8F5
- Muted text: Light #78716C, Dark #A8A29E
- Borders: Light #E7E0D8, Dark #3D3935
- Inputs: Light #FAF8F5, Dark #252321
- Focus ring: Light #B8401C, Dark #E07A4C

TYPOGRAPHY:
- Headings: Instrument Serif, weight 400
- Body: Inter, weight 400, 16px, line-height 1.6
- Code: JetBrains Mono, 14px
- Scale: Major third (1.25)

SPACING:
- Base unit 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Card padding: 24px. Section gap: 80px.
- Philosophy: Comfortable — breathing room without waste.

RADIUS:
- Inputs/badges: 4px. Cards/buttons: 6px. Modals: 12px. Pills: full.

SHADOWS:
- Crisp, warm-tinted. Light source top-left.
- Cards at rest: 0 1px 2px rgba(80,50,30,0.06), 0 1px 3px rgba(80,50,30,0.1)
- Cards on hover: 0 4px 6px rgba(80,50,30,0.07), 0 2px 4px rgba(80,50,30,0.06)

BORDERS:
- 2px wide, structural. Visible and intentional.

INTERACTION TONE:
- Buttons: bold and structural, minimal rounding, thick borders
- Hover: background fill, not shadow
- Focus rings: 3px, high-contrast
- Transitions: 150ms, snappy — no slow fades

Generate components that match this identity. Every color, spacing
value, radius, shadow, and typography choice should come from the
rules above. Do not introduce new values.
```

#### 7. JSON Tokens (W3C DTCG)

```json
{
  "design-system": {
    "name": "Warm Brutalist",
    "personality": {
      "energy": 0.3,
      "warmth": 0.7,
      "modernity": 0.2,
      "playfulness": 0.1
    },
    "colors": {
      "light": {
        "primary": { "$value": "#B8401C", "$type": "color" },
        "background": { "$value": "#FAF8F5", "$type": "color" }
      },
      "dark": {
        "primary": { "$value": "#E07A4C", "$type": "color" },
        "background": { "$value": "#1A1816", "$type": "color" }
      }
    },
    "typography": {
      "headingFont": { "$value": "Instrument Serif", "$type": "fontFamily" },
      "bodyFont": { "$value": "Inter", "$type": "fontFamily" },
      "baseSize": { "$value": "16px", "$type": "dimension" },
      "scaleRatio": { "$value": 1.25, "$type": "number" }
    }
  }
}
```

---

## 17. Preview System

### Component Inventory

The preview renders a static, non-interactive showcase:

| Category   | Components                                                     |
| ---------- | -------------------------------------------------------------- |
| Buttons    | Primary, Secondary, Ghost, Disabled, Icon button, Button group |
| Forms      | Text input, Select, Checkbox, Radio, Toggle, Textarea          |
| Cards      | Default card, Card with image, Card with actions               |
| Typography | H1 through H6, Body text, Caption, Label, Inline code          |
| Navigation | Horizontal nav bar, Breadcrumbs, Tabs                          |
| Feedback   | Success alert, Warning alert, Error alert, Info alert          |
| Data       | Table with header, Table row hover, Badge/Pill, Avatar         |
| Layout     | Modal dialog, Dashboard grid blocks                            |

### Implementation

The preview is a single component that:

1. Receives the current ThemeDNA object
2. Injects CSS custom properties into a scoped container using the generic CSS variables export format
3. Renders all preview components using those variables
4. Does NOT use any component library — the HTML/CSS is hand-written to ensure it reflects the values faithfully
5. Does NOT use any framework-specific naming — the preview uses the generic CSS variable format, not shadcn or daisyUI tokens

This ensures the preview shows the theme, not any particular library's interpretation of it.

---

## 18. Information Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER: Logo / Lab → VIBE UI breadcrumb / Theme Toggle     │
├───────────────────────┬──────────────────────────────────────┤
│                       │                                      │
│   CONTROL PANEL       │        LIVE PREVIEW                  │
│   (left, ~400px)      │        (right, flexible)             │
│                       │                                      │
│  ┌─────────────────┐  │  ┌──────────────────────────────────┐│
│  │ AESTHETIC       │  │  │                                  ││
│  │ PRESET SELECTOR │  │  │  Buttons / Cards / Forms         ││
│  └─────────────────┘  │  │  Typography / Nav / Modal        ││
│                       │  │  Tables / Alerts / Dashboard     ││
│  ┌─────────────────┐  │  │                                  ││
│  │ 🎲 RANDOMIZE    │  │  │  (scrollable)                    ││
│  │     ALL         │  │  │                                  ││
│  └─────────────────┘  │  └──────────────────────────────────┘│
│                       │                                      │
│  DIMENSION LOCKS:    │  ┌──────────────────────────────────┐│
│  🔒 Colors  [🎲]    │  │  ◐ LIGHT / ☽ DARK TOGGLE         ││
│  🔓 Fonts   [🎲]    │  └──────────────────────────────────┘│
│  🔒 Spacing [🎲]    │                                      │
│  🔓 Radius  [🎲]    │                                      │
│  🔓 Shadows [🎲]    │                                      │
│                       │                                      │
│  ┌─────────────────┐  │                                      │
│  │ FINE-TUNE       │  │                                      │
│  │ Font Family   ▾ │  │                                      │
│  │ Font Pairing  ▾ │  │                                      │
│  │ Radius   [══○═] │  │                                      │
│  │ Spacing  [══○═] │  │                                      │
│  │ Shadows  [═══○] │  │                                      │
│  │ Energy   [○═══] │  │                                      │
│  │ Contrast [══○═] │  │                                      │
│  └─────────────────┘  │                                      │
│                       │                                      │
│  ┌─────────────────┐  │                                      │
│  │ EXPORT          │  │                                      │
│  │ 📋 DESIGN.md    │  │                                      │
│  │ 📋 CSS Vars     │  │                                      │
│  │ 📋 shadcn/ui    │  │                                      │
│  │ 📋 Tailwind v4  │  │                                      │
│  │ 📋 daisyUI      │  │                                      │
│  │ 📋 JSON Tokens  │  │                                      │
│  │ 📋 AI Prompt    │  │                                      │
│  └─────────────────┘  │                                      │
│                       │                                      │
├───────────────────────┴──────────────────────────────────────┤
│  FOOTER: Copyright / Links                                   │
└──────────────────────────────────────────────────────────────┘
```

---

## 19. User Flow

```
1. User arrives at VIBE UI
2. Theme auto-generates on load → preview updates
3. User evaluates the theme in preview
   ├── "I like this!" → Export → Paste into Cursor/Claude → Done
   ├── "Almost..." → Lock dimensions they like → Reroll others
   │   └── Repeat until satisfied → Choose export format → Done
   ├── "Let me try a different style" → Select preset → Theme updates
   │   └── Fine-tune with sliders → Choose export format → Done
   └── "I want full control" → Adjust all sliders → Choose export format → Done

Time to first export: 30–90 seconds
```

### Key insight: Framework selection happens at export time, not creation time.

The user doesn't pick "shadcn" or "daisyUI" before exploring. They explore themes visually. When they find one they like, the export section offers all formats. They pick the one that matches their stack — or the universal DESIGN.md if they haven't chosen a stack yet.

---

## 20. Technical Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  BROWSER (Client-Side)                    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Theme Engine │  │   UI Layer   │  │ Export Engine │  │
│  │ (pure JS)    │  │  (HTML/CSS)  │  │ (pure JS)     │  │
│  │              │  │              │  │               │  │
│  │ - OKLCH gen  │  │ - Controls   │  │ - DESIGN.md   │  │
│  │ - Font pair  │  │ - Preview    │  │ - CSS Vars    │  │
│  │ - Spacing    │  │ - Sliders    │  │ - shadcn/ui   │  │
│  │ - Radius     │  │ - Lock UI    │  │ - Tailwind v4 │  │
│  │ - Shadows    │  │              │  │ - daisyUI     │  │
│  │ - Presets    │  │              │  │ - JSON Tokens │  │
│  │              │  │              │  │ - AI Prompt   │  │
│  └──────────────┘  └──────────────┘  └───────────────┘  │
│         │                                       │        │
│         ▼                                       ▼        │
│  ┌──────────────┐                     Clipboard /        │
│  │  ThemeDNA    │                     File Download      │
│  │ (state obj)  │                                       │
│  └──────────────┘                                       │
│         │                                                │
│         ▼                                                │
│  ┌──────────────┐                                        │
│  │ localStorage │                                        │
│  └──────────────┘                                        │
│                                                          │
│  OPTIONAL: Gemini API for AI-assisted generation         │
│  (text prompt → theme, smart preset recommendations)     │
└──────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Zero-build deployment**: Like the RAG chatbot page, VIBE UI is a standalone HTML page with separate CSS and JS files. No React, no Next.js, no build step. Matches the portfolio's vanilla architecture.

2. **Pure client-side generation**: The core theme engine runs entirely in the browser. No server required for randomization, token generation, or export. Instant response, offline-capable.

3. **Framework-agnostic engine**: The ThemeDNA stores abstract values. Each export target is a pure mapping function. Adding a new export format means writing one new function — no engine changes.

4. **Optional AI layer**: A text-to-theme feature using Gemini API (via existing `/api/generate-design` Vercel function pattern) can be added as an enhancement. The core product does not require it.

5. **Shareable state via URL hash**: Theme state encoded in URL hash for sharing (`#theme=abc123`). No accounts required.

---

## 21. Suggested Tech Stack

| Layer                   | Technology                                           | Rationale                                                                                              |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Page**                | `vibe-ui/index.html` (self-contained folder)         | Standalone page in its own folder, like `rag-chatbot.html` but with all assets co-located.             |
| **Styling**             | Tailwind CSS v4 + project's `style.css`              | Already in the project. Design tokens from `src/tokens.css` reused for chrome.                         |
| **Page-specific CSS**   | `vibe-ui/style.css`                                  | Control panel layout, preview component styles, export section, responsive breakpoints.                |
| **Core Engine**         | `vibe-ui/engine.js` (vanilla JS)                     | Zero dependencies. Pure functions for theme generation.                                                |
| **Curated Data**        | `vibe-ui/presets.js` (vanilla JS)                    | ~50 fonts, 10 aesthetic presets, harmony rules, spacing philosophies. No imports.                      |
| **Export Templates**    | `vibe-ui/exports.js` (vanilla JS)                    | 7 pure template functions (DESIGN.md, CSS, shadcn/ui, daisyUI, Tailwind, JSON, AI prompt).             |
| **UI Logic**            | `vibe-ui/ui.js` (vanilla JS)                         | DOM manipulation, event handling, state management. Depends on `engine.js` and `exports.js`.           |
| **Color Science**       | Chroma.js (~35KB, single dependency)                 | OKLCH conversions, contrast ratio calculation, shade generation. Worth the dependency for correctness. |
| **Font Loading**        | Google Fonts API (dynamic)                           | Load fonts on-demand when theme changes to avoid loading all ~50 fonts upfront.                        |
| **AI Enhancement**      | Gemini 2.5 Flash via existing `/api/generate-design` | Text prompt → theme generation. Optional, gated behind feature flag.                                   |
| **State**               | Plain object + `localStorage`                        | No state management library. ThemeDNA is ~2KB of JSON.                                                 |
| **Shared Dependencies** | `src/canvas-bg.js`, `src/theme-toggle.js`            | Reused from existing project. Background canvas and theme toggle.                                      |

---

## 22. AI Integration Opportunities

### Phase 1: Deterministic (MVP)

No AI. Pure curated randomization engine. Fast, offline, reliable.

### Phase 2: AI-Assisted (Enhancement)

- **Text-to-theme**: User types "dark SaaS dashboard, muted greens, professional" → Gemini generates a ThemeDNA with appropriate values
- **Smart preset matching**: User describes their product → AI recommends the closest aesthetic preset
- **Personality extraction**: User pastes their product description → AI extracts personality dimensions (energy, warmth, etc.) and seeds the theme

### Phase 3: Agent-Native (Future)

- **MCP server**: VIBE UI as an MCP server that AI coding tools can call directly: "generate a brutalist theme for my healthcare app"
- **CI/CD integration**: GitHub Action that validates new UI against DESIGN.md on every PR

---

## 23. Monetization Ideas (Future)

_Currently: Free. If traction warrants SaaS launch:_

| Tier | Price  | Features                                                               |
| ---- | ------ | ---------------------------------------------------------------------- |
| Free | $0     | Generate themes, all export formats, 5 saved themes                    |
| Pro  | $12/mo | Unlimited saved themes, AI text-to-theme, team sharing, priority fonts |
| Team | $29/mo | Shared theme library, brand kit, CI/CD integration, API access         |

---

## 24. Competitive Positioning

| Tool                           | What it does                 | VIBE UI difference                                                           |
| ------------------------------ | ---------------------------- | ---------------------------------------------------------------------------- |
| **DesignMCP**                  | MCP server for design tokens | Visual, playful, browser-first. Not an MCP server — a creative tool.         |
| **FORGE**                      | CLI design system generator  | Zero setup, no commands to learn. Instant visual feedback.                   |
| **colorpalettegenerator.ai**   | AI color palette from prompt | Full theme (colors + type + spacing + shadows), not just colors.             |
| **Google Stitch**              | AI design canvas             | Lightweight, no canvas, no learning curve. One purpose, done well.           |
| **AI Design System Generator** | Prompt → full design system  | Faster exploration. No prompt needed. Curated randomness over AI generation. |
| **v0 / Bolt / Lovable**        | AI component generation      | Generates _intention_, not components. Works with any AI coding tool.        |

**Key differentiator**: Framework-agnostic. Every competitor couples their output to a specific CSS library's token structure. VIBE UI generates abstract design values and maps them to whatever format the user needs — including the universal DESIGN.md for users who haven't chosen a stack yet.

**Positioning statement**: VIBE UI is the universal exploration layer that sits before any CSS framework or AI coding tool. It generates the visual constraints that make AI output look intentional, not generic — regardless of what library ultimately renders the pixels.

---

## 25. MVP Scope

### In scope (v1.0)

- [x] Auto-generate complete theme on page load
- [x] Randomize All button
- [x] Per-dimension randomize (colors, fonts, spacing, radius, shadows)
- [x] Per-dimension lock toggles
- [x] 10 aesthetic presets
- [x] Live preview panel (buttons, cards, forms, typography, nav, modal, table, alerts)
- [x] Light/dark preview toggle
- [x] Visual control sliders (radius, spacing, shadow softness, color energy, contrast)
- [x] Font family and pairing selectors
- [x] Export: DESIGN.md, CSS variables, shadcn/ui, Tailwind v4, daisyUI, JSON tokens, AI prompt
- [x] Copy to clipboard + download for all formats
- [x] localStorage persistence
- [x] Shareable URL (encoded theme state)

### Out of scope (v1.0)

- [ ] AI text-to-theme (Gemini integration)
- [ ] User accounts / saved themes library
- [ ] MCP server
- [ ] CI/CD integration
- [ ] Custom font upload
- [ ] Image/URL color extraction
- [ ] Component-level token overrides
- [ ] Animation token generation

### v1.5 (quick follow-ups)

- AI text-to-theme via existing Gemini API
- More aesthetic presets (community-contributed?)
- Theme history (undo/redo within session)
- "I'm feeling lucky" weighted randomization (leans toward popular presets)

---

## 26. V2 Features (Post-Launch)

- **Team themes**: Share themes via link, collaborate on refinements
- **Brand extraction**: Paste a URL → extract colors, fonts, and personality
- **Image extraction**: Upload a mood board or logo → generate matching theme
- **Theme history & versioning**: Browse past themes, fork, compare
- **MCP server**: AI coding tools can call VIBE UI directly
- **DESIGN.md validation**: Lint your codebase against your DESIGN.md (like Google's CLI linter)
- **Animation tokens**: Generate micro-interaction tokens (duration, easing, stagger)
- **Community themes**: Public gallery, upvotes, remixing
- **API**: Programmatic theme generation for build pipelines
- **Export templates**: Panda CSS, Vanilla Extract, MUI theme, Chakra UI theme, styled-components theme

---

## 27. Risks and Challenges

| Risk                                                                                                                      | Severity | Mitigation                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Curation bottleneck** — Font pool, color harmony rules, presets require human curation that doesn't scale               | Medium   | Start with 50 fonts, 10 presets. Grow incrementally. Open-source curation guidelines.                                                                |
| **"Another theme generator" fatigue** — The space has many tools                                                          | Medium   | Positioning as "pre-AI-coding-tool" rather than "theme generator." Framework-agnostic export (especially DESIGN.md + AI prompt context) is the moat. |
| **AI coding tools change context format** — DESIGN.md spec could evolve, Cursor/Claude could change how they read context | Low      | DESIGN.md is open-source with a spec. Export templates are easy to update.                                                                           |
| **Preview fidelity** — Preview might not perfectly represent how the theme looks in a real app                            | Medium   | Keep preview simple. Document that it's representative, not pixel-perfect. The values are the truth; the preview is a sketch.                        |
| **Performance with many fonts** — Loading 50 Google Fonts on demand could be slow                                         | Low      | Load fonts lazily. Only load the 2–3 fonts in the current theme. Preconnect to Google Fonts.                                                         |
| **Framework fragmentation** — New CSS libraries keep emerging with new token structures                                   | Low      | This is the strength, not a weakness. The abstract engine doesn't care about frameworks. A new library means one new export function.                |

---

## 28. Product Constraints

1. **Must work as a standalone HTML page** — No build step, no framework. Matches the portfolio's architecture.
2. **Must reuse existing design tokens where possible** — The portfolio already has a rich token system (`src/tokens.css`). The VIBE UI page should respect it for its own chrome.
3. **Must work without API keys** — Core theme generation must work offline. AI features are additive.
4. **Must ship within the existing Vercel deployment** — No new infrastructure.
5. **Must be a lab project** — Linked from `lab.html` alongside the RAG chatbot.
6. **Engine must be framework-agnostic** — The internal ThemeDNA stores abstract values. No library-specific naming in the data model.

---

## 29. Success Metrics

Since this is a free lab project, success is measured differently:

| Metric                  | Target                                                                         | How to measure                   |
| ----------------------- | ------------------------------------------------------------------------------ | -------------------------------- |
| **Time to first theme** | <2 seconds from page load                                                      | Lighthouse / manual timing       |
| **Export rate**         | >40% of sessions export at least one format                                    | Analytics event on export click  |
| **DESIGN.md adoption**  | DESIGN.md is the most-exported format among users with no framework preference | Export event tracking per format |
| **Return usage**        | Users come back and generate multiple themes                                   | localStorage theme count         |
| **Reroll engagement**   | Average >5 rerolls per session                                                 | Analytics counter                |
| **Lab page traffic**    | VIBE UI becomes the #1 or #2 lab project by visits                             | Vercel Analytics                 |

### If measuring for SaaS viability

- Weekly active users
- Exports per user per week
- Export format distribution (which frameworks users actually use)
- Time spent per session
- % of users who try AI text-to-theme (v1.5)

---

## 30. Future Vision

### 12-month vision

VIBE UI becomes the standard first step in every vibe coder's workflow. Before typing "build me a dashboard," they visit VIBE UI, find a visual direction, export a DESIGN.md, and drop it into their repo. AI coding tools read it and generate consistent, beautiful interfaces from the first prompt — regardless of which CSS library was used.

### 24-month vision

VIBE UI evolves into a protocol, not just a product. The DESIGN.md export becomes as standard as `.gitignore`. AI coding tools build first-class VIBE UI integration. "VIBE UI compatible" becomes a quality signal for AI-generated interfaces. The export layer grows to support every major CSS library and framework.

### Philosophical north star

The product succeeds when the question shifts from "Why does every AI-generated app look the same?" to "How did that indie hacker build something so visually distinctive?" The answer is: they started with intention. VIBE UI made that intention easy to create, framework-agnostic, and impossible to ignore.

---

## Appendix A: Aesthetic Presets Reference

| Preset                | Energy | Warmth | Modernity | Playfulness | Typical Font Pair                           | Typical Colors                                    | Typical Radius | Typical Shadow             |
| --------------------- | ------ | ------ | --------- | ----------- | ------------------------------------------- | ------------------------------------------------- | -------------- | -------------------------- |
| **Brutalist**         | 0.3    | 0.5    | 0.1       | 0.1         | Mono heading + grotesque sans body          | Muted earth tones, black, raw primaries           | 0–2px          | Crisp, hard, no blur       |
| **Soft SaaS**         | 0.5    | 0.6    | 0.7       | 0.3         | Geometric sans heading + humanist sans body | Pastel primaries, white surfaces, soft blues      | 8–16px         | Soft, diffuse, multi-layer |
| **Swiss Minimal**     | 0.4    | 0.3    | 0.8       | 0.1         | Grotesque sans (single family)              | Monochrome + one accent, high contrast            | 0–4px          | Minimal, functional        |
| **Glassmorphism**     | 0.6    | 0.5    | 0.9       | 0.5         | Geometric sans heading + humanist sans body | Vibrant on white, translucent surfaces            | 12–24px        | Soft, colored, layered     |
| **Cyberpunk**         | 0.9    | 0.4    | 0.9       | 0.7         | Display heading + mono body                 | Neon on black, high saturation, glowing accents   | 4–8px          | Harsh, colored, glowing    |
| **Monochrome Luxury** | 0.2    | 0.6    | 0.8       | 0.1         | Serif heading + humanist sans body          | Single hue, wide lightness range, gold/silver     | 0–4px          | Subtle, elegant, thin      |
| **Retro**             | 0.7    | 0.8    | 0.2       | 0.6         | Serif/slab heading + grotesque body         | Warm, saturated, 70s/80s palettes                 | 4–8px          | Chunky, warm, bold         |
| **Terminal Hacker**   | 0.5    | 0.3    | 0.3       | 0.3         | Mono (single family)                        | Green on black, amber on black                    | 0px            | None or harsh pixel        |
| **Japanese Minimal**  | 0.2    | 0.5    | 0.5       | 0.2         | Serif heading + geometric sans body         | Earth tones, indigo, warm neutrals, lots of white | 0–2px          | None — flat, clean         |
| **Claymorphism**      | 0.5    | 0.7    | 0.6       | 0.8         | Rounded geometric sans (single family)      | Soft, pastel, 3D-shaded                           | 16–32px        | Soft, inner+outer, 3D      |

## Appendix B: Export Template Mapping

How the abstract `ColorRoles` map to each export format's naming:

| Abstract Role       | Generic CSS            | shadcn/ui                | daisyUI                   | Tailwind v4                  |
| ------------------- | ---------------------- | ------------------------ | ------------------------- | ---------------------------- |
| `primary`           | `--primary`            | `--primary`              | `--color-primary`         | `--color-primary`            |
| `primaryForeground` | `--primary-foreground` | `--primary-foreground`   | `--color-primary-content` | `--color-primary-foreground` |
| `background`        | `--background`         | `--background`           | `--color-base-100`        | `--color-background`         |
| `foreground`        | `--foreground`         | `--foreground`           | `--color-base-content`    | `--color-foreground`         |
| `surface`           | `--surface`            | `--card`                 | `--color-base-200`        | `--color-surface`            |
| `surfaceElevated`   | `--surface-elevated`   | `--popover`              | `--color-base-300`        | `--color-surface-elevated`   |
| `muted`             | `--muted`              | `--muted`                | N/A (use neutral)         | `--color-muted`              |
| `mutedForeground`   | `--muted-foreground`   | `--muted-foreground`     | N/A (use neutral-content) | `--color-muted-foreground`   |
| `border`            | `--border`             | `--border`               | `--color-base-300`¹       | `--color-border`             |
| `input`             | `--input`              | `--input`                | N/A (use base-100)        | `--color-input`              |
| `ring`              | `--ring`               | `--ring`                 | N/A (use primary)         | `--color-ring`               |
| `success`           | `--success`            | N/A (use shadcn default) | `--color-success`         | `--color-success`            |
| `error`             | `--error`              | `--destructive`          | `--color-error`           | `--color-error`              |

¹ daisyUI doesn't have a dedicated border color token — borders use the base-300 shade.

This mapping table is implemented as pure functions in the export engine. Adding a new framework means adding one new mapping function.
