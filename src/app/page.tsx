"use client";

import { useState } from "react";

type FormData = {
  theme: "Heist",
  difficulty: "Beginner",
  playerCount: "2-4",
  roomSetting: "Single Room",
  timeLimit: "30 minutes",
  narrativeDepth: "Light (puzzle-focused)"
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
  theme: "Heist",
  difficulty: "Beginner",
  playerCount: "2-4",
  roomSetting: "Single Room",
  timeLimit: "30 minutes",
  narrativeDepth: "Light (puzzle-focused)"
});
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, systemPrompt: "Generate a complete escape room design including: full room narrative and setting description, puzzle sequence (6-12 puzzles), puzzle-to-puzzle connections and flow, hint system design, red herring placement, set dressing and prop description, difficulty calibration notes, common stuck points and escape routes, and optional finale puzzle." }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data.result || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className={"text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"}>
            "AI Escape Room Scenario & Puzzle Chain Designer"
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">Fill in the options below and generate your game content instantly.</p>
        </header>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="space-y-4">
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Room Theme</label><select name="theme" value={formData.theme} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-zinc-200">{['Heist','Supernatural','Mystery','Espionage','Horror','Adventure','Sci-Fi'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Difficulty</label><select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-zinc-200">{['Beginner','Experienced','Expert'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Player Count Range</label><select name="playerCount" value={formData.playerCount} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-zinc-200">{['2-4','4-6','6-8','8-12'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Room Setting</label><select name="roomSetting" value={formData.roomSetting} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-zinc-200">{['Single Room','Multi-Room (2-3 connected)','Multi-Room (4+)'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Time Limit</label><select name="timeLimit" value={formData.timeLimit} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-zinc-200">{['30 minutes','60 minutes','90 minutes'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Narrative Depth</label><select name="narrativeDepth" value={formData.narrativeDepth} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-zinc-200">{['Light (puzzle-focused)','Medium','Deep (story-rich)'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className={"w-full bg-orange-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"}
              >
                {isGenerating ? "Generating..." : "Generate Content"}
              </button>
              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 rounded-lg p-2">{error}</p>
              )}
            </form>
          </div>

          <div className="lg:col-span-3">
            {result ? (
              <div className={"bg-orange-500/10 border border-zinc-800 rounded-2xl p-5"}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={"font-semibold text-orange-400"}>Generated Result</h2>
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded bg-zinc-800"
                  >
                    Copy
                  </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-2xl p-12 min-h-96">
                <span className="text-4xl mb-4">&#127918;</span>
                <p className="text-center text-sm">Your generated game content will appear here.</p>
                <p className="text-center text-xs text-zinc-700 mt-2">Fill out the form and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
