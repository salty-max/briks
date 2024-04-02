import { cn } from '@briks/core';
import React from 'react';

import { Primitive } from '../primitive';

import type * as Briks from '../primitive';

const NAME = 'Label';

type LabelElement = React.ElementRef<typeof Primitive.label>;
type PrimitiveLabelProps = Briks.ComponentPropsWithoutRef<typeof Primitive.label>;

const LabelPrimitive = React.forwardRef<LabelElement, PrimitiveLabelProps>(
  ({ className, ...labelProps }, forwardedRef) => (
    <Primitive.label
      {...labelProps}
      ref={forwardedRef}
      className={cn(NAME, className)}
      onMouseDown={e => {
        // Only prevent text selection if clicking inside the label itself
        const target = e.target as HTMLElement;
        if (target.closest('button, input, select, textarea')) return;

        labelProps.onMouseDown?.(e);
        // Prevent text selection when double clicking label
        if (!e.defaultPrevented && e.detail > 1) e.preventDefault();
      }}
    />
  ),
);
LabelPrimitive.displayName = NAME;

export { LabelPrimitive };
