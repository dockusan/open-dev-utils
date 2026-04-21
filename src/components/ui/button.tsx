import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-sm border text-sm font-medium whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "gradient-cta border-transparent text-white hover:opacity-90",
        outline: "ghost-border surface-high text-foreground hover:surface-highest",
        secondary: "surface-bright border-transparent text-foreground hover:surface-highest",
        ghost: "border-transparent bg-transparent shell-text-muted hover:surface-high hover:text-foreground",
        destructive: "border-transparent bg-red-500/20 text-red-200 hover:bg-red-500/30",
        link: "border-transparent bg-transparent px-0 text-primary hover:text-foreground hover:underline",
      },
      size: {
        default: "h-8 px-3",
        xs: "h-6 px-2 text-xs",
        sm: "h-7 px-2.5 text-[0.8rem]",
        lg: "h-9 px-4",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
