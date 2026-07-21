import { SlidersHorizontal } from "@phosphor-icons/react"
import { CollapsibleTrigger } from "@/components/ui/collapsible"

export default function AdvancedSettingsToggle({
  label,
  open,
  modified,
}: {
  label: string
  open: boolean
  modified: boolean
}) {
  return (
    <CollapsibleTrigger
      aria-label={`${open ? "Hide" : "Show"} advanced ${label} settings`}
      title={`Advanced ${label} settings`}
      className={`relative ml-auto flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        open
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <SlidersHorizontal className="size-4" />
      {modified && !open && (
        <span
          className="absolute right-1 top-1 size-1.5 rounded-full bg-primary"
          aria-hidden="true"
        />
      )}
    </CollapsibleTrigger>
  )
}
