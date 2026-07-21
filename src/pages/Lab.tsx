import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { PageContainer, PageSection } from "@/components/page-layout"
import { SectionLabel } from "@/components/section-label"
import MiniChat from "@/components/lab/mini-chat"
import { ArrowRight, Palette, SlidersHorizontal, TextT } from "@phosphor-icons/react"

const projects = [
  {
    label: "PROJECT 01",
    status: "Live prototype",
    title: "RAG Chatbot — Nova Finance",
    description:
      "An interactive knowledge-grounded assistant that shows how retrieval boundaries, editable source material, and product UX work together.",
    contribution: "Product framing, conversation design, frontend, and serverless AI integration.",
    tech: ["Gemini", "RAG", "Vercel Functions", "Knowledge base"],
    link: "/rag",
    cta: "Try the chatbot",
    preview: "chat" as const,
  },
  {
    label: "PROJECT 02",
    status: "Working tool",
    title: "Design System Studio",
    description:
      "A browser-based workspace for exploring color, typography, component previews, and accessibility quality before exporting design tokens.",
    contribution: "Design-system modeling, interaction design, token architecture, and frontend engineering.",
    tech: ["React", "Tailwind v4", "Color science", "Accessibility"],
    link: "/design-system",
    cta: "Open the studio",
    preview: "design" as const,
  },
]

function DesignSystemPreview() {
  return (
    <Card className="card-featured flex h-full min-h-[360px] flex-col overflow-hidden p-6 md:min-h-[420px]">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Live tokens</p>
          <p className="mt-1 font-display text-xl font-semibold">Warm Precision</p>
        </div>
        <SlidersHorizontal className="h-5 w-5 text-primary" />
      </div>
      <div className="grid flex-1 content-center gap-6 py-6 sm:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Palette className="h-4 w-4" /> Color roles
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[4/3] rounded-lg bg-primary p-3 text-xs font-semibold text-primary-foreground">Primary</div>
            <div className="aspect-[4/3] rounded-lg bg-secondary p-3 text-xs font-semibold text-secondary-foreground">Secondary</div>
            <div className="aspect-[4/3] rounded-lg border bg-background p-3 text-xs font-semibold">Canvas</div>
            <div className="aspect-[4/3] rounded-lg border bg-card p-3 text-xs font-semibold">Surface</div>
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <TextT className="h-4 w-4" /> Type roles
          </div>
          <div className="space-y-3 rounded-lg border bg-background/60 p-4">
            <p className="font-display text-3xl font-bold tracking-tight">Display</p>
            <p className="text-sm leading-relaxed text-muted-foreground">Readable product copy with a calm editorial rhythm.</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Metadata 12PX</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>Contrast checks included</span>
        <span className="font-mono text-primary">AA ✓</span>
      </div>
    </Card>
  )
}

export default function Lab() {
  return (
    <div>
      <PageSection>
        <FadeInWhenVisible>
          <PageContainer>
            <Card className="card-featured p-8 md:p-10">
              <SectionLabel>// the lab</SectionLabel>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Things I&rsquo;m building.
              </h1>
              <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Working experiments in AI, product design, and frontend systems—with the decisions visible, not just the demos.
              </p>
            </Card>
          </PageContainer>
        </FadeInWhenVisible>
      </PageSection>

      <PageSection>
        <PageContainer className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <FadeInWhenVisible key={project.title} delay={index * 0.08}>
              <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={index % 2 ? "md:order-2 md:col-span-5" : "md:col-span-5"}>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{project.label}</p>
                    <Badge variant="outline" className="font-mono text-[10px] text-primary">{project.status}</Badge>
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">{project.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>
                  <p className="mt-4 text-sm leading-relaxed">
                    <span className="font-semibold">My contribution:</span> {project.contribution}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono text-[10px]">{tech}</Badge>
                    ))}
                  </div>
                  <Button render={<Link to={project.link} />} className="mt-7" size="sm">
                    {project.cta}<ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className={index % 2 ? "md:order-1 md:col-span-7" : "md:col-span-7"}>
                  {project.preview === "chat" ? (
                    <div className="h-[420px] md:h-[460px]"><MiniChat /></div>
                  ) : (
                    <DesignSystemPreview />
                  )}
                </div>
              </article>
            </FadeInWhenVisible>
          ))}
        </PageContainer>
      </PageSection>
    </div>
  )
}
