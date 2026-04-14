import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function HexAscii({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("48 65 6c 6c 6f");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"h2a" | "a2h">("h2a");

  const convert = useCallback((val: string, m: "h2a" | "a2h") => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      if (m === "h2a") {
        const hex = val.replace(/\s/g, "");
        let ascii = "";
        for (let i = 0; i < hex.length; i += 2) {
          ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        setOutput(ascii);
      } else {
        const ascii = val;
        let hex = "";
        for (let i = 0; i < ascii.length; i++) {
          const charCode = ascii.charCodeAt(i).toString(16).padStart(2, "0");
          hex += charCode + " ";
        }
        setOutput(hex.trim());
      }
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    convert(input, mode);
  }, [input, mode, convert]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle={
          <select 
            className="bg-transparent font-semibold outline-none border-none focus:ring-0 cursor-pointer"
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
          >
            <option value="h2a">Hex to ASCII</option>
            <option value="a2h">ASCII to Hex</option>
          </select>
        }
        leftPanel={
          <Textarea
            placeholder="Paste here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
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
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith("Error")} />}
      />
    </div>
  );
}
