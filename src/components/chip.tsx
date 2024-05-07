import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = { children: ReactNode; variant?: "default" | "muted"; className?: string };

export const Chip = ({ children, variant, className }: Props) => {
  return (
    <span
      className={cn(
        "p-[2px] pl-2 pr-2 rounded-2xl border border-gray-400 shadow-sm",
        variant === "muted" && "border-gray-300 text-gray-400",
        className
      )}>
      {children}
    </span>
  );
};
