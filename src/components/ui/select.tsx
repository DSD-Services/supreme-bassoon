import { cn } from "@/lib/utils";
import * as React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-9 w-full rounded-md border-r-10 border-transparent bg-transparent px-3 py-1 text-base shadow-sm outline outline-gray-300 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export { Select };
