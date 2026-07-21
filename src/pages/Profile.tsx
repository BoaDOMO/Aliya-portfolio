import { Link } from "react-router-dom"
import {
  ArrowRight,
  CaretDown,
  MapPin,
} from "@phosphor-icons/react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { SectionLabel } from "@/components/section-label"
import { PageContainer, PageSection } from "@/components/page-layout"

const capabilities = [
  {
    number: "01",
    title: "Direct the model",
    description:
      "Break a messy idea into clear prompts, useful constraints, and small steps the model can actually execute.",
  },
  {
    number: "02",
    title: "Debug the output",
    description:
      "Read what the AI produced, spot where it is bluffing or breaking, and keep testing until the real bug is gone.",
  },
  {
    number: "03",
    title: "Finish the software",
    description:
      "Turn the promising first pass into a coherent, responsive product instead of stopping at an impressive demo.",
  },
]

const selectedExperience = [
  {
    company: "KB Prasac Bank",
    role: "Senior Digital Product Owner (AI Lead)",
    period: "Apr 2026 – Present",
    current: true,
    summary:
      "Leading an AI assistant for a banking app—from choosing models and shaping prompts to testing answers, debugging failures, and coordinating production delivery.",
  },
  {
    company: "Boost Capital",
    role: "Senior Product Specialist",
    period: "Jun 2023 – Jan 2026",
    current: false,
    summary:
      "Redesigned loan-application chatbot journeys using observed user behaviour, connecting product, marketing, and engineering around a clearer customer experience.",
  },
  {
    company: "Smart Axiata",
    role: "VAS & DCB Product Specialist",
    period: "Nov 2021 – Jun 2023",
    current: false,
    summary:
      "Managed gaming and direct-carrier-billing products across Google, Apple, and internal teams, turning recurring operational issues into product improvements.",
  },
]

const earlierExperience = [
  {
    company: "PTC Computer Co., Ltd.",
    role: "Retail Product Supervisor",
    period: "2020 – 2021",
  },
  {
    company: "PTC Computer Co., Ltd.",
    role: "Bid & Tender Specialist",
    period: "2019 – 2020",
  },
  {
    company: "PTC Computer Co., Ltd.",
    role: "Corporate & SMB Sales",
    period: "2018 – 2019",
  },
  {
    company: "Fabric Arts (Cambodia)",
    role: "Translator / Assistant",
    period: "2017 – 2018",
  },
  {
    company: "Takeo Adventist School",
    role: "Volunteer Teacher",
    period: "2016 – 2017",
  },
]

export default function Profile() {
  return (
    <div className="flex flex-col">
      <PageSection className="pt-14 md:pt-20">
        <FadeInWhenVisible>
          <PageContainer className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <SectionLabel>// profile</SectionLabel>
              <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Vibe coding, backed by actual judgment.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                A lot of people can ask AI to generate code. I&rsquo;m good at
                directing it, reading what it produces, spotting when it is
                confidently wrong, and debugging the final 20% that turns a
                promising demo into working software.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/lab"
                  className={buttonVariants({
                    size: "lg",
                    className: "h-11 px-5",
                  })}
                >
                  View selected work
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-11 px-5",
                  })}
                >
                  Start a conversation
                </Link>
              </div>
            </div>

            <dl className="border-t pt-6 text-sm lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b py-4 first:pt-0">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Current
                </dt>
                <dd className="font-medium leading-relaxed">
                  Senior Digital Product Owner, AI Lead
                </dd>
              </div>
              <div className="grid grid-cols-[5.5rem_1fr] gap-4 pt-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Based
                </dt>
                <dd className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Phnom Penh, Cambodia
                </dd>
              </div>
            </dl>
          </PageContainer>
        </FadeInWhenVisible>
      </PageSection>

      <PageSection tone="muted">
        <FadeInWhenVisible>
          <PageContainer>
            <div className="max-w-2xl">
              <SectionLabel>// what I bring</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Good prompting is only the beginning.
              </h2>
            </div>

            <div className="mt-10 grid border-y md:grid-cols-3 md:divide-x">
              {capabilities.map((capability) => (
                <article
                  key={capability.number}
                  className="border-b py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
                >
                  <p className="font-mono text-xs text-primary">
                    {capability.number}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                    {capability.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </PageContainer>
        </FadeInWhenVisible>
      </PageSection>

      <PageSection>
        <FadeInWhenVisible>
          <PageContainer>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionLabel>// selected experience</SectionLabel>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  The work most relevant to what I do now.
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
                  A progression from operating products to leading AI work where
                  the prompts, answers, edge cases, and delivery all matter.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="border-t">
                  {selectedExperience.map((entry) => (
                    <article
                      key={`${entry.company}-${entry.role}`}
                      className="grid gap-4 border-b py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
                    >
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          {entry.period}
                        </p>
                        {entry.current && (
                          <Badge className="mt-2 font-mono text-[10px]">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight">
                          {entry.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {entry.company}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {entry.summary}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                <details className="group border-b">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 font-medium outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    <span>Earlier experience</span>
                    <CaretDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
                  </summary>
                  <div className="divide-y border-t">
                    {earlierExperience.map((entry) => (
                      <div
                        key={`${entry.company}-${entry.role}`}
                        className="grid gap-2 py-4 text-sm sm:grid-cols-[9rem_1fr] sm:gap-8"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          {entry.period}
                        </p>
                        <p>
                          <span className="font-medium">{entry.role}</span>
                          <span className="text-muted-foreground">
                            {" "}&middot; {entry.company}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </details>

                <div className="grid gap-2 border-b py-6 text-sm sm:grid-cols-[9rem_1fr] sm:gap-8">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Education
                  </p>
                  <p>
                    <span className="font-medium">Bachelor of Science</span>
                    <span className="text-muted-foreground">
                      {" "}&middot; Asia Pacific International University, 2016
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </PageContainer>
        </FadeInWhenVisible>
      </PageSection>

      <PageSection tone="muted" className="py-12 md:py-16">
        <FadeInWhenVisible>
          <PageContainer className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <SectionLabel>// next</SectionLabel>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Have a messy idea that AI could help build?
              </h2>
            </div>
            <Link
              to="/contact"
              className={buttonVariants({
                size: "lg",
                className: "h-11 px-5",
              })}
            >
              Start a conversation
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </PageContainer>
        </FadeInWhenVisible>
      </PageSection>
    </div>
  )
}
