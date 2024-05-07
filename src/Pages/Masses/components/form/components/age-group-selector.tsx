import { Family, Student, UniversityStudent } from "@/components/svg-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AgeGroupTypes } from "@/store/slices/masses/types";

type Props = { value: AgeGroupTypes; onValueChange?: (newValue: AgeGroupTypes) => void };

export const AgeGroupSelector = ({ value, onValueChange }: Props) => {
  const iconClasses = "pr-1 w-6";
  return (
    <ToggleGroup
      value={value}
      onValueChange={onValueChange}
      className="flex flex-wrap"
      type="multiple"
      variant="outline">
      <ToggleGroupItem value="csal">
        <Family className={iconClasses} /> Családos | Mocorgós
      </ToggleGroupItem>
      <ToggleGroupItem value="d">
        <Student className={iconClasses} /> Diák
      </ToggleGroupItem>
      <ToggleGroupItem value="ifi">
        <UniversityStudent className={iconClasses} /> Egyetemi | Ifjúsági
      </ToggleGroupItem>
      <ToggleGroupItem value="na">? Meghatározatlan</ToggleGroupItem>
    </ToggleGroup>
  );
};
