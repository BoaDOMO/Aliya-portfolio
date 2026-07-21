export default function Footer() {
  return (
    <footer className="border-t px-6 py-8 text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Aliya Koy · Phnom Penh</p>
        <div className="flex items-center gap-5">
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
        </div>
      </div>
    </footer>
  )
}
