"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface IOption {
  value: string;
  label: string;
  children?: IOption[];
}

interface ComboProps {
  options: IOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  inputClass?: string;
  popoverClass?: string;
}

export const Combobox: React.FC<ComboProps> = ({
  options,
  value,
  onChange,
  inputPlaceholder = "",
  placeholder = "",
  inputClass,
  popoverClass,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string | undefined>(
    undefined
  );

  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchValue("");
    }
  }, [open]);

  const renderLabel = () => {
    for (const group of options) {
      if (group.children) {
        const label = group.children?.find(
          (option: IOption) => option.value === value
        )?.label;
        if (label) {
          return label;
        }
      } else {
        if (group.value === value) {
          return group.label;
        }
      }
    }
  };
  const renderGroupNames = (option: IOption) => {
    if (searchValue === undefined || searchValue === "") {
      return (
        <div className="block select-none px-2 py-1.5 font-bold text-foreground/30">
          {option.label}
        </div>
      );
    }

    let foundValue;
    if (searchValue) {
      foundValue = option.children?.find((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (foundValue) {
      return (
        <div className="block select-none px-2 py-1.5 font-bold text-foreground/30">
          {option.label}
        </div>
      );
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${inputClass}`}
        >
          {value ? renderLabel()! : placeholder}
          <ChevronsUpDown className={`ml-2 h-4 w-4 shrink-0 opacity-50`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`max-h-[20rem] overflow-y-auto p-0 ${popoverClass}`}
      >
        <Command>
          <CommandInput
            ref={inputRef}
            placeholder={inputPlaceholder}
            onValueChange={(value) => setSearchValue(value)}
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((option: IOption) => {
              if (option.children) {
                return (
                  <div key={option.value}>
                    {option.children.length > 0 && renderGroupNames(option)}
                    {option.children.map((option: IOption) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={(currentValue: typeof option.label) => {
                          let selectedValue;
                          for (const group of options) {
                            const value = group.children?.find(
                              (option: IOption) => {
                                return (
                                  option.label.toLowerCase() === currentValue
                                );
                              }
                            )?.value;
                            if (value) {
                              selectedValue = value;
                              break;
                            }
                          }
                          onChange(selectedValue!);
                          if (inputRef.current) inputRef.current.value = "";
                          setSearchValue("");
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </div>
                );
              } else {
                return (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={(currentValue: typeof option.label) => {
                      onChange(
                        options.find(
                          (option) =>
                            option.label.toLowerCase() === currentValue
                        )!.value
                      );
                      if (inputRef.current) inputRef.current.value = "";
                      setSearchValue("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              }
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
