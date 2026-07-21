import ColorDrawer from "./color-drawer"
import TypoDrawer from "./typo-drawer"
import StylePresetDrawer from "./style-preset-drawer"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export type DrawerType = "color" | "typography" | "style" | null

export interface DrawerContext {
  colorKey?: string
  colorLabel?: string
  colorValue?: string
  colorTokenType?: "light" | "dark" | "states"
  fontSlot?: "display" | "body" | "mono"
}

interface DrawerSheetProps {
  open: boolean
  type: DrawerType
  context?: DrawerContext
  onClose: () => void
}

const drawerTitles: Record<Exclude<DrawerType, null>, string> = {
  color: "Edit color token",
  typography: "Edit typography",
  style: "Choose style preset",
}

export default function DrawerSheet({ open, type, context, onClose }: DrawerSheetProps) {
  return (
    <Sheet open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 bg-background p-0 sm:max-w-[400px]"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{type ? drawerTitles[type] : "Theme settings"}</SheetTitle>
        </SheetHeader>
        {type === "color" && <ColorDrawer key={context?.colorKey ?? "primary"} context={context} onClose={onClose} />}
        {type === "typography" && <TypoDrawer context={context} onClose={onClose} />}
        {type === "style" && <StylePresetDrawer onClose={onClose} />}
      </SheetContent>
    </Sheet>
  )
}
