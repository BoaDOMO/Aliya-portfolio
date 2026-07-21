import { useEffect, useState } from "react"
import { CaretUp } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top
      const footerVisible = footerTop !== undefined && footerTop < window.innerHeight
      setVisible(scrollTop > 300 && !footerVisible)
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  }

  const R = 17
  const C = 2 * Math.PI * R

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border-none shadow-lg transition-all duration-300 ease-out",
        "bg-primary text-primary-foreground",
        "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:scale-100",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-2 opacity-0 pointer-events-none"
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 44 44"
        fill="none"
      >
        <circle
          cx="22"
          cy="22"
          r={R}
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.15"
        />
        <circle
          cx="22"
          cy="22"
          r={R}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-75"
        />
      </svg>
      <CaretUp className="relative h-4 w-4" weight="bold" />
    </button>
  )
}
