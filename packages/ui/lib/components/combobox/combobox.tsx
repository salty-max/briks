'use client';

import { cn } from '@briks/core';
import React from 'react';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '..';

type ComboboxItem = {
  label: string;
  value: string;
};

interface ComboboxProps {
  items: Array<ComboboxItem>;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  onSelect?: (...event: any[]) => void;
}

function Combobox({ items, value, placeholder, disabled, className, onSelect }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          disabled={disabled}
          className={cn('flex w-full justify-between', className)}
          aria-expanded={open}
        >
          {value ? items.find(item => item.value === value)?.label : placeholder || 'Select...'}
          <Icon name='ChevronsUpDown' className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Command>
          <CommandInput placeholder={placeholder ?? 'Select...'} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={currentValue => {
                    onSelect?.(currentValue);
                    setOpen(false);
                  }}
                >
                  <Icon
                    name='Check'
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox };
export type { ComboboxProps };
