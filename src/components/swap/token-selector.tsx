"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Token, tokens } from "@/mocks/tokens";

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  otherToken: Token;
}

export function TokenSelector({
  selectedToken,
  onSelectToken,
  otherToken,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  console.log({ tokens });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-2 bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-white"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden"></div>
            <span>{selectedToken.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-gray-800 border-gray-700 text-white">
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search token..."
            className="border-b border-gray-700 text-white"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No token found.</CommandEmpty>
            <CommandGroup>
              {tokens
                .filter((token) => token.address !== otherToken.address)
                .map((token) => (
                  <CommandItem
                    key={token.address}
                    value={token.name}
                    onSelect={() => {
                      onSelectToken(token);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 hover:bg-gray-700"
                  >
                    <div className="relative w-6 h-6 rounded-full overflow-hidden"></div>
                    <span>{token.name}</span>
                    <span className="text-gray-400 text-xs ml-1">
                      {token.name}
                    </span>
                    {selectedToken.address === token.address && (
                      <Check className="h-4 w-4 ml-auto text-green-500" />
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
