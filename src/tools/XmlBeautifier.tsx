import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function XmlBeautifier({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatXml = useCallback((xml: string) => {
    if (!xml) {
      setOutput("");
      return;
    }
    try {
      const PADDING = "  ";
      const reg = /(>)(<)(\/*)/g;
      const html = xml.replace(reg, "$1\r\n$2$3");
      let pad = 0;
      const formatted = html.split("\r\n").map((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad !== 0) {
            pad -= 1;
          }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }

        const result = PADDING.repeat(pad) + node;
        pad += indent;
        return result;
      }).join("\r\n");
      setOutput(formatted);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    formatXml(input);
  }, [input, formatXml]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftPanel={
          <Textarea
            placeholder="Paste XML here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
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
