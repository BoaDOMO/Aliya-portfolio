import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 120,
    damping: reduceMotion ? 1000 : 28,
    mass: 0.24,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-primary print:hidden"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  )
}
