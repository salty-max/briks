import { cn } from '@briks/core';
import { LabelPrimitive } from '@briks/primitives';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive ref={ref} className={cn(labelVariants({ className }))} {...props} />
));
Label.displayName = LabelPrimitive.displayName;

export { Label };
