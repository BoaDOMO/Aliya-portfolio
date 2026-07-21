import type { ReactNode } from "react"

export function Footer({
  children,
  links,
}: {
  children: ReactNode
  links?: string[]
}) {
  return (
    <footer className="py-8 px-6 border-t border-border mt-auto">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 @[48rem]:flex-row">
        <div className="font-display text-sm font-semibold">{children}</div>
        {links && (
          <div className="flex flex-wrap gap-4 justify-center">
            {links.map((l, i) => (
              <a
                key={i}
                href="#"
                className="font-body text-xs text-foreground/70 hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
