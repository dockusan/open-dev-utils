import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function PhpSerializer({ toolId }: { toolId: string }) {
  const [input, setInput] = useState('a:2:{s:2:"id";i:1;s:4:"name";s:8:"DevUtils";}');
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"ser2j" | "j2ser">("ser2j");

  const convert = useCallback((val: string, m: "ser2j" | "j2ser") => {
    if (!val) {
      setOutput("");
      return;
    }
    // High-level PHP serialization logic
    // Implementation of a full PHP unserializer in JS is out of scope for a quick demo,
    // so we use a simplified version or note constraints.
    try {
      if (m === "ser2j") {
        setOutput("Deserialization logic simulated: Use a library for production.");
      } else {
        const obj = JSON.parse(val);
        const serialize = (o: any): string => {
          if (typeof o === "string") return `s:${o.length}:"${o}";`;
          if (typeof o === "number") return `i:${o};`;
          if (typeof o === "boolean") return `b:${o ? 1 : 0};`;
          if (o === null) return "N;";
          if (Array.isArray(o)) {
            const items = o.map((v, i) => serialize(i) + serialize(v)).join("");
            return `a:${o.length}:{${items}}`;
          }
          if (typeof o === "object") {
            const entries = Object.entries(o);
            const items = entries.map(([k, v]) => serialize(k) + serialize(v)).join("");
            return `a:${entries.length}:{${items}}`;
          }
          return "N;";
        };
        setOutput(serialize(obj));
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
            <option value="ser2j">PHP Serialized to JSON</option>
            <option value="j2ser">JSON to PHP Serialized</option>
          </select>
        }
        leftPanel={
          <Textarea
            placeholder="Paste code here..."
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
        rightActions={<CopyButton value={output} disabled={!output} />}
      />
    </div>
  );
}
