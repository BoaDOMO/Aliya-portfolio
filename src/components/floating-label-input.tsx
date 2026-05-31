import { type ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Props extends ComponentProps<typeof Input> {
  label: string
}

export function FloatingLabelInput({ label, className, ...props }: Props) {
  return (
    <div className="relative">
      <Input
        {...props}
        className={cn(
          "peer pt-5 pb-1",
          "bg-cream dark:bg-input/30",
          "font-mono",
          className
        )}
        placeholder=" "
      />
      <label
        className={cn(
          "absolute left-2.5 top-1/2 -translate-y-1/2",
          "pointer-events-none select-none",
          "font-mono text-sm text-label-gray dark:text-label-gray",
          "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-wider",
          "peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-wider"
        )}
      >
        {label}
      </label>
    </div>
  )
}
