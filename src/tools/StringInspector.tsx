import { useState, useCallback, useEffect } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function StringInspector({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("Hello DevUtils! This is a test string.");
  const [stats, setStats] = useState({
    chars: 0,
    words: 0,
    lines: 0,
    bytes: 0
  });

  const analyze = useCallback((val: string) => {
    if (!val) {
      setStats({ chars: 0, words: 0, lines: 0, bytes: 0 });
      return;
    }
    setStats({
      chars: val.length,
      words: val.trim().split(/\s+/).filter(w => w).length,
      lines: val.split("\n").length,
      bytes: new TextEncoder().encode(val).length
    });
  }, []);

  useEffect(() => {
    analyze(input);
  }, [input, analyze]);

  return (
    <div id={toolId} className="mx-auto flex h-full max-w-4xl flex-col gap-8">
      <div className="space-y-4">
        <Label>Input Text</Label>
        <Textarea 
          placeholder="Paste text to analyze..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-48 font-mono"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="surface-low flex flex-col items-center rounded-sm border border-white/10 p-6">
          <div className="text-3xl font-bold mb-1">{stats.chars}</div>
          <div className="text-xs font-semibold uppercase text-[rgb(193,198,215)]/70">Characters</div>
        </div>
        <div className="surface-low flex flex-col items-center rounded-sm border border-white/10 p-6">
          <div className="text-3xl font-bold mb-1">{stats.words}</div>
          <div className="text-xs font-semibold uppercase text-[rgb(193,198,215)]/70">Words</div>
        </div>
        <div className="surface-low flex flex-col items-center rounded-sm border border-white/10 p-6">
          <div className="text-3xl font-bold mb-1">{stats.lines}</div>
          <div className="text-xs font-semibold uppercase text-[rgb(193,198,215)]/70">Lines</div>
        </div>
        <div className="surface-low flex flex-col items-center rounded-sm border border-white/10 p-6">
          <div className="text-3xl font-bold mb-1">{stats.bytes}</div>
          <div className="text-xs font-semibold uppercase text-[rgb(193,198,215)]/70">Bytes</div>
        </div>
      </div>
    </div>
  );
}
