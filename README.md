# Aliya Koy — Portfolio

Portfolio and product lab for Aliya Koy, a Senior Digital Product Owner and AI Lead based in Phnom Penh.

The public site uses the **Ethereal Monolith** direction: editorial product storytelling, oversized typography, generous whitespace, a floating command-bar navigation, restrained motion, and an intentional Gallery/Studio light-dark palette flip.

## Public experience

- **Home** — positioning hero, working method, and clear paths to selected work or profile
- **Profile** — editorial introduction, three core capabilities, selected experience, earlier roles, and education
- **Lab** — selected shipped and in-progress work presented as outcome-led project cards
- **Contact** — validated message form with direct email fallback

The repository also contains two working product tools:

- **RAG assistant** (`/chat`) — Gemini-backed Q&A over an editable knowledge base
- **Design System Studio** (`/design-system`) — token, colour, typography, preview, quality, and export tooling

## Core journeys

1. Land on Home and choose **See what I've built** or **How I work**.
2. Review Profile capabilities and experience, then continue to Contact.
3. Browse Lab projects and open the relevant working tool.
4. Send a validated Contact form or use the direct email link.
5. Toggle and persist the intentionally designed light or dark theme.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19, TypeScript 6, Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4 with CSS-first semantic tokens |
| Components | shadcn with Base UI primitives |
| Motion | Framer Motion and `tw-animate-css` |
| Theme | Class-based light/dark provider with pre-paint theme script |
| Forms | Native semantic form handling with client validation and Formspree delivery |
| Icons | `@phosphor-icons/react` |
| AI | `@google/generative-ai` through a Vercel serverless endpoint |

## Typography and palette

- Display: Plus Jakarta Sans
- Body: Inter
- Data and metadata: JetBrains Mono
- Gallery: warm linen canvas, obsidian text, laurel selection, cobalt action
- Studio: deep forest canvas, warm linen text, moss selection, brighter cobalt action

The complete rules live in [DESIGN.md](./DESIGN.md).

## Getting started

Requires Node 20 or newer.

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

The development server runs at `http://localhost:5173`.

## Project structure

```text
src/
  main.tsx                 Router and providers
  index.css                Tailwind v4 theme tokens and shared visual rules
  pages/                   Home, Profile, Lab, Contact, RAG, Design System
  components/
    ui/                    shadcn/Base UI primitives
    design-system/         Design System Studio
    rag/                   RAG product interface
    lab/                   Embedded lab experiments
  lib/                     Token, colour, contrast, persistence, and export logic
api/
  chat.js                  Vercel Gemini endpoint
```

## Architecture notes

- `@` resolves to `src/` through Vite and TypeScript configuration.
- Semantic tokens live in `src/index.css` and switch values under `.dark`.
- Structural backgrounds and foregrounds use semantic utilities; do not add `dark:` fill overrides to portfolio UI.
- `/chat` and `/design-system` use isolated product-tool shells without the portfolio navigation and footer.
- `vercel.json` rewrites SPA routes to `index.html`.
- The inline theme script in `index.html` applies the persisted theme before paint.
- The Contact form submits to Formspree and retains client-side validation and accessible status feedback.
- The Gemini endpoint requires `GOOGLE_API_KEY`.

## Environment

Create the deployment environment variable used by `/api/chat.js`:

```text
GOOGLE_API_KEY=your_gemini_api_key
```

The four public portfolio pages do not require a backend or authentication.

## Quality gate

Before shipping:

1. Run `npm run lint` and `npm run build`.
2. Start `npm run dev` and verify all four public routes.
3. Review light and dark themes at 375px, 768px, and 1280px or wider.
4. Check keyboard focus, reduced motion, field validation, and horizontal reflow.

## Deployment

Vercel auto-detects Vite and serves the SPA plus `api/` serverless functions. Configure `GOOGLE_API_KEY` before deploying the RAG route.

## License

MIT © Aliya Koy
