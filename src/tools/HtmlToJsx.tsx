import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function HtmlToJsx({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("<div class=\"container\">\n  <h1 id=\"title\">Hello World</h1>\n  <img src=\"logo.png\">\n</div>");
  const [output, setOutput] = useState("");

  const convert = useCallback((html: string) => {
    if (!html) {
      setOutput("");
      return;
    }
    // Basic transforms: class->className, for->htmlFor, self-closing tags
    let jsx = html
      .replace(/class=/g, "className=")
      .replace(/for=/g, "htmlFor=")
      .replace(/tabindex=/g, "tabIndex=")
      .replace(/onclick=/g, "onClick=")
      .replace(/onchange=/g, "onChange=")
      .replace(/oninput=/g, "onInput=");

    // Close self-closing tags tags like <img ...>, <br>, <hr>, <input ...>
    const voidElements = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];
    voidElements.forEach(tag => {
      const regex = new RegExp(`<${tag}([^>]*[^\\/])>`, "gi");
      jsx = jsx.replace(regex, `<${tag}$1 />`);
    });

    setOutput(jsx);
  }, []);

  useEffect(() => {
    convert(input);
  }, [input, convert]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="HTML"
        leftPanel={
          <Textarea
            placeholder="Paste HTML here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="JSX"
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
