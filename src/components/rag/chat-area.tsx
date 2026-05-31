import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  PaperPlaneTilt,
  User,
  Buildings,
  Copy,
  Stop,
} from "@phosphor-icons/react"

export interface ChatMessage {
  id?: string
  role: "user" | "assistant"
  content: string
  isError?: boolean
  timestamp?: number
}

interface ChatAreaProps {
  messages: ChatMessage[]
  isLoading: boolean
  companyName: string
  suggestions: string[]
  onSend: (text: string) => void
  onStop: () => void
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function ChatArea({
  messages,
  isLoading,
  companyName,
  suggestions,
  onSend,
  onStop,
}: ChatAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    const el = inputRef.current
    if (!el || !el.value.trim() || isLoading) return
    onSend(el.value.trim())
    el.value = ""
    el.style.height = "auto"
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleCopyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      ta.remove()
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border bg-white/85 dark:bg-card/90">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2.5 h-12">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <div className="flex-1">
          <p className="text-xs font-medium">{companyName} AI</p>
          <p className="text-[10px] text-muted-foreground">
            {messages.length} message{messages.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 overflow-hidden">
        <ScrollArea ref={scrollRef} className="h-full">
          <div className="space-y-4 p-4 pb-0">
            {isEmpty && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <div className="max-w-[85%] rounded-2xl border bg-white/85 dark:bg-card/90 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Buildings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{companyName} AI</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        I can answer questions about our products, services, and
                        policies &mdash; based on what&rsquo;s in the knowledge
                        base. Try one of the suggestions below or ask your own
                        question.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((msg, i) => {
                const msgId = msg.id || `msg-${i}`
                const msgTime = msg.timestamp ? formatTime(msg.timestamp) : ""

                return (
                  <motion.div
                    key={msgId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.03,
                    }}
                    className={cn(
                      "flex items-end gap-2",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                        msg.role === "user"
                          ? "bg-primary"
                          : "bg-muted"
                      )}
                    >
                      {msg.role === "user" ? (
                        <User className="h-3.5 w-3.5 text-primary-foreground" />
                      ) : (
                        <Buildings className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div className="group max-w-[75%]">
                      <div
                        className={cn(
                          "rounded-xl px-4 py-2.5 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : msg.isError
                              ? "border border-destructive/20 bg-destructive/10 text-destructive"
                              : "bg-muted text-foreground"
                        )}
                      >
                        {msg.content}
                      </div>
                      <div
                        className={cn(
                          "mt-0.5 flex items-center gap-2",
                          msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {msgTime && (
                          <span className="text-[10px] text-muted-foreground/60">
                            {msgTime}
                          </span>
                        )}
                        {msg.role === "assistant" && !msg.isError && (
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.content)}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Copy message"
                          >
                            <Copy className="h-3 w-3 text-muted-foreground/60 hover:text-foreground" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-end gap-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Buildings className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-muted px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0.12s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0.24s]" />
                </div>
              </motion.div>
            )}
          </div>
          <div ref={bottomRef} />
        </ScrollArea>
      </div>

      {/* Suggestions */}
      {isEmpty && suggestions.length > 0 && !isLoading && (
        <div className="flex flex-wrap gap-1.5 border-t px-4 py-2.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSend(s)}
              className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-end gap-2 border-t p-3">
        <Textarea
          ref={inputRef}
          placeholder="Ask a question... (Enter to send)"
          rows={1}
          className="min-h-[36px] resize-none text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = "auto"
            el.style.height = Math.min(el.scrollHeight, 120) + "px"
          }}
        />
        {isLoading ? (
          <Button
            size="icon"
            variant="secondary"
            onClick={onStop}
            aria-label="Stop generating"
          >
            <Stop className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="icon"
            onClick={handleSend}
            aria-label="Send"
          >
            <PaperPlaneTilt className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
