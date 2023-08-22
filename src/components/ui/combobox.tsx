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

  const renderLabel = () => {
    for (const group of options) {
      const label = group.children?.find(
        (option: IOption) => option.value === value
      )?.label;
      if (label) {
        return label;
      }
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
      <PopoverContent className={`p-0 ${popoverClass}`}>
        <Command>
          <CommandInput placeholder={inputPlaceholder} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((option: IOption) => {
              if (option.children) {
                return (
                  <div key={option.value}>
                    <div className=" select-none px-2 font-bold  py-1.5 text-foreground/30">
                      {option.label}
                    </div>
                    {option.children.map((option: IOption) => (
                      <CommandItem
                        value={option.value}
                        key={option.value}
                        onSelect={(currentValue) => {
                          onChange(currentValue);
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
              }
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
