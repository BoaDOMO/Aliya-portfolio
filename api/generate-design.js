import { GoogleGenerativeAI } from "@google/generative-ai";

const THEMES = [
  {
    keywords: ["fintech", "bank", "finance", "trust", "money", "secure", "banking", "financial"],
    primaryColor: "#185FA5",
    headingFont: "Inter",
    bodyFont: "system-ui",
    rationale: {
      primaryColor: "A trustworthy blue that conveys stability and security — a classic choice for financial services.",
      headingFont: "Clean, modern sans-serif that feels precise and professional at any weight.",
      bodyFont: "System-native UI font for fast rendering and excellent readability across devices.",
    },
  },
  {
    keywords: ["health", "wellness", "organic", "nature", "medical", "healthcare", "natural", "green"],
    primaryColor: "#2D6A4F",
    headingFont: "Lora",
    bodyFont: "Nunito",
    rationale: {
      primaryColor: "A grounded forest green that evokes health, growth, and natural trust.",
      headingFont: "Elegant serif with a warm, humanist feel — approachable yet credible for health content.",
      bodyFont: "Rounded, friendly sans-serif that feels soft and welcoming.",
    },
  },
  {
    keywords: ["creative", "art", "design", "agency", "studio", "portfolio", "creative agency"],
    primaryColor: "#7C3AED",
    headingFont: "Playfair Display",
    bodyFont: "DM Sans",
    rationale: {
      primaryColor: "A bold, expressive purple that signals creativity and originality.",
      headingFont: "Dramatic high-contrast serif that makes a strong visual statement for headings.",
      bodyFont: "Geometric sans-serif with a clean, modern line weight that pairs well with display serifs.",
    },
  },
  {
    keywords: ["luxury", "premium", "elegant", "exclusive", "high-end", "fashion", "boutique"],
    primaryColor: "#1A1A2E",
    headingFont: "Playfair Display",
    bodyFont: "Cormorant Garamond",
    rationale: {
      primaryColor: "Deep midnight navy — understated, sophisticated, and undeniably premium.",
      headingFont: "Classic serif with timeless elegance, perfect for luxury branding.",
      bodyFont: "Refined, lightweight serif that reads beautifully at text sizes while maintaining an air of exclusivity.",
    },
  },
  {
    keywords: ["startup", "modern", "innovative", "tech", "saas", "software", "digital"],
    primaryColor: "#F97316",
    headingFont: "Inter",
    bodyFont: "Source Sans 3",
    rationale: {
      primaryColor: "Vibrant orange — energetic, confident, and impossible to ignore. A modern tech palette starter.",
      headingFont: "Neutral, highly legible sans-serif that works across all interfaces and scales.",
      bodyFont: "Designed for UIs, with excellent readability and a slightly warmer feel than pure grotesque.",
    },
  },
  {
    keywords: ["playful", "youth", "fun", "casual", "social", "entertainment", "game", "gaming"],
    primaryColor: "#EC4899",
    headingFont: "Fredoka",
    bodyFont: "Nunito",
    rationale: {
      primaryColor: "Energetic pink with broad appeal — youthful without being childish.",
      headingFont: "Rounded, friendly sans-serif with a playful bounce that feels approachable.",
      bodyFont: "Soft, rounded letterforms that maintain readability while matching the friendly tone.",
    },
  },
  {
    keywords: ["corporate", "professional", "enterprise", "business", "b2b", "consulting", "legal"],
    primaryColor: "#1E3A5F",
    headingFont: "Merriweather",
    bodyFont: "Inter",
    rationale: {
      primaryColor: "Authoritative dark blue that commands respect and communicates institutional trust.",
      headingFont: "A robust serif with strong character — conveys seriousness and editorial quality.",
      bodyFont: "Professional, space-efficient sans-serif that works great for dense corporate interfaces.",
    },
  },
  {
    keywords: ["earthy", "rustic", "artisan", "craft", "farm", "food", "beverage", "handmade"],
    primaryColor: "#5C7A47",
    headingFont: "Lora",
    bodyFont: "Source Sans 3",
    rationale: {
      primaryColor: "A warm, natural olive green that feels rooted in the earth and authentic craftsmanship.",
      headingFont: "Warm serif with a handcrafted feel — pairs naturally with organic and artisanal brands.",
      bodyFont: "Straightforward, honest sans-serif that keeps body text clean and readable.",
    },
  },
];

function keywordFallback(description) {
  const desc = (description || "").toLowerCase();
  const words = desc.split(/\W+/);
  let best = { theme: null, score: -1 };

  for (const theme of THEMES) {
    let score = 0;
    for (const kw of theme.keywords) {
      for (const word of words) {
        if (word.length < 3) continue;
        if (word === kw || word.indexOf(kw) !== -1 || kw.indexOf(word) !== -1) {
          score++;
        }
      }
    }
    if (score > best.score) {
      best = { theme, score };
    }
  }

  if (!best.theme) {
    best.theme = {
      primaryColor: "#26428b",
      headingFont: "Georgia",
      bodyFont: "Inter",
      rationale: {
        primaryColor: "A classic, versatile navy blue that works across a wide range of brands.",
        headingFont: "Timeless serif that adds a touch of editorial sophistication.",
        bodyFont: "Clean, readable sans-serif that pairs well with most heading fonts.",
      },
    };
  }

  return {
    primaryColor: best.theme.primaryColor,
    headingFont: best.theme.headingFont,
    bodyFont: best.theme.bodyFont,
    rationale: best.theme.rationale,
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { description } = req.body;
  if (!description) return res.status(400).json({ error: "Missing description" });

  const prompt = `You are a design system consultant. Based on this brand description, suggest a cohesive design system.

Return ONLY valid JSON (no markdown, no code fences):
{
  "primaryColor": "#hex",
  "headingFont": "font name",
  "bodyFont": "font name",
  "rationale": {
    "primaryColor": "short explanation",
    "headingFont": "short explanation",
    "bodyFont": "short explanation"
  }
}

Rules:
- primaryColor: a specific hex #RRGGBB that fits the brand personality
- headingFont: pick from Georgia, Playfair Display, Oswald, Inter, Source Serif Pro, DM Serif Display, Lora, Merriweather
- bodyFont: pick from Inter, Source Sans Pro, Nunito, DM Sans, system-ui, monospace
- Be specific about why each choice suits the brand

Brand description: ${description}`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json?/g, "").replace(/```/g, "").trim();
    const suggestion = JSON.parse(text);
    return res.status(200).json(suggestion);
  } catch (err) {
    console.error("Gemini API error, falling back to keyword matching:", err.message);
    const fallback = keywordFallback(description);
    return res.status(200).json({ ...fallback, _fallback: true });
  }
}
