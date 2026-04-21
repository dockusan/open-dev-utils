import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

interface CopyButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  value: string;
  timeout?: number;
}

export function CopyButton({
  value,
  timeout = 2000,
  className,
  variant = "ghost",
  size = "icon",
  disabled,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeout);
    });
  }, [value, timeout]);

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant={variant}
          size={size}
          className={cn("relative rounded-sm", className)}
          onClick={copyToClipboard}
          disabled={disabled}
          {...props}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-150",
              hasCopied ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
          >
            <Check className="h-4 w-4 text-emerald-300" />
          </div>
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-150",
              hasCopied ? "scale-50 opacity-0" : "scale-100 opacity-100"
            )}
          >
            <Copy className="h-4 w-4" />
          </div>
          <span className="sr-only">Copy</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  );
}
