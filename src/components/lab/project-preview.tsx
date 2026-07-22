import { ArrowUpRight, Check, CircleNotch, SlidersHorizontal } from "@phosphor-icons/react"
import { BlurredBackground } from "@/components/blurred-background"
import { cn } from "@/lib/utils"

type PreviewKind = "rag" | "studio"

export function ProjectPreview({
  number,
  status,
  kind,
}: {
  number: string
  status: string
  kind: PreviewKind
}) {
  return (
    <div
      className={cn(
        "project-visual",
        kind === "rag" ? "project-visual--blue" : "project-visual--forest",
        "p-4 md:p-5"
      )}
    >
      <BlurredBackground
        image={kind === "rag" ? "hydrangea" : "blue-flower"}
        position={kind === "rag" ? "56% 42%" : "46% 52%"}
        className="opacity-90"
      />
      <div className="absolute inset-x-5 top-5 z-20 flex items-center justify-between gap-4 md:inset-x-6 md:top-6">
        <span className="font-mono text-xs text-foreground/45">{number}</span>
        <span className="rounded-full bg-background/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-primary backdrop-blur-md">
          {status}
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-4 top-16 z-10 overflow-hidden rounded-xl border border-foreground/10 bg-background/80 shadow-[0_18px_50px_-32px_color-mix(in_oklch,var(--foreground)_45%,transparent)] backdrop-blur-md md:inset-x-5 md:bottom-5 md:top-[4.5rem]">
        {kind === "rag" ? <RagPreview /> : <StudioPreview />}
      </div>
    </div>
  )
}

function RagPreview() {
  return (
    <div className="flex h-full min-h-0 text-[10px] text-foreground/80">
      <aside className="hidden w-[29%] shrink-0 border-r border-border/70 bg-muted/35 p-3 sm:block">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <span className="grid size-4 place-items-center rounded bg-primary text-[8px] text-primary-foreground">R</span>
          RAG workspace
        </div>
        <div className="mt-5 space-y-2 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground">
          <div className="rounded-md bg-primary/10 px-2 py-1.5 text-primary">Assistant</div>
          <div className="px-2 py-1.5">Knowledge base</div>
          <div className="px-2 py-1.5">Evaluations</div>
        </div>
        <div className="mt-8 rounded-lg border border-border/70 bg-background/70 p-2">
          <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground">Sources</p>
          <div className="mt-2 space-y-1.5 text-[8px]">
            <p className="truncate">▸ Product policy.pdf</p>
            <p className="truncate">▸ FAQ · 24 chunks</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
          <div>
            <p className="font-medium text-foreground">Banking AI assistant</p>
            <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground">Grounded response mode</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 font-mono text-[8px] text-primary">
            <CircleNotch className="size-2.5" /> Live
          </span>
        </div>
        <div className="flex-1 space-y-3 overflow-hidden p-3 sm:p-4">
          <div className="max-w-[88%] rounded-lg rounded-tl-sm bg-muted px-3 py-2 leading-relaxed">
            I can answer from the indexed banking policies and show the sources behind each response.
          </div>
          <div className="ml-auto max-w-[78%] rounded-lg rounded-tr-sm bg-primary px-3 py-2 text-primary-foreground">
            What documents do I need for a personal loan?
          </div>
          <div className="max-w-[92%] rounded-lg rounded-tl-sm bg-muted px-3 py-2 leading-relaxed">
            A valid Cambodian National ID or passport, plus your last three months of bank statements.
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded border border-border/70 bg-background/60 px-1.5 py-1 font-mono text-[8px] text-primary">Policy · p.04</span>
              <span className="rounded border border-border/70 bg-background/60 px-1.5 py-1 font-mono text-[8px] text-primary">FAQ · p.12</span>
            </div>
          </div>
        </div>
        <div className="mx-3 mb-3 flex items-center gap-2 rounded-lg border border-border/80 bg-background/75 px-3 py-2 text-muted-foreground sm:mx-4 sm:mb-4">
          <span className="flex-1 truncate">Ask about rates, eligibility, or documents…</span>
          <span className="grid size-5 place-items-center rounded bg-primary text-primary-foreground">↑</span>
        </div>
      </div>
    </div>
  )
}

function StudioPreview() {
  return (
    <div className="flex h-full min-h-0 flex-col text-[10px] text-foreground/80">
      <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <span className="grid size-4 place-items-center rounded bg-primary text-[8px] text-primary-foreground">✦</span>
          Design System Studio
        </div>
        <span className="flex items-center gap-1 rounded-full border border-border/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground">
          <SlidersHorizontal className="size-2.5" /> Tokens
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[34%_66%]">
        <div className="border-r border-border/70 bg-muted/25 p-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">Theme controls</p>
          <div className="mt-3 space-y-3">
            <div>
              <p className="mb-1.5 text-[9px] font-medium">Palette</p>
              <div className="flex gap-1.5">
                <span className="size-5 rounded-full bg-primary ring-2 ring-primary/20 ring-offset-1 ring-offset-background" />
                <span className="size-5 rounded-full bg-accent" />
                <span className="size-5 rounded-full bg-foreground" />
                <span className="size-5 rounded-full bg-muted-foreground" />
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[9px] font-medium">Type scale</p>
              <div className="space-y-1 font-mono text-[8px] text-muted-foreground">
                <div className="flex justify-between"><span>Display</span><span>64px</span></div>
                <div className="flex justify-between"><span>Body</span><span>16px</span></div>
                <div className="flex justify-between"><span>Code</span><span>12px</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-background/50 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">Live preview</p>
            <span className="flex items-center gap-1 font-mono text-[8px] text-emerald-600 dark:text-emerald-400"><Check className="size-2.5" /> AA pass</span>
          </div>
          <div className="mt-3 rounded-lg border border-border/70 bg-card p-3 shadow-sm sm:p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-primary">Acme / product</span>
              <ArrowUpRight className="size-3 text-muted-foreground" />
            </div>
            <h3 className="mt-4 max-w-[9ch] font-display text-2xl font-medium leading-[0.95] tracking-[-0.06em] text-card-foreground sm:text-3xl">Build with clarity.</h3>
            <p className="mt-3 max-w-[24ch] text-[9px] leading-relaxed text-muted-foreground">A responsive component preview powered by the tokens you are editing.</p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-primary px-2.5 py-1 text-[8px] font-medium text-primary-foreground">Get started</span>
              <span className="rounded-full border border-border px-2.5 py-1 text-[8px] text-muted-foreground">View specs</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2 font-mono text-[8px] text-muted-foreground">
            <span>radius · 12px</span><span>spacing · 1.25×</span>
          </div>
        </div>
      </div>
    </div>
  )
}
