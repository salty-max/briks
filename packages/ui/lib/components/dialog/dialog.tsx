'use client';

import { cn } from '@briks/core';
import { DialogPrimitive } from '@briks/primitives';
import React from 'react';

import { Icon } from '../icon';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'bk-fixed bk-inset-0 bk-z-50 bk-bg-black/80  data-[state=open]:bk-animate-in data-[state=closed]:bk-animate-out data-[state=closed]:bk-fade-out-0 data-[state=open]:bk-fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'bk-fixed bk-left-[50%] bk-top-[50%] bk-z-50 bk-grid bk-w-full bk-max-w-lg bk-translate-x-[-50%] bk-translate-y-[-50%] bk-gap-4 bk-border bk-bg-background bk-p-6 bk-shadow-lg bk-duration-200 data-[state=open]:bk-animate-in data-[state=closed]:bk-animate-out data-[state=closed]:bk-fade-out-0 data-[state=open]:bk-fade-in-0 data-[state=closed]:bk-zoom-out-95 data-[state=open]:bk-zoom-in-95 data-[state=closed]:bk-slide-out-to-left-1/2 data-[state=closed]:bk-slide-out-to-top-[48%] data-[state=open]:bk-slide-in-from-left-1/2 data-[state=open]:bk-slide-in-from-top-[48%] sm:bk-rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className='bk-absolute bk-right-4 bk-top-4 bk-rounded-sm bk-opacity-70 bk-ring-offset-background bk-transition-opacity hover:bk-opacity-100 focus:bk-outline-none focus:bk-ring-2 focus:bk-ring-ring focus:bk-ring-offset-2 disabled:bk-pointer-events-none data-[state=open]:bk-bg-accent data-[state=open]:bk-text-muted-foreground'>
        <Icon name='X' className='bk-h-4 bk-w-4' />
        <span className='bk-sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('bk-flex bk-flex-col bk-space-y-1.5 bk-text-center sm:bk-text-left', className)}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'bk-flex bk-flex-col-reverse sm:bk-flex-row sm:bk-justify-end sm:bk-space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('bk-text-lg bk-font-semibold bk-leading-none bk-tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('bk-text-sm bk-text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
