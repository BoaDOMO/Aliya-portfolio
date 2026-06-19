import { useState, useEffect } from "react"
import { MenuIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import {
  DesignTokensProvider,
  useDesignTokens,
  useDesignTokensDispatch,
} from "@/lib/design-tokens-store"
import { readURLTheme, readURLPrimaryColor, syncToURL } from "@/lib/url-state"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LeftPanel from "@/components/design-system/left-panel"
import PreviewPanel from "@/components/design-system/preview-panel"
import DrawerSheet from "@/components/design-system/drawer-sheet"
import type { DrawerType, DrawerContext } from "@/components/design-system/drawer-sheet"

function DesignSystemContent() {
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false)
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState<DrawerType>(null)
  const [drawerContext, setDrawerContext] = useState<DrawerContext | undefined>(undefined)

  const shouldReduceMotion = useReducedMotion()
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()

  useEffect(() => {
    const urlPrimary = readURLPrimaryColor()
    const urlTheme = readURLTheme()

    if (urlTheme) {
      dispatch({ type: "LOAD_THEME", payload: urlTheme })
    }
    dispatch({
      type: "SET_PRIMARY_COLOR",
      payload: urlPrimary ?? state.tokens.light.primary,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    syncToURL(state)
  }, [
    state.tokens.light.primary,
    state.harmonyType,
    state.colorSpace,
    state.fonts,
    state.stylePreset,
  ])

  const handleOpenDrawer = (type: DrawerType, context?: DrawerContext) => {
    setDrawerType(type)
    setDrawerContext(context)
    setDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false)
    setTimeout(() => {
      setDrawerType(null)
      setDrawerContext(undefined)
    }, 200)
  }

  const panelContent = (
    <LeftPanel
      onClose={() => setMobilePanelOpen(false)}
      collapsed={isPanelCollapsed}
      onToggle={() => setIsPanelCollapsed(!isPanelCollapsed)}
      onOpenDrawer={handleOpenDrawer}
    />
  )

  return (
    <motion.div
      layout={!shouldReduceMotion}
      className="relative flex flex-1 min-h-0 flex-col overflow-hidden md:flex-row"
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`hidden transition-all duration-300 motion-reduce:transition-none md:block shrink-0 ${
          isPanelCollapsed ? "w-[52px]" : "w-[522px]"
        }`}
      >
        {panelContent}
      </div>

      <Sheet open={mobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <SheetTrigger className="fixed left-3 top-3 z-40 rounded-md border bg-card p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden" aria-label="Open design panel">
          <MenuIcon className="size-4" />
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0 sm:max-w-none md:hidden">
          {panelContent}
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <PreviewPanel collapsed={isPanelCollapsed} />
      </div>

      <DrawerSheet
        open={drawerOpen}
        type={drawerType}
        context={drawerContext}
        onClose={handleCloseDrawer}
      />
    </motion.div>
  )
}

export default function DesignSystem() {
  return (
    <DesignTokensProvider>
      <DesignSystemContent />
    </DesignTokensProvider>
  )
}
