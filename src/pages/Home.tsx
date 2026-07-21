import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "@/components/code-editor"
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
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 py-12 md:py-16">
      <div className="grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20">
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
            HELLO, I&rsquo;M
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
              delay: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:mx-0 lg:text-lg"
          >
            Product thinker and hands-on builder turning useful AI ideas into working experiences.
          </motion.p>

          <motion.div
            initial={init ?? { opacity: 0, scale: 0.95 }}
            animate={init ?? { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex justify-center gap-4 md:justify-start"
          >
            <Button render={<Link to="/lab" />} size="lg">
              Explore the Lab
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              render={<Link to="/contact" />}
              variant="outline"
              size="lg"
            >
              View Profile
            </Button>
          </motion.div>

          <motion.div
            initial={init ?? { opacity: 0, y: 8 }}
            animate={init ?? { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.78 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground md:justify-start"
          >
            <span className="font-mono uppercase tracking-wider">AI · Product · Full-stack</span>
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
        >
          <CodeEditor />
        </motion.div>
      </div>
    </div>
  )
}
