import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/CopyButton";
import { RefreshCw } from "lucide-react";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export function LoremIpsum({ toolId }: { toolId: string }) {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");

  const generate = useCallback(() => {
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      let sentenceCount = 5 + Math.floor(Math.random() * 5);
      let sentences = [];
      for (let s = 0; s < sentenceCount; s++) {
        let wordCount = 8 + Math.floor(Math.random() * 10);
        let words = [];
        for (let w = 0; w < wordCount; w++) {
          words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
        }
        let sentence = words.join(" ");
        sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
      }
      result.push(sentences.join(" "));
    }
    setOutput(result.join("\n\n"));
  }, [paragraphs]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div id={toolId} className="h-full p-8 flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lorem Ipsum Generator</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="paras" className="whitespace-nowrap">Paragraphs:</Label>
            <Input 
              id="paras"
              type="number" 
              min={1} 
              max={50}
              value={paragraphs} 
              onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
              className="w-20"
            />
          </div>
          <Button onClick={generate} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
          <CopyButton value={output} />
        </div>
      </div>

      <Textarea 
        readOnly 
        value={output} 
        className="flex-1 font-sans text-lg leading-relaxed p-6 bg-muted/20 resize-none border-border/50"
      />
    </div>
  );
}
