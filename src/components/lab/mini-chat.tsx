import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "@phosphor-icons/react"

const KB = `## About
Nova Finance is a digital-first microfinance institution founded in 2020, headquartered in Phnom Penh, Cambodia. Licensed by the National Bank of Cambodia, we serve over 50,000 customers across 25 provinces.

## Products & Services
Personal Loan: $200-$10,000 | 3-36 months | From 1.2% per month

Business Loan: $1,000-$50,000 | 6-60 months | From 1.0% per month

Nova Savings Account: 5.5% annual interest | Minimum deposit $50

## FAQ
Q: How do I apply for a loan?
A: Apply online at novafinance.com.kh or through the Nova Finance mobile app.

Q: What documents do I need?
A: Valid Cambodian National ID or Passport and last 3 months of bank statements.

Q: Can I repay my loan early?
A: Yes, with no early repayment penalties.

## Policies
Eligibility: Applicants must be aged 18-65 with a minimum monthly income of $250.

Data Privacy: Compliant with Cambodian Law on Data Privacy.`

interface MiniMessage {
  role: "user" | "bot"
  content: string
}

export default function MiniChat() {
  const [messages, setMessages] = useState<MiniMessage[]>([
    {
      role: "bot",
      content:
        "Hi! Ask me anything about Nova Finance \u2014 loans, rates, eligibility, or how to apply.",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const botCount = messages.filter((m) => m.role === "bot").length
  const showCTA = botCount >= 4

  const send = async (text: string) => {
    if (isLoading || !text.trim()) return
    const question = text.trim()

    setMessages((prev) => [...prev, { role: "user", content: question }])
    setIsLoading(true)

    if (inputRef.current) inputRef.current.value = ""

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          knowledgeBase: KB,
          history: messages.slice(-8),
          companyName: "Nova Finance",
        }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.answer || data.error || "Something went wrong." },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Could not reach the server. Try again." },
      ])
    }

    setIsLoading(false)
  }

  const handleSend = () => {
    if (inputRef.current) send(inputRef.current.value)
  }

  const suggestions = ["Loan rates?", "How to apply?", "Early repayment?"]

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-white/85 dark:bg-card/90">
      {/* Header */}
      <div className="flex items-center gap-2 border-b px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <div className="flex-1">
          <p className="text-xs font-medium">Nova Finance AI</p>
          <p className="text-[10px] text-muted-foreground">Powered by Gemini</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary">
          Live
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-1 rounded-xl bg-muted px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0.12s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0.24s]" />
              </div>
            </motion.div>
          )}

          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Link
                to="/rag"
                className="inline-flex items-center gap-1.5 rounded-full border bg-background px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                Try the full demo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-1.5 px-3 pb-1">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 border-t p-3">
        <Input
          ref={inputRef}
          placeholder="Ask a question..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSend()
            }
          }}
          className="h-9 text-sm"
        />
        <Button size="sm" onClick={handleSend} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  )
}
