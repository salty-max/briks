import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'bk-inline-flex bk-items-center bk-justify-center bk-gap-x-1.5 bk-whitespace-nowrap bk-rounded-md bk-text-sm bk-font-medium bk-ring-offset-background bk-transition-colors focus-visible:bk-outline-none focus-visible:bk-ring-2 focus-visible:bk-ring-ring focus-visible:bk-ring-offset-2 disabled:bk-pointer-events-none disabled:bk-opacity-50 [&>svg]:bk-size-4',
  {
    variants: {
      variant: {
        primary: 'bk-bg-primary bk-text-primary-foreground hover:bk-bg-primary/90',
        destructive: 'bk-bg-destructive bk-text-destructive-foreground hover:bk-bg-destructive/90',
        outline:
          'bk-border bk-border-input bk-bg-background hover:bk-bg-accent hover:bk-text-accent-foreground',
        secondary: 'bk-bg-secondary bk-text-secondary-foreground hover:bk-bg-secondary/80',
        ghost: 'hover:bk-bg-accent hover:bk-text-accent-foreground',
        link: 'bk-text-primary bk-underline-offset-4 hover:bk-underline',
      },
      size: {
        default: 'bk-h-10 bk-px-4 bk-py-2',
        sm: 'bk-h-9 bk-rounded-md bk-px-3',
        lg: 'bk-h-11 bk-rounded-md bk-px-8',
        icon: 'bk-h-10 bk-w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export { buttonVariants };
