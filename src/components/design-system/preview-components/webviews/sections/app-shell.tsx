import type { ReactNode } from "react"
import {
  List,
  MagnifyingGlass,
  DotsThree,
  Plus,
  House,
  ChartLineUp,
  Gear,
} from "@phosphor-icons/react"

export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <header className="h-14 px-4 flex items-center gap-3 border-b border-border bg-card">
        <button className="p-2 rounded-md hover:bg-muted transition-colors">
          <List className="size-5" />
        </button>
        <span className="font-display font-medium">Inbox</span>
        <div className="ml-auto flex gap-1">
          <button className="p-2 rounded-md hover:bg-muted transition-colors">
            <MagnifyingGlass className="size-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-muted transition-colors">
            <DotsThree className="size-5" weight="bold" />
          </button>
        </div>
      </header>
      <main className="flex-1 p-4 relative">
        {children}
      </main>
      <nav className="h-16 border-t border-border bg-card flex items-center justify-around px-4">
        {[
          { icon: House, label: "Home" },
          { icon: ChartLineUp, label: "Stats" },
          { icon: Gear, label: "Settings" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <item.icon className="size-5" />
            {item.label}
          </button>
        ))}
      </nav>
      <button className="absolute bottom-20 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity">
        <Plus className="size-6" weight="bold" />
      </button>
    </div>
  )
}
