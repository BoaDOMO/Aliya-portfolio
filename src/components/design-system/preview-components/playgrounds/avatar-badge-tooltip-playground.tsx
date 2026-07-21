import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { X as XIcon } from "@phosphor-icons/react"
import { useState } from "react"

function DismissibleBadge({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <Badge variant="default" className="gap-1 pr-1">
      {children}
      <button onClick={() => setVisible(false)} className="ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5">
        <XIcon className="size-2.5" />
      </button>
    </Badge>
  )
}

export default function AvatarBadgeTooltipPlayground() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Avatar variants.</p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-success" />
          </div>
          <Avatar>
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">AK</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="text-xs">MC</AvatarFallback>
          </Avatar>
          <div className="flex -space-x-2">
            <Avatar className="ring-2 ring-card"><AvatarFallback className="text-xs">JD</AvatarFallback></Avatar>
            <Avatar className="ring-2 ring-card"><AvatarFallback className="text-xs">AK</AvatarFallback></Avatar>
            <Avatar className="ring-2 ring-card"><AvatarFallback className="text-xs">MC</AvatarFallback></Avatar>
            <Avatar className="ring-2 ring-card"><AvatarFallback className="text-xs text-muted-foreground">+3</AvatarFallback></Avatar>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Badge variants.</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <DismissibleBadge>Dismissible</DismissibleBadge>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Tooltip on hover.</p>
        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Hover top
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                Tooltip on top
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Hover right
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                Tooltip on the right
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Hover bottom
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Tooltip below
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}
