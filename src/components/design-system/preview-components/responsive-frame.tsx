import type { ReactNode } from "react"

export type DeviceType = "desktop" | "phone"

const MAX_WIDTH: Record<DeviceType, number> = {
  desktop: 1280,
  phone: 375,
}

export default function ResponsiveFrame({
  children,
  device,
  fullscreen,
}: {
  children: ReactNode
  device: DeviceType
  fullscreen: boolean
}) {
  const maxWidth = fullscreen ? undefined : MAX_WIDTH[device]

  return (
    <div
      className="mx-auto w-full transition-all duration-300 motion-reduce:transition-none"
      style={{ maxWidth }}
    >
      {children}
    </div>
  )
}
