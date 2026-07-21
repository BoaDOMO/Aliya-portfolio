import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

type SignalFieldVariant = "hero" | "warm" | "project" | "tool"

export function SignalField({
  variant = "hero",
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { variant?: SignalFieldVariant }) {
  return (
    <div
      aria-hidden="true"
      className={cn("signal-field", `signal-field-${variant}`, className)}
      {...props}
    />
  )
}

export function HeroTraceGraphic({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 720 560"
      className={cn("trace-graphic", className)}
    >
      <path
        className="trace-line trace-line-muted"
        d="M54 122H172C212 122 214 78 254 78H600C638 78 654 96 654 132V214"
      />
      <path
        className="trace-line trace-line-muted"
        d="M102 474H234C270 474 284 448 284 416V368"
      />
      <path
        className="trace-line trace-line-strong trace-line-animated"
        d="M28 276H116C152 276 160 244 196 244H506C548 244 554 276 596 276H692"
      />
      <path
        className="trace-line trace-line-dashed"
        d="M210 244V164C210 140 228 122 252 122H332"
      />
      <path
        className="trace-line trace-line-dashed"
        d="M522 276V388C522 420 546 444 578 444H668"
      />

      <circle className="trace-node trace-node-strong" cx="28" cy="276" r="6" />
      <circle className="trace-node" cx="196" cy="244" r="5" />
      <circle className="trace-node" cx="506" cy="244" r="5" />
      <circle className="trace-node trace-node-pulse" cx="692" cy="276" r="7" />
      <circle className="trace-node trace-node-small" cx="332" cy="122" r="4" />
      <circle className="trace-node trace-node-small" cx="668" cy="444" r="4" />

      <text className="trace-label" x="24" y="254">PROMPT</text>
      <text className="trace-label" x="188" y="222">INSPECT</text>
      <text className="trace-label" x="498" y="222">DEBUG</text>
      <text className="trace-label trace-label-strong" x="642" y="254">SHIP</text>
      <text className="trace-coordinate" x="46" y="112">01 / INPUT</text>
      <text className="trace-coordinate" x="558" y="432">04 / VERIFIED</text>
    </svg>
  )
}

export function CapabilityTrace({
  kind,
  className,
}: {
  kind: "direct" | "debug" | "finish"
  className?: string
}) {
  if (kind === "direct") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 280 104" className={cn("trace-graphic", className)}>
        <path className="trace-line trace-line-strong" d="M18 52H82C104 52 104 24 126 24H240" />
        <path className="trace-line trace-line-muted" d="M82 52C104 52 104 80 126 80H224" />
        <circle className="trace-node trace-node-strong" cx="18" cy="52" r="5" />
        <circle className="trace-node" cx="82" cy="52" r="4" />
        <circle className="trace-node trace-node-pulse" cx="240" cy="24" r="6" />
        <circle className="trace-node trace-node-small" cx="224" cy="80" r="4" />
        <text className="trace-coordinate" x="132" y="16">USEFUL PATH</text>
        <text className="trace-coordinate" x="132" y="98">CUT NOISE</text>
      </svg>
    )
  }

  if (kind === "debug") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 280 104" className={cn("trace-graphic", className)}>
        <path className="trace-line trace-line-muted trace-line-dashed" d="M18 28H102L126 52L102 76H62" />
        <path className="trace-line trace-line-strong" d="M126 52H262" />
        <circle className="trace-node" cx="18" cy="28" r="5" />
        <circle className="trace-node trace-node-error" cx="126" cy="52" r="7" />
        <circle className="trace-node trace-node-pulse" cx="262" cy="52" r="6" />
        <path className="trace-mark" d="M121 47L131 57M131 47L121 57" />
        <text className="trace-coordinate" x="18" y="18">OUTPUT</text>
        <text className="trace-coordinate" x="188" y="43">FIXED</text>
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 280 104" className={cn("trace-graphic", className)}>
      <path className="trace-line trace-line-strong" d="M18 68H62V36H126V68H190V36H258" />
      <circle className="trace-node" cx="18" cy="68" r="5" />
      <circle className="trace-node trace-node-small" cx="62" cy="36" r="4" />
      <circle className="trace-node trace-node-small" cx="126" cy="68" r="4" />
      <circle className="trace-node trace-node-small" cx="190" cy="36" r="4" />
      <circle className="trace-node trace-node-pulse" cx="258" cy="36" r="7" />
      <path className="trace-mark" d="M253 36L257 40L264 30" />
      <text className="trace-coordinate" x="18" y="90">PASS 01</text>
      <text className="trace-coordinate" x="202" y="26">SHIPPED</text>
    </svg>
  )
}

export function ProjectTraceGraphic({
  kind,
  className,
}: {
  kind: "retrieval" | "tokens"
  className?: string
}) {
  if (kind === "retrieval") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 760 540" className={cn("trace-graphic", className)}>
        <path className="trace-line trace-line-muted" d="M38 92H172C208 92 222 116 222 150V208" />
        <path className="trace-line trace-line-muted" d="M38 450H156C202 450 222 424 222 380V332" />
        <path className="trace-line trace-line-strong trace-line-animated" d="M54 270H706" />
        <path className="trace-line trace-line-dashed" d="M222 208V332" />
        <path className="trace-line trace-line-dashed" d="M526 270V116H686" />
        <circle className="trace-node" cx="54" cy="270" r="7" />
        <circle className="trace-node" cx="222" cy="270" r="6" />
        <circle className="trace-node" cx="526" cy="270" r="6" />
        <circle className="trace-node trace-node-pulse" cx="706" cy="270" r="8" />
        <text className="trace-label" x="42" y="248">ASK</text>
        <text className="trace-label" x="204" y="248">FIND</text>
        <text className="trace-label" x="506" y="248">DRAFT</text>
        <text className="trace-label trace-label-strong" x="664" y="248">ANSWER</text>
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 760 540" className={cn("trace-graphic", className)}>
      <path className="trace-line trace-line-strong trace-line-animated" d="M74 270H226C262 270 270 214 306 214H454C490 214 498 270 534 270H692" />
      <path className="trace-line trace-line-muted" d="M306 214V112H520" />
      <path className="trace-line trace-line-muted" d="M454 214V404H620" />
      <path className="trace-line trace-line-dashed" d="M226 270V404H116" />
      <circle className="trace-node trace-node-strong" cx="74" cy="270" r="8" />
      <circle className="trace-node" cx="226" cy="270" r="6" />
      <circle className="trace-node" cx="306" cy="214" r="6" />
      <circle className="trace-node" cx="454" cy="214" r="6" />
      <circle className="trace-node trace-node-pulse" cx="692" cy="270" r="8" />
      <text className="trace-label" x="48" y="246">BRAND</text>
      <text className="trace-label" x="280" y="190">ROLES</text>
      <text className="trace-label trace-label-strong" x="640" y="246">THEME</text>
      <text className="trace-coordinate" x="450" y="100">TYPE SCALE</text>
      <text className="trace-coordinate" x="532" y="426">SEMANTIC COLOR</text>
    </svg>
  )
}

export function RetrievalFlowGraphic({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 640 220" className={cn("trace-graphic", className)}>
      <rect className="trace-panel" x="24" y="32" width="104" height="40" rx="10" />
      <rect className="trace-panel" x="24" y="90" width="104" height="40" rx="10" />
      <rect className="trace-panel" x="24" y="148" width="104" height="40" rx="10" />
      <path className="trace-line trace-line-muted" d="M128 52H184C214 52 214 110 244 110" />
      <path className="trace-line trace-line-strong trace-line-animated" d="M128 110H512" />
      <path className="trace-line trace-line-muted" d="M128 168H184C214 168 214 110 244 110" />
      <circle className="trace-node" cx="244" cy="110" r="7" />
      <circle className="trace-node" cx="382" cy="110" r="7" />
      <circle className="trace-node trace-node-pulse" cx="512" cy="110" r="9" />
      <path className="trace-line trace-line-strong" d="M512 110H602" />
      <text className="trace-coordinate" x="44" y="57">ABOUT</text>
      <text className="trace-coordinate" x="38" y="115">PRODUCTS</text>
      <text className="trace-coordinate" x="49" y="173">POLICY</text>
      <text className="trace-label" x="220" y="90">FIND</text>
      <text className="trace-label" x="354" y="90">GROUND</text>
      <text className="trace-label trace-label-strong" x="500" y="90">ANSWER</text>
    </svg>
  )
}

export function ContactRouteGraphic({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 720 520" className={cn("trace-graphic", className)}>
      <path className="trace-line trace-line-muted" d="M36 102H174C212 102 224 126 224 164V222" />
      <path className="trace-line trace-line-strong trace-line-animated" d="M52 260H280C316 260 328 236 364 236H672" />
      <path className="trace-line trace-line-dashed" d="M280 260V408H126" />
      <path className="trace-line trace-line-muted" d="M492 236V108H654" />
      <circle className="trace-node" cx="52" cy="260" r="7" />
      <circle className="trace-node" cx="280" cy="260" r="6" />
      <circle className="trace-node" cx="492" cy="236" r="6" />
      <circle className="trace-node trace-node-pulse" cx="672" cy="236" r="8" />
      <text className="trace-label" x="40" y="238">IDEA</text>
      <text className="trace-label" x="258" y="238">CONTEXT</text>
      <text className="trace-label trace-label-strong" x="626" y="214">SEND</text>
      <text className="trace-coordinate" x="510" y="96">REPLY ROUTE</text>
    </svg>
  )
}

export function TokenRelationshipGraphic({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 520 220" className={cn("trace-graphic", className)}>
      <path className="trace-line trace-line-strong" d="M56 110H160C192 110 196 58 228 58H330" />
      <path className="trace-line trace-line-muted" d="M160 110C192 110 196 162 228 162H330" />
      <path className="trace-line trace-line-muted" d="M330 58H410C440 58 440 110 470 110" />
      <path className="trace-line trace-line-strong" d="M330 162H410C440 162 440 110 470 110" />
      <circle className="trace-node trace-node-strong" cx="56" cy="110" r="9" />
      <circle className="trace-node" cx="160" cy="110" r="7" />
      <circle className="trace-node" cx="330" cy="58" r="7" />
      <circle className="trace-node" cx="330" cy="162" r="7" />
      <circle className="trace-node trace-node-pulse" cx="470" cy="110" r="9" />
      <text className="trace-label" x="30" y="88">BRAND</text>
      <text className="trace-label" x="292" y="38">SURFACE</text>
      <text className="trace-label" x="290" y="194">ACCENT</text>
      <text className="trace-label trace-label-strong" x="442" y="88">SYSTEM</text>
    </svg>
  )
}
