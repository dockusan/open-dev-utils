import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";
import { format } from "sql-formatter";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function SqlFormatter({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = useCallback((val: string) => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      const formatted = format(val, {
        language: "sql",
        tabWidth: 2,
        keywordCase: "upper",
      });
      setOutput(formatted);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    handleFormat(input);
  }, [input, handleFormat]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftPanel={
          <Textarea
            placeholder="Paste SQL query here..."
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
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith("Error:")} />}
      />
    </div>
  );
}
