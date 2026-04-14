import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function ErbBeautifier({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = useCallback((val: string) => {
    if (!val) {
      setOutput("");
      return;
    }
    // Minimal heuristic indent for ERB
    try {
      let indent = 0;
      const lines = val.split("\n");
      const formatted = lines.map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        
        let currentIndent = indent;
        if (trimmed.match(/(?:^|\s)(?:end|else|elsif|when|rescue|ensure)(?:\s|$)/) || trimmed.match(/^<\//)) {
          currentIndent = Math.max(0, indent - 1);
        }
        
        if (trimmed.match(/(?:^|\s)(?:if|unless|else|elsif|while|until|for|begin|def|class|module|do)(?:\s|$)/) || (trimmed.match(/^<\w/) && !trimmed.match(/\/?>$/))) {
          indent++;
        }
        
        if (trimmed.match(/(?:^|\s)end(?:\s|$)/) || trimmed.match(/^<\//)) {
          indent = Math.max(0, indent - 1);
        }

        return "  ".repeat(currentIndent) + trimmed;
      }).join("\n");
      setOutput(formatted);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    format(input);
  }, [input, format]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftPanel={
          <Textarea
            placeholder="Paste ERB template here..."
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
