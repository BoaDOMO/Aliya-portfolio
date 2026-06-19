import { type ReactNode, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generateShadeScale, computeForeground, type ColorTokens } from "@/lib/color-utils"
import { useDesignTokensDispatch } from "@/lib/design-tokens-store"
import ContrastBadge from "./contrast-badge"

const SHADE_LABELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

interface Props {
  role: keyof ColorTokens
  color: string
  mode: "light" | "dark"
  children?: ReactNode
}

export default function ShadeModal({ role, color, mode, children }: Props) {
  const dispatch = useDesignTokensDispatch()
  const [open, setOpen] = useState(false)
  const scales = generateShadeScale(color)
  const activeIdx = scales.findIndex(
    (s) => s.toLowerCase() === color.toLowerCase()
  )

  const handleSelect = (shade: string) => {
    dispatch({
      type: mode === "light" ? "UPDATE_LIGHT_TOKEN" : "UPDATE_DARK_TOKEN",
      payload: { key: role, value: shade },
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children ? (
          children
        ) : (
          <button
            className="h-10 w-10 shrink-0 rounded-md border"
            style={{ backgroundColor: color }}
          />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {role} — {mode} mode
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2">
          {scales.map((shade, i) => {
            const isActive = i === activeIdx
            return (
              <button
                key={shade}
                onClick={() => handleSelect(shade)}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  isActive ? "ring-2 ring-primary ring-offset-1" : ""
                }`}
              >
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: shade }}
                />
                <span className="text-xs font-mono text-muted-foreground">
                  {SHADE_LABELS[i]}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {shade}
                </span>
                <ContrastBadge
                  fg={computeForeground(shade)}
                  bg={shade}
                />
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
