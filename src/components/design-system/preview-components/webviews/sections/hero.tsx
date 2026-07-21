import type { ReactNode } from "react"

export function Hero({
  title,
  subtitle,
  buttons,
  centered = true,
  children,
  backgroundImage,
  backgroundOverlay,
}: {
  title: string
  subtitle: string
  buttons?: ReactNode
  centered?: boolean
  children?: ReactNode
  backgroundImage?: string
  backgroundOverlay?: string
}) {
  return (
    <section
      className={`px-6 py-16 @[48rem]:py-24 ${centered ? "text-center" : ""} ${backgroundImage ? "relative overflow-hidden" : ""}`}
    >
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {backgroundOverlay && (
            <div
              className="absolute inset-0"
              style={{ background: backgroundOverlay }}
            />
          )}
        </>
      )}
      <div className={`max-w-4xl mx-auto space-y-6 ${backgroundImage ? "relative z-10" : ""}`}>
        <h1
          className="font-display"
          style={{
            fontSize: "var(--font-size-display)",
            fontWeight: "var(--font-weight-display)",
            lineHeight: "var(--line-height-display)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        <p
          className="font-body text-foreground/70 max-w-2xl mx-auto"
          style={{
            fontSize: "var(--font-size-body)",
            fontWeight: "var(--font-weight-body)",
            lineHeight: "var(--line-height-body)",
          }}
        >
          {subtitle}
        </p>
        {buttons && (
          <div className={`flex flex-wrap gap-3 pt-2 ${centered ? "justify-center" : ""}`}>
            {buttons}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
