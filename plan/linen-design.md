---
version: alpha
name: Linen
description: An ultra-minimalist editorial design system built on warm cream paper, hairline rules, and a single near-black ink. Hierarchy comes from typographic scale, weight, and whitespace.
colors:
  primary: "#111111"
  on-primary: "#f1ede3"
  secondary: "#3a3733"
  tertiary: "#8a857c"
  neutral: "#f7f4ec"
  surface: "#f1ede3"
  on-surface: "#111111"
  border: "#1f1d1a"
  focus: "#c8462c"
  signal: "#c8462c"
  error: "#c8462c"
typography:
  display-xl:
    fontFamily: "Archivo Narrow, sans-serif"
    fontWeight: 700
    fontSize: "120px"
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  display-lg:
    fontFamily: "Archivo Narrow, sans-serif"
    fontWeight: 700
    fontSize: "88px"
    lineHeight: 0.96
    letterSpacing: "-0.005em"
  headline-lg:
    fontFamily: "Archivo Narrow, sans-serif"
    fontWeight: 700
    fontSize: "56px"
    lineHeight: 1.0
    letterSpacing: "0em"
  headline-md:
    fontFamily: "Archivo Narrow, sans-serif"
    fontWeight: 600
    fontSize: "28px"
    lineHeight: 1.1
    letterSpacing: "0em"
  headline-sm:
    fontFamily: "Inter, sans-serif"
    fontWeight: 500
    fontSize: "18px"
    lineHeight: 1.3
    letterSpacing: "0em"
  body-md:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
    fontSize: "16px"
    lineHeight: 1.55
    letterSpacing: "0em"
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
    fontSize: "14px"
    lineHeight: 1.55
    letterSpacing: "0em"
  label-sm:
    fontFamily: "Inter, sans-serif"
    fontWeight: 500
    fontSize: "11px"
    lineHeight: 1.2
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  mono-sm:
    fontFamily: "JetBrains Mono, monospace"
    fontWeight: 400
    fontSize: "11px"
    lineHeight: 1.3
    letterSpacing: "0.04em"
  stat-numeral:
    fontFamily: "Archivo Narrow, sans-serif"
    fontWeight: 700
    fontSize: "56px"
    lineHeight: 1.0
    letterSpacing: "-0.01em"
rounded:
  none: "0px"
  sm: "2px"
  md: "2px"
  lg: "2px"
  xl: "2px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "72px"
  gutter: "32px"
  page-padding: "40px"
border:
  hairline: "1px solid #1f1d1a"
  signal: "2px solid #c8462c"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.on-primary}"
    textColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    border: "1px solid {colors.border}"
  button-secondary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "12px 0px"
    border-top: "1px solid {colors.border}"
    border-bottom: "1px solid {colors.border}"
  input-field-focus:
    border-bottom: "2px solid {colors.focus}"
  card:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "32px"
    border: "1px solid {colors.border}"
  card-paper:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.none}"
    padding: "32px"
    border: "1px solid {colors.border}"
  checkbox:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    size: "16px"
    border: "1px solid {colors.border}"
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  tabs-active:
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    border-bottom: "2px solid {colors.focus}"
  tabs-inactive:
    textColor: "{colors.tertiary}"
    typography: "{typography.label-sm}"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
    border: "1px solid {colors.border}"
  stat-block:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.stat-numeral}"
    padding: "0px"
    border-bottom: "1px solid {colors.border}"
---

## Overview

Linen is a quiet, paper-like editorial system. It reads like a printed brand book: oversized condensed display type, generous gutters, hairline frames, monospace metadata, and small uppercase tracking-out labels. Everything sits on a single warm cream surface, separated only by 1px hairline rules and held together by one near-black ink. There are no shadows, no gradients, and no rounded corners; hierarchy is achieved purely through typographic scale, weight, ample whitespace, and a strict Swiss-style grid.

The system is framework-agnostic. `system.css` defines the tokens above as CSS custom properties under `:root`, and the component classes consume them directly. Markup is plain semantic HTML.

## Colors

The palette is monochrome on warm cream with a single warm accent reserved for active state and emphasis. Linen is the dominant surface across the system, preview, and cover. Paper is a slightly lighter inset that quietly groups dense content without introducing material. Ink and Graphite carry all type and primary controls. Stone handles muted labels and captions. Hairline is the 1px line used for every divider, frame, and border. Signal is the only color outside the monochrome scale; it appears at one place at a time, as a 2px underline or a focus rule.

| Token     | Value     | Role                                          |
| --------- | --------- | --------------------------------------------- |
| surface   | `#f1ede3` | Linen — primary page and system background    |
| neutral   | `#f7f4ec` | Paper — inset panels and stat blocks          |
| primary   | `#111111` | Ink — display type, headings, primary buttons |
| secondary | `#3a3733` | Graphite — body copy and secondary text       |
| tertiary  | `#8a857c` | Stone — labels, captions, metadata            |
| border    | `#1f1d1a` | Hairline — 1px dividers, frames, borders      |
| focus     | `#c8462c` | Signal — active state, focus ring, accent dot |

Contrast: Ink on Linen exceeds WCAG AAA for normal text; Graphite on Linen exceeds AA; Stone on Linen is reserved for non-essential metadata and remains above the 3:1 large-text threshold.

## Typography

Three families do all the work:

- **Archivo Narrow** (700) — architectural condensed display for hero headlines and large stat numerals. Tracking is tight; the letterforms span the grid like architectural lettering.
- **Inter** (400, 500) — UI body, secondary headings, and uppercase tracked labels.
- **JetBrains Mono** (400) — small metadata, codes, pill tags, and figure captions.

The scale climbs in clear steps from 11px labels and mono captions to 14–16px body, to 18px and 28px utility headings, to 56px section headlines, to 88–120px display lettering used for the hero. Uppercase 11px labels with 0.14em tracking are the connective tissue between sections.

## Layout

Linen uses a strict 12-column grid with a 32px gutter and a 40px page padding. Sections are stacked vertically and bordered top and bottom by hairline rules, creating the printed brand-book rhythm. Content breathes — vertical padding inside a section block sits around 64–96px so display type has room.

Three layout primitives:

- `.l-page` — fixed maximum width (1280px) page container with the page padding.
- `.l-grid` — 12-column grid with the gutter token.
- `.l-rule` — full-width 1px hairline rule used to separate sections.

Margins, gutters, and rules are the only spacial cues. There are no cards stacked on cards and no nested panels.

## Elevation & Depth

The system is completely flat. There are no drop shadows, no soft glows, and no gradients. Depth and grouping are expressed through:

- 1px hairline rules between sections, around cards, and beneath inputs.
- The Paper inset color used sparingly for stat blocks or quiet asides.
- Whitespace, which is the primary tool for hierarchy.

Focus uses a 1px hairline inset outline and, where appropriate, a 2px Signal underline. Hover swaps fill and label colors on buttons rather than adding any elevation.

## Shapes

Zero radius. Strictly orthogonal forms. Components are framed by hairline 1px borders or sit on the open page. The only exception is `rounded.full`, used for pill-shaped tag chips that wrap a label and an inline arrow. There is no ornamentation, no curve, no decorative shape.

## Components

All components are reusable CSS classes consuming the tokens above.

- **Button (`.btn`, `.btn--primary`, `.btn--ghost`)** — square 1px ink-bordered ghost button on cream, or solid ink button with cream label. 12px vertical / 18px horizontal padding. Uppercase 11px tracked label. Hover swaps fill and label colors. An optional trailing arrow icon (`.btn__arrow`) is allowed.
- **Input (`.field`, `.field__label`, `.field__input`)** — borderless input sitting between two hairline rules. 12px vertical padding. The floating uppercase label sits above the input. Focus replaces the bottom hairline with a 2px Signal underline.
- **Card (`.card`, `.card--paper`)** — open square panel framed by 1px hairline rules. 24–32px padding. Uppercase mini-label top-left, body and large numeric display below. The `--paper` variant uses the Paper neutral fill for quiet emphasis.
- **Checkbox (`.check`, `.check__box`, `.check__label`)** — 16px square hairline outline. Checked state fills with Ink and shows a hairline cream check. No rounded corners, no animation beyond color swap.
- **Tabs (`.tabs`, `.tabs__item`, `.tabs__item--active`)** — inline horizontal list separated by a single hairline rule. The active tab carries a 2px Signal underline flush with the rule. Inactive tabs use Stone; the active one uses Ink. Uppercase 11px tracked labels.
- **Signature: Stat Block (`.stat`, `.stat__value`, `.stat__caption`)** — the editorial stat block. A large architectural Archivo Narrow numeral rests above a hairline rule with a tiny uppercase mono caption beneath. Composed in a grid of two to four figures.
- **Pill (`.pill`)** — small uppercase tag chip with a hairline border and `rounded.full` radius, used only when the label contains a tiny trailing arrow.

### Icon library

Linen uses **Lucide** for all icons.

- Library: Lucide
- Link: https://lucide.dev/
- License: ISC
- Usage: hairline 1.25px outline icons rendered in `currentColor`. They appear as small inline indicators beside labels, inside buttons, and as menu glyphs. Icon containers inherit the surrounding text color so icons quietly follow type rather than calling attention to themselves.

## Do's and Don'ts

**Do**

- Lean on whitespace. When in doubt, add more space between blocks rather than another rule or panel.
- Keep labels uppercase, tracked, and 11px. They tie sections together.
- Use the Signal color exactly once per view, as a 2px underline or a focus ring.
- Compose hero moments with oversized Archivo Narrow display type. The page should look like the type is the architecture.

**Don't**

- Don't introduce drop shadows, gradients, or soft glows. The system is flat by intent.
- Don't round corners outside the pill chip. Right angles are a hard rule.
- Don't add a second accent color, a third UI surface, or a fourth font. The palette and stack are deliberately narrow.
- Don't nest panels or stack cards inside cards. Hairline rules separate; they do not stack.
