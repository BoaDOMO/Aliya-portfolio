import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface Persona {
  company: string
  role: string
  instructions: string
}

interface KB {
  about: string
  products: string
  faq: string
  policies: string
}

interface KBEditorProps {
  persona: Persona
  kb: KB
  onSave: (persona: Persona, kb: KB) => void
  className?: string
}

type FileKey = "persona" | "about" | "products" | "faq" | "policies"

const FILE_TABS: { key: FileKey; label: string }[] = [
  { key: "persona", label: "PERSONA" },
  { key: "about", label: "ABOUT" },
  { key: "products", label: "PRODUCTS" },
  { key: "faq", label: "FAQ" },
  { key: "policies", label: "POLICIES" },
]

export default function KBEditor({
  persona,
  kb,
  onSave,
  className,
}: KBEditorProps) {
  const [activeFile, setActiveFile] = useState<FileKey>("persona")
  const [localPersona, setLocalPersona] = useState(persona)
  const [localKb, setLocalKb] = useState(kb)

  // Sync when parent data changes (e.g. company switch)
  useEffect(() => {
    setLocalPersona(persona)
    setLocalKb(kb)
  }, [persona, kb])

  const dirty =
    JSON.stringify(localPersona) !== JSON.stringify(persona) ||
    JSON.stringify(localKb) !== JSON.stringify(kb)

  const handleSave = () => {
    onSave(localPersona, localKb)
  }

  const handleDiscard = useCallback(() => {
    setLocalPersona(persona)
    setLocalKb(kb)
    setActiveFile("persona")
  }, [persona, kb])

  // Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        if (dirty) handleSave()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  // beforeunload guard
  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [dirty])

  const fileName =
    activeFile === "persona" ? "persona.yaml" : `${activeFile}.md`

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3.5 h-12">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-zinc-500">{fileName}</span>
        </div>
        <div className="flex items-center gap-1">
          {dirty && (
            <button
              onClick={handleDiscard}
              className="rounded px-2.5 py-0.5 font-mono text-[11px] text-zinc-400 transition-colors hover:text-zinc-200"
            >
              Discard
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!dirty}
            className={cn(
              "rounded px-2.5 py-0.5 font-mono text-[11px] transition-colors",
              dirty
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            )}
          >
            Save
          </button>
        </div>
      </div>

      {/* File tabs */}
      <div className="flex gap-0 border-b border-zinc-800 px-2">
        {FILE_TABS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveFile(f.key)}
            className={cn(
              "px-3 py-1.5 font-mono text-[11px] transition-colors",
              activeFile === f.key
                ? "border-b-2 border-primary text-zinc-200"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Editor body */}
      <div className="flex-1 overflow-y-auto">
        {activeFile === "persona" ? (
          <PersonaEditor
            persona={localPersona}
            onChange={setLocalPersona}
          />
        ) : (
          <CodeTextarea
            value={localKb[activeFile]}
            onChange={(v) =>
              setLocalKb((prev) => ({ ...prev, [activeFile]: v }))
            }
            label={FILE_TABS.find((f) => f.key === activeFile)!.label}
          />
        )}
      </div>
    </div>
  )
}

/* ─── Persona Editor (form) ─── */

function PersonaEditor({
  persona,
  onChange,
}: {
  persona: Persona
  onChange: (p: Persona) => void
}) {
  return (
    <div className="font-mono text-xs">
      {[
        { label: "Company Name", value: persona.company, key: "company" as const },
        { label: "AI Role / Title", value: persona.role, key: "role" as const },
      ].map((field) => (
        <EditorLine key={field.key} label={field.label} center>
          <input
            value={field.value}
            onChange={(e) =>
              onChange({ ...persona, [field.key]: e.target.value })
            }
            className="flex-1 bg-transparent text-zinc-200 outline-none placeholder:text-zinc-600"
          />
        </EditorLine>
      ))}
      <EditorLine label="System Instructions" isLast>
        <textarea
          value={persona.instructions}
          onChange={(e) =>
            onChange({ ...persona, instructions: e.target.value })
          }
          rows={6}
          className="w-full resize-none bg-transparent text-zinc-200 outline-none placeholder:text-zinc-600"
          placeholder="Define how the AI should behave..."
        />
      </EditorLine>
    </div>
  )
}

/* ─── Code Textarea (KB sections) ─── */

function CodeTextarea({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (v: string) => void
  label: string
}) {
  const lines = value ? value.split("\n") : [""]

  return (
    <div className="relative font-mono text-xs leading-relaxed">
      <div className="pointer-events-none absolute left-0 top-0 w-10 select-none pt-3 text-right text-zinc-600">
        {lines.map((_, i) => (
          <div key={i} className="h-[1.375rem] pr-3">
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.max(lines.length, 15)}
        className="w-full resize-none bg-transparent pl-11 pr-3 pt-3 text-zinc-200 outline-none placeholder:text-zinc-600"
        placeholder={`Enter ${label.toLowerCase()} content...`}
        spellCheck={false}
      />
    </div>
  )
}

/* ─── Editor Line ─── */

function EditorLine({
  label,
  children,
  isLast = false,
  center = false,
}: {
  label: string
  children: React.ReactNode
  isLast?: boolean
  center?: boolean
}) {
  return (
    <div className={cn("flex gap-3 px-4", center ? "items-center" : "items-start", isLast ? "pb-3 pt-3" : "border-b border-zinc-800/50 py-3")}>
      <span className="w-32 shrink-0 text-right text-zinc-500">{label}</span>
      {children}
    </div>
  )
}
