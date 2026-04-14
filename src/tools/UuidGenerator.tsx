import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4, v1 as uuidv1 } from "uuid";
import { ulid } from "ulid";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/CopyButton";
import { RefreshCw } from "lucide-react";

export function UuidGenerator({ toolId }: { toolId: string }) {
  const [v4, setV4] = useState("");
  const [v1, setV1] = useState("");
  const [ulidVal, setUlidVal] = useState("");

  const generate = useCallback(() => {
    setV4(uuidv4());
    setV1(uuidv1());
    setUlidVal(ulid());
  }, []);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div id={toolId} className="h-full p-8 flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Identifiers</h2>
        <Button onClick={generate} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Regenerate All
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>UUID v4 (Random)</Label>
          <div className="flex gap-2">
            <Input readOnly value={v4} className="font-mono" />
            <CopyButton value={v4} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>UUID v1 (Time-based)</Label>
          <div className="flex gap-2">
            <Input readOnly value={v1} className="font-mono" />
            <CopyButton value={v1} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>ULID (Sortable)</Label>
          <div className="flex gap-2">
            <Input readOnly value={ulidVal} className="font-mono" />
            <CopyButton value={ulidVal} />
          </div>
        </div>
      </div>
    </div>
  );
}
