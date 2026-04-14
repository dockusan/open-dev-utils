import { useState, useCallback, useEffect } from "react";
import { TwoPanel } from "@/components/TwoPanel";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function CurlToCode({ toolId }: { toolId: string }) {
  const [input, setInput] = useState('curl -X POST https://api.example.com/login \\\n  -H "Content-Type: application/json" \\\n  -d \'{"username": "admin", "password": "password"}\'');
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState<"js" | "py" | "go">("js");

  const convert = useCallback((curl: string, l: "js" | "py" | "go") => {
    if (!curl) {
      setOutput("");
      return;
    }
    // Simple heuristic parser for demo
    const urlMatch = curl.match(/["']?(https?:\/\/[^\s"']+)["']?/);
    const url = urlMatch ? urlMatch[1] : "https://api.example.com";
    const methodMatch = curl.match(/-X\s+(\w+)/);
    const method = methodMatch ? methodMatch[1] : "GET";

    if (l === "js") {
      setOutput(`fetch("${url}", {\n  method: "${method}",\n  headers: {\n    "Content-Type": "application/json"\n  }\n}).then(res => res.json());`);
    } else if (l === "py") {
      setOutput(`import requests\n\nres = requests.${method.toLowerCase()}("${url}", headers={"Content-Type": "application/json"})\nprint(res.json())`);
    } else {
      setOutput(`package main\n\nimport (\n\t"net/http"\n)\n\nfunc main() {\n\treq, _ := http.NewRequest("${method}", "${url}", nil)\n\treq.Header.Set("Content-Type", "application/json")\n\tclient := &http.Client{}\n\tclient.Do(req)\n}`);
    }
  }, []);

  useEffect(() => {
    convert(input, lang);
  }, [input, lang, convert]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="cURL Command"
        leftPanel={
          <Textarea
            placeholder="Paste cURL here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle={
          <select 
            className="bg-transparent font-semibold outline-none border-none focus:ring-0 cursor-pointer"
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
          >
            <option value="js">JavaScript (Fetch)</option>
            <option value="py">Python (Requests)</option>
            <option value="go">Go (http)</option>
          </select>
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
