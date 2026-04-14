import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function JsonToCode({ toolId }: { toolId: string }) {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "DevUtils",\n  "active": true,\n  "tags": ["utility", "developer"]\n}');
  const [output, setOutput] = useState("");

  const convert = useCallback((json: string) => {
    if (!json) {
      setOutput("");
      return;
    }
    try {
      const obj = JSON.parse(json);
      let interfaceStr = "interface GeneratedInterface {\n";
      for (const [key, value] of Object.entries(obj)) {
        let typeVal: string = typeof value;
        if (Array.isArray(value)) {
          typeVal = `${typeof value[0]}[]`;
        } else if (value === null) {
          typeVal = "any";
        }
        interfaceStr += `  ${key}: ${typeVal};\n`;
      }
      interfaceStr += "}";
      setOutput(interfaceStr);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    convert(input);
  }, [input, convert]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="JSON Object"
        leftPanel={
          <Textarea
            placeholder="Paste JSON here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="TypeScript Interface"
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
