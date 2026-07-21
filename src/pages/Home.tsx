import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { CodeEditor } from "@/components/code-editor"
import { HeroTraceGraphic, SignalField } from "@/components/signal-graphics"
import { cn } from "@/lib/utils"
import { ArrowRight, MapPin } from "@phosphor-icons/react"

const name = "Aliya Koy"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.15,
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Home() {
  const reducedMotion = useReducedMotion()

  const init = reducedMotion ? {} : undefined

  return (
    <div className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-6 py-12 md:py-16">
      <SignalField className="-right-[22rem] -top-[18rem] h-[58rem] w-[68rem] md:-right-[16rem] md:-top-[14rem]" />
      <div aria-hidden="true" className="diagnostic-grid absolute inset-y-0 right-0 hidden w-[58%] opacity-70 md:block" />
      <div className="relative z-10 grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20">
        <motion.div
          initial={init ?? { opacity: 0, y: 6 }}
          animate={init ?? { opacity: 1, y: 0 }}
          transition={!init ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-left">
          <motion.p
            initial={init ?? { opacity: 0, y: -10 }}
            animate={init ?? { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs uppercase tracking-widest text-primary"
          >
            BUILDING WITH AI
          </motion.p>

          <motion.h1
            variants={containerVariants}
            initial={init ?? "hidden"}
            animate={init ?? "visible"}
            className="mt-2 font-display text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl"
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className={cn(
                  char === " " ? "inline-block w-[0.28em]" : "inline-block"
                )}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={init ?? { opacity: 0, y: 10 }}
            animate={init ?? { opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-5 max-w-lg font-display text-2xl font-semibold leading-tight tracking-tight text-foreground md:mx-0 lg:text-3xl"
          >
            I build with AI fast&mdash;and debug until it actually works.
          </motion.p>

          <motion.p
            initial={init ?? { opacity: 0, y: 8 }}
            animate={init ?? { opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted-foreground md:mx-0"
          >
            Good prompts get things moving. Technical judgment, taste, and
            relentless debugging turn the output into working software.
          </motion.p>

          <motion.div
            initial={init ?? { opacity: 0, scale: 0.95 }}
            animate={init ?? { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-7 flex justify-center gap-4 md:justify-start"
          >
            <Link to="/lab" className={buttonVariants({ size: "lg" })}>
              See what I&rsquo;ve built
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              to="/profile"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              How I work
            </Link>
          </motion.div>

          <motion.div
            initial={init ?? { opacity: 0, y: 8 }}
            animate={init ?? { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.78 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground md:justify-start"
          >
            <span className="font-mono uppercase tracking-wider">
              Prompt · Inspect · Debug · Ship
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Phnom Penh
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={init ?? { opacity: 0, x: 20 }}
          animate={init ?? { opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative isolate"
        >
          <HeroTraceGraphic className="absolute left-1/2 top-1/2 hidden h-[36rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 md:block" />
          <div className="relative z-10">
            <CodeEditor />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
