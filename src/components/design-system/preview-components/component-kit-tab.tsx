import { type PreviewTabId } from "../preview-panel"
import ColorPaletteSection from "./foundation/color-palette-section"
import TypographySection from "./foundation/typography-section"
import SpacingSection from "./foundation/spacing-section"
import ElevationSection from "./foundation/elevation-section"
import ButtonsPreview from "./buttons-preview"
import FormsPreview from "./forms-preview"
import TabsPreview from "./tabs-preview"
import { useDesignTokens } from "@/lib/design-tokens-store"

interface FoundationTabProps {
  onNavigateToTab?: (tab: PreviewTabId) => void
}

function SectionCard({
  id,
  label,
  description,
  children,
  onViewIn,
}: {
  id: string
  label: string
  description: string
  children: React.ReactNode
  onViewIn?: () => void
}) {
  return (
    <div id={id} className="scroll-mt-4">
      <div className="mb-6 border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          {onViewIn && (
            <button
              onClick={onViewIn}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              See in Components →
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function ComponentKitTab({ onNavigateToTab }: FoundationTabProps) {
  const state = useDesignTokens()

  return (
    <div
      className="mx-auto max-w-4xl px-6 py-8"
      style={{ fontFamily: state.fonts.body ?? "Inter" }}
    >
      <div className="mb-10">
        <h1
          className="text-xl font-bold text-foreground"
          style={{ fontFamily: state.fonts.display ?? "Archivo Narrow" }}
        >
          Design Foundation
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Core design tokens powering every component. Changes in the left panel reflect here in real time.
        </p>
      </div>

      <div className="space-y-12">
        <SectionCard
          id="color"
          label="Color Palette"
          description="Brand, semantic, and surface colors with live contrast"
          onViewIn={() => onNavigateToTab?.("dashboard")}
        >
          <ColorPaletteSection />
        </SectionCard>

        <SectionCard
          id="typography"
          label="Typography Scale"
          description="Display, body, and monospace font specimens with adjustable weights"
        >
          <TypographySection />
        </SectionCard>

        <SectionCard
          id="spacing"
          label="Spacing & Grid"
          description="Visual spacing scale and border radius tokens"
        >
          <SpacingSection />
        </SectionCard>

        <SectionCard
          id="elevation"
          label="Elevation"
          description="Shadow presets from subtle to prominent"
        >
          <ElevationSection />
        </SectionCard>

        <SectionCard
          id="buttons"
          label="Buttons"
          description="All button variants, sizes, and states"
          onViewIn={() => onNavigateToTab?.("dashboard")}
        >
          <ButtonsPreview />
        </SectionCard>

        <SectionCard
          id="forms"
          label="Form Inputs"
          description="Input, textarea, select, checkbox, radio, switch, slider"
        >
          <FormsPreview />
        </SectionCard>

        <SectionCard
          id="tabs"
          label="Tabs & Navigation"
          description="Tab variants, breadcrumbs, and separators"
        >
          <TabsPreview />
        </SectionCard>
      </div>
    </div>
  )
}
