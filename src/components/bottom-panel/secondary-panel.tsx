import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PanelButton } from "./panel-button";
import { useActive } from "./useActive";

export const SecondaryPanel = ({ children }: { children: ReactNode }) => {
  const iconClasses = (active: boolean) => cn("w-5 h-5 mb-1", active ? "text-purple-700 " : "text-gray-700");
  return (
    <PanelButton text="További">
      <Popover>
        <PopoverTrigger asChild>
          <MoreVertical className={iconClasses(useActive(["/settings", "/psalm", "/bible"]))} />
        </PopoverTrigger>

        <PopoverContent sideOffset={25} className="w-auto p-0 outline-none ">
          <div className="flex flex-col justify-center w-auto h-auto pt-4 pb-4 bg-white   rounded-2xl outline-none shadow-sm">
            {children}
          </div>
        </PopoverContent>
      </Popover>
    </PanelButton>
  );
};
