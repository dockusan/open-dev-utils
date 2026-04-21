import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/CopyButton";
import { Download } from "lucide-react";

export function QrCodeGenerator({ toolId }: { toolId: string }) {
  const [input, setInput] = useState("https://github.com/tauri-apps/tauri");
  const [dataUrl, setDataUrl] = useState("");

  const generate = useCallback(async (val: string) => {
    if (!val) {
      setDataUrl("");
      return;
    }
    try {
      const url = await QRCode.toDataURL(val, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    generate(input);
  }, [input, generate]);

  const download = () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div id={toolId} className="mx-auto flex h-full max-w-5xl flex-col gap-8 md:flex-row">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="qr-input">Text or URL</Label>
          <Input 
            id="qr-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode..."
            className="h-12"
          />
        </div>
        
        <div className="pt-4 flex gap-4">
          <Button onClick={download} variant="default" className="gap-2" disabled={!dataUrl}>
            <Download className="h-4 w-4" />
            Download PNG
          </Button>
          <CopyButton value={dataUrl} />
        </div>
      </div>

      <div className="surface-low flex h-[400px] w-[400px] items-center justify-center overflow-hidden rounded-sm border border-white/10 p-4">
        {dataUrl ? (
          <div className="flex h-full w-full items-center justify-center rounded-sm bg-white p-4">
            <img src={dataUrl} alt="QR Code" className="h-full w-full object-contain" />
          </div>
        ) : (
          <div className="italic text-[rgb(193,198,215)]/70">Enter text to generate</div>
        )}
      </div>
    </div>
  );
}
