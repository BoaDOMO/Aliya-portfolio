import { useState } from "react"
import { toast } from "sonner"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  SearchIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
  FileTextIcon,
  LogOutIcon,
  HomeIcon,
} from "lucide-react"

export default function CommandPlayground() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Press <kbd className="rounded border border-border px-1 text-xs">⌘K</kbd> or click to open.
      </p>
      <Button size="sm" variant="outline" className="gap-2" onClick={() => setOpen(true)}>
        <SearchIcon className="size-3.5" />
        Search commands...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">
              No results found.
            </CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem className="text-xs gap-2" onSelect={() => { setOpen(false); toast("Navigating to Dashboard") }}>
                <LayoutDashboardIcon className="size-3.5" />
                Dashboard
                <CommandShortcut className="text-xs">⌘1</CommandShortcut>
              </CommandItem>
              <CommandItem className="text-xs gap-2" onSelect={() => { setOpen(false); toast("Navigating to Home") }}>
                <HomeIcon className="size-3.5" />
                Home
                <CommandShortcut className="text-xs">⌘H</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem className="text-xs gap-2" onSelect={() => { setOpen(false); toast("New file created!") }}>
                <FileTextIcon className="size-3.5" />
                New File
                <CommandShortcut className="text-xs">⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem className="text-xs gap-2" onSelect={() => { setOpen(false); toast("Opening Settings") }}>
                <SettingsIcon className="size-3.5" />
                Settings
                <CommandShortcut className="text-xs">⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              <CommandItem className="text-xs gap-2" onSelect={() => { setOpen(false); toast("Opening Profile") }}>
                <UserIcon className="size-3.5" />
                Profile
              </CommandItem>
              <CommandItem className="text-xs gap-2" onSelect={() => { setOpen(false); toast("Logged out") }}>
                <LogOutIcon className="size-3.5" />
                Log Out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
