import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/CopyButton";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw } from "lucide-react";

export function RandomStringGenerator({ toolId }: { toolId: string }) {
  const [length, setLength] = useState(32);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [output, setOutput] = useState("");

  const generate = useCallback(() => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setOutput("");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setOutput(result);
  }, [length, options]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div id={toolId} className="h-full p-8 flex flex-col gap-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Random String Generator</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Length: {length}</Label>
          <Input 
            type="range" 
            min={4} 
            max={512} 
            step={1} 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="upper" 
              checked={options.uppercase} 
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, uppercase: !!checked }))}
            />
            <Label htmlFor="upper">Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lower" 
              checked={options.lowercase} 
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, lowercase: !!checked }))}
            />
            <Label htmlFor="lower">Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="nums" 
              checked={options.numbers} 
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, numbers: !!checked }))}
            />
            <Label htmlFor="nums">Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="syms" 
              checked={options.symbols} 
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, symbols: !!checked }))}
            />
            <Label htmlFor="syms">Symbols (!@#...)</Label>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Label>Generated String</Label>
          <div className="flex gap-2">
            <Input readOnly value={output} className="font-mono h-12" />
            <CopyButton value={output} />
            <Button onClick={generate} variant="outline" size="icon" className="h-12 w-12">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
