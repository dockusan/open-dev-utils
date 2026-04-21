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
    <div id={toolId} className="mx-auto flex h-full max-w-5xl flex-col gap-6 overflow-auto">
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

      <div className="surface-low rounded-sm border border-white/10 p-4">
        <Label>Matches ({matches.length})</Label>
        <div className="mt-3 space-y-2">
          {matches.map((m, i) => (
            <div key={i} className="surface-lowest rounded-sm border border-white/10 p-3 font-mono text-sm">
              <div className="mb-1 text-xs italic text-[rgb(193,198,215)]/70">Match {i + 1}</div>
              <div className="font-bold text-[#8cd2da]">{m[0]}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[rgb(193,198,215)]/80">
                {m.slice(1).map((group: string, gi: number) => (
                  <div key={gi}>Group {gi + 1}: {group}</div>
                ))}
              </div>
            </div>
          ))}
          {matches.length === 0 && <div className="italic text-[rgb(193,198,215)]/70">No matches found</div>}
        </div>
      </div>
    </div>
  );
}
