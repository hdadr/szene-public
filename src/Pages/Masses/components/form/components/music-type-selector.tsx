import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MusicTypes } from "@/store/slices/masses/types";
import { BellOff, Guitar } from "lucide-react";

type Props = { value: MusicTypes; onValueChange?: (newValue: MusicTypes) => void };

export const MusicTypeSelector = ({ value, onValueChange }: Props) => {
  return (
    <ToggleGroup
      value={value}
      onValueChange={onValueChange}
      className="flex flex-wrap"
      type="multiple"
      variant="outline">
      <ToggleGroupItem className="flex items-center" value="cs">
        <BellOff size={16} className="pr-1" /> Csendes
      </ToggleGroupItem>
      <ToggleGroupItem className="text-xs data-[state=on]:shadow data-[state=on]:bg-purple-50 rounded-2xl" value="g">
        <Guitar size={16} className="pr-1" /> Gitáros
      </ToggleGroupItem>
      <ToggleGroupItem className="text-xs data-[state=on]:shadow data-[state=on]:bg-purple-50 rounded-2xl" value="na">
        ? Meghatározatlan
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
