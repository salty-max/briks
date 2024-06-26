import { cn } from '@briks/core';
import { useDebounce } from '@briks/hooks';
import * as React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  debounceDelay?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, debounceDelay = 300, onChange, ...props }, ref) => {
    const debounceOnChange = onChange ? useDebounce(onChange, debounceDelay) : () => {};

    return (
      <textarea
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        onChange={debounceOnChange}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };

export type { TextareaProps };
