import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";
import { marked } from "marked";

import { Textarea } from "@/components/ui/textarea";

export function MarkdownPreview({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("# Markdown Test\n\n- List item\n- **Bold text**\n\n```js\nconsole.log('hello');\n```");
  const [output, setOutput] = useState("");

  const render = useCallback(async (val: string) => {
    try {
      const html = await marked.parse(val);
      setOutput(html);
    } catch (e) {
      setOutput("Error rendering markdown");
    }
  }, []);

  useEffect(() => {
    render(input);
  }, [input, render]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="Markdown Source"
        leftPanel={
          <Textarea
            placeholder="Enter markdown..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="Rendered Preview"
        rightPanel={
          <div 
            className="h-full overflow-auto p-4 prose dark:prose-invert max-w-none prose-sm"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        }
      />
    </div>
  );
}
