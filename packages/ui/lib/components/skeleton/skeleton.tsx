import { cn } from '@briks/core';

function Skeleton({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  return <div className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
