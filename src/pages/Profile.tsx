import { ArrowRight, MapPin } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { BlurredBackground } from "@/components/blurred-background"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { PageContainer, PageSection } from "@/components/page-layout"
import { SectionLabel } from "@/components/section-label"
import { SiteCta } from "@/components/site-cta"
import { buttonVariants } from "@/components/ui/button"
import {
  earlierExperience,
  selectedExperience,
} from "@/lib/portfolio-content"
import { cn } from "@/lib/utils"

export default function Profile() {
  return (
    <div className="overflow-x-clip">
      <PageSection className="relative isolate min-h-[48rem] overflow-hidden pb-24 pt-36 md:flex md:min-h-[64rem] md:items-center md:pb-32 md:pt-44">
        <BlurredBackground image="blue-leaves" position="72% 42%" className="opacity-90" />
        <div aria-hidden="true" className="portfolio-hero-glow opacity-60" />
        <PageContainer className="relative z-10 grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
          <FadeInWhenVisible className="lg:col-span-8">
            <SectionLabel line={false}>Profile</SectionLabel>
            <h1 className="mt-12 max-w-4xl text-balance font-display text-[clamp(3.65rem,7.7vw,7rem)] font-medium leading-[0.98] tracking-[-0.06em]">
              Vibe coding, backed by actual judgment.
            </h1>
            <p className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              A lot of people can ask AI to generate code. I&rsquo;m good at
              directing it, reading what it produces, spotting when it is
              confidently wrong, and debugging the final 20% that turns a
              promising demo into working software.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/lab"
                className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-8 text-base")}
              >
                View selected work
                <ArrowRight className="ml-1 transition-transform duration-200 group-hover/button:translate-x-1 motion-reduce:transition-none" />
              </Link>
              <Link
                to="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full bg-transparent px-8 text-base"
                )}
              >
                Start a conversation
              </Link>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.12} className="lg:col-span-4">
            <dl>
              <div className="border-b pb-9">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Current
                </dt>
                <dd className="mt-3 text-lg leading-relaxed">
                  Senior Digital Product Owner, AI Lead
                </dd>
              </div>
              <div className="pt-9">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Based
                </dt>
                <dd className="mt-3 flex items-center gap-2 text-lg">
                  <MapPin className="size-5 text-primary" /> Phnom Penh, Cambodia
                </dd>
              </div>
            </dl>
          </FadeInWhenVisible>
        </PageContainer>
      </PageSection>

      <PageSection>
        <PageContainer>
          <FadeInWhenVisible className="max-w-3xl">
            <SectionLabel>Selected experience</SectionLabel>
            <h2 className="mt-10 text-balance font-display text-[clamp(2.75rem,5.4vw,5rem)] font-medium leading-[1.02] tracking-[-0.055em]">
              The work most relevant to what I do now.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A progression from operating products to leading AI work where the
              prompts, answers, edge cases, and delivery all matter.
            </p>
          </FadeInWhenVisible>

          <div className="mt-20 md:mt-28">
            {selectedExperience.map((entry, index) => (
              <FadeInWhenVisible key={`${entry.company}-${entry.role}`} delay={index * 0.08}>
                <article className="grid gap-6 border-t py-10 md:grid-cols-12 md:gap-10 md:py-12">
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
                      {entry.period}
                    </p>
                    {entry.current && (
                      <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-2xl font-medium tracking-[-0.035em] md:text-3xl">
                      {entry.role}
                    </h3>
                    <p className="mt-1 font-medium text-primary">{entry.company}</p>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                      {entry.summary}
                    </p>
                  </div>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible className="mt-24 md:mt-32">
            <SectionLabel line={false} className="text-muted-foreground">
              Earlier experience
            </SectionLabel>
            <div className="mt-8 border-t">
              {earlierExperience.map(([period, role, company]) => (
                <div
                  key={`${period}-${role}`}
                  className="grid gap-2 border-b py-6 text-sm md:grid-cols-12 md:gap-10 md:text-base"
                >
                  <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground md:col-span-3">
                    {period}
                  </p>
                  <p className="md:col-span-9">
                    <span className="font-medium text-foreground">{role}</span>
                    <span className="text-muted-foreground"> · {company}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Education
              </p>
              <p className="mt-5 text-base">
                <span className="font-medium">Bachelor of Science</span>
                <span className="text-muted-foreground">
                  {" "}· Asia Pacific International University, 2016
                </span>
              </p>
            </div>
          </FadeInWhenVisible>
        </PageContainer>
      </PageSection>

      <SiteCta title="Have a messy idea that AI could help build?" />
    </div>
  )
}
