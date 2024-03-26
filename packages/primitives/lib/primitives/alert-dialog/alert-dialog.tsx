import { createContextScope, type Scope } from '@briks/core';
import { useComposedRefs } from '@briks/hooks';
import React from 'react';

import * as DialogPrimitive from '../dialog';
import { createDialogScope } from '../dialog';
import { composeEventHandlers } from '../primitive';
import { Slottable } from '../slot';

import type * as Briks from '../primitive';

/* -------------------------------------------------------------------------------------------------
 * AlertDialog
 * -----------------------------------------------------------------------------------------------*/

const ROOT_NAME = 'AlertDialog';

type ScopedProps<P> = P & {
  __scopeAlertDialog?: Scope;
};

const [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [
  createDialogScope,
]);

const useDialogScope = createDialogScope();

type DialogProps = Briks.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
interface AlertDialogProps extends Omit<DialogProps, 'modal'> {}

const AlertDialog: React.FC<AlertDialogProps> = ({
  __scopeAlertDialog,
  ...props
}: ScopedProps<AlertDialogProps>) => {
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return <DialogPrimitive.Root {...dialogScope} {...props} modal />;
};
AlertDialog.displayName = ROOT_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'AlertDialogTrigger';

type AlertDialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
interface AlertDialogTriggerProps extends DialogTriggerProps {}

const AlertDialogTrigger = React.forwardRef<AlertDialogTriggerElement, AlertDialogTriggerProps>(
  ({ __scopeAlertDialog, ...props }: ScopedProps<AlertDialogTriggerProps>, forwardedRef) => {
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return <DialogPrimitive.Trigger {...dialogScope} {...props} ref={forwardedRef} />;
  },
);
AlertDialogTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogPortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = 'AlertDialogPortal';

type DialogPortalProps = Briks.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;
interface AlertDialogPortalProps extends DialogPortalProps {}

const AlertDialogPortal: React.FC<AlertDialogPortalProps> = ({
  __scopeAlertDialog,
  ...props
}: ScopedProps<AlertDialogPortalProps>) => {
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return <DialogPrimitive.Portal {...dialogScope} {...props} />;
};
AlertDialogPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogOverlay
 * -----------------------------------------------------------------------------------------------*/

const OVERLAY_NAME = 'AlertDialogOverlay';

type AlertDialogOverlayElement = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;
interface AlertDialogOverlayProps extends DialogOverlayProps {}

const AlertDialogOverlay = React.forwardRef<AlertDialogOverlayElement, AlertDialogOverlayProps>(
  ({ __scopeAlertDialog, ...props }: ScopedProps<AlertDialogOverlayProps>, forwardedRef) => {
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return <DialogPrimitive.Overlay {...dialogScope} {...props} ref={forwardedRef} />;
  },
);
AlertDialogOverlay.displayName = OVERLAY_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'AlertDialogContent';

interface AlertDialogContentContextValue {
  cancelRef: React.MutableRefObject<AlertDialogCancelElement | null>;
}

const [AlertDialogContentProvider, useAlertDialogContentContext] =
  createAlertDialogContext<AlertDialogContentContextValue>(CONTENT_NAME);

type AlertDialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;
interface AlertDialogContentProps
  extends Omit<DialogContentProps, 'onPointerDownOutside' | 'onInteractOutside'> {}

const AlertDialogContent = React.forwardRef<AlertDialogContentElement, AlertDialogContentProps>(
  (
    { __scopeAlertDialog, children, ...props }: ScopedProps<AlertDialogContentProps>,
    forwardedRef,
  ) => {
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = React.useRef<AlertDialogContentElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = React.useRef<AlertDialogCancelElement | null>(null);

    return (
      <DialogPrimitive.WarningProvider contentName={CONTENT_NAME} titleName={TITLE_NAME}>
        <AlertDialogContentProvider scope={__scopeAlertDialog} cancelRef={cancelRef}>
          <DialogPrimitive.Content
            role='alertdialog'
            {...dialogScope}
            {...props}
            ref={composedRefs}
            onOpenAutoFocus={composeEventHandlers(props.onOpenAutoFocus, event => {
              event.preventDefault();
              cancelRef.current?.focus({ preventScroll: true });
            })}
            onPointerDownOutside={event => event.preventDefault()}
            onInteractOutside={event => event.preventDefault()}
          >
            {/**
             * We have to use `Slottable` here as we cannot wrap the `AlertDialogContentProvider`
             * around everything, otherwise the `DescriptionWarning` would be rendered straight away.
             * This is because we want the accessibility checks to run only once the content is actually
             * open and that behaviour is already encapsulated in `DialogContent`.
             */}
            <Slottable>{children}</Slottable>
            {process.env.NODE_ENV === 'development' && (
              <DescriptionWarning contentRef={contentRef} />
            )}
          </DialogPrimitive.Content>
        </AlertDialogContentProvider>
      </DialogPrimitive.WarningProvider>
    );
  },
);
AlertDialogContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogTitle
 * -----------------------------------------------------------------------------------------------*/

const TITLE_NAME = 'AlertDialogTitle';

type AlertDialogTitleElement = React.ElementRef<typeof DialogPrimitive.Title>;
type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
interface AlertDialogTitleProps extends DialogTitleProps {}

const AlertDialogTitle = React.forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(
  (props: ScopedProps<AlertDialogTitleProps>, forwardedRef) => {
    const dialogScope = useDialogScope(props.__scopeAlertDialog);
    return <DialogPrimitive.Title {...dialogScope} {...props} ref={forwardedRef} />;
  },
);
AlertDialogTitle.displayName = TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogDescription
 * -----------------------------------------------------------------------------------------------*/

const DESCRIPTION_NAME = 'AlertDialogDescription';

type AlertDialogDescriptionElement = React.ElementRef<typeof DialogPrimitive.Description>;
type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;
interface AlertDialogDescriptionProps extends DialogDescriptionProps {}

const AlertDialogDescription = React.forwardRef<
  AlertDialogDescriptionElement,
  AlertDialogDescriptionProps
>((props: ScopedProps<AlertDialogDescriptionProps>, forwardedRef) => {
  const dialogScope = useDialogScope(props.__scopeAlertDialog);
  return <DialogPrimitive.Description {...dialogScope} {...props} ref={forwardedRef} />;
});
AlertDialogDescription.displayName = DESCRIPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogAction
 * -----------------------------------------------------------------------------------------------*/

const ACTION_NAME = 'AlertDialogAction';

type AlertDialogActionElement = React.ElementRef<typeof DialogPrimitive.Close>;
type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
interface AlertDialogActionProps extends DialogCloseProps {}

const AlertDialogAction = React.forwardRef<AlertDialogActionElement, AlertDialogActionProps>(
  (props: ScopedProps<AlertDialogActionProps>, forwardedRef) => {
    const dialogScope = useDialogScope(props.__scopeAlertDialog);
    return <DialogPrimitive.Close {...dialogScope} {...props} ref={forwardedRef} />;
  },
);
AlertDialogAction.displayName = ACTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * AlertDialogCancel
 * -----------------------------------------------------------------------------------------------*/

const CANCEL_NAME = 'AlertDialogCancel';

type AlertDialogCancelElement = React.ElementRef<typeof DialogPrimitive.Close>;
interface AlertDialogCancelProps extends DialogCloseProps {}

const AlertDialogCancel = React.forwardRef<AlertDialogCancelElement, AlertDialogCancelProps>(
  (props: ScopedProps<AlertDialogCancelProps>, forwardedRef) => {
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, props.__scopeAlertDialog);
    const dialogScope = useDialogScope(props.__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return <DialogPrimitive.Close {...dialogScope} {...props} ref={ref} />;
  },
);
AlertDialogCancel.displayName = CANCEL_NAME;

/* ---------------------------------------------------------------------------------------------- */

interface DescriptionWarningProps {
  contentRef: React.RefObject<AlertDialogContentElement>;
}

const DescriptionWarning: React.FC<DescriptionWarningProps> = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`VisuallyHidden\` primitive as a wrapper around your description component.`;

  React.useEffect(() => {
    const hasDescription = document.getElementById(
      contentRef.current?.getAttribute('aria-describedby')!,
    );
    // eslint-disable-next-line no-console
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);

  return null;
};

const Root = AlertDialog;
const Trigger = AlertDialogTrigger;
const Portal = AlertDialogPortal;
const Overlay = AlertDialogOverlay;
const Content = AlertDialogContent;
const Action = AlertDialogAction;
const Cancel = AlertDialogCancel;
const Title = AlertDialogTitle;
const Description = AlertDialogDescription;

export {
  Action,
  //
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Cancel,
  Content,
  createAlertDialogScope,
  Description,
  Overlay,
  Portal,
  //
  Root,
  Title,
  Trigger,
};

export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
};
