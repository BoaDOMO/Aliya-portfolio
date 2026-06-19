# Tailwind CSS v4 Reference

> Consolidated documentation from tailwindcss.com/docs — stripped of navigation, footers, and UI chrome.  
> Covers: Installation (Vite), Styling with Utility Classes, Theme, Responsive Design, Dark Mode, Functions & Directives.

---

## 1. Installation (Vite)

**Source:** https://tailwindcss.com/docs/installation

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. It's fast, flexible, and reliable — with zero-runtime.

### Installing Tailwind CSS as a Vite plugin

Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS.

**Step 1: Create your project**

```shell
npm create vite@latest my-project
cd my-project
```

**Step 2: Install Tailwind CSS**

```shell
npm install tailwindcss @tailwindcss/vite
```

**Step 3: Configure the Vite plugin**

Add the `@tailwindcss/vite` plugin to your Vite configuration.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

**Step 4: Import Tailwind CSS**

Add an `@import` to your CSS file that imports Tailwind CSS.

```css
@import "tailwindcss";
```

**Step 5: Start your build process**

```shell
npm run dev
```

**Step 6: Start using Tailwind in your HTML**

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

---

## 2. Styling with Utility Classes

**Source:** https://tailwindcss.com/docs/styling-with-utility-classes

Building complex components from a constrained set of primitive utilities.

### Overview

You style things with Tailwind by combining many single-purpose presentational classes (utility classes) directly in your markup:

```html
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
  <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
  <div>
    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
  </div>
</div>
```

**Benefits:**
- You get things done faster — no time coming up with class names or switching between HTML and CSS files.
- Making changes feels safer — adding/removing a utility class only affects that element.
- Maintaining old projects is easier — changing something means finding that element and changing classes.
- Your code is more portable — structure and styling live in the same place.
- Your CSS stops growing — utility classes are reusable.

### Why not just use inline styles?

- **Designing with constraints** — utilities use a predefined design system, not magic numbers.
- **Hover, focus, and other states** — Tailwind's state variants work with utilities.
- **Media queries** — responsive variants enable fully responsive interfaces.

### Styling hover and focus states

Prefix any utility with the state you want to target:

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

Generated CSS:

```css
.hover\:bg-sky-700 {
  &:hover {
    background-color: var(--color-sky-700);
  }
}
```

Stack variants:

```html
<button class="bg-sky-500 disabled:hover:bg-sky-500 ...">Save changes</button>
```

### Media queries and breakpoints

Prefix any utility with the breakpoint where you want that style to apply:

```html
<div class="grid grid-cols-2 sm:grid-cols-3">
  <!-- ... -->
</div>
```

Generated CSS:

```css
.sm\:grid-cols-3 {
  @media (width >= 40rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

### Targeting dark mode

Add the `dark:` prefix:

```html
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">The Zero Gravity Pen can be used to write in any orientation.</p>
</div>
```

Generated CSS:

```css
.dark\:bg-gray-800 {
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-gray-800);
  }
}
```

### Using class composition

Multiple classes build up the value for a single CSS property:

```html
<div class="blur-sm grayscale">
  <!-- ... -->
</div>
```

### Using arbitrary values

Use square bracket syntax for one-off values:

```html
<button class="bg-[#316ff6] ...">Sign in with Facebook</button>
<div class="grid grid-cols-[24rem_2.5rem_minmax(0,1fr)]">...</div>
<div class="max-h-[calc(100dvh-(--spacing(6)))]">...</div>
```

Arbitrary property names (useful for setting CSS variables):

```html
<div class="[--gutter-width:1rem] lg:[--gutter-width:2rem]">...</div>
```

### How Tailwind works

Tailwind scans project files for symbols that look like class names, generates CSS for each, and compiles it into one stylesheet.

```jsx
export default function Button({ size, children }) {
  let sizeClasses = {
    md: "px-4 py-2 rounded-md text-base",
    lg: "px-5 py-3 rounded-lg text-lg",
  }[size];
  return (
    <button type="button" className={`font-bold ${sizeClasses}`}>
      {children}
    </button>
  );
}
```

### Complex selectors

Combining conditions:

```html
<button class="dark:lg:data-current:hover:bg-indigo-600 ...">...</button>
```

Simplified CSS:

```css
@media (prefers-color-scheme: dark) and (width >= 64rem) {
  button[data-current]:hover {
    background-color: var(--color-indigo-600);
  }
}
```

Group variants (`group-hover`, `group-focus`, etc.):

```html
<a href="#" class="group rounded-lg p-8">
  <span class="group-hover:underline">Read more…</span>
</a>
```

Arbitrary variants:

```html
<div class="[&>[data-active]+span]:text-blue-600 ...">
  <span data-active><!-- ... --></span>
  <span>This text will be blue</span>
</div>
```

### When to use inline styles

Dynamic values from a database or API:

```jsx
export function BrandedButton({ buttonColor, textColor, children }) {
  return (
    <button
      style={{ backgroundColor: buttonColor, color: textColor }}
      className="rounded-md px-3 py-1.5 font-medium"
    >
      {children}
    </button>
  );
}
```

Setting CSS variables via inline styles, then referencing with utilities:

```jsx
<button
  style={{
    "--bg-color": buttonColor,
    "--bg-color-hover": buttonColorHover,
    "--text-color": textColor,
  }}
  className="bg-(--bg-color) text-(--text-color) hover:bg-(--bg-color-hover) ..."
>
  {children}
</button>
```

### Managing duplication

- **Using loops** — elements rendered in a loop only author the class list once.
- **Multi-cursor editing** — quickly select and edit class lists for each element at once.
- **Using components** — create a component in React/Svelte/Vue for reuse across files.
- **Using custom CSS** — for small elements use `@layer components` with theme variables:

```css
@import "tailwindcss";

@layer components {
  .btn-primary {
    border-radius: calc(infinity * 1px);
    background-color: var(--color-violet-500);
    padding-inline: --spacing(5);
    padding-block: --spacing(2);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
    box-shadow: var(--shadow-md);
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-violet-700);
      }
    }
  }
}
```

### Managing style conflicts

- **Conflicting utilities** — later class in stylesheet wins. Only add the one you want.
- **Important modifier** — add `!` to the end of the class name:

```html
<div class="bg-teal-500 bg-red-500!">...</div>
```

- **Important flag** — mark all utilities as `!important`:

```css
@import "tailwindcss" important;
```

- **Prefix option** — prefix all Tailwind-generated classes:

```css
@import "tailwindcss" prefix(tw);
```

Compiled:

```css
.tw\:text-red-500 {
  color: var(--tw-color-red-500);
}
```

---

## 3. Theme

**Source:** https://tailwindcss.com/docs/theme

Using utility classes as an API for your design tokens.

### What are theme variables?

Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project.

```css
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

Now `bg-mint-500`, `text-mint-500`, `fill-mint-500` etc. are available:

```html
<div class="bg-mint-500">...</div>
```

Tailwind also generates regular CSS variables:

```html
<div style="background-color: var(--color-mint-500)">...</div>
```

### Why `@theme` instead of `:root`?

Theme variables aren't just CSS variables — they also instruct Tailwind to create new utility classes. Use `@theme` when you want a design token to map to a utility class. Use `:root` for regular CSS variables that shouldn't have corresponding utilities.

### Relationship to utility classes

Theme variables in the `--font-*` namespace determine `font-family` utilities:

```css
/* Default theme */
@theme {
  --font-sans: ui-sans-serif, system-ui, sans-serif, ...;
  --font-serif: ui-serif, Georgia, Cambria, ...;
  --font-mono: ui-monospace, SFMono-Regular, ...;
}
```

Adding a theme variable creates a new utility:

```css
@theme {
  --font-poppins: Poppins, sans-serif;
}
```

```html
<h1 class="font-poppins">This headline will use Poppins.</h1>
```

### Relationship to variants

`--breakpoint-*` variables define responsive breakpoint variants:

```css
@theme {
  --breakpoint-3xl: 120rem;
}
```

```html
<div class="3xl:grid-cols-6 grid grid-cols-2 md:grid-cols-4">...</div>
```

### Theme variable namespaces

| Namespace | Creates |
|---|---|
| `--color-*` | Color utilities like `bg-red-500`, `text-sky-300` |
| `--font-*` | Font family utilities like `font-sans` |
| `--text-*` | Font size utilities like `text-xl` |
| `--font-weight-*` | Font weight utilities like `font-bold` |
| `--tracking-*` | Letter spacing like `tracking-wide` |
| `--leading-*` | Line height like `leading-tight` |
| `--tab-size-*` | Tab size like `tab-github` |
| `--breakpoint-*` | Responsive breakpoint variants like `sm:*` |
| `--container-*` | Container query variants like `@sm:*` and `max-w-md` |
| `--spacing-*` | Spacing/sizing like `px-4`, `max-h-16` |
| `--radius-*` | Border radius like `rounded-sm` |
| `--shadow-*` | Box shadow like `shadow-md` |
| `--inset-shadow-*` | Inset box shadow like `inset-shadow-xs` |
| `--drop-shadow-*` | Drop shadow filter like `drop-shadow-md` |
| `--blur-*` | Blur filter like `blur-md` |
| `--perspective-*` | Perspective like `perspective-near` |
| `--zoom-*` | Zoom like `zoom-compact` |
| `--aspect-*` | Aspect ratio like `aspect-video` |
| `--ease-*` | Transition timing like `ease-out` |
| `--animate-*` | Animation like `animate-spin` |

### Customizing your theme

**Extending the default theme:**

```css
@theme {
  --font-script: Great Vibes, cursive;
}
```

```html
<p class="font-script">This will use the Great Vibes font family.</p>
```

**Overriding the default theme:**

```css
@theme {
  --breakpoint-sm: 30rem;
}
```

**Completely override an entire namespace:**

```css
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-purple: #3f3cbb;
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
  --color-bermuda: #78dcca;
}
```

**Using a custom theme (disable all defaults):**

```css
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
  --color-coral: oklch(0.74 0.17 40.24);
  --color-driftwood: oklch(0.79 0.06 74.59);
  --color-tide: oklch(0.49 0.08 205.88);
  --color-dusk: oklch(0.82 0.15 72.09);
}
```

**Defining animation keyframes:**

```css
@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;

  @keyframes fade-in-scale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

**Referencing other variables (inline option):**

```css
@theme inline {
  --font-sans: var(--font-inter);
}
```

**Generating all CSS variables (static):**

```css
@theme static {
  --color-primary: var(--color-red-500);
  --color-secondary: var(--color-blue-500);
}
```

**Sharing across projects:**

```css
/* ./packages/brand/theme.css */
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
  /* ... */
}
```

```css
/* ./packages/admin/app.css */
@import "tailwindcss";
@import "../brand/theme.css";
```

### Using your theme variables

**With custom CSS:**

```css
@layer components {
  .typography {
    p {
      font-size: var(--text-base);
      color: var(--color-gray-700);
    }
    h1 {
      font-size: var(--text-2xl--line-height);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-950);
    }
  }
}
```

**With arbitrary values:**

```html
<div class="absolute inset-px rounded-[calc(var(--radius-xl)-1px)]">...</div>
```

**Referencing in JavaScript:**

```jsx
<motion.div animate={{ backgroundColor: "var(--color-blue-500)" }} />
```

```js
let styles = getComputedStyle(document.documentElement);
let shadow = styles.getPropertyValue("--shadow-xl");
```

### Default theme variable reference

Tailwind's default theme includes:
- **Fonts** — `--font-sans`, `--font-serif`, `--font-mono`
- **Colors** — `--color-{red,orange,amber,yellow,lime,green,emerald,teal,cyan,sky,blue,indigo,violet,purple,fuchsia,pink,rose,slate,gray,zinc,neutral,stone,mauve,olive,mist,taupe}-{50-950}`, plus `--color-black` and `--color-white`
- **Spacing** — `--spacing: 0.25rem`
- **Breakpoints** — `--breakpoint-sm: 40rem`, `--breakpoint-md: 48rem`, `--breakpoint-lg: 64rem`, `--breakpoint-xl: 80rem`, `--breakpoint-2xl: 96rem`
- **Containers** — `--container-{3xs,2xs,xs,sm,md,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl}` ranging 16rem–80rem
- **Font sizes** — `--text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl,8xl,9xl}` with line-height sub-values
- **Font weights** — `--font-weight-{thin,extralight,light,normal,medium,semibold,bold,extrabold,black}`
- **Letter spacing** — `--tracking-{tighter,tight,normal,wide,wider,widest}`
- **Line height** — `--leading-{tight,snug,normal,relaxed,loose}`
- **Border radius** — `--radius-{xs,sm,md,lg,xl,2xl,3xl,4xl}`
- **Shadows** — `--shadow-{2xs,xs,sm,md,lg,xl,2xl}`
- **Inset shadows** — `--inset-shadow-{2xs,xs,sm}`
- **Drop shadows** — `--drop-shadow-{xs,sm,md,lg,xl,2xl}`
- **Text shadows** — `--text-shadow-{2xs,xs,sm,md,lg}`
- **Blur** — `--blur-{xs,sm,md,lg,xl,2xl,3xl}`
- **Perspective** — `--perspective-{dramatic,near,normal,midrange,distant}`
- **Aspect ratio** — `--aspect-video: 16 / 9`
- **Easing** — `--ease-{in,out,in-out}`
- **Animations** — `--animate-{spin,ping,pulse,bounce}` with `@keyframes`

Values are in `oklch()` color space. Full color palette is available at the [source page](https://tailwindcss.com/docs/theme#default-theme-variable-reference).

---

## 4. Responsive Design

**Source:** https://tailwindcss.com/docs/responsive-design

Using responsive utility variants to build adaptive user interfaces.

### Overview

Every utility class in Tailwind can be applied conditionally at different breakpoints. First, add the viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Prefix utilities with breakpoint name and `:`:

```html
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

### Default breakpoints

| Prefix | Min width | CSS |
|---|---|---|
| `sm` | 40rem (640px) | `@media (width >= 40rem) { ... }` |
| `md` | 48rem (768px) | `@media (width >= 48rem) { ... }` |
| `lg` | 64rem (1024px) | `@media (width >= 64rem) { ... }` |
| `xl` | 80rem (1280px) | `@media (width >= 80rem) { ... }` |
| `2xl` | 96rem (1536px) | `@media (width >= 96rem) { ... }` |

### Example

```html
<div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg" alt=""/>
    </div>
    <div class="p-8">
      <div class="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div>
      <a href="#" class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-gray-500">Looking to take your team away on a retreat...</p>
    </div>
  </div>
</div>
```

### Working mobile-first

Unprefixed utilities take effect on all screen sizes. Prefixed utilities take effect at the specified breakpoint **and above**.

Don't use `sm:` to target mobile:

```html
<!-- Wrong: only centers on 640px+ -->
<div class="sm:text-center"></div>

<!-- Correct: centers on mobile, left-aligns on 640px+ -->
<div class="text-center sm:text-left"></div>
```

### Targeting a breakpoint range

Stack a responsive variant with a `max-*` variant:

```html
<div class="md:max-xl:flex">...</div>
```

**Max variants:**

| Variant | CSS |
|---|---|
| `max-sm` | `@media (width < 40rem) { ... }` |
| `max-md` | `@media (width < 48rem) { ... }` |
| `max-lg` | `@media (width < 64rem) { ... }` |
| `max-xl` | `@media (width < 80rem) { ... }` |
| `max-2xl` | `@media (width < 96rem) { ... }` |

### Targeting a single breakpoint

```html
<div class="md:max-lg:flex">...</div>
```

### Using custom breakpoints

**Customizing in theme:**

```css
@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

```html
<div class="grid xs:grid-cols-2 3xl:grid-cols-6">...</div>
```

**Removing default breakpoints:**

```css
@theme {
  --breakpoint-2xl: initial;
}
```

**Reset all breakpoints:**

```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-tablet: 40rem;
  --breakpoint-laptop: 64rem;
  --breakpoint-desktop: 80rem;
}
```

**Arbitrary breakpoints:**

```html
<div class="max-[600px]:bg-sky-300 min-[320px]:text-center">...</div>
```

### Container queries

**Basic example:**

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">...</div>
</div>
```

**Max-width container queries:**

```html
<div class="@container">
  <div class="flex flex-row @max-md:flex-col">...</div>
</div>
```

**Container query ranges:**

```html
<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">...</div>
</div>
```

**Named containers:**

```html
<div class="@container/main">
  <div class="flex flex-row @sm/main:flex-col">...</div>
</div>
```

**Size containers:**

```html
<div class="@container-size">
  <div class="h-[50cqb]">...</div>
</div>
```

**Custom container sizes:**

```css
@theme {
  --container-8xl: 96rem;
}
```

```html
<div class="@container">
  <div class="flex flex-col @8xl:flex-row">...</div>
</div>
```

**Arbitrary container query values:**

```html
<div class="@container">
  <div class="flex flex-col @min-[475px]:flex-row">...</div>
</div>
```

**Container query units:**

```html
<div class="@container">
  <div class="w-[50cqw]">...</div>
</div>
```

### Container size reference

| Variant | Min width | CSS |
|---|---|---|
| `@3xs` | 16rem (256px) | `@container (width >= 16rem) { … }` |
| `@2xs` | 18rem (288px) | `@container (width >= 18rem) { … }` |
| `@xs` | 20rem (320px) | `@container (width >= 20rem) { … }` |
| `@sm` | 24rem (384px) | `@container (width >= 24rem) { … }` |
| `@md` | 28rem (448px) | `@container (width >= 28rem) { … }` |
| `@lg` | 32rem (512px) | `@container (width >= 32rem) { … }` |
| `@xl` | 36rem (576px) | `@container (width >= 36rem) { … }` |
| `@2xl` | 42rem (672px) | `@container (width >= 42rem) { … }` |
| `@3xl` | 48rem (768px) | `@container (width >= 48rem) { … }` |
| `@4xl` | 56rem (896px) | `@container (width >= 56rem) { … }` |
| `@5xl` | 64rem (1024px) | `@container (width >= 64rem) { … }` |
| `@6xl` | 72rem (1152px) | `@container (width >= 72rem) { … }` |
| `@7xl` | 80rem (1280px) | `@container (width >= 80rem) { … }` |

---

## 5. Dark Mode

**Source:** https://tailwindcss.com/docs/dark-mode

### Overview

Tailwind includes a `dark` variant that lets you style your site differently when dark mode is enabled:

```html
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg class="h-6 w-6 stroke-white" ...><!-- ... --></svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">The Zero Gravity Pen can be used to write in any orientation.</p>
</div>
```

By default this uses `prefers-color-scheme` CSS media feature.

### Toggling dark mode manually

Override the `dark` variant to use a CSS selector:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

Now `dark:*` utilities apply when the `dark` class is present:

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">...</div>
  </body>
</html>
```

**Using a data attribute:**

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```html
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">...</div>
  </body>
</html>
```

**With system theme support:**

```js
// On page load or when changing themes, best to add inline in <head> to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

// Whenever the user explicitly chooses a mode
localStorage.theme = "light";
localStorage.theme = "dark";
localStorage.removeItem("theme"); // Respect OS preference
```

---

## 6. Functions and Directives

**Source:** https://tailwindcss.com/docs/functions-and-directives

### Directives

#### `@import`

Inline import CSS files, including Tailwind itself:

```css
@import "tailwindcss";
```

#### `@theme`

Define your project's custom design tokens:

```css
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  /* ... */
}
```

#### `@source`

Explicitly specify source files not picked up by automatic content detection:

```css
@source "../node_modules/@my-company/ui-lib";
```

#### `@utility`

Add custom utilities that work with variants:

```css
@utility tab-4 {
  tab-size: 4;
}
```

#### `@variant`

Apply a Tailwind variant to styles in your CSS:

```css
.my-element {
  background: white;
  @variant dark {
    background: black;
  }
}
```

#### `@custom-variant`

Add a custom variant:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Usage: `theme-midnight:bg-black`, `theme-midnight:text-white`

#### `@apply`

Inline existing utility classes into custom CSS:

```css
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}
.select2-search {
  @apply rounded border border-gray-300;
}
.select2-results__group {
  @apply text-lg font-bold text-gray-900;
}
```

#### `@reference`

Import for reference without duplicating CSS in output (useful in Vue/Svelte `<style>` blocks or CSS modules):

```css
@reference "../../app.css";
h1 {
  @apply text-2xl font-bold text-red-500;
}
```

Or import Tailwind directly:

```css
@reference "tailwindcss";
h1 {
  @apply text-2xl font-bold text-red-500;
}
```

#### Subpath Imports

`@import`, `@reference`, `@plugin`, and `@config` support subpath imports:

```json
{
  "imports": {
    "#app.css": "./src/css/app.css"
  }
}
```

```css
@reference "#app.css";
h1 {
  @apply text-2xl font-bold text-red-500;
}
```

### Functions

#### `--alpha()`

Adjust the opacity of a color:

```css
/* Input */
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}

/* Compiled */
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

#### `--spacing()`

Generate a spacing value based on your theme:

```css
/* Input */
.my-element {
  margin: --spacing(4);
}

/* Compiled */
.my-element {
  margin: calc(var(--spacing) * 4);
}
```

Also useful in arbitrary values:

```html
<div class="py-[calc(--spacing(4)-1px)]">...</div>
```

### Compatibility (v3.x)

#### `@config`

Load a legacy JavaScript-based configuration file:

```css
@config "../../tailwind.config.js";
```

#### `@plugin`

Load a legacy JavaScript-based plugin:

```css
@plugin "@tailwindcss/typography";
```

#### `theme()`

Access Tailwind theme values using dot notation (deprecated — use CSS theme variables instead):

```css
.my-element {
  margin: theme(spacing.12);
}
```
