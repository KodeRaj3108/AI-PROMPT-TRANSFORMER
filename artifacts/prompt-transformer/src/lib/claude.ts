export async function callClaudeForTransformation(roughInput: string, apiKey: string) {
  let res: Response;
  try {
    res = await fetch("/api/transform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roughInput, apiKey }),
    });
  } catch (err) {
    throw new Error("Failed to reach the server. Please check your connection and try again.");
  }

  const data = await res.json() as { error?: string; chatgpt?: string; claude?: string; gemini?: string; grok?: string; cursor?: string };

  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (status ${res.status}). Please try again.`);
  }

  const required = ["chatgpt", "claude", "gemini", "grok", "cursor"] as const;
  for (const key of required) {
    if (typeof data[key] !== "string" || !data[key]!.trim()) {
      throw new Error(`Response was missing the "${key}" output. Please try again.`);
    }
  }

  return data as Record<typeof required[number], string>;
}
