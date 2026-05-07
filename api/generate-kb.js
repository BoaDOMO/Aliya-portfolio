const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt field" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const systemPrompt = `You are a knowledge base generator. Based on the user's description of a business, generate a structured response in valid JSON format.

The JSON must have exactly this structure:
{
  "persona": {
    "company": "Company Name",
    "role": "AI Assistant Title (e.g. Customer Service Assistant)",
    "instructions": "Detailed system instructions for the AI assistant. Include instructions to answer based only on the knowledge base, be concise and friendly, and not make up information."
  },
  "kb": {
    "about": "1-2 paragraphs about the company — founding, location, mission, size, key facts",
    "products": "Detailed list of products/services with pricing, features, and terms. Use bullet-style format with | separators.",
    "faq": "6-8 Q&A pairs covering application process, requirements, timelines, support, policies. Format each as Q: ... A: ...",
    "policies": "Key policies including eligibility, data privacy, security, and terms. 3-4 detailed paragraphs."
  }
}

Make the content realistic, detailed, and specific to the business described. Use realistic names, prices, and locations. Do NOT use placeholder values like "XXX" or "123 Main St".

IMPORTANT: Return ONLY valid JSON. No markdown code blocks, no explanation, just the raw JSON object.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let jsonStr = text.trim();

    // Strip markdown code fences if present
    if (jsonStr.startsWith("```")) {
      const lines = jsonStr.split("\n");
      if (lines[0].startsWith("```")) lines.shift();
      if (lines[lines.length - 1].startsWith("```")) lines.pop();
      jsonStr = lines.join("\n");
    }

    const data = JSON.parse(jsonStr);

    if (!data.persona || !data.kb) {
      throw new Error("Invalid response structure from AI");
    }

    console.log(`[${new Date().toISOString()}] generate-kb | prompt: ${prompt.substring(0, 80)}...`);

    return res.status(200).json(data);
  } catch (err) {
    console.error("generate-kb error:", err);
    return res.status(500).json({ error: err.message || "Failed to generate knowledge base." });
  }
};
