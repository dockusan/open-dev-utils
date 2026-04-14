import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";
import * as prettier from "prettier";
import * as parserBabel from "prettier/plugins/babel";
import * as parserEstree from "prettier/plugins/estree";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function JsBeautifier({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = useCallback(async (val: string) => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      const formatted = await prettier.format(val, {
        parser: "babel",
        plugins: [parserBabel, parserEstree],
      });
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
            placeholder="Paste JavaScript/TypeScript here..."
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
