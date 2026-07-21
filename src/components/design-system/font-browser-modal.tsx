import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { BUNDLED_FONTS, injectFontLink, type FontDef } from "@/lib/google-fonts"

interface FontBrowserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (font: FontDef) => void
  preferredCategory?: FontDef["category"]
}

export default function FontBrowserModal({ open, onOpenChange, onSelect, preferredCategory }: FontBrowserModalProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FontDef["category"] | "all">(preferredCategory ?? "all")

  useEffect(() => {
    if (!open) return
    for (const font of BUNDLED_FONTS) injectFontLink(font.family)
  }, [open])

  const filteredFonts = BUNDLED_FONTS.filter(f => {
    const matchesSearch = f.family.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || f.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden h-[80vh] flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-display text-2xl font-bold">Browse curated fonts</DialogTitle>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
             <div className="relative flex-1">
               <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
               <input 
                 type="text" 
                 placeholder="Search fonts..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 rounded-lg border bg-muted/50 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
               />
               {search && (
                 <button 
                   type="button"
                   aria-label="Clear font search"
                   onClick={() => setSearch("")}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                 >
                   <X className="size-3" />
                 </button>
               )}
             </div>
             <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1 sm:flex">
                {(["all", "sans-serif", "serif", "display", "monospace"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`min-w-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition-all sm:px-3 sm:text-xs sm:tracking-wider ${
                      filter === cat ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFonts.map((f) => (
            <button
              key={f.family}
              onClick={() => {
                onSelect(f)
                onOpenChange(false)
              }}
              className="group flex flex-col gap-3 rounded-xl border p-4 text-left transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">{f.category}</span>
                <div className="size-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform" />
              </div>
              <span className="text-2xl truncate" style={{ fontFamily: f.family }}>
                {f.family}
              </span>
              <span className="text-xs text-muted-foreground line-clamp-1" style={{ fontFamily: f.family }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </button>
          ))}
          {filteredFonts.length === 0 && (
            <div className="col-span-full py-20 text-center">
               <p className="text-muted-foreground">No fonts found matching your search.</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-muted/20 text-center">
           <p className="text-xs text-muted-foreground">Showing {filteredFonts.length} of {BUNDLED_FONTS.length} fonts</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
