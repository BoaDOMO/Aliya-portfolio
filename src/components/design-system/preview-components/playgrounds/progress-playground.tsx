import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

function AnimatedProgress() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 5))
    }, 400)
    return () => clearInterval(timer)
  }, [])

  return <Progress value={value} className="h-2" />
}

export default function ProgressPlayground() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Animated progress bar.</p>
        <AnimatedProgress />
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Skeleton loading states.</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
