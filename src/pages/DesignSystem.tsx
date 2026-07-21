import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  useDesignTokens,
  useDesignTokensDispatch,
} from "@/lib/design-tokens-store"
import { readURLTheme, syncToURL } from "@/lib/url-state"
import { debouncedAutosave, loadAutosave } from "@/lib/localstorage-state"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import LeftPanel from "@/components/design-system/left-panel"
import DesignSystemAppHeader from "@/components/design-system/app-header"
import OnboardingTour from "@/components/design-system/onboarding-tour"
import PreviewPanel from "@/components/design-system/preview-panel"
import DrawerSheet from "@/components/design-system/drawer-sheet"
import type { DrawerType, DrawerContext } from "@/components/design-system/drawer-sheet"

function DesignSystemContent() {
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false)
  const [inspectorOpen, setInspectorOpen] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState<DrawerType>(null)
  const [drawerContext, setDrawerContext] = useState<DrawerContext | undefined>(undefined)

  const shouldReduceMotion = useReducedMotion()
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const loadedRef = useRef(false)

  useEffect(() => {
    const urlTheme = readURLTheme()
    const autosave = loadAutosave()

    if (urlTheme) {
      dispatch({ type: "LOAD_THEME", payload: urlTheme })
    } else if (autosave) {
      dispatch({ type: "LOAD_THEME", payload: autosave })
    }
    loadedRef.current = true
  }, [dispatch])

  useEffect(() => {
    if (!loadedRef.current) return
    syncToURL(state)
  }, [state])

  useEffect(() => {
    if (!loadedRef.current) return
    debouncedAutosave(state)
  }, [state])

  const handleOpenDrawer = (type: DrawerType, context?: DrawerContext) => {
    const openDrawer = () => {
      setDrawerType(type)
      setDrawerContext(context)
      setDrawerOpen(true)
    }

    if (mobilePanelOpen) {
      setMobilePanelOpen(false)
      window.setTimeout(openDrawer, 160)
    } else {
      openDrawer()
    }
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
      onOpenDrawer={handleOpenDrawer}
    />
  )

  return (
    <motion.div
      layout={!shouldReduceMotion}
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-tool-canvas"
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <DesignSystemAppHeader
        inspectorOpen={inspectorOpen}
        onToggleInspector={() => setInspectorOpen((open) => !open)}
        onOpenMobileInspector={() => setMobilePanelOpen(true)}
      />

      <Sheet open={mobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <SheetContent side="bottom" showCloseButton={false} className="h-[88dvh]! max-h-[88dvh] overflow-hidden rounded-t-2xl bg-tool-panel p-0 sm:max-w-none lg:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Theme inspector</SheetTitle>
          </SheetHeader>
          {panelContent}
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: inspectorOpen ? 360 : 0, opacity: inspectorOpen ? 1 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          data-design-system-left
          aria-hidden={!inspectorOpen}
          inert={!inspectorOpen || undefined}
          className="hidden shrink-0 overflow-hidden border-r border-border print:hidden lg:block"
        >
          <div className="h-full w-[360px]">{panelContent}</div>
        </motion.div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <PreviewPanel />
        </div>
      </div>

      <DrawerSheet
        open={drawerOpen}
        type={drawerType}
        context={drawerContext}
        onClose={handleCloseDrawer}
      />
      <OnboardingTour />
    </motion.div>
  )
}

export default function DesignSystem() {
  return <DesignSystemContent />
}
