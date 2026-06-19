# Design System

This document describes the current visual design as implemented in the React 19 + shadcn + Tailwind v4 codebase. It serves as a strict ruleset for UI generation.

---

## Stack

- **Framework**: React 19 + TypeScript 6 + Vite 8
- **UI Components**: shadcn (Base UI primitives core)
- **Styling**: Tailwind CSS v4 + `tw-animate-css`
- **Icons**: `@phosphor-icons/react` universally
- **Theme**: `next-themes` with `class` strategy (`class="dark"` on `<html>`)
- **Animation**: Framer Motion (page transitions, messages), CSS transitions (micro-interactions)

---

## Color Token Mapping (Tailwind v4 CSS @theme)

These tokens are mapped to Tailwind v4 theme variables in your global CSS. When writing UI components, **do not write raw hex codes or inline styles.** Use the mapped Tailwind utility classes.

Because the values change dynamically when `html` has the `.dark` class, **NEVER use `dark:` modifiers for background/foreground fills.** The tokens handle adaptations automatically.

| Token Base               | Light Mode Value         | Dark Mode Value           | Compiled Tailwind v4 Class          |
| ------------------------ | ------------------------ | ------------------------- | ----------------------------------- |
| `--background`           | `#FCFCF9` (Flat Sand)    | `#0A0A0A` (Obsidian)      | `bg-background` / `text-background` |
| `--foreground`           | `#1A1A1A` (Charcoal)     | `#F3F4F6` (Near-white)    | `text-foreground` / `bg-foreground` |
| `--card`                 | `#FFFFFF`                | `#18181A`                 | `bg-card`                           |
| `--card-foreground`      | `#1A1A1A`                | `#F3F4F6`                 | `text-card-foreground`              |
| `--primary`              | `#185FA5` (Classic Blue) | `#A3B18A` (Electric Sage) | `bg-primary` / `text-primary`       |
| `--primary-foreground`   | `#FFFFFF`                | `#0F172A`                 | `text-primary-foreground`           |
| `--secondary`            | `#E6DECF` (Muted Beige)  | `#161618`                 | `bg-secondary` / `text-secondary`   |
| `--secondary-foreground` | `#1A1A1A`                | `#F3F4F6`                 | `text-secondary-foreground`         |
| `--muted`                | `#E6DECF`                | `#161618`                 | `bg-muted`                          |
| `--muted-foreground`     | `#787878`                | `#6B7280`                 | `text-muted-foreground`             |
| `--accent`               | `#E6DECF`                | `#161618`                 | `bg-accent`                         |
| `--border`               | `rgba(0,0,0,0.08)`       | `rgba(255,255,255,0.06)`  | `border-border`                     |
| `--ring`                 | `#185FA5`                | `#A3B18A`                 | `ring-ring`                         |
| `--surface`              | `#9CAF88` (Sage Navbar)  | `rgba(11,17,32,0.85)`     | `bg-surface`                        |

---

## Typography Hierarchy

| Font Family      | CSS Variable     | Intended Application & Classes                                                |
| ---------------- | ---------------- | ----------------------------------------------------------------------------- |
| `Archivo Narrow` | `--font-display` | Hero names, display headings (`font-display tracking-tight`)                  |
| `Inter`          | `--font-sans`    | Body text blocks, forms, paragraphs, navigation (`font-sans leading-relaxed`) |
| `JetBrains Mono` | `--font-mono`    | Data labels, dates, code blocks, chatbot indicators (`font-mono text-xs`)     |

_Constraint Rule:_ Standard structural copy (`<p>`, description strings, list details) must use `font-sans`. Use `font-mono` strictly for technical details, timeline tags, metadata labels, and micro-copy.

---

## Component Blueprints (Strict Code Formulas)

### 1. Navbar (Pill Container)

- **Structure:** Absolute fixed pill layout centered at the top of the viewport.
- **Tailwind Formula:** `fixed top-3 left-1/2 -translate-x-1/2 z-50 h-12 w-full max-w-7xl px-4 bg-surface rounded-full shadow-sm flex items-center justify-between`
- **Inner items:** Links use `text-foreground/60 hover:text-foreground transition-colors`. Mode toggle is a shadcn outline icon button.

### 2. Card Layout & Shadows

- **Structure:** Elements must use relative containers to contain the card glow layer.
- **Tailwind Formula:** `relative rounded-xl border border-border bg-card p-6 shadow-sm overflow-hidden`
- **Glow Effect Implementation:** Append a `::before` pseudo-element via Tailwind arbitrary/pseudo selectors or custom CSS module to handle top-glow transparency.
  - Light mode glow background: `radial-gradient(ellipse at 50% 0%, rgba(255, 235, 200, 0.65) 0%, rgba(255, 240, 225, 0.3) 40%, transparent 80%)`
  - Dark mode glow background: `radial-gradient(ellipse at 50% 0%, rgba(163, 177, 138, 0.04), transparent 70%)`

### 3. Timeline Component

- **Structure:** Vertical timeline layout with left-hand alignment lines.
- **Tailwind Formula:** Left container vertical rules: `relative pl-6 border-l-2 border-border`.
- **Dot Marker Formula:** `absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-primary`
- **Active state marker:** Append `animate-ping absolute inset-0 rounded-full bg-primary/40` on the marker wrapper.
- **Icons:** Date indicator must strictly use `CalendarBlank` imported from `@phosphor-icons/react`.

### 4. Contact Form Layout

- **Structure:** Non-symmetrical responsive two-column grid layout.
- **Tailwind Formula:** `grid grid-cols-1 md:grid-cols-12 gap-8 items-start`
  - Left column (Info block): `md:col-span-5 flex flex-col gap-4`
  - Right column (Form wrapper inside a Card): `md:col-span-7 flex flex-col gap-4`
- Inputs use custom `<FloatingLabelInput>` wrappers with cream background in light mode (`bg-background`).

### 5. RAG Chatbot Layout

- **Structure:** Full page dashboard height configuration split layout.
- **Tailwind Formula:** `flex flex-col md:flex-row h-[calc(100vh-5rem)] w-full gap-6`
  - Sidebar Dashboard (Left): `w-full md:w-[360px] flex-shrink-0 flex flex-col border border-border rounded-xl p-4 bg-card`
  - Chat Area (Right): `flex-1 flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden`

---

## Global Structural Layout Rules

- **Global Container Constraint:** All page assemblies wrapper containers must enforce a strict alignment threshold: `max-w-7xl mx-auto px-6 w-full`.
- **Spacing Steps:** Standardize layouts to use `space-y-12` or `gap-12` between major logical layout pages, and `gap-4` inside internal component nodes.
- **Global Divider Rule:** Do not add arbitrary divider components. Rely on standard native baseline layout structures: `section + section { border-top: 1px solid var(--border); }` which triggers automatically in standard layout assemblies.
