import { useState, useCallback, useEffect } from "react";
import cronstrue from "cronstrue";
import cronParser from "cron-parser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CronParser({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("*/5 * * * *");
  const [description, setDescription] = useState("");
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  const parse = useCallback((val: string) => {
    if (!val) {
      setDescription("");
      setNextRuns([]);
      return;
    }
    try {
      setDescription(cronstrue.toString(val));
      const interval = cronParser.parse(val);
      let runs = [];
      for (let i = 0; i < 10; i++) {
        runs.push(interval.next().toString());
      }
      setNextRuns(runs);
    } catch (e) {
      setDescription("Invalid cron expression");
      setNextRuns([]);
    }
  }, []);

  useEffect(() => {
    parse(input);
  }, [input, parse]);

  return (
    <div id={toolId} className="h-full p-8 flex flex-col gap-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Cron Parser</h2>
      
      <div className="space-y-4">
        <Label>Cron Expression</Label>
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-lg h-12"
          placeholder="e.g. */5 * * * *"
        />
        <div className="p-4 bg-primary/5 border rounded-sm text-primary font-semibold">
          {description}
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t flex-1 min-h-0 min-w-0">
        <Label>Next 10 Occurrences</Label>
        <ScrollArea className="flex-1 border rounded-sm p-4 bg-muted/20">
          <div className="space-y-2 font-mono text-sm">
            {nextRuns.map((r, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-muted-foreground w-6">{i + 1}.</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
