import { ArrowUp, ArrowUpRight, Check, Headset, SlidersHorizontal } from "@phosphor-icons/react"
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
    <div className="relative h-full overflow-hidden bg-background/35 text-foreground">
      <section className="absolute inset-y-[9%] left-[7%] flex w-[56%] min-w-0 flex-col rounded-[14px] border border-border/60 bg-card p-3 text-card-foreground shadow-[0_24px_45px_-28px_color-mix(in_oklch,var(--foreground)_30%,transparent)] sm:rounded-[18px] sm:p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[-0.03em] sm:text-xs">Chat</span>
          <Headset className="size-3 text-emerald-600 dark:text-emerald-400 sm:size-3.5" />
        </div>
        <div className="mt-4 max-w-[88%] rounded-[12px] bg-primary/10 px-2.5 py-2 text-[8px] leading-relaxed text-foreground/90 sm:mt-6 sm:px-3 sm:py-2.5 sm:text-[10px]">
          Hi, how can I help?
        </div>
        <div className="mt-auto flex h-7 items-center rounded-lg border border-border/50 bg-muted/40 px-2 text-[7px] text-muted-foreground shadow-sm sm:h-8 sm:px-2.5 sm:text-[9px]">
          <span className="min-w-0 flex-1 truncate">Write a message…</span>
          <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground sm:size-5"><ArrowUp className="size-2.5 sm:size-3" /></span>
        </div>
      </section>

      <section className="absolute right-[7%] top-[18%] flex h-[64%] w-[37%] min-w-0 flex-col rounded-[14px] border border-border/60 bg-card p-2.5 text-card-foreground shadow-[0_28px_54px_-30px_color-mix(in_oklch,var(--foreground)_30%,transparent)] sm:rounded-[18px] sm:p-3">
        <div className="flex items-center justify-between gap-1">
          <span className="truncate font-display text-[8px] font-semibold tracking-[-0.03em] sm:text-[10px]">Support Inbox</span>
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
        </div>
        <div className="mt-3 border-t border-border/50 pt-2 font-mono text-[6px] uppercase tracking-[0.1em] text-muted-foreground sm:mt-4 sm:pt-2.5 sm:text-[7px]">Customer · now</div>
        <div className="mt-2 rounded-[10px] bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-2 text-[7px] leading-relaxed text-emerald-700 dark:text-emerald-300 sm:mt-2.5 sm:px-2.5 sm:py-2.5 sm:text-[9px]">
          You’re now speaking with a Daydream Club support teammate.
        </div>
        <div className="mt-auto flex h-6 items-center rounded-md border border-border/50 bg-muted/40 px-1.5 text-[6px] text-muted-foreground sm:h-7 sm:px-2 sm:text-[7px]">
          <span className="min-w-0 flex-1 truncate">Write a reply…</span>
          <span className="grid size-3.5 place-items-center rounded-full bg-primary text-primary-foreground sm:size-4"><ArrowUp className="size-2" /></span>
        </div>
      </section>

      <div className="absolute bottom-[13%] left-[12%] rounded-full border border-border/60 bg-surface/85 px-2 py-1 font-mono text-[6px] uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md sm:px-2.5 sm:text-[7px]">
        Grounded + human
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
          Design Studio
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
