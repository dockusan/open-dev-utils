import { useState } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { Textarea } from "@/components/ui/textarea";

export function HtmlPreview({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("<h1>Hello World</h1>\n<p>This is a live preview.</p>\n<button onclick=\"alert('clicked')\" style=\"background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;\">\n  Click Me\n</button>");

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="HTML Input"
        leftPanel={
          <Textarea
            placeholder="Paste HTML here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="Sandboxed Preview"
        rightPanel={
          <iframe 
            srcDoc={input}
            title="Preview" 
            className="w-full h-full bg-white border-none"
            sandbox="allow-scripts allow-popups"
          />
        }
      />
    </div>
  );
}
