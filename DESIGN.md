# Design System

This document defines the design intent for Aliya Koy's portfolio and product lab. It is a living guide, not a collection of immutable Tailwind recipes. When a rule conflicts with usability, accessibility, or the needs of a specific product surface, preserve the principle and adapt the implementation.

## Brand premise

The site should feel like a **product builder's field notebook**: editorial, technically precise, warm, and quietly experimental. It needs enough restraint and clarity for senior product and AI work, while the interactive tools demonstrate curiosity and hands-on craft.

The memorable idea is not a visual effect. It is the combination of clear product thinking and working experiments.

## Audience

- Product, AI, and engineering leaders evaluating Aliya's work
- Collaborators looking for a pragmatic builder
- Curious visitors exploring the Lab and its tools

## Design principles

1. **Content before decoration.** Visual treatments must improve hierarchy, comprehension, or feedback.
2. **Editorial clarity.** Use strong display type, readable measures, deliberate whitespace, and scannable structure.
3. **Quietly technical.** Mono labels and visible system states create precision; terminal tropes do not need to appear everywhere.
4. **Warm confidence.** Neutral surfaces with controlled blue or sage accents should feel human without becoming soft or ornamental.
5. **Demonstrate, don't merely claim.** Working tools, decisions, and outcomes carry more weight than long skill lists.
6. **Accessible by default.** Keyboard use, contrast, touch targets, reduced motion, and reflow are part of the design.
7. **Responsive composition.** Mobile may change content order and interaction patterns; it is not a compressed desktop.

## Stack and implementation boundaries

- React 19 + TypeScript + Vite
- Tailwind CSS v4 with CSS-first tokens
- shadcn components built on Base UI primitives
- next-themes with the `class` strategy
- Framer Motion for orchestrated motion; CSS transitions for local feedback
- `@phosphor-icons/react` for interface icons

Use semantic tokens before raw palette values. Theme-specific utilities are acceptable for decorative effects, but semantic foregrounds, backgrounds, borders, and states must not be duplicated with `dark:` overrides.

## Accessibility baseline

- Meet WCAG 2.2 AA contrast and interaction requirements.
- Every interactive element needs a visible `focus-visible` state.
- Pointer targets should be at least 24×24 CSS pixels; prefer 44×44 for isolated controls.
- Do not hide essential information behind hover.
- Support keyboard operation for menus, disclosures, dialogs, and forms.
- Provide a skip link and ensure the fixed header does not obscure focused content.
- Respect `prefers-reduced-motion` in CSS and Framer Motion.
- Support reflow at 320px and text zoom to 200% without loss of content.
- Dynamic success, loading, and error messages must be announced to assistive technology.

## Color system

### Core semantic roles

| Role | Purpose |
| --- | --- |
| `background` | Main page canvas |
| `foreground` | Primary text and icons |
| `card` | Contained content surfaces |
| `card-foreground` | Content on cards |
| `surface` | Navigation and persistent chrome |
| `surface-raised` | Standard cards and contained content |
| `surface-featured` | Featured cards, inputs, and dialogs |
| `primary` | Principal actions and emphasis |
| `primary-foreground` | Content on primary fills |
| `secondary` | Supporting controls and tags |
| `muted` | Grouped or subdued regions |
| `muted-foreground` | Supporting copy and metadata |
| `accent` | Hover and selected surfaces |
| `border` | Default boundaries |
| `border-strong` | Featured surfaces and emphasized boundaries |
| `ring` | Focus indication |
| `success`, `warning`, `destructive`, `info` | System feedback |

The warm sand, classic blue, and sage palette is the brand anchor. Light and dark modes may express it differently; they do not need to be mathematical inverses.

The light theme uses a tone-on-tone surface ladder instead of pure-white cards on beige bands:

| Layer | Value |
| --- | --- |
| Canvas | `#F4F0E7` |
| Muted grouping | `#EAE3D7` |
| Raised surface | `#FAF8F3` |
| Featured/input surface | `#FFFDF8` |

Pure white is not a default card color. Hierarchy should come from warm tonal shifts, stronger borders, spacing, and selective elevation.

### Usage rules

- Use `bg-background`, `bg-card`, `text-foreground`, and related semantic utilities for structural UI.
- Use opacity carefully; verify the resulting contrast rather than assuming the base token remains accessible.
- Reserve gradients, glows, and translucent surfaces for featured moments.
- A normal card should not combine glow, blur, transparency, shadow, and motion at once.
- Avoid using color as the only indication of selection, error, or status.

## Typography

| Role | Family | Use |
| --- | --- | --- |
| Display | Archivo Narrow | Page titles, major statements, prominent card headings |
| Body | Inter | Prose, navigation, forms, controls, descriptions |
| Data | JetBrains Mono | Dates, technical labels, status, tags, code, metadata |

Inter is intentionally retained as the body family for readability and continuity. Character comes from Archivo Narrow, composition, and voice—not by forcing a decorative face into prose.

### Type rules

- Keep body copy between 55 and 75 characters per line where practical.
- Avoid body text below 14px. Sizes from 10–12px are for genuinely secondary metadata.
- Mono communicates data or system behavior; it is not a general-purpose substitute for body copy.
- Use sentence case for normal content. Reserve uppercase and wide tracking for short labels.
- Display headings should use tight tracking; paragraphs should use relaxed leading.

## Layout and responsive composition

Choose container width by content rather than applying one global maximum:

| Content | Recommended measure |
| --- | --- |
| Long-form/editorial copy | `max-w-2xl` to `max-w-3xl` |
| Standard portfolio pages | `max-w-6xl` |
| Product dashboards/tools | `max-w-7xl` or intentionally full width |
| Hero compositions | Chosen per composition |

Use `px-6` as the normal page gutter, reducing only when dense mobile tools require it. Align sections on the same page to a shared grid even when their internal measures differ.

### Spacing rhythm

- `gap-2` / `gap-3`: icons, labels, dense controls
- `gap-4`: normal component relationships
- `gap-6`: card padding and grouped content
- `gap-8`: component groups
- `gap-12`: major layout relationships
- `py-16` to `py-20`: major desktop sections, reduced appropriately on mobile

Spacing should communicate grouping. Avoid large empty areas that do not establish hierarchy.

## Shape, borders, and elevation

- Small controls: `rounded-md`
- Buttons and inputs: `rounded-lg`
- Cards and major panels: `rounded-xl`
- Pills: tags, statuses, and intentionally pill-shaped navigation only
- Default cards: semantic surface, border, and minimal shadow
- Featured cards: may add a glow, layered sheet, or stronger elevation—but only one dominant effect

Card glow is optional. It must never be applied automatically to every card.

## Motion and interaction

- Use one coordinated reveal sequence per page, then keep local interactions restrained.
- Local feedback should usually take 150–250ms.
- Large entrances should usually take 350–600ms.
- Animate opacity and transforms instead of layout properties.
- Hover may enhance an element, but must not reveal the only copy of important content.
- Avoid hover motion that causes nearby content to jump.
- Reduced-motion mode should remove travel, scale, parallax, and decorative looping while preserving state changes.

## Core components

### App shell

The shell includes a skip link, site header, main landmark, footer, and back-to-top control. The header may use the current floating pill treatment, but its layout is a component decision rather than a permanent system constraint.

### Navigation

- Active state must remain visible without relying on color alone.
- Menus and disclosures must work with keyboard and touch input.
- Mobile navigation targets should be comfortable and clearly labeled.
- The header should not cover anchors or focused content.

### Cards

Use explicit card purposes rather than styling every surface identically:

- **Content card:** ordinary grouped information
- **Project card:** project story, technologies, and action
- **Metric card:** concise quantitative information
- **Featured card:** selected decorative treatment
- **Tool panel:** dense product interface surface

### Forms

- Labels must remain visible when a field contains content.
- Inputs use the body typeface; validation and metadata may use mono.
- Error, loading, and success states must be visible and announced.
- Preserve user input after recoverable submission errors.

## Page composition

### Home

Communicate positioning quickly, establish credibility, and feature one memorable working artifact. Motion should never delay access to the main actions.

### Profile

Behave like an editorial résumé: scannable summary, visible capabilities, and a clear experience hierarchy. Older history may be progressively disclosed through an explicit control.

### Lab

Present projects as compact case studies: problem, contribution, approach, status, and outcome or learning. Interactive demos support the story rather than replacing it.

### Contact

Stay calm and conversion-focused. Use an asymmetric information/form composition when space allows and provide resilient submission feedback.

### Product tools

RAG and Design System pages may be denser and more utilitarian than the portfolio. They share tokens and interaction standards, not necessarily the same composition or decorative treatments.

### Design System Studio

- Use a dedicated full-screen application shell without the portfolio navbar, footer, or Back to Top control.
- Keep the primary inspector near 360px and allow it to collapse without hiding preview controls.
- Project-level actions—save state, history, quality, and export—belong in the app bar.
- Preview navigation, color mode, viewport, color-vision simulation, and Split view belong in the preview toolbar.
- Support desktop, tablet, and mobile preview widths.
- Organize tokens as foundation, semantic, and component decisions; light and dark are modes of the same system.
- Extended surface roles (`surface-raised`, `surface-featured`, and `border-strong`) must flow through generation, preview, quality checks, persistence, and export.
- JSON export should follow the stable DTCG format; tool-specific state belongs in a namespaced `$extensions` object.

## Exceptions

Exceptions are encouraged when they are intentional, documented in the component, accessible, and visually coherent with the brand. A repeated exception should become a new pattern or prompt a revision to this document.

## Visual QA checklist

- Review at 375px, 768px, and 1280px or wider.
- Review light and dark themes.
- Navigate the page using only the keyboard.
- Confirm focus is visible and not hidden under the header.
- Check hover, touch, loading, empty, success, and error states.
- Verify reduced motion.
- Check 200% text zoom and narrow reflow.
- Confirm headings, landmarks, labels, and accessible names.
- Run lint and the production build before shipping.
