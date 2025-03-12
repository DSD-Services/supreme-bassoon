import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
