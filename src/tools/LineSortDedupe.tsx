import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function LineSortDedupe({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const process = useCallback((val: string) => {
    if (!val) {
      setOutput("");
      return;
    }
    const lines = val.split("\n").filter((l) => l.trim() !== "");
    const unique = Array.from(new Set(lines));
    const sorted = unique.sort((a, b) => a.localeCompare(b));
    setOutput(sorted.join("\n"));
  }, []);

  useEffect(() => {
    process(input);
  }, [input, process]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftPanel={
          <Textarea
            placeholder="Paste lines of text here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightPanel={
          <Textarea
            readOnly
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={output}
          />
        }
        rightActions={<CopyButton value={output} disabled={!output} />}
      />
    </div>
  );
}
