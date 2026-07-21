import { useState } from "react"
import { Check, CaretUpDown as ChevronsUpDown } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const FRAMEWORKS = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "astro", label: "Astro" },
  { value: "remix", label: "Remix" },
  { value: "nuxt", label: "Nuxt" },
  { value: "solid", label: "Solid" },
]

export default function SelectPlayground() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Basic select, grouped, and combobox patterns.</p>

      <div className="grid grid-cols-1 gap-3 @[40rem]:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground">Basic Select</p>
          <Select>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select a plan..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground">Combobox</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-xs font-normal"
                />
              }
            >
              {value
                ? FRAMEWORKS.find((f) => f.value === value)?.label
                : "Select framework..."}
              <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search framework..." className="h-8 text-xs" />
                <CommandList>
                  <CommandEmpty className="py-2 text-center text-xs text-muted-foreground">
                    No framework found.
                  </CommandEmpty>
                  <CommandGroup>
                    {FRAMEWORKS.map((f) => (
                      <CommandItem
                        key={f.value}
                        value={f.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                        className="text-xs"
                      >
                        <Check
                          className={cn(
                            "mr-2 size-3",
                            value === f.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {f.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
