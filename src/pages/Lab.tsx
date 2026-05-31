import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { SectionLabel } from "@/components/section-label"
import MiniChat from "@/components/lab/mini-chat"
import { ArrowRight } from "@phosphor-icons/react"

const projects = [
  {
    label: "PROJECT 01 \u2014 LIVE DEMO",
    title: "RAG Chatbot \u2014 Nova Finance",
    description:
      "An interactive RAG demo where the AI answers questions based only on a live knowledge base \u2014 the same architecture used in real-world enterprise AI assistants.",
    tech: ["Gemini", "RAG", "Vercel Functions", "Embeddings"],
    link: "/rag",
  },
]

export default function Lab() {
  return (
    <div>
      {/* ── Hero ── */}
      <div className="py-12 md:py-20">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-6xl px-6">
            <Card className="rounded-xl border p-8 md:p-10 bg-white/85 dark:bg-card">
              <SectionLabel>// the lab</SectionLabel>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Things I&rsquo;m building.
              </h1>
              <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
              <p className="mt-4 max-w-lg text-base text-muted-foreground">
                Experiments, prototypes, and side projects.
              </p>
            </Card>
          </div>
        </FadeInWhenVisible>
      </div>

      {/* ── Projects ── */}
      <div className="bg-muted/30 py-12 md:py-20">
        <FadeInWhenVisible delay={0.1}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-16">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="grid gap-8 md:grid-cols-2"
                >
                  {/* Info */}
                  <div className="flex flex-col justify-center">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {project.label}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="font-mono text-[10px]"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button
                        render={<Link to={project.link} />}
                        size="sm"
                      >
                        Try the full demo
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Mini Chat Widget */}
                  <div className="h-[400px] md:h-[460px]">
                    <MiniChat />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  )
}
