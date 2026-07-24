# Product Requirements Document: Chat Workspace UI

**Status:** Applied design, documented as the reference pattern  
**Source experience:** `/chat`  
**Primary reuse target:** `/design-system`  
**Product name:** Chat Workspace  
**Last updated:** July 23, 2026

## 1. Purpose

The Chat Workspace turns a basic RAG chatbot demo into a believable, interactive support product. It allows one tester to experience both sides of a customer-support journey:

- Ask questions as a customer.
- Receive knowledge-grounded AI answers.
- Request a human teammate.
- See that request arrive in a support inbox.
- Reply as the support teammate.
- Edit the knowledge base that powers the experience.

The UI must feel like a polished product tool rather than a portfolio mockup, admin template, IDE, or toy chatbot. Its visual language is calm, tactile, spatially clear, and intentionally restrained.

This document captures the applied interface as a reusable application-shell pattern. Design Studio should adopt the same principles without copying the Chat Workspace's domain-specific layout or controls.

## 2. Product outcome

The interface should communicate three ideas within seconds:

1. The left surface is where a customer talks.
2. The right surface is where an operator works.
3. Actions on either side affect the other side live.

Success is not measured by the number of visible features. Success means a first-time tester can discover the journey without instructions, complete a full AI-to-human handoff, and understand how the knowledge base affects the assistant.

## 3. Experience principles

### 3.1 Product first, explanation second

The interface should explain itself through familiar structure, labels, icons, and immediate feedback. Avoid welcome panels, instructional subheadings, persistent helper copy, oversized labels, and decorative status text.

Use direct nouns for destinations:

- Chat
- Support Inbox
- Knowledge Base
- Internal note
- Suggest reply

Use tooltips and accessible labels for icon-only actions instead of placing permanent explanatory text beside them.

### 3.2 Separation creates clarity

The customer and operator experiences are separate floating surfaces. Their physical separation makes the two roles understandable while preserving the feeling of one connected system.

The layout must not collapse into one undifferentiated beige or gray area. The page background provides atmosphere; the glass shells provide structure; the quiet, lighter working areas provide focus.

### 3.3 Glass is architecture, not decoration

Glassmorphism is reserved for major structural layers:

- Floating navigation.
- Chat shell.
- Support shell.
- Shell headers.
- Composer docks.

Do not apply blur, transparency, glow, gradients, and shadows to every control. Content, text, messages, and buttons should remain crisp.

### 3.4 White space carries hierarchy

The UI avoids excessive cards, borders, labels, and nested containers. It uses:

- Generous message spacing.
- Narrow, readable content measures.
- Thin semantic dividers.
- Quiet working surfaces.
- Compact control clusters.

### 3.5 Color communicates authorship and state

Color is functional:

- Cobalt/primary indicates AI, action, focus, selection, and unread state.
- Green/success indicates a live human teammate or completed handoff.
- Amber/warning indicates private internal notes.
- Neutral foreground and muted text carry customer content and metadata.

Color must never be the only state indicator. Pair it with position, iconography, labels, or shape.

### 3.6 Desktop density, consumer-level simplicity

The operator side may contain inbox filters, statuses, AI assistance, notes, and a knowledge editor, but it should still feel approachable. Controls are compact and located where experienced users expect them.

## 4. Information architecture

```text
Chat Workspace
├── Floating command bar
│   ├── Aliya Koy
│   ├── Back to Lab
│   ├── Current product: Chat Workspace
│   ├── Reset demo
│   └── Theme toggle
├── Customer surface: Chat
│   ├── Header
│   │   └── Request human support
│   ├── Conversation
│   └── Customer composer
└── Operator surface
    ├── Header
    │   ├── Support Inbox or Knowledge Base
    │   └── View toggle
    ├── Support Inbox view
    │   ├── Conversation filters
    │   ├── Thread list
    │   ├── Active conversation
    │   ├── Status actions
    │   ├── AI suggested reply
    │   └── Agent composer / internal note
    └── Knowledge Base view
        ├── Document metadata
        ├── Plain-text editor
        └── Reset / Save actions
```

## 5. Application shell

### 5.1 Page frame

The page is an isolated product-tool shell. It does not use the public portfolio navigation, footer, editorial section spacing, profile links, or homepage content.

Requirements:

- Occupy the available viewport height.
- Prevent the full document from growing as conversations become longer.
- Keep major panels fixed within the viewport.
- Give each conversation region its own vertical scrolling context.
- Maintain a centered maximum working width of `1320px`.
- Use mobile gutters of `12px` and larger gutters of `20px`.

### 5.2 Atmospheric background

The background uses the portfolio's blue flower hero image as a blurred environmental layer.

Applied treatment:

- Oversized image extending beyond the viewport.
- Heavy blur and controlled saturation.
- Blue-primary radial veil.
- Theme-aware opacity.
- Fine grain layer for material depth.
- Decorative layers are non-interactive and ignored by assistive technology.

The atmosphere should remain visible around and subtly through the glass shells, but never reduce text contrast.

### 5.3 Floating command bar

The command bar is centered above the workspace rather than stretched across the viewport.

Structure:

- Brand: `ALIYA KOY`.
- Hairline separator.
- Independent neutral back button.
- Filled active-product pill: `Chat Workspace`.
- Hairline separator.
- Icon-only reset action.
- Theme toggle.

Important behavior:

- The back arrow belongs to navigation, not to the selected page pill.
- Reset is icon-only and has an accessible name and tooltip.
- The current product name is concise and does not include company, live status, or redundant workspace metadata.
- All interactive targets should be at least approximately `36–44px`.

Applied visual values:

- Height: approximately `54px`.
- Full pill radius.
- Surface opacity: approximately 95%.
- One-pixel semantic border.
- Strong background blur.
- Soft, wide, low-opacity shadow.

## 6. Workspace composition

### 6.1 Desktop layout

At `1024px` and wider:

- Two-column grid.
- Customer chat width: `360px`.
- Operator panel: remaining available width.
- Gap between surfaces: `16px`.
- Both panels have equal height.
- Both panels scroll internally rather than expanding the page.

The narrow customer panel deliberately resembles a real support chat widget. The wider operator panel supports inbox management and conversation work.

### 6.2 Panel shell

Each major surface is a floating glass shell with:

- `20px` outer corner radius.
- Subtle one-pixel border and inset highlight.
- Soft elevation, not a heavy card shadow.
- Strong backdrop blur with mild saturation.
- Hidden overflow so headers and composer docks remain visually contained.

The shell is visually divided into:

1. A translucent header.
2. A lighter, quieter content area.
3. A floating composer dock.

### 6.3 Surface hierarchy

The page should show four distinct depth levels:

1. Atmospheric canvas.
2. Floating glass shell.
3. Light working surface.
4. Interactive control or message state.

Avoid placing an opaque beige fill across all four levels. The working interior should read as white or near-white in light mode and as a quiet elevated dark surface in dark mode.

## 7. Typography

The Chat Workspace intentionally uses an application-specific native typography stack:

- UI and body: `-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `Helvetica Neue`, sans-serif.
- Headings: `SF Pro Display` where available, falling back to the native system stack.
- Metadata: `SFMono-Regular`, Menlo, Monaco, Consolas, monospace.

This typography override is scoped to `.rag-workspace`; it does not replace the public portfolio typography.

Applied hierarchy:

| Role | Size | Weight | Notes |
| --- | ---: | ---: | --- |
| Panel title | 17px | 600 | Tight, native application heading |
| Standard message | 14px | 400 | Relaxed line height |
| Compact button | 11–12px | 500 | Short labels only |
| Author label | 10–12px | 500 | Clear but subordinate |
| Timestamp / metadata | 10px | 400 mono | Muted and precise |
| Knowledge editor | 12px mono | 400 | Readable source-like text without IDE chrome |

Do not use oversized marketing typography inside the tool.

## 8. Customer Chat specification

### 8.1 Header

The header contains:

- Title: `Chat`.
- Right-aligned human support action.

Before handoff, the action uses a headset icon. After handoff, it becomes a green confirmation icon. The icon must have a tooltip and accessible name.

Do not include:

- A redundant chat icon.
- A `Message` label above the composer.
- `You · customer simulator`.
- Workspace status copy.
- A large “request human” button in the message composer.

### 8.2 Initial state

The chat begins with a useful greeting from Daydream Club:

> Hi, welcome to Daydream Club. I’m here to help with memberships, transfers, cards, and account access. What can I help you with today?

There are no preloaded customer questions, fake conversations, quick-suggestion chips, or unrelated personas.

### 8.3 Conversation behavior

The assistant should:

- Respond naturally to greetings and thanks.
- Use conversational context from recent messages.
- Ground policy answers in the editable knowledge base.
- Avoid inventing unsupported information.
- Offer human support when the answer is unavailable or account-specific.
- Stop automated replies after a human handoff begins.

The interface should display a compact loading state while the assistant checks the knowledge base.

### 8.4 Message presentation

Customer messages:

- Right aligned in Chat.
- No surrounding bubble or border.
- Plain foreground text.
- Author and timestamp remain visible in muted metadata.

AI assistant messages:

- Left aligned.
- Borderless pale cobalt background.
- Rounded shape with a subtly directional top-left corner.
- Author: `Daydream Club`.

Live support messages:

- Left aligned in Chat.
- Borderless pale green background.
- Author: `Support`.
- Visually distinct from automated assistant messages.

Message width is capped at approximately `280px` within the `300px` conversation measure.

### 8.5 Human handoff

A handoff may start from:

- The headset icon in the Chat header.
- A natural-language request containing intent such as “human,” “person,” “agent,” or “live support.”
- A future quick action, if added, provided it does not clutter the default UI.

When handoff begins:

- The support thread becomes open and unread.
- An internal system note records the request.
- A toast confirms that the support request was sent.
- Chat displays: `You’re now speaking with a Daydream Club support teammate.`
- The headset action changes to a success state.
- Automated assistant replies stop.
- Subsequent customer messages wait for the live agent.

### 8.6 Customer composer

The composer is a docked glass surface visually separated from the message history.

Requirements:

- Maximum inner width: `300px`.
- Placeholder: `Write a message…`.
- Minimum textarea height: approximately `68px`.
- Send icon placed inside the lower-right corner.
- `Enter` sends.
- `Shift + Enter` creates a line break.
- Send is disabled when the trimmed draft is empty.
- Focus returns to the textarea after sending.

## 9. Support Inbox specification

### 9.1 Header

The operator surface header contains:

- Dynamic title: `Support Inbox` or `Knowledge Base`.
- One icon-only toggle on the opposite side.

The knowledge base is not a modal. Opening it replaces the right-panel inbox content in place. The toggle changes from a book icon to an inbox icon so the return path is always obvious.

### 9.2 Inbox navigation

The support inbox contains compact filters:

- All conversations.
- Open.
- Pending.
- Resolved.

Each filter includes a count. The active filter uses a filled surface, border, and stronger text weight. Counts use the mono metadata style.

The initial demo contains only one believable thread:

- Name: `Customer`.
- Initials: `CU`.
- Preview: latest message or current event.

Do not seed extra fictional people merely to make the inbox appear busy.

### 9.3 Conversation list

Thread rows include:

- Compact initials mark.
- Customer name.
- Latest-message preview.
- Unread indicator when needed.

Rows should be dense but touchable. The selected thread uses a quiet light treatment rather than a strong colored card.

### 9.4 Active conversation

The conversation canvas uses a centered maximum width of `720px`.

Message alignment is mirrored from the agent's perspective:

- Customer content is left aligned and has no bubble.
- AI or support content is right aligned and uses authorship color.
- Internal notes remain centered within the flow.

A compact `Today` or `Resolved` divider establishes chronology without a large conversation header.

### 9.5 Status actions

`Snooze` and `Resolve`/`Reopen` live at the upper-right of the active conversation area.

They must:

- Look visibly clickable.
- Use compact outlined button treatment.
- Include both icon and label.
- Remain outside the global panel header.
- Stay close to the conversation they affect.

`Resolve` uses a restrained primary tint. Once resolved, it changes to `Reopen`.

### 9.6 Agent composer

The agent composer is docked at the bottom of the active conversation and constrained to `720px`.

Default behavior:

- Typing and pressing `Enter` sends a customer-facing reply.
- `Shift + Enter` creates a line break.
- There is no redundant `Reply` mode tab.
- The send control is an icon inside the text field.

Internal note behavior:

- `Internal note` is a compact mode control above the field.
- Activating it changes the field's placeholder and applies an amber-tinted treatment.
- Sending creates a private note and returns the composer to reply mode.
- Private notes never appear in the customer Chat panel.

### 9.7 AI reply assistance

`Suggest reply` is a secondary operator action positioned above the composer.

Behavior:

- Disabled until a customer question exists.
- Checks the knowledge base.
- Displays a compact in-flow loading state.
- Presents the suggestion as a narrow cobalt-accented insert, not a modal.
- Allows `Insert draft`, `Make warmer`, or dismiss.
- Never sends automatically.
- Falls back gracefully if the AI endpoint is unavailable.

## 10. Knowledge Base specification

### 10.1 Product model

The knowledge base is one editable source of truth, not a collection of fake companies or four source cards.

It should feel like a simple document editor:

- One document.
- One plain-text editing area.
- Minimal metadata.
- Clear save behavior.

It should not resemble:

- An IDE.
- A file explorer.
- A database administration tool.
- A multi-tenant company picker.
- A modal overlay.

### 10.2 Layout

The Knowledge Base view replaces the Support Inbox within the same right-hand panel.

It contains:

- Compact document strip with book icon.
- Filename: `knowledge.md`.
- Character count.
- Large flexible textarea.
- Secondary `Reset` action.
- Primary `Save` action.

The editor fills the remaining panel height and scrolls internally.

### 10.3 Persistence

Saving:

- Updates the active knowledge used by customer answers and suggested replies.
- Persists the content locally for the demo.
- Closes the editor and returns to Support Inbox.
- Confirms success with a toast.

The Save action is disabled when no changes exist.

Reset restores the supplied Daydream Club default content in the draft; it does not silently save.

## 11. Visual tokens and material behavior

The implementation must use semantic tokens rather than hardcoded structural colors.

Core application tokens:

| Token | Role |
| --- | --- |
| `tool-canvas` | Base application canvas beneath atmosphere |
| `tool-panel` | Glass shell and panel material |
| `tool-emphasis` | Inputs, selected rows, editor surface |
| `surface` | Floating command bar |
| `surface-control` | Active compact controls and AI assist |
| `surface-featured` | Stronger local selection |
| `border` | Hairlines and shell boundaries |
| `border-strong` | Inputs and controls needing clearer affordance |
| `primary` | AI, action, focus, unread, selected emphasis |
| `success` | Live teammate and completed handoff |
| `warning` | Internal/private note |

Material rules:

- Use `color-mix()` with semantic tokens to preserve theme adaptation.
- Use transparent token mixtures for glass surfaces.
- Keep shell shadows wide and low contrast.
- Prefer inset one-pixel highlights to glossy gradients.
- Do not use raw white as a structural assumption; use theme-aware light surfaces.
- Dark mode must be designed, not generated by adding local `dark:` fill overrides.

## 12. Icons and controls

The applied Chat Workspace uses Lucide icons for its compact application controls. Keep one icon family within a product shell.

Icon rules:

- Typical icon size: `14–16px`.
- Icon-only button size: `28–36px`, with an adequate surrounding touch target where possible.
- Use familiar symbols: back, reset, theme, headset, inbox, book, clock, check, note, wand, send.
- Avoid decorative icons beside obvious section titles.
- Every icon-only button requires an accessible name.
- Tooltips clarify non-obvious actions.

Buttons should use three levels:

1. Primary filled action for Save and Send.
2. Outlined compact action for status changes and Reset.
3. Ghost/icon action for view switches and utility controls.

## 13. Motion

Motion is brief and functional.

Applied transitions:

- Right-panel view change: `180ms`, fade plus `5px` horizontal movement.
- New message: `160ms`, fade plus `3px` vertical movement.
- Hover and focus transitions: color or opacity only, generally `150–200ms`.

Motion must:

- Clarify that content changed in place.
- Never delay interaction.
- Avoid springy, playful, or attention-seeking movement.
- Be removed when `prefers-reduced-motion: reduce` is active.

## 14. Responsive behavior

### 14.1 Desktop, 1024px and wider

- Two independent columns.
- Chat fixed at `360px`.
- Support fills remaining width.
- Inbox sidebar is `190px`.
- Each shell fills available workspace height.

### 14.2 Tablet, 768–1023px

- Major surfaces stack vertically.
- Each surface remains a complete, independently scrollable product area.
- The support inbox sidebar moves above the active conversation.
- Header, controls, and composer remain full fidelity.
- No desktop control may become inaccessible due to clipping.

### 14.3 Mobile, below 768px

- Single-column composition.
- `12px` outer gutters.
- Each panel uses viewport-relative height.
- Command bar remains compact and horizontally stable.
- Decorative separators may hide when space is limited.
- Labels must truncate safely rather than overflow.
- Message and composer widths use the available panel width while retaining comfortable side padding.

### 14.4 Reflow requirements

- No horizontal document overflow at `320px`.
- Remain usable at 200% text zoom.
- Long messages wrap.
- Long conversations scroll inside their content region.
- Composer actions remain visible when the software keyboard is present where browser behavior allows.

## 15. Accessibility requirements

- Use semantic `header`, `nav`, `main`, `section`, `aside`, and button elements.
- Give navigation an accessible label.
- Provide visible focus rings on every interactive control.
- Give all icon-only actions accessible names.
- Preserve tooltips as a supplement, never as the only accessible label.
- Maintain sufficient contrast through semantic light and dark tokens.
- Do not communicate status by color alone.
- Disable send/save controls when their action is unavailable.
- Preserve keyboard send behavior without preventing multiline entry.
- Announce important asynchronous outcomes through the existing toast system or an appropriate live region.
- Respect reduced-motion preferences.
- Keep touch targets comfortably operable.

## 16. Content and voice

The product voice is:

- Warm.
- Concise.
- Competent.
- Calm under uncertainty.
- Honest when information is unavailable.

Interface copy should use sentence case and familiar terms. Avoid SaaS filler such as:

- “Supercharge your workflow.”
- “AI-powered knowledge experience.”
- “Manage your customer interactions seamlessly.”
- “Customer simulator.”
- “Agent bench.”

The UI should not explain concepts that are already clear from placement and standard controls.

## 17. State model

The UI must account for the following states:

### Chat

- Initial greeting.
- Customer draft empty or ready.
- Assistant loading.
- Assistant response.
- Human handoff requested.
- Live support reply.
- API unavailable with local fallback.

### Inbox

- All/open/pending/resolved filter selected.
- Thread read or unread.
- Conversation open, pending, or resolved.
- Empty filtered view.
- Agent reply draft.
- Internal note mode.
- Suggested reply loading, ready, inserted, or dismissed.

### Knowledge Base

- Unchanged.
- Edited.
- Reset draft.
- Save disabled or enabled.
- Saved successfully.
- Local persistence unavailable.

### Global

- Light mode.
- Dark mode.
- Reset demo.
- Reduced motion.
- Mobile, tablet, and desktop layouts.

## 18. Error and fallback behavior

- An unavailable AI endpoint must not break the demo journey.
- Customer questions use a local, knowledge-shaped fallback response.
- Suggested replies use a local fallback and explain via toast that the API key enables Gemini replies.
- Local storage failure must leave the current session usable.
- Empty drafts do nothing and keep send controls disabled.
- Unsupported knowledge questions must not produce fabricated policies.

## 19. What Design Studio should inherit

Design Studio should inherit the system's product qualities, not its chat-specific component arrangement.

| Chat Workspace pattern | Design Studio translation |
| --- | --- |
| Atmospheric blue blurred canvas | Same environmental background treatment |
| Centered floating command bar | Design Studio-specific product title and utilities |
| Two floating glass shells | Separate navigation/control surface and primary preview/work surface |
| Compact translucent panel headers | Short titles with one contextual action cluster |
| Quiet light working interiors | Token editor, preview canvas, and inspector surfaces |
| Narrow Chat panel | Compact studio navigator or control rail |
| Wide Support panel | Main live preview and editing workspace |
| In-place Inbox/Knowledge switch | In-place Studio modes rather than stacked modals |
| Semantic authorship colors | Semantic token categories, validation, and selected states |
| Docked composers | Docked edit/action trays where continuous input is required |
| Internal scrolling | Fixed-height studio with independently scrolling regions |
| Minimal labels | Familiar controls, tooltips, and progressive disclosure |
| Brief state transitions | Fast mode and preview transitions |

### 19.1 Required shared principles for Design Studio

Design Studio must:

- Use the same atmospheric canvas and glass material family.
- Use the same compact centered navigation grammar.
- Break the tool into clearly separated floating work surfaces.
- Reserve white or near-white interiors for focused work.
- Remove unnecessary headings, helper paragraphs, and decorative cards.
- Keep controls close to the object they affect.
- Use semantic tokens for all structural color.
- constrain page growth and scroll within panels.
- Match the same corner-radius, border, shadow, and blur discipline.
- Preserve full light and dark mode quality.

### 19.2 Elements Design Studio should not copy literally

Design Studio should not inherit:

- Chat message bubbles.
- Customer/support authorship conventions.
- Inbox statuses.
- Human handoff language.
- Knowledge-grounded conversational copy.
- A forced `360px / flexible` split if its tools need a different ratio.

The layout should be derived from task needs while retaining the same material and interaction principles.

## 20. Non-goals

This applied UI does not attempt to provide:

- Authentication or multiple real agents.
- A production ticketing backend.
- Multiple organizations or fake company workspaces.
- Multiple knowledge source ingestion.
- File upload, vector indexing, or source citations.
- Full customer identity records.
- Analytics dashboards.
- A run inspector.
- A code editor or IDE experience.
- A complete ManyChat, Intercom, or Botpress clone.

These may be future product features, but they must not be simulated with empty UI.

## 21. Acceptance criteria

The Chat Workspace UI is complete when:

1. The page opens with one Daydream Club greeting and no fake customer history.
2. A tester can ask a knowledge-based question and receive a natural reply.
3. A greeting such as “hi” receives a conversational response.
4. Human support can be requested from the header or through natural language.
5. Handoff status is visible in Chat and arrives in Support Inbox.
6. An agent reply sent from Support Inbox appears live in Chat with human styling.
7. Customer text has no bubble.
8. AI and human replies use different borderless colored backgrounds.
9. Internal notes remain private to Support Inbox.
10. Snooze and Resolve/Reopen are visibly actionable and positioned inside the conversation area.
11. Knowledge Base replaces Support Inbox in place and returns through the inbox icon.
12. Editing and saving the knowledge base affects subsequent AI behavior.
13. Long conversations scroll inside panels without increasing the document height.
14. The background, command bar, shells, working surfaces, and controls form a clear four-level depth hierarchy.
15. Light and dark modes preserve contrast and material depth.
16. The UI works at 375px, 768px, and 1280px or wider.
17. All icon-only actions are keyboard accessible and have accessible names.
18. Reduced-motion users do not receive message or view entrance animations.
19. Lint and production build complete successfully.
20. The result remains understandable without introductory instructions or persistent helper copy.

## 22. Implementation reference

The current applied UI is implemented primarily in:

- `src/components/rag/agent-desk.tsx`
- `src/index.css`
- `src/components/blurred-background.tsx`
- `src/components/tool-shell.tsx`

The authoritative shared portfolio tokens and accessibility baseline remain in:

- `DESIGN.md`
- `src/index.css`

When Design Studio adopts this pattern, shared material rules should be extracted only where doing so improves consistency. Domain-specific component logic should remain separate.
