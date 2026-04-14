import { useState, useCallback, useEffect } from "react";
import * as diff from "diff";

import { Textarea } from "@/components/ui/textarea";

export function TextDiff({ toolId }: { toolId: string }) {
  const [left, setLeft] = useState("Hello World\nLine 2\nLine 3");
  const [right, setRight] = useState("Hello World\nLine Two\nLine 4");
  const [diffResult, setDiffResult] = useState<diff.Change[]>([]);

  const compare = useCallback(() => {
    const d = diff.diffLines(left, right);
    setDiffResult(d);
  }, [left, right]);

  useEffect(() => {
    compare();
  }, [compare]);

  return (
    <div id={toolId} className="h-full p-6 flex flex-col gap-6">
      <div className="flex gap-4 h-1/3">
        <div className="flex-1 flex flex-col border rounded-sm">
          <div className="px-4 py-2 border-b text-xs font-bold uppercase tracking-wider bg-muted/20">Original Text</div>
          <Textarea 
            value={left} 
            onChange={(e) => setLeft(e.target.value)}
            className="flex-1 resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4"
          />
        </div>
        <div className="flex-1 flex flex-col border rounded-sm">
           <div className="px-4 py-2 border-b text-xs font-bold uppercase tracking-wider bg-muted/20">Modified Text</div>
           <Textarea 
            value={right} 
            onChange={(e) => setRight(e.target.value)}
            className="flex-1 resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col border rounded-sm overflow-hidden min-h-0">
        <div className="px-4 py-2 border-b text-xs font-bold uppercase tracking-wider bg-muted/20">Diff Result</div>
        <div className="flex-1 overflow-auto p-4 font-mono text-sm whitespace-pre-wrap">
          {diffResult.map((part, index) => (
            <span 
              key={index}
              className={part.added ? "bg-emerald-500/20 text-emerald-600 block" : part.removed ? "bg-rose-500/20 text-rose-600 block line-through" : "block"}
            >
              {part.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
