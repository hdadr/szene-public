"use client";
import { CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { ReactNode, useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fuseFilter } from "@/lib/fuseFilter";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type AutoCompleteProps = {
  options: string[];
  emptyMessage: string;
  value?: string;
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  heading?: string;
  enableHistroy?: boolean;
  name?: string;
};

type Props =
  | (AutoCompleteProps & {
      enableHistory: true;
      name: string;
    })
  | (AutoCompleteProps & {
      enableHistory?: false;
      name: string;
    });

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  icon,
  className,
  heading,
  enableHistroy = false,
  name,
  isLoading = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value ?? "");
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value ?? "");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [history, setHistory] = useLocalStorage<string[]>(
    enableHistroy ? "autocomplete_option_history_" + name : "",
    []
  );

  //TODO: check if inputValue needed or used properly in this component.
  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      keepOptionListOpenWhileTyping();
      setOption(input);
      blurOnEscape(input);

      function blurOnEscape(input: HTMLInputElement) {
        if (event.key === "Escape") {
          input.blur();
        }
      }

      function setOption(input: HTMLInputElement) {
        if (input.value !== "") {
          const matchingOption = options.find((option) => option === input.value);
          if (matchingOption) {
            setSelected(matchingOption);
            onValueChange?.(matchingOption);
          } else {
            onValueChange?.(input.value);
          }
        }
      }

      function keepOptionListOpenWhileTyping() {
        if (!isOpen) {
          setOpen(true);
        }
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);

    if (selected) {
      setInputValue(selected);
    }

    if (inputValue === "" && selected) {
      setSelected(value as string);
      onValueChange?.(value as string);
      setInputValue("");
    }
  }, [selected, inputValue, onValueChange, value]);

  const handleSelectOption = useCallback(
    (selectedOption: string) => {
      setInputValue(selectedOption);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);
      if (!history.includes(selectedOption)) {
        setHistory((prevArray) => [...prevArray, selectedOption]);
      }

      // This is a hack to prevent the input from being focused after the user selects an option
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange, history, setHistory]
  );

  const handleHistoryRemove = (optionToRemove: string) => {
    setHistory((prevHistory) => {
      return prevHistory.filter((option) => option !== optionToRemove);
    });
  };

  useEffect(() => {
    const list = options.map((option) => ({ value: option, normalized: normalize(option) }));
    const fuse = fuseFilter(list, ["normalized"]);

    const debounceTimer = setTimeout(() => {
      if (inputValue === "") return;
      const results = filter(inputValue);
      setFilteredOptions(results);
    }, 300);

    return () => clearTimeout(debounceTimer);

    function filter(input: string) {
      const fuseResult = fuse.search(normalize(input));
      return fuseResult ? fuseResult.map((result) => result.item.value) : [];
    }

    function normalize(input: string): string {
      return input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }
  }, [inputValue, options]);

  return (
    <CommandPrimitive loop shouldFilter={false} onKeyDown={handleKeyDown}>
      <div className={className}>
        <CommandInput
          clear={
            <X
              size={24}
              strokeWidth={2}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInputValue("");
                onValueChange?.("");
                setSelected(null);
              }}
              className={cn("mr-4 pl-1 opacity-50", inputValue.length > 0 ? "visible" : "invisible")}
            />
          }
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="text-base"
          icon={icon}
        />
      </div>
      <div className="mt-1 relative">
        {isOpen ? (
          <div className="absolute top-0 z-10 w-full rounded-2xl bg-gray-50 outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList className="bg-white rounded-2xl border shadow">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}

              {enableHistroy && !selected && history.length > 0 ? (
                <CommandGroup heading="Előzmények">
                  {history.map((option) => {
                    return (
                      <CommandItem
                        key={option}
                        value={option}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className="flex pl-8 items-center gap-2 w-full">
                        <div className="flex items-center justify-center ">
                          <span>{option}</span>
                          <X
                            className="ml-1 py-2 pr-2 text-muted-foreground "
                            size={28}
                            strokeWidth={3}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHistoryRemove(option);
                            }}
                          />
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}

              {filteredOptions.length > 0 && !isLoading ? (
                <CommandGroup heading={heading}>
                  {filteredOptions.map((option) => {
                    const isSelected = selected === option;
                    return (
                      <CommandItem
                        key={option}
                        value={option}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={cn("flex items-center gap-2 w-full", !isSelected ? "pl-8" : null)}>
                        {isSelected ? <Check className="w-4" /> : null}
                        {option}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}

              {!isLoading ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-sm text-center">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  );
};
