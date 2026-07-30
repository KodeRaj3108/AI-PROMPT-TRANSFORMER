import { Router } from "express";

const router = Router();

const SYSTEM_PROMPT = `You are a prompt engineering specialist. You will be given a single rough, unstructured prompt from a user. Your job is to rewrite it into 5 distinct, optimized versions — one tailored for each of these AI systems, each following that system's specific design conventions:

1. chatgpt: Clear step-by-step formatting, an explicit system-role definition line, and markdown structure (headers, numbered lists).
2. claude: Use XML tags to isolate variables, e.g. <context>, <instructions>, <input> — structurally clear, and leave room for deep step-by-step reasoning.
3. gemini: Organize with logical headings, give explicit formatting instructions, keep it token-efficient and tightly constrained.
4. grok: Direct, no-nonsense, high-impact brevity, and include real-time context scaffolding (phrase it assuming access to current/live information where relevant).
5. cursor: Precise code-context generation — reference file/folder structure where relevant, specify language/framework, and phrase it like a .cursorrules-style system directive.

Rewrite the user's underlying intent faithfully — do not add requirements they didn't imply. Keep each of the 5 outputs compact (roughly 3-7 lines / under 90 words each) since output length is limited, while still clearly reflecting that model's distinct conventions.

Respond with ONLY a raw JSON object, no markdown code fences, no preamble, no commentary, in exactly this shape:
{"chatgpt": "...", "claude": "...", "gemini": "...", "grok": "...", "cursor": "..."}`;

router.post("/transform", async (req, res) => {
  const { roughInput, apiKey } = req.body as { roughInput?: string; apiKey?: string };

  if (!roughInput || !apiKey) {
    res.status(400).json({ error: "roughInput and apiKey are required" });
    return;
  }

  let anthropicRes: Response;
  try {
    anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Rough prompt to transform:\n\n${roughInput}` }],
      }),
    });
  } catch (err) {
    res.status(502).json({ error: "Could not reach Anthropic API. Check your network connection." });
    return;
  }

  if (!anthropicRes.ok) {
    let errorMsg = `Request failed (status ${anthropicRes.status}).`;
    try {
      const errData = await anthropicRes.json() as { error?: { message?: string } };
      if (errData.error?.message) errorMsg = errData.error.message;
    } catch (_) { /* ignore */ }
    res.status(anthropicRes.status).json({ error: errorMsg });
    return;
  }

  const data = await anthropicRes.json() as { content?: Array<{ type: string; text: string }> };
  const rawText = (data.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  if (!rawText) {
    res.status(502).json({ error: "The API returned an empty response. Please try again." });
    return;
  }

  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  let parsed: Record<string, string>;
  try {
    parsed = JSON.parse(cleaned);
  } catch (_) {
    res.status(502).json({ error: "Could not parse a structured response. Please try again." });
    return;
  }

  for (const key of ["chatgpt", "claude", "gemini", "grok", "cursor"]) {
    if (typeof parsed[key] !== "string" || !parsed[key].trim()) {
      res.status(502).json({ error: `Response was missing the "${key}" output. Please try again.` });
      return;
    }
  }

  res.json(parsed);
});

export default router;
