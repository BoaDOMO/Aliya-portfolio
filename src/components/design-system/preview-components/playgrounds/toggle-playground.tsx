import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from "lucide-react"

export default function TogglePlayground() {
  const [pizza, setPizza] = useState<string[]>([])

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Toggle buttons.</p>
        <div className="flex flex-wrap gap-2">
          <Toggle size="sm" aria-label="Toggle bold"><BoldIcon className="size-3.5" /></Toggle>
          <Toggle size="sm" aria-label="Toggle italic"><ItalicIcon className="size-3.5" /></Toggle>
          <Toggle size="sm" aria-label="Toggle underline"><UnderlineIcon className="size-3.5" /></Toggle>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Toggle group (single).</p>
      <ToggleGroup defaultValue={["left"]}>
        <ToggleGroupItem value="left" size="sm" aria-label="Align left">
          <AlignLeftIcon className="size-3.5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" size="sm" aria-label="Align center">
          <AlignCenterIcon className="size-3.5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" size="sm" aria-label="Align right">
          <AlignRightIcon className="size-3.5" />
        </ToggleGroupItem>
      </ToggleGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Toggle group (multiple) with {pizza.length > 0 ? pizza.join(", ") : "none selected"}.</p>
        <ToggleGroup value={pizza} onValueChange={setPizza}>
          <ToggleGroupItem value="pepperoni" size="sm">Pepperoni</ToggleGroupItem>
          <ToggleGroupItem value="mushrooms" size="sm">Mushrooms</ToggleGroupItem>
          <ToggleGroupItem value="olives" size="sm">Olives</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Switch controls.</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="toggle-wifi" defaultChecked />
            <Label htmlFor="toggle-wifi" className="text-xs">Wi-Fi</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="toggle-bt" />
            <Label htmlFor="toggle-bt" className="text-xs">Bluetooth</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="toggle-dark" defaultChecked disabled />
            <Label htmlFor="toggle-dark" className="text-xs text-muted-foreground">Dark Mode (locked)</Label>
          </div>
        </div>
      </div>
    </div>
  )
}
