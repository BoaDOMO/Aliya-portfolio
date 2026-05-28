# Logo: Moirai One Solid Black (Prototype)

## Goal

Make the nav logo "ALIYA KOY" use Moirai One font with a solid black, bold appearance. Moirai One is a brush-stroke display font that looks too thin/line-like by default, so we thicken it with an SVG `feMorphology` dilate filter.

## Current Status

Prototyped on `canvas-test.html` only. Not yet applied to production pages.

## Files Modified

### `canvas-test.html`

1. **Hidden SVG thicken filter** added after `<body class="main-wrapper">`:
   ```html
   <svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;">
     <filter id="thicken">
       <feMorphology operator="dilate" radius="1.2" in="SourceGraphic" result="thick" />
       <feMerge>
         <feMergeNode in="thick" />
         <feMergeNode in="SourceGraphic" />
       </feMerge>
     </filter>
   </svg>
   ```

2. **CSS rules** added inside the `<style>` block for the nav logo:
   ```css
   .nav-logo h2 {
     font-family: 'Moirai One', sans-serif;
     filter: url(#thicken);
     color: #000;
   }
   :root[data-theme="dark"] .nav-logo h2 {
     color: #F3F4F6;
   }
   ```

   The `feMerge` composites the thickened version behind the original to preserve sharp edges.

3. **Google Fonts link** was already present (line 22):
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Moirai+One&display=swap" rel="stylesheet" />
   ```

## How It Works

- `feMorphology` with `operator="dilate"` makes the glyph strokes physically thicker
- `radius="1.2"` controls the amount of thickening (higher = thicker, try 1.5-2.0 for bolder)
- Solid black color (`#000`) replaces the default near-black
- Dark mode uses near-white (`#F3F4F6`)

## To Apply to Production

When ready, replicate the same 3 changes to these files:
- `index.html`, `profile.html`, `lab.html`, `contact.html` (add font link + SVG filter + CSS)
- `rag-chatbot.html` (has separate `.demo-logo` class, need separate CSS there)
- `src/style-original.css` (add `.nav-logo h2` override rules)
- `src/rag-chatbot.css` (add Moirai One to `.demo-logo`)
- Rebuild: `npx postcss src/tailwind.css -o style.css`

## Notes

- Moirai One only has Regular weight — can't use `font-weight` to bolden
- The SVG filter approach avoids loading an extra font and works cross-browser
- Font size kept at 20px (same as current)
- Hero section h1 stays Georgia serif (not affected)
