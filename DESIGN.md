# Current Design System

This document describes the existing visual design as implemented in `style.css`, `mediaqueries.css`, and the HTML pages.

---

## Brand Colors

| Name | Value | Usage |
|---|---|---|
| Cream | `#F5F1E8` | Page background, main wrapper |
| Beige | `#EDE9DF` | Alternate section backgrounds (skills, education) |
| Sage Green | `#9CAF88` | Navigation bar, footer |
| Blue | `#185FA5` | Hero headings, links, accent elements, focus rings |
| Dark Blue | `#26428b` | Skill icons, timeline dots, photo borders, some buttons/headings |
| Near Black | `#1A1A1A` | Nav text, button bg (send), strong text |
| Text Gray | `rgb(85, 85, 85)` | Body text, list items |
| Text Muted | `rgb(120, 120, 120)` | Secondary text, role titles, dates |
| Label Gray | `#999999` | Form labels, info labels |
| White | `#FFFFFF` | Card backgrounds |
| Red (error) | `#d32f2f` | Invalid form input borders |

## Typography

| Element | Font | Notes |
|---|---|---|
| Body / Nav / Buttons / Headings (h2-h6) | `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif` | System font stack |
| Hero name (h1) | `Georgia, serif` | Italic, `#185FA5`, 4rem desktop / 2.75rem mobile |
| Labels / Code / Dates | `ui-monospace, "SF Mono", Menlo, monospace` | Monospace stack |
| Body text (p, li) | Monospace stack | 0.9375rem, `rgb(85, 85, 85)` |
| Section titles (.title) | Monospace stack | 1.5rem, uppercase, 0.1em tracking |
| Hero label | Monospace stack | 0.75rem, uppercase, 0.2em tracking, `#185FA5` |
| Company name (.name1) | System stack | Bold, `#26428b` |
| Role (.name2) | System stack | Italic, `rgb(120, 120, 120)` |
| Footer text | System stack | 14px, 500 weight, `#1A1A1A` |

**Loaded Google Fonts:** Source Code Pro (200–900), Oswald (200–700)

## Layout

- **Max-width:** 2560px, min-width: 320px, centered
- **Nav:** Sticky, 70px height, `#9CAF88`
- **Sections:** 5rem 5% padding
- **Footer:** `#9CAF88`, centered text, 1.25rem 2rem padding

## Components

### Navigation
- Desktop (`#desktop-nav`): Logo left, links right with 2rem gap
- Mobile (`#hamburger-nav`): Shown at ≤1024px. Hamburger icon (3 lines → X when open). Menu slides in from left (100vw, top 70px, `#9CAF88` bg)
- Active page link: 4px dot below via `::after`
- Logo hover: opacity 0.65, translateY(-1px)
- Link hover: opacity 0.6 (desktop), background shift (mobile)

### Hero (Home)
- Centered, min-height 86vh
- Label fades down → name letters stagger in → tagline fades up → buttons scale in

### Hero (Lab)
- Left-aligned, neural links canvas background
- Dark blue content box (`#26428b`) with white text, rounded 12px, backdrop blur
- Label blurs in → heading fades up → underline draws → tagline fades up → card fades up

### Hero (Contact)
- Two-column: photo + text left, form card right
- Photo zooms out → label fades down → heading bounces in → tagline fades up → info items slide in
- Photo: 240px circle, `#26428b` border, shadow, hover scale(1.03)

### Skill Cards (Profile)
- 3-column grid (2-col ≤1024px, 1-col ≤700px)
- White card, rounded 12px, shadow, text-center
- Hover: translateY(-8px), shadow intensifies. Icon appears from above, list slides down, title repositions
- List items: `→` prefix in `#26428b`

### Timeline (Profile)
- Left border line, dot markers (12px, `#26428b`, white border, outer shadow)
- Current role dot pulses. All dots scale on hover
- Sections: Skills on `#EDE9DF`, Experience + Education on default cream

### Contact Form
- White card, rounded 20px, padding 3rem, 480px width
- Inputs: `#F5F1E8` bg, rounded 12px, monospace text
- Floating labels transition from center to top on focus/fill
- Send button: full-width, `#1A1A1A`, hover lift + shimmer, icon shifts on hover

### Back-to-Top
- 44px circle, `#26428b`, fixed bottom-right
- Hidden by default, visible after 300px scroll

### Project Card (Lab)
- 2-column grid (info + widget preview)
- Tech pills: blue tint bg, border, rounded pill
- Hover: slight lift, pill stagger scale
- Mini chat widget: white card with gradient header, green pulsing dot, monospace messages

## Breakpoints

| Max-Width | Changes |
|---|---|
| 2560px | `html` font-size: 1.75rem |
| 1920px | `html` font-size: 1rem |
| 1024px | Hide desktop nav, show hamburger; skills 2-col; contact photo 200px |
| 700px | `html` font-size: 0.875rem; hero name 2.75rem; buttons stack; contact stacks vertically; skills 1-col |

## Animation Timing

All entrance animations use `cubic-bezier(0.16, 1, 0.3, 1)` easing. Reduced motion media query disables all animations.

## Icons

Currently uses **Font Awesome 6.5** via CDN. Free/regular/brand sets used for:
- Navigation icons, social links, contact info icons, back-to-top chevron, lab buttons, chat avatar

## Images

- `/assets/profile-pic.jpg` — Profile photo, circular crop
- `/assets/profile-pic.png` — Same photo, PNG format
