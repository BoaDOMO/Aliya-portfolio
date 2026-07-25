import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { CaretDown, List } from "@phosphor-icons/react"
import { NavLink, useLocation } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const labItems = [
  { to: "/chat", label: "Chat Workspace" },
  { to: "/design-studio", label: "Design Studio" },
] as const

function DesktopNavLink({ to, label }: { to: string; label: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <NavLink
      to={to}
      end
      className="relative isolate flex h-9 items-center rounded-full px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="portfolio-nav-active"
              className="absolute inset-0 -z-10 rounded-full bg-accent"
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 380, damping: 30 }
              }
            />
          )}
          <span
            className={cn(
              "relative transition-colors",
              isActive
                ? "text-accent-foreground"
                : "text-foreground/65 hover:text-foreground"
            )}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [labMobileOpen, setLabMobileOpen] = useState(false)
  const [labMenuOpen, setLabMenuOpen] = useState(false)
  const location = useLocation()
  const labActive = location.pathname === "/lab" || labItems.some((item) => location.pathname === item.to)
  const reduceMotion = useReducedMotion()

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open)
    if (open) setLabMobileOpen(labActive)
  }

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border bg-surface backdrop-blur-2xl transition-[background-color,box-shadow,border-color] duration-300",
        "w-[calc(100%-2rem)] max-w-[36rem] lg:w-auto lg:max-w-none",
        scrolled
          ? "border-border/90 shadow-[0_18px_48px_-24px_rgba(8,18,10,0.36)]"
          : "border-border/70 shadow-none"
      )}
    >
      <div className="flex h-[3.4rem] items-center px-2.5 md:px-3">
        <NavLink
          to="/"
          className="flex h-10 items-center rounded-full px-3 font-display text-sm font-semibold tracking-[-0.04em] outline-none transition-opacity hover:opacity-65 focus-visible:ring-2 focus-visible:ring-ring"
        >
          ALIYA KOY
        </NavLink>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border lg:block" />

        <div className="hidden items-center lg:flex">
          <DesktopNavLink to="/" label="Home" />
          <DesktopNavLink to="/profile" label="Profile" />
          <div className="relative isolate flex h-9 items-center rounded-full">
            {labActive && (
              <motion.span
                layoutId="portfolio-nav-active"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 30 }
                }
              />
            )}
            <NavLink
              to="/lab"
              end
              className={cn(
                "relative flex h-9 items-center rounded-full pl-4 pr-1 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                labActive ? "text-accent-foreground" : "text-foreground/65 hover:text-foreground"
              )}
            >
              Lab
            </NavLink>
            <DropdownMenu open={labMenuOpen} onOpenChange={setLabMenuOpen}>
              <DropdownMenuTrigger
                aria-label="Open Lab submenu"
                className={cn(
                  "relative flex size-8 items-center justify-center rounded-full text-foreground/65 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  labActive && "text-accent-foreground"
                )}
              >
                <CaretDown className={cn("size-3.5 transition-transform duration-200", labMenuOpen && "rotate-180")} weight="bold" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-56 rounded-2xl border border-border/80 bg-surface/95 p-2 shadow-xl backdrop-blur-xl">
                {labItems.map(({ to, label }) => (
                  <DropdownMenuItem key={to} render={<NavLink to={to} end />} className="rounded-xl px-3 py-2.5 font-medium text-foreground">
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DesktopNavLink to="/contact" label="Contact" />
        </div>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border lg:block" />

        <div className="ml-auto flex items-center lg:ml-0">
          <ModeToggle />
          <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger
              className="lg:hidden"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="size-10 rounded-full"
                />
              }
            >
              <List className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background px-6">
              <SheetHeader>
                <SheetTitle className="font-display text-lg">ALIYA KOY</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col border-t">
                <NavLink
                  to="/"
                  end
                  onClick={() => setSheetOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-14 items-center border-b font-display text-2xl tracking-[-0.035em] outline-none transition-colors focus-visible:text-primary",
                      isActive ? "text-primary" : "text-foreground"
                    )
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/profile"
                  end
                  onClick={() => setSheetOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-14 items-center border-b font-display text-2xl tracking-[-0.035em] outline-none transition-colors focus-visible:text-primary",
                      isActive ? "text-primary" : "text-foreground"
                    )
                  }
                >
                  Profile
                </NavLink>
                <div className="border-b">
                  <div className="flex items-center">
                    <NavLink
                      to="/lab"
                      end
                      onClick={() => setSheetOpen(false)}
                      className={() =>
                        cn(
                          "flex min-h-14 min-w-0 flex-1 items-center font-display text-2xl tracking-[-0.035em] outline-none transition-colors focus-visible:text-primary",
                          labActive ? "text-primary" : "text-foreground"
                        )
                      }
                    >
                      <span>Lab</span>
                    </NavLink>
                    <button
                      type="button"
                      aria-label="Toggle Lab submenu"
                      aria-expanded={labMobileOpen}
                      aria-controls="lab-mobile-subnav"
                      onClick={() => setLabMobileOpen((open) => !open)}
                      className="mr-1 flex size-10 shrink-0 items-center justify-center rounded-full text-foreground/70 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <CaretDown className={cn("size-5 transition-transform duration-200", labMobileOpen && "rotate-180")} weight="bold" />
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {labMobileOpen && (
                      <motion.div
                        id="lab-mobile-subnav"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mb-3 ml-4 flex flex-col border-l border-border pl-4">
                          {labItems.map(({ to, label }) => (
                            <NavLink
                              key={to}
                              to={to}
                              end
                              onClick={() => setSheetOpen(false)}
                              className={({ isActive }) =>
                                cn(
                                  "flex min-h-11 items-center border-b font-display text-lg tracking-[-0.03em] outline-none transition-colors last:border-b-0 focus-visible:text-primary",
                                  isActive ? "text-primary" : "text-foreground"
                                )
                              }
                            >
                              {label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <NavLink
                  to="/contact"
                  end
                  onClick={() => setSheetOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-14 items-center border-b font-display text-2xl tracking-[-0.035em] outline-none transition-colors focus-visible:text-primary",
                      isActive ? "text-primary" : "text-foreground"
                    )
                  }
                >
                  Contact
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
