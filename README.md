# Aliya Koy — Portfolio

Personal portfolio site at [aliyakoy.com](https://aliyakoy.com). Built with vanilla HTML, CSS, and JavaScript.

## Tech Stack

- **Styling**: Tailwind CSS v4 (compiled via PostCSS) + hand-written CSS
- **Icons**: Font Awesome 6.5 (CDN)
- **Fonts**: Google Fonts (CDN)
- **APIs**: Vercel serverless functions (Gemini AI chat + design suggestions)
- **Deployment**: [Vercel](https://vercel.com)

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero, profile photo, social links |
| `profile.html` | Skills, experience timeline, education |
| `contact.html` | Contact form + info |
| `cv.html` | Print-optimized CV page |
| `lab.html` | Project showcase (RAG chatbot, Design System Generator) |
| `rag-chatbot.html` | RAG chatbot demo with multi-source retrieval |
| `design-system.html` | Design system generator — color palette, typography, effects, live preview |

## Getting Started

```bash
npm install
npm run build     # Compiles Tailwind CSS
```

The build output is `style.css` — the only stylesheet linked by all pages.

## APIs

| Endpoint | File | Description |
|----------|------|-------------|
| `POST /api/chat` | `api/chat.js` | RAG chatbot with Gemini + context retrieval |
| `POST /api/generate-design` | `api/generate-design.js` | AI-powered design system suggestions |

## Project Structure

```
├── api/                   # Vercel serverless functions
├── assets/images/         # Static images
├── docs/                  # Documentation (completed plans)
├── src/                   # Source CSS, JS, utilities
├── .opencode/plans/       # Active project plans
├── index.html             # (pages at root — Vercel serves from root)
└── style.css              # Compiled Tailwind output (git-tracked)
```

## Design System

See [`DESIGN.md`](./DESIGN.md) for the full design system reference.
