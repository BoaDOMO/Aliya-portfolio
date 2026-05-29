# VIBE UI

A browser-based theme generator for vibe coding. Generates framework-agnostic visual identities (colors, typography, spacing, radius, shadows) that developers explore through curated randomization and export to their stack — shadcn/ui, daisyUI, Tailwind, plain CSS, or a DESIGN.md that any AI coding agent can consume.

## Theme Generation

- Auto-generate a complete theme on page load
- Randomize All generates a new complete theme
- Randomize individual dimensions: Colors, Fonts, Spacing, Radius, Shadows
- All randomization uses curated pools, not pure random

## Theme Locking

- Lock toggle per dimension (colors, fonts, spacing, radius, shadows)
- Locked dimensions are excluded from randomization
- Visual lock/unlock indicator

## Visual Controls

- Font family dropdown
- Font pairing dropdown (heading + body)
- Sliders: border radius, spacing density, shadow softness, color energy, contrast
- All sliders update the preview in real-time

## Aesthetic Presets

- Preset selector with 10+ aesthetic directions
- Presets include: brutalist, soft SaaS, swiss minimal, glassmorphism, cyberpunk, monochrome luxury, retro, terminal hacker, japanese minimal, claymorphism

## Live Preview

- Shows UI components rendered with the current theme
- Components: buttons, cards, forms, typography, navigation, modal, table, alerts
- Read-only, real-time updates, light/dark toggle

## Export

- DESIGN.md (universal, AI-readable)
- Generic CSS custom properties
- Tailwind v4 config
- shadcn/ui globals.css
- daisyUI theme block
- JSON tokens (W3C DTCG)
- AI prompt context
- Copy-to-clipboard and download-as-file for each format

## Persistence

- localStorage save/restore
- Reset button
- Shareable URL via hash

## Design Constraints

- Minimal chrome, monochromatic shell
- Dark-first
- Flat tool UI (no shadows on chrome)
- Typography-led
