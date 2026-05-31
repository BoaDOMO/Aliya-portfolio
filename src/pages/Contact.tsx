import { useState, type FormEvent } from "react"
import {
  Phone,
  Envelope,
  LinkedinLogo,
  PaperPlaneRight,
  CheckCircle,
} from "@phosphor-icons/react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/components/floating-label-input"
import { FloatingLabelTextarea } from "@/components/floating-label-textarea"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { SectionLabel } from "@/components/section-label"

const contactItems = [
  {
    icon: Phone,
    label: "PHONE",
    value: "097 725 93 72",
    href: "tel:0977259372",
  },
  {
    icon: Envelope,
    label: "EMAIL",
    value: "aliyakoy365@gmail.com",
    href: "mailto:aliyakoy365@gmail.com",
  },
  {
    icon: LinkedinLogo,
    label: "LINKEDIN",
    value: "linkedin.com/in/aliya-koy",
    href: "https://www.linkedin.com/in/aliya-koy-b48b761b1/",
    external: true,
  },
]

const FORMSPREE_URL = "https://formspree.io/f/maqvdroo"

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      const json = await res.json()
      if (json.ok) {
        setStatus("success")
      } else {
        throw new Error(json.error || "Submission failed")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="flex min-h-[86vh] items-center justify-center px-6">
      <FadeInWhenVisible>
        <div className="grid w-full max-w-6xl items-stretch gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: heading + tagline + contact info */}
          <FadeInWhenVisible delay={0.1}>
            <div>
              <SectionLabel>// get in touch</SectionLabel>
              <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-primary sm:text-6xl">
                Let&rsquo;s talk.
              </h1>
              <p className="mt-2 max-w-lg font-mono text-base leading-relaxed text-muted-foreground">
                Open to interesting work and good conversations.
              </p>
              <div className="mt-8 space-y-6">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={
                          item.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="mt-0.5 block truncate text-sm font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right: Form */}
          <FadeInWhenVisible delay={0.2}>
            <Card className="flex h-full flex-col bg-white/85 dark:bg-card/90 pb-0">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 pb-4">
                {status === "success" ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Message sent!
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Thank you &mdash; I&rsquo;ll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form
                    action={FORMSPREE_URL}
                    method="POST"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 flex-1"
                  >
                    <FloatingLabelInput
                      name="name"
                      label="Name"
                      required
                      disabled={status === "sending"}
                    />
                    <FloatingLabelInput
                      name="email"
                      type="email"
                      label="Email"
                      required
                      disabled={status === "sending"}
                    />
                    <FloatingLabelTextarea
                      name="message"
                      label="Message"
                      className="min-h-0"
                      style={{ fieldSizing: "fixed" as const }}
                      required
                      disabled={status === "sending"}
                    />
                    {status === "error" && (
                      <p className="text-xs text-destructive">
                        Something went wrong. Please try again or email me
                        directly.
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={status === "sending"}
                    >
                      {status === "sending"
                        ? "Sending..."
                        : "Send message"}
                      <PaperPlaneRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeInWhenVisible>
        </div>
      </FadeInWhenVisible>
    </div>
  )
}
