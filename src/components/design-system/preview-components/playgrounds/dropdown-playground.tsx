import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import {
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  HelpCircleIcon,
  KeyboardIcon,
  ChevronRightIcon,
} from "lucide-react"

export default function DropdownPlayground() {
  const [status, setStatus] = useState("active")
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Click to open dropdowns with items, checkboxes, and submenus.</p>
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm">User Menu</Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel className="text-xs">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs gap-2" onClick={() => toast("Profile opened")}>
              <UserIcon className="size-3.5" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs gap-2" onClick={() => toast("Settings opened")}>
              <SettingsIcon className="size-3.5" />
              Settings
              <span className="ml-auto text-xs text-muted-foreground">⌘,</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-xs gap-2">
                <HelpCircleIcon className="size-3.5" />
                Help
                <ChevronRightIcon className="ml-auto size-3" />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-40">
                <DropdownMenuItem className="text-xs" onClick={() => toast("Docs opened")}>Documentation</DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => toast("Support opened")}>Support</DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => toast("Shortcuts opened")}>
                  <KeyboardIcon className="size-3.5" />
                  Keyboard Shortcuts
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs gap-2 text-destructive" onClick={() => toast("Logged out")}>
              <LogOutIcon className="size-3.5" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm">Preferences</Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuLabel className="text-xs">Preferences</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              className="text-xs"
              checked={notifications}
              onCheckedChange={setNotifications}
            >
              Push Notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="text-xs"
              checked={emailUpdates}
              onCheckedChange={setEmailUpdates}
            >
              Email Updates
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs">Account Status</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
              <DropdownMenuRadioItem className="text-xs" value="active">Active</DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="text-xs" value="away">Away</DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="text-xs" value="invisible">Invisible</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
