import { useState, useCallback, useEffect } from "react";
import * as changeCase from "change-case";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function StringCaseConverter({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("hello world example");
  const [results, setResults] = useState<Array<{ name: string; value: string }>>([]);

  const convert = useCallback((val: string) => {
    if (!val) {
      setResults([]);
      return;
    }
    setResults([
      { name: "Camel Case", value: changeCase.camelCase(val) },
      { name: "Pascal Case", value: changeCase.pascalCase(val) },
      { name: "Snake Case", value: changeCase.snakeCase(val) },
      { name: "Kebab Case", value: changeCase.kebabCase(val) },
      { name: "Constant Case", value: changeCase.constantCase(val) },
      { name: "Train Case", value: changeCase.trainCase(val) },
      { name: "Heading Case", value: changeCase.capitalCase(val) },
      { name: "Upper Case", value: val.toUpperCase() },
      { name: "Lower Case", value: val.toLowerCase() },
    ]);
  }, []);

  useEffect(() => {
    convert(input);
  }, [input, convert]);

  return (
    <div id={toolId} className="mx-auto flex h-full max-w-4xl flex-col gap-8 overflow-auto">
      <div className="space-y-4">
        <Label>Input Text</Label>
        <Textarea 
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-20"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-6 rounded-sm border border-white/10 bg-black/10 p-5 md:grid-cols-2">
        {results.map((r, i) => (
          <div key={i} className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-[rgb(193,198,215)]/70">{r.name}</Label>
            <div className="flex gap-2">
              <Input readOnly value={r.value} className="bg-black/10 font-mono" />
              <CopyButton value={r.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
