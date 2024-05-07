import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export type Option = { text: string; value: string };

type Props = {
  options: Option[];
  initialSelectedOptions?: Option[];
  emptySelectionDefault?: Option;
  title: string;
  onChange: (options: Option[]) => void;
};

export function Combobox({ title, options, initialSelectedOptions, onChange, emptySelectionDefault }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(initialSelectedOptions ?? []);


  useEffect(() => {
    onChange(selectedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  const addOption = (newOption: Option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const withoutEmptyDefault = prevSelectedOptions.filter((option) => option !== emptySelectionDefault);
      const newOptions = newOption === emptySelectionDefault ? [newOption] : [...withoutEmptyDefault, newOption];
      return newOptions;
    });
  };

  const removeOption = (optionToRemove: Option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const filteredOptions = prevSelectedOptions.filter((option) => option !== optionToRemove);
      const newOptions =
        filteredOptions.length === 0 && emptySelectionDefault ? [emptySelectionDefault] : filteredOptions;
      return newOptions;
    });
  };

  const updateSelection = (option: Option, checked: boolean) => {
    checked ? addOption(option) : removeOption(option);
  };

  const handleDisable = (option: Option) => {
    return emptySelectionDefault && emptySelectionDefault.value === option.value
      ? selectedOptions.includes(option)
      : false;
  };

  return (
    <div className="flex ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=" rounded-2xl flex items-center text-xs" variant="outline">
            {title} <Plus size={16} strokeWidth={1.25} className="ml-1.5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 rounded-2xl max-h-48 overflow-y-auto">
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              className="data-[state=checked]:bg-purple-50"
              key={option.value}
              checked={selectedOptions.includes(option)}
              onCheckedChange={(checked) => updateSelection(option, checked)}
              disabled={handleDisable(option)}>
              {option.text}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AnimatePresence>
        <motion.div layout transition={{ duration: 0.1 }} className="flex flex-wrap items-center ">
          {selectedOptions.map((option) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              key={option.value}
              className="flex items-center ml-2 mb-2 py-1 px-1.5 text-xs font-medium justify-center bg-purple-50 max-w-36 rounded-2xl border shadow-sm">
              <div className="p-1 ml-2">{option.text}</div>
              <X
                onClick={() => updateSelection(option, false)}
                className="ml-1.5 cursor-pointer hover:text-gray-500 text-zinc-600"
                size={14}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
