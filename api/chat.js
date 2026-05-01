const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { question, knowledgeBase, history = [], sessionId, companyName } = req.body;

  if (!question || !knowledgeBase) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const systemPrompt = `You are a helpful AI customer service assistant for ${companyName || "the company"}.

Answer questions based ONLY on the knowledge base provided below. Be concise, friendly, and accurate. Use plain text — no markdown formatting like ** or ## in your responses.

If the answer is not found in the knowledge base, say: "I don't have that information in my knowledge base. Please contact our support team directly."

Do not make up information. Do not answer questions unrelated to the company.

KNOWLEDGE BASE:
${knowledgeBase}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
    });

    // Google uses "model" instead of "assistant" for AI role
    const chatHistory = history.slice(-10).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(question);
    const answer = result.response.text();

    // Log to Google Sheet — fire and forget
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          sessionId: sessionId || "unknown",
          companyName: companyName || "unknown",
          question,
          answer,
        }),
      }).catch(() => {});
    }

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
