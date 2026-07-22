import { ArrowUpRight, MapPin } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { PageContainer } from "@/components/page-layout"

const footerLinks = [
  ["Home", "/"],
  ["Profile", "/profile"],
  ["Lab", "/lab"],
  ["Contact", "/contact"],
] as const

export default function Footer() {
  return (
    <footer className="border-t py-16 text-muted-foreground md:py-20">
      <PageContainer>
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <div className="flex h-full flex-col">
            <p className="font-display text-xl font-semibold tracking-[-0.04em] text-foreground">
              ALIYA KOY
            </p>
            <div className="mt-10 md:mt-auto">
              <p className="font-mono text-xs uppercase tracking-[0.2em]">Connect</p>
              <a
                href="https://www.linkedin.com/in/aliya-koy-b48b761b1/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="size-3.5" weight="bold" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em]">Navigate</p>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col items-start gap-3">
              {footerLinks.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-sm text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex h-full flex-col">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em]">Based</p>
              <p className="mt-5 flex items-center gap-2 text-sm">
                <MapPin className="size-4" /> Phnom Penh, Cambodia
              </p>
            </div>
            <div className="mt-8 md:mt-auto">
              <p className="font-mono text-xs uppercase tracking-[0.2em]">Process</p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em]">
                Prompt · Inspect · Debug · Ship
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-6 text-xs md:mt-20">
          © {new Date().getFullYear()} Aliya Koy. Designed with intention.
        </div>
      </PageContainer>
    </footer>
  )
}
