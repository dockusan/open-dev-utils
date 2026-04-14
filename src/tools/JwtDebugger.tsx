import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function JwtDebugger({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const decode = useCallback((token: string) => {
    if (!token) {
      setOutput("");
      return;
    }
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format (expected 3 parts)");

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      setOutput(JSON.stringify({ header, payload }, null, 2));
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    decode(input);
  }, [input, decode]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="Encoded JWT"
        leftPanel={
          <Textarea
            placeholder="Paste JWT token here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="Decoded Payload"
        rightPanel={
          <Textarea
            readOnly
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={output}
          />
        }
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith("Error")} />}
      />
    </div>
  );
}
