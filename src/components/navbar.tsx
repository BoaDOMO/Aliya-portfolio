import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { List, CaretDown } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

function NavLinkItem({
  to,
  label,
  exact,
  onClick,
}: {
  to: string
  label: string
  exact: boolean
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={exact}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-background/55 text-foreground shadow-xs"
            : "text-foreground/70 hover:bg-background/30 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        )
      }
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [labMobileOpen, setLabMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isLabActive = location.pathname.startsWith("/lab") || location.pathname === "/rag"

  return (
    <nav
      className={cn(
        "fixed left-1/2 top-3 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-full border bg-surface shadow-sm backdrop-blur-lg transition-all duration-300"
      )}
    >
      <div className="mx-auto flex h-12 w-full items-center px-4">
        <NavLink
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          ALIYA KOY
        </NavLink>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <NavLinkItem to="/" label="Home" exact />
          <NavLinkItem to="/profile" label="Profile" exact />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => navigate("/lab")}
                  className={cn(
                    "h-auto rounded-md px-3 py-1.5 text-sm font-medium",
                    "hover:bg-background/30 focus:bg-background/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    "data-open:bg-background/40 data-open:hover:bg-background/40",
                    isLabActive
                      ? "bg-background/55 text-foreground shadow-xs data-open:text-foreground"
                      : "text-foreground/70 hover:text-foreground data-open:text-foreground"
                  )}
                >
                  Lab
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[160px] p-1.5">
                  <NavigationMenuLink
                    onClick={() => navigate("/rag")}
                    className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    RAG Chatbot
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    onClick={() => navigate("/design-system")}
                    className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Design System
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavLinkItem to="/contact" label="Contact" exact />
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ModeToggle />
          <Sheet
            open={sheetOpen}
            onOpenChange={(open) => {
              setSheetOpen(open)
              setLabMobileOpen(open && isLabActive)
            }}
          >
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <List className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>ALIYA KOY</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-4">
                <NavLinkItem to="/" label="Home" exact onClick={() => setSheetOpen(false)} />
                <NavLinkItem to="/profile" label="Profile" exact onClick={() => setSheetOpen(false)} />
                <Collapsible open={labMobileOpen} onOpenChange={setLabMobileOpen}>
                  <div className="flex items-center justify-between rounded-md px-3 py-1.5">
                    <NavLink
                      to="/lab"
                      end
                      onClick={() => setSheetOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "text-sm font-medium transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/60 hover:text-foreground"
                        )
                      }
                    >
                      Lab
                    </NavLink>
                    <button
                      type="button"
                      aria-label={labMobileOpen ? "Collapse Lab links" : "Expand Lab links"}
                      aria-expanded={labMobileOpen}
                      onClick={(e) => { e.stopPropagation(); setLabMobileOpen(!labMobileOpen) }}
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <CaretDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          labMobileOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </div>
                  <CollapsibleContent>
                    <div className="ml-3 flex flex-col gap-1 border-l pl-3 mt-1">
                      <NavLinkItem to="/rag" label="RAG Chatbot" exact onClick={() => setSheetOpen(false)} />
                      <NavLinkItem to="/design-system" label="Design System" exact onClick={() => setSheetOpen(false)} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <NavLinkItem to="/contact" label="Contact" exact onClick={() => setSheetOpen(false)} />
              </nav>
              <Separator className="mt-auto" />
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
