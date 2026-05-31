import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col pt-16">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  )
}
