import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Church } from "@/models/Church";
import { MoreVertical } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

export type DropdownAction = { label: string; icon: ReactNode; action: (church: Church) => void };
type Props = {
  church: Church;
  dropdownActions?: DropdownAction[];
};

export const DropdownAction = ({ church, dropdownActions }: Props) => {
  const [delayedDropdownActions, setDelayedDropdownActions] = useState<DropdownAction[]>();

  useEffect(() => {
    //without the delay 
    //when the church is bookmarked or unbookmarked the dropdownaction label changes before overlay closes
    setTimeout(() => setDelayedDropdownActions(dropdownActions), 200);
  }, [dropdownActions]);

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="p-0">
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          {delayedDropdownActions &&
            delayedDropdownActions.map(({ action, label, icon }, index) => (
              <React.Fragment key={label}>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.stopPropagation();
                    action(church);
                  }}>
                  {icon} <span className="text-muted-foreground">{label}</span>
                </DropdownMenuItem>
                {index + 1 < delayedDropdownActions.length && <Separator />}
              </React.Fragment>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
};
