import { cva } from 'class-variance-authority';

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'bk-text-base',
      title: 'bk-text-2xl bk-font-bold',
      subtitle: 'bk-text-xl bk-font-semibold',
      cardTitle: 'bk-font-semibold',
      destructive: 'bk-text-destructive',
      caption: 'bk-text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export { textVariants };
