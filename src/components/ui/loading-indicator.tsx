import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function LoadingIndicator({ size, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cn("animate-spin  dark:text-purple-200 text-purple-700", className)} />;
}
