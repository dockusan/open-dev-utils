import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function RegexpTester({ toolId }: { toolId: string }) {
  const [regexStr, setRegexStr] = useState("(\\w+)@(\\w+)\\.(\\w+)");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("Contact us at support@example.com or admin@test.org");
  const [matches, setMatches] = useState<any[]>([]);

  const test = useCallback(() => {
    if (!regexStr) {
      setMatches([]);
      return;
    }
    try {
      const re = new RegExp(regexStr, flags);
      const m = Array.from(testText.matchAll(re));
      setMatches(m);
    } catch (e) {
      setMatches([]);
    }
  }, [regexStr, flags, testText]);

  useEffect(() => {
    test();
  }, [test]);

  return (
    <div id={toolId} className="h-full p-8 flex flex-col gap-6 max-w-5xl mx-auto overflow-auto">
      <h2 className="text-2xl font-bold">RegExp Tester</h2>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 space-y-2">
          <Label>Regular Expression</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">/</span>
            <Input 
              value={regexStr} 
              onChange={(e) => setRegexStr(e.target.value)}
              className="pl-6 pr-6 font-mono"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">/</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Flags</Label>
          <Input 
            value={flags} 
            onChange={(e) => setFlags(e.target.value)}
            className="font-mono text-center"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Test Text</Label>
        <Textarea 
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          className="h-32 font-mono"
        />
      </div>

      <div className="space-y-4 pt-4 border-t">
        <Label>Matches ({matches.length})</Label>
        <div className="space-y-2">
          {matches.map((m, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-sm border font-mono text-sm">
              <div className="text-xs text-muted-foreground mb-1 italic">Match {i + 1}</div>
              <div className="font-bold text-primary">{m[0]}</div>
              <div className="grid grid-cols-2 gap-2 mt-2 opacity-70">
                {m.slice(1).map((group: string, gi: number) => (
                  <div key={gi}>Group {gi + 1}: {group}</div>
                ))}
              </div>
            </div>
          ))}
          {matches.length === 0 && <div className="text-muted-foreground italic">No matches found</div>}
        </div>
      </div>
    </div>
  );
}
