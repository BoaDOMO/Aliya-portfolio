# Session Log

## Session 2026-05-23 — Pipeline & Config Setup

**Objective:** Set up Plan → UI → Code → Test → Guardrail pipeline with model assignments
**Subagents:** N/A (initial config)

### Decisions
- Pipeline: Plan (Flash Free) → UI (Qwen3.6 Plus Go) → Code (Flash Free) → Test (Qwen3.6 Plus Go) → Guardrail (MiniMax M2.5 Free)
- Hybrid free/Go model approach: free models by default, Go models fallback for context/quality
- Guardrail appends session log after each successful pipeline run
- Free DeepSeek V4 Flash fallback → DeepSeek V4 Flash Go for context-limited tasks

### Files Changed
- `opencode.json` — Added agent definitions for plan, ui-designer, coder, tester, guardrail
- `AGENTS.md` — Added pipeline table and model assignments
- `README.md` — Trimmed to essentials, linked STRUCTURE.md and DESIGN.md
- `STRUCTURE.md` — Created with pages, APIs, directory layout
- `.opencode/sessions/SESSION_LOG.md` — Created for auto-logging

### Outcome
All files updated. Pipeline ready for use.

## Session 2026-05-23 — Plan Prompt & AGENTS.md Refinement

**Objective:** Add plan agent prompt, update AGENTS.md with web research + skill rules
**Subagents:** N/A

### Decisions
- Plan agent must search web and recommend skills before presenting findings
- User approves plan and skills before pipeline continues
- Dedicated prompt file: `.opencode/prompts/plan.txt`
- Removed TESTING section from AGENTS.md (handled by pipeline)
- Updated pipeline table: added user approval flow, fixed Guardrail model

### Files Changed
- `.opencode/prompts/plan.txt` — Created with plan agent instructions
- `opencode.json` — Added prompt reference to plan agent
- `AGENTS.md` — Updated PLANNING, removed TESTING, refined pipeline table

## Session 2026-05-23 — Prompts, Permissions, Tests & Fallbacks

**Objective:** Complete pipeline infrastructure: all prompt files, plan permissions, fallback rules, test infrastructure
**Subagents:** N/A

### Decisions
- Created role-specific prompt files for all 5 pipeline agents
- Plan agent gets `websearch` + `webfetch` permissions (was missing)
- Fallback rules: free → Go model on context/failure
- Tests run via Playwright MCP tools (no separate test framework needed)
- `tests/smoke.spec.js` documents coverage for reference

### Files Changed
- `opencode.json` — Added plan permissions + prompt refs for all 5 agents
- `.opencode/prompts/ui.txt` — Created
- `.opencode/prompts/coder.txt` — Created
- `.opencode/prompts/tester.txt` — Created
- `.opencode/prompts/guardrail.txt` — Created
- `AGENTS.md` — Added fallback rules to Pipeline section
- `tests/smoke.spec.js` — Created with test coverage documentation

## Session 2026-05-24 — Design System Generator v3 Revision

**Objective:** Revise `design-system.html` from a cluttered multi-tab tool into a focused two-column token picker with documentation-style preview. Core flow: pick color → pick fonts → export.

**Pipeline steps:**
| Step | Subagent | Result |
|------|----------|--------|
| Plan | DeepSeek V4 Flash | Plan written to `.opencode/plans/design-system-generator-v3.md` |
| UI | Qwen3.6 Plus + frontend-design skill | Rewrote `design-system.html` (435 lines) and `src/design-system.css` (1179 lines) |
| Code | DeepSeek V4 Flash | Created `src/design-system.js` (981 lines) — all logic extracted from HTML |
| Test | Qwen3.6 Plus | Verified: zero console errors, color picker, font pills, neutral mode, export formats, dark mode, responsive, click-to-copy |
| Guardrail | MiniMax M2.5 Free | No dead code found, plan compliance verified. Fixed missing lab.html link to design-system |

### Design Decisions
- **Layout:** Two-column (35/65) — controls left (site design language) + preview right (clean white aesthetic matching sample image)
- **Features removed:** AI generation, effects tab, accessibility tab, state overrides, harmony picker, presets, visibility tool, spacing grid, multi-color support
- **Neutral palette:** Simplified to 2 modes (Pure Gray + Brand-Tinted)
- **Google Fonts:** CORS-blocked API fetch removed — uses local FALLBACK_FONTS array (150+ fonts) instead
- **JS extracted:** All inline JS moved to `src/design-system.js`

### Files Changed
- `design-system.html` — Rewritten (2186 → 435 lines)
- `src/design-system.css` — Rewritten (2311 → 1179 lines)
- `src/design-system.js` — Created (981 lines)
- `lab.html` — Added project card linking to design system
- `.opencode/plans/design-system-generator-v3.md` — Created (plan document)

