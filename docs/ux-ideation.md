# UX Ideation: Preset-First vs Customize-First Mode

## Problem

Beginners want guidance (presets) but power users want direct controls.
Currently all sections lead with presets which is good for beginners but adds friction for power users.

## Solution

A text-based segmented control in the left panel header — `[ Presets | Customize ]` — persisted in `localStorage` as `"design-section-mode"`.

## Defaults

- **New users:** `preset` (no localStorage key)
- **After first switch:** user's preference persists

## Per-Section Behavior

### Color

| # | Preset-first | Customize-first |
|---|---|---|
| 1 | Popular Colors | Base Color |
| 2 | Base Color | Core Palette |
| 3 | Harmony (6 visible) | Neutrals |
| 4 | Core Palette | State Colors |
| 5 | Neutrals | Harmony (collapsed) |
| 6 | State Colors | Popular Colors (collapsed) |
| 7 | Color Space (collapsed) | Color Space (collapsed) |

### Typography

| # | Preset-first | Customize-first |
|---|---|---|
| 1 | Smart Pairings (6 visible) | Slot selectors (always visible) |
| 2 | Customize Slots (collapsed) | Smart Pairings (collapsed) |

### Shape

| # | Preset-first | Customize-first |
|---|---|---|
| 1 | Shape Presets (4 visible) | Per-component controls (expanded) |
| 2 | Per-component controls (collapsed) | Shape Presets (collapsed) |

## Files to Touch

- `left-panel.tsx`
- `color-section.tsx`
- `font-section.tsx`
- `shape-section.tsx`

## Implementation Notes

- Each section component receives a `mode: "preset" | "customize"` prop
- Content blocks within each section are reordered or toggled via conditional rendering
- No new controls, no removed controls — only hierarchy changes

## Related Concepts

- Split view (light/dark side-by-side) should only appear when the left panel is collapsed
- Fullscreen preview mode collapses left panel to 52px
- All inspection mode opens a dedicated inspection overlay
