import { type PreviewTabId } from "../preview-panel"
import { useDesignTokens } from "@/lib/design-tokens-store"
import DataTablePlayground from "./playgrounds/data-table-playground"
import DialogPlayground from "./playgrounds/dialog-playground"
import DropdownPlayground from "./playgrounds/dropdown-playground"
import CardsPlayground from "./playgrounds/cards-playground"
import ToastPlayground from "./playgrounds/toast-playground"
import FormPlayground from "./playgrounds/form-playground"
import SelectPlayground from "./playgrounds/select-playground"
import AccordionPlayground from "./playgrounds/accordion-playground"
import CommandPlayground from "./playgrounds/command-playground"
import ProgressPlayground from "./playgrounds/progress-playground"
import AvatarBadgeTooltipPlayground from "./playgrounds/avatar-badge-tooltip-playground"
import TogglePlayground from "./playgrounds/toggle-playground"
import AlertPreview from "./alert-preview"

interface ComponentsTabProps {
  onNavigateToTab?: (tab: PreviewTabId) => void
}

function PlaygroundCard({
  id,
  title,
  description,
  children,
  onViewIn,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
  onViewIn?: () => void
}) {
  return (
    <div id={id} className="scroll-mt-4 rounded-xl border border-border bg-card">
      <div className="flex items-start justify-between border-b border-border px-5 py-3">
        <div>
          <p className="text-xs font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {onViewIn && (
          <button
            onClick={onViewIn}
            className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Open in Webview →
          </button>
        )}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

export default function DashboardTab({ onNavigateToTab }: ComponentsTabProps) {
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
          Interactive Components
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Fully functional shadcn/ui components built on the Foundation tokens. Click, toggle, sort, and interact.
        </p>
      </div>

      <div className="space-y-6">
        <PlaygroundCard
          id="data-table"
          title="Data Table"
          description="Sortable, searchable, paginated with row selection and column toggles"
          onViewIn={() => onNavigateToTab?.("landing")}
        >
          <DataTablePlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="dialogs"
          title="Dialog & Sheet"
          description="Modal dialogs, alert dialogs, and slide-in panels from any side"
        >
          <DialogPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="dropdowns"
          title="Dropdown Menu"
          description="Multi-level dropdowns with checkboxes, radio groups, and submenus"
        >
          <DropdownPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="cards"
          title="Cards"
          description="Stat cards, profile cards, product cards, and article previews"
          onViewIn={() => onNavigateToTab?.("landing")}
        >
          <CardsPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="toasts"
          title="Toast Notifications"
          description="Success, error, warning, and info toasts with actions"
        >
          <ToastPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="forms"
          title="Form Validation"
          description="React Hook Form + Zod with real-time validation feedback"
        >
          <FormPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="selects"
          title="Select & Combobox"
          description="Basic select, grouped options, and searchable combobox"
        >
          <SelectPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="accordion"
          title="Accordion"
          description="Expand/collapse content sections"
        >
          <AccordionPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="command"
          title="Command Palette"
          description="Searchable command menu with keyboard shortcuts"
        >
          <CommandPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="progress"
          title="Progress & Skeleton"
          description="Animated progress bars and loading skeletons"
        >
          <ProgressPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="avatars"
          title="Avatar, Badge & Tooltip"
          description="Avatars with status, badge variants, dismissible badges, and tooltips"
        >
          <AvatarBadgeTooltipPlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="toggles"
          title="Toggle, Toggle Group & Switch"
          description="Toggle buttons, single/multi select groups, and switch controls"
        >
          <TogglePlayground />
        </PlaygroundCard>

        <PlaygroundCard
          id="alerts"
          title="Alerts"
          description="Information, success, warning, and destructive alert variants"
        >
          <AlertPreview />
        </PlaygroundCard>
      </div>
    </div>
  )
}
