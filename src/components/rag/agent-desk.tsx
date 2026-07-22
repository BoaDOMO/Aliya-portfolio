import { useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowClockwise,
  BookOpenText,
  Check,
  CheckCircle,
  Clock,
  Copy,
  DotsThree,
  Lightning,
  MagnifyingGlass,
  MagicWand,
  Note,
  PaperPlaneTilt,
  Robot,
  Tray,
  User,
  WarningCircle,
  X,
} from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ModeToggle } from "@/components/mode-toggle"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ToolAtmosphere, ToolSectionLabel, ToolStatusPill } from "@/components/tool-shell"

type ThreadStatus = "open" | "pending" | "resolved"
type MessageRole = "customer" | "agent" | "note"
type ComposerMode = "reply" | "note"
type InboxFilter = "all" | ThreadStatus
type AssistState = "idle" | "loading" | "ready"

interface AgentMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: number
  author?: string
}

interface Thread {
  id: string
  name: string
  initials: string
  email: string
  preview: string
  lastActivity: string
  status: ThreadStatus
  unread: boolean
  tags: string[]
  plan: string
  messages: AgentMessage[]
}

const KNOWLEDGE_KEY = "kb-prasac-rag-knowledge-v1"

const DEFAULT_KNOWLEDGE = [
  "# KB Prasac AI Assistant",
  "",
  "This retrieval set supports a retail banking assistant for KB Prasac Bank. Answers should be clear, cautious, and grounded in the supplied product and support policies.",
  "",
  "# Account access",
  "",
  "Customers can reset a forgotten passcode from the KB Prasac mobile app sign-in screen. If a device is lost or account activity looks suspicious, contact the bank's support team immediately. Never request a full password, PIN, or one-time passcode in chat.",
  "",
  "# Transfers",
  "",
  "Local transfers can take up to one business day to appear. Before escalating, confirm the transfer date, destination account, and whether the app shows a pending or failed status. Do not promise a reversal without a confirmed case reference.",
  "",
  "# Card support",
  "",
  "A card can be temporarily locked from Cards in the mobile app. A replacement is required when a card is stolen or the card number may be exposed. Ask the customer to verify only the last four digits; never collect a full card number or CVV.",
  "",
  "# Human handoff",
  "",
  "Escalate complaints, suspected fraud, vulnerable-customer concerns, and requests involving account-specific investigation to a human support team. Keep the handoff summary factual and include the customer's preferred callback channel.",
  "",
  "# Answer policy",
  "",
  "Q: Can I tell a customer their transfer will arrive today?",
  "A: No. Explain the normal processing window and check the current status instead.",
  "",
  "Q: What should the assistant do when the knowledge base is silent?",
  "A: Say that the information is not available, avoid guessing, and offer a human handoff.",
].join("\n")

function message(
  role: MessageRole,
  content: string,
  minutesAgo: number,
  author?: string
): AgentMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: Date.now() - minutesAgo * 60_000,
    author,
  }
}

function createSeedThreads(): Thread[] {
  return [
    {
      id: "simulator",
      name: "You · customer simulator",
      initials: "YO",
      email: "testing this workspace",
      preview: "My local transfer is still pending.",
      lastActivity: "now",
      status: "open",
      unread: true,
      tags: ["customer simulator"],
      plan: "Monthly member",
      messages: [
        message(
          "customer",
          "Hey, my local transfer is still pending. When should it arrive?",
          8
        ),
        message(
          "agent",
          "Local transfers can take up to one business day to appear. I’ll check the current status with you, and I won’t promise a completion time until that status is confirmed.",
          7,
          "KB Prasac AI"
        ),
        message(
          "customer",
          "When should my transfer arrive?",
          1
        ),
      ],
    },
    {
      id: "milo",
      name: "Milo Rivera",
      initials: "MR",
      email: "milo.rivera@example.com",
      preview: "I think someone used my card.",
      lastActivity: "12m",
      status: "pending",
      unread: false,
      tags: ["fraud review", "card security"],
      plan: "Retail banking customer",
      messages: [
        message(
          "customer",
          "I think someone used my card. I don’t recognize the last transaction.",
          17
        ),
        message(
          "agent",
          "I’m sorry this looks suspicious. Please temporarily lock the card in the app and I’ll prepare a human handoff for an account-specific investigation.",
          12,
          "KB Prasac AI"
        ),
        message(
          "note",
          "Fraud concern. Do not collect full card details; hand off with transaction context.",
          11,
          "Private note"
        ),
      ],
    },
    {
      id: "jun",
      name: "Jun Park",
      initials: "JP",
      email: "jun.park@example.com",
      preview: "How do I reset a forgotten passcode?",
      lastActivity: "Yesterday",
      status: "resolved",
      unread: false,
      tags: ["account access"],
      plan: "Retail banking customer",
      messages: [
        message(
          "customer",
          "How do I reset a forgotten passcode?",
          1_440
        ),
        message(
          "agent",
          "Open the KB Prasac mobile app and choose the reset option from the sign-in screen. If you suspect unusual account activity, contact support immediately.",
          1_430,
          "KB Prasac AI"
        ),
      ],
    },
  ]
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })
}

function loadKnowledge() {
  try {
    return localStorage.getItem(KNOWLEDGE_KEY) || DEFAULT_KNOWLEDGE
  } catch {
    return DEFAULT_KNOWLEDGE
  }
}

function fallbackSuggestion(question: string) {
  const normalized = question.toLowerCase()

  if (
    normalized.includes("address") ||
    normalized.includes("ship") ||
    normalized.includes("deliver")
  ) {
    return "Local transfers can take up to one business day to appear. Please check whether the transfer is pending or failed before we escalate it to the support team."
  }

  if (
    normalized.includes("return") ||
    normalized.includes("refund") ||
    normalized.includes("damaged") ||
    normalized.includes("missing")
  ) {
    return "I’m sorry this looks suspicious. Please temporarily lock the card in the KB Prasac app and I’ll prepare a human handoff. Never share your full card number or CVV in chat."
  }

  if (normalized.includes("skip") || normalized.includes("cancel")) {
    return "Open the KB Prasac mobile app and choose the reset option from the sign-in screen. If you suspect unusual account activity, contact support immediately."
  }

  return "I’m checking the KB Prasac knowledge base for a grounded answer. If the policy is not covered, I’ll recommend a human handoff instead of guessing."
}

function answerFromQuestion(messages: AgentMessage[]) {
  return [...messages].reverse().find((item) => item.role === "customer")?.content || ""
}

export default function AgentDesk() {
  const [threads, setThreads] = useState<Thread[]>(createSeedThreads)
  const [activeThreadId, setActiveThreadId] = useState("simulator")
  const [inboxFilter, setInboxFilter] = useState<InboxFilter>("all")
  const [customerDraft, setCustomerDraft] = useState("")
  const [agentDraft, setAgentDraft] = useState("")
  const [composerMode, setComposerMode] = useState<ComposerMode>("reply")
  const [knowledge, setKnowledge] = useState(loadKnowledge)
  const [knowledgeDraft, setKnowledgeDraft] = useState(loadKnowledge)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false)
  const [assistDraft, setAssistDraft] = useState("")
  const [assistState, setAssistState] = useState<AssistState>("idle")
  const [copied, setCopied] = useState(false)
  const customerComposerRef = useRef<HTMLTextAreaElement>(null)
  const agentComposerRef = useRef<HTMLTextAreaElement>(null)

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || threads[0],
    [activeThreadId, threads]
  )
  const simulatorThread = useMemo(
    () => threads.find((thread) => thread.id === "simulator") || threads[0],
    [threads]
  )

  const filteredThreads = useMemo(() => {
    if (inboxFilter === "all") return threads
    return threads.filter((thread) => thread.status === inboxFilter)
  }, [inboxFilter, threads])

  const counts = useMemo(
    () => ({
      all: threads.length,
      open: threads.filter((thread) => thread.status === "open").length,
      pending: threads.filter((thread) => thread.status === "pending").length,
      resolved: threads.filter((thread) => thread.status === "resolved").length,
    }),
    [threads]
  )

  const customerMessages = simulatorThread.messages.filter(
    (item) => item.role !== "note"
  )
  const latestQuestion = answerFromQuestion(activeThread.messages)

  function updateThread(
    update: (thread: Thread) => Thread,
    threadId = activeThreadId
  ) {
    setThreads((current) =>
      current.map((thread) => (thread.id === threadId ? update(thread) : thread))
    )
  }

  function addMessage(role: MessageRole, content: string, threadId = activeThreadId) {
    const nextMessage = message(
      role,
      content,
      0,
      role === "agent"
        ? "You · agent"
        : role === "note"
          ? "Private note"
          : undefined
    )

    updateThread((thread) => ({
      ...thread,
      messages: [...thread.messages, nextMessage],
      preview: content,
      lastActivity: "now",
      status: role === "customer" ? "open" : thread.status,
      unread: role === "customer",
    }), threadId)
  }

  function handleCustomerSend() {
    const content = customerDraft.trim()
    if (!content) return

    addMessage("customer", content, "simulator")
    setActiveThreadId("simulator")
    setCustomerDraft("")
    setAssistDraft("")
    setAssistState("idle")
    requestAnimationFrame(() => customerComposerRef.current?.focus())
  }

  function handleAgentSend() {
    const content = agentDraft.trim()
    if (!content) return

    addMessage(composerMode === "reply" ? "agent" : "note", content)
    setAgentDraft("")
    if (composerMode === "reply") {
      toast.success("Reply sent to the customer simulator")
    } else {
      toast.success("Private note added")
    }
    requestAnimationFrame(() => agentComposerRef.current?.focus())
  }

  async function handleSuggestReply() {
    if (!latestQuestion) {
      toast("Ask something from the customer first.")
      return
    }

    setAssistState("loading")
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: latestQuestion,
          knowledgeBase: knowledge,
          persona:
            "You are the careful support copilot for KB Prasac Bank. Suggest a concise, warm reply based only on the provided knowledge base. Do not invent policies, request secrets, or promise an outcome the source does not support. Return only the suggested customer-facing reply.",
          history: activeThread.messages
            .filter((item) => item.role !== "note")
            .slice(-8)
            .map((item) => ({
              role: item.role === "customer" ? "user" : "assistant",
              content: item.content,
            })),
          sessionId: crypto.randomUUID(),
          companyName: "KB Prasac Bank",
        }),
      })
      const body = (await response.json()) as { answer?: string }
      if (!response.ok || !body.answer) throw new Error("AI assist unavailable")
      setAssistDraft(body.answer)
      setAssistState("ready")
    } catch {
      setAssistDraft(fallbackSuggestion(latestQuestion))
      setAssistState("ready")
      toast("Using the local demo suggestion — add your API key for Gemini replies.")
    }
  }

  function handleInsertAssist() {
    setComposerMode("reply")
    setAgentDraft(assistDraft)
    setAssistDraft("")
    setAssistState("idle")
    requestAnimationFrame(() => agentComposerRef.current?.focus())
  }

  function handleWarmAssist() {
    if (!assistDraft) return
    setAssistDraft((current) =>
      current.startsWith("Absolutely") || current.startsWith("I’m")
        ? current
        : "Absolutely — " + current.charAt(0).toLowerCase() + current.slice(1)
    )
  }

  function handleSetStatus(status: ThreadStatus) {
    updateThread((thread) => ({ ...thread, status, unread: false }))
    toast.success(status === "resolved" ? "Conversation resolved" : "Marked " + status)
  }

  function handleSelectThread(threadId: string) {
    setActiveThreadId(threadId)
    setAssistDraft("")
    setAssistState("idle")
    setThreads((current) =>
      current.map((thread) =>
        thread.id === threadId ? { ...thread, unread: false } : thread
      )
    )
  }

  function handleReset() {
    setThreads(createSeedThreads())
    setActiveThreadId("simulator")
    setCustomerDraft("")
    setAgentDraft("")
    setAssistDraft("")
    setAssistState("idle")
    setComposerMode("reply")
    toast.success("Demo session reset")
  }

  async function handleCopyConversation() {
    const log = activeThread.messages
      .map((item) => {
        const author =
          item.role === "customer"
            ? activeThread.name
            : item.author || (item.role === "agent" ? "Agent" : "Note")
        return author + ": " + item.content
      })
      .join("\\n\\n")

    try {
      await navigator.clipboard.writeText(log)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = log
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      textarea.remove()
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  function handleOpenKnowledge(open: boolean) {
    setKnowledgeOpen(open)
    if (open) setKnowledgeDraft(knowledge)
  }

  function handleSaveKnowledge() {
    setKnowledge(knowledgeDraft)
    try {
      localStorage.setItem(KNOWLEDGE_KEY, knowledgeDraft)
    } catch {
      // Storage is optional for this demo.
    }
    setKnowledgeOpen(false)
    toast.success("Knowledge base updated")
  }

  function handleCustomerKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleCustomerSend()
    }
  }

  function handleAgentKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleAgentSend()
    }
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-tool-canvas text-foreground">
      <ToolAtmosphere />
      <header className="relative z-10 flex h-13 shrink-0 items-center border-b border-border/80 bg-tool-panel/90 px-3 backdrop-blur-md sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            to="/lab"
            aria-label="Back to Lab"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised text-primary">
            <Lightning className="size-4" weight="fill" />
          </div>
          <div className="min-w-0 border-l border-border pl-3">
            <p className="truncate text-sm font-semibold">RAG Assistant Lab</p>
            <p className="hidden text-xs text-muted-foreground sm:block">Grounded banking support</p>
          </div>
        </div>

        <div className="ml-5 hidden items-center gap-2 border-l border-border pl-4 md:flex">
          <span className="size-2 rounded-full bg-success" />
          <span className="text-xs font-medium">KB Prasac Bank</span>
          <span className="font-mono text-[10px] text-muted-foreground">RAG / LIVE</span>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={() => handleOpenKnowledge(true)} className="h-8 gap-1.5 px-2.5 text-xs">
            <BookOpenText className="size-3.5" />
            <span className="hidden sm:inline">Knowledge</span>
            <span className="font-mono text-[10px] text-muted-foreground">1</span>
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleReset} aria-label="Reset demo" className="text-muted-foreground">
            <ArrowClockwise className="size-4" />
          </Button>
          <ModeToggle />
        </div>
      </header>

      <main className="relative z-10 min-h-0 flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-5">
        <div className="mx-auto grid min-h-full w-full max-w-[1320px] grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <section className="flex min-h-[600px] min-w-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface-raised/90 shadow-[0_20px_60px_-44px_color-mix(in_oklch,var(--foreground)_34%,transparent)] backdrop-blur-md lg:min-h-0">
            <div className="flex items-start gap-3 border-b border-border px-4 py-4 sm:px-5">
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-control text-muted-foreground">
                <User className="size-3.5" weight="bold" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-lg font-semibold tracking-tight">Customer simulator</h1>
                  <ToolStatusPill tone="success">Mirrored</ToolStatusPill>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">Test the banking journey against the assistant.</p>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col bg-background">
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-[300px] space-y-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    <span>Conversation</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  {customerMessages.map((item) => (
                    <CustomerMessage key={item.id} message={item} />
                  ))}
                </div>
              </div>

              <div className="border-t border-border bg-surface-raised px-3 py-3 sm:px-4">
                <div className="mx-auto max-w-[300px]">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Test a prompt</span>
                    <span className="text-[10px] text-muted-foreground">↵ send</span>
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {["Transfer pending?", "Lock my card", "Reset passcode"].map((prompt) => (
                      <button key={prompt} type="button" onClick={() => setCustomerDraft(prompt)} className="rounded-md border border-border bg-transparent px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:border-border-strong hover:bg-muted hover:text-foreground">
                        {prompt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Textarea
                      ref={customerComposerRef}
                      value={customerDraft}
                      onChange={(event) => setCustomerDraft(event.target.value)}
                      onKeyDown={handleCustomerKeyDown}
                      rows={2}
                      placeholder="Write as the customer…"
                      className="min-h-[68px] resize-none border-border-strong bg-surface-control pr-11 text-sm shadow-none"
                    />
                    <Button size="icon" onClick={handleCustomerSend} disabled={!customerDraft.trim()} aria-label="Send customer message" className="absolute right-2 bottom-2 size-8 rounded-lg">
                      <PaperPlaneTilt className="size-4" weight="fill" />
                    </Button>
                  </div>
                  <p className="mt-1.5 text-center font-mono text-[10px] text-muted-foreground">Shift + Enter for a new line</p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex min-h-[600px] min-w-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface-raised/90 shadow-[0_20px_60px_-44px_color-mix(in_oklch,var(--foreground)_34%,transparent)] backdrop-blur-md lg:min-h-0">
            <div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-semibold tracking-tight">Agent workspace</h2>
                  <ToolStatusPill tone="info">Grounded</ToolStatusPill>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">Inspect retrieval, draft a reply, and ship the right next step.</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" aria-label="Search inbox" className="text-muted-foreground" onClick={() => toast("Inbox search is ready for the next pass.")}>
                  <MagnifyingGlass className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="More inbox actions" className="text-muted-foreground" onClick={() => toast("More inbox actions are ready for the next pass.")}>
                  <DotsThree className="size-5" weight="bold" />
                </Button>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[190px_minmax(0,1fr)]">
              <aside className="flex min-h-0 flex-col border-b border-border bg-surface-raised lg:border-r lg:border-b-0">
                <div className="shrink-0 px-3 py-3">
                  <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Views</p>
                  <div className="space-y-0.5">
                    <InboxFilterButton active={inboxFilter === "all"} count={counts.all} label="All conversations" icon={<Tray className="size-3.5" />} onClick={() => setInboxFilter("all")} />
                    <InboxFilterButton active={inboxFilter === "open"} count={counts.open} label="Open" icon={<span className="size-1.5 rounded-full bg-primary" />} onClick={() => setInboxFilter("open")} />
                    <InboxFilterButton active={inboxFilter === "pending"} count={counts.pending} label="Pending" icon={<Clock className="size-3.5" />} onClick={() => setInboxFilter("pending")} />
                    <InboxFilterButton active={inboxFilter === "resolved"} count={counts.resolved} label="Resolved" icon={<CheckCircle className="size-3.5" />} onClick={() => setInboxFilter("resolved")} />
                  </div>
                </div>

                <div className="min-h-0 flex-1 border-t border-border px-3 py-3">
                  <div className="mb-2 flex items-center justify-between px-2">
                    <ToolSectionLabel>Threads</ToolSectionLabel>
                    <span className="font-mono text-[10px] text-muted-foreground">{filteredThreads.length}</span>
                  </div>
                  <div className="min-h-0 space-y-0.5 overflow-y-auto">
                    {filteredThreads.map((thread) => (
                      <button key={thread.id} type="button" onClick={() => handleSelectThread(thread.id)} className={cn("w-full rounded-md border px-2.5 py-2 text-left transition-colors", activeThreadId === thread.id ? "border-border-strong bg-surface-control" : "border-transparent hover:border-border hover:bg-muted")}>
                        <div className="flex items-center gap-2">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-background font-mono text-[9px] font-semibold text-primary">{thread.initials}</span>
                          <span className="min-w-0 flex-1 truncate text-[11px] font-medium">{thread.name}</span>
                          {thread.unread && <span className="size-1.5 rounded-full bg-primary" />}
                        </div>
                        <p className="mt-1 truncate pl-8 text-[10px] text-muted-foreground">{thread.preview}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hidden shrink-0 border-t border-border px-3 py-3 lg:block">
                  <p className="px-2 text-[11px] leading-relaxed text-muted-foreground">The customer chat on the left is connected to the “You” conversation.</p>
                </div>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-col bg-background">
                <div className="flex items-center gap-3 border-b border-border bg-surface-raised px-4 py-3 sm:px-5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-control font-mono text-[10px] font-semibold text-primary">{activeThread.initials}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{activeThread.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{activeThread.email}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto hidden font-mono text-[10px] sm:inline-flex">{activeThread.status}</Badge>
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon-sm" onClick={handleCopyConversation} aria-label="Copy conversation" className="text-muted-foreground">
                      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" aria-label="More conversation actions" className="text-muted-foreground" onClick={() => toast("Conversation actions are ready for the next pass.")}>
                      <DotsThree className="size-5" weight="bold" />
                    </Button>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
                    <div className="mx-auto max-w-[720px] space-y-5">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        <span className="h-px flex-1 bg-border" />
                        <span>{activeThread.status === "resolved" ? "Resolved" : "Today"}</span>
                        <span className="h-px flex-1 bg-border" />
                      </div>

                      {filteredThreads.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-border-strong bg-surface-raised p-6 text-center">
                          <WarningCircle className="mx-auto size-6 text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">No {inboxFilter} conversations</p>
                          <p className="mt-1 text-xs text-muted-foreground">Try another inbox view.</p>
                        </div>
                      ) : (
                        activeThread.messages.map((item) => (
                          <AgentMessage key={item.id} message={item} customerName={activeThread.name} />
                        ))
                      )}

                      {assistState === "loading" && (
                        <div className="ml-8 flex max-w-xl items-center gap-2 border-l-2 border-primary px-3 py-2 text-xs text-muted-foreground">
                          <span className="size-1.5 animate-pulse rounded-full bg-primary" />Copilot is checking the knowledge base…
                        </div>
                      )}

                      {assistDraft && assistState === "ready" && (
                        <div className="ml-8 max-w-xl border-l-2 border-primary bg-surface-control px-4 py-3">
                          <div className="flex items-start gap-2">
                            <Robot className="mt-0.5 size-4 shrink-0 text-primary" weight="fill" />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-xs font-semibold">Grounded draft</p>
                                <ToolStatusPill tone="info">3 source passages</ToolStatusPill>
                              </div>
                              <p className="mt-2 text-sm leading-relaxed">{assistDraft}</p>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                <Button size="sm" onClick={handleInsertAssist}>Insert draft</Button>
                                <Button size="sm" variant="outline" onClick={handleWarmAssist}>Make warmer</Button>
                                <button type="button" aria-label="Dismiss AI suggestion" onClick={() => { setAssistDraft(""); setAssistState("idle") }} className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                                  <X className="size-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border bg-surface-raised px-3 py-3 sm:px-5">
                    <div className="mx-auto max-w-[720px]">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
                          <ComposerModeButton active={composerMode === "reply"} onClick={() => setComposerMode("reply")} icon={<PaperPlaneTilt className="size-3.5" />} label="Reply" />
                          <ComposerModeButton active={composerMode === "note"} onClick={() => setComposerMode("note")} icon={<Note className="size-3.5" />} label="Internal note" />
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleSuggestReply} disabled={assistState === "loading" || !latestQuestion} className="gap-1.5 text-xs text-primary hover:text-primary">
                          <MagicWand className="size-3.5" />Suggest reply
                        </Button>
                      </div>

                      <div className="relative">
                        <Textarea ref={agentComposerRef} value={agentDraft} onChange={(event) => setAgentDraft(event.target.value)} onKeyDown={handleAgentKeyDown} rows={3} placeholder={composerMode === "reply" ? "Write a reply to the customer…" : "Leave a private note for the support team…"} className={cn("min-h-[78px] resize-none pr-12 text-sm shadow-none", composerMode === "note" ? "border-warning/40 bg-warning/5" : "border-border-strong bg-surface-control")} />
                        <Button size="icon" onClick={handleAgentSend} disabled={!agentDraft.trim()} aria-label={composerMode === "reply" ? "Send reply" : "Add internal note"} className="absolute right-2 bottom-2 size-8 rounded-lg">
                          {composerMode === "reply" ? <PaperPlaneTilt className="size-4" weight="fill" /> : <Note className="size-4" />}
                        </Button>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <p className="font-mono text-[10px] text-muted-foreground">{composerMode === "reply" ? "Sent replies appear in the customer chat." : "Private to the support team."}</p>
                        <div className="flex items-center gap-1.5">
                          <Button variant="outline" size="sm" onClick={() => handleSetStatus("pending")} className="hidden h-7 text-[11px] sm:inline-flex"><Clock className="size-3.5" />Snooze</Button>
                          <Button variant={activeThread.status === "resolved" ? "secondary" : "outline"} size="sm" onClick={() => handleSetStatus(activeThread.status === "resolved" ? "open" : "resolved")} className="h-7 gap-1 text-[11px]">
                            {activeThread.status === "resolved" ? <><ArrowClockwise className="size-3.5" />Reopen</> : <><CheckCircle className="size-3.5" />Resolve</>}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Dialog open={knowledgeOpen} onOpenChange={handleOpenKnowledge}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-4xl overflow-y-auto">
          <div className="space-y-1 pr-8">
            <DialogTitle className="font-display text-2xl">What KB Prasac AI knows</DialogTitle>
            <DialogDescription>One editable retrieval set. The assistant finds relevant passages before it drafts a reply.</DialogDescription>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/45 px-3 py-2">
            <div className="flex items-center gap-2">
              <BookOpenText className="size-4 text-primary" />
              <span className="font-mono text-[11px]">knowledge.md</span>
              <Badge variant="secondary" className="font-mono text-[10px]">1 document</Badge>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{knowledgeDraft.length.toLocaleString()} characters</span>
          </div>
          <Textarea value={knowledgeDraft} onChange={(event) => setKnowledgeDraft(event.target.value)} spellCheck={false} className="h-[430px] max-h-[50vh] resize-none overflow-y-auto bg-surface-control font-mono text-xs leading-relaxed shadow-none" aria-label="KB Prasac knowledge base" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">Use headings to keep the document readable. Paragraphs are retrieved automatically when the agent drafts a reply.</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setKnowledgeDraft(DEFAULT_KNOWLEDGE)}>Reset document</Button>
              <Button onClick={handleSaveKnowledge} disabled={knowledgeDraft === knowledge}>Save knowledge</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CustomerMessage({ message: item }: { message: AgentMessage }) {
  const isCustomer = item.role === "customer"
  return (
    <div className={cn("flex flex-col gap-1", isCustomer ? "items-end" : "items-start")}>
      <div className={cn("flex items-center gap-2 font-mono text-[10px] text-muted-foreground", isCustomer && "flex-row-reverse")}>
        <span>{isCustomer ? "You" : "KB Prasac AI"}</span>
        <span>{formatTime(item.timestamp)}</span>
      </div>
      <div className={cn("max-w-[280px] border px-3 py-2.5 text-sm leading-relaxed", isCustomer ? "border-primary/30 bg-primary/10 text-foreground" : "border-border bg-surface-control text-foreground")}>
        {item.content}
      </div>
    </div>
  )
}

function AgentMessage({ message: item, customerName }: { message: AgentMessage; customerName: string }) {
  if (item.role === "note") {
    return (
      <div className="mx-auto max-w-2xl border-l-2 border-warning bg-warning/5 px-3.5 py-3">
        <div className="flex items-center gap-2 text-warning"><Note className="size-3.5" /><span className="font-mono text-[10px] uppercase tracking-[0.12em]">Internal note</span><span className="ml-auto font-mono text-[10px] text-muted-foreground">{formatTime(item.timestamp)}</span></div>
        <p className="mt-1.5 text-sm leading-relaxed">{item.content}</p>
      </div>
    )
  }

  const isCustomer = item.role === "customer"
  return (
    <div className={cn("flex", isCustomer ? "justify-start" : "justify-end")}>
      <div className="max-w-[min(85%,42rem)]">
        <div className={cn("mb-1 flex items-center gap-2", !isCustomer && "justify-end")}><span className="text-xs font-medium">{isCustomer ? customerName : item.author || "You · agent"}</span><span className="font-mono text-[10px] text-muted-foreground">{formatTime(item.timestamp)}</span></div>
        <div className={cn("border px-4 py-3 text-sm leading-relaxed", isCustomer ? "border-border bg-surface-control" : "border-primary bg-primary text-primary-foreground")}>{item.content}</div>
      </div>
    </div>
  )
}

function InboxFilterButton({ active, count, label, icon, onClick }: { active: boolean; count: number; label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-left text-xs transition-colors", active ? "border-border-strong bg-surface-control font-medium text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground")}>
      <span className="flex w-4 items-center justify-center text-primary">{icon}</span><span className="flex-1 whitespace-nowrap">{label}</span><span className="font-mono text-[10px] text-muted-foreground">{count}</span>
    </button>
  )
}

function ComposerModeButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] transition-colors", active ? "bg-surface-featured text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground")}>{icon}{label}</button>
  )
}
