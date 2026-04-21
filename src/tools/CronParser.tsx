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
    <div id={toolId} className="mx-auto flex h-full max-w-2xl flex-col gap-8">
      <div className="space-y-4">
        <Label>Cron Expression</Label>
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-lg h-12"
          placeholder="e.g. */5 * * * *"
        />
        <div className="rounded-sm border border-white/10 bg-[#272841] p-4 font-semibold text-[#8cd2da]">
          {description}
        </div>
      </div>

      <div className="surface-low flex min-h-0 min-w-0 flex-1 flex-col space-y-4 rounded-sm border border-white/10 p-4">
        <Label>Next 10 Occurrences</Label>
        <ScrollArea className="surface-lowest flex-1 rounded-sm border border-white/10 p-4">
          <div className="space-y-2 font-mono text-sm">
            {nextRuns.map((r, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-6 text-[rgb(193,198,215)]/55">{i + 1}.</span>
                <span className="text-[rgb(193,198,215)]">{r}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
