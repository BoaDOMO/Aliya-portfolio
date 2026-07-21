# Aliya Koy

**AI researcher & full-stack developer** building product with AI riding shotgun. Based in Phnom Penh.

> Live demo: _TODO: add Vercel URL_ · Repo: [github.com/…/Aliya-portfolio](https://github.com/apple/Aliya-portfolio)

---

## About

Personal portfolio and lab. What began as a vanilla HTML/CSS site has been rebuilt as a React 19 + Vite single-page app. Beyond the usual portfolio pages, it ships two working tools: an in-app **design-system editor** (`/design-system`) and a **Gemini-powered RAG chatbot** (`/rag`).

## Features

- **Home** — animated hero with a live code-editor panel
- **Profile** — editorial positioning, capabilities, and selected experience
- **Lab** — experiments and mini-projects
- **Contact** — compact validated form with resilient Formspree delivery
- **RAG chatbot** (`/rag`) — serverless Gemini Q&A over a custom knowledge base
- **Design System tool** (`/design-system`) — token editor, color/typography drawers, quality reports, export

## Tech stack

| Layer     | Choices                                                             |
| --------- | ------------------------------------------------------------------- |
| Framework | React 19, TypeScript 6, Vite 8                                      |
| Styling   | Tailwind CSS v4 (`@theme` tokens), shadcn (Base UI primitives core) |
| Animation | Framer Motion, `tw-animate-css`                                     |
| Theming   | `next-themes` (`class` strategy, light/dark)                        |
| Forms     | react-hook-form + zod + @hookform/resolvers                         |
| AI / RAG  | `@google/generative-ai`, serverless API on Vercel                   |
| Color     | culori, chroma-js (contrast & palette utils)                        |
| Icons     | `@phosphor-icons/react`                                             |
| Routing   | react-router-dom 7                                                  |

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # eslint .
npm run preview  # preview the production build
```

## Project structure

```
src/
  main.tsx              # Router + ThemeProvider + Layout
  pages/                # Home, Profile, Lab, Contact, RAG, DesignSystem
  components/
    ui/                 # shadcn primitives
    design-system/      # DS tool (drawers, preview, quality report)
    rag/                # chatbot dashboard, chat area, kb editor
    lab/                # lab experiments
  lib/                  # tokens store, color/contrast utils, generate-output, url-state
  index.css             # Tailwind v4 @theme + :root/.dark tokens
api/
  chat.js               # Vercel serverless Gemini RAG endpoint
```

## Architecture notes

- **Path alias:** `@` → `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).
- **Tokens:** CSS custom properties in `src/index.css` mapped to Tailwind v4 `@theme`. Light/dark swap via `.dark` on `<html>` — **never use `dark:` modifiers for background/foreground fills**; the tokens adapt automatically. See `DESIGN.md` for the full system.
- **Theming:** `next-themes` with `class` strategy; inline pre-paint script in `index.html` prevents FOUC.
- **SPA routing:** `vercel.json` rewrites all routes to `/index.html`.
- **RAG backend:** `api/chat.js` is a Vercel serverless function calling Gemini with a provided knowledge base + persona. Requires `GOOGLE_API_KEY`.

## Design system tool

The `/design-system` route is a built-in token editor: edit color scales, typography, and style presets; run contrast/quality checks; preview components; export tokens. Full implementation guidance lives in `DESIGN.md`.

## Deployment

Vercel auto-detects Vite. Set the environment variable:

```
GOOGLE_API_KEY=your_gemini_api_key
```

Push to `main` — Vercel builds and serves both the SPA and the `api/` serverless functions.

## License

MIT © Aliya Koy
