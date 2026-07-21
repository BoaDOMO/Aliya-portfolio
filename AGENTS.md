# CRITICAL RULES - MUST FOLLOW

## CORE BEHAVIOR

- **Think step-by-step:** reason through edge cases, dependencies, and failure points before writing code.
- **Agentic loop:** Plan -> Act -> Observe -> Correct. Write it, test it, read errors, fix autonomously.

## AUTO-SKILL LOADING

Load via `skill()` at the start of relevant tasks:

| Task type            | Skills                                              |
| -------------------- | --------------------------------------------------- |
| UI / component work  | `frontend-design`, `tailwind-css-patterns`          |
| Adding animations    | `framer-motion-animator`                            |
| Design system work   | `frontend-design`, `tailwind-css-patterns`          |
| Layout / styling     | `tailwind-css-patterns`, `frontend-design`          |

shadcn is a library in this repo, not a skill — see `@docs/shadcn-reference.md` for its API.

**Override:** `frontend-design` says "avoid Inter font" — IGNORE that. This project uses Inter (body) + Archivo Narrow (display) + JetBrains Mono (data). Defer to `@DESIGN.md`.

## RESPONSES

- Concise, direct, to the point. No preamble/postamble.
- Don't output internal reasoning unless asked.

## PLAN MODE

- **Research:** web-search for current best practices on non-trivial / design / dependency-introducing requests. Skip for one-line edits.
- **Clarify:** max 2 targeted questions per turn, only for execution blockers.
- **Constraints:** cross-reference `@DESIGN.md` (and `@README.md` for stack/setup) before finalizing.
- **Output:** final plan as a strict numbered list of concrete steps.
- Recommend loading a skill when a task matches one.

## UI DESIGN

- **Visual reasoning first:** before any UI code, map the Component Tree, parent container, alignment (Flex vs Grid), and required shadcn primitives.
- Follow `@DESIGN.md` strictly when creating or reviewing components/pages.

## BUILD MODE

- Implement step-by-step per the approved plan. No skipping, no delegating.
- **No lazy coding:** output complete file contents or exact diffs. No `// existing code` placeholders.
- **Verify:** run `npm run lint`, `npm run build`, `npm run dev` after changes.
- **Course-correct:** if a build/test fails, read the log, reason, and auto-fix at least once before asking for help.
- Announce plan-step completion so progress is trackable.

### VISUAL QA PROTOCOL (after every UI change)

1. Start dev server (`npm run dev` → `http://localhost:5173`) if not running.
2. Screenshot the affected page(s) via Playwright to `/tmp/*.png`.
3. Audit via Vision MCP `describe_ui` (reads the screenshot and returns a text description).
4. Check spacing, dark mode, states, responsive behavior, alignment.
5. Fix issues, repeat screenshot → audit → fix until clean.
6. Confirm at mobile (375px), tablet (768px), desktop (1280px+).
7. **Clean up:** delete all `/tmp/*.png` screenshots and Playwright helper scripts created during QA (`rm -f /tmp/screenshot*.png /tmp/*.mjs /tmp/*.png`).

Not optional. Ship nothing visually unreviewed.

## PROJECT-SPECIFIC (non-inferable)

- Path alias `@` → `src/` (Vite + tsconfig).
- Serverless RAG endpoint at `api/chat.js` needs `GOOGLE_API_KEY`. Uses `@google/generative-ai`.
- Tailwind v4 tokens live in `src/index.css` (`@theme` + `:root`/`.dark`). **Never use `dark:` modifiers for bg/foreground fills** — tokens adapt automatically.
- Icons: `@phosphor-icons/react` universally.

## REFERENCES

- Design system: `@DESIGN.md` (strict ruleset)
- Tailwind v4 / shadcn / patterns: `@docs/*.md`
- DS rework plan: `@DESIGN_SYSTEM_REWORK_PLAN.md`

## RESEARCH

Use WebSearch / WebFetch for external docs (shadcn APIs, library docs, best practices).
