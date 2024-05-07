import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { InputProps } from "./input";

export const InputWithIcon = forwardRef<HTMLInputElement, InputProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-9 items-center rounded-2xl border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring ",
        "flex h-9 w-full border border-input  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}>
      {children}
      <input
        {...props}
        type="text"
        ref={ref}
        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
