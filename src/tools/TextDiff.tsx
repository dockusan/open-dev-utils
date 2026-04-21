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
    <div id={toolId} className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex h-[38%] min-h-[16rem] gap-4">
        <div className="surface-low flex flex-1 flex-col overflow-hidden rounded-sm ghost-border">
          <div className="surface-panel shell-border shell-text-muted px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] border-b">Original Text</div>
          <Textarea 
            value={left} 
            onChange={(e) => setLeft(e.target.value)}
            className="surface-lowest flex-1 resize-none border-0 font-mono text-sm focus-visible:ring-0"
          />
        </div>
        <div className="surface-low flex flex-1 flex-col overflow-hidden rounded-sm ghost-border">
           <div className="surface-panel shell-border shell-text-muted px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] border-b">Modified Text</div>
           <Textarea 
            value={right} 
            onChange={(e) => setRight(e.target.value)}
            className="surface-lowest flex-1 resize-none border-0 font-mono text-sm focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="surface-low flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm ghost-border">
        <div className="surface-panel shell-border shell-text-muted px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] border-b">Diff Result</div>
        <div className="surface-lowest flex-1 overflow-auto p-4 font-mono text-sm whitespace-pre-wrap">
          {diffResult.map((part, index) => (
            <span 
              key={index}
              className={part.added ? "block bg-emerald-500/20 text-emerald-700 dark:text-emerald-200" : part.removed ? "block bg-rose-500/20 text-rose-700 dark:text-rose-200 line-through" : "shell-text-muted block"}
            >
              {part.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
