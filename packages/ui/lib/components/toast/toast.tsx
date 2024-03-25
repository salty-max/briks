'use client';

import { cn } from '@briks/core';
import { ToastPrimitive } from '@briks/primitives';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { Icon } from '../icon';

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'bk-fixed bk-top-0 bk-z-[100] bk-flex bk-max-h-screen bk-w-full bk-flex-col-reverse bk-p-4 sm:bk-bottom-0 sm:bk-right-0 sm:bk-top-auto sm:bk-flex-col md:bk-max-w-[420px]',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const toastVariants = cva(
  'bk-group bk-pointer-events-auto bk-relative bk-flex bk-w-full bk-items-center bk-justify-between bk-space-x-4 bk-overflow-hidden bk-rounded-md bk-border bk-p-6 bk-pr-8 bk-shadow-lg bk-transition-all data-[swipe=cancel]:bk-translate-x-0 data-[swipe=end]:bk-translate-x-[var(--toast-swipe-end-x)] data-[swipe=move]:bk-translate-x-[var(--toast-swipe-move-x)] data-[swipe=move]:bk-transition-none data-[state=open]:bk-animate-in data-[state=closed]:bk-animate-out data-[swipe=end]:bk-animate-out data-[state=closed]:bk-fade-out-80 data-[state=closed]:bk-slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:bk-slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'bk-border bk-bg-background bk-text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
));
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'bk-inline-flex bk-h-8 bk-shrink-0 bk-items-center bk-justify-center bk-rounded-md bk-border bk-bg-transparent bk-px-3 bk-text-sm bk-font-medium bk-ring-offset-background bk-transition-colors hover:bk-bg-secondary focus:bk-outline-none focus:bk-ring-2 focus:bk-ring-ring focus:bk-ring-offset-2 disabled:bk-pointer-events-none disabled:bk-opacity-50 group-[.destructive]:bk-border-muted/40 group-[.destructive]:hover:bk-border-destructive/30 group-[.destructive]:hover:bk-bg-destructive group-[.destructive]:hover:bk-text-destructive-foreground group-[.destructive]:focus:bk-ring-destructive',
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'bk-absolute bk-right-2 bk-top-2 bk-rounded-md bk-p-1 bk-text-foreground/50 bk-opacity-0 bk-transition-opacity hover:bk-text-foreground focus:bk-opacity-100 focus:bk-outline-none focus:bk-ring-2 group-hover:bk-opacity-100 group-[.destructive]:bk-text-red-300 group-[.destructive]:hover:bk-text-red-50 group-[.destructive]:focus:bk-ring-red-400 group-[.destructive]:focus:bk-ring-offset-red-600',
      className,
    )}
    toast-close=''
    {...props}
  >
    <Icon name='X' className='h-4 w-4' />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('bk-text-sm bk-font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('bk-text-sm bk-opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};
