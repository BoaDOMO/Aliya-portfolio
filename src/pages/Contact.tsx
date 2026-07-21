import { useState, type FormEvent } from "react"
import {
  ArrowUpRight,
  CheckCircle,
  Envelope,
  LinkedinLogo,
  MapPin,
  PaperPlaneRight,
} from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/components/floating-label-input"
import { FloatingLabelTextarea } from "@/components/floating-label-textarea"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { SectionLabel } from "@/components/section-label"
import { PageContainer, PageSection } from "@/components/page-layout"

const contactItems = [
  {
    icon: Envelope,
    label: "Email",
    value: "aliyakoy365@gmail.com",
    href: "mailto:aliyakoy365@gmail.com",
  },
  {
    icon: LinkedinLogo,
    label: "LinkedIn",
    value: "linkedin.com/in/aliya-koy",
    href: "https://www.linkedin.com/in/aliya-koy-b48b761b1/",
    external: true,
  },
]

const FORMSPREE_URL = "https://formspree.io/f/maqvdroo"
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactStatus = "idle" | "sending" | "success" | "error"
type ContactField = "name" | "email" | "message"
type ContactErrors = Partial<Record<ContactField, string>>

function validateContactForm(data: FormData) {
  const errors: ContactErrors = {}
  const name = String(data.get("name") ?? "").trim()
  const email = String(data.get("email") ?? "").trim()
  const message = String(data.get("message") ?? "").trim()

  if (!name) {
    errors.name = "Enter your name."
  }

  if (!email) {
    errors.email = "Enter your email address."
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter an email address in the format name@example.com."
  }

  if (!message) {
    errors.message = "Tell me a little about what you are working on."
  } else if (message.length < 10) {
    errors.message = "Add a little more detail so I can understand the context."
  }

  return errors
}

export default function Contact() {
  const [status, setStatus] = useState<ContactStatus>("idle")
  const [errors, setErrors] = useState<ContactErrors>({})

  const clearError = (field: ContactField) => {
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status === "error") {
      setStatus("idle")
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (status === "sending") {
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors = validateContactForm(data)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus("idle")
      const firstField = Object.keys(nextErrors)[0] as ContactField
      const firstControl = form.elements.namedItem(firstField)
      if (firstControl instanceof HTMLElement) {
        firstControl.focus()
      }
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

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <PageSection className="py-14 md:py-20">
      <PageContainer className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeInWhenVisible className="lg:col-span-5 lg:pt-4">
          <SectionLabel>// get in touch</SectionLabel>
          <h1 className="mt-4 max-w-lg font-display text-5xl font-bold leading-none tracking-tight text-primary sm:text-6xl">
            Have a messy idea worth building?
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            I&rsquo;m especially useful when AI can make something real faster, but
            the prompting, debugging, or product direction still needs a human
            who knows what to look for.
          </p>

          <div className="mt-8 flex items-start gap-3 border-y py-4 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium">Phnom Penh, Cambodia</p>
              <p className="mt-0.5 text-muted-foreground">
                GMT+7 · Available for remote collaboration
              </p>
            </div>
          </div>

          <div className="divide-y border-b">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group flex min-h-16 items-center justify-between gap-4 rounded-sm py-3 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium">
                      {item.value}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
            ))}
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1} className="lg:col-span-7">
          <Card className="card-featured gap-0 p-6 md:p-8">
            {status === "success" ? (
              <div
                className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                role="status"
              >
                <CheckCircle className="h-12 w-12 text-primary" />
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">
                  Message sent.
                </h2>
                <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
                  Thanks for the context. I&rsquo;ll review it and get back to you
                  as soon as I can.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6 h-10 px-4"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  Tell me what you want to build.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A few sentences is enough. What is the idea, what have you
                  tried, and where is it getting stuck?
                </p>

                <div className="sr-only" aria-live="polite" aria-atomic="true">
                  {status === "sending" && "Sending your message."}
                  {status === "error" &&
                    "Message failed to send. Try again or email directly."}
                </div>

                <form
                  action={FORMSPREE_URL}
                  method="POST"
                  noValidate
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-5"
                >
                  <div className="space-y-1.5">
                    <FloatingLabelInput
                      id="contact-name"
                      name="name"
                      label="Name"
                      autoComplete="name"
                      required
                      disabled={status === "sending"}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      onChange={() => clearError("name")}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <FloatingLabelInput
                      id="contact-email"
                      name="email"
                      type="email"
                      label="Email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      disabled={status === "sending"}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      onChange={() => clearError("email")}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <FloatingLabelTextarea
                      id="contact-message"
                      name="message"
                      label="What are you trying to build?"
                      className="min-h-40 resize-y"
                      minLength={10}
                      required
                      disabled={status === "sending"}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                      onChange={() => clearError("message")}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p
                      className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                      role="alert"
                    >
                      Your message was not sent. Try again, or email me directly
                      at aliyakoy365@gmail.com.
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="h-11 w-full px-5"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? "Starting the conversation..."
                      : "Start a conversation"}
                    <PaperPlaneRight className="ml-1 h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </Card>
        </FadeInWhenVisible>
      </PageContainer>
    </PageSection>
  )
}
