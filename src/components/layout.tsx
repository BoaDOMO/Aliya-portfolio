import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"

const pageTitles: Record<string, string> = {
  "/": "Aliya Koy — Product, AI & Full-stack Builder",
  "/profile": "Profile — Aliya Koy",
  "/lab": "Lab — Aliya Koy",
  "/rag": "RAG Chatbot — Aliya Koy",
  "/contact": "Contact — Aliya Koy",
  "/design-system": "Design System — Aliya Koy",
}

export default function Layout() {
  const location = useLocation()
  const isDesignSystem = location.pathname === "/design-system"
  const isRag = location.pathname === "/rag"
  const isFixedShell = isDesignSystem || isRag

  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? "Aliya Koy"
  }, [location.pathname])

  return (
    <div className={`flex flex-col ${isFixedShell ? "h-dvh overflow-hidden" : "min-h-dvh"}`}>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>
      {!isDesignSystem && (
        <div className="print:hidden">
          <Navbar />
        </div>
      )}
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex min-h-0 flex-1 scroll-mt-20 flex-col outline-none ${isDesignSystem ? "pt-0" : "pt-16"} ${isFixedShell ? "overflow-hidden" : ""}`}
        data-design-system={isDesignSystem ? "" : undefined}
      >
        <Outlet />
      </main>
      {!isDesignSystem && (
        <>
          <div className="print:hidden">
            <Footer />
          </div>
          <div className="print:hidden">
            <BackToTop />
          </div>
        </>
      )}
      <Toaster />
    </div>
  )
}
