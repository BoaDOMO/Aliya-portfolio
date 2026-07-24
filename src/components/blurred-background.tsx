import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type BlurredBackgroundImage =
  | "mist"
  | "blue-leaves"
  | "blue-flower"
  | "hydrangea"
  | "pink-blossoms"

const sources: Record<BlurredBackgroundImage, string> = {
  mist: "/assets/backgrounds/misty-field.webp",
  "blue-leaves": "/assets/backgrounds/blue-leaves.webp",
  "blue-flower": "/assets/backgrounds/blue-flower.webp",
  hydrangea: "/assets/backgrounds/blue-hydrangea.webp",
  "pink-blossoms": "/assets/backgrounds/pink-blossoms.webp",
}

export function BlurredBackground({
  image,
  position = "center",
  className,
}: {
  image: BlurredBackgroundImage
  position?: string
  className?: string
}) {
  const style = {
    "--blurred-image": `url("${sources[image]}")`,
    "--blurred-position": position,
  } as CSSProperties

  return (
    <div aria-hidden="true" className={cn("blurred-background", `blurred-background--${image}`, className)}>
      <div className="blurred-background__image" style={style} />
      <div className="blurred-background__veil" />
      <div className="blurred-background__grain" />
    </div>
  )
}
