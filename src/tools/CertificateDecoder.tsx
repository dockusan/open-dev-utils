import { useState, useCallback } from "react";
import { TwoPanel } from "@/components/TwoPanel";
import { Button } from "@/components/ui/button";
import * as pkijs from "pkijs";
import * as asn1js from "asn1js";

import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/ui/textarea";

export function CertificateDecoder({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const decode = useCallback(() => {
    if (!input) {
      setOutput("");
      return;
    }
    try {
      // Basic PEM extraction
      const pem = input
        .replace(/-----BEGIN CERTIFICATE-----/, "")
        .replace(/-----END CERTIFICATE-----/, "")
        .replace(/\s/g, "");
      
      const binary = atob(pem);
      const buffer = new ArrayBuffer(binary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
      }

      const asn1 = asn1js.fromBER(buffer);
      const cert = new pkijs.Certificate({ schema: asn1.result });

      const info = {
        subject: cert.subject.typesAndValues.map(v => `${v.type}: ${v.value.valueBlock.value}`).join("\n"),
        issuer: cert.issuer.typesAndValues.map(v => `${v.type}: ${v.value.valueBlock.value}`).join("\n"),
        notBefore: cert.notBefore.value.toString(),
        notAfter: cert.notAfter.value.toString(),
        serialNumber: Array.from(new Uint8Array(cert.serialNumber.valueBlock.valueHex)).map(b => b.toString(16).padStart(2, "0")).join(""),
        version: cert.version,
      };

      setOutput(JSON.stringify(info, null, 2));
    } catch (e: any) {
      setOutput(`Error: ${e.message}. Ensure input is a valid PEM certificate.`);
    }
  }, [input]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="PEM Certificate"
        leftPanel={
          <Textarea
            placeholder="Paste PEM certificate here..."
            className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-xs p-4 bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        }
        rightTitle="Decoded Info (JSON)"
        rightPanel={
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex justify-end bg-muted/10">
              <Button onClick={decode} size="sm">Decode</Button>
            </div>
            <Textarea
              readOnly
              className="flex-1 resize-none border-0 focus-visible:ring-0 font-mono text-sm p-4 bg-transparent outline-none"
              value={output}
            />
          </div>
        }
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith("Error:")} />}
      />
    </div>
  );
}
// Helper component import

