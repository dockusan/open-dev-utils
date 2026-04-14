import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function PhpJson({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("Array\n(\n    [id] => 1\n    [name] => \"DevUtils\"\n    [meta] => Array\n        (\n            [version] => 1.0\n        )\n)");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"p2j" | "j2p">("p2j");

  const convert = useCallback((val: string, m: "p2j" | "j2p") => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      if (m === "p2j") {
        // Simple heuristic parser for PHP print_r / array syntax
        // This is a complex task, using a simpler approach for the demo
        let sanitized = val
          .replace(/Array\n\s*\(/g, "{")
          .replace(/\)/g, "}")
          .replace(/\[(\w+)\] => /g, '"$1": ')
          .replace(/,\n\s*}/g, "\n}")
          .replace(/=>/g, ":");
        
        // Ensure quotes around values if missing (basic)
        sanitized = sanitized.replace(/: ([\w\.]+)([,\n\}])/g, ': "$1"$2');
        
        const obj = JSON.parse(sanitized);
        setOutput(JSON.stringify(obj, null, 2));
      } else {
        const obj = JSON.parse(val);
        const toPhp = (o: any, indent = 0): string => {
          const sp = "    ".repeat(indent);
          if (Array.isArray(o)) {
            const items = o.map(i => toPhp(i, indent + 1)).join(",\n");
            return `array(\n${items}\n${sp})`;
          } else if (typeof o === "object" && o !== null) {
            const items = Object.entries(o).map(([k, v]) => `${sp}    "${k}" => ${toPhp(v, indent + 1)}`).join(",\n");
            return `array(\n${items}\n${sp})`;
          } else if (typeof o === "string") {
            return `"${o}"`;
          }
          return String(o);
        };
        setOutput(toPhp(obj));
      }
    } catch (e: any) {
      setOutput(`Error parsing input. Ensure valid ${m === "p2j" ? "PHP array string" : "JSON"}.`);
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
            <option value="p2j">PHP Array to JSON</option>
            <option value="j2p">JSON to PHP Array</option>
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
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith("Error")} />}
      />
    </div>
  );
}
