import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircleIcon } from "lucide-react"

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
      <p className="text-[10px] font-medium text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}

export default function FormsPreview() {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Input Fields
      </p>
      <div className="space-y-3">
        <FieldRow label="Default">
          <Input placeholder="you@example.com" className="text-xs" />
        </FieldRow>
        <FieldRow label="Filled">
          <Input defaultValue="hello@example.com" className="text-xs" />
        </FieldRow>
        <FieldRow label="Disabled">
          <Input disabled defaultValue="Cannot edit" className="text-xs" />
        </FieldRow>
        <FieldRow label="Error">
          <Input
            aria-invalid
            defaultValue="bad-email"
            className="text-xs"
          />
          <div className="col-start-2 flex items-center gap-1 text-[10px] text-destructive">
            <AlertCircleIcon className="size-3" />
            Invalid email address
          </div>
        </FieldRow>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Textarea
        </p>
        <FieldRow label="Default">
          <Textarea placeholder="Write a message..." rows={2} className="text-xs" />
        </FieldRow>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select
        </p>
        <FieldRow label="Default">
          <Select>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Choose a plan..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Checkbox & Radio
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-xs">Accept terms</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter" className="text-xs">Newsletter</Label>
          </div>
        </div>
        <RadioGroup defaultValue="option-1" className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1" className="text-xs">Option A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2" className="text-xs">Option B</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Switch & Slider
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="notif" defaultChecked />
            <Label htmlFor="notif" className="text-xs">Notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="digest" />
            <Label htmlFor="digest" className="text-xs">Weekly digest</Label>
          </div>
        </div>
        <div className="max-w-48">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </div>
    </div>
  )
}
