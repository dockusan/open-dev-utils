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
        "flex h-full w-full min-h-0 flex-col gap-4 xl:flex-row",
        className
      )}
    >
      <div
        className={cn(
          "surface-low flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm ghost-border",
          panelClassName
        )}
      >
        <div className="surface-panel shell-border flex h-9 items-center justify-between border-b px-3">
          <h3 className="label-technical shell-text-muted">{leftTitle}</h3>
          <div className="flex items-center gap-2">{leftActions}</div>
        </div>
        <div className="surface-lowest relative flex-1 overflow-hidden">{leftPanel}</div>
      </div>

      <div
        className={cn(
          "surface-low flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm ghost-border",
          panelClassName
        )}
      >
        <div className="surface-panel shell-border flex h-9 items-center justify-between border-b px-3">
          <h3 className="label-technical shell-text-muted">{rightTitle}</h3>
          <div className="flex items-center gap-2">{rightActions}</div>
        </div>
        <div className="surface-lowest relative flex-1 overflow-hidden">{rightPanel}</div>
      </div>
    </div>
  );
}
