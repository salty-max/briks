'use client';

import { cn } from '@briks/core';
import { AlertDialogPrimitive } from '@briks/primitives';
import * as React from 'react';

import { Button } from '..';
import { buttonVariants } from '../button/helpers';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'bk-fixed bk-inset-0 bk-z-50 bk-bg-black/80 data-[state=open]:bk-animate-in data-[state=closed]:bk-animate-out data-[state=closed]:bk-fade-out-0 data-[state=open]:bk-fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'bk-fixed bk-left-[50%] bk-top-[50%] bk-z-50 bk-grid bk-w-full bk-max-w-lg bk-translate-x-[-50%] bk-translate-y-[-50%] bk-gap-4 bk-border bk-bg-background bk-p-6 bk-shadow-lg bk-duration-200 data-[state=open]:bk-animate-in data-[state=closed]:bk-animate-out data-[state=closed]:bk-fade-out-0 data-[state=open]:bk-fade-in-0 data-[state=closed]:bk-zoom-out-95 data-[state=open]:bk-zoom-in-95 data-[state=closed]:bk-slide-out-to-left-1/2 data-[state=closed]:bk-slide-out-to-top-[48%] data-[state=open]:bk-slide-in-from-left-1/2 data-[state=open]:bk-slide-in-from-top-[48%] sm:bk-rounded-lg',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('bk-flex bk-flex-col bk-space-y-2 bk-text-center sm:bk-text-left', className)}
    {...props}
  />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'bk-flex bk-flex-col-reverse sm:bk-flex-row sm:bk-justify-end sm:bk-space-x-2',
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('bk-text-lg bk-font-semibold', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('bk-text-sm bk-text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    destructive?: boolean;
  }
>(({ className, destructive, ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild>
    <Button
      className={cn(
        buttonVariants({ variant: destructive ? 'destructive' : 'primary' }),
        className,
      )}
      {...props}
      ref={ref}
    />
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), 'bk--mt-2 sm:bk--mt-0', className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
