import { dropdownVariant } from "@/lib/framerProps";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import LoadingIndicator from "./ui/loading-indicator";

type Props = {
  title: string;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onToggleClick?: () => void;
};

export const ExpandContainer = ({ loading, children, title, className, defaultOpen, onOpen, onToggleClick }: Props) => {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (onOpen && open) onOpen();
  }, [open, onOpen]);

  return (
    <div className={cn("w-full mt-2 border border-gray-200 rounded-2xl p-4", className)}>
      <h3
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
          if (onToggleClick) onToggleClick();
        }}
        className="flex items-center justify-between font-semibold dark:text-purple-200 text-purple-700 cursor-pointer">
        <span>{title}</span>
        <motion.span
          animate={{
            rotate: open ? -180 : 0,
            transition: {
              ease: "easeInOut",
              duration: 0.22,
            },
          }}>
          <ChevronDown size={20} />
        </motion.span>
      </h3>
      {loading ? (
        <div className="mb-3 mt-3 flex flex-col items-center">
          <LoadingIndicator size={20} />
        </div>
      ) : (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial="exit"
          animate={open ? "enter" : "exit"}
          variants={dropdownVariant}>
          {children}
        </motion.div>
      )}
    </div>
  );
};
