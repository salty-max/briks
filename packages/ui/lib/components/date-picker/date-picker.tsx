import { cn } from '@briks/core';
import { format, Locale } from 'date-fns';
import React from 'react';

import { Button, Calendar, Icon, Popover, PopoverContent, PopoverTrigger } from '..';

interface DatePickerProps {
  value?: Date;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  locale?: Locale;
  onChange?: (date?: Date) => void;
}

function DatePicker({
  value,
  onChange,
  disabled,
  placeholder,
  className,
  locale,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          role='combobox'
          className={cn('flex w-full justify-start text-left font-normal', className)}
          aria-expanded={open}
        >
          <Icon name='Calendar' className='mr-2 h-4 w-4 shrink-0 opacity-50' />
          {value
            ? format(value, 'PPP', {
                locale,
              })
            : placeholder || 'Select...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          locale={locale}
          selected={value}
          onSelect={date => {
            onChange?.(date);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };

export type { DatePickerProps };
