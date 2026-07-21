import type { ReactNode } from "react"

export type DeviceType = "desktop" | "tablet" | "phone"

const MAX_WIDTH: Record<DeviceType, number> = {
  desktop: 1280,
  tablet: 768,
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
      data-preview-device={device}
      className="@container mx-auto min-h-full max-w-full overflow-x-clip transition-[width] duration-300 motion-reduce:transition-none"
      style={{
        width: maxWidth ? `min(100%, ${maxWidth}px)` : "100%",
        maxWidth,
      }}
    >
      {children}
    </div>
  )
}
