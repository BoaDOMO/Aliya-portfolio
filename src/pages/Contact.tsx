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
import { PageContainer } from "@/components/page-layout"

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
    <div className="flex min-h-[calc(100svh-4rem)] items-center py-12 md:py-16">
      <FadeInWhenVisible>
        <PageContainer className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
          {/* Left: heading + tagline + contact info */}
          <FadeInWhenVisible delay={0.1}>
            <div className="md:col-span-5 md:py-4">
              <SectionLabel>// get in touch</SectionLabel>
              <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-primary sm:text-6xl">
                Let&rsquo;s talk.
              </h1>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
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
                        className="mt-0.5 block break-words rounded-sm text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          <FadeInWhenVisible delay={0.2} className="md:col-span-7">
            <Card className="card-featured flex h-full flex-col pb-0">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 pb-4">
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                  {status === "sending" && "Sending your message."}
                  {status === "success" && "Message sent successfully."}
                  {status === "error" && "Message failed to send. Please try again or email directly."}
                </div>
                {status === "success" ? (
                  <div className="flex flex-col items-center py-10 text-center" role="status">
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
                      className="min-h-36 resize-y"
                      required
                      disabled={status === "sending"}
                    />
                    {status === "error" && (
                      <p className="text-sm text-destructive" role="alert">
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
        </PageContainer>
      </FadeInWhenVisible>
    </div>
  )
}
