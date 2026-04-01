import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { theme, difficulty, playerCount, timeLimit } = await req.json();
    const prompt = `You are an escape room designer. Create a complete escape room experience:
- **Theme:** ${theme}
- **Difficulty:** ${difficulty}
- **Player Count:** ${playerCount}
- **Time Limit:** ${timeLimit} minutes

Provide: 1) Room Backstory, 2) Overall Puzzle Arc & Flow, 3) Individual Station/Zone Designs (at least 5), 4) Each puzzle's mechanic, clue chain, and solution, 5) Red herrings, 6) Set dressing ideas, 7) GM running notes.`;
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-chat", messages: [
        { role: "system", content: "You are a professional escape room designer and puzzle architect." },
        { role: "user", content: prompt }
      ], temperature: 0.9, max_tokens: 2000 }),
    });
    if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
    const data = await response.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No response." });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
