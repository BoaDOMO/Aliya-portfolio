# CRITICAL RULES — MUST FOLLOW

## Core behaviour & Workflow

Follow this strict 5-step workflow for all requests:
1. **Proposal & Clarification First**: When a question, change, fix, or feature is requested, answer any user questions, propose options, and ask for explicit clarification FIRST before modifying any code files.
2. **Wait for Approval & Response**: Wait for the user to approve the proposed solution and respond to clarifying options before taking action.
3. **Apply Edits Locally**: Once approved, apply the code changes locally and verify them (lint/build).
4. **Summary for Local Review**: Clearly summarize all modified files so the user can inspect and test manually.
5. **Production Safety**: Never run `git push` or production deployment commands unless the user explicitly requests/approves it.
- Think through edge cases, dependencies, responsive changes, and failure points before editing.
- Use the loop Plan → Act → Observe → Correct. Test changes, read failures, and fix them autonomously.
- Preserve unrelated work in a dirty worktree. Never overwrite or revert changes outside the current task.

## Required skills

Load the matching skills at the start of relevant tasks:

| Task | Skills |
| --- | --- |
| UI, component, layout, or design-system work | `frontend-design`, `tailwind-css-patterns` |
| Animation or micro-interaction work | `framer-motion-animator` |
| Local visual and interaction QA | `browser:control-in-app-browser` |

shadcn is a repository library, not a skill. Read `@docs/shadcn-reference.md` when using or changing its primitives.

**Project typography override:** Ignore generic skill advice to avoid Inter. This project intentionally uses Plus Jakarta Sans for display, Inter for body, and JetBrains Mono for data. `@DESIGN.md` is authoritative.

## Responses

- Be concise and direct.
- Do not reveal internal reasoning unless requested.
- Announce meaningful plan-step completion so progress remains trackable.

## Plan mode

- Research current external guidance for non-trivial, design-sensitive, or dependency-introducing work.
- Ask at most two targeted questions, only when blocked.
- Cross-reference `@DESIGN.md` and `@README.md` before finalising.
- Output a strict numbered list of concrete steps.
- Recommend the relevant skill when a task matches one.

## UI design

- Before UI code, map the component tree, parent container, Flex/Grid alignment, responsive composition, and required shadcn primitives.
- Follow `@DESIGN.md` for the public portfolio. Do not improvise a competing visual language.
- Treat `/chat` and `/design-system` as isolated product-tool shells. They share semantic tokens and accessibility, but not the portfolio navbar, footer, or editorial spacing.
- Use `@phosphor-icons/react` for all interface icons.
- Use semantic Tailwind tokens for structural colour. Never add `dark:` modifiers for portfolio background or foreground fills; token values adapt automatically.

## Portfolio architecture

- Public routes are `/`, `/profile`, `/lab`, and `/contact`.
- Shared portfolio components include the floating command bar, page container, section label, reveal wrapper, CTA section, footer, progress indicator, and back-to-top control.
- Keep public content static and hardcoded unless the request explicitly adds content management.
- Preserve the current Formspree contact delivery, client validation, and direct-email fallback.
- Preserve the existing Chat endpoint contract (`api/chat.js`) and `GOOGLE_API_KEY` requirement.

## Build mode

- Implement the approved plan step by step without delegating.
- Provide complete edits; never leave `// existing code` or similar placeholders.
- Run `npm run lint`, `npm run build`, and `npm run dev` after changes.
- If lint, build, or runtime verification fails, inspect the log and attempt a focused fix before asking for help.

## Visual QA protocol

After every UI change:

1. Start the development server at `http://localhost:5173` if needed.
2. Capture the affected pages with the in-app Browser/Playwright surface.
3. Inspect each capture visually for hierarchy, spacing, alignment, clipping, contrast, and unintended overflow.
4. Check light and dark modes, the navigation top/scrolled states, hover/focus states, and relevant form states.
5. Fix issues and repeat capture → inspect → fix until clean.
6. Confirm mobile 375px, tablet 768px, and desktop 1280px or wider.
7. Remove temporary screenshots and helper scripts after QA.

Ship nothing visually unreviewed.

## Project-specific facts

- Path alias `@` resolves to `src/`.
- Tailwind v4 tokens live in `src/index.css` under `@theme`, `:root`, and `.dark`.
- Display/body/data typography is Plus Jakarta Sans / Inter / JetBrains Mono.
- Public portfolio direction is **Ethereal Monolith**, documented in `@DESIGN.md`.
- The Chat endpoint is `api/chat.js`, uses `@google/generative-ai`, and requires `GOOGLE_API_KEY`.
- `/chat` and `/design-system` do not render the portfolio shell.

## References

- Authoritative portfolio system: `@DESIGN.md`
- Stack, routes, setup, and quality gate: `@README.md`
- Tailwind, shadcn, accessibility, animation, layout, and responsive notes: `@docs/*.md`

## External research

Use official documentation or primary sources for shadcn APIs, library behaviour, and current implementation guidance.
