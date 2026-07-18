export async function callClaudeForTransformation(roughInput: string, apiKey: string) {
  const systemPrompt = `You are a prompt engineering specialist. You will be given a single rough, unstructured prompt from a user. Your job is to rewrite it into 5 distinct, optimized versions — one tailored for each of these AI systems, each following that system's specific design conventions:

1. chatgpt: Clear step-by-step formatting, an explicit system-role definition line, and markdown structure (headers, numbered lists).
2. claude: Use XML tags to isolate variables, e.g. <context>, <instructions>, <input> — structurally clear, and leave room for deep step-by-step reasoning.
3. gemini: Organize with logical headings, give explicit formatting instructions, keep it token-efficient and tightly constrained.
4. grok: Direct, no-nonsense, high-impact brevity, and include real-time context scaffolding (phrase it assuming access to current/live information where relevant).
5. cursor: Precise code-context generation — reference file/folder structure where relevant, specify language/framework, and phrase it like a .cursorrules-style system directive.

Rewrite the user's underlying intent faithfully — do not add requirements they didn't imply. Keep each of the 5 outputs compact (roughly 3-7 lines / under 90 words each) since output length is limited, while still clearly reflecting that model's distinct conventions.

Respond with ONLY a raw JSON object, no markdown code fences, no preamble, no commentary, in exactly this shape:
{"chatgpt": "...", "claude": "...", "gemini": "...", "grok": "...", "cursor": "..."}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-allow-browser": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        { role: "user", content: `Rough prompt to transform:\n\n${roughInput}` }
      ],
    })
  });

  if (!response.ok) {
    let errorMsg = `Request failed (status ${response.status}). Please try again.`;
    try {
      const errData = await response.json();
      if (errData.error?.message) {
        errorMsg = `API Error: ${errData.error.message}`;
      }
    } catch(e) {}
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const textBlocks = (data.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text);
  const rawText = textBlocks.join('\n').trim();

  if (!rawText) {
    throw new Error('The engine returned an empty response. Please try again.');
  }

  const cleaned = rawText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error('Could not parse a structured response from the engine. Please try again.');
  }

  const required = ['chatgpt', 'claude', 'gemini', 'grok', 'cursor'];
  for (const key of required) {
    if (typeof parsed[key] !== 'string' || !parsed[key].trim()) {
      throw new Error(`The response was missing the "${key}" output. Please try again.`);
    }
  }

  return parsed;
}
