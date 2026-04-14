import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/CopyButton";

export function NumberBaseConverter({ toolId }: { toolId: string }) {
  const [val, setVal] = useState("42");
  const [base, setBase] = useState(10);

  const [hex, setHex] = useState("");
  const [dec, setDec] = useState("");
  const [bin, setBin] = useState("");
  const [oct, setOct] = useState("");

  const update = useCallback((input: string, fromBase: number) => {
    if (!input) {
      setHex(""); setDec(""); setBin(""); setOct("");
      return;
    }
    try {
      const num = fromBase === 10 ? BigInt(input) : BigInt(parseInt(input, fromBase));
      
      setDec(num.toString(10));
      setHex(num.toString(16).toUpperCase());
      setBin(num.toString(2));
      setOct(num.toString(8));
    } catch (e) {
      // ignore invalid input
    }
  }, []);

  const handleChange = (input: string, b: number) => {
    setVal(input);
    setBase(b);
    update(input, b);
  };

  useEffect(() => {
    update("42", 10);
  }, [update]);

  return (
    <div id={toolId} className="h-full p-8 flex flex-col gap-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Number Base Converter</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Decimal (Base 10)</Label>
          <div className="flex gap-2">
            <Input 
              value={base === 10 ? val : dec} 
              onChange={(e) => handleChange(e.target.value, 10)}
              className="font-mono"
            />
            <CopyButton value={dec} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Hexadecimal (Base 16)</Label>
          <div className="flex gap-2">
            <Input 
              value={base === 16 ? val : hex} 
              onChange={(e) => handleChange(e.target.value, 16)}
              className="font-mono"
            />
            <CopyButton value={hex} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Binary (Base 2)</Label>
          <div className="flex gap-2">
            <Input 
              value={base === 2 ? val : bin} 
              onChange={(e) => handleChange(e.target.value, 2)}
              className="font-mono"
            />
            <CopyButton value={bin} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Octal (Base 8)</Label>
          <div className="flex gap-2">
            <Input 
              value={base === 8 ? val : oct} 
              onChange={(e) => handleChange(e.target.value, 8)}
              className="font-mono"
            />
            <CopyButton value={oct} />
          </div>
        </div>
      </div>
    </div>
  );
}
// Fix BigInt issue in some envs or just use simple parseInt if BigInt not needed
