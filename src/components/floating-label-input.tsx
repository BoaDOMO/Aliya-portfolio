import { type ComponentProps, useId } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Props extends ComponentProps<typeof Input> {
  label: string
}

export function FloatingLabelInput({ label, className, ...props }: Props) {
  const generatedId = useId()
  const inputId = props.id ?? generatedId

  return (
    <div className="relative">
      <Input
        {...props}
        id={inputId}
        className={cn(
          "peer pt-5 pb-1",
          "bg-surface-control",
          "font-sans",
          className
        )}
        placeholder=" "
      />
      <label
        htmlFor={inputId}
        className={cn(
          "absolute left-2.5 top-1/2 -translate-y-1/2",
          "pointer-events-none select-none",
          "font-sans text-sm text-muted-foreground",
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
