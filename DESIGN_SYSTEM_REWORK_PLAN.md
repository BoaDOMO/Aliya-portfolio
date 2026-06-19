# Design System Page — Execution Rework Plan

> Status: **Draft** | Date: **2026-06-18**
> Scope: Rework the `/design-system` page execution. The feature set (color harmony, style presets, typography, live preview, exports, quality checks) is sound; the **execution** (layout hierarchy, preset depth, accessibility surface, mobile, interaction polish) is poor. Two headline feature additions: **preset-tailored webviews** (each preset gets its own designed webview) and a **print-ready Spec view** (Foundation → PDF-exportable design-language document).

---

## Locked Decisions

| Decision | Choice |
|----------|--------|
| Layout | **Hybrid 3-pane** — desktop ≥1280px (Inputs \| Preview \| Export+Quality), laptop 768–1279px (2-pane + slide-over), mobile <768px (curated single-pane) |
| Preset depth | **Full integration** — `--preset-*` vars thread into all inner preview components, not just outer frames |
| Webview scope | **8 individual webviews** — each preset gets its own tailored webview (SaaS, editorial, smart-home panel, etc.). Shared-sections architecture keeps it maintainable |
| Typography adapt | **Auto-adapt, user-overrideable** — selecting a preset auto-loads its recommended fonts + scale; a "Match preset" toggle lets the user opt out; manual font picks win and flip the toggle off |
| Foundation location | **Moves out of preview tabs** → becomes a dedicated, print-optimized **Spec view** at `/design-system/spec` for PDF export |
| Preview tabs | **Webview** \| **Components** (Foundation removed to Spec view) |
| Mobile | **Curated subset** — expose only high-impact controls; deep editors desktop-only |
| Editors | **Inline sections**, not overlapping drawers. Drawers reserved for deep editors (shade scale, font browser) |
| Backward compat | Preserve existing `?theme=` and `?t=` URL formats |

---

## Diagnosis — Where Execution Falls Short

### 1. Information architecture is muddled
- Left panel stacks 4 zones at the same visual weight: actions (Random/Export), Style preset row, Colors block, Typography block. No hierarchy.
- "Style" is represented 3 ways: sidebar icon, inline row, and drawer. Redundant and confusing.
- The 52px sidebar's 3 icons (Style/Color/Typography) open drawers that **cover the panel you clicked from**. Two paths to the same editors.
- Presets only affect *outer* preview cards; inner components still use solid `bg-card`. Glass/Neumorphic/Outline look nearly identical inside the preview. Headline feature under-delivers.

### 2. Tab naming & ordering is backwards
- Order is Application → Components → Foundation. Foundation (the actual tokens) is last and least prominent.
- Labels aren't parallel: "Application" (a furniture store mock) vs "Components" vs "Foundation".

### 3. Quality/accessibility is hidden
- 4 status icons crammed into one toolbar button; details only in a dialog.
- CVD simulation lives *inside* that dialog — can't see the effect while toggling it.
- `exportReady` gate is only visible in the dialog.
- No inline WCAG warnings on the failing swatches themselves (industry standard now).

### 4. Drawer pattern is fragmented
- Color/Typo/Style drawers slide in from the left at 380px and **overlap the left panel**. Clicking a swatch in the panel opens a drawer on top of the panel — disorienting.
- No focus trap (only Escape). Click-outside and X both close — inconsistent affordance.
- Mobile: 380px drawer is wider than a phone.

### 5. Polish & interaction gaps
- No click-to-copy hex on swatches. Clicking only opens the drawer.
- No undo/redo (only a one-shot toast undo on Random).
- No persistence — refresh loses work unless exported. Saved Themes listed as backlog.
- "Split View" is a hack: `filter: invert(1)` + forced bg colors. Not a true light/dark or before/after compare.
- Random Theme button uses `bg-muted` (reads primary-ish) next to Export's `bg-primary` — inverted visual priority.
- No onboarding/empty state for first-time visitors.

### 6. Bugs
- **Nested `<button>` hydration error** in the Data Table playground (`DropdownMenuTrigger` wrapping a `Button` → button-in-button). Console error on every Components tab load.

---

## Brainstorm — Directions Considered

### A. Layout: 2-pane vs. 3-pane vs. hybrid
- **2-pane + drawers (current)**: less width pressure, but editors are modal/disorienting.
- **3-pane always (Koder-style)**: Inputs | Preview | Export/Quality. Cleanest model, tight on <1280px.
- **Hybrid (chosen)**: 2-pane on laptop, 3-pane on xl; drawers only for deep editors. Best of both.

### B. Where Style presets live
- Inline section (prominent) vs. hidden drawer+row (current). Presets are a *primary* decision — should be near the top, visible, with live mini-previews, not a text list.

### C. Preset component integration depth
- Outer-only (current) vs. outer + key components vs. **full integration (chosen)**. Full integration is the single biggest "idea vs execution" gap.

### D. Quality surface
- Dialog (current) vs. **persistent rail + inline swatch warnings (chosen)**. Move CVD toggle into toolbar for live preview.

### E. More preview templates
- Current: 1 landing mock. ColorUI ships 10. Adding 2–3 (dashboard, auth) makes the system feel real. Tradeoff: more code to maintain.

### F. Mobile strategy
- Force full editor (unrealistic) vs. **curated subset (chosen)** vs. read-only share-only. Curated subset = Random, Primary color, Harmony, Style strip, Mode toggle. Deep editing is desktop-only.

### G. One-size-fits-all webview vs. preset-tailored webviews
- **One shared webview re-skinned (current)**: the furniture landing fights presets like Minimal/Neumorphic/Glass — image-heavy commerce is the wrong habitat for all three. Presets look "the same" because the page doesn't fit them.
- **4 grouped webviews by vibe**: SaaS / Lifestyle / Editorial / App. Less code, but presets within a group still look similar — only half-fixes the gap.
- **8 individual webviews (chosen)**: each preset gets its natural habitat. The furniture page dies; each preset shows a page designed for its aesthetic. Shared-sections architecture (80% shared primitives, 20% thin composition files) keeps maintenance affordable. Maximizes the "wow, each preset is a different world" effect.

### H. Where Foundation lives + how it exports
- Foundation inside preview tabs (current): buried, last, not exportable.
- **Dedicated Spec view + `window.print()` PDF (chosen)**: Foundation moves to `/design-system/spec` as a print-optimized design-language document (cover, TOC, color tokens, type scale, spacing/radius/shadow, component samples, accessibility report, export appendix). Zero-dep PDF via native print + `@media print` stylesheet; no `html2canvas`/`jspdf` rasterization. Mirrors StyleSnap/Tokken's "print-ready style guide" pattern.
- Tradeoff considered: `react-to-print` wrapper for one-click feel — optional, low-weight, only if native `window.print()` feels too manual.

### I. Typography behavior on preset switch
- **Advisory only (suggest, don't apply)**: weakest "adapt" feel — user must explicitly accept.
- **Fully locked to preset**: cleanest but most prescriptive — user can't override until "Custom" mode.
- **Auto-adapt, user-overrideable (chosen)**: selecting a preset auto-loads its fonts + scale; manual picks flip a "Match preset" toggle off (user wins). Scale adapts with fonts unless user has explicitly overridden a size. Best balance of magic and control.

---

## Phased Execution Plan

### Phase 0 — Critical Bug Fix (do first, unblocks trust)

1. **Fix nested-`<button>` hydration error** in `src/components/design-system/preview-components/playgrounds/data-table-playground.tsx`: `DropdownMenuTrigger` wraps a `Button` which renders its own `<button>`. Use Base UI's `render` prop / `asChild` equivalent so only one `<button>` is in the DOM.
2. **Audit all playgrounds** (`dropdown-playground`, `select-playground`, `command-playground`, `dialog-playground`) for the same button-in-button nesting pattern.
3. **Verify**: load Components tab, confirm zero console errors.

### Phase 1 — Information Architecture & Layout

4. **Rename + reduce preview tabs** to `Webview` | `Components` (Foundation removed — relocates to Spec view in Phase 3). "Application" → "Webview" (better term for a live styled page). Parallel labels.
5. **Restructure left panel into 3 visual zones** with distinct treatment:
   - **Zone A — Actions**: `Randomize` (outline/secondary) + `Export` (primary) + Saved Themes entry. Fix inverted visual priority (Random currently `bg-muted` reads primary-ish).
   - **Zone B — Style**: first-class horizontal preset strip with live mini-previews (replaces the text row + drawer). 8 presets as small visual chips, not a text list.
   - **Zone C — Tokens**: Colors + Typography as collapsible accordions (Colors open by default). Progressive disclosure — show Core palette + harmony always; neutrals/states/typography fine-tuning collapsed under "Advanced".
6. **Remove the redundant 52px sidebar icons** (Style/Color/Typography) — they duplicate the inline sections. Keep only the collapse toggle. One mental model: inline sections.
7. **Desktop ≥1280px: add right pane** = Export zone + persistent Quality rail. Left = Inputs, center = Preview, right = Export/Quality.
8. **Laptop 768–1279px**: 2-pane (Inputs | Preview); Export/Quality becomes a slide-over triggered from the toolbar.
9. **Drawers** remain only for deep editors: shade-scale picker, font-browser modal. Add **focus trap + focus restore on close**. Consistent close affordance (Esc + backdrop + X all work).

### Phase 2 — Preset Deep Integration (the big idea-vs-execution gap)

10. **Thread `--preset-*` vars into inner preview components**, not just outer frames: Cards, Buttons, Inputs, Badges, Dropdowns, Dialogs, Tabs, etc. in `src/components/design-system/preview-components/`. Use:
    ```css
    background: oklch(from var(--card) l c h / var(--preset-bg-opacity));
    border: var(--preset-border-width) solid oklch(from var(--border) l c h / var(--preset-border-opacity));
    box-shadow: var(--preset-shadow);
    backdrop-filter: var(--preset-backdrop);
    ```
11. **Apply `--preset-radius`** to all rounded surfaces in preview components (currently many hardcode `rounded-xl`). Route through `style={{ borderRadius: "var(--preset-radius)" }}` or a `rounded-preset` utility class.
12. **Verify visual differentiation**: screenshot each preset (Glass, Neumorphic, Outline, Minimal, Material, Soft, Floating, Flat) against the **Webview tab** (was "Showcase"). They must look visibly distinct *inside* the preview, not just on the outer card.

### Phase 2B — Preset-Tailored Webviews + Typography Profiles

> Depends on Phase 2 (webview sections read `--preset-*` vars that Phase 2 threads through components).

13. **WebviewRouter** (`preview-components/webviews/WebviewRouter.tsx`): reads `state.stylePreset.activePreset` and renders the matching preset webview. Switching preset swaps the *entire* webview (not just re-skin).

14. **Build shared sections library** (`preview-components/webviews/sections/`) — preset-aware primitives that read `--preset-*` vars:
    - `Hero.tsx`, `FeatureGrid.tsx`, `CardGrid.tsx`, `StatsBar.tsx`, `CTA.tsx`, `Footer.tsx`
    - `AppShell.tsx` (Material), `ControlPanel.tsx` (Neumorphic), `EditorialGrid.tsx` (Outline), `MediaHero.tsx` (Glass)

15. **Build 8 thin preset compositions** (`preview-components/webviews/presets/`) — each ~50–100 lines, arranges sections + passes preset-specific copy. The 8 webviews:

    | Preset | Webview | Sections | Typography profile |
    |--------|---------|----------|--------------------|
    | **Flat** | SaaS / dev-tool marketing | Centered hero → feature trio → logo strip → code block → pricing → footer | Inter + Inter Display, med-bold, 16/48 |
    | **Floating** | Fintech / SaaS marketing | Hero w/ floating product card → bento grid → testimonials → stats → CTA | Inter + Sora, bold, 16/56 |
    | **Soft** | Wellness / consumer | Rounded hero w/ illustration → soft feature cards → story → gentle CTA | Nunito/Quicksand, light, 18/52, generous spacing |
    | **Outline** | Editorial / magazine | Text-forward → serif headlines → article grid → minimal imagery | Fraunces/Playfair + Inter, 17/64 |
    | **Minimal** | Brutalist / dev tool | Stark grid → mono labels → zero radius → high contrast | JetBrains Mono everything, tight, 14/40, uppercase labels |
    | **Material** | Android-style app | App shell: top bar + nav drawer → elevated list/cards → FAB → bottom nav | Roboto/Inter, M3 type scale |
    | **Glass** | Music/weather/media | Full-bleed vibrant bg → frosted glass cards → media-heavy | Inter, light weights, 16/60, airy |
    | **Neumorphic** | Smart-home control panel | Dashboard grid → toggles/sliders/knobs → soft cards → widgets | Nunito/Inter, medium, 15/42 |

15a. **Webview content spec** — per-preset section copy (avoids lorem ipsum). Each webview's composition file uses this content:

    | Preset | Hero | Body sections | CTA |
    |--------|------|---------------|-----|
    | **Flat** | "Ship faster. Debug smarter." + subhead | Feature trio (Real-time traces / AI insights / Zero-config) → logo strip → terminal code block → 3-tier pricing (Hobby $0 / Pro $29 / Team $99) | "Start free" / "View docs" |
    | **Floating** | "Banking that moves at your speed" + floating dashboard mock | Bento grid (6 features, varied sizes) → 3 testimonials → stats bar ($2B processed / 500K users / 99.9%) | "Open account" |
    | **Soft** | "Find your calm" + soft illustration | 4 rounded feature cards (Meditation / Sleep / Breathing / Journaling) → story narrative + image | "Begin your journey" |
    | **Outline** | Big serif "The Quarterly" + issue meta | Article grid (4-6 cards: category + headline + dek) → 1-2 photos → mono section labels | "Subscribe" |
    | **Minimal** | Mono header "DEV.TOOL" | Numbered feature list (uppercase, tight) → raw terminal block → single-column pricing | "GET STARTED" |
    | **Material** | Top app bar "Inbox" + actions | Nav drawer → elevated list (avatars + text) → FAB → bottom nav (3 destinations) | (app shell, no hero CTA) |
    | **Glass** | Full-bleed gradient + now-playing widget | Frosted weather tiles → media grid (album art) → playlist cards | "Play" / "Add" |
    | **Neumorphic** | Dashboard "Living Room" + clock widget | Room grid → toggles/sliders (light intensity, temp, volume) → sensor cards | (control panel, no CTA) |

16. **Color Policy sub-section — Harmony + Light/Dark rework.** Replaces the loose per-preset color constraints with a unified, mode-aware model. Split into Harmony (16a–16e) and Light/Dark (16f–16j).

    #### Harmony Policy (16a–16e)

    16a. **Replace `forceHarmony?: HarmonyType`** in `ColorRules` (`style-preset-types.ts`) with a unified model:
    ```ts
    interface ColorRules {
      allowedHarmonies: HarmonyType[]   // permitted harmonies for this preset
      defaultHarmony: HarmonyType       // auto-applied on switch if current isn't allowed
      // ...chromaModifier, warmthBias, darkRules (see 16f), requiresScrim, requiresNeon
    }
    ```
    A forced harmony (Minimal, Neumorphic) is expressed as `allowedHarmonies: ["monochromatic"]`. `forceHarmony` is removed.

    16b. **Populate `allowedHarmonies` + `defaultHarmony`** for all 8 presets in `style-preset-presets.ts`:

    | Preset | allowedHarmonies | defaultHarmony |
    |--------|------------------|----------------|
    | Flat | all 13 (permissive escape hatch) | `shadcn` |
    | Floating | shadcn, monochromatic, analogous, complementary, split-complementary, near-complementary, analogous-accent | `analogous` |
    | Soft | monochromatic, analogous, analogous-accent, shadcn | `analogous` |
    | Outline | monochromatic, analogous, complementary, near-complementary, shadcn | `complementary` |
    | Minimal | `["monochromatic"]` | `monochromatic` |
    | Material | shadcn, analogous, complementary, split-complementary, triadic, analogous-accent | `analogous` |
    | Glass | monochromatic, analogous, complementary, near-complementary, analogous-accent | `complementary` |
    | Neumorphic | `["monochromatic"]` | `monochromatic` |

    Busy harmonies (`tetradic`, `pentadic`, `double-complementary`) are reachable only via Flat — honest, since they need Flat's multi-surface SaaS layout to land on.

    16c. **`getEffectiveHarmonyType` → `getEffectiveHarmony`** (`style-preset-utils.ts`): returns the user's choice if it's in `preset.colorRules.allowedHarmonies`, else `preset.colorRules.defaultHarmony`. Used by `computeTokens` so generation always uses an allowed harmony.

    16d. **`APPLY_STYLE_PRESET` reconciliation** (`design-tokens-store.tsx`): on preset switch, **keep-if-allowed, else snap** — if `state.harmonyType` is in the new preset's `allowedHarmonies` keep it; else set `harmonyType = defaultHarmony`. Fixes the existing state-desync bug (Neumorphic forces monochromatic but dropdown still said "Triadic"). Also rewire `RANDOMIZE_ALL` + `RANDOMIZE_COLORS` to sample from the active preset's `allowedHarmonies` instead of the hardcoded 6-harmony list (Minimal/Neumorphic random becomes "roll new primary, keep monochromatic").

    16e. **`HarmonyDropdown`** (`color-section.tsx`): render disallowed harmonies as **disabled + tooltip** (e.g. "Not available for Minimal — switch to Flat for multi-hue palettes"). Active harmony is always within the allowed set.

    #### Light/Dark Mode Policy (16f–16j)

    16f. **Make `ColorRules` mode-aware.** Replace the single-valued `chromaModifier`/`warmthBias` with per-mode objects, add a `DarkRules` block, and remove the dead `shadowOpacityLight`/`shadowOpacityDark` fields:
    ```ts
    interface ColorRules {
      allowedHarmonies: HarmonyType[]
      defaultHarmony: HarmonyType
      chromaModifier: { light: number; dark: number }   // was: number
      warmthBias: { light: number; dark: number }        // was: number
      darkRules: DarkRules                                // new
      requiresScrim: boolean
      requiresNeon: boolean
      // REMOVED: shadowOpacityLight, shadowOpacityDark (dead metadata — never read)
    }

    interface DarkRules {
      bgChroma: number              // default 0.00375
      primaryMinLightness: number   // default 0.60
      surfaceHierarchyBoost: number // default 0.08
      preserveChroma: boolean       // default false — Glass: true
    }
    ```

    16g. **`generateDarkTokens(light, preset)`** (`color-utils.ts`): accept optional preset; read `preset.colorRules.darkRules` to override the 4 derivation knobs. Defaults preserve current behavior for presets that don't override. **`applyColorRulesToTokens(tokens, preset, isDark)`** (`style-preset-utils.ts`): thread `isDark` through; pick `chromaModifier[mode]` and `warmthBias[mode]`. Both are already called twice in `computeTokens` (once per mode) — no new call sites.

    16h. **Per-preset dark profiles** (populated in `style-preset-presets.ts`):

    | Preset | chroma L/D | warmth L/D | darkRules overrides |
    |--------|-----------|-----------|---------------------|
    | Flat | 1.0 / 1.0 | 0 / 0 | defaults |
    | Floating | 1.0 / 1.0 | 0 / 0 | defaults |
    | Soft | 0.8 / 0.7 | 0 / +5° | defaults |
    | Outline | 1.0 / 1.0 | 0 / 0 | defaults |
    | Minimal | 0.9 / 0.9 | 0 / 0 | defaults |
    | Material | 1.0 / 1.0 | 0 / 0 | defaults |
    | **Glass** | 0.85 / 1.15 | 0 / 0 | `preserveChroma: true`, `bgChroma: 0.02` |
    | **Neumorphic** | 0.3 / 0.25 | 0 / +8° | defaults |

    Only Glass and Neumorphic need real dark tuning; the rest are fine with symmetric rules.

    16i. **Remove** `shadowOpacityLight` / `shadowOpacityDark` from all 8 preset definitions and the interface. No behavior change (they were never read). The explicit `boxShadow` strings in `modifiers.{light,dark}` already encode multi-shadow / layered elevation more expressively than a single opacity number.

    16j. **Verify Color Policy**:
    - Switching to Minimal/Neumorphic snaps `state.harmonyType` to `monochromatic`; dropdown reflects it (state-desync fixed).
    - Switching Floating→Material with `triadic` active keeps `triadic` (allowed in both).
    - Switching Soft→Minimal with `complementary` active snaps to `monochromatic`.
    - `RANDOMIZE_ALL` on Minimal never produces a multi-hue palette.
    - Flat's dropdown shows all 13 enabled; every other preset greys out at least the 3 busy ones.
    - Glass dark shows visibly more chroma than Glass light (screenshot diff).
    - Neumorphic dark bg matches surface field exactly (no chroma seam).
    - Soft dark is calmer (lower chroma) than Soft light.
    - Light↔dark switch on any preset: no token glitches, `exportReady` true in both modes. If `DarkRules` overrides cause `exportReady` to drop in dark (likely: Glass `preserveChroma` reducing contrast, Soft's low dark chroma), add a `minContrastFallback` step in `generateDarkTokens` that nudges foreground lightness up by +0.05 until the pair passes, then re-run `computeReport`. No preset ships with a failing dark pair.
    - No references to `shadowOpacity*` or `forceHarmony` remain; `npm run build` clean.

    16k. **State color rules**: add `stateColors: { chromaModifier: number; desaturate: boolean }` to `ColorRules` (default `chromaModifier: 1, desaturate: false`). `generateStateColors(primary, preset)` applies it. **Minimal**: `chromaModifier: 0.4, desaturate: true` (muted, near-grey states that don't break the stark aesthetic). **Neumorphic**: `chromaModifier: 0.5`. Others: defaults. Verification: Minimal's success/warning/destructive/info are visibly muted, not vivid.

17. **Add `PresetTypography` to the data model** (`style-preset-types.ts`) — includes the spacing scale (Gap A) so the preset "vibe" (Soft=airy, Minimal=tight) is fully expressed:
    ```ts
    interface PresetTypography {
      displayFont: string
      bodyFont: string
      monoFont: string
      scale: {
        display: { size: number; weight: number; letterSpacing?: string }
        body: { size: number; weight: number; letterSpacing?: string }   // letterSpacing added
        mono: { size: number; weight: number; letterSpacing?: string }   // letterSpacing added
      }
      lineHeight?: { display: number; body: number }
      density: "tight" | "normal" | "airy"        // multiplier on --spacing-* scale (0.85 / 1.0 / 1.2)
      paragraphSpacing?: number                    // em multiplier on <p> margins (e.g. 1.4 editorial, 1.0 brutalist)
      letterSpacing?: { body?: string; mono?: string }  // per-slot, in addition to display
    }
    interface StylePreset {
      // ...existing fields...
      typography: PresetTypography
    }
    ```

18. **Add `typography` profile to all 8 presets** in `style-preset-presets.ts` (per the table in step 15) — including the density + paragraphSpacing column:

    | Preset | density | paragraphSpacing | Rationale |
    |--------|---------|------------------|-----------|
    | Flat | normal | 1.0 | Standard SaaS rhythm |
    | Floating | normal | 1.1 | Slightly looser marketing |
    | Soft | **airy** | 1.3 | Wellness — generous breathing room |
    | Outline | normal | 1.4 (editorial) | Magazine paragraph rhythm |
    | Minimal | **tight** | 1.0 | Dense, no wasted space |
    | Material | normal | 1.0 | M3 standard density |
    | Glass | **airy** | 1.2 | Media app — airy over imagery |
    | Neumorphic | normal | 1.1 | Calm control panel |

18a. **Spacing generation** (`style-preset-utils.ts`): `generatePresetCssVars` emits `--spacing-scale: <multiplier>` (Soft → `1.2`, Minimal → `0.85`, etc.); existing `--spacing-sm/md/lg/...` become `calc(var(--spacing-base) * var(--spacing-scale))`. Soft/Floating breathe; Minimal/Brutalist tighten. `paragraphSpacing` is emitted as `--paragraph-spacing` and applied via a preview-scoped rule on `<p>`.

19. **Typography adapt behavior** in `design-tokens-store.tsx`:
    - New store field `typographyMatchPreset: boolean` (default `true`).
    - **Centralize font injection**: move `injectFontLink`/`removeFontLink` calls out of `font-section.tsx` into a `useEffect` in the provider that watches `state.fonts` (display/body/mono). Both manual picks *and* `APPLY_STYLE_PRESET`-driven changes flow through the same path — no parallel logic. Previous font link is removed before the new one is injected. (Fixes Gap 4: without this, `APPLY_STYLE_PRESET` sets `state.fonts.display` but Fraunces/Playfair/Nunito never load — text falls back to Inter.)
    - `APPLY_STYLE_PRESET` action: when `typographyMatchPreset === true`, also dispatch font + scale updates from the preset's `typography` profile.
    - Manual font pick (`SET_DISPLAY_FONT` etc.) flips `typographyMatchPreset = false` (user wins).
    - Scale (size/weight) adapts with fonts unless user has explicitly overridden a size (see 19a).

19a. **Per-slot override tracking** (fixes Gap 6): add `fontCustomizationOverridden: { display: boolean; body: boolean; mono: boolean }` (default all `false`) to state. `SET_FONT_SIZE` / `SET_FONT_WEIGHT` / `SET_FONT_STYLE` for a slot sets its flag to `true`. `APPLY_STYLE_PRESET` (when `typographyMatchPreset`) only overrides a slot's scale if its flag is `false`. Re-enabling "Match preset" (toggling the flag back on) clears all override flags and restores the preset's full scale. Lets the store distinguish "user picked 18px body" from "preset set 18px body".

20. **Typography UI** (`font-section.tsx`): add a **"Match preset" toggle** + a "preset-recommended" badge on each font slot when matched.

21. **Verify**: switching each of 8 presets visibly swaps the webview layout + typography; screenshots of all 8 are distinct; manual font pick flips "Match preset" off; re-enabling restores preset fonts.

21a. **Update `generate-output.ts`** so all 4 export formats emit a complete, reproducible manifest (Gap B — the "100% reproducible by any AI" guarantee):
    - **AI Context**: full narrative — preset name + modifiers + harmony + typography profile (families, scale, density, spacing) + all light tokens + all dark tokens + state colors + `DarkRules` + `requiresScrim`/`requiresNeon` flags. Structured as a prompt-ready block.
    - **Tailwind v4**: `@theme` block with every `--color-*`, `--preset-*`, `--spacing-*` (scaled), `--font-*`, `--radius-*`, `--text-*` (sizes), light + dark `:root`/`.dark`.
    - **Plain CSS**: same as Tailwind but vanilla custom properties, no `@theme`.
    - **Theme JSON**: complete `DesignTokensState` — including `typographyMatchPreset`, `PresetTypography` with spacing, `allowedHarmonies`/`defaultHarmony`, `DarkRules`.

21b. **Reproducibility verification** (adds to Phase 2B gate):
    - Paste AI Context export into a fresh project → renders match the preview for at least 3 presets (Flat, Glass, Neumorphic) in both light and dark.
    - Tailwind v4 export dropped into a clean `globals.css` → components render with correct tokens, spacing, radius, typography.
    - JSON export round-trips: `LOAD_THEME` from a pasted JSON reproduces identical preview state.
    - No raw hex/inline styles leak in exports that aren't in the token set.

21c. **URL state completeness** (`url-state.ts` + `pages/DesignSystem.tsx`) — fixes Gap 1 (and a pre-existing bug): extend `syncToURL` + `readURLTheme` to encode `typographyMatchPreset` and `fontCustomization` (the latter was never synced — size/weight/italic per slot lost on share). Use short keys (`tmp` for typography-match-preset, `fc` for font-customization) to keep URLs compact. Backward compat: missing keys fall back to defaults. Verification: share URL → recipient gets identical fonts, sizes, weights, and match-toggle state.

### Phase 3 — Quality, Accessibility & Spec View Rework

22. **Inline WCAG on swatches**: each `ColorPair`/`PaletteCard` shows a small pass/fail dot; failing pairs show the ratio + a "fix →" shortcut that opens the shade-scale drawer at the nearest passing step. Eliminates the need to open the Quality dialog for routine checks.
23. **Persistent Quality rail** (right pane on desktop, slide-over on laptop): always-visible status for WCAG / CVD / Dark / Tokens + the `exportReady` gate. No dialog for status.
24. **Move CVD simulation toggle into the preview toolbar** as a dropdown (Normal/P/D/T) so it live-updates the preview without a dialog. Keep educational copy in the Quality rail.
25. **Replace hacky Split View** (`invert(1)` filter) with a true side-by-side: two real themed containers — Light | Dark, or Before | After a pending change. Toggle from toolbar.
26. **Build the Spec view** at route `/design-system/spec` (separate route, not overlay) — Foundation content relocates here as a print-optimized design-language document:
    - **Cover** — theme name, preset, primary swatch, date, version
    - **TOC**
    - **Color tokens** — every role, light + dark side by side, with hex / RGB / HSL / OKLCH, contrast ratio per pair
    - **Type scale** — live specimens at each size + font specs
    - **Spacing / radius / shadow scales** — visual specimens
    - **Component samples** — button/input/card states
    - **Accessibility report** — WCAG table, CVD notes, export-ready gate
    - **Export appendix** — JSON / Tailwind / CSS snippets

26a. **Lift `DesignTokensProvider`** to wrap both `/design-system` and `/design-system/spec` in `main.tsx` (move the `<DesignTokensProvider>` out of `DesignSystem.tsx` up to the route element or a shared layout route). Fixes Gap 2: Spec view reads the same live state — no re-mount, no state loss on navigation between routes. Verification: edit theme on `/design-system` → navigate to `/design-system/spec` → Spec shows the edited theme, not defaults.
27. **Move Foundation content** (`preview-components/foundation/*`) into the Spec view component (`pages/DesignSystemSpec.tsx` or `components/design-system/spec-view.tsx`).
28. **PDF export via `window.print()`** + a dedicated `@media print` stylesheet (`src/styles/print.css`): page breaks between sections, A4/Letter sizing, `print-color-adjust: exact` so color swatches retain backgrounds. **Exclude Spec route from `Layout`** (fixes Gap 10) — give `/design-system/spec` its own minimal route (no Navbar/Footer/BackToTop) so print has no app chrome to hide. (Alternative: keep Layout but add `@media print { nav, footer, [data-back-to-top] { display: none } }` — less clean, more fragile; prefer route exclusion.) No `html2canvas`/`jspdf` (they rasterize text and bloat the bundle). Optional `react-to-print` wrapper for one-click feel.
29. **"Export Spec PDF" button** in the Export zone (replaces/sits beside current Export Theme) → triggers `window.print()` on the Spec route. Also add an "Open Spec" link in the preview toolbar.
30. **Mobile Spec**: read-only (no editing); "Export Spec PDF" works from the Share pane; curated mobile users get a shareable spec link + PDF.

### Phase 4 — Interaction & Persistence

31. **Click-to-copy hex** on swatches: small copy icon on hover; toast confirm. Primary click opens editor.
32. **Undo/redo stack** in `src/lib/design-tokens-store.tsx`: history of last ~30 states. **Commit semantics** (fixes Gap 8): only user-initiated actions push to history (color pick, font pick, preset switch, randomize, manual token edit) — *not* derived re-computations. Undo/redo traversal does **not** push new history entries. Toolbar buttons + `⌘Z` / `⌘⇧Z`. Replaces the one-shot Random undo toast.
33. **localStorage persistence**: autosave current state to `aliya-ds:autosave` **debounced 1s** after last state change (not on every keystroke); named saves list (`aliya-ds:saved`) saved on explicit "Save" action only. **URL sync debounced 500ms** (separate from autosave) so rapid edits don't thrash the URL or browser history. Load autosave on mount; "Clear" action. (Saved themes were a known backlog gap.)

### Phase 5 — Mobile Curated Subset (<768px)

34. **Bottom segmented switcher**: `Edit` / `Preview` / `Share` — one pane visible at a time.
35. **Curated Edit pane** exposes only: `Randomize`, Primary color picker, Harmony dropdown, Style preset strip, Mode toggle. Everything else (per-token neutrals/states editing, typography fine-tuning, shade scales, CVD sim, split view, Spec view deep-dive) hidden behind a "More tools on desktop" note.
36. **Drawers → full-screen bottom sheets** on mobile (already partial via `Sheet side="bottom"`; extend to color/typo editors).
37. **Preview tab (mobile)**: Webview only. Each of the 8 webviews must be **responsive** (fixes Gap 7) — section components use Tailwind responsive utilities (`md:`, `lg:`) so they reflow at 375px. Specific guidance: Flat's pricing table → stacked cards on mobile; Material's nav drawer → collapsible; Neumorphic's dashboard grid → single column. Components (playgrounds) hidden on mobile (too interaction-heavy). Mobile webview is a genuine preview, not a curated subset — users see their theme applied responsively. (Foundation is already in the Spec view — accessible read-only via Share pane.)
38. **Share pane**: copy short URL + QR code for opening on desktop; "Export Spec PDF" button.

### Phase 6 — Polish & Onboarding

39. **First-visit onboarding**: 3-step tooltip tour (pick a preset → adjust primary → export), dismissible, stored in localStorage.
40. **Visual polish**: replace washed-out `bg-muted/30 dark:bg-card` boxes with proper `bg-card` + `border` tokens; consistent swatch sizing; truncate hex with copy affordance.
41. **"View in Webview →" buttons** on playground cards (amends stale "Showcase" refs, fixes Gap 9): since preset webviews have no data-table equivalent, repurpose these as "Open in Webview" links that switch to the Webview tab and scroll to the *nearest equivalent section* (e.g. Data Table → Flat's pricing table; Forms → Flat's signup; Cards → any webview's card grid). If no equivalent, hide the button for that playground.
42. **Lint/typecheck/build pass** after each phase; verify `npm run build` is clean before declaring done.
42a. **Accessibility of the design-system UI itself** (fixes Gap 12):
    - Preset strip: keyboard-navigable, `role="radiogroup"`, arrow-key movement, active preset announced.
    - Harmony dropdown disabled items: `aria-disabled="true"` + tooltip via `aria-describedby`; not focusable via Tab but reachable via screen-reader.
    - 3-pane layout: `<aside role="complementary">` for Inputs + Export rails, `<main>` for Preview; landmarks announced.
    - Mobile bottom switcher: `role="tablist"`, `aria-selected` on active pane.
    - Inline WCAG swatch badges: `aria-label` with the ratio + pass/fail.
    - Verify with axe-core or Lighthouse a11y audit on `/design-system` — target ≥90.

---

## Files Touched (Indicative)

| Phase | File | Change |
|-------|------|--------|
| 0 | `playgrounds/data-table-playground.tsx` (+ audit siblings) | Fix nested-button |
| 1 | `pages/DesignSystem.tsx` | 3-pane responsive shell |
| 1 | `components/design-system/left-panel.tsx` | 3-zone restructure, remove sidebar icons |
| 1 | `components/design-system/style-preset-row.tsx` → `style-preset-strip.tsx` | Visual preset chips |
| 1 | `components/design-system/drawer-sheet.tsx` | Focus trap, deep-editor only |
| 1 | `components/design-system/preview-panel.tsx` | Reduce tabs → Webview \| Components; right-pane hook |
| 2 | `preview-components/**` | Thread `--preset-*` vars |
| 2B | `lib/style-preset-types.ts` | Add `PresetTypography`; rework `ColorRules` (allowedHarmonies/defaultHarmony, mode-aware chroma/warmth, `DarkRules`, remove dead `shadowOpacity*` + `forceHarmony`); extend `StylePreset` |
| 2B | `lib/style-preset-presets.ts` | Populate harmony policy + dark profiles + typography for all 8 presets; drop `shadowOpacity*`/`forceHarmony` |
| 2B | `lib/color-utils.ts` | `generateDarkTokens(light, preset)` — accept preset, apply `DarkRules` |
| 2B | `lib/style-preset-utils.ts` | `getEffectiveHarmony` (was `getEffectiveHarmonyType`); `applyColorRulesToTokens(tokens, preset, isDark)` mode-aware |
| 2B | `lib/design-tokens-store.tsx` | `typographyMatchPreset`; `APPLY_STYLE_PRESET` reconciles harmony (keep-if-allowed) + applies fonts/scale; `RANDOMIZE_ALL`/`RANDOMIZE_COLORS` sample from `allowedHarmonies` |
| 2B | `components/design-system/color-section.tsx` | `HarmonyDropdown` disables disallowed + tooltip |
| 2B | `components/design-system/font-section.tsx` | "Match preset" toggle + recommended badge |
| 2B | `preview-components/webviews/WebviewRouter.tsx` (new) | Routes preset → matching webview |
| 2B | `preview-components/webviews/sections/*.tsx` (new) | Shared, preset-aware section primitives |
| 2B | `preview-components/webviews/presets/*-webview.tsx` (new, 8 files) | Thin per-preset compositions |
| 2B | `preview-panel.tsx` | Render `WebviewRouter` in Webview tab |
| 2B | `lib/generate-output.ts` | Emit full manifest: typography+spacing, preset vars, dark rules, harmony policy; round-trip-safe JSON |
| 2B | `lib/url-state.ts` + `pages/DesignSystem.tsx` | Encode `typographyMatchPreset` + `fontCustomization` (pre-existing sync bug); short keys `tmp`/`fc` |
| 3 | `main.tsx` | Add `/design-system/spec` route; **lift `DesignTokensProvider`** to wrap both DS routes |
| 3 | `color-section.tsx`, `contrast-badge.tsx` | Inline WCAG dots + fix shortcut |
| 3 | `preview-panel.tsx` | CVD in toolbar, true split view, "Open Spec" button |
| 3 | `quality-status-bar.tsx`, `quality-report.tsx` | Persistent rail |
| 3 | `main.tsx` | Add `/design-system/spec` route |
| 3 | `pages/DesignSystemSpec.tsx` or `components/design-system/spec-view.tsx` (new) | Spec view — print-optimized document |
| 3 | `preview-components/foundation/*` | Move + restructure into Spec view |
| 3 | `src/styles/print.css` (new) | `@media print` rules for the Spec view |
| 3 | `left-panel.tsx` / Export zone | "Export Spec PDF" button → `window.print()` |
| 4 | `lib/design-tokens-store.tsx` | Undo/redo stack |
| 4 | `lib/url-state.ts` + new `lib/localstorage-state.ts` | Autosave + named saves |
| 4 | `color-section.tsx`, `font-section.tsx` | Click-to-copy hex |
| 5 | `pages/DesignSystem.tsx`, new `mobile-shell.tsx` | Curated mobile panes |
| 6 | new `onboarding-tour.tsx` | First-visit tour |

---

## Mobile Layout Map

```
DESKTOP ≥1280px          LAPTOP 768–1279px        MOBILE <768px
┌─────┬──────────┬────┐  ┌─────┬──────────────┐   ┌────────────────┐
│Input│ Preview  │Exp │  │Input│   Preview     │   │   [Edit|Preview│
│Pane │          │+QA │  │Pane │               │   │    |Share]     │
│     │          │    │  │     │               │   │                │
│ZoneA│          │WCAG│  │ZoneA│               │   │ (single pane) │
│ZoneB│          │CVD │  │ZoneB│               │   │                │
│ZoneC│          │Dark│  │ZoneC│               │   │  Edit = Random │
│     │          │Tok │  │     │               │   │   + Primary    │
│     │          │    │  │     │               │   │   + Harmony    │
│     │          │Ready│  │     │               │   │   + Style strip│
│     │          │Gate│  │     │               │   │   + Mode toggle│
│     │          │    │  │     │  [Export/QA →]│   │                │
└─────┴──────────┴────┘  └─────┴──────────────┘   └────────────────┘
                                                       Slide-over:
                                                       Export + Share
```

## Curated Mobile Edit Pane

| Exposed (mobile) | Hidden behind "More tools on desktop" |
|------------------|---------------------------------------|
| Randomize | Per-token neutrals editing (bg/card/border/input/ring) |
| Primary color picker | State colors (success/warning/destructive/info) |
| Harmony dropdown | Typography fine-tuning (size/weight/italic) |
| Style preset strip | Shade-scale manual override |
| Mode toggle (Light/Dark) | CVD simulation |
| Export (copy short URL + QR) | Split view |
| Export Spec PDF (read-only) | Components playgrounds |
| | Spec view deep-dive (desktop print) |

---

## Verification Gates (per phase)

- **Phase 0**: Components tab loads with zero console errors.
- **Phase 1**: All 3 breakpoints render correct pane count; no layout overflow; drawers trap + restore focus; tabs are Webview \| Components only.
- **Phase 2**: `--preset-*` vars flow through inner components; presets visibly distinct inside preview.
- **Phase 2B** (webviews + typography): switching each of 8 presets visibly swaps the webview layout + typography; screenshots of all 8 distinct; manual font pick flips "Match preset" off; re-enabling restores preset fonts.
- **Phase 2B** (typography spacing): Soft/Floating previews show visibly more padding/gap than Minimal/Brutalist; paragraph rhythm differs per preset; `letterSpacing` applies to body+mono not just display.
- **Phase 2B** (harmony policy): Minimal/Neumorphic snap to monochromatic on switch and dropdown reflects it (state-desync fixed); Floating→Material with `triadic` keeps `triadic`; Soft→Minimal with `complementary` snaps to `monochromatic`; `RANDOMIZE_ALL` on Minimal never multi-hue; Flat dropdown shows all 13 enabled; others grey ≥3; no `forceHarmony` references remain.
- **Phase 2B** (light/dark): Glass dark shows more chroma than Glass light; Neumorphic dark bg matches surface field (no seam); Soft dark calmer than Soft light; light↔dark switch on any preset keeps `exportReady` true in both modes; no `shadowOpacity*` references remain.
- **Phase 2B** (export reproducibility): AI Context pasted into a fresh project reproduces the preview for ≥3 presets in light+dark; Tailwind v4 dropped into clean `globals.css` renders correct tokens/spacing/radius/type; JSON round-trips via `LOAD_THEME`; no raw hex leaks.
- **Phase 2B** (URL state): shared URL reproduces fonts, sizes, weights, and match-toggle state; missing keys fall back gracefully; backward compat with old URLs preserved.
- **Phase 2B** (font loading): preset switch loads Fraunces/Playfair/Nunito via centralized injection; no fallback-to-Inter on preset change; manual pick + preset switch use same code path.
- **Phase 2B** (state colors): Minimal's success/warning/destructive/info are visibly muted, not vivid; Neumorphic's states are softened.
- **Phase 2B** (build): `npm run build` clean.
- **Phase 3**: Failing swatch shows inline ratio; CVD toggle live-updates preview; `exportReady` always visible; navigate `/design-system` → `/design-system/spec` preserves theme (no state loss); Spec route excludes Layout (no navbar/footer in print); `window.print()` from Spec route produces a clean multi-section PDF; color swatches retain backgrounds in print.
- **Phase 4**: Refresh preserves state; undo/redo traverses ≥10 steps without polluting history (derived re-computes don't push); autosave debounced 1s; URL sync debounced 500ms; copy-to-copy works on all swatches.
- **Phase 5**: Mobile shows only curated controls; bottom switcher works; QR + short URL valid; Spec PDF exports from Share pane; all 8 webviews reflow at 375px (pricing table stacks, dashboard grid → single column).
- **Phase 6**: `npm run build` clean; onboarding tour dismissible; no regression on existing URL share links; axe-core/Lighthouse a11y audit ≥90 on `/design-system`.

---

## Out of Scope (Backlog)

- Public gallery of saved themes — deferred.
- AI-assisted palette generation from image — deferred.
- Per-component preset variation — deferred (known backlog).
- Additional webview templates beyond the 8 preset-tailored ones (e.g. auth flows, onboarding screens) — deferred.
- One-click PDF download (vs native print dialog) via server-side rendering — deferred; native `window.print()` is the v1 path.
- Mode-specific typography weights (Glass/Soft light fonts can look thin in dark) — deferred.
- Mode-specific webview assets (Glass's vibrant bg image → darker variant via CSS `filter` or per-mode asset) — deferred.
- Full per-mode user editor (per-token shade-scale drawer already partially covers this) — deferred.

---

*Plan written: 2026-06-18*
*Updated: 2026-06-18 — Phase 2B (preset-tailored webviews + typography profiles with spacing scale + color policy: harmony + light/dark + state colors + export reproducibility + URL completeness + font injection + override tracking + webview content spec + WCAG fallback); Phase 3 Spec view + PDF export + provider lift; Phase 4 debounce/commit semantics; Phase 5 webview responsiveness; Phase 6 UI accessibility.*
*Suggested order: Phase 0 → 1 → 2 → 2B → 3 → 4 → 5 → 6. Phases 2B and 5 are highest-impact for the "idea vs execution" gap.*
