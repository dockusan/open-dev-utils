import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function HtmlEntityEncoder({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = useCallback((val: string, m: "encode" | "decode") => {
    if (!val) {
      setOutput("");
      return;
    }
    if (m === "encode") {
      setOutput(val.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`));
    } else {
      const doc = new DOMParser().parseFromString(val, "text/html");
      setOutput(doc.documentElement.textContent || "");
    }
  }, []);

  useEffect(() => {
    process(input, mode);
  }, [input, mode, process]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle={
          <select 
            className="bg-transparent font-semibold outline-none border-none focus:ring-0 cursor-pointer"
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
          >
            <option value="encode">Encode Entities</option>
            <option value="decode">Decode Entities</option>
          </select>
        }
        leftPanel={
          <Textarea
            placeholder="Enter text..."
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
