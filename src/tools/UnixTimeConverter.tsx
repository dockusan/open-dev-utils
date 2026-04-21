import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UnixTimeConverter({ toolId }: { toolId: string }) {
  const [input, setInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [output, setOutput] = useState("");

  const convert = useCallback((ts: string) => {
    if (!ts) {
      setOutput("");
      return;
    }
    try {
      const date = new Date(parseInt(ts) * 1000);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      
      const info = {
        iso: date.toISOString(),
        local: date.toLocaleString(),
        utc: date.toUTCString(),
        relative: new Intl.RelativeTimeFormat("en").format(
          Math.floor((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24),
          "day"
        ),
      };
      setOutput(JSON.stringify(info, null, 2));
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    convert(input);
  }, [input, convert]);

  const setCurrent = () => setInput(Math.floor(Date.now() / 1000).toString());

  return (
    <div id={toolId} className="mx-auto flex h-full max-w-4xl flex-col gap-6">
      <div className="surface-low rounded-sm border border-white/10 p-5">
        <Label>Unix Timestamp (seconds)</Label>
        <div className="mt-3 flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-lg h-12"
          />
          <Button variant="outline" onClick={setCurrent} className="h-12">Now</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface-low rounded-sm border border-white/10 p-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(193,198,215)]">Structured output</div>
          <Textarea 
            readOnly 
            value={output} 
            className="h-64 resize-none border-0 bg-transparent font-mono"
          />
        </div>
        <div className="surface-low rounded-sm border border-white/10 p-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(193,198,215)]">Actions</div>
          <div className="flex items-center justify-between rounded-sm border border-white/10 bg-black/10 px-4 py-3">
            <div>
              <div className="text-sm font-medium text-white">Copy current payload</div>
              <div className="text-sm text-[rgb(193,198,215)]">ISO, local, UTC, and relative time</div>
            </div>
            <CopyButton value={output} />
          </div>
        </div>
      </div>
    </div>
  );
}
