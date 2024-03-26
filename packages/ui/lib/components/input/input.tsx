import { cn } from '@briks/core';
import { useDebounce } from '@briks/hooks';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  debounceDelay?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, debounceDelay = 300, ...props }, ref) => {
    const debounceOnChange = onChange ? useDebounce(onChange, debounceDelay) : () => {};

    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        type={type}
        onChange={debounceOnChange}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

export type { InputProps };
