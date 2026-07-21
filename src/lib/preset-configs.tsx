import type { ReactNode } from "react"
import { Hero } from "@/components/design-system/preview-components/webviews/sections/hero"
import { FeatureGrid } from "@/components/design-system/preview-components/webviews/sections/feature-grid"
import { CardGrid } from "@/components/design-system/preview-components/webviews/sections/card-grid"
import { StatsBar } from "@/components/design-system/preview-components/webviews/sections/stats-bar"
import { CTA } from "@/components/design-system/preview-components/webviews/sections/cta"
import { Footer } from "@/components/design-system/preview-components/webviews/sections/footer"
import { EditorialGrid } from "@/components/design-system/preview-components/webviews/sections/editorial-grid"
import { MediaHero } from "@/components/design-system/preview-components/webviews/sections/media-hero"
import { AppShell } from "@/components/design-system/preview-components/webviews/sections/app-shell"
import { ControlPanel } from "@/components/design-system/preview-components/webviews/sections/control-panel"
import {
  PresetBox,
  PresetButton,
} from "@/components/design-system/preview-components/webviews/preset-box"
import {
  Rocket,
  Brain,
  Cloud as CloudIcon,
  ShieldCheck,
  Wallet,
  ChartLineUp,
  ArrowsLeftRight,
  Bell,
  Lock,
  Heart,
  Moon,
  Wind,
  BookOpen,
  Play,
  SkipForward,
  CloudSun,
  MusicNotes,
  Lightbulb,
  Thermometer,
  SpeakerHigh,
} from "@phosphor-icons/react"
import { WaveDivider, MistCircles } from "@/lib/decorative-svgs"

export interface PresetConfig {
  id: string
  name: string
  wrapperClassName: string
  sections: { renderContent: () => ReactNode }[]
}

export const PRESET_CONFIGS: PresetConfig[] = [
  {
    id: "flat",
    name: "Flat",
    wrapperClassName: "",
    sections: [
      {
        renderContent: () => (
          <Hero
            title="Ship faster. Debug smarter."
            subtitle="Real-time observability and AI-assisted debugging for modern engineering teams. No config required."
            backgroundImage="https://picsum.photos/seed/dev-tools/1600/900"
            backgroundOverlay="linear-gradient(to bottom, rgba(0,0,0,0.15), var(--background))"
            buttons={
              <>
                <PresetButton>Start free</PresetButton>
                <PresetButton variant="outline">View docs</PresetButton>
              </>
            }
          />
        ),
      },
      {
        renderContent: () => (
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: <Rocket className="size-5" />,
                title: "Real-time traces",
                description: "See every request end-to-end. Filter by service, status, latency, and user to pinpoint issues in seconds.",
              },
              {
                icon: <Brain className="size-5" />,
                title: "AI insights",
                description: "Get root-cause suggestions before your pager goes off. Our model learns from your incident history.",
              },
              {
                icon: <CloudIcon className="size-5" />,
                title: "Zero-config",
                description: "Auto-instrument with a single CLI command. Works with Node, Python, Go, Rust, and more.",
              },
              {
                icon: <ShieldCheck className="size-5" />,
                title: "Enterprise ready",
                description: "SOC-2 compliant with SSO, audit logs, and role-based access controls built in.",
              },
            ]}
          />
        ),
      },
      {
        renderContent: () => (
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 opacity-50">
              <span className="font-display text-lg font-semibold">Vercel</span>
              <span className="font-display text-lg font-semibold">Stripe</span>
              <span className="font-display text-lg font-semibold">Linear</span>
              <span className="font-display text-lg font-semibold">Figma</span>
              <span className="font-display text-lg font-semibold">Notion</span>
            </div>
          </section>
        ),
      },
      {
        renderContent: () => (
          <section className="py-10 px-6">
            <div className="max-w-3xl mx-auto bg-card rounded-lg p-4 font-mono text-xs border border-border overflow-x-auto">
              <p className="text-foreground/70">$ npm install @aliya/telemetry</p>
              <p className="text-success">+ installed in 1.2s</p>
              <p className="text-foreground">$ npx aliya init</p>
              <p className="text-primary-safe">
                Connected to workspace <span className="text-primary-safe">acme-prod</span>
              </p>
            </div>
          </section>
        ),
      },
      {
        renderContent: () => (
          <CardGrid
            cards={[
              { title: "Hobby", description: "$0/mo", badge: "Free", image: "https://picsum.photos/seed/saas-1/600/400" },
              { title: "Pro", description: "$29/mo", badge: "Popular", image: "https://picsum.photos/seed/saas-2/600/400" },
              { title: "Team", description: "$99/mo", badge: "Enterprise", image: "https://picsum.photos/seed/saas-3/600/400" },
            ]}
          />
        ),
      },
      {
        renderContent: () => (
          <Footer links={["Docs", "Pricing", "Status", "Privacy"]}>Telemetry</Footer>
        ),
      },
    ],
  },
  {
    id: "floating",
    name: "Floating",
    wrapperClassName: "relative",
    sections: [
      {
        renderContent: () => (
          <div className="min-h-screen flex flex-col justify-center">
            <Hero
              title="Banking that moves at your speed"
              subtitle="Send, spend, and save with a fintech platform built for founders."
              backgroundImage="https://picsum.photos/seed/fintech-skyline/1600/900"
              backgroundOverlay="linear-gradient(to bottom, rgba(0,0,0,0.2), var(--background))"
              buttons={<PresetButton>Open account</PresetButton>}
            >
              <PresetBox className="max-w-md mx-auto p-6 mt-8 text-left relative z-10">
                <div className="font-mono text-xs text-card-foreground/70 mb-2">Balance</div>
                <div className="font-display text-3xl font-bold text-primary-safe mb-4">
                  $142,890.00
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-mono text-xs text-muted-foreground">Income</div>
                    <div className="font-display text-lg font-semibold text-success">+$12,400</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-mono text-xs text-muted-foreground">Spend</div>
                    <div className="font-display text-lg font-semibold">-$3,210</div>
                  </div>
                </div>
              </PresetBox>
            </Hero>
          </div>
        ),
      },
      {
        renderContent: () => (
          <div className="-mt-16 relative z-10">
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: <Wallet className="size-5" />,
                  title: "Instant transfers",
                  description: "Move money between accounts in real-time, no waiting.",
                },
                {
                  icon: <ChartLineUp className="size-5" />,
                  title: "Yield accounts",
                  description: "Earn competitive interest on every dollar you hold.",
                },
                {
                  icon: <ShieldCheck className="size-5" />,
                  title: "Fraud guard",
                  description: "AI-powered detection blocks suspicious activity instantly.",
                },
                {
                  icon: <ArrowsLeftRight className="size-5" />,
                  title: "Multi-currency",
                  description: "Hold and exchange USD, EUR, GBP, and more.",
                },
                {
                  icon: <Bell className="size-5" />,
                  title: "Smart alerts",
                  description: "Custom notifications for transactions, balances, and more.",
                },
                {
                  icon: <Lock className="size-5" />,
                  title: "Vaults",
                  description: "Secure savings goals with automated rules.",
                },
              ]}
            />
          </div>
        ),
      },
      {
        renderContent: () => (
          <CardGrid
            cards={[
              {
                title: "Sarah Chen",
                description: "Moved our entire treasury to Float. The instant transfers alone save us days every quarter.",
                meta: "CTO, Relay Health",
                image: "https://picsum.photos/seed/fintech-1/600/400",
              },
              {
                title: "Marcus Rivera",
                description: "The best multi-currency experience I've used. Finally, banking that feels like modern software.",
                meta: "Founder, Latitude",
                image: "https://picsum.photos/seed/fintech-2/600/400",
              },
              {
                title: "Aisha Patel",
                description: "We closed our Series A faster because Float handled the cross-border payments seamlessly.",
                meta: "COO, Pinecone Bio",
                image: "https://picsum.photos/seed/fintech-3/600/400",
              },
            ]}
          />
        ),
      },
      {
        renderContent: () => (
          <StatsBar
            stats={[
              { value: "$2B", label: "Volume" },
              { value: "500K", label: "Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "140+", label: "Countries" },
            ]}
          />
        ),
      },
      {
        renderContent: () => (
          <CTA
            title="Ready to move faster?"
            subtitle="Open an account in under 10 minutes."
            buttons={<PresetButton>Open account</PresetButton>}
          />
        ),
      },
      {
        renderContent: () => (
          <Footer links={["Personal", "Business", "Security", "Support"]}>Float</Footer>
        ),
      },
    ],
  },
  {
    id: "soft",
    name: "Soft",
    wrapperClassName: "bg-gradient-to-b from-primary/[0.03] to-transparent",
    sections: [
      {
        renderContent: () => (
          <Hero
            title="Find your calm"
            subtitle="Guided meditations, sleep stories, and breathing exercises for a gentler day."
            backgroundImage="https://picsum.photos/seed/misty-forest/1600/900"
            backgroundOverlay="linear-gradient(to bottom, rgba(0,0,0,0.1), var(--background))"
            buttons={<PresetButton>Begin your journey</PresetButton>}
          >
            <div className="mx-auto mt-8 w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 blur-2xl" />
          </Hero>
        ),
      },
      {
        renderContent: () => (
          <WaveDivider className="w-full h-24 -mt-1" />
        ),
      },
      {
        renderContent: () => (
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: <Heart className="size-5" />,
                title: "Meditation",
                description: "Guided sessions from 3 to 60 minutes for every mood.",
              },
              {
                icon: <Moon className="size-5" />,
                title: "Sleep",
                description: "Sleep stories and wind-down routines for restful nights.",
              },
              {
                icon: <Wind className="size-5" />,
                title: "Breathing",
                description: "Box breathing, 4-7-8, and calming breath exercises.",
              },
              {
                icon: <BookOpen className="size-5" />,
                title: "Journaling",
                description: "Reflective prompts and gratitude logs to ground your day.",
              },
            ]}
          />
        ),
      },
      {
        renderContent: () => (
          <section className="py-12 px-6">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 @[48rem]:flex-row">
              <div className="flex-1 space-y-4">
                <h2 className="font-display text-2xl font-bold">A softer approach to wellness</h2>
                <p className="font-body text-foreground/70">
                  No pressure. No streaks. No guilt. Just tools that meet you where you are.
                </p>
              </div>
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex-shrink-0" />
            </div>
          </section>
        ),
      },
      {
        renderContent: () => (
          <WaveDivider className="w-full h-20 rotate-180 -mb-1" />
        ),
      },
      {
        renderContent: () => (
          <CTA
            title="Start with one breath"
            subtitle="Your first week is free."
            buttons={<PresetButton>Try free</PresetButton>}
          />
        ),
      },
      {
        renderContent: () => (
          <Footer links={["Meditate", "Sleep", "Therapy", "About"]}>Calmly</Footer>
        ),
      },
    ],
  },
  {
    id: "outline",
    name: "Outline",
    wrapperClassName: "",
    sections: [
      {
        renderContent: () => (
          <Hero
            title="The Quarterly"
            subtitle="Long-form writing on design, technology, and how we live online."
            buttons={<PresetButton variant="outline">Subscribe</PresetButton>}
          />
        ),
      },
      {
        renderContent: () => (
          <EditorialGrid
            issue="Issue 12 — Summer 2026"
            articles={[
              { category: "Design", title: "The return of texture", dek: "How digital interfaces are embracing the tactile once more.", image: "https://picsum.photos/seed/magazine-1/600/800" },
              { category: "Technology", title: "Living with agents", dek: "What happens when AI becomes a daily collaborator rather than a tool.", image: "https://picsum.photos/seed/magazine-2/600/800" },
              { category: "Culture", title: "The quiet web", dek: "A growing movement of writers and builders retreating from platforms.", image: "https://picsum.photos/seed/magazine-3/600/800" },
              { category: "Profiles", title: "The cartographer of code", dek: "Mapping the hidden architectures that shape how we build.", image: "https://picsum.photos/seed/magazine-4/600/800" },
              { category: "Essay", title: "Against optimization", dek: "Why the most interesting systems leave room for inefficiency.", image: "https://picsum.photos/seed/magazine-5/600/800" },
              { category: "Review", title: "Tools for thought, 2026", dek: "A roundup of the apps, devices, and workflows shaping creative work.", image: "https://picsum.photos/seed/magazine-6/600/800" },
            ]}
          />
        ),
      },
      {
        renderContent: () => (
          <CTA
            title="Get the next issue"
            subtitle="One email a week."
            buttons={<PresetButton>Subscribe</PresetButton>}
          />
        ),
      },
      {
        renderContent: () => (
          <Footer links={["Archive", "Shop", "Colophon", "RSS"]}>The Quarterly</Footer>
        ),
      },
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    wrapperClassName: "divide-y divide-border",
    sections: [
      {
        renderContent: () => (
          <Hero
            title="DEV.TOOL"
            subtitle="A brutalist developer toolchain. No dashboards. No AI. No nonsense."
            backgroundImage="https://picsum.photos/seed/grid-texture/1600/900"
            backgroundOverlay="linear-gradient(to bottom, var(--foreground)/5, var(--background))"
            buttons={<PresetButton>GET STARTED</PresetButton>}
            centered={false}
          />
        ),
      },
      {
        renderContent: () => (
          <section className="py-12 px-6">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-px border border-border @[48rem]:grid-cols-2">
              <div className="p-6 border border-border">
                <div className="font-mono text-xs text-foreground/70 mb-1">01</div>
                <div className="font-display text-xl font-semibold mb-2">CLI-first</div>
                <div className="font-body text-sm text-foreground/70">
                  Everything works from the terminal. No GUI required.
                </div>
              </div>
              <div className="p-6 border border-border">
                <div className="font-mono text-xs text-foreground/70 mb-1">02</div>
                <div className="font-display text-xl font-semibold mb-2">Zero deps</div>
                <div className="font-body text-sm text-foreground/70">
                  A single static binary. No Node, no Python, no Docker.
                </div>
              </div>
              <div className="p-6 border border-border">
                <div className="font-mono text-xs text-foreground/70 mb-1">03</div>
                <div className="font-display text-xl font-semibold mb-2">Plain text</div>
                <div className="font-body text-sm text-foreground/70">
                  Configure with TOML. Export to JSON. Pipe to anything.
                </div>
              </div>
              <div className="p-6 border border-border">
                <div className="font-mono text-xs text-foreground/70 mb-1">04</div>
                <div className="font-display text-xl font-semibold mb-2">Offline</div>
                <div className="font-body text-sm text-foreground/70">
                  Fully air-gapped. Your data never leaves your machine.
                </div>
              </div>
            </div>
          </section>
        ),
      },
      {
        renderContent: () => (
          <section className="py-10 px-6">
            <PresetBox className="max-w-3xl mx-auto p-4 font-mono text-xs rounded-none">
              <p className="text-foreground/70">$ devtool deploy --prod</p>
              <p className="text-success">Build: 12.4s</p>
              <p className="text-success">Tests: 1,204 passed</p>
              <p className="text-primary-safe">Deployed to production</p>
            </PresetBox>
          </section>
        ),
      },
      {
        renderContent: () => (
          <section className="py-12 px-6">
            <div className="max-w-2xl mx-auto border border-border">
              <div className="p-4 border-b border-border">
                <span className="font-mono text-xs tracking-widest font-semibold">PRICING</span>
              </div>
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display font-semibold">Individual</span>
                <span className="font-mono text-sm">$0</span>
              </div>
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display font-semibold">Team</span>
                <span className="font-mono text-sm">$29</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-display font-semibold">Enterprise</span>
                <span className="font-mono text-sm">Custom</span>
              </div>
            </div>
          </section>
        ),
      },
      {
        renderContent: () => (
          <CTA
            title="READY TO SHIP?"
            subtitle="Start building with the free tier today."
            buttons={<PresetButton>GET STARTED</PresetButton>}
          />
        ),
      },
      {
        renderContent: () => (
          <Footer links={["DOCS", "PRICING", "GITHUB", "STATUS"]}>DEV.TOOL</Footer>
        ),
      },
    ],
  },
  {
    id: "material",
    name: "Material",
    wrapperClassName: "",
    sections: [
      {
        renderContent: () => (
          <AppShell>
            <div className="space-y-3">
              <PresetBox className="p-3 flex items-start gap-3">
                <img className="w-8 h-8 rounded-full object-cover flex-shrink-0" src="https://picsum.photos/seed/face-1/80" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium">Alice Chen</span>
                    <span className="font-mono text-[10px] text-card-foreground/70">2m ago</span>
                  </div>
                  <div className="font-body text-xs text-card-foreground/70 truncate">
                    Re: Q3 planning — sounds good, let&apos;s finalize tomorrow
                  </div>
                </div>
              </PresetBox>
              <PresetBox className="p-3 flex items-start gap-3">
                <img className="w-8 h-8 rounded-full object-cover flex-shrink-0" src="https://picsum.photos/seed/face-2/80" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium">Design team</span>
                    <span className="font-mono text-[10px] text-card-foreground/70">1h ago</span>
                  </div>
                  <div className="font-body text-xs text-card-foreground/70 truncate">
                    New mockups uploaded for the dashboard refresh
                  </div>
                </div>
              </PresetBox>
              <PresetBox className="p-3 flex items-start gap-3">
                <img className="w-8 h-8 rounded-full object-cover flex-shrink-0" src="https://picsum.photos/seed/face-3/80" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium">Security</span>
                    <span className="font-mono text-[10px] text-card-foreground/70">3h ago</span>
                  </div>
                  <div className="font-body text-xs text-card-foreground/70 truncate">
                    Action required: review new sign-in from Chrome, San Francisco
                  </div>
                </div>
              </PresetBox>
              <PresetBox className="p-3 flex items-start gap-3">
                <img className="w-8 h-8 rounded-full object-cover flex-shrink-0" src="https://picsum.photos/seed/face-4/80" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium">Newsletter</span>
                    <span className="font-mono text-[10px] text-card-foreground/70">1d ago</span>
                  </div>
                  <div className="font-body text-xs text-card-foreground/70 truncate">
                    This Week in AI: Claude 5, Gemini Ultra, and the open-source shift
                  </div>
                </div>
              </PresetBox>
            </div>
          </AppShell>
        ),
      },
    ],
  },
  {
    id: "glass",
    name: "Glass",
    wrapperClassName:
      "bg-gradient-to-b from-primary/[0.04] via-background to-background relative overflow-hidden",
    sections: [
      {
        renderContent: () => (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <MistCircles className="w-full h-full" />
          </div>
        ),
      },
      {
        renderContent: () => {
          const cities = [
            {
              name: "San Francisco",
              temp: "58°F",
              icon: CloudSun,
            },
            {
              name: "Tokyo",
              temp: "72°F",
              icon: CloudSun,
            },
            {
              name: "Reykjavik",
              temp: "41°F",
              icon: CloudSun,
            },
          ]
          return (
            <>
              <MediaHero
                title="Listen to the weather"
                subtitle="Curated soundscapes that match the sky outside your window."
                widget={
                  <PresetBox className="max-w-sm mx-auto p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                      <MusicNotes className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-display text-sm font-semibold">Morning Haze</div>
                      <div className="font-body text-xs text-card-foreground/70">Lofi · 3:24</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="size-4 text-card-foreground/60 hover:text-primary transition-colors" />
                      <Play className="size-4 text-primary" />
                      <SkipForward className="size-4 text-card-foreground/60 hover:text-primary transition-colors" />
                    </div>
                  </PresetBox>
                }
              />
              <section className="py-12 px-6">
                <div
                  className="mx-auto grid max-w-5xl grid-cols-1 @[48rem]:grid-cols-3"
                  style={{ gap: "calc(1rem * var(--spacing-scale))" }}
                >
                  {cities.map((city, index) => {
                    const CityIcon = city.icon
                    return (
                      <PresetBox
                        key={city.name}
                        className={`p-5 text-center space-y-2 ${index === 0 ? "z-10" : index === 1 ? "relative z-20 -mt-4" : "z-10"}`}
                      >
                        <CityIcon className="size-8 mx-auto text-primary" weight="duotone" />
                        <div className="font-display text-3xl">{city.temp}</div>
                        <div className="font-body text-sm text-card-foreground/70">{city.name}</div>
                      </PresetBox>
                    )
                  })}
                </div>
              </section>
              <CardGrid
                columns={4}
                cards={[
                  {
                    title: "Rainy Café",
                    description: "42 min · Soft jazz",
                    meta: "Rain · 65°F",
                    image: "https://picsum.photos/seed/nature-1/600/400",
                  },
                  {
                    title: "Sunny Drive",
                    description: "38 min · Indie folk",
                    meta: "Clear · 78°F",
                    image: "https://picsum.photos/seed/nature-2/600/400",
                  },
                  {
                    title: "Night Fog",
                    description: "55 min · Ambient drone",
                    meta: "Fog · 52°F",
                    image: "https://picsum.photos/seed/nature-3/600/400",
                  },
                  {
                    title: "Snowfield",
                    description: "60 min · Minimal piano",
                    meta: "Snow · 28°F",
                    image: "https://picsum.photos/seed/nature-4/600/400",
                  },
                ]}
              />
              <CTA
                title="Build your atmosphere"
                subtitle="Save playlists and sync with your local forecast."
                buttons={<PresetButton>Start listening</PresetButton>}
              />
              <Footer links={["Browse", "Premium", "API", "Support"]}>Atmosphere</Footer>
            </>
          )
        },
      },
    ],
  },
  {
    id: "neumorphic",
    name: "Neumorphic",
    wrapperClassName: "",
    sections: [
      {
        renderContent: () => (
          <Hero
            title="Living Room"
            subtitle="Welcome home. All systems are running smoothly."
            centered={false}
          >
            <div className="flex flex-row gap-4 mt-6">
              <PresetBox className="p-5 text-center flex-1">
                <div className="font-mono text-xs text-card-foreground/70 mb-1">TIME</div>
                <div className="font-display text-3xl font-bold">4:32</div>
              </PresetBox>
              <PresetBox className="p-5 text-center flex-1">
                <div className="font-mono text-xs text-card-foreground/70 mb-1">TEMP</div>
                <div className="font-display text-3xl font-bold">72°</div>
              </PresetBox>
            </div>
          </Hero>
        ),
      },
      {
        renderContent: () => (
          <section className="py-10 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-lg font-semibold mb-4">Rooms</h2>
              <ControlPanel
                rooms={[
                  { name: "Overhead", icon: <Lightbulb className="size-5" />, level: 80 },
                  { name: "Accent", icon: <Lightbulb className="size-5" />, level: 45 },
                  { name: "Volume", icon: <SpeakerHigh className="size-5" />, level: 30 },
                  { name: "Thermostat", icon: <Thermometer className="size-5" />, level: 65 },
                ]}
                sensors={[
                  { label: "Humidity", value: "48%" },
                  { label: "Air quality", value: "Good" },
                  { label: "Power", value: "1.2 kW" },
                  { label: "Security", value: "Armed" },
                ]}
              />
            </div>
          </section>
        ),
      },
      {
        renderContent: () => (
          <section className="py-10 px-6">
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 @[48rem]:grid-cols-4">
              <PresetBox className="p-5 text-center space-y-2">
                <Lock className="size-6 mx-auto text-primary" />
                <div className="font-body text-sm font-medium">Front door</div>
              </PresetBox>
              <PresetBox className="p-5 text-center space-y-2">
                <CloudIcon className="size-6 mx-auto text-primary" />
                <div className="font-body text-sm font-medium">Weather</div>
              </PresetBox>
              <PresetBox className="p-5 text-center space-y-2">
                <Thermometer className="size-6 mx-auto text-primary" />
                <div className="font-body text-sm font-medium">Water</div>
              </PresetBox>
              <PresetBox className="p-5 text-center space-y-2">
                <Lightbulb className="size-6 mx-auto text-primary" />
                <div className="font-body text-sm font-medium">Scenes</div>
              </PresetBox>
            </div>
          </section>
        ),
      },
      {
        renderContent: () => (
          <Footer links={["Dashboard", "Rooms", "Energy", "Settings"]}>NestHome</Footer>
        ),
      },
    ],
  },
]
