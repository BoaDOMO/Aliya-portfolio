import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ColorDrawer from "./color-drawer"
import TypoDrawer from "./typo-drawer"
import StylePresetDrawer from "./style-preset-drawer"

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

export default function DrawerSheet({ open, type, context, onClose }: DrawerSheetProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && type && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/20"
          />
          <motion.div
            ref={drawerRef}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 bottom-0 left-[52px] z-50 w-[380px] bg-white/90 dark:bg-card/95 backdrop-blur-md shadow-lg border-r border-border"
          >
            {type === "color" && <ColorDrawer key={context?.colorKey ?? "primary"} context={context} onClose={onClose} />}
            {type === "typography" && <TypoDrawer context={context} onClose={onClose} />}
            {type === "style" && <StylePresetDrawer onClose={onClose} />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
