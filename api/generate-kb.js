import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { companyName } = req.body;
  if (!companyName || !companyName.trim()) {
    return res.status(400).json({ error: "Company name is required" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a knowledge base generator. Generate a complete knowledge base for a company called "${companyName}".

Return ONLY valid JSON with exactly these fields (no markdown, no code fences):
{
  "company": "${companyName}",
  "role": "<company> AI Assistant",
  "instructions": "You are a helpful AI customer service assistant for ${companyName}. Answer questions based ONLY on the knowledge base provided. Be concise, friendly, and accurate. Do not make up information.",
  "about": "<2-3 sentence company description>",
  "products": "<3-4 products/services with bullet-point format, each including price range and key features>",
  "faq": "<4-6 Q&A pairs in format Q: ...\\nA: ...\\n\\n separated>",
  "policies": "<company policies including eligibility, data privacy, and terms>"
}

Make the content realistic and detailed. Each text field should be substantial (2-4 paragraphs where applicable). The company is: ${companyName}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\s*/i, "").replace(/```\s*$/, "").trim();
    const kb = JSON.parse(cleaned);

    return res.status(200).json(kb);
  } catch (err) {
    console.error("Generate KB error:", err);
    return res.status(500).json({ error: err.message || "Failed to generate knowledge base" });
  }
}
