# Project Structure

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero, profile photo, social links |
| `profile.html` | Skills, experience timeline, education |
| `contact.html` | Contact form + info |
| `cv.html` | Print-optimized CV page |
| `lab.html` | Project showcase (RAG chatbot) |
| `rag-chatbot.html` | RAG chatbot demo with multi-source retrieval |

## APIs

| Endpoint | File | Description |
|----------|------|-------------|
| `POST /api/chat` | `api/chat.js` | RAG chatbot with Gemini + context retrieval |
| `POST /api/generate-design` | `api/generate-design.js` | AI-powered design system suggestions |

## Directory Layout

```
├── api/                   # Vercel serverless functions
├── assets/images/         # Static images
├── docs/                  # Documentation (completed plans)
├── src/                   # Source CSS, JS, utilities
├── .opencode/
│   ├── plans/             # Active project plans
│   └── sessions/          # Session logs
├── index.html             # (pages at root — Vercel serves from root)
└── style.css              # Compiled Tailwind output (git-tracked)
```
