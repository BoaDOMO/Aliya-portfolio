# CRITICAL RULES - MUST FOLLOW

## RESPONSES

- Keep responses concise and to the point - unless the user asks otherwise

## PLANNING MODE

- Always ask clarifying questions
- Never assume design, tech stack or features
- Always search the web for current best practices before recommending approaches
- If a task matches an available skill, recommend loading it for user approval

## CHANGE / EDIT MODE

- Implement features directly — no pipeline delegation
- Verify changes work before presenting to the user

## UI DESIGN

- Always follow the UI design system when creating or reviewing components or pages.
- Design System: @DESIGN.md

## PROJECT STRUCTURE

- Please refer to @README.md

## Session Log

### 2026-05-31 — Contact page, design polish, shared components

**Done:**
- Contact page built: two-column layout, left (heading + tagline + Phone/Email/LinkedIn), right (tall form Card, Formspree POST with loading/success/error states, flex chain so textarea stretches & button sits at bottom)
- Shared components extracted from Profile.tsx → `src/components/fade-in-when-visible.tsx`, `section-label.tsx`
- SectionLabel gained optional `className` prop
- Light mode backgrounds standardized: all flat white (`bg-card`, `bg-popover`, `bg-background`) → `bg-white/85 dark:bg-card/90` across Dashboard, ChatArea, MiniChat, Card base, Sheet, Dialog, NavMenu dropdown, Contact wrapper
- Warm peach ambient glow added to light mode body (then halved opacity + background chroma reduced from 0.015 → 0.005 to fix "too peachy")
- `--muted-foreground` darkened from `oklch(0.54 0 0)` → `oklch(0.50 0 0)` — passes WCAG AA (4.57:1) on muted backgrounds
- Alt section backgrounds on Profile: `bg-muted/30` on Skills & Education
- Profile card backgrounds: `bg-amber-50/80` → `bg-white/85` (milky white)
- Profile accordion items: `dark:bg-card/90` for consistent obsidian in dark mode
- Contrast ratio audit passed (all combinations ≥4.5:1 AA)
- Profile pic copied to `public/assets/profile-pic.jpg`

**Next session:**
- Adopt legacy art styles: colors (beige/cream/green/blue from `legacy/style.css`), drop shadows, decorative elements — the current layout is good but the old one looks better visually
