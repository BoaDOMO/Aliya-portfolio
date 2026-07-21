import type { PresetConfig } from "@/lib/preset-configs"

export default function WebviewRenderer({ config }: { config: PresetConfig }) {
  return (
    <div className={`min-h-full flex flex-col bg-background text-foreground font-body ${config.wrapperClassName}`}>
      {config.sections.map((section, i) => (
        <div key={i}>{section.renderContent()}</div>
      ))}
    </div>
  )
}
