# Aliya Koy Portfolio Design System

This document is the source of truth for the public portfolio at `/`, `/profile`, `/lab`, and `/contact`. The RAG and Design System Studio routes share the semantic tokens and accessibility baseline, but keep their own application-oriented layouts.

## Direction: Ethereal Monolith

The portfolio should feel quietly commanding: a serene, editorial product space with the confidence of a senior product and AI leader. The visual language is inspired by premium product storytelling, but it must remain recognisably Aliya through the linen, forest, cobalt, and monospaced signature-label system.

The memorable qualities are:

- Whitespace acts as the architecture.
- Typography carries the visual weight.
- Thin rules and a precise grid create rhythm.
- Light and dark modes are distinct identities, not a brightness filter.
- Motion clarifies hierarchy and state without delaying content.

## Product intent

The site introduces Aliya Koy as a Senior Digital Product Owner and AI Lead in Phnom Penh, demonstrates her ability to direct AI, debug output, and ship usable software, shows selected work, and moves relevant visitors toward a conversation.

Primary audiences are recruiters, hiring managers, product leaders, engineering leaders, and potential collaborators. No login or admin workflow is required; portfolio content is static.

## Core journeys

1. Home communicates the positioning and links to Lab or Profile.
2. Profile explains Aliya's working method and relevant experience.
3. Lab presents shipped and in-progress projects with outcomes and capabilities.
4. Contact offers a calm, validated message form and a direct email route.
5. The theme toggle switches between the Gallery and Studio palettes and persists the choice.

## Design principles

1. **Whitespace is structure.** Large pauses separate ideas and create authority.
2. **Type is the hero.** Major statements lead; decoration remains secondary.
3. **Restraint over ornament.** Avoid gratuitous shadows, gradients, badges, and effects.
4. **Quietly technical.** Monospaced labels, numbers, dates, and outcomes add precision.
5. **Demonstrate, do not merely claim.** Projects and experience explain decisions and results.
6. **Accessible by default.** Contrast, keyboard use, focus, touch targets, reflow, and reduced motion are design requirements.
7. **Responsive composition.** Mobile is intentionally recomposed rather than compressed desktop.

## Technical boundaries

- React 19, TypeScript, Vite, and React Router
- Tailwind CSS v4 with CSS-first semantic tokens in `src/index.css`
- shadcn components built on Base UI primitives where a primitive is useful
- The existing theme provider with a class-based light/dark strategy
- Framer Motion for coordinated reveals, shared-layout navigation, and restrained micro-interactions
- `@phosphor-icons/react` for every interface icon

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

### The flip rule

Warm linen moves from the light canvas to the dark foreground. Laurel moves from light-mode selection to the dark identity. Cobalt remains the action colour and becomes brighter in dark mode. Theme surfaces should feel related without being mathematical inverses.

### Usage rules

- Use `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, and related semantic utilities.
- Use cobalt for actions, links, signature labels, focus rings, and meaningful status—not large structural fills.
- Active navigation uses the sage `accent` role and includes a filled shape so selection is not communicated by colour alone.
- Default sections stay on the canvas. Separate them with hairlines and spacing instead of alternating bands.
- Do not stack blur, glow, transparency, gradient, shadow, and motion on one ordinary component.
- Do not use colour as the sole indicator of error, success, selection, or status.

## Typography physics

| Role | Family | Use |
| --- | --- | --- |
| Display | Plus Jakarta Sans | Hero statements, page titles, section headings, project titles |
| Body | Inter | Navigation, body copy, buttons, forms, and descriptions |
| Data | JetBrains Mono | Signature labels, dates, status, numbers, and metadata |

### Fluid scale

| Element | Size | Weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| Home name | `clamp(4.75rem, 12vw, 9rem)` | 500 | 0.88 | `-0.065em` |
| Page display | `clamp(3.25rem, 8vw, 7rem)` | 500 | 0.98 | `-0.055em` |
| CTA display | `clamp(2.5rem, 5vw, 4.5rem)` | 500 | 1.04 | `-0.045em` |
| Section heading | `clamp(2.25rem, 4.5vw, 4.25rem)` | 500 | 1.06 | `-0.04em` |
| Card title | `1.375rem` to `2rem` | 500 | 1.2 | `-0.025em` |
| Body | `1rem` to `1.125rem` | 400 | 1.65 | normal |
| Signature label | `0.75rem` | 400 mono | 1 | `0.2em`, uppercase |
| Navigation | `0.875rem` | 500 | 1 | normal |

Rules:

- Use balanced headings and pretty-wrapped paragraphs.
- Keep body measures around 55–70 characters.
- Avoid body copy below 14px; 10–12px is reserved for genuine metadata.
- Use sentence case for normal copy and wide uppercase only for short mono labels.
- Use tight display tracking and relaxed paragraph leading.

## Grid and spatial system

- Standard container: `max-w-6xl` (1152px), centred.
- Wide product tools: `max-w-7xl` or intentionally full-width.
- Mobile gutter: 24px; tablet/desktop gutter: 32px when space allows.
- Portfolio section padding: 80px mobile and approximately 128px desktop.
- Hero content clears the floating navigation with at least 128px of top space.
- Section transitions use a low-contrast one-pixel rule.

### Desktop grid

- Use a 12-column grid for asymmetric editorial compositions.
- Profile hero: content spans 8 columns; metadata spans 4.
- Experience: period spans 3 columns; content spans 9.
- Capability rows: three equal columns separated by hairlines.
- Lab: two equal project columns.
- Footer: brand, navigation, and location/process columns.

### Responsive behaviour

| Width | Behaviour |
| --- | --- |
| `< 768px` | Single column, compact floating header, horizontal nav overflow or accessible menu, stacked buttons, single-column résumé and project cards |
| `768–1023px` | Two-column project grid; profile hero remains predominantly single-column; capability grid may use three columns when readable |
| `>= 1024px` | Full 12-column editorial layouts and three-column footer |

The site must reflow at 320px and remain usable at 200% text zoom.

## Component specifications

### Portfolio shell

The shell includes a skip link, floating navigation, main landmark, scroll progress bar, footer, and back-to-top control. `/chat` and `/design-system` use isolated application shells without the portfolio navigation or footer.

### Frosted command bar

- Fixed near the top and centred.
- Pill shape with a one-pixel semantic border.
- Transparent/frosted at the top; increases opacity and subtle elevation after scrolling.
- Order: wordmark, divider, page links, divider, theme toggle.
- Active page uses a Framer Motion shared-layout pill in `accent`.
- Links and the theme toggle retain visible keyboard focus and 44px touch targets.
- Mobile may use a compact accessible Sheet when all links cannot fit without crowding.

### Section label

The brand signature is `// LABEL` followed by an optional short hairline. It is always cobalt, monospaced, uppercase, and widely tracked. A centred variant is used before CTA statements.

### Buttons

- Primary: cobalt fill, white text, full pill, approximately 44px high.
- Secondary: transparent canvas, semantic border, full pill.
- Arrows move only a few pixels on hover and do not shift surrounding layout.
- Hover may gently lift or brighten; pressed state returns toward the canvas.

### Capability grid

- Flat, borderless canvas with vertical desktop dividers.
- Number in cobalt mono, then title, then supporting copy.
- No icon is required; text hierarchy and spacing carry the section.

### Experience list

- Wide, calm rows with the period separate from the role and company.
- Current status uses a subtle cobalt-tinted mono pill.
- Selected experience includes concise outcome-led descriptions.
- Earlier experience remains visible as a compact list; it is not hidden by default.

### Project cards

- Each card contains a large quiet visual panel, a project index, outcome/status pill, category label, title, description, and capability tags.
- Visuals are CSS/SVG abstractions using frosted glass, circles, axes, and soft internal light; no stock imagery or generic AI icons.
- On hover, the panel lifts subtly and the title shifts to cobalt.
- Project cards must remain useful without hover.

### Contact form

- Native semantic form with visible labels and preserved validation messaging.
- Fields are borderless except for a bottom rule; focus animates a cobalt underline.
- Inputs use the body font and large comfortable text.
- Submission includes sending, success, and recoverable error states announced with `aria-live`.
- Direct email remains visible as a fallback.

### Footer

- Large, three-column information grid above a final copyright rule.
- Brand statement, page navigation, location, and process remain easy to scan.
- Footer links use muted text and shift to cobalt on hover/focus.

## Product tool principles

`/chat` and `/design-system` are product workspaces, not portfolio pages. They inherit the semantic colour system, typography roles, accessibility baseline, and atmospheric restraint, then use a denser application shell.

### Shell and surfaces

- Use the blurred botanical atmosphere as a quiet page layer; it must stay abstract behind the work surface.
- The global tool navigation is a centred, frosted pill with a hairline border, compact controls, and a clear active workspace label.
- Avoid a single heavy outer application container. Put the visual separation on the working panes: lightly frosted headers, white or near-white content surfaces, thin borders, and one soft shadow.
- Prefer a small number of intentionally separated floating panes over nested cards, boxed-in sections, or repeated decorative outlines.
- The canvas should feel spacious and calm. White carries the primary work area; linen and transparent surfaces frame it without competing for attention.

### Product clarity

- A screen should explain itself through its information hierarchy and familiar controls. Remove instructional copy, secondary headings, and labels that do not unlock an action.
- Use direct, short names: `Chat`, `Support Inbox`, and `Knowledge Base`.
- Icon-only controls are appropriate for familiar, repeated actions when each has an accessible label and a tooltip or title. Keep text for irreversible or ambiguous actions such as `Resolve`, `Reopen`, `Save`, and `Reset`.
- Show one focused knowledge-base editor, not a mock IDE, source catalogue, character counter, or multiple invented companies.

### Chat workspace patterns

- Customer messages are plain text aligned to the customer side. Bot replies use a quiet cobalt-tinted surface; live-agent replies use a distinct, quiet success-tinted surface. Do not add borders around message bubbles.
- Customer Chat and Support Inbox show the same conversation from their own roles. A human handoff appears in the inbox immediately, and resolving hands the conversation back to the bot with a clear event message.
- Customer Chat may show a typing indicator and character-by-character bot reveal. Support Inbox does not show a typing indicator; the customer can see `Support is typing…` only while the agent is actively composing.
- Composers are white, unobtrusive, and shadow-defined rather than framed by a second outer card. Send is a circular upward-arrow control.
- Refresh preserves the current browser session. `Reset` is the intentional fresh start.

### Responsive composition

- Desktop and tablet retain separate Chat and Support Inbox panes when the layout remains readable.
- Below the compact breakpoint, show one full-height pane at a time and centre the Chat and Inbox icon controls in the navigation. Preserve the wordmark and `Chat Workspace` label; do not silently remove them.
- Preserve minimum touch targets, avoid horizontal overflow, and let conversation areas scroll internally rather than extending the page.
- At 375px, 768px, and 1280px, validate navigation, pane switching, knowledge-base editing, handoff/resolution controls, and both composers.

## Motion protocol

- Page transition: opacity only, approximately 500ms.
- Section reveal: opacity plus 24px vertical travel, 700ms, ease `[0.22, 1, 0.36, 1]`.
- Stagger repeated items in roughly 80–120ms increments.
- Navigation active pill: shared-layout spring around stiffness 380, damping 30.
- Local hover/focus transitions: 150–250ms.
- Animate opacity and transforms, not layout properties.
- Reduced motion removes travel, scale, parallax, looping glow, and bouncing while preserving immediate state changes.

## Imagery guidance

Visuals should feel pristine, atmospheric, and quietly physical: frosted glass, brushed material, soft internal luminescence, circular targets, architectural macro forms, and heavily blurred environmental textures.

Use linen, sage, cobalt, pure light, and restrained blue/green atmospheric imagery. Environmental images may appear only as secondary background layers on the Home and Lab heroes, project previews, shared CTA, and Contact direct-email section; typography and content remain primary. Blur, veil, opacity, and grain must keep the image abstract rather than photographic.

Do not use text in images, human faces, stock-office scenes, computer-screen mockups, literal project screenshots as decoration, or generic AI-brain imagery. Avoid recognisable lifestyle, travel, or beauty imagery that changes the site's product-portfolio character.

## Accessibility baseline

- Meet WCAG 2.2 AA contrast and interaction requirements.
- Give every interactive element a visible `focus-visible` state.
- Prefer 44×44px isolated targets; never go below 24×24px.
- Do not hide essential information behind hover.
- Keep fixed chrome from covering focused elements or anchors.
- Respect `prefers-reduced-motion` in CSS and Framer Motion.
- Provide one `<h1>` per page and correct landmark/heading order.
- Keep labels visible when form fields contain content.
- Announce loading, success, and error messages.
- Validate light and dark modes independently.

## Visual QA checklist

- Review 375px, 768px, and 1280px or wider.
- Review the Home, Profile, Lab, and Contact pages in light and dark themes.
- Check the floating navigation at the page top and after scrolling.
- Navigate using keyboard only and verify focus is not obscured.
- Check hover, touch, validation, sending, success, and error states.
- Verify reduced motion and 200% text zoom.
- Confirm no horizontal overflow or clipped display copy.
- Run lint, the production build, and the development server before shipping.

## Exceptions

The Design System Studio and RAG assistant may be denser and more utilitarian than the public portfolio. They inherit semantic colours, type roles, accessibility, and interaction standards, but not the portfolio composition. Intentional exceptions should be local, documented, and promoted into this guide only when repeated.
