import { useState } from "react";
import { TwoPanel } from "@/components/TwoPanel";


import { CopyButton } from "@/components/CopyButton";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function Base64Image({ toolId }: { toolId: string }) {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleBase64Change = (val: string) => {
    setBase64(val);
    if (val.startsWith("data:image")) {
      setPreview(val);
    } else {
      setPreview("");
    }
  };

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="Upload Image or Paste Base64"
        leftPanel={
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-center bg-muted/10">
              <label 
                htmlFor="file-upload" 
                className="flex items-center gap-2 cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
              >
                <Upload className="h-4 w-4" />
                Select File
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFile} />
              </label>
            </div>
            <Textarea
              placeholder="Paste data:image/... base64 here..."
              className="flex-1 resize-none border-0 focus-visible:ring-0 font-mono text-xs p-4 bg-transparent"
              value={base64}
              onChange={(e) => handleBase64Change(e.target.value)}
            />
          </div>
        }
        rightTitle="Preview"
        rightPanel={
          <div className="h-full flex items-center justify-center p-8 bg-muted/5">
            {preview ? (
              <img src={preview} alt="Base64 Preview" className="max-w-full max-h-full object-contain shadow-lg" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                <ImageIcon className="h-12 w-12" />
                <span>Image preview will appear here</span>
              </div>
            )}
          </div>
        }
        leftActions={<CopyButton value={base64} disabled={!base64} />}
      />
    </div>
  );
}
