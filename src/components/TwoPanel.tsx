import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TwoPanelProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  className?: string;
  panelClassName?: string;
}

export function TwoPanel({
  leftPanel,
  rightPanel,
  leftTitle = "Input",
  rightTitle = "Output",
  leftActions,
  rightActions,
  className,
  panelClassName,
}: TwoPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row h-full w-full gap-4",
        className
      )}
    >
      {/* Left Panel */}
      <div
        className={cn(
          "flex flex-col flex-1 border rounded-sm border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
          panelClassName
        )}
      >
        <div className="flex h-12 items-center justify-between border-b px-4 bg-muted/20">
          <h3 className="text-sm font-semibold tracking-tight">{leftTitle}</h3>
          <div className="flex items-center gap-2">{leftActions}</div>
        </div>
        <div className="flex-1 overflow-hidden relative group">
          {leftPanel}
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={cn(
          "flex flex-col flex-1 border rounded-sm border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
          panelClassName
        )}
      >
        <div className="flex h-12 items-center justify-between border-b px-4 bg-muted/20">
          <h3 className="text-sm font-semibold tracking-tight">{rightTitle}</h3>
          <div className="flex items-center gap-2">{rightActions}</div>
        </div>
        <div className="flex-1 overflow-hidden relative group">
          {rightPanel}
        </div>
      </div>
    </div>
  );
}
