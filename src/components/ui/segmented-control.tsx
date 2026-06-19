import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Option {
  label: string | React.ReactNode
  value: string
}

interface SegmentedControlProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  className?: string
  size?: "sm" | "md"
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps) {
  const instanceId = React.useId()
  return (
    <div
      className={cn(
        "inline-flex p-1 bg-muted/50 rounded-lg border",
        size === "sm" ? "h-8" : "h-10",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex-1 flex items-center justify-center px-3 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              size === "sm" ? "px-2" : "px-3"
            )}
          >
            {isActive && (
              <motion.div
                layoutId={`seg-active-${instanceId}`}
                className="absolute inset-0 bg-background rounded-md shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
