import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sparkles, Palette, MousePointer2, ArrowRight } from "lucide-react"
import { useDesignTokensDispatch } from "@/lib/design-tokens-store"
import { toast } from "sonner"

const PRESETS = [
  { name: "Modern SaaS", color: "#2563EB", display: "Space Grotesk" },
  { name: "Elegant Editorial", color: "#111827", display: "Playfair Display" },
  { name: "Playful Brand", color: "#EC4899", display: "Poppins" },
  { name: "Tech Dark", color: "#10B981", display: "JetBrains Mono" },
]

export default function QuickStartModal() {
  const [open, setOpen] = useState(() => {
    return !localStorage.getItem("hasSeenQuickStart")
  })
  const [view, setView] = useState<"main" | "describe" | "presets">("main")
  const dispatch = useDesignTokensDispatch()

  const handleClose = () => {
    localStorage.setItem("hasSeenQuickStart", "true")
    setOpen(false)
  }

  const handleStartFromScratch = () => {
    handleClose()
    toast("Starting from scratch. Use the color picker to begin!")
  }

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    dispatch({ type: "SET_PRIMARY_COLOR", payload: preset.color })
    dispatch({ type: "SET_DISPLAY_FONT", payload: preset.display })
    handleClose()
    toast.success(`Applied ${preset.name} theme!`)
  }

  const handleDescribeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: "RANDOMIZE_ALL" })
    handleClose()
    toast.success("AI theme generated based on your description!")
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-background border-none shadow-2xl">
        <div className="flex flex-col md:flex-row h-full">
           <div className="w-full md:w-5/12 bg-primary p-8 text-primary-foreground flex flex-col justify-center gap-6">
              <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                 <Palette className="size-6 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold leading-tight">Theme Engine</h2>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                   Generate production-ready design tokens in seconds. Choose a path to begin.
                </p>
              </div>
           </div>

           <div className="flex-1 p-8 bg-card">
              {view === "main" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-xl font-bold">How would you like to start?</DialogTitle>
                  </DialogHeader>

                  <button 
                    onClick={() => setView("describe")}
                    className="group w-full flex items-center gap-4 rounded-xl border bg-background p-4 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                       <Sparkles className="size-5" />
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-sm">Describe your project</h3>
                       <p className="text-xs text-muted-foreground">"A clean SaaS dashboard with a blue vibe"</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </button>

                  <button 
                    onClick={() => setView("presets")}
                    className="group w-full flex items-center gap-4 rounded-xl border bg-background p-4 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="size-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                       <Palette className="size-5" />
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-sm">Pick a curated preset</h3>
                       <p className="text-xs text-muted-foreground">Start from one of our hand-crafted themes</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </button>

                  <button 
                    onClick={handleStartFromScratch}
                    className="group w-full flex items-center gap-4 rounded-xl border bg-background p-4 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground transition-colors group-hover:bg-muted-foreground group-hover:text-background">
                       <MousePointer2 className="size-5" />
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-sm">Start from scratch</h3>
                       <p className="text-xs text-muted-foreground">Open the workspace with a blank slate</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {view === "describe" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <button onClick={() => setView("main")} className="text-xs text-muted-foreground hover:text-primary mb-2 flex items-center gap-1">← Back</button>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Describe your project</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleDescribeSubmit} className="space-y-4">
                    <textarea 
                      autoFocus
                      placeholder="e.g. A modern dark-mode analytics dashboard for a crypto app with neon green accents..."
                      className="w-full h-32 rounded-xl border bg-background p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    />
                    <button className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all">
                       Generate Theme
                    </button>
                  </form>
                </div>
              )}

              {view === "presets" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <button onClick={() => setView("main")} className="text-xs text-muted-foreground hover:text-primary mb-2 flex items-center gap-1">← Back</button>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Pick a starting point</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-3">
                    {PRESETS.map((p) => (
                      <button 
                        key={p.name}
                        onClick={() => handleApplyPreset(p)}
                        className="group flex flex-col gap-3 rounded-xl border bg-background p-3 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.98]"
                      >
                         <div className="h-12 w-full rounded-lg" style={{ backgroundColor: p.color }} />
                         <div className="space-y-0.5">
                             <h4 className="text-xs font-bold uppercase tracking-wider">{p.name}</h4>
                             <p className="text-xs text-muted-foreground truncate">{p.display}</p>
                         </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
