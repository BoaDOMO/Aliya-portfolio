export default function Footer() {
  return (
    <footer className="relative border-t px-6 py-4 text-xs text-muted-foreground">
      <div aria-hidden="true" className="signal-rule absolute left-1/2 top-0 w-28 -translate-x-1/2" />
      <div className="mx-auto flex min-h-6 w-full max-w-6xl items-center justify-between gap-3">
        <p className="whitespace-nowrap">
          &copy; {new Date().getFullYear()} Aliya Koy
        </p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          <a
            href="mailto:aliyakoy365@gmail.com"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/aliya-koy-b48b761b1/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  )
}
