# Migration Plan: Vanilla HTML/CSS → Vite + React 19 + Tailwind v4 + Shadcn/UI v4

## Goal

Replace the current vanilla HTML/CSS/JS (Tailwind v4 + PostCSS CLI) project with a modern
**Vite + React 19 + TypeScript + Tailwind CSS v4 + Shadcn/UI v4** stack. The old codebase
moves to a `legacy/` directory for reference. Only the **brand colors** and **font families**
carry over. Everything else follows Shadcn's native design system.

The legacy pages are kept accessible in the project so you can open them side-by-side with
the new React pages for comparison during the rebuild.

---

## What this plan corrects from v1

| Issue in v1 plan | Corrected in v2 |
|---|---|
| Tailwind v3 with `tailwind.config.js` | Tailwind v4 — CSS-first, no JS config. `@theme` in CSS. |
| Hex color values | OKLCH color format (`oklch(L C H)`) — Shadcn v4 default |
| `postcss.config.js` + PostCSS CLI | `@tailwindcss/vite` Vite plugin |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| `tailwindcss-animate` | `tw-animate-css` |
| Colors inside `@layer base { :root { } }` | `:root` / `.dark` / `@theme inline` at CSS top level |
| `toast` component | `sonner` (toast deprecated) |
| Style: "default" | Style: "new-york" (default deprecated in v4) |
| Fonts in `tailwind.config.js` | Fonts in `@theme` block in CSS |
| `handleEmptyList` / `"next-themes"` | Shadcn's own `ThemeProvider` pattern |
| No legacy comparison setup | Legacy pages kept accessible via `npx serve legacy/` |

---

## Preserved from legacy

| Category      | What carries over                                                        |
| ------------- | ------------------------------------------------------------------------ |
| Colors        | All brand color tokens (light + dark), converted from hex → OKLCH        |
| Font families | Inter (body), Archivo Narrow (display), JetBrains Mono (mono)            |
| Dark mode     | Shadcn's `ThemeProvider` component (class-based `.dark`, localStorage)   |

## Replaced by Shadcn/Tailwind defaults

| Category     | Old approach                              | New approach                            |
| ------------ | ----------------------------------------- | --------------------------------------- |
| Font sizes   | Custom `--text-*` tokens (120px, 88px…)   | Tailwind's built-in text scale          |
| Spacing      | Custom `--spacing-*` + Linen aliases      | Tailwind `p-*`, `m-*`, `gap-*`          |
| Radii        | Custom `--radius-*` tokens                | Shadcn's `--radius` + derived scale     |
| Shadows      | Custom `--shadow-*` tokens                | Shadcn's shadow system                  |
| Layout       | `.l-grid`, `.l-stack`, `.l-page` CSS      | Tailwind grid/flex utilities            |
| Typography   | `.t-display-xl`, `.t-body`, etc.          | Tailwind `text-*`, `font-*` utilities   |
| Icons        | Font Awesome 6.5 CDN                      | Lucide React (tree-shakeable)           |
| Build        | PostCSS CLI: `postcss src/tailwind.css -o style.css -w` | Vite dev server (built-in)   |
| CSS config   | `@theme` in separate `tokens.css`         | `@theme inline` + `@theme` in index.css |
| Routing      | 5 separate `.html` files                  | React Router v7                         |
| Components   | Vanilla CSS classes + script.js           | Shadcn/UI + custom React components     |
| Dark mode    | `data-theme="dark"` on `<html>`           | `.dark` class + `ThemeProvider`         |
| Tooling      | None                                     | TypeScript, ESLint, Vite HMR            |

---

## Execution Steps

### Step 1: Commit any uncommitted changes

```bash
git add -A && git commit -m "chore: snapshot before react migration"
```

### Step 2: Archive existing code into `legacy/`

Create `legacy/` directory and move all old project files into it.

**Keep at root level (gitignored files shown with `!` for clarity):**
```
.git/             !.gitignore        .agents/           .opencode/
AGENTS.md         DESIGN.md          README.md          MIGRATION_PLAN.md
opencode.json     skills-lock.json   .codesearch.db/
```

**Move to `legacy/`:**
```
api/              assets/            audit-screenshots/  contact.html
cv.html           docs/              index.html          index.png
lab-dark.png      lab-snapshot.md    lab.html            profile.html
rag-chatbot.html  script.js          src/                style.css
tests/            vercel.json        vibe-ui-screenshot.png
vibe-ui-snapshot.md                 vibe-ui/            .playwright-mcp/
STRUCTURE.md
```

**Delete (fresh install):**
```
node_modules/     package.json     package-lock.json     postcss.config.js
```

### Step 3: Scaffold Vite + React + TypeScript

```bash
npm create vite@latest . -- --template react-ts
```

Creates: `package.json`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `src/`, `public/`, `eslint.config.js`.

### Step 4: Install dependencies

```bash
# Tailwind CSS v4 + Vite plugin
npm install tailwindcss @tailwindcss/vite

# Shadcn/UI utilities (installed automatically by shadcn init, but explicit is fine)
npm install clsx tailwind-merge class-variance-authority

# Lucide React icons (replaces Font Awesome)
npm install lucide-react

# React Router
npm install react-router-dom

# TypeScript types for path alias in vite.config.ts
npm install -D @types/node
```

### Step 5: Update `vite.config.ts`

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

### Step 6: Add `@/` path alias to TypeScript config

**In `tsconfig.json`** — add `compilerOptions`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**In `tsconfig.app.json`** — add to its `compilerOptions`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### Step 7: Replace `src/index.css` with Tailwind v4 entry point

Delete the Vite scaffold's default CSS and replace with:
```css
@import "tailwindcss";
```
Shadcn init will expand this with its theme block.

### Step 8: Delete `src/App.css`

Not needed — all styling via Tailwind utilities and Shadcn components.

### Step 9: Initialize Shadcn/UI

```bash
npx shadcn@latest init
```

Accept defaults. The CLI will:
- Detect **Tailwind v4** and use CSS-first config
- Style: **new-york** (auto-detected)
- Install Radix primitives and `tw-animate-css`
- Create `components.json`
- Create `src/lib/utils.ts` (the `cn()` helper)
- Rewrite `src/index.css` with the full Shadcn theme:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* base layer with default border-color, body styles, etc. */

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
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

### Step 10: Customize `:root` and `.dark` blocks with brand colors

Replace the generated OKLCH values with brand colors **only in the `:root` and `.dark`
blocks**. Do NOT touch the `@theme inline` block — it maps variables to Tailwind utilities.

#### Light mode (`:root`)

| Variable | Brand | OKLCH value |
|---|---|---|
| `--radius` | Keep Shadcn default | `0.625rem` |
| `--background` | Cream `#F5F1E8` | `oklch(0.96 0.015 85)` |
| `--foreground` | Near-black `#1A1A1A` | `oklch(0.15 0 0)` |
| `--card` | White `#FFFFFF` | `oklch(1 0 0)` |
| `--card-foreground` | Near-black | `oklch(0.15 0 0)` |
| `--popover` | White | `oklch(1 0 0)` |
| `--popover-foreground` | Near-black | `oklch(0.15 0 0)` |
| `--primary` | Blue `#185FA5` | `oklch(0.47 0.14 260)` |
| `--primary-foreground` | White | `oklch(1 0 0)` |
| `--secondary` | Beige `#E6DECF` | `oklch(0.91 0.025 85)` |
| `--secondary-foreground` | Near-black | `oklch(0.15 0 0)` |
| `--muted` | Beige | `oklch(0.91 0.025 85)` |
| `--muted-foreground` | Text-muted | `oklch(0.54 0 0)` |
| `--accent` | Beige | `oklch(0.91 0.025 85)` |
| `--accent-foreground` | Near-black | `oklch(0.15 0 0)` |
| `--destructive` | Red `#d32f2f` | `oklch(0.55 0.22 25)` |
| `--border` | `rgba(0,0,0,0.08)` | `oklch(0 0 0 / 8%)` |
| `--input` | Cream | `oklch(0.96 0.015 85)` |
| `--ring` | Blue | `oklch(0.47 0.14 260)` |
| `--chart-1` | Blue | `oklch(0.47 0.14 260)` |
| `--chart-2` | Sage `#9CAF88` | `oklch(0.71 0.06 145)` |
| `--chart-3` | Dark-blue `#26428b` | `oklch(0.36 0.12 270)` |
| `--chart-4` | Beige | `oklch(0.91 0.025 85)` |
| `--chart-5` | Near-black | `oklch(0.15 0 0)` |
| `--sidebar` | Cream (slightly lighter) | `oklch(0.98 0.01 85)` |
| `--sidebar-foreground` | Near-black | `oklch(0.15 0 0)` |
| `--sidebar-primary` | Blue | `oklch(0.47 0.14 260)` |
| `--sidebar-primary-foreground` | White | `oklch(1 0 0)` |
| `--sidebar-accent` | Beige | `oklch(0.91 0.025 85)` |
| `--sidebar-accent-foreground` | Near-black | `oklch(0.15 0 0)` |
| `--sidebar-border` | `rgba(0,0,0,0.08)` | `oklch(0 0 0 / 8%)` |
| `--sidebar-ring` | Blue | `oklch(0.47 0.14 260)` |

#### Dark mode (`.dark`)

| Variable | Brand | OKLCH value |
|---|---|---|
| `--background` | Obsidian `#0A0A0A` | `oklch(0.08 0 0)` |
| `--foreground` | Near-white `#F3F4F6` | `oklch(0.97 0.002 260)` |
| `--card` | `#18181A` | `oklch(0.15 0 0)` |
| `--card-foreground` | Near-white | `oklch(0.97 0.002 260)` |
| `--popover` | `#18181A` | `oklch(0.15 0 0)` |
| `--popover-foreground` | Near-white | `oklch(0.97 0.002 260)` |
| `--primary` | Electric Sage `#A3B18A` | `oklch(0.73 0.065 145)` |
| `--primary-foreground` | Dark-text `#0F172A` | `oklch(0.18 0.015 265)` |
| `--secondary` | `#161618` | `oklch(0.14 0 0)` |
| `--secondary-foreground` | Near-white | `oklch(0.97 0.002 260)` |
| `--muted` | `#161618` | `oklch(0.14 0 0)` |
| `--muted-foreground` | `#6B7280` | `oklch(0.50 0.012 260)` |
| `--accent` | `#161618` | `oklch(0.14 0 0)` |
| `--accent-foreground` | Near-white | `oklch(0.97 0.002 260)` |
| `--destructive` | `#EF4444` | `oklch(0.64 0.22 25)` |
| `--border` | `rgba(255,255,255,0.06)` | `oklch(1 0 0 / 6%)` |
| `--input` | `#1A1A1A` | `oklch(0.15 0 0)` |
| `--ring` | Electric Sage | `oklch(0.73 0.065 145)` |
| `--chart-1` | Electric Sage | `oklch(0.73 0.065 145)` |
| `--chart-2` | Muted Sage `#8CA07A` | `oklch(0.67 0.06 145)` |
| `--chart-3` | `#9CA3AF` | `oklch(0.68 0.012 260)` |
| `--chart-4` | `#6B7280` | `oklch(0.50 0.012 260)` |
| `--chart-5` | Near-white | `oklch(0.97 0.002 260)` |
| `--sidebar` | Slightly lighter than bg | `oklch(0.12 0 0)` |
| `--sidebar-foreground` | Near-white | `oklch(0.97 0.002 260)` |
| `--sidebar-primary` | Electric Sage | `oklch(0.73 0.065 145)` |
| `--sidebar-primary-foreground` | Dark-text | `oklch(0.18 0.015 265)` |
| `--sidebar-accent` | `#161618` | `oklch(0.14 0 0)` |
| `--sidebar-accent-foreground` | Near-white | `oklch(0.97 0.002 260)` |
| `--sidebar-border` | `rgba(255,255,255,0.06)` | `oklch(1 0 0 / 6%)` |
| `--sidebar-ring` | Electric Sage | `oklch(0.73 0.065 145)` |

> After Shadcn init creates the file, we will manually edit `:root` and `.dark` blocks.
> The `@theme inline` block stays untouched.

### Step 11: Add font families via `@theme` in `src/index.css`

Add a second `@theme` block (separate from `@theme inline` — this one defines new tokens):

```css
@theme {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Archivo Narrow", "Arial Narrow", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Tailwind v4 auto-picks `--font-sans` as the default. Use with:
- `font-sans` → Inter
- `font-display` → Archivo Narrow
- `font-mono` → JetBrains Mono

### Step 12: Add Google Fonts link to `index.html`

```html
<link
  href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

### Step 13: Set up ThemeProvider (dark mode)

Create `src/components/theme-provider.tsx` — Shadcn's official Vite dark mode provider
(from https://ui.shadcn.com/docs/dark-mode/vite). Handles:
- `.dark` class toggle on `<html>`
- `localStorage` persistence
- System preference detection (`prefers-color-scheme`)

Create `src/components/mode-toggle.tsx` — dropdown with three options:
- Light (Sun icon)
- Dark (Moon icon)
- System (auto)

Uses `DropdownMenu` from Shadcn + `Sun`/`Moon` from Lucide React.

### Step 14: Set up React Router in `src/main.tsx`

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Home from "@/pages/Home"
import Profile from "@/pages/Profile"
import Lab from "@/pages/Lab"
import Contact from "@/pages/Contact"
import RAG from "@/pages/RAG"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="aliya-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rag" element={<RAG />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
```

### Step 15: Create placeholder page components

**`src/pages/Home.tsx`**:
```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-primary">Home</h1>
        <p className="mt-4 text-muted-foreground">Placeholder — rebuild in progress</p>
      </div>
    </div>
  )
}
```

Same pattern for `Profile.tsx`, `Lab.tsx`, `Contact.tsx`, `RAG.tsx` (change title text).

Each placeholder demonstrates the theme is working: `bg-background`, `text-foreground`,
`text-primary`, `text-muted-foreground`, `font-display`.

### Step 16: Install initial Shadcn components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add dropdown-menu
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add tabs
npx shadcn@latest add sonner
```

Components land in `src/components/ui/`.

### Step 17: Make legacy pages accessible for comparison

Add a `npm run legacy` script for side-by-side comparison during development:

```bash
npm install -D serve
```

In `package.json` scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "legacy": "serve legacy",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

Now you can run `npm run dev` (new React app on port 5173) and `npm run legacy`
(old HTML pages on port 3000) simultaneously. Open both browser tabs to compare.

### Step 18: Verification checklist

- [ ] `npm run dev` starts without errors
- [ ] Placeholder Home page renders with cream `#F5F1E8` background
- [ ] Dark mode toggle works — switches background to `#0A0A0A`
- [ ] Primary accent is blue in light mode, sage in dark mode
- [ ] Body text uses Inter (verify with DevTools)
- [ ] `font-display` class renders Archivo Narrow
- [ ] `font-mono` class renders JetBrains Mono
- [ ] All 5 routes navigate correctly (/, /profile, /lab, /contact, /rag)
- [ ] `npx tsc --noEmit` passes (TypeScript check)
- [ ] `npm run build` succeeds (Vite production build)
- [ ] `npm run legacy` serves old pages on port 3000
- [ ] All legacy files are intact in `legacy/` directory

---

## What NOT to do

- Do NOT copy old CSS files into the new `src/`
- Do NOT recreate old typography utility classes (`.t-display-xl`, etc.)
- Do NOT port old shadow/spacing/radius tokens
- Do NOT try to make Shadcn components look like old vanilla components
- Do NOT use Font Awesome — use Lucide React everywhere
- Do NOT use `data-theme="dark"` — use Shadcn's `ThemeProvider`
- Do NOT create a `tailwind.config.js` — Tailwind v4 uses CSS config
- Do NOT create a `postcss.config.js` — the Vite plugin handles it
- Do NOT use `@tailwind base/components/utilities` — v4 uses `@import "tailwindcss"`

---

## Post-migration roadmap

After the scaffold is verified, rebuild pages one at a time — each time comparing
against the legacy version:

1. **Navigation** — Desktop nav + mobile Sheet drawer + ModeToggle
2. **Home hero** — Stagger animation intro (Framer Motion)
3. **Profile** — Timeline + skill cards grid
4. **Lab** — Project cards + mini-chat widget
5. **Contact** — Form with floating labels
6. **RAG Chatbot** — Full rebuild with React state management
7. **Canvas background** — Port `canvas-bg.js` to a React hook
8. **Vercel deployment** — Update `vercel.json` for Vite SPA output

---

## Root file structure after migration

```
Aliya-portfolio/
  .git/
  .gitignore
  .agents/
  .opencode/
  AGENTS.md
  DESIGN.md
  MIGRATION_PLAN.md
  README.md
  opencode.json
  skills-lock.json

  # ── New Vite + React 19 + Tailwind v4 project ──
  index.html                          # Google Fonts link added
  package.json                        # npm dependencies + "legacy" script
  package-lock.json
  vite.config.ts                      # @tailwindcss/vite + react + @/ alias
  tsconfig.json                       # @/ path alias
  tsconfig.app.json                   # @/ path alias
  tsconfig.node.json
  components.json                     # Shadcn config
  eslint.config.js
  public/                             # Static assets
  src/
    main.tsx                          # React root: ThemeProvider + BrowserRouter
    index.css                         # Tailwind import + Shadcn theme + fonts
    vite-env.d.ts
    lib/
      utils.ts                        # cn() helper
    components/
      ui/                             # Shadcn components (button, card, etc.)
      theme-provider.tsx              # Dark mode provider
      mode-toggle.tsx                 # Light / dark / system toggle
    pages/
      Home.tsx                        # Placeholder — rebuild later
      Profile.tsx                     # Placeholder — rebuild later
      Lab.tsx                         # Placeholder — rebuild later
      Contact.tsx                     # Placeholder — rebuild later
      RAG.tsx                         # Placeholder — rebuild later

  # ── Archived old project (reference only) ──
  legacy/
    api/
    assets/
    contact.html
    cv.html
    index.html
    lab.html
    profile.html
    rag-chatbot.html
    script.js
    src/
      tokens.css                      # Color reference for conversions
      tailwind.css
      typography.css
      style-original.css
      canvas-bg.js
      theme-toggle.js
      mini-chatbot.js
      rag-chatbot.js
      contact.js
    style.css
    postcss.config.js
    vercel.json
    ...
```
