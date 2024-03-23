import { cva } from 'class-variance-authority';

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-base',
      title: 'text-2xl font-bold',
      subtitle: 'text-xl font-semibold',
      cardTitle: 'font-semibold',
      destructive: 'text-destructive',
      caption: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export { textVariants };
