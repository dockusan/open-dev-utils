import { useState, useCallback, useEffect } from "react";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function HashGenerator({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({
    sha256: "",
    sha512: "",
    sha1: "",
  });

  const computeHashes = useCallback(async (text: string) => {
    if (!text) {
      setHashes({ sha256: "", sha512: "", sha1: "" });
      return;
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const getHash = async (algo: string) => {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    setHashes({
      sha256: await getHash("SHA-256"),
      sha512: await getHash("SHA-512"),
      sha1: await getHash("SHA-1"),
    });
  }, []);

  useEffect(() => {
    computeHashes(input);
  }, [input, computeHashes]);

  return (
    <div id={toolId} className="h-full p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold">Hash Generator (SubtleCrypto)</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea 
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-32 font-mono"
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label>SHA-256</Label>
            <div className="flex gap-2">
              <Input readOnly value={hashes.sha256} className="font-mono bg-muted/30" />
              <CopyButton value={hashes.sha256} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>SHA-512</Label>
            <div className="flex gap-2">
              <Input readOnly value={hashes.sha512} className="font-mono bg-muted/30" />
              <CopyButton value={hashes.sha512} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>SHA-1</Label>
            <div className="flex gap-2">
              <Input readOnly value={hashes.sha1} className="font-mono bg-muted/30" />
              <CopyButton value={hashes.sha1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
