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
    <div id={toolId} className="h-full p-8 flex flex-col gap-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Unix Time Converter</h2>
      
      <div className="space-y-4">
        <Label>Unix Timestamp (seconds)</Label>
        <div className="flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-lg h-12"
          />
          <Button variant="outline" onClick={setCurrent} className="h-12">Now</Button>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t">
        <Label>Date Information</Label>
        <Textarea 
          readOnly 
          value={output} 
          className="h-48 font-mono bg-muted/20 resize-none"
        />
        <div className="flex justify-end">
          <CopyButton value={output} />
        </div>
      </div>
    </div>
  );
}

