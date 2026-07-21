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

const DOCK_MIN_WIDTH = 560
const DOCK_MAX_WIDTH = 760
const DOCK_DEFAULT_WIDTH = 640

function clampDockWidth(width: number) {
  return Math.min(DOCK_MAX_WIDTH, Math.max(DOCK_MIN_WIDTH, width))
}

function DesignSystemContent() {
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false)
  const [inspectorOpen, setInspectorOpen] = useState(true)
  const [inspectorWidth, setInspectorWidth] = useState(DOCK_DEFAULT_WIDTH)
  const [isResizingInspector, setIsResizingInspector] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState<DrawerType>(null)
  const [drawerContext, setDrawerContext] = useState<DrawerContext | undefined>(undefined)

  const shouldReduceMotion = useReducedMotion()
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const loadedRef = useRef(false)
  const resizeStartRef = useRef<{ x: number; width: number } | null>(null)

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

  const handleResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    resizeStartRef.current = { x: event.clientX, width: inspectorWidth }
    setIsResizingInspector(true)
  }

  const handleResizeMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!resizeStartRef.current) return
    const nextWidth = resizeStartRef.current.width + event.clientX - resizeStartRef.current.x
    setInspectorWidth(clampDockWidth(nextWidth))
  }

  const handleResizeEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!resizeStartRef.current) return
    resizeStartRef.current = null
    setIsResizingInspector(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleResizeKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    setInspectorWidth((width) => clampDockWidth(width + (event.key === "ArrowRight" ? 20 : -20)))
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
        <SheetContent side="bottom" showCloseButton={false} className="h-[88dvh]! max-h-[88dvh] overflow-hidden rounded-t-2xl bg-tool-panel p-0 sm:max-w-none xl:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Theme inspector</SheetTitle>
          </SheetHeader>
          {panelContent}
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: inspectorOpen ? inspectorWidth : 0, opacity: inspectorOpen ? 1 : 0 }}
          transition={shouldReduceMotion || isResizingInspector ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          data-design-system-left
          aria-hidden={!inspectorOpen}
          inert={!inspectorOpen || undefined}
          className="relative hidden shrink-0 overflow-hidden border-r border-border print:hidden xl:block"
        >
          <div className="h-full" style={{ width: inspectorWidth }}>{panelContent}</div>
          <div
            role="separator"
            aria-label="Resize theme dock"
            aria-orientation="vertical"
            aria-valuemin={DOCK_MIN_WIDTH}
            aria-valuemax={DOCK_MAX_WIDTH}
            aria-valuenow={inspectorWidth}
            tabIndex={inspectorOpen ? 0 : -1}
            onPointerDown={handleResizeStart}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
            onPointerCancel={handleResizeEnd}
            onKeyDown={handleResizeKeyDown}
            className="absolute inset-y-0 right-0 z-20 w-2 cursor-col-resize touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <span className="absolute left-1/2 top-1/2 h-10 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border-strong transition-colors hover:bg-primary" />
          </div>
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
