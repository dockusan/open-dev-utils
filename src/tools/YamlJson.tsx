import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";
import yaml from "js-yaml";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function YamlJson({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"y2j" | "j2y">("y2j");

  const convert = useCallback((val: string, m: "y2j" | "j2y") => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      if (m === "y2j") {
        const obj = yaml.load(val);
        setOutput(JSON.stringify(obj, null, 2));
      } else {
        const obj = JSON.parse(val);
        setOutput(yaml.dump(obj));
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
            <option value="y2j">YAML to JSON</option>
            <option value="j2y">JSON to YAML</option>
          </select>
        }
        leftPanel={
          <Textarea
            placeholder={mode === "y2j" ? "Paste YAML here..." : "Paste JSON here..."}
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
