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
  superpower: "building with AI",
  loop: [
    "prompt",
    "inspect",
    "debug",
    "ship",
  ],
  rule: "make it actually work",
}`,
  },
  {
    filename: "vibe-coding.ts",
    code: `const vibeCoding = {
  input:     "messy idea",
  firstPass: "probably broken",
  response:  "debug it",
  finish:    "working software",
}`,
  },
  {
    filename: "field-notes.yaml",
    code: `# field-notes.yaml
good_at:
  - steering models
  - finding real bugs
  - finishing the last 20%
belief: AI makes me faster
proof: judgment makes it good`,
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
    let color = "text-editor-foreground"
    if (/^(\/\/|#)/.test(token)) color = "text-editor-muted italic"
    else if (/^["'`]/.test(token)) color = "text-editor-string"
    else if (KEYWORDS.has(token)) color = "text-editor-keyword"
    else if (/^\d+$/.test(token)) color = "text-editor-number"
    else if (/^[{}[\]():;,=\->]$/.test(token)) color = "text-editor-muted"
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

export function CodeEditor() {
  const { code, filename, isTyping } = useTypewriter(snippets)
  const lines = code.split("\n")

  return (
    <div className="overflow-hidden rounded-xl border border-editor-border bg-editor-background shadow-[var(--shadow-card-hover)]">
      <div className="flex items-center gap-2 border-b border-editor-border px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-editor-stop" />
          <div className="h-3 w-3 rounded-full bg-editor-caution" />
          <div className="h-3 w-3 rounded-full bg-editor-go" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-editor-muted">{filename}</span>
        </div>
      </div>
      <div className="min-h-[260px] overflow-hidden px-4 py-5 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="flex min-h-[1.625rem]">
            <span className="mr-4 w-6 shrink-0 select-none text-right text-editor-subtle">
              {i + 1}
            </span>
            <span className="whitespace-pre-wrap break-all">
              {highlightLine(line)}
            </span>
          </div>
        ))}
        <span
          className={cn(
            "ml-0.5 inline-block h-[1.125rem] w-[0.45em] align-middle",
            isTyping ? "bg-primary/80" : "animate-pulse bg-primary/60"
          )}
        />
      </div>
    </div>
  )
}
