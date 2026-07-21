import type { SVGProps } from "react"

export function WaveDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 60 Q180 0 360 40 Q540 80 720 30 Q900 -20 1080 25 Q1260 70 1440 40 L1440 120 L0 120Z"
        className="fill-background/80"
      />
    </svg>
  )
}

export function BlobShape(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M200 30C280 30 370 90 380 180C390 270 310 370 200 380C90 390 20 290 10 200C0 110 120 30 200 30Z"
        className="fill-primary/10"
      />
    </svg>
  )
}

export function DotGrid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <pattern id="dot-grid-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" className="fill-foreground/5" />
      </pattern>
      <rect width="200" height="200" fill="url(#dot-grid-pattern)" />
    </svg>
  )
}

export function MistCircles(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="200" cy="300" r="180" className="fill-primary/[0.03]" />
      <circle cx="500" cy="200" r="220" className="fill-accent/[0.03]" />
      <circle cx="650" cy="450" r="160" className="fill-primary/[0.03]" />
      <circle cx="100" cy="500" r="120" className="fill-accent/[0.02]" />
      <circle cx="700" cy="100" r="100" className="fill-primary/[0.02]" />
    </svg>
  )
}

export function MiniChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="text-primary" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" className="text-primary" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points="0,50 25,35 50,40 75,20 100,30 125,10 150,15 175,5 200,8"
        className="stroke-primary/40"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="0,50 25,35 50,40 75,20 100,30 125,10 150,15 175,5 200,8 200,60 0,60"
        fill="url(#chart-grad)"
      />
    </svg>
  )
}

export function AmpersandSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="50"
        y="80"
        textAnchor="middle"
        className="fill-foreground/10"
        fontSize="100"
        fontFamily="serif"
        fontWeight="400"
      >
        &
      </text>
    </svg>
  )
}
