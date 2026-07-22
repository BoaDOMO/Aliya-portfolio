import { useState, type FormEvent } from "react"
import { CheckCircle, PaperPlaneRight } from "@phosphor-icons/react"
import { BlurredBackground } from "@/components/blurred-background"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { PageContainer, PageSection } from "@/components/page-layout"
import { SectionLabel } from "@/components/section-label"
import { Button } from "@/components/ui/button"

const FORMSPREE_URL = "https://formspree.io/f/maqvdroo"
const EMAIL = "aliyakoy365@gmail.com"
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactStatus = "idle" | "sending" | "success" | "error"
type ContactField = "name" | "email" | "message"
type ContactErrors = Partial<Record<ContactField, string>>

function validate(data: FormData) {
  const errors: ContactErrors = {}
  const name = String(data.get("name") ?? "").trim()
  const email = String(data.get("email") ?? "").trim()
  const message = String(data.get("message") ?? "").trim()

  if (!name) errors.name = "Enter your name."
  if (!email) errors.email = "Enter your email address."
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address."
  if (!message) errors.message = "Tell me a little about what you are building."
  else if (message.length < 10) errors.message = "Add a little more detail so I can understand the context."

  return errors
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  )
}

export default function Contact() {
  const [status, setStatus] = useState<ContactStatus>("idle")
  const [errors, setErrors] = useState<ContactErrors>({})

  const clearError = (field: ContactField) => {
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status === "error") setStatus("idle")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return

    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors = validate(data)

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      const first = Object.keys(nextErrors)[0] as ContactField
      const control = form.elements.namedItem(first)
      if (control instanceof HTMLElement) control.focus()
      return
    }

    setErrors({})
    setStatus("sending")

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (!response.ok) throw new Error("Submission failed")
      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="overflow-x-clip">
      <PageSection className="relative isolate min-h-[42rem] overflow-hidden pb-24 pt-36 md:flex md:min-h-[46rem] md:items-center md:pb-28 md:pt-44">
        <BlurredBackground image="hydrangea" position="46% 44%" className="opacity-80" />
        <div aria-hidden="true" className="portfolio-hero-glow opacity-55" />
        <PageContainer className="relative z-10">
          <FadeInWhenVisible>
            <SectionLabel line={false}>Contact</SectionLabel>
            <h1 className="mt-12 max-w-6xl text-balance font-display text-[clamp(3.65rem,8vw,7rem)] font-medium leading-[0.98] tracking-[-0.06em]">
              Let&rsquo;s start a conversation.
            </h1>
            <p className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Have a messy idea that AI could help build? Looking for someone to
              direct the model, debug the output, and finish the software?
              Let&rsquo;s talk.
            </p>
          </FadeInWhenVisible>
        </PageContainer>
      </PageSection>

      <PageSection className="py-24 md:py-32">
        <PageContainer width="editorial">
          <FadeInWhenVisible>
            <SectionLabel>Send a message</SectionLabel>

            {status === "success" ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
                <CheckCircle className="size-12 text-primary" />
                <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.045em]">
                  Message sent.
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                  Thanks for the context. I&rsquo;ll review it and get back to you as soon as I can.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-8 h-12 rounded-full bg-transparent px-7"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                action={FORMSPREE_URL}
                method="POST"
                noValidate
                onSubmit={handleSubmit}
                className="mt-14 space-y-14"
              >
                <div>
                  <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    onChange={() => clearError("name")}
                    className="portfolio-field"
                  />
                  <FieldError id="contact-name-error" message={errors.name} />
                </div>

                <div>
                  <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    onChange={() => clearError("email")}
                    className="portfolio-field"
                  />
                  <FieldError id="contact-email-error" message={errors.email} />
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    What are you building?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    minLength={10}
                    placeholder="Tell me about your idea, the stage you’re at, and what you need…"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    onChange={() => clearError("message")}
                    className="portfolio-field resize-y"
                  />
                  <FieldError id="contact-message-error" message={errors.message} />
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-12 rounded-full px-8 text-base"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <PaperPlaneRight className="ml-1" />
                  </Button>
                  <p className="text-sm text-muted-foreground">Typically replies within 1–2 days.</p>
                </div>

                <div className="sr-only" aria-live="polite" aria-atomic="true">
                  {status === "sending" && "Sending your message."}
                </div>
                {status === "error" && (
                  <p role="alert" className="border-l-2 border-destructive pl-4 text-sm text-destructive">
                    Your message was not sent. Try again, or email me directly at {EMAIL}.
                  </p>
                )}
              </form>
            )}
          </FadeInWhenVisible>
        </PageContainer>
      </PageSection>

      <PageSection className="relative isolate min-h-[34rem] overflow-hidden py-24 text-center md:flex md:min-h-[40rem] md:items-center md:py-32">
        <BlurredBackground image="blue-flower" position="50% 52%" className="opacity-70" />
        <PageContainer className="relative z-10">
          <FadeInWhenVisible className="mx-auto max-w-3xl">
            <SectionLabel align="center">Or directly</SectionLabel>
            <p className="mt-10 text-lg text-muted-foreground">Prefer email? Reach out at</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-5 inline-block rounded-sm font-display text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-[-0.045em] text-primary outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring"
            >
              {EMAIL}
            </a>
          </FadeInWhenVisible>
        </PageContainer>
      </PageSection>
    </div>
  )
}
