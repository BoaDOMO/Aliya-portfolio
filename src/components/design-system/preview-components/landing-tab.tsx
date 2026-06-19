import { useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useDesignTokens } from "@/lib/design-tokens-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SearchIcon,
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  ChevronRightIcon,
  CheckIcon,
  MenuIcon,
  TruckIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  ArrowRightIcon,
} from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  badge: string
  badgeVariant: "default" | "secondary" | "destructive"
  color: string
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Ceramic Vase", price: 48, badge: "New", badgeVariant: "default", color: "from-rose-200 to-rose-100 dark:from-rose-900 dark:to-rose-800" },
  { id: 2, name: "Linen Throw", price: 65, originalPrice: 85, badge: "Sale", badgeVariant: "destructive", color: "from-amber-200 to-amber-100 dark:from-amber-900 dark:to-amber-800" },
  { id: 3, name: "Pendant Lamp", price: 120, badge: "Best Seller", badgeVariant: "secondary", color: "from-sky-200 to-sky-100 dark:from-sky-900 dark:to-sky-800" },
  { id: 4, name: "Oak Side Table", price: 280, badge: "New", badgeVariant: "default", color: "from-stone-300 to-stone-200 dark:from-stone-800 dark:to-stone-700" },
]

const CATEGORIES = [
  { name: "Furniture", count: 124, gradient: "from-violet-200 to-violet-100 dark:from-violet-900 dark:to-violet-800" },
  { name: "Lighting", count: 89, gradient: "from-amber-200 to-amber-100 dark:from-amber-900 dark:to-amber-800" },
  { name: "Textiles", count: 156, gradient: "from-rose-200 to-rose-100 dark:from-rose-900 dark:to-rose-800" },
  { name: "Kitchen", count: 203, gradient: "from-emerald-200 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800" },
  { name: "Decor", count: 178, gradient: "from-sky-200 to-sky-100 dark:from-sky-900 dark:to-sky-800" },
  { name: "Outdoor", count: 67, gradient: "from-lime-200 to-lime-100 dark:from-lime-900 dark:to-lime-800" },
]

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Interior Designer", quote: "The quality exceeded my expectations. Every piece feels thoughtfully crafted.", rating: 5 },
  { name: "Marcus Webb", role: "Homeowner", quote: "Found everything I needed to furnish my new apartment. Fast shipping too!", rating: 5 },
  { name: "Elena Torres", role: "Architect", quote: "Curated selection with a perfect balance of modern and timeless pieces.", rating: 5 },
]

const PRICING = [
  {
    name: "Free", price: "$0", period: "/mo", highlight: false,
    features: ["Browse all products", "Save wishlists", "Standard shipping", "Email support"],
  },
  {
    name: "Pro", price: "$12", period: "/mo", highlight: true,
    features: ["Free shipping always", "Early access to drops", "Exclusive member pricing", "Priority support", "Free returns"],
  },
  {
    name: "Trade", price: "$29", period: "/mo", highlight: false,
    features: ["All Pro features", "Trade pricing", "Sample program", "Dedicated account manager", "White-label options", "API access"],
  },
]

const FOOTER_COLS = [
  { title: "Shop", links: ["All Products", "New Arrivals", "Sale", "Collections", "Gift Cards"] },
  { title: "Company", links: ["About Us", "Our Story", "Sustainability", "Careers", "Press"] },
  { title: "Support", links: ["Help Center", "Shipping Info", "Returns", "Size Guide", "Contact Us"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"] },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-3 ${i < rating ? "fill-warning text-warning" : "text-muted-foreground/20"}`}
        />
      ))}
    </div>
  )
}

export default function LandingTab() {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())
  const [cartCount, setCartCount] = useState(3)
  const [email, setEmail] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const state = useDesignTokens()
  const { fonts } = state

  function toggleWishlist(id: number) {
    const next = new Set(wishlist)
    if (next.has(id)) {
      next.delete(id)
      toast("Removed from wishlist")
    } else {
      next.add(id)
      toast.success("Added to wishlist")
    }
    setWishlist(next)
  }

  return (
    <div className="flex min-h-[900px] flex-col" style={{ fontFamily: fonts.body ?? "Inter" }}>
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-4">
            <p
              className="text-sm font-bold tracking-tight text-foreground"
              style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
            >
              Modern Haus
            </p>
            <div className="hidden items-center gap-3 md:flex">
              {["Categories", "New Arrivals", "Sale", "About"].map((link) => (
                <button
                  key={link}
                  className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search products..." className="h-6 w-36 pl-6 text-xs" />
            </div>

            <button className="relative rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              <ShoppingCartIcon className="size-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>

            <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="rounded-full p-0.5 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px]">AK</AvatarFallback>
                </Avatar>
              </span>
            </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-xs">Orders</DropdownMenuItem>
                <DropdownMenuItem className="text-xs">Wishlist</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
            >
              <MenuIcon className="size-4" />
            </button>
          </div>
        </div>
      </nav>

      <motion.section
        className="bg-muted/50 px-4 py-16 text-center sm:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mx-auto max-w-2xl text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl"
          style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
          variants={itemVariants}
        >
          Curated for the modern home
        </motion.h1>
        <motion.p
          className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground"
          variants={itemVariants}
        >
          Thoughtfully designed furniture, lighting, and decor — each piece selected for quality, durability, and timeless appeal.
        </motion.p>
        <motion.div className="mt-6 flex items-center justify-center gap-3" variants={itemVariants}>
          <Button size="sm">
            Shop Collection
            <ArrowRightIcon className="size-3" />
          </Button>
          <Button variant="outline" size="sm">
            Browse Lookbook
          </Button>
        </motion.div>
        <motion.div
          className="mt-6 flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          {[
            { icon: TruckIcon, label: "Free Shipping" },
            { icon: ShieldCheckIcon, label: "Secure Checkout" },
            { icon: RefreshCwIcon, label: "30-Day Returns" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="size-3" />
              {label}
            </div>
          ))}
        </motion.div>
      </motion.section>

      <section className="border-b border-border px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
            >
              Shop by Category
            </h2>
            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm focus-visible:outline-none">
              View All <ChevronRightIcon className="size-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className="group rounded-xl border border-border bg-card p-4 text-left transition-all hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <div className={`mb-3 h-16 rounded-lg bg-gradient-to-br ${cat.gradient}`} />
                <p className="text-xs font-semibold text-foreground group-hover:text-accent-foreground transition-colors">
                  {cat.name}
                </p>
                <p className="text-xs text-muted-foreground group-hover:text-accent-foreground">{cat.count} items</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
            >
              Featured Products
            </h2>
            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm focus-visible:outline-none">
              View All <ChevronRightIcon className="size-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <Card key={product.id} className="group relative overflow-hidden">
                <div className="relative">
                  <div className={`h-36 bg-gradient-to-br ${product.color}`} />
                  <Badge
                    variant={product.badgeVariant}
                    className="absolute left-2 top-2 text-xs px-1.5 py-0 h-4"
                  >
                    {product.badge}
                  </Badge>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground opacity-0 transition-all hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none group-hover:opacity-100"
                  >
                    <HeartIcon
                      className={`size-3.5 ${wishlist.has(product.id) ? "fill-destructive text-destructive" : ""}`}
                    />
                  </button>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs font-medium text-foreground">{product.name}</p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold text-foreground" style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}>
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    size="xs"
                    className="mt-2 w-full"
                    onClick={() => {
                      setCartCount(cartCount + 1)
                      toast.success(`${product.name} added to cart!`)
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary px-4 py-12 text-center">
        <div className="mx-auto max-w-2xl">
          <p
            className="text-lg font-bold text-primary-foreground"
            style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
          >
            Free shipping on orders over $100
          </p>
          <p className="mt-2 text-xs text-primary-foreground/80">
            Use code <strong>FREESHIP</strong> at checkout. Limited time offer.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button variant="secondary" size="sm">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-6 text-center text-sm font-semibold text-foreground"
            style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
          >
            What our customers say
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="text-center">
                <CardContent className="pt-5">
                  <StarRating rating={t.rating} />
                  <p className="mt-3 text-xs italic leading-relaxed text-card-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-xs">
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-xs font-medium text-card-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-6 text-center text-sm font-semibold text-foreground"
            style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
          >
            Membership
          </h2>
          <p className="mb-6 text-center text-xs text-muted-foreground">
            Unlock perks with a Modern Haus membership.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PRICING.map((tier) => (
              <Card
                key={tier.name}
                className={`relative ${tier.highlight ? "ring-2 ring-primary" : ""}`}
              >
                {tier.highlight && (
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0 h-4">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="pb-3 text-center">
                  <CardTitle className="text-xs">{tier.name}</CardTitle>
                  <div className="mt-1 flex items-baseline justify-center gap-0.5">
                    <span
                      className="text-lg font-bold text-foreground"
                      style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
                    >
                      {tier.price}
                    </span>
                    <span className="text-xs text-muted-foreground">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                        <CheckIcon className="size-3 shrink-0 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-4 w-full h-7 text-xs"
                    variant={tier.highlight ? "default" : "outline"}
                  >
                    {tier.name === "Free" ? "Get Started" : `Join ${tier.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/50 px-4 py-10 text-center">
        <div className="mx-auto max-w-md">
          <h2
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
          >
            Stay in the loop
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Be the first to know about new arrivals, exclusive drops, and members-only sales.
          </p>
          <form
            className="mt-4 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (email) {
                toast.success("Subscribed! Check your inbox.")
                setEmail("")
              }
            }}
          >
            <Input
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-8 flex-1 text-xs"
            />
            <Button type="submit" size="sm" className="h-8 text-xs">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <section className="border-b border-border px-4 py-8">
        <div className="mx-auto flex max-w-6xl justify-around">
          {[
            { value: "10K+", label: "Products" },
            { value: "50K+", label: "Customers" },
            { value: "99%", label: "Satisfaction" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: fonts.display ?? "Archivo Narrow" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-xs font-semibold text-foreground">{col.title}</p>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => toast(`Navigating to ${link}...`)}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm focus-visible:outline-none"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 Modern Haus. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">Visa</Badge>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">Mastercard</Badge>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">PayPal</Badge>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">Amex</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
