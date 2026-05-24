# CRITICAL RULES - MUST FOLLOW

## RESPONSES

- Keep responses concise and to the point - unless the user asks otherwise

## PLANNING MODE

- Always ask clarifying questions
- Never assume design, tech stack or features
- Use deep-dive sub-agents to assist with research
- Use deep-dive sub-agents to review the different aspects of your plan before presenting to the user
- Always search the web for current best practices before recommending approaches
- If a task matches an available skill, recommend loading it for user approval

## CHANGE / EDIT MODE

- Never implement features yourself when possible - use the pipeline!
- When the user asks for a new feature or improvement, automatically initiate the pipeline (Plan → UI → Code → Test → Guardrail) without being prompted
- When using sub-agents to implement features, act as a coordinator only

## UI DESIGN

- Always follow the UI design system when creating or reviewing components or pages.
- Design System: @DESIGN.md

## PROJECT STRUCTURE

- Please refer to @README.md

## Pipeline: Plan → UI → Code → Test → Guardrail

The main agent orchestrates the pipeline by spawning each subagent in sequence,
passing results forward and coordinating with the user at each step.

Use this pipeline for new features or improvements:

| Step      | Subagent       | Model             | Responsibility                               |
| --------- | -------------- | ----------------- | -------------------------------------------- |
| Plan      | task (explore) | DeepSeek V4 Flash | Research, spec, implementation plan          |
| UI        | task (general) | Qwen3.6 Plus      | Design per DESIGN.md + frontend-design skill |
| Code      | task (general) | DeepSeek V4 Flash | Implementation per plan + UI spec            |
| Test      | task (general) | Qwen3.6 Plus      | Run tests, Playwright visual verification    |
| Guardrail | task (general) | MiniMax M2.5 Free | Lint, build, security, quality, session log  |

> **Flow:** Plan researches & presents findings → User approves → UI → Code → Test → Guardrail logs

**Fallback:** If a subagent hits context limits or fails, retry with the Go-tier version (DeepSeek V4 Flash Go for Plan/Coder, Qwen3.5 Plus Go for Guardrail). UI and Test already use Go models.

After each successful pipeline run, guardrail appends a summary to `.opencode/sessions/SESSION_LOG.md`.
