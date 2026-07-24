import { useState, useCallback, useEffect, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  direction?: "horizontal" | "vertical" | "diagonal"
  pauseOnHover?: boolean
  yoyo?: boolean
  showBorder?: boolean
}

/**
 * GradientText component adapted from React Bits.
 * Renders smooth animated gradient text using framer-motion.
 */
export function GradientText({
  children,
  className = "",
  colors = ["#2DD4BF", "#3B82F6", "#6366F1", "#2DD4BF"],
  animationSpeed = 8,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false)
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)

  const animationDuration = animationSpeed * 1000

  useAnimationFrame((time) => {
    if (isPaused) {
      lastTimeRef.current = null
      return
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += deltaTime

    if (yoyo) {
      const fullCycle = animationDuration * 2
      const cycleTime = elapsedRef.current % fullCycle

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100)
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100)
      }
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100)
    }
  })

  useEffect(() => {
    elapsedRef.current = 0
    progress.set(0)
  }, [animationSpeed, progress, yoyo])

  const backgroundPosition = useTransform(progress, (p) => {
    if (direction === "horizontal") {
      return `${p}% 50%`
    } else if (direction === "vertical") {
      return `50% ${p}%`
    } else {
      return `${p}% 50%`
    }
  })

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true)
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false)
  }, [pauseOnHover])

  const gradientAngle =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical"
      ? "to bottom"
      : "to bottom right"
  const gradientColors = [...colors, colors[0]].join(", ")

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize:
      direction === "horizontal"
        ? "300% 200%"
        : direction === "vertical"
        ? "200% 300%"
        : "300% 300%",
    backgroundRepeat: "repeat",
  }

  return (
    <motion.span
      className={cn(
        "inline-block relative transition-shadow duration-500",
        showBorder ? "overflow-hidden px-3 py-1.5 rounded-xl border border-border/50 backdrop-blur-md" : "overflow-visible",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <motion.span
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
          style={{ ...gradientStyle, backgroundPosition }}
        />
      )}
      <motion.span
        className="inline-block relative z-10 bg-clip-text text-transparent pt-[0.1em] pb-[0.35em] -mt-[0.1em] -mb-[0.35em]"
        style={{
          ...gradientStyle,
          backgroundPosition,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
export default GradientText
