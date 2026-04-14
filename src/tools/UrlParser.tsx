import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function UrlParser({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("https://user:pass@example.com:8080/path/to/page?query=1#hash");
  const [output, setOutput] = useState("");

  const parse = useCallback((val: string) => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      const url = new URL(val);
      const info = {
        href: url.href,
        protocol: url.protocol,
        username: url.username,
        password: url.password,
        host: url.host,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        searchParams: Object.fromEntries(url.searchParams.entries()),
        hash: url.hash,
        origin: url.origin,
      };
      setOutput(JSON.stringify(info, null, 2));
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    parse(input);
  }, [input, parse]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="URL to Parse"
        leftPanel={
          <Textarea
            placeholder="Paste URL here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="Parsed Information (JSON)"
        rightPanel={
          <Textarea
            readOnly
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={output}
          />
        }
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith("Error:")} />}
      />
    </div>
  );
}
