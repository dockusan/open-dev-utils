import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";
import Papa from "papaparse";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function JsonCsv({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"j2c" | "c2j">("j2c");

  const convert = useCallback((val: string, m: "j2c" | "c2j") => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      if (m === "j2c") {
        const obj = JSON.parse(val);
        setOutput(Papa.unparse(obj));
      } else {
        const results = Papa.parse(val, { header: true, skipEmptyLines: true });
        setOutput(JSON.stringify(results.data, null, 2));
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
            <option value="j2c">JSON to CSV</option>
            <option value="c2j">CSV to JSON</option>
          </select>
        }
        leftPanel={
          <Textarea
            placeholder={mode === "j2c" ? "Paste JSON array here..." : "Paste CSV here..."}
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
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith("Error:")} />}
      />
    </div>
  );
}
