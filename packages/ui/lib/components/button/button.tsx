import { cn } from '@briks/core';
import { Slot } from '@briks/primitives';
import React from 'react';

import { Icon } from '../icon';
import { buttonVariants } from './helpers';

import type { VariantProps } from 'class-variance-authority';

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends ButtonElementProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      iconPosition = 'left',
      loading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        aria-label={typeof children === 'string' ? children : props['aria-label']}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? (
              <Icon data-testid='button-loader' className='bk-animate-spin' name='LoaderCircle' />
            ) : null}
            {!loading && icon && iconPosition === 'left' ? (
              <Icon data-testid='button-icon-left' name={icon} />
            ) : null}
            {children}
            {icon && iconPosition === 'right' ? (
              <Icon data-testid='button-icon-right' name={icon} />
            ) : null}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
