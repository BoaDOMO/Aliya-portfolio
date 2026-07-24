import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, MapPin } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { CapabilityGrid } from "@/components/capability-grid"
import { BlurredBackground } from "@/components/blurred-background"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { PageContainer, PageSection } from "@/components/page-layout"
import { SectionLabel } from "@/components/section-label"
import { SiteCta } from "@/components/site-cta"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Aurora } from "@/components/aurora"
import { useTheme } from "@/components/theme-context"

export default function Home() {
  const reduceMotion = useReducedMotion()
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [theme])

  return (
    <div className="overflow-x-clip">
      <section className="relative w-full min-h-[100svh] overflow-hidden border-b pt-32 md:pt-40 isolate flex flex-col">
        {/* Background: WebGL Aurora in Dark Mode, Blurred Mist in Light Mode */}
        {isDark ? (
          <Aurora 
            colorStops={["#4A88E0", "#4D5F4A", "#111A12"]} 
            blend={0.6} 
            amplitude={1.2} 
            speed={0.8} 
          />
        ) : (
          <BlurredBackground image="mist" position="58% 48%" className="opacity-95" />
        )}
        <div aria-hidden="true" className="portfolio-hero-glow" />
        <PageContainer className="relative z-10 flex min-h-[calc(100svh-8rem)] flex-col justify-center pb-12 md:min-h-[calc(100svh-10rem)] md:pb-8">
          
          <div className="flex flex-col relative w-full flex-1">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl relative z-20"
            >
              <SectionLabel line={false}>Building with AI</SectionLabel>
              <h1
                aria-label="Aliya Koy"
                className="mt-14 font-display text-[clamp(5rem,11vw,9rem)] font-medium leading-[0.86] tracking-[-0.07em]"
              >
                <span className="block">Aliya</span>
                <span className="block">Koy</span>
              </h1>
              <p className="mt-12 max-w-xl text-balance font-display text-[clamp(1.55rem,2.4vw,2.35rem)] font-light leading-[1.16] tracking-[-0.04em]">
                I build with AI fast—and debug until it actually works.
              </p>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Good prompts get things moving. Technical judgment, taste, and
                relentless debugging turn the output into working software.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/lab"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 rounded-full px-8 text-base"
                  )}
                >
                  See what I&rsquo;ve built
                  <ArrowRight className="ml-1 transition-transform duration-200 group-hover/button:translate-x-1 motion-reduce:transition-none" />
                </Link>
                <Link
                  to="/profile"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-full bg-transparent px-8 text-base"
                  )}
                >
                  How I work
                </Link>
              </div>
            </motion.div>

          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.7 }}
            className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 pt-16 text-xs text-muted-foreground"
          >
            <span className="font-mono uppercase tracking-[0.18em]">
              Prompt · Inspect · Debug · Ship
            </span>
            <span aria-hidden="true" className="hidden h-px w-10 bg-border sm:block" />
            <span className="flex items-center gap-2 text-sm">
              <MapPin className="size-4" /> Phnom Penh
            </span>
          </motion.div>
        </PageContainer>
      </section>

      <PageSection>
        <PageContainer>
          <FadeInWhenVisible className="max-w-3xl">
            <SectionLabel>What I bring</SectionLabel>
            <h2 className="mt-10 text-balance font-display text-[clamp(2.75rem,5.4vw,5rem)] font-medium leading-[1.02] tracking-[-0.055em]">
              Good prompting is only the beginning.
            </h2>
          </FadeInWhenVisible>
          <CapabilityGrid />
        </PageContainer>
      </PageSection>

      <SiteCta title="Have a messy idea that AI could help build?" />
    </div>
  )
}
