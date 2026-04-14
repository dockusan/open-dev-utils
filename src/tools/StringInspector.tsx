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
    <div id={toolId} className="h-full p-8 flex flex-col gap-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">String Inspector</h2>
      
      <div className="space-y-4">
        <Label>Input Text</Label>
        <Textarea 
          placeholder="Paste text to analyze..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-48 font-mono"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t">
        <div className="p-6 bg-muted/20 rounded-sm border flex flex-col items-center">
          <div className="text-3xl font-bold mb-1">{stats.chars}</div>
          <div className="text-xs text-muted-foreground uppercase font-semibold">Characters</div>
        </div>
        <div className="p-6 bg-muted/20 rounded-sm border flex flex-col items-center">
          <div className="text-3xl font-bold mb-1">{stats.words}</div>
          <div className="text-xs text-muted-foreground uppercase font-semibold">Words</div>
        </div>
        <div className="p-6 bg-muted/20 rounded-sm border flex flex-col items-center">
          <div className="text-3xl font-bold mb-1">{stats.lines}</div>
          <div className="text-xs text-muted-foreground uppercase font-semibold">Lines</div>
        </div>
        <div className="p-6 bg-muted/20 rounded-sm border flex flex-col items-center">
          <div className="text-3xl font-bold mb-1">{stats.bytes}</div>
          <div className="text-xs text-muted-foreground uppercase font-semibold">Bytes</div>
        </div>
      </div>
    </div>
  );
}
