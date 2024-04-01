import { format } from 'date-fns';
import React from 'react';

import { Button, Calendar, Icon, Popover, PopoverContent, PopoverTrigger } from '..';

interface DatePickerProps {
  value?: Date;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (date?: Date) => void;
}

function DatePicker({ value, onChange, disabled, placeholder }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          role='combobox'
          className='w-full flex justify-start text-left font-normal'
          aria-expanded={open}
        >
          <Icon name='Calendar' className='mr-2 h-4 w-4 shrink-0 opacity-50' />
          {value ? format(value, 'PPP') : placeholder || 'Select...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
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
