import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Snippet = {
  filename: string
  code: string
}

const snippets: Snippet[] = [
  {
    filename: "aliya.ts",
    code: `const aliya = {
  name: "Aliya Koy",
  role: "Vibe Coder",
  codingSkills: "basic HTML/CSS",
  aiSkills: "darn good at debugging & directing",
  status: "scrolling IG reels for inspo",
}`,
  },
  {
    filename: "workflow.ts",
    code: `const workflow = {
  tools: ["Antigravity", "VS Code", "OpenCode", "Codex"],
  step1: "find cool UI on Youtube",
  step2: "direct AI to build it",
  step3: "AI messes up the layout",
  step4: "debug it like a pro",
  step5: "ship without manual tweaking",
}`,
  },
  {
    filename: "offline.yaml",
    code: `# offline.yaml
hobbies:
  - karaoke
  - piano
  - cycling & walking
  - reading books
backlog:
  gunpla_status: "both legs finished"
  last_touched: "over a year ago"
  environment: "covered in dust (lmao)"`,
  },
]

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "export", "import",
  "from", "async", "await", "class", "def", "if", "else", "while", "for",
  "true", "false", "null", "undefined", "None", "True", "False",
])

const TOKEN_RE = /(\/\/.*$|#.*$|"[^"]*"|'[^']*'|`[^`]*`|[{}[\]():;,=\->]|\b\w+\b|\d+|\s+)/g

function highlightLine(line: string): React.ReactNode[] {
  const tokens = line.match(TOKEN_RE) || [line]
  return tokens.map((token, i) => {
    let color = "text-zinc-600/90 dark:text-zinc-300/90" // default text
    if (/^(\/\/|#)/.test(token)) color = "text-zinc-500/70 dark:text-zinc-400/70 italic" // comments
    else if (/^["'`]/.test(token)) color = "text-emerald-600 dark:text-emerald-400" // strings
    else if (KEYWORDS.has(token)) color = "text-violet-600 dark:text-violet-400" // keywords
    else if (/^\d+$/.test(token)) color = "text-amber-600 dark:text-amber-400" // numbers
    else if (/^[{}[\]():;,=\->]$/.test(token)) color = "text-zinc-500 dark:text-zinc-400" // punctuation
    return (
      <span key={i} className={color}>
        {token}
      </span>
    )
  })
}

function useTypewriter(
  allSnippets: Snippet[],
  { typeSpeed = 45, deleteSpeed = 18, pauseMs = 2500 }: {
    typeSpeed?: number
    deleteSpeed?: number
    pauseMs?: number
  } = {}
) {
  const [displayedCode, setDisplayedCode] = useState(allSnippets[0].code.slice(0, 3))
  const [snippetIdx, setSnippetIdx] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")
  const charIdxRef = useRef(3)

  useEffect(() => {
    const current = allSnippets[snippetIdx].code

    if (phase === "typing") {
      if (charIdxRef.current < current.length) {
        const delay = typeSpeed + Math.random() * 25
        const timer = setTimeout(() => {
          charIdxRef.current++
          setDisplayedCode(current.slice(0, charIdxRef.current))
        }, delay)
        return () => clearTimeout(timer)
      }
      const timer = setTimeout(() => setPhase("pausing"), 500)
      return () => clearTimeout(timer)
    }

    if (phase === "pausing") {
      const timer = setTimeout(() => setPhase("deleting"), pauseMs)
      return () => clearTimeout(timer)
    }

    if (phase === "deleting") {
      if (charIdxRef.current > 0) {
        const timer = setTimeout(() => {
          charIdxRef.current--
          setDisplayedCode(current.slice(0, charIdxRef.current))
        }, deleteSpeed)
        return () => clearTimeout(timer)
      }
      const next = (snippetIdx + 1) % allSnippets.length
      setSnippetIdx(next)
      setPhase("typing")
    }
  }, [displayedCode, phase, snippetIdx, allSnippets, typeSpeed, deleteSpeed, pauseMs])

  return {
    code: displayedCode,
    filename: allSnippets[snippetIdx].filename,
    isTyping: phase === "typing",
  }
}

export function CodeEditor({ className }: { className?: string }) {
  const { code, filename, isTyping } = useTypewriter(snippets)
  const lines = code.split("\n")

  return (
    <div className={cn("overflow-hidden rounded-xl rag-glass-shell shadow-2xl border-none", className)}>
      <div className="flex items-center gap-2 px-4 py-3 rag-glass-header border-b border-border/10">
        <div className="flex gap-1.5 shrink-0">
          <div className="h-3 w-3 rounded-full bg-red-400/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
          <div className="h-3 w-3 rounded-full bg-amber-400/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
          <div className="h-3 w-3 rounded-full bg-green-400/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
        </div>
        <div className="flex-1 text-center pr-12">
          <span className="text-[11px] font-medium tracking-wide text-foreground/60">{filename}</span>
        </div>
      </div>
      <div className="min-h-[260px] overflow-hidden px-4 py-5 font-mono text-sm leading-relaxed rag-glass-content">
        {lines.map((line, i) => (
          <div key={i} className="flex min-h-[1.625rem]">
            <span className="mr-4 w-6 shrink-0 select-none text-right text-foreground/30">
              {i + 1}
            </span>
            <span className="whitespace-pre-wrap break-all text-foreground/80">
              {highlightLine(line)}
            </span>
          </div>
        ))}
        <span
          className={cn(
            "ml-0.5 inline-block h-[1.125rem] w-[0.45em] align-middle",
            isTyping ? "bg-primary/80" : "animate-pulse bg-primary/40"
          )}
        />
      </div>
    </div>
  )
}
