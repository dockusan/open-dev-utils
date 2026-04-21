import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/CopyButton";

export function ColorConverter({ toolId }: { toolId: string }) {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [hsl, setHsl] = useState("hsl(217, 91%, 60%)");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const updateFromHex = (val: string) => {
    setHex(val);
    const rgbVal = hexToRgb(val);
    if (rgbVal) {
      setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
      const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
      setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
    }
  };

  return (
    <div id={toolId} className="mx-auto flex h-full max-w-xl flex-col items-center gap-8">
      
      <div 
        className="w-full aspect-video rounded-sm border border-white/10 shadow-lg transition-colors" 
        style={{ backgroundColor: hex }}
      />

      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Label>HEX</Label>
          <div className="flex gap-2">
            <Input value={hex} onChange={(e) => updateFromHex(e.target.value)} className="font-mono h-12" />
            <CopyButton value={hex} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>RGB</Label>
          <div className="flex gap-2">
            <Input readOnly value={rgb} className="h-12 bg-black/10 font-mono" />
            <CopyButton value={rgb} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>HSL</Label>
          <div className="flex gap-2">
            <Input readOnly value={hsl} className="h-12 bg-black/10 font-mono" />
            <CopyButton value={hsl} />
          </div>
        </div>
      </div>
    </div>
  );
}
