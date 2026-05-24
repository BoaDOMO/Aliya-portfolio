/* ═══════════════════════════════════════════
   DESIGN SYSTEM TOKEN PICKER v3
   ═══════════════════════════════════════════ */

/* ── FALLBACK_FONTS (150+ Google Fonts, no API fetch) ── */

var FALLBACK_FONTS = [
  { family: "ABeeZee", category: "sans-serif" }, { family: "Abel", category: "sans-serif" },
  { family: "Abril Fatface", category: "display" }, { family: "Aclonica", category: "sans-serif" },
  { family: "Acme", category: "sans-serif" }, { family: "Alegreya", category: "serif" },
  { family: "Alegreya Sans", category: "sans-serif" }, { family: "Amaranth", category: "sans-serif" },
  { family: "Anton", category: "sans-serif" }, { family: "Arimo", category: "sans-serif" },
  { family: "Arvo", category: "serif" }, { family: "Asap", category: "sans-serif" },
  { family: "Barlow", category: "sans-serif" }, { family: "Bebas Neue", category: "sans-serif" },
  { family: "Bitter", category: "serif" }, { family: "Bree Serif", category: "serif" },
  { family: "Cabin", category: "sans-serif" }, { family: "Carrois Gothic", category: "sans-serif" },
  { family: "Catamaran", category: "sans-serif" }, { family: "Caveat", category: "handwriting" },
  { family: "Chakra Petch", category: "sans-serif" }, { family: "Comfortaa", category: "display" },
  { family: "Cookie", category: "handwriting" }, { family: "Copse", category: "serif" },
  { family: "Cormorant", category: "serif" }, { family: "Cormorant Garamond", category: "serif" },
  { family: "Courgette", category: "handwriting" }, { family: "Crete Round", category: "serif" },
  { family: "Crimson Text", category: "serif" }, { family: "Cutive Mono", category: "monospace" },
  { family: "Dancing Script", category: "handwriting" }, { family: "Didact Gothic", category: "sans-serif" },
  { family: "DM Mono", category: "monospace" }, { family: "DM Sans", category: "sans-serif" },
  { family: "DM Serif Display", category: "serif" }, { family: "DM Serif Text", category: "serif" },
  { family: "Domine", category: "serif" }, { family: "Dosis", category: "sans-serif" },
  { family: "Eczar", category: "serif" }, { family: "Exo", category: "sans-serif" },
  { family: "Exo 2", category: "sans-serif" }, { family: "Fira Code", category: "monospace" },
  { family: "Fira Sans", category: "sans-serif" }, { family: "Fjalla One", category: "sans-serif" },
  { family: "Fredoka", category: "sans-serif" }, { family: "Gentium Book Plus", category: "serif" },
  { family: "Georgia", category: "serif" }, { family: "Gloock", category: "serif" },
  { family: "Golos Text", category: "sans-serif" }, { family: "Hind", category: "sans-serif" },
  { family: "Hind Siliguri", category: "sans-serif" }, { family: "IBM Plex Mono", category: "monospace" },
  { family: "IBM Plex Sans", category: "sans-serif" }, { family: "IBM Plex Serif", category: "serif" },
  { family: "Inconsolata", category: "monospace" }, { family: "Instrument Sans", category: "sans-serif" },
  { family: "Inter", category: "sans-serif" }, { family: "JetBrains Mono", category: "monospace" },
  { family: "Josefin Sans", category: "sans-serif" }, { family: "Jost", category: "sans-serif" },
  { family: "Karla", category: "sans-serif" }, { family: "Labrada", category: "serif" },
  { family: "Lato", category: "sans-serif" }, { family: "Libre Baskerville", category: "serif" },
  { family: "Libre Franklin", category: "sans-serif" }, { family: "Lilita One", category: "display" },
  { family: "Literata", category: "serif" }, { family: "Lora", category: "serif" },
  { family: "Lobster", category: "display" }, { family: "Lobster Two", category: "display" },
  { family: "Luckiest Guy", category: "display" }, { family: "Manrope", category: "sans-serif" },
  { family: "Maven Pro", category: "sans-serif" }, { family: "Merriweather", category: "serif" },
  { family: "Merriweather Sans", category: "sans-serif" }, { family: "Monda", category: "sans-serif" },
  { family: "Montserrat", category: "sans-serif" }, { family: "Mukta", category: "sans-serif" },
  { family: "Mulish", category: "sans-serif" }, { family: "Neuton", category: "serif" },
  { family: "Noticia Text", category: "serif" }, { family: "Noto Sans", category: "sans-serif" },
  { family: "Noto Sans Display", category: "sans-serif" }, { family: "Noto Serif", category: "serif" },
  { family: "Noto Serif Display", category: "serif" }, { family: "Nunito", category: "sans-serif" },
  { family: "Nunito Sans", category: "sans-serif" }, { family: "Old Standard TT", category: "serif" },
  { family: "Open Sans", category: "sans-serif" }, { family: "Oswald", category: "sans-serif" },
  { family: "Overpass", category: "sans-serif" }, { family: "Oxygen", category: "sans-serif" },
  { family: "Pacifico", category: "handwriting" }, { family: "Passion One", category: "display" },
  { family: "Pathway Gothic One", category: "sans-serif" }, { family: "Patrick Hand", category: "handwriting" },
  { family: "Petrona", category: "serif" }, { family: "Philosopher", category: "sans-serif" },
  { family: "Playfair Display", category: "serif" }, { family: "Playfair Display SC", category: "serif" },
  { family: "Plus Jakarta Sans", category: "sans-serif" }, { family: "Poppins", category: "sans-serif" },
  { family: "Proza Libro", category: "serif" }, { family: "PT Mono", category: "monospace" },
  { family: "PT Sans", category: "sans-serif" }, { family: "PT Serif", category: "serif" },
  { family: "Public Sans", category: "sans-serif" }, { family: "Quicksand", category: "sans-serif" },
  { family: "Raleway", category: "sans-serif" }, { family: "Recursive", category: "sans-serif" },
  { family: "Red Hat Display", category: "sans-serif" }, { family: "Red Hat Text", category: "sans-serif" },
  { family: "Roboto", category: "sans-serif" }, { family: "Roboto Condensed", category: "sans-serif" },
  { family: "Roboto Mono", category: "monospace" }, { family: "Roboto Serif", category: "serif" },
  { family: "Rosario", category: "sans-serif" }, { family: "Rouge Script", category: "handwriting" },
  { family: "Rubik", category: "sans-serif" }, { family: "Saira", category: "sans-serif" },
  { family: "Satisfy", category: "handwriting" }, { family: "Sen", category: "sans-serif" },
  { family: "Seymour One", category: "sans-serif" }, { family: "Signika", category: "sans-serif" },
  { family: "Signika Negative", category: "sans-serif" }, { family: "Silkscreen", category: "display" },
  { family: "Sora", category: "sans-serif" }, { family: "Source Code Pro", category: "monospace" },
  { family: "Source Sans 3", category: "sans-serif" }, { family: "Source Serif 4", category: "serif" },
  { family: "Space Grotesk", category: "sans-serif" }, { family: "Space Mono", category: "monospace" },
  { family: "Spartan", category: "sans-serif" }, { family: "Special Elite", category: "display" },
  { family: "Spectral", category: "serif" }, { family: "Syne", category: "sans-serif" },
  { family: "Taviraj", category: "serif" }, { family: "Teko", category: "sans-serif" },
  { family: "Titillium Web", category: "sans-serif" }, { family: "Ubuntu", category: "sans-serif" },
  { family: "Ubuntu Mono", category: "monospace" }, { family: "Unbounded", category: "display" },
  { family: "Urbanist", category: "sans-serif" }, { family: "Varela Round", category: "sans-serif" },
  { family: "Vollkorn", category: "serif" }, { family: "Work Sans", category: "sans-serif" },
  { family: "Zilla Slab", category: "serif" },
];

/* ── STATE ── */

var DS = {
  primaryHex: '#26428b',
  neutralMode: 'gray',
  headingFont: 'Georgia, serif',
  bodyFont: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif',
  baseFontSize: 16,
  typeScale: 'default',
  format: 'css',
};

/* ── ES5 HELPERS ── */

function toArray(list) {
  var arr = [];
  for (var i = 0; i < list.length; i++) arr.push(list[i]);
  return arr;
}

function padStart(str, len, ch) {
  ch = ch || '0';
  while (str.length < len) str = ch + str;
  return str;
}

/* ── COLOR UTILITIES ── */

function hexToHSL(hex) {
  var r = parseInt(hex.slice(1, 3), 16) / 255;
  var g = parseInt(hex.slice(3, 5), 16) / 255;
  var b = parseInt(hex.slice(5, 7), 16) / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function HSLToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  var r, g, b;
  if (s === 0) { r = g = b = l; } else {
    var hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  var toHex = function (x) { return padStart(Math.round(x * 255).toString(16), 2); };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function getLuminance(hex) {
  var r = parseInt(hex.slice(1, 3), 16) / 255;
  var g = parseInt(hex.slice(3, 5), 16) / 255;
  var b = parseInt(hex.slice(5, 7), 16) / 255;
  var a = [r, g, b].map(function (c) {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrastRatio(hex1, hex2) {
  var l1 = getLuminance(hex1);
  var l2 = getLuminance(hex2);
  var lighter = Math.max(l1, l2);
  var darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getWCAG(ratio) {
  return { AA: ratio >= 4.5, AAA: ratio >= 7 };
}

function generateScale(hex) {
  var hsl = hexToHSL(hex);
  var steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return steps.map(function (step) {
    var lightness;
    if (step <= 500) {
      lightness = 95 - (95 - hsl.l) * (step / 500);
    } else {
      lightness = hsl.l - (hsl.l - 3) * ((step - 500) / 450);
    }
    lightness = Math.max(2, Math.min(98, lightness));
    var sat = Math.max(5, hsl.s);
    return { name: step, hex: HSLToHex(hsl.h, sat, lightness) };
  });
}

function generateNeutralScale(mode, primaryHex) {
  var steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  var lightMap = {50:97, 100:94, 200:88, 300:78, 400:65, 500:50, 600:38, 700:28, 800:18, 900:10, 950:5};
  var sat = 0;
  var h = 0;
  if (mode === 'tinted') {
    sat = 4;
    h = hexToHSL(primaryHex).h;
  }
  return steps.map(function (s) {
    return { name: s, hex: HSLToHex(h, sat, lightMap[s]) };
  });
}

/* ── FONT UTILITIES ── */

var loadedFonts = (function () {
  if (typeof Set !== 'undefined') return new Set();
  var s = {};
  s._data = {};
  s.add = function (v) { s._data[v] = true; };
  s.has = function (v) { return s._data[v] === true; };
  return s;
})();

function loadGoogleFont(family) {
  if (loadedFonts.has(family)) return;
  var link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(family) + ':wght@300;400;500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  loadedFonts.add(family);
}

/* ── HELPERS ── */

function getTypeRatio() {
  return { compact: 1.2, default: 1.25, spacious: 1.333 }[DS.typeScale] || 1.25;
}

function getTypeSizes() {
  var base = DS.baseFontSize;
  var ratio = getTypeRatio();
  return {
    h1: (base / 16 * Math.pow(ratio, 5)).toFixed(3),
    h2: (base / 16 * Math.pow(ratio, 4)).toFixed(3),
    h3: (base / 16 * Math.pow(ratio, 3)).toFixed(3),
    h4: (base / 16 * Math.pow(ratio, 2)).toFixed(3),
    h5: (base / 16 * Math.pow(ratio, 1)).toFixed(3),
    h6: (base / 16 * Math.pow(ratio, 0)).toFixed(3),
    body: (base / 16).toFixed(3),
    small: (base / 16 / ratio).toFixed(3),
    caption: (base / 16 / Math.pow(ratio, 2)).toFixed(3),
  };
}

function findScale(scale, name) {
  for (var i = 0; i < scale.length; i++) {
    if (scale[i].name === name) return scale[i].hex;
  }
  return DS.primaryHex;
}

/* ── SYNC STATE FROM DOM ── */

function syncStateFromDOM() {
  var headingEl = document.getElementById('dsHeadingFont');
  var bodyEl = document.getElementById('dsBodyFont');
  if (headingEl && headingEl.value) DS.headingFont = headingEl.value;
  if (bodyEl && bodyEl.value) DS.bodyFont = bodyEl.value;
}

/* ── UPDATE: Colors ── */

function updateColors() {
  var swatch = document.getElementById('dsPrimarySwatch');
  var hexInput = document.getElementById('dsPrimaryHex');
  var picker = document.getElementById('dsPrimaryColorPicker');
  var badge = document.getElementById('dsContrastBadge');
  var scaleRow = document.getElementById('dsScaleRow');
  var neutralRow = document.getElementById('dsNeutralRow');

  swatch.style.background = DS.primaryHex;
  hexInput.value = DS.primaryHex;
  picker.value = DS.primaryHex;

  var ratio = getContrastRatio(DS.primaryHex, '#ffffff');
  var wcag = getWCAG(ratio);
  badge.innerHTML =
    '<span class="ds-contrast-label">Contrast (on white):</span>' +
    '<span class="ds-badge ' + (wcag.AA ? 'ds-badge-pass' : 'ds-badge-fail') + '">AA ' + (wcag.AA ? '\u2713' : '\u2717') + '</span>' +
    '<span class="ds-badge ' + (wcag.AAA ? 'ds-badge-pass' : 'ds-badge-fail') + '">AAA ' + (wcag.AAA ? '\u2713' : '\u2717') + '</span>';

  var scale = generateScale(DS.primaryHex);
  scaleRow.innerHTML = scale.map(function (s) {
    return '<div class="ds-swatch-item" style="background:' + s.hex + '" data-hex="' + s.hex + '"><span>' + s.name + '</span></div>';
  }).join('');

  var neutrals = generateNeutralScale(DS.neutralMode, DS.primaryHex);
  neutralRow.innerHTML = neutrals.map(function (s) {
    return '<div class="ds-swatch-item" style="background:' + s.hex + '" data-hex="' + s.hex + '"><span>' + s.name + '</span></div>';
  }).join('');
}

/* ── UPDATE: Typography ── */

function updateTypography() {
  var headingPreview = document.getElementById('dsFontPreviewHeading');
  var bodyPreview = document.getElementById('dsFontPreviewBody');
  headingPreview.style.fontFamily = DS.headingFont;
  bodyPreview.style.fontFamily = DS.bodyFont;

  var sizes = getTypeSizes();
  var labels = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', body: 'body', small: 'small', caption: 'caption' };
  var keys = ['h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'];
  var tbody = document.querySelector('#dsScaleTable tbody');
  tbody.innerHTML = keys.map(function (k) {
    var rem = sizes[k] + 'rem';
    return '<tr><td>' + labels[k] + '</td><td>' + rem + '</td><td><span style="font-size:' + rem + '">Aa</span></td></tr>';
  }).join('');
}

/* ── RENDER: Preview Colors ── */

function renderPreviewColors() {
  var scale = generateScale(DS.primaryHex);
  var secondary = findScale(scale, 400);
  var primary600 = findScale(scale, 600);
  var rgb = hexToRgb(DS.primaryHex);
  var neutrals = generateNeutralScale(DS.neutralMode, DS.primaryHex);

  var solidsEl = document.getElementById('dsPreviewSolids');
  solidsEl.innerHTML = [
    { hex: DS.primaryHex, label: 'Primary' },
    { hex: secondary, label: 'Secondary' },
    { hex: '#16a34a', label: 'Success' },
    { hex: '#dc2626', label: 'Error' },
    { hex: '#d97706', label: 'Warning' },
    { hex: '#2563eb', label: 'Info' },
  ].map(function (c) {
    return '<div class="ds-preview-color-card" style="background:' + c.hex + '">' +
      '<span class="ds-preview-color-hex">' + c.hex + '</span>' +
      '<span class="ds-preview-color-label">' + c.label + '</span></div>';
  }).join('');

  var gradsEl = document.getElementById('dsPreviewGradients');
  gradsEl.innerHTML =
    '<div class="ds-preview-gradient" style="background:linear-gradient(90deg,' + DS.primaryHex + ',' + secondary + ')">Primary \u2192 Secondary</div>' +
    '<div class="ds-preview-gradient" style="background:linear-gradient(90deg,#16a34a,#22c55e)">Success</div>' +
    '<div class="ds-preview-gradient" style="background:linear-gradient(90deg,#dc2626,#ef4444)">Error</div>' +
    '<div class="ds-preview-gradient" style="background:linear-gradient(90deg,#d97706,#f59e0b)">Warning</div>';

  var shadesEl = document.getElementById('dsPreviewShades');
  shadesEl.innerHTML = [
    { light: secondary, dark: primary600, label: 'Primary' },
    { light: '#22c55e', dark: '#15803d', label: 'Success' },
    { light: '#ef4444', dark: '#b91c1c', label: 'Error' },
    { light: '#f59e0b', dark: '#b45309', label: 'Warning' },
  ].map(function (s) {
    return '<div class="ds-preview-shade">' +
      '<div class="ds-preview-shade-light" style="background:' + s.light + '"></div>' +
      '<div class="ds-preview-shade-dark" style="background:' + s.dark + '"></div>' +
      '<span>' + s.label + '</span></div>';
  }).join('');

  var graysEl = document.getElementById('dsPreviewGrays');
  graysEl.innerHTML = neutrals.map(function (s) {
    var lum = getLuminance(s.hex);
    var textColor = lum > 0.5 ? '#666' : '#fff';
    return '<div class="ds-preview-gray-card" style="background:' + s.hex + ';color:' + textColor + '"><span>' + s.name + '</span></div>';
  }).join('');

  var surfacesEl = document.getElementById('dsPreviewSurfaces');
  surfacesEl.innerHTML =
    '<div class="ds-preview-surface" style="background:rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.08);border:1px solid rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.15);color:' + DS.primaryHex + '">Primary Surface</div>' +
    '<div class="ds-preview-surface" style="background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.15);color:#16a34a">Success Surface</div>' +
    '<div class="ds-preview-surface" style="background:#ffffff;border:1px solid rgba(0,0,0,0.06);color:#1a1a1a">Light Surface</div>' +
    '<div class="ds-preview-surface" style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);color:#f3f4f6">Dark Surface</div>';
}

/* ── RENDER: Preview Typography ── */

function renderPreviewTypography() {
  var headingName = DS.headingFont.split(',')[0].replace(/['"]/g, '').trim();
  var bodyName = DS.bodyFont.split(',')[0].replace(/['"]/g, '').trim();

  var fontInfo = document.getElementById('dsPreviewFontInfo');
  fontInfo.innerHTML = 'Font used: <strong>' + headingName + '</strong> (display) / <strong>' + bodyName + '</strong> (body)';

  var alphabet = document.getElementById('dsPreviewAlphabet');
  alphabet.style.fontFamily = DS.headingFont;

  var sizes = getTypeSizes();
  var displayKeys = [
    { label: 'Display 1', exp: 5 },
    { label: 'Display 2', exp: 4 },
    { label: 'Display 3', exp: 3 },
    { label: 'Display 4', exp: 2 },
    { label: 'Display 5', exp: 1 },
    { label: 'Display 6', exp: 0 },
  ];

  var displaysEl = document.getElementById('dsPreviewDisplays');
  displaysEl.innerHTML = displayKeys.map(function (d) {
    var rem = sizes['h' + (6 - d.exp)] || (DS.baseFontSize / 16 * Math.pow(getTypeRatio(), d.exp)).toFixed(3);
    var remStr = rem + 'rem';
    var px = (parseFloat(rem) * 16).toFixed(1);
    return '<div class="ds-preview-type-item">' +
      '<span class="ds-preview-type-label">' + d.label + '</span>' +
      '<span class="ds-preview-type-sample" style="font-size:' + remStr + ';font-family:' + DS.headingFont + '">The quick brown fox</span>' +
      '<span class="ds-preview-type-meta">' + remStr + ' \u00B7 ' + px + 'px</span></div>';
  }).join('');

  var headingsEl = document.getElementById('dsPreviewHeadings');
  var headingSizes = [
    { label: 'Heading 1', rem: '1.75', w: 700 },
    { label: 'Heading 2', rem: '1.5', w: 700 },
    { label: 'Heading 3', rem: '1.25', w: 600 },
    { label: 'Heading 4', rem: '1.125', w: 600 },
    { label: 'Heading 5', rem: '1', w: 600 },
    { label: 'Heading 6', rem: '0.875', w: 600 },
  ];
  headingsEl.innerHTML = headingSizes.map(function (h, i) {
    var font = i < 4 ? DS.headingFont : DS.bodyFont;
    return '<div class="ds-preview-type-item">' +
      '<span class="ds-preview-type-label">' + h.label + '</span>' +
      '<span class="ds-preview-type-sample" style="font-size:' + h.rem + 'rem;font-family:' + font + ';font-weight:' + h.w + '">The Quick Brown Fox Jumps</span></div>';
  }).join('');

  var textsEl = document.getElementById('dsPreviewTexts');
  textsEl.style.fontFamily = DS.bodyFont;
}

/* ── RENDER: Preview Layout ── */

function renderPreviewLayout() {
  var spacingEl = document.getElementById('dsPreviewSpacing');
  var data = [1, 2, 3, 4, 5, 6, 7, 8];
  spacingEl.innerHTML = data.map(function (i) {
    var px = i * 8;
    var rem = (px / 16).toFixed(1) + 'rem';
    return '<div class="ds-preview-spacing-row">' +
      '<span class="ds-preview-spacing-num">' + i + '</span>' +
      '<div class="ds-preview-spacing-bar" style="width:' + (px * 3) + 'px;background:' + DS.primaryHex + '"></div>' +
      '<span class="ds-preview-spacing-val">' + px + 'px \u00B7 ' + rem + '</span></div>';
  }).join('');

  var scale = generateScale(DS.primaryHex);
  var p50 = findScale(scale, 50);
  var p100 = findScale(scale, 100);
  var p600 = findScale(scale, 600);

  var dashCells = document.querySelectorAll('.ds-preview-dash-cell');
  if (dashCells.length >= 4) {
    dashCells[0].style.background = p50;
    dashCells[1].style.background = p100;
    dashCells[2].style.background = p50;
    dashCells[3].style.background = p100;
    for (var ci = 0; ci < dashCells.length; ci++) {
      dashCells[ci].style.color = DS.primaryHex;
    }
  }

  var appCells = document.querySelectorAll('.ds-preview-app-cell');
  for (var ai = 0; ai < appCells.length; ai++) {
    appCells[ai].style.background = ai % 2 === 0 ? DS.primaryHex : p600;
  }

  var pageCols = document.querySelectorAll('.ds-preview-page-col');
  for (var pi = 0; pi < pageCols.length; pi++) {
    pageCols[pi].style.background = pi % 2 === 0 ? p50 : p100;
    pageCols[pi].style.color = DS.primaryHex;
  }

  var mobileCols = document.querySelectorAll('.ds-preview-mobile-col');
  for (var mi = 0; mi < mobileCols.length; mi++) {
    mobileCols[mi].style.background = mi % 2 === 0 ? p50 : p100;
    mobileCols[mi].style.color = DS.primaryHex;
  }
}

/* ── RENDER: Preview (master) ── */

function renderPreview() {
  renderPreviewColors();
  renderPreviewTypography();
  renderPreviewLayout();
}

/* ── EXPORT: Code Generation ── */

function generateCSS() {
  var lines = [];
  lines.push(':root {');
  lines.push('  /* -- Colors -- */');
  lines.push('  --color-primary: ' + DS.primaryHex + ';');
  var scale = generateScale(DS.primaryHex);
  scale.forEach(function (s) {
    lines.push('  --color-primary-' + s.name + ': ' + s.hex + ';');
  });
  lines.push('');
  lines.push('  /* -- Neutral -- */');
  var neutrals = generateNeutralScale(DS.neutralMode, DS.primaryHex);
  neutrals.forEach(function (s) {
    lines.push('  --color-neutral-' + s.name + ': ' + s.hex + ';');
  });
  lines.push('');
  lines.push('  /* -- Semantic -- */');
  lines.push('  --color-success: #16a34a;');
  lines.push('  --color-error: #dc2626;');
  lines.push('  --color-warning: #d97706;');
  lines.push('  --color-info: #2563eb;');
  lines.push('');
  lines.push('  /* -- Typography -- */');
  lines.push('  --font-display: ' + DS.headingFont + ';');
  lines.push('  --font-body: ' + DS.bodyFont + ';');
  var sizes = getTypeSizes();
  var sizeKeys = ['h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'];
  sizeKeys.forEach(function (k) {
    lines.push('  --font-size-' + k + ': ' + sizes[k] + 'rem;');
  });
  lines.push('');
  lines.push('  /* -- Spacing (8px base) -- */');
  var spacingVals = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
  spacingVals.forEach(function (v, i) {
    lines.push('  --spacing-' + (i + 1) + ': ' + v + 'rem;');
  });
  lines.push('}');
  return lines.join('\n');
}

function generateTailwind() {
  var lines = [];
  lines.push('@theme {');
  lines.push('  /* -- Colors -- */');
  lines.push('  --color-primary: ' + DS.primaryHex + ';');
  var scale = generateScale(DS.primaryHex);
  scale.forEach(function (s) {
    lines.push('  --color-primary-' + s.name + ': ' + s.hex + ';');
  });
  lines.push('');
  lines.push('  /* -- Neutral -- */');
  var neutrals = generateNeutralScale(DS.neutralMode, DS.primaryHex);
  neutrals.forEach(function (s) {
    lines.push('  --color-neutral-' + s.name + ': ' + s.hex + ';');
  });
  lines.push('');
  lines.push('  /* -- Semantic -- */');
  lines.push('  --color-success: #16a34a;');
  lines.push('  --color-error: #dc2626;');
  lines.push('  --color-warning: #d97706;');
  lines.push('  --color-info: #2563eb;');
  lines.push('');
  lines.push('  /* -- Typography -- */');
  lines.push('  --font-display: ' + DS.headingFont + ';');
  lines.push('  --font-body: ' + DS.bodyFont + ';');
  var sizes = getTypeSizes();
  var sizeKeys = ['h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'];
  sizeKeys.forEach(function (k) {
    lines.push('  --font-size-' + k + ': ' + sizes[k] + 'rem;');
  });
  lines.push('');
  lines.push('  /* -- Spacing -- */');
  var spacingVals = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
  spacingVals.forEach(function (v, i) {
    lines.push('  --spacing-' + (i + 1) + ': ' + v + 'rem;');
  });
  lines.push('}');
  return lines.join('\n');
}

function generateSCSS() {
  var lines = [];
  lines.push('// Design System Tokens');
  lines.push('// Generated by Aliya Koy Design System Picker');
  lines.push('');
  lines.push('// ── Colors ──');
  lines.push('$color-primary: ' + DS.primaryHex + ';');
  var scale = generateScale(DS.primaryHex);
  scale.forEach(function (s) {
    lines.push('$color-primary-' + s.name + ': ' + s.hex + ';');
  });
  lines.push('');
  lines.push('// ── Neutral ──');
  var neutrals = generateNeutralScale(DS.neutralMode, DS.primaryHex);
  neutrals.forEach(function (s) {
    lines.push('$color-neutral-' + s.name + ': ' + s.hex + ';');
  });
  lines.push('');
  lines.push('// ── Semantic ──');
  lines.push('$color-success: #16a34a;');
  lines.push('$color-error: #dc2626;');
  lines.push('$color-warning: #d97706;');
  lines.push('$color-info: #2563eb;');
  lines.push('');
  lines.push('// ── Typography ──');
  lines.push('$font-display: ' + DS.headingFont + ';');
  lines.push('$font-body: ' + DS.bodyFont + ';');
  var sizes = getTypeSizes();
  var sizeKeys = ['h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'];
  sizeKeys.forEach(function (k) {
    lines.push('$font-size-' + k + ': ' + sizes[k] + 'rem;');
  });
  lines.push('');
  lines.push('// ── Spacing ──');
  var spacingVals = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
  spacingVals.forEach(function (v, i) {
    lines.push('$spacing-' + (i + 1) + ': ' + v + 'rem;');
  });
  return lines.join('\n');
}

function generateJSON() {
  var scale = generateScale(DS.primaryHex);
  var neutrals = generateNeutralScale(DS.neutralMode, DS.primaryHex);
  var sizes = getTypeSizes();
  var spacingVals = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];

  var colors = { primary: DS.primaryHex };
  scale.forEach(function (s) { colors['primary-' + s.name] = s.hex; });
  var neutralsObj = {};
  neutrals.forEach(function (s) { neutralsObj[s.name] = s.hex; });
  var fontSize = {};
  var sizeKeys = ['h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'];
  sizeKeys.forEach(function (k) { fontSize[k] = sizes[k] + 'rem'; });
  var spacing = {};
  spacingVals.forEach(function (v, i) { spacing['' + (i + 1)] = v + 'rem'; });

  var obj = {
    color: colors,
    neutral: neutralsObj,
    semantic: { success: '#16a34a', error: '#dc2626', warning: '#d97706', info: '#2563eb' },
    font: { display: DS.headingFont, body: DS.bodyFont },
    fontSize: fontSize,
    spacing: spacing,
  };
  return JSON.stringify(obj, null, 2);
}

function highlightCode(code, format) {
  var lines = code.split('\n');
  var html = lines.map(function (line, i) {
    var ln = '<span class="hl-ln">' + (i + 1) + '</span>';
    var hl = line;
    hl = hl.replace(/\/\*[\s\S]*?\*\//g, '<span class="hl-comment">$&</span>');
    hl = hl.replace(/(\/\/.*)/g, '<span class="hl-comment">$1</span>');
    hl = hl.replace(/(:root|@theme)/g, '<span class="hl-selector">$1</span>');
    hl = hl.replace(/(--[\w-]+)/g, '<span class="hl-prop">$1</span>');
    hl = hl.replace(/(\$[\w-]+)/g, '<span class="hl-var">$1</span>');
    hl = hl.replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="hl-hex">$1</span>');
    hl = hl.replace(/(\d+(?:\.\d+)?)(rem|px|%|em|ex|ch|vw|vh)/g, '<span class="hl-unit">$1$2</span>');
    hl = hl.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="hl-string">$1</span>');
    return ln + hl;
  }).join('\n');
  return html;
}

function updateExport() {
  var format = DS.format;
  var code = '';
  if (format === 'css') code = generateCSS();
  else if (format === 'tailwind') code = generateTailwind();
  else if (format === 'scss') code = generateSCSS();
  else if (format === 'json') code = generateJSON();

  var output = document.getElementById('dsCodeOutput');
  output.innerHTML = highlightCode(code, format);
}

/* ── DERIVED UPDATE ── */

function updateAllDerived() {
  updateTypography();
  renderPreview();
  updateExport();
}

/* ── URL SERIALIZATION ── */

function serializeState() {
  var payload = {
    p: DS.primaryHex,
    n: DS.neutralMode,
    h: DS.headingFont,
    b: DS.bodyFont,
    s: DS.baseFontSize,
    t: DS.typeScale,
    f: DS.format,
  };
  try {
    var json = JSON.stringify(payload);
    return btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, function (m, c) {
      return String.fromCharCode(parseInt(c, 16));
    }));
  } catch (e) {
    return '';
  }
}

function deserializeState(str) {
  try {
    var decoded = decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var data = JSON.parse(decoded);
    if (data.p) DS.primaryHex = data.p;
    if (data.n) DS.neutralMode = data.n;
    if (data.h) DS.headingFont = data.h;
    if (data.b) DS.bodyFont = data.b;
    if (data.s) DS.baseFontSize = data.s;
    if (data.t) DS.typeScale = data.t;
    if (data.f) DS.format = data.f;
    return true;
  } catch (e) {
    return false;
  }
}

/* ── CLICK TO COPY ── */

function setupSwatchClickCopy(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.addEventListener('click', function (e) {
    var item = e.target.closest('.ds-swatch-item');
    if (!item) return;
    var hex = item.getAttribute('data-hex') || item.style.background;
    if (!hex) return;
    if (hex.indexOf('#') === -1) {
      var temp = document.createElement('div');
      temp.style.background = hex;
      document.body.appendChild(temp);
      var cs = getComputedStyle(temp);
      hex = cs.background;
      document.body.removeChild(temp);
    }
    if (hex.indexOf('#') === -1) {
      var ctx = document.createElement('canvas');
      ctx.width = 1;
      ctx.height = 1;
      var c = ctx.getContext('2d');
      c.fillStyle = item.style.background;
      c.fillRect(0, 0, 1, 1);
      var pd = c.getImageData(0, 0, 1, 1).data;
      hex = '#' + [pd[0], pd[1], pd[2]].map(function (v) {
        return padStart(v.toString(16), 2);
      }).join('');
    }
    try {
      navigator.clipboard.writeText(hex);
    } catch (e2) {}
    item.style.transform = 'scaleY(1.5)';
    setTimeout(function () { item.style.transform = ''; }, 200);
  });
}

/* ── AUTOCOMPLETE ── */

var fontAutocompleteTimers = {};

function setupFontAutocomplete(inputId, dropdownId) {
  var input = document.getElementById(inputId);
  var dropdown = document.getElementById(dropdownId);
  input.addEventListener('input', function () {
    var val = this.value.trim();
    if (fontAutocompleteTimers[inputId]) clearTimeout(fontAutocompleteTimers[inputId]);
    if (val.length < 2) { dropdown.innerHTML = ''; dropdown.classList.remove('active'); return; }
    fontAutocompleteTimers[inputId] = setTimeout(function () {
      var q = val.toLowerCase();
      var matches = [];
      for (var i = 0; i < FALLBACK_FONTS.length; i++) {
        if (matches.length >= 10) break;
        if (FALLBACK_FONTS[i].family.toLowerCase().indexOf(q) !== -1) {
          matches.push(FALLBACK_FONTS[i]);
        }
      }
      if (matches.length === 0) { dropdown.classList.remove('active'); return; }
      dropdown.innerHTML = matches.map(function (m) {
        return '<div class="ds-font-match" data-font="' + m.family + '">' + m.family + ' <span class="ds-font-category">' + m.category + '</span></div>';
      }).join('');
      dropdown.classList.add('active');
    }, 150);
  });
  dropdown.addEventListener('click', function (e) {
    var match = e.target.closest('.ds-font-match');
    if (!match) return;
    var font = match.getAttribute('data-font');
    input.value = font;
    dropdown.innerHTML = '';
    dropdown.classList.remove('active');
    loadGoogleFont(font);
    syncStateFromDOM();
    updateAllDerived();
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#' + inputId + ', #' + dropdownId)) {
      dropdown.classList.remove('active');
    }
  });
}

function setupPills(containerId, inputId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.addEventListener('click', function (e) {
    var pill = e.target.closest('.ds-suggestion-pill');
    if (!pill) return;
    var font = pill.getAttribute('data-font');
    document.getElementById(inputId).value = font;
    loadGoogleFont(font);
    syncStateFromDOM();
    updateAllDerived();
  });
}

/* ── INIT ── */

document.addEventListener('DOMContentLoaded', function () {

  /* -- Restore state from URL -- */
  var params = window.location.search.substring(1).split('&');
  for (var pi = 0; pi < params.length; pi++) {
    var pair = params[pi].split('=');
    if (pair[0] === 'ds' && pair[1]) {
      deserializeState(decodeURIComponent(pair[1]));
    }
  }

  /* -- Sync DOM from state -- */
  document.getElementById('dsPrimaryHex').value = DS.primaryHex;
  document.getElementById('dsPrimaryColorPicker').value = DS.primaryHex;
  document.getElementById('dsNeutralMode').value = DS.neutralMode;
  document.getElementById('dsHeadingFont').value = DS.headingFont;
  document.getElementById('dsBodyFont').value = DS.bodyFont;
  document.getElementById('dsBaseFontSize').value = DS.baseFontSize;
  document.getElementById('dsTypeScale').value = DS.typeScale;

  /* -- Load initial Google Fonts -- */
  var hf = DS.headingFont.split(',')[0].replace(/['"]/g, '').trim();
  var bf = DS.bodyFont.split(',')[0].replace(/['"]/g, '').trim();
  if (hf && hf !== 'Georgia' && hf !== 'serif') loadGoogleFont(hf);
  if (bf && bf !== 'Inter' && bf !== 'sans-serif') loadGoogleFont(bf);

  /* -- Setup pills -- */
  setupPills('dsHeadingPills', 'dsHeadingFont');
  setupPills('dsBodyPills', 'dsBodyFont');

  /* -- Setup font autocomplete -- */
  setupFontAutocomplete('dsHeadingFont', 'dsHeadingDropdown');
  setupFontAutocomplete('dsBodyFont', 'dsBodyDropdown');

  /* -- Color picker interaction -- */
  document.getElementById('dsPrimarySwatch').addEventListener('click', function () {
    document.getElementById('dsPrimaryColorPicker').click();
  });

  document.getElementById('dsPrimaryColorPicker').addEventListener('input', function () {
    DS.primaryHex = this.value;
    document.getElementById('dsPrimaryHex').value = this.value;
    updateColors();
    updateAllDerived();
  });

  document.getElementById('dsPrimaryHex').addEventListener('change', function () {
    var val = this.value.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      DS.primaryHex = val.toLowerCase();
      document.getElementById('dsPrimaryColorPicker').value = DS.primaryHex;
      updateColors();
      updateAllDerived();
    } else {
      this.value = DS.primaryHex;
    }
  });

  /* -- Neutral mode -- */
  document.getElementById('dsNeutralMode').addEventListener('change', function () {
    DS.neutralMode = this.value;
    updateColors();
    updateAllDerived();
  });

  /* -- Typography inputs -- */
  document.getElementById('dsHeadingFont').addEventListener('change', function () {
    syncStateFromDOM();
    if (this.value.indexOf(',') === -1 && this.value.trim()) {
      loadGoogleFont(this.value.trim());
    }
    updateAllDerived();
  });

  document.getElementById('dsBodyFont').addEventListener('change', function () {
    syncStateFromDOM();
    if (this.value.indexOf(',') === -1 && this.value.trim()) {
      loadGoogleFont(this.value.trim());
    }
    updateAllDerived();
  });

  document.getElementById('dsBaseFontSize').addEventListener('change', function () {
    var val = parseInt(this.value, 10);
    if (val >= 12 && val <= 24) {
      DS.baseFontSize = val;
      updateAllDerived();
    } else {
      this.value = DS.baseFontSize;
    }
  });

  document.getElementById('dsTypeScale').addEventListener('change', function () {
    DS.typeScale = this.value;
    updateAllDerived();
  });

  /* -- Format toggle -- */
  var formatBtns = toArray(document.querySelectorAll('.ds-format-btn'));
  formatBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      formatBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      DS.format = this.getAttribute('data-format');
      updateExport();
    });
  });

  /* -- Swatch click to copy -- */
  setupSwatchClickCopy('dsScaleRow');
  setupSwatchClickCopy('dsNeutralRow');

  /* -- Copy button -- */
  document.getElementById('dsCopyBtn').addEventListener('click', function () {
    var output = document.getElementById('dsCodeOutput');
    var text = output.textContent || output.innerText;
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    var btn = this;
    var orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-regular fa-check"></i> Copied!';
    setTimeout(function () { btn.innerHTML = orig; }, 1500);
  });

  /* -- Download button -- */
  document.getElementById('dsDownloadBtn').addEventListener('click', function () {
    var output = document.getElementById('dsCodeOutput');
    var text = output.textContent || output.innerText;
    var extMap = { css: 'css', tailwind: 'css', scss: 'scss', json: 'json' };
    var ext = extMap[DS.format] || 'css';
    var blob = new Blob([text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'design-tokens.' + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  /* -- Share button -- */
  document.getElementById('dsShareBtn').addEventListener('click', function () {
    var state = serializeState();
    var url = window.location.origin + window.location.pathname + '?ds=' + encodeURIComponent(state);
    try {
      navigator.clipboard.writeText(url);
    } catch (e) {}
    var btn = this;
    var orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-regular fa-check"></i> Copied!';
    setTimeout(function () { btn.innerHTML = orig; }, 1500);
  });

  /* -- Initial render -- */
  updateColors();
  updateAllDerived();

});
