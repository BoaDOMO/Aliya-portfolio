import { type ComponentProps, useId } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Props extends ComponentProps<typeof Textarea> {
  label: string
}

export function FloatingLabelTextarea({ label, className, ...props }: Props) {
  const generatedId = useId()
  const textareaId = props.id ?? generatedId

  return (
    <div className="relative flex flex-1 flex-col">
      <Textarea
        {...props}
        id={textareaId}
        className={cn(
          "peer pt-5 pb-1 flex-1",
          "bg-surface-featured",
          "font-sans",
          className
        )}
        placeholder=" "
      />
      <label
        htmlFor={textareaId}
        className={cn(
          "absolute left-2.5 top-3",
          "pointer-events-none select-none",
          "font-sans text-sm text-muted-foreground",
          "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-wider",
          "peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-wider"
        )}
      >
        {label}
      </label>
    </div>
  )
}
