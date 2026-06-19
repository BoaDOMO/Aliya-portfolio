# shadcn/ui Reference

> Consolidated documentation from ui.shadcn.com/docs — stripped of navigation, footers, and UI chrome.  
> Covers: Installation (Vite), Components, Theming.

---

## 1. Installation (Vite)

**Source:** https://ui.shadcn.com/docs/installation/vite

Install and configure shadcn/ui for Vite.

### Option A: Use shadcn/create

Open [shadcn/create](https://ui.shadcn.com/create?template=vite) and build your preset visually, then copy the generated command:

```shell
pnpm dlx shadcn@latest init --preset [CODE] --template vite
```

Add the `Card` component:

```shell
pnpm dlx shadcn@latest add card
```

For monorepo:

```shell
pnpm dlx shadcn@latest add card -c apps/web
```

Usage:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          Track progress and recent activity for your Vite app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Your design system is ready. Start building your next component.
      </CardContent>
    </Card>
  )
}
```

### Option B: Use the CLI

Scaffold a new Vite project:

```shell
pnpm dlx shadcn@latest init -t vite
```

For monorepo:

```shell
pnpm dlx shadcn@latest init -t vite --monorepo
```

Add components:

```shell
pnpm dlx shadcn@latest add card
```

### Option C: Existing Project

**1. Create a Vite project** (if needed):

```shell
pnpm create vite@latest
```

**2. Add Tailwind CSS:**

```shell
pnpm add tailwindcss @tailwindcss/vite
```

Replace everything in `src/index.css`:

```css
@import "tailwindcss";
```

**3. Edit tsconfig.json:**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**4. Edit tsconfig.app.json:**

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

**5. Update vite.config.ts:**

```shell
pnpm add -D @types/node
```

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**6. Run the CLI:**

```shell
pnpm dlx shadcn@latest init
```

**7. Add components:**

```shell
pnpm dlx shadcn@latest add button
```

```tsx
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}
```

---

## 2. Components

**Source:** https://ui.shadcn.com/docs/components

The following components are available in the library:

- Accordion
- Alert
- Alert Dialog
- Aspect Ratio
- Avatar
- Badge
- Breadcrumb
- Button
- Button Group
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Collapsible
- Combobox
- Command
- Context Menu
- Data Table
- Date Picker
- Dialog
- Direction
- Drawer
- Dropdown Menu
- Empty
- Field
- Hover Card
- Input
- Input Group
- Input OTP
- Item
- Kbd
- Label
- Menubar
- Native Select
- Navigation Menu
- Pagination
- Popover
- Progress
- Radio Group
- Resizable
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Sonner
- Spinner
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toggle
- Toggle Group
- Tooltip
- Typography

Each component has its own page at `https://ui.shadcn.com/docs/components/radix/{component-name}`.

Additionally, community-maintained components are available in the [registry directory](https://ui.shadcn.com/docs/directory).

---

## 3. Theming

**Source:** https://ui.shadcn.com/docs/theming

Using CSS variables and theme tokens.

We use and recommend CSS variables for theming. This gives you semantic theme tokens like `background`, `foreground`, and `primary` that components use by default.

```tsx
<div className="bg-background text-foreground" />
```

To use CSS variables for theming, set `tailwind.cssVariables` to `true` in your `components.json`:

```json
{
  "style": "base-nova",
  "rsc": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

Tailwind maps these tokens into utilities like `bg-background`, `text-foreground`, `border-border`, and `ring-ring`.

Dark mode works by overriding the same tokens inside a `.dark` selector.

### Token Convention

Semantic background and foreground pairs. The base token controls the surface color and the `-foreground` token controls the text and icon color on that surface.

Given:

```css
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

```tsx
<div className="bg-primary text-primary-foreground">Hello</div>
```

### Theme Tokens

These tokens live in your CSS file under `:root` and `.dark`:

| Token | What it controls | Used by |
|---|---|---|
| `background` / `foreground` | Default app background and text color | Page shell, sections, default text |
| `card` / `card-foreground` | Elevated surfaces and content inside | `Card`, dashboard panels, settings panels |
| `popover` / `popover-foreground` | Floating surfaces and content inside | `Popover`, `DropdownMenu`, `ContextMenu` |
| `primary` / `primary-foreground` | High-emphasis actions and brand surfaces | Default `Button`, selected states, badges |
| `secondary` / `secondary-foreground` | Lower-emphasis filled actions | Secondary buttons, badges, supporting UI |
| `muted` / `muted-foreground` | Subtle surfaces and lower-emphasis content | Descriptions, placeholders, empty states |
| `accent` / `accent-foreground` | Interactive hover/focus/active surfaces | Ghost buttons, menu highlights, selected items |
| `destructive` | Destructive actions and error emphasis | Destructive buttons, invalid states |
| `border` | Default borders and separators | Cards, menus, tables, separators |
| `input` | Form control borders and input surface | `Input`, `Textarea`, `Select` |
| `ring` | Focus rings and outlines | Buttons, inputs, checkboxes, menus |
| `chart-1` … `chart-5` | Default chart palette | Charts and dashboard blocks |
| `sidebar` / `sidebar-foreground` | Base sidebar surface and text | `Sidebar` container and default content |
| `sidebar-primary` / `sidebar-primary-foreground` | High-emphasis sidebar actions | Active items, icon tiles, badges |
| `sidebar-accent` / `sidebar-accent-foreground` | Hover/selected sidebar states | Menu hover states, open items |
| `sidebar-border` | Sidebar-specific borders | Sidebar headers, groups, internal dividers |
| `sidebar-ring` | Sidebar-specific focus rings | Focused controls inside sidebar |
| `radius` | Base corner radius scale | Cards, inputs, buttons, popovers |

### Radius Scale

```css
@theme inline {
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

- `radius-lg` is the base value
- Smaller radii scale down from `--radius`
- Larger radii scale up from `--radius`
- Changing `--radius` updates the entire scale

### Adding New Tokens

Define under `:root` and `.dark`, then expose to Tailwind with `@theme inline`:

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

```tsx
<div className="bg-warning text-warning-foreground" />
```

### Base Colors

`tailwind.baseColor` controls the default token values. Available: **Neutral**, **Stone**, **Zinc**, **Mauve**, **Olive**, **Mist**, **Taupe**.

### Default Theme CSS (Neutral)

Full scaffold for `app/globals.css`:

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

### Without CSS Variables

```shell
pnpm dlx shadcn@latest init --no-css-variables
```

Sets `tailwind.cssVariables` to `false` in `components.json`:

```tsx
<div className="bg-zinc-950 text-zinc-50 dark:bg-white dark:text-zinc-950" />
```

This is an installation-time choice. To switch, delete and re-install components.
