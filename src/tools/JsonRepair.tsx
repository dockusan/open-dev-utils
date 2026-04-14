import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";
import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";
import { jsonrepair } from "jsonrepair";
import { Wrench } from "lucide-react";

export function JsonRepair({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const repair = useCallback((val: string) => {
    if (!val.trim()) {
      setOutput("");
      return;
    }
    try {
      const repaired = jsonrepair(val);
      // Try to format it if possible
      try {
        setOutput(JSON.stringify(JSON.parse(repaired), null, 2));
      } catch {
        setOutput(repaired);
      }
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    repair(input);
  }, [input, repair]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle={
          <div className="flex items-center gap-2">
            <Wrench size={16} className="text-blue-500" />
            <span>Broken JSON</span>
          </div>
        }
        leftPanel={
          <Textarea
            placeholder="Paste broken JSON here (unquoted keys, trailing commas, etc.)..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="Repaired & Formatted JSON"
        rightPanel={
          <Textarea
            readOnly
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={output}
          />
        }
        rightActions={
          <CopyButton 
            value={output} 
            disabled={!output || output.startsWith("Error:")} 
          />
        }
      />
    </div>
  );
}
