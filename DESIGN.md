# Aliya Koy Portfolio Design System

This document is the source of truth for the public portfolio at `/`, `/profile`, `/lab`, and `/contact`. The Chat Workspace (`/chat`) and Design Studio (`/design-system`) routes share the semantic tokens and accessibility baseline, but keep their own application-oriented product tool shells.

## Direction: Ethereal Monolith

The portfolio should feel quietly commanding: a serene, editorial product space with the confidence of a senior product and AI leader. The visual language is inspired by premium product storytelling, highlighted by the Liquid Glass design language, native system typography, and monospaced signature labels.

The memorable qualities are:

- Whitespace acts as the architecture.
- Typography carries the visual weight.
- Liquid Glass panes refract environmental backgrounds with specular top edges and subtle shimmer.
- Thin rules and a precise grid create rhythm.
- Light and dark modes are distinct identities (The Gallery vs The Studio), not a brightness filter.
- Motion clarifies hierarchy and state without delaying content.

## Product intent

The site introduces Aliya Koy as a Senior Digital Product Owner and AI Lead in Phnom Penh, demonstrates her ability to direct AI, debug output, and ship usable software, shows selected work, and moves relevant visitors toward a conversation.

Primary audiences are recruiters, hiring managers, product leaders, engineering leaders, and potential collaborators. No login or admin workflow is required; portfolio content is static.

## Core journeys

1. **Home** communicates positioning via a 2-column grid featuring the typewriter CodeEditor, WebGL Aurora background, and CTAs.
2. **Profile** explains Aliya's working method and relevant experience.
3. **Lab** presents shipped and in-progress projects with outcomes, capabilities, and interactive previews.
4. **Contact** offers a calm, validated message form and a direct email route.
5. **Theme toggle** switches between light and dark modes and persists the choice.

## Design principles

1. **Whitespace is structure.** Large pauses separate ideas and create authority.
2. **Type is the hero.** Major statements lead; decoration remains secondary.
3. **Restraint over ornament.** Use Liquid Glass for functional containers rather than decorative clutter.
4. **Quietly technical.** Monospaced labels, numbers, dates, and typewriter code snippets add precision.
5. **Demonstrate, do not merely claim.** Interactive product tools and code snippets explain decisions and results.
6. **Accessible by default.** Contrast, keyboard use, focus, touch targets, reflow, and reduced motion are design requirements.
7. **Responsive composition.** Mobile is intentionally recomposed rather than compressed desktop.

## Technical boundaries

- React 19, TypeScript, Vite, and React Router.
- Tailwind CSS v4 with CSS-first semantic tokens in `src/index.css`.
- shadcn components built on Radix/Base UI primitives.
- WebGL background rendering powered by `ogl` library (`Aurora` component).
- Framer Motion for coordinated reveals, shared-layout navigation, and typewriter physics.
- `@phosphor-icons/react` for every interface icon.

Use semantic tokens before raw palette values. Structural backgrounds, foregrounds, borders, and states must adapt through tokens; do not duplicate them with `dark:` fill overrides.

## Colour protocol

### Light mode: The Gallery

| Token | Value | Role |
| --- | --- | --- |
| `background` | `#F0EDE6` | Warm linen page canvas |
| `foreground` | `#1A1C1A` | Primary text and icons |
| `primary` | `#2B5EA7` | Cobalt CTA, link, focus, and label |
| `primary-foreground` | `#FFFFFF` | Content on cobalt |
| `surface` | `rgba(240, 237, 230, 0.72)` | Frosted navigation |
| `accent` | `#4D5F4A` | Laurel active navigation and selected emphasis |
| `accent-foreground` | `#F0EDE6` | Content on laurel |
| `muted-foreground` | `#5A5F55` | Supporting copy and metadata |
| `border` | `#D8D4CA` | Hairlines and field rules |
| `card` | `#E8E7E1` | Quiet project visual surface |
| `tool-panel` | `#FAFCFC` | Tool workspace pane background |

### Dark mode: The Studio

| Token | Value | Role |
| --- | --- | --- |
| `background` | `#111A12` | Deep forest page canvas |
| `foreground` | `#F0EDE6` | Warm linen primary text |
| `primary` | `#4A88E0` | Brightened cobalt CTA, link, focus, and label |
| `primary-foreground` | `#FFFFFF` | Content on cobalt |
| `surface` | `rgba(17, 26, 18, 0.76)` | Frosted navigation |
| `accent` | `#8AA687` | Moss active navigation and selected emphasis |
| `accent-foreground` | `#111A12` | Content on moss |
| `muted-foreground` | `#9CAE9A` | Supporting copy and metadata |
| `border` | `#2A332A` | Hairlines and field rules |
| `card` | `#202A21` | Quiet project visual surface |
| `tool-panel` | `#15191B` | Tool workspace pane background |

### The flip rule

Warm linen moves from the light canvas to the dark foreground. Laurel moves from light-mode selection to the dark identity. Cobalt remains the action colour and becomes brighter in dark mode. Theme surfaces feel related without being mathematical inverses.

## Liquid Glass System

The **Liquid Glass** language provides tactile depth to application shells, chat panels, and floating hero elements (`.rag-glass-shell`, `.studio-glass-shell`).

### Glass Physics & Styling
- **Refraction & Blur**: `backdrop-filter: blur(52px) saturate(1.6) brightness(1.05)`.
- **Specular Top Edge**: `inset 0 1px 0 0 rgba(255, 255, 255, 0.38)` in light mode, `rgba(255, 255, 255, 0.18)` in dark mode.
- **Edge Shimmer**: `@keyframes liquid-glass-shimmer` 8s infinite loop creating a subtle specular highlight across the border ring.
- **Frosted Translucency**:
  - Light mode: Translucent white radial & linear gradients over `tool-panel`.
  - Dark mode: Soft white translucent gradients (`rgba(255, 255, 255, 0.04 - 0.06)`) that refract the underlying WebGL `Aurora` or background asset without being overly harsh.

## Background Presets

Environmental background layers add atmospheric depth under glass shells:
- `aurora`: WebGL multi-octave FBM noise shader with dynamic color swirling (`#4A88E0`, `#4D5F4A`, `#111A12`), zero-GC memory optimization, and resolution safety guards (used on Home hero dark mode).
- `mist`: Soft blurred mist texture (used on Home hero light mode).
- `pink-blossoms`: Botanical atmosphere for Chat Workspace and Design Studio.
- `hydrangea` & `blue-flower`: Atmospheric backdrops for Lab project previews.

## Typography physics

The typography stack relies on **native system font stacks** for instant 0ms rendering performance while preserving editorial polish.

| Role | Family | Use |
| --- | --- | --- |
| Display | `Plus Jakarta Sans` | Hero statements, page titles, section headings, project titles |
| Body | `system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif` | Navigation, body copy, buttons, forms, and descriptions |
| Data / Mono | `ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace` | Signature labels, dates, status, code editor, numbers, and metadata |

### Fluid scale

| Element | Size | Weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| Home name | `clamp(5rem, 11vw, 9rem)` | 500 | 0.86 | `-0.07em` |
| Page display | `clamp(3.25rem, 8vw, 7rem)` | 500 | 0.98 | `-0.055em` |
| CTA display | `clamp(2.5rem, 5vw, 4.5rem)` | 500 | 1.04 | `-0.045em` |
| Section heading | `clamp(2.25rem, 4.5vw, 4.25rem)` | 500 | 1.06 | `-0.04em` |
| Card title | `1.375rem` to `2rem` | 500 | 1.2 | `-0.025em` |
| Body | `1rem` to `1.125rem` | 400 | 1.65 | normal |
| Signature label | `0.75rem` | 400 mono | 1 | `0.2em`, uppercase |
| Navigation | `0.875rem` | 500 | 1 | normal |

## Grid and spatial system

- Standard container: `max-w-6xl` (1152px), centred.
- Wide product tools: `max-w-7xl` or intentionally full-width.
- Mobile gutter: 24px; tablet/desktop gutter: 32px when space allows.
- Portfolio section padding: 80px mobile and approximately 128px desktop.
- Hero content clears floating navigation with at least 128px of top space.

### Desktop grid

- **Home Hero**: 2-Column Responsive Grid (`grid lg:grid-cols-2 gap-12 lg:gap-8 items-center`). Left column houses text/buttons; right column houses the Liquid Glass `CodeEditor`.
- **Profile hero**: content spans 8 columns; metadata spans 4.
- **Experience**: period spans 3 columns; content spans 9.
- **Capability rows**: three equal columns separated by hairlines.
- **Lab**: two equal project columns (`RagPreview` and `StudioPreview`).
- **Footer**: three-column brand, navigation, and process grid.

## Component specifications

### Portfolio shell

Includes skip link, floating navigation, main landmark, scroll progress bar, footer, and back-to-top control. `/chat` and `/design-system` use isolated product tool shells without the portfolio navigation or footer.

### Frosted command bar

- Fixed near top and centred.
- Pill shape with a 1px semantic border and backdrop blur.
- Transparent/frosted at top; increases opacity after scrolling.
- Order: wordmark, divider, page links, divider, theme toggle.
- Active page uses Framer Motion shared-layout pill in `accent`.

### Home Hero Code Editor (`CodeEditor`)

- Floating Liquid Glass pane embedded in the 2-column hero grid.
- Features macOS traffic lights (●●●), filename header, line numbers, and token syntax highlighting.
- Uses `useTypewriter` hook cycling through chill personality snippets (`aliya.ts`, `workflow.ts`, `offline.yaml`).
- Stacks gracefully on tablet (`md:block`) and hides on small mobile screens to keep hero copy accessible.

### Section label

The brand signature is `// LABEL` followed by an optional short hairline. Always cobalt, monospaced, uppercase, and widely tracked.

### Buttons

- Primary: cobalt fill, white text, full pill, 44px high.
- Secondary: transparent canvas, semantic border, full pill.
- Hover gently lifts; pressed state returns toward canvas.

### Capability grid

- Flat canvas with vertical desktop dividers.
- Number in cobalt mono, then title, then supporting copy.

### Project cards & previews

- `RagPreview` and `StudioPreview` render interactive preview windows using semantic `bg-card` and `text-card-foreground` tokens that adapt seamlessly to light and dark modes.
- Visuals use CSS/SVG abstractions, frosted glass, and soft internal light; no generic stock images.

### Contact form

- Semantic form with bottom-rule input styling; focus animates a cobalt underline.
- Direct email fallback remains visible.

## Product tool principles

`/chat` and `/design-system` are product workspaces, inheriting semantic colours and accessibility while utilizing denser application layouts.

- Use direct, short names: `Chat`, `Support Inbox`, `Knowledge Base`, `Design Studio`.
- Floating glass shells separate panes cleanly over background presets (`pink-blossoms`).
- Chat Endpoint contract lives in `api/chat.js` requiring `GOOGLE_API_KEY`.

## Motion protocol

- Page transition: opacity only, 500ms.
- Section reveal: opacity plus 24px vertical travel, 700ms, ease `[0.22, 1, 0.36, 1]`.
- Navigation active pill: shared-layout spring (stiffness 380, damping 30).
- Typewriter code editor: 45ms typing speed, 18ms deletion speed, 2500ms pause.
- Reduced motion removes travel, scale, and looping while preserving state changes.

## Accessibility baseline

- WCAG 2.2 AA contrast compliance.
- Visible `focus-visible` ring on every interactive element.
- Minimum 44×44px touch targets for isolated controls.
- One `<h1>` per page and correct landmark hierarchy.
- Respect `prefers-reduced-motion`.
