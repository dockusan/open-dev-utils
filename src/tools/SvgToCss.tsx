import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function SvgToCss({ toolId }: { toolId: string }) {
  const [input, setInput] = useState('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />\n</svg>');
  const [output, setOutput] = useState("");

  const convert = useCallback((svg: string) => {
    if (!svg) {
      setOutput("");
      return;
    }
    const base64 = btoa(unescape(encodeURIComponent(svg)));
    const dataUri = `data:image/svg+xml;base64,${base64}`;
    setOutput(`.my-icon {\n  background-image: url("${dataUri}");\n  width: 100px;\n  height: 100px;\n  background-size: contain;\n  background-repeat: no-repeat;\n}`);
  }, []);

  useEffect(() => {
    convert(input);
  }, [input, convert]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="SVG Code"
        leftPanel={
          <Textarea
            placeholder="Paste SVG code here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-xs p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="CSS class"
        rightPanel={
          <Textarea
            readOnly
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={output}
          />
        }
        rightActions={<CopyButton value={output} disabled={!output} />}
      />
    </div>
  );
}
