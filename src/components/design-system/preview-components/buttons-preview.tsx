import { Button } from "@/components/ui/button"
import { LoaderCircleIcon } from "lucide-react"

const VARIANTS = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
const SIZES = ["xs", "sm", "default", "lg"] as const

export default function ButtonsPreview() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Variants × Sizes
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="py-1.5 pr-4 text-left font-medium text-muted-foreground" />
                {SIZES.map((size) => (
                  <th key={size} className="px-2 py-1.5 text-left font-medium text-muted-foreground">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map((variant) => (
                <tr key={variant} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4 font-medium text-foreground">{variant}</td>
                  {SIZES.map((size) => (
                    <td key={size} className="px-2 py-2">
                      <Button variant={variant} size={size}>
                        {variant}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          States
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="default" className="group-hover:bg-primary/80" disabled>
            Disabled
          </Button>
          <Button variant="default">
            <LoaderCircleIcon className="animate-spin" />
            Loading
          </Button>
          <Button variant="outline" className="focus-visible:ring-2 focus-visible:ring-ring">
            Focus
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Icon Buttons
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="icon-xs">A</Button>
          <Button variant="outline" size="icon-sm">A</Button>
          <Button variant="outline" size="icon">A</Button>
          <Button variant="outline" size="icon-lg">A</Button>
        </div>
      </div>
    </div>
  )
}
