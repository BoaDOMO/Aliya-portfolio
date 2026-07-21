import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { isOnboardingDismissed, dismissOnboarding } from "@/lib/localstorage-state"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const STEPS = [
  {
    title: "Choose a starting point",
    body: "Pick a style preset, then adjust the generated theme instead of beginning with every token at once.",
  },
  {
    title: "Shape color and type",
    body: "Use the inspector for broad decisions. Select an individual value when you need precise control.",
  },
  {
    title: "Review and export",
    body: "Check quality from the app bar, compare modes in Split view, then export the format your project needs.",
  },
]

export default function OnboardingTour() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (isOnboardingDismissed()) return
    const timer = window.setTimeout(() => setOpen(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    dismissOnboarding()
    setOpen(false)
  }

  const next = () => {
    if (step === STEPS.length - 1) dismiss()
    else setStep((current) => current + 1)
  }

  const current = STEPS[step]

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && dismiss()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex gap-1.5" aria-hidden="true">
            {STEPS.map((_, index) => (
              <span key={index} className={`h-1 flex-1 rounded-full ${index <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
          <DialogTitle className="text-xl">{current.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">{current.body}</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={dismiss}
            className="h-10 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Skip tour
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((currentStep) => currentStep - 1)}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {step === STEPS.length - 1 ? "Start building" : "Next"}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
