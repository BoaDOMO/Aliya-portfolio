# CRITICAL RULES - MUST FOLLOW

## CORE BEHAVIOR (REASONING)

- **Think Step-by-Step:** Before generating a plan or writing code, internally reason through the problem. Consider edge cases, dependencies, and potential points of failure.
- **The Agentic Loop:** For complex tasks, adopt a Plan -> Act -> Observe -> Correct loop. Do not blindly write code; write it, test it, read the errors, and fix them autonomously.

## RESPONSES

- Keep responses concise, direct, and to the point unless the user explicitly asks for detailed explanations.
- Do not output your internal reasoning process unless asked; only output the final actionable response.

## PLAN MODE

- **MANDATORY TOOL USE:** You MUST execute a web search for current best practices on EVERY request before generating your plan. Do not rely solely on your training data.
- **Clarification:** Prioritize action over interrogation. Ask a maximum of 2 targeted clarifying questions per turn, focusing only on critical execution blockers.
- **Constraint Checking:** Never assume design, tech stack, or features. Cross-reference proposed approaches with `@README.md` and `@DESIGN.md` before finalizing the plan.
- **Structured Output:** Output your final plan as a strict, numbered list of concrete, actionable steps.
- If a task matches an available skill, recommend loading it for user approval.

## BUILD MODE

- **Systematic Execution:** Implement features step-by-step strictly following the approved plan. Do not skip steps or delegate to pipelines.
- **NO LAZY CODING:** Never truncate code. Output complete file contents or exact, ready-to-apply diffs. Never use placeholders like `// existing code` or `// rest of code here`.
- **Verify & Observe:** You MUST verify changes by running the appropriate terminal commands (e.g., linting, building, or testing).
- **Course Correction:** If a test or build fails, do not immediately ask the user for help. Read the error log, reason about the failure, and attempt to fix the code automatically at least once before reporting back.
- Announce when a specific step from the plan is completed so the user can track state.

## UI DESIGN

- **Visual Reasoning:** Before writing any frontend or UI code, you MUST use your internal thinking step to map out the Component Tree and DOM layout. Explicitly plan the parent container, the alignment strategy (Flexbox vs. Grid), and the required shadcn components _before_ generating the file.
- Always follow the UI design system when creating or reviewing components or pages.
- Design System: `@DESIGN.md`

## REFERENCES

- Tailwind CSS v4 docs: `@docs/tailwind-v4-reference.md`
- shadcn/ui theming + setup: `@docs/shadcn-reference.md`
- Tailwind patterns: `@docs/layout-patterns.md`, `@docs/component-patterns.md`, `@docs/responsive-design.md`, `@docs/animations.md`, `@docs/accessibility.md`, `@docs/configuration.md`, `@docs/performance.md`, `@docs/reference.md`
- Design system: `@DESIGN.md`

## RESEARCH

- Use WebSearch / WebFetch for any external docs you need (shadcn component APIs, library docs, best practices, etc.).

## PROJECT STRUCTURE

- Please refer to `@README.md`
