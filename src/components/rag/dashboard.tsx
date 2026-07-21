import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  ArrowCounterClockwise,
  ClipboardText,
  ArrowsLeftRight,
} from "@phosphor-icons/react"

type Status = "ready" | "retrieving" | "generating" | "offline"
type PipelineStage = -1 | 0 | 1 | 2 | 3

const NODES = ["Ask", "Find", "Draft", "Answer"] as const

const STATUS_MAP: Record<Status, { dot: string; label: string }> = {
  ready: { dot: "bg-primary", label: "Ready" },
  retrieving: { dot: "bg-blue-500 animate-pulse", label: "Retrieving\u2026" },
  generating: { dot: "bg-amber-500 animate-pulse", label: "Generating\u2026" },
  offline: { dot: "bg-destructive", label: "Offline" },
}

export interface ChatMessage {
  id?: string
  role: "user" | "assistant"
  content: string
  isError?: boolean
  timestamp?: number
}

interface DashboardProps {
  status: Status
  pipelineStage: PipelineStage
  msgCount: number
  avgTime: string
  companyName: string
  sessionStart: number
  kbFillCount: number
  recentMessages: ChatMessage[]
  responseTimes: number[]
  onReset: () => void
  onCopy: () => void
  onOpenCompanyPicker: () => void
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + "\u2026" : text
}

export default function Dashboard({
  status,
  pipelineStage,
  msgCount,
  avgTime,
  companyName,
  sessionStart,
  kbFillCount,
  recentMessages,
  responseTimes,
  onReset,
  onCopy,
  onOpenCompanyPicker,
}: DashboardProps) {
  const s = STATUS_MAP[status]

  // Session timer
  const [elapsed, setElapsed] = useState("")
  useEffect(() => {
    const update = () => {
      const seconds = Math.floor((Date.now() - sessionStart) / 1000)
      const m = Math.floor(seconds / 60)
      const s = seconds % 60
      setElapsed(`${m}m ${s.toString().padStart(2, "0")}s`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [sessionStart])

  const maxTime = Math.max(...responseTimes.slice(-8), 1)

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden rounded-xl border bg-white/85 dark:bg-card/90">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2.5 h-12">
        <span className={cn("h-2 w-2 rounded-full", s.dot)} />
        <div className="flex-1">
          <p className="text-xs font-medium">{companyName} AI</p>
          <p className="text-[10px] text-muted-foreground">
            {s.label} · AI Assistant
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5 pt-4">

        {/* 2. Answer flow */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Answer flow
          </p>
          <div className="flex items-center gap-0">
            {NODES.map((label, i) => {
              const active = i === pipelineStage
              const done = i < pipelineStage
              const last = i === NODES.length - 1
              return (
                <div key={label} className="flex items-center gap-0">
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      animate={active ? { scale: [1, 1.3, 1] } : {}}
                      transition={
                        active
                          ? { duration: 0.8, repeat: Infinity }
                          : { duration: 0 }
                      }
                      title={
                        active
                          ? `Running: ${label}`
                          : done
                            ? `Complete: ${label}`
                            : `Pending: ${label}`
                      }
                      className={cn(
                        "h-2 w-2 rounded-full",
                        done || active ? "bg-primary" : "bg-border"
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-xs whitespace-nowrap",
                        done || active
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {!last && (
                    <div
                      className={cn(
                        "mx-1 h-px w-3",
                        done ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        {/* 3. Session */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Session
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {msgCount} exchange{msgCount !== 1 ? "s" : ""}
            <span className="mx-1.5">·</span>
            {elapsed}
            <span className="mx-1.5">·</span>
            avg {avgTime}
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="h-7 px-2.5 text-xs"
            >
              <ArrowCounterClockwise className="mr-1 h-3 w-3" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="h-7 px-2.5 text-xs"
            >
              <ClipboardText className="mr-1 h-3 w-3" />
              Copy Log
            </Button>
          </div>
        </div>

        {/* 4. Recent Conversation */}
        {recentMessages.length > 0 && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Recent
            </p>
            <div className="space-y-1.5">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-lg border bg-background px-2.5 py-1.5"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                    <span
                      className={cn(
                        "font-medium",
                        msg.role === "user"
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {msg.role === "user" ? "You" : "AI"}
                    </span>
                    {msg.timestamp && (
                      <span>{formatTime(msg.timestamp)}</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {truncate(msg.content, 50)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Response Times */}
        {responseTimes.length > 1 && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Response Times
            </p>
            <div className="flex items-end gap-[3px] h-8">
              {responseTimes.slice(-8).map((t, i) => (
                <div
                  key={i}
                  title={`${(t / 1000).toFixed(1)}s`}
                  className="w-2.5 rounded-sm bg-primary/70 transition-all hover:bg-primary"
                  style={{
                    height: `${(t / maxTime) * 100}%`,
                    minHeight: t > 0 ? "4px" : "0px",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 6. Source material */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Source material
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {kbFillCount} of 4
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(kbFillCount / 4) * 100}%` }}
            />
          </div>
        </div>

        <Separator />

        {/* 7. Company picker pinned to bottom */}
        <div className="mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCompanyPicker}
            className="w-full text-xs"
          >
            <ArrowsLeftRight className="mr-1.5 h-3.5 w-3.5" />
            Switch demo scenario
          </Button>
        </div>
      </div>
    </div>
  )
}
