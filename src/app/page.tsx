"use client";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState<Record<string, string>>({
      "theme": "Haunted Mansion",
      "difficulty": "Beginner",
      "playerCount": "2 players",
      "timeLimit": "30 minutes",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        theme: formData["theme"],
        difficulty: formData["difficulty"],
        playerCount: formData["playerCount"],
        timeLimit: formData["timeLimit"],
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setResult(data.result);
    } catch { setError("Failed to generate content."); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-950 via-slate-900 to-orange-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
            🔐 AI Escape Room Designer
          </h1>
          <p className="text-slate-400">Create immersive escape room experiences</p>
        </header>

        <form onSubmit={handleGenerate} className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 mb-8 border border-orange-500/20 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-orange-300 mb-2">Theme</label>
              <select value={formData["theme"]} onChange={e => setFormData({...formData, "theme": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                {Array.from({length: 8}).map((_, i) => <option key={i}>{["Haunted Mansion", "Bank Heist", "Spy Agency", "Space Station", "Haunted Hospital", "Egyptian Tomb", "Mad Scientist Lab", "Pirate Ship"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-300 mb-2">Difficulty</label>
              <select value={formData["difficulty"]} onChange={e => setFormData({...formData, "difficulty": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                {Array.from({length: 4}).map((_, i) => <option key={i}>{["Beginner", "Intermediate", "Advanced", "Expert"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-300 mb-2">Player Count</label>
              <select value={formData["playerCount"]} onChange={e => setFormData({...formData, "playerCount": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                {Array.from({length: 4}).map((_, i) => <option key={i}>{["2 players", "3-4 players", "5-6 players", "7-8 players"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-300 mb-2">Time Limit</label>
              <select value={formData["timeLimit"]} onChange={e => setFormData({...formData, "timeLimit": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                {Array.from({length: 5}).map((_, i) => <option key={i}>{["30 minutes", "45 minutes", "60 minutes", "75 minutes", "90 minutes"]}[i]</option>)}
              </select>
            </div>          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-xl font-semibold text-white transition-all disabled:opacity-50">
            {loading ? "Generating..." : "🔐 Generate"}
          </button>
        </form>

        {error && <div className="bg-red-900/40 border border-red-500/40 rounded-xl p-4 text-red-300 mb-6">{error}</div>}

        {result && (
          <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 border border-orange-500/20">
            <h2 className="text-xl font-bold text-orange-300 mb-4">Generated Content</h2>
            <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}
