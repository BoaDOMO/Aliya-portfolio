import { Link } from "react-router-dom"
import { BlurredBackground } from "@/components/blurred-background"
import { GradientText } from "@/components/gradient-text"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { PageContainer, PageSection } from "@/components/page-layout"
import { ProjectPreview } from "@/components/lab/project-preview"
import { SectionLabel } from "@/components/section-label"
import { SiteCta } from "@/components/site-cta"
import { projects } from "@/lib/portfolio-content"

export default function Lab() {
  return (
    <div className="overflow-x-clip">
      <PageSection className="relative isolate min-h-[44rem] overflow-hidden pb-24 pt-36 md:flex md:min-h-[52rem] md:items-center md:pb-32 md:pt-44">
        <BlurredBackground image="blue-flower" position="58% 38%" className="opacity-90" />
        <div aria-hidden="true" className="portfolio-hero-glow opacity-60" />
        <PageContainer className="relative z-10">
          <FadeInWhenVisible className="max-w-5xl">
            <SectionLabel line={false}>Lab</SectionLabel>
            <h1 className="mt-12 max-w-5xl text-balance font-display text-[clamp(3.65rem,8vw,7rem)] font-medium leading-[0.98] tracking-[-0.06em]">
              <GradientText colors={["#2DD4BF", "#3B82F6", "#6366F1", "#2DD4BF"]} animationSpeed={8}>
                Selected work, shipped and in progress.
              </GradientText>
            </h1>
            <p className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              The outcome of AI integration and product rigor—where prompts,
              edge cases, and delivery all matter.
            </p>
          </FadeInWhenVisible>
        </PageContainer>
      </PageSection>

      <PageSection className="py-20 md:py-28">
        <PageContainer>
          <div className="grid gap-x-12 gap-y-20 lg:grid-cols-2 lg:gap-y-28">
            {projects.map((project, index) => (
              <FadeInWhenVisible key={project.title} delay={(index % 2) * 0.1}>
                <article className="group">
                  {project.link ? (
                    <Link
                      to={project.link}
                      className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      aria-label={`Open ${project.title}`}
                    >
                      <ProjectPreview
                        number={project.number}
                        status={project.status}
                        kind={project.kind}
                      />
                    </Link>
                  ) : (
                    <ProjectPreview
                      number={project.number}
                      status={project.status}
                      kind={project.kind}
                    />
                  )}

                  <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {project.category}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.045em] transition-colors duration-200 group-hover:text-primary">
                    {project.link ? (
                      <Link
                        to={project.link}
                        className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      <SiteCta title="Want to build something that actually works?" />
    </div>
  )
}
