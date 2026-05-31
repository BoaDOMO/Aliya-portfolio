import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { SectionLabel } from "@/components/section-label"
import { Timeline, TimelineItem } from "@/components/timeline"
import { Cpu, Sparkle, Palette, MapPin } from "@phosphor-icons/react"

const summary =
  "Product brain, builder hands. I figure out what needs to exist, then make it real \u2014 usually with AI riding shotgun."

const categories = [
  {
    title: "Build",
    icon: Cpu,
    items: [
      "vibe coding with AI",
      "shipping prototypes fast",
      "full-stack tinkering",
      "breaking things on purpose",
    ],
  },
  {
    title: "AI",
    icon: Sparkle,
    items: [
      "prompt engineering",
      "RAG pipelines",
      "making LLMs useful (not just cool)",
    ],
  },
  {
    title: "Product & Design",
    icon: Palette,
    items: [
      "knowing what to build, what to skip",
      "Figma flows & wireframes",
      "making complex things feel simple",
    ],
  },
]

const experience = [
  {
    company: "KB Prasac Bank",
    role: "Senior Digital Product Owner (AI Lead)",
    period: "Apr 2026 \u2013 Present",
    current: true,
    bullets: [
      "Building an AI assistant for a banking app \u2014 picking the LLM, designing the RAG pipeline, and shipping it into production.",
      "Working across teams to make sure it solves real problems, not just demo scenarios.",
    ],
  },
  {
    company: "Boost Capital",
    role: "Senior Product Specialist",
    period: "Jun 2023 \u2013 Jan 2026",
    current: false,
    bullets: [
      "Revamped chatbot flows for loan applications. Made the UX less painful based on what users actually did.",
      "Worked across product, marketing, and engineering to keep the user journey from falling apart.",
    ],
  },
  {
    company: "Smart Axiata",
    role: "VAS & DCB Product Specialist",
    period: "Nov 2021 \u2013 Jun 2023",
    current: false,
    bullets: [
      "Managed gaming and payment products. Bridged Google, Apple, and internal teams to make things work.",
      "Spotted operational issues early and turned them into product improvements.",
    ],
  },
  {
    company: "PTC Computer Co., Ltd.",
    role: "Retail Product Supervisor",
    period: "Sep 2020 \u2013 Sep 2021",
    current: false,
    bullets: [
      "Supervised sales for Dell, Asus, Acer, HP, Razer. Kept the website accurate with specs and SKUs.",
    ],
  },
  {
    company: "PTC Computer Co., Ltd.",
    role: "Bid & Tender Specialist",
    period: "Sep 2019 \u2013 Sep 2020",
    current: false,
    bullets: [
      "Managed tender projects for NGOs and government clients. Made sure every requirement was covered.",
    ],
  },
  {
    company: "PTC Computer Co., Ltd.",
    role: "Corporate & SMB Sales",
    period: "Sep 2018 \u2013 Sep 2019",
    current: false,
    bullets: [
      "Sold to businesses, negotiated pricing, built relationships that actually lasted.",
    ],
  },
  {
    company: "Fabric Arts (Cambodia)",
    role: "Translator / Assistant",
    period: "Jun 2017 \u2013 Jul 2018",
    current: false,
    bullets: [
      "English\u2013Khmer translation for the CEO. Helped with cross-cultural communication and marketing.",
    ],
  },
  {
    company: "Takeo Adventist School",
    role: "Volunteer Teacher",
    period: "Jun 2016 \u2013 May 2017",
    current: false,
    bullets: [
      "Taught English and Biology at an orphanage school in Takeo.",
    ],
  },
]

const education = [
  {
    school: "Asia Pacific International University",
    degree: "Bachelor of Science",
    period: "2012 \u2013 2016",
    location: "Saraburi, Thailand",
  },
  {
    school: "Cambodia Adventist School",
    degree: "High School Diploma",
    period: "2009 \u2013 2012",
    location: "Phnom Penh, Cambodia",
  },
]

function SkillCard({
  title,
  icon: Icon,
  items,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  items: string[]
}) {
  return (
    <div className="group relative">
      {/* Layered sheet effect */}
      <div className="absolute inset-0 -z-10 scale-90 rounded-xl bg-primary/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:rotate-[8deg]" />
      <div className="absolute inset-0 -z-20 scale-90 rounded-xl bg-primary/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:rotate-[-8deg]" />

      {/* Card */}
      <Card className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4 dark:border-border/50 dark:bg-card/90 dark:backdrop-blur-xl bg-white/85">
        {/* Always visible: icon + title */}
        <div className="flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </div>

        {/* Expandable items */}
        <div className="grid grid-rows-[0fr] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="px-6 pb-6 opacity-0 translate-y-2 transition-all duration-500 delay-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:translate-y-0">
              <ul className="space-y-2.5 border-t pt-4">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 shrink-0 text-primary">
                      {"\u2192"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function Profile() {
  return (
    <div className="flex flex-col">
      {/* ── Summary ── */}
      <div className="py-12 md:py-20">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-6xl px-6">
            <Card className="rounded-xl border p-8 md:p-10 bg-white/85 dark:bg-card">
              <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-start md:text-left">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarFallback className="text-xl font-display md:text-2xl">
                    AK
                  </AvatarFallback>
                </Avatar>
                <div>
                  <SectionLabel>// profile</SectionLabel>
                  <p className="mt-2 font-display text-xl leading-relaxed text-foreground md:text-2xl md:max-w-2xl">
                    {summary}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground md:justify-start">
                    <Badge
                      variant="secondary"
                      className="font-mono text-[10px]"
                    >
                      8+ yrs
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="font-mono text-[10px]"
                    >
                      5 companies
                    </Badge>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      Phnom Penh
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </FadeInWhenVisible>
      </div>

      {/* ── Skills ── */}
      <div className="bg-muted/30 py-12 md:py-20">
        <FadeInWhenVisible delay={0.1}>
          <div className="mx-auto max-w-6xl px-6">
            <section>
              <SectionLabel>// what I do</SectionLabel>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => (
                  <SkillCard
                    key={cat.title}
                    title={cat.title}
                    icon={cat.icon}
                    items={cat.items}
                  />
                ))}
              </div>
            </section>
          </div>
        </FadeInWhenVisible>
      </div>

      {/* ── Experience ── */}
      <div className="py-12 md:py-20">
        <FadeInWhenVisible delay={0.15}>
          <div className="mx-auto max-w-6xl px-6">
            <section>
              <SectionLabel>// where I&rsquo;ve been</SectionLabel>
              <Timeline>
                {experience.map((entry) => (
                  <TimelineItem
                    key={entry.company}
                    isCurrent={entry.current}
                  >
                    <div className="pt-0.5">
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {entry.company}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {entry.role}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="font-mono text-[10px]"
                        >
                          {entry.period}
                        </Badge>
                        {entry.current && (
                          <Badge className="font-mono text-[10px]">
                            Current
                          </Badge>
                        )}
                      </div>
                      {entry.bullets.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {entry.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span className="mt-0.5 shrink-0 text-primary">
                                {"\u2192"}
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TimelineItem>
                ))}
              </Timeline>
            </section>
          </div>
        </FadeInWhenVisible>
      </div>

      {/* ── Education ── */}
      <div className="bg-muted/30 py-12 md:py-20">
        <FadeInWhenVisible delay={0.2}>
          <div className="mx-auto max-w-6xl px-6">
            <section>
              <SectionLabel>// where I studied</SectionLabel>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {education.map((entry) => (
                  <Card
                    key={entry.school}
                    className="p-6 dark:border-border/50 dark:bg-card/90 dark:backdrop-blur-xl bg-white/85"
                  >
                    <h3 className="font-display text-base font-semibold">
                      {entry.school}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {entry.degree}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <Badge
                        variant="secondary"
                        className="font-mono text-[10px]"
                      >
                        {entry.period}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {entry.location}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  )
}
