import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"

export default function Layout() {
  const location = useLocation()
  const isDesignSystem = location.pathname.startsWith("/design-system")

  return (
    <div className={`flex flex-col ${isDesignSystem ? "h-dvh overflow-hidden" : "min-h-dvh"}`}>
      <Navbar />
      <main
          className="flex min-h-0 flex-1 flex-col pt-16"
          data-design-system={isDesignSystem ? "" : undefined}
        >
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  )
}
