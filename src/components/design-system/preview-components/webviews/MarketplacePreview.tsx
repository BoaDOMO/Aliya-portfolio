import { useEffect, useRef } from "react"
import {
  ArrowRight,
  CheckCircle,
  HandbagSimple,
  Heart,
  Info,
  MagnifyingGlass,
  Package,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react"
import { PresetBox, PresetButton } from "./preset-box"

const REQUIRED_COLOR_ROLES = [
  "background",
  "foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "accent",
  "accent-foreground",
  "muted",
  "muted-foreground",
  "card",
  "card-foreground",
  "surface-raised",
  "surface-featured",
  "popover",
  "popover-foreground",
  "border",
  "border-strong",
  "input",
  "ring",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "destructive",
  "destructive-foreground",
  "info",
  "info-foreground",
] as const

const REQUIRED_FONT_ROLES = ["display", "body", "mono"] as const

const MARKETPLACE_ASSETS = {
  lamp: `${import.meta.env.BASE_URL}assets/marketplace/field-lamp.webp`,
  headphones: `${import.meta.env.BASE_URL}assets/marketplace/field-headphones.webp`,
  chair: `${import.meta.env.BASE_URL}assets/marketplace/field-chair.webp`,
  watch: `${import.meta.env.BASE_URL}assets/marketplace/field-watch.webp`,
}

const PRODUCTS = [
  {
    name: "Halo pendant",
    category: "Lighting",
    price: "$148",
    note: "Editor’s pick",
    image: MARKETPLACE_ASSETS.lamp,
    alt: "Cobalt blue pendant lamp",
    art: "primary",
  },
  {
    name: "Orbit headphones",
    category: "Audio",
    price: "$220",
    note: "Low stock",
    image: MARKETPLACE_ASSETS.headphones,
    alt: "Graphite over-ear headphones",
    art: "secondary",
  },
  {
    name: "Loop lounge chair",
    category: "Furniture",
    price: "$390",
    note: "Ships today",
    image: MARKETPLACE_ASSETS.chair,
    alt: "Oatmeal boucle lounge chair",
    art: "accent",
  },
  {
    name: "Arc field watch",
    category: "Accessories",
    price: "$184",
    note: "New arrival",
    image: MARKETPLACE_ASSETS.watch,
    alt: "Minimal field watch with olive strap",
    art: "muted",
  },
] as const

const CATEGORIES = ["New arrivals", "Home", "Work", "Travel", "Objects"]

function validatePreviewCoverage(root: HTMLElement) {
  const missingColors = REQUIRED_COLOR_ROLES.filter(
    (role) =>
      !root.matches(`[data-token-role~="${role}"]`) &&
      !root.querySelector(`[data-token-role~="${role}"]`),
  )
  const missingFonts = REQUIRED_FONT_ROLES.filter(
    (role) =>
      !root.matches(`[data-font-role~="${role}"]`) &&
      !root.querySelector(`[data-font-role~="${role}"]`),
  )

  if (missingColors.length || missingFonts.length) {
    throw new Error(
      `Marketplace preview is missing token coverage: ${[
        ...missingColors,
        ...missingFonts.map((role) => `font:${role}`),
      ].join(", ")}`,
    )
  }
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <PresetBox className="marketplace-product-card" data-token-role="card card-foreground border">
      <div className={`marketplace-product-art marketplace-product-art--${product.art}`}>
        <button type="button" className="marketplace-favorite" aria-label={`Save ${product.name}`}>
          <Heart className="size-4" />
        </button>
        <img
          className="marketplace-product-image"
          src={product.image}
          alt={product.alt}
          width="1200"
          height="1200"
          loading="eager"
          decoding="async"
          onError={(event) => { event.currentTarget.hidden = true }}
        />
      </div>
      <div className="marketplace-product-copy">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-body text-sm font-semibold text-card-foreground">{product.name}</h3>
        </div>
        <p className="font-mono text-sm font-semibold text-card-foreground">{product.price}</p>
      </div>
      <div className="marketplace-product-meta">
        <span>{product.note}</span>
        <ArrowRight className="size-3.5" />
      </div>
    </PresetBox>
  )
}

function StatusRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CheckCircle
  label: string
  value: string
  tone: "success" | "warning" | "destructive" | "info"
}) {
  return (
    <div
      className={`marketplace-status marketplace-status--${tone}`}
      data-token-role={`${tone} ${tone}-foreground`}
    >
      <Icon className="size-4 shrink-0" weight="fill" />
      <span className="min-w-0 flex-1 truncate font-body text-xs font-semibold">{label}</span>
      <span className="font-mono text-[0.65rem] uppercase tracking-wider">{value}</span>
    </div>
  )
}

export default function MarketplacePreview({ presetId }: { presetId: string }) {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (import.meta.env.DEV && previewRef.current) {
      validatePreviewCoverage(previewRef.current)
    }
  }, [])

  return (
    <div
      ref={previewRef}
      className="marketplace-preview bg-background font-body text-foreground"
      data-token-role="background foreground"
      data-font-role="body"
      data-marketplace-preset={presetId}
    >
      <div className="marketplace-announcement bg-muted text-muted-foreground" data-token-role="muted muted-foreground">
        <span className="font-mono">FIELD NOTES 04</span>
        <span>Free delivery on considered objects over $120.</span>
        <ArrowRight className="size-3.5" />
      </div>

      <header className="marketplace-header border-border" data-token-role="border">
        <a href="#" className="marketplace-brand font-display" data-font-role="display">
          FIELD
        </a>
        <nav className="marketplace-nav" aria-label="Marketplace navigation">
          {CATEGORIES.slice(1, 4).map((category) => (
            <a key={category} href={`#${category.toLowerCase()}`}>
              {category}
            </a>
          ))}
        </nav>
        <div className="marketplace-header-actions">
          <div
            role="search"
            className="marketplace-search border-input ring-ring"
            data-token-role="input ring"
          >
            <MagnifyingGlass className="size-4" />
            <span>Search objects</span>
            <kbd className="font-mono">⌘ K</kbd>
          </div>
          <button type="button" className="marketplace-icon-button" aria-label="Saved products">
            <Heart className="size-4" />
          </button>
          <button type="button" className="marketplace-icon-button marketplace-bag" aria-label="Shopping bag">
            <ShoppingBag className="size-4" />
            <span className="font-mono">2</span>
          </button>
        </div>
      </header>

      <main>
        <section className="marketplace-hero">
          <div className="marketplace-hero-copy">
            <span
              className="marketplace-kicker bg-accent text-accent-foreground"
              data-token-role="accent accent-foreground"
            >
              The considered collection
            </span>
            <h1 className="marketplace-display font-display" data-font-role="display">
              Objects worth keeping.
            </h1>
            <p className="marketplace-hero-text text-muted-foreground">
              Useful things, chosen slowly. Built for daily rituals and made to stay in your life.
            </p>
            <div className="marketplace-hero-actions">
              <PresetButton data-token-role="primary primary-foreground">
                Shop the edit
                <ArrowRight className="size-4" />
              </PresetButton>
              <PresetButton variant="secondary" data-token-role="secondary secondary-foreground">
                Our standards
              </PresetButton>
            </div>
            <div className="marketplace-trust-row">
              <span><ShieldCheck className="size-4" /> Responsible makers</span>
              <span><Truck className="size-4" /> 30-day returns</span>
            </div>
          </div>

          <PresetBox tone="featured" className="marketplace-hero-visual" data-token-role="surface-featured border">
            <div className="marketplace-visual-orbit marketplace-visual-orbit--one" />
            <div className="marketplace-visual-orbit marketplace-visual-orbit--two" />
            <img
              className="marketplace-hero-image"
              src={MARKETPLACE_ASSETS.chair}
              alt="Oatmeal boucle Loop lounge chair"
              width="1200"
              height="1200"
              fetchPriority="high"
              decoding="async"
              onError={(event) => { event.currentTarget.hidden = true }}
            />
            <PresetBox className="marketplace-hero-label">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">No. 018</span>
              <strong className="font-body text-sm">Loop lounge chair</strong>
              <span className="font-mono text-sm">$390</span>
            </PresetBox>
            <span className="marketplace-hero-rating bg-primary text-primary-foreground">
              <Star className="size-3" weight="fill" /> 4.9
            </span>
          </PresetBox>
        </section>

        <section className="marketplace-category-strip border-border" aria-label="Product categories">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Browse</span>
          <div className="marketplace-categories">
            {CATEGORIES.map((category, index) => (
              <button
                type="button"
                key={category}
                className={index === 0 ? "marketplace-category marketplace-category--active" : "marketplace-category"}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="marketplace-catalog-count font-mono text-muted-foreground">42 OBJECTS</span>
        </section>

        <section className="marketplace-section" id="home">
          <div className="marketplace-section-heading">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">The weekly edit</p>
              <h2 className="font-display text-3xl font-semibold" data-font-role="display">Designed for the everyday.</h2>
            </div>
            <button type="button" className="marketplace-text-link">
              View all <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="marketplace-product-grid">
            {PRODUCTS.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
        </section>

        <section className="marketplace-workspace" id="work">
          <PresetBox tone="raised" className="marketplace-selected" data-token-role="surface-raised border-strong">
            <div className="marketplace-selected-art">
              <img
                className="marketplace-selected-image"
                src={MARKETPLACE_ASSETS.headphones}
                alt="Graphite Orbit headphones"
                width="1200"
                height="1200"
                loading="eager"
                decoding="async"
                onError={(event) => { event.currentTarget.hidden = true }}
              />
              <span className="marketplace-selected-index font-mono">02 / 04</span>
            </div>
            <div className="marketplace-selected-copy">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Selected object</p>
                <h2 className="mt-2 font-display text-3xl font-semibold" data-font-role="display">Orbit headphones</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Quiet materials, balanced sound, and a repairable frame made for long listening sessions.
                </p>
              </div>
              <dl className="marketplace-specs border-border">
                <div><dt>Finish</dt><dd>Graphite</dd></div>
                <div><dt>Battery</dt><dd className="font-mono">38 HR</dd></div>
                <div><dt>Dispatch</dt><dd className="font-mono">24 JUL</dd></div>
              </dl>
            </div>
          </PresetBox>

          <PresetBox tone="popover" className="marketplace-order" data-token-role="popover popover-foreground">
            <div className="marketplace-order-heading border-border">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Order desk</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">Ready when you are.</h3>
              </div>
              <Package className="size-6 text-primary" />
            </div>

            <div
              className="marketplace-status-list"
              data-token-role="success success-foreground warning warning-foreground destructive destructive-foreground info info-foreground"
            >
              <StatusRow icon={CheckCircle} label="Payment protected" value="READY" tone="success" />
              <StatusRow icon={Info} label="Delivery window" value="2–3 DAYS" tone="info" />
              <StatusRow icon={WarningCircle} label="Graphite stock" value="3 LEFT" tone="warning" />
              <StatusRow icon={XCircle} label="Sand finish" value="SOLD OUT" tone="destructive" />
            </div>

            <div className="marketplace-order-total border-border">
              <span>Orbit headphones</span>
              <strong className="font-mono">$220</strong>
            </div>
            <PresetButton className="w-full justify-center" data-token-role="primary primary-foreground">
              Add to bag <HandbagSimple className="size-4" />
            </PresetButton>
          </PresetBox>
        </section>

        <section className="marketplace-story bg-secondary text-secondary-foreground" data-token-role="secondary secondary-foreground">
          <div className="marketplace-story-mark font-display">“</div>
          <blockquote className="font-display" data-font-role="display">
            The best objects disappear into your routine—and make it better.
          </blockquote>
          <div className="marketplace-story-credit">
            <span className="marketplace-avatar bg-primary text-primary-foreground">AM</span>
            <span><strong>Amara Mills</strong><small>Industrial designer</small></span>
          </div>
        </section>

        <section className="marketplace-newsletter border-border">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Field letter</p>
            <h2 className="mt-2 font-display text-3xl font-semibold" data-font-role="display">One useful thing, every Friday.</h2>
          </div>
          <div className="marketplace-subscribe border-input" data-token-role="input">
            <span className="text-muted-foreground">you@example.com</span>
            <button type="button" className="bg-primary text-primary-foreground" data-token-role="primary primary-foreground">
              Subscribe <ArrowRight className="size-4" />
            </button>
          </div>
          <p className="marketplace-newsletter-note text-muted-foreground">
            No noise. Unsubscribe whenever.
          </p>
        </section>
      </main>

      <footer className="marketplace-footer border-border">
        <div>
          <span className="font-display text-xl font-semibold" data-font-role="display">FIELD</span>
          <p className="text-xs text-muted-foreground">Objects for a considered life.</p>
        </div>
        <div className="marketplace-footer-links">
          <a href="#home">Shop</a>
          <a href="#work">About</a>
          <a href="#">Journal</a>
          <a href="#">Support</a>
        </div>
        <span className="font-mono text-[0.65rem] text-muted-foreground" data-font-role="mono">© 2026 FIELD MARKET</span>
      </footer>
    </div>
  )
}
