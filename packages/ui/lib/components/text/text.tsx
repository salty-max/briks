import { cn } from '@briks/core';
import React from 'react';

import { textVariants } from './helpers';

import type { VariantProps } from 'class-variance-authority';

interface TextProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ variant, children, className, ...props }, ref) => {
    let Comp: keyof JSX.IntrinsicElements = 'span';

    switch (variant) {
      case 'title':
        Comp = 'h1';
        break;
      case 'subtitle':
        Comp = 'h2';
        break;
      case 'cardTitle':
        Comp = 'h3';
        break;
      case 'caption':
        Comp = 'small';
        break;
      default:
        Comp = 'p';
        break;
    }

    return (
      <Comp className={cn(textVariants({ variant, className }))} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);
Text.displayName = 'Text';

export { Text };
export type { TextProps };
