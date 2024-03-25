import { cn } from '@briks/core';
import { TooltipPrimitive } from '@briks/primitives';
import React from 'react';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipPortal = TooltipPrimitive.Portal;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'bk-z-50 bk-overflow-hidden bk-rounded-md bk-border bk-bg-popover bk-px-3 bk-py-1.5 bk-text-sm bk-text-popover-foreground bk-shadow-md bk-animate-in bk-fade-in-0 bk-zoom-in-95 data-[state=closed]:bk-animate-out data-[state=closed]:bk-fade-out-0 data-[state=closed]:bk-zoom-out-95 data-[side=bottom]:bk-slide-in-from-top-2 data-[side=left]:bk-slide-in-from-right-2 data-[side=right]:bk-slide-in-from-left-2 data-[side=top]:bk-slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger };
