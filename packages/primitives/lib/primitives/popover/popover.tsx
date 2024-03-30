import { createContextScope, type Scope } from '@briks/core';
import { useComposedRefs, useControllableState, useFocusGuards, useId } from '@briks/hooks';
import { hideOthers } from 'aria-hidden';
import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import * as PopperPrimitive from '../popper';
import { createPopperScope } from '../popper';
import { Portal as PortalPrimitive } from '../portal';
import { Presence } from '../presence';
import { composeEventHandlers, Primitive } from '../primitive';
import { Slot } from '../slot';

import type * as Briks from '../primitive';

/* -------------------------------------------------------------------------------------------------
 * Popover
 * -----------------------------------------------------------------------------------------------*/

const POPOVER_NAME = 'Popover';

type ScopedProps<P> = P & { __scopePopover?: Scope };
const [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [
  createPopperScope,
]);
const usePopperScope = createPopperScope();

type PopoverContextValue = {
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  hasCustomAnchor: boolean;
  onCustomAnchorAdd(): void;
  onCustomAnchorRemove(): void;
  modal: boolean;
};

const [PopoverProvider, usePopoverContext] =
  createPopoverContext<PopoverContextValue>(POPOVER_NAME);

interface PopoverProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

const Popover: React.FC<PopoverProps> = ({
  __scopePopover,
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  modal = false,
}: ScopedProps<PopoverProps>) => {
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React.useState(false);
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <PopperPrimitive.Root {...popperScope}>
      <PopoverProvider
        scope={__scopePopover}
        contentId={useId()}
        triggerRef={triggerRef}
        open={open}
        onOpenChange={setOpen}
        onOpenToggle={React.useCallback(() => setOpen(open => !open), [setOpen])}
        hasCustomAnchor={hasCustomAnchor}
        onCustomAnchorAdd={React.useCallback(() => setHasCustomAnchor(true), [])}
        onCustomAnchorRemove={React.useCallback(() => setHasCustomAnchor(false), [])}
        modal={modal}
      >
        {children}
      </PopoverProvider>
    </PopperPrimitive.Root>
  );
};

Popover.displayName = POPOVER_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverAnchor
 * -----------------------------------------------------------------------------------------------*/

const ANCHOR_NAME = 'PopoverAnchor';

type PopoverAnchorElement = React.ElementRef<typeof PopperPrimitive.Anchor>;
type PopperAnchorProps = Briks.ComponentPropsWithoutRef<typeof PopperPrimitive.Anchor>;
interface PopoverAnchorProps extends PopperAnchorProps {}

const PopoverAnchor = React.forwardRef<PopoverAnchorElement, PopoverAnchorProps>(
  ({ __scopePopover, ...props }: ScopedProps<PopoverAnchorProps>, forwardedRef) => {
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;

    React.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);

    return <PopperPrimitive.Anchor {...popperScope} {...props} ref={forwardedRef} />;
  },
);

PopoverAnchor.displayName = ANCHOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'PopoverTrigger';

type PopoverTriggerElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = Briks.ComponentPropsWithoutRef<typeof Primitive.button>;
interface PopoverTriggerProps extends PrimitiveButtonProps {}

const PopoverTrigger = React.forwardRef<PopoverTriggerElement, PopoverTriggerProps>(
  ({ __scopePopover, ...props }: ScopedProps<PopoverTriggerProps>, forwardedRef) => {
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);

    const trigger = (
      <Primitive.button
        type='button'
        aria-haspopup='dialog'
        aria-expanded={context.open}
        aria-controls={context.contentId}
        data-state={getState(context.open)}
        {...props}
        ref={composedTriggerRef}
        onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
      />
    );

    return context.hasCustomAnchor ? (
      trigger
    ) : (
      <PopperPrimitive.Anchor asChild {...popperScope}>
        {trigger}
      </PopperPrimitive.Anchor>
    );
  },
);

PopoverTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverPortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = 'PopoverPortal';

type PortalConextValue = { forceMount?: true };
const [PortalProvider, usePortalContext] = createPopoverContext<PortalConextValue>(PORTAL_NAME, {
  forceMount: undefined,
});

type PortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
interface PopoverPortalProps {
  children?: React.ReactNode;
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container'];
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const PopoverPortal: React.FC<PopoverPortalProps> = ({
  __scopePopover,
  children,
  container,
  forceMount,
}: ScopedProps<PopoverPortalProps>) => {
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);

  return (
    <PortalProvider scope={__scopePopover} forceMount={forceMount}>
      <Presence present={forceMount || context.open}>
        <PortalPrimitive asChild container={container}>
          {children}
        </PortalPrimitive>
      </Presence>
    </PortalProvider>
  );
};

PopoverPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'PopoverContent';

interface PopoverContentProps extends PopoverContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const PopoverContent = React.forwardRef<PopoverContentTypeElement, PopoverContentProps>(
  (props: ScopedProps<PopoverContentProps>, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);

    return (
      <Presence present={forceMount || context.open}>
        {context.modal ? (
          <PopoverContentModal {...contentProps} ref={forwardedRef} />
        ) : (
          <PopoverContentNonModal {...contentProps} ref={forwardedRef} />
        )}
      </Presence>
    );
  },
);

PopoverContent.displayName = CONTENT_NAME;

/* -----------------------------------------------------------------------------------------------*/

type PopoverContentTypeElement = PopoverContentImplElement;
interface PopoverContentTypeProps
  extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {}

const PopoverContentModal = React.forwardRef<PopoverContentTypeElement, PopoverContentTypeProps>(
  (props: ScopedProps<PopoverContentTypeProps>, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = React.useRef(false);

    // aria-hide everything except the content (better supported equivalent to setting aria-modal)
    React.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);

    return (
      <RemoveScroll as={Slot} allowPinchZoom>
        <PopoverContentImpl
          {...props}
          ref={composedRefs}
          // We make sure we're not trapping once it's been closed
          // (closed !== unmounted when animating out)
          trapFocus={context.open}
          disableOutsidePointerEvents
          onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, event => {
            event.preventDefault();
            if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
          })}
          onPointerDownOutside={composeEventHandlers(
            props.onPointerDownOutside,
            event => {
              const { originalEvent } = event.detail;
              const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

              isRightClickOutsideRef.current = isRightClick;
            },
            { checkForDefaultPrevented: false },
          )}
          // When focus id trapped, a `focusout` event may still happen.
          // We make sure we don't trigger our `onDismiss` in such case.
          onFocusOutside={composeEventHandlers(
            props.onFocusOutside,
            event => event.preventDefault(),
            { checkForDefaultPrevented: false },
          )}
        />
      </RemoveScroll>
    );
  },
);

const PopoverContentNonModal = React.forwardRef<PopoverContentTypeElement, PopoverContentTypeProps>(
  (props: ScopedProps<PopoverContentTypeProps>, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = React.useRef(false);
    const hasPointerDownOutsideRef = React.useRef(false);

    return (
      <PopoverContentImpl
        {...props}
        ref={forwardedRef}
        trapFocus={false}
        disableOutsidePointerEvents={false}
        onCloseAutoFocus={event => {
          props.onCloseAutoFocus?.(event);

          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            // Always prevent auto focus because we either focus manually or want user agent focus
            event.preventDefault();
          }

          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        }}
        onInteractOutside={event => {
          props.onInteractOutside?.(event);

          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === 'pointerdown')
              hasPointerDownOutsideRef.current = true;
          }

          // Prevent dismissing when clicking the trigger.
          // As the trigger is already setup to close, without doing so would
          // cause it to close and immediately open.
          const target = event.target as HTMLElement;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();

          // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
          // we will get the pointer down outside event on the trigger, but then a subsequent
          // focus outside event on the container, we ingore any focus outside event when we've
          // already had a pointer down outside event.
          if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef.current)
            event.preventDefault();
        }}
      />
    );
  },
);

/* -----------------------------------------------------------------------------------------------*/

type PopoverContentImplElement = React.ElementRef<typeof PopperPrimitive.Content>;
type FocusScopeProps = Briks.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = Briks.ComponentPropsWithoutRef<typeof DismissableLayer>;
type PopperContentProps = Briks.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
interface PopoverContentImplProps
  extends Omit<PopperContentProps, 'onPlaced'>,
    Omit<DismissableLayerProps, 'onDismiss'> {
  /**
   * Whether focus should be trapped within the `Popover`
   * (default: false)
   */
  trapFocus?: FocusScopeProps['trapped'];

  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'];

  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'];
}

const PopoverContentImpl = React.forwardRef<PopoverContentImplElement, PopoverContentImplProps>(
  (
    {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...props
    }: ScopedProps<PopoverContentImplProps>,
    forwardedRef,
  ) => {
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);

    // Make sure the whole tree has focus guards as our `Popover` mat be
    // the last element in the DOM (because of the `Portal`)
    useFocusGuards();

    return (
      <FocusScope
        asChild
        loop
        trapped={trapFocus}
        onMountAutoFocus={onOpenAutoFocus}
        onUnmountAutoFocus={onCloseAutoFocus}
      >
        <DismissableLayer
          asChild
          disableOutsidePointerEvents={disableOutsidePointerEvents}
          onInteractOutside={onInteractOutside}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onDismiss={() => context.onOpenChange(false)}
        >
          <PopperPrimitive.Content
            data-state={getState(context.open)}
            role='dialog'
            id={context.contentId}
            {...popperScope}
            {...props}
            ref={forwardedRef}
            style={{
              ...props.style,
              // re-namespace to avoid collision
              ...{
                '--popover-content-transform-origin': 'var(--popper-transform-origin)',
                '--popover-content-available-width': 'var(--popper-available-width)',
                '--popover-content-available-height': 'var(--popper-available-height)',
                '--popover-trigger-width': 'var(--popper-trigger-width)',
                '--popover-trigger-height': 'var(--popper-trigger-height)',
              },
            }}
          />
        </DismissableLayer>
      </FocusScope>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * PopoverClose
 * -----------------------------------------------------------------------------------------------*/

const CLOSE_NAME = 'PopoverClose';

type PopoverCloseElement = React.ElementRef<typeof Primitive.button>;
interface PopoverCloseProps extends PrimitiveButtonProps {}

const PopoverClose = React.forwardRef<PopoverCloseElement, PopoverCloseProps>(
  ({ __scopePopover, ...props }: ScopedProps<PopoverCloseProps>, forwardedRef) => {
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);

    return (
      <Primitive.button
        type='button'
        aria-label='Close'
        onClick={composeEventHandlers(props.onClick, () => context.onOpenChange(false))}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);

PopoverClose.displayName = CLOSE_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverArrow
 * -----------------------------------------------------------------------------------------------*/

const ARROW_NAME = 'PopoverArrow';

type PopoverArrowElement = React.ElementRef<typeof PopperPrimitive.Arrow>;
type PopperArrowProps = Briks.ComponentPropsWithoutRef<typeof PopperPrimitive.Arrow>;
interface PopoverArrowProps extends PopperArrowProps {}

const PopoverArrow = React.forwardRef<PopoverArrowElement, PopoverArrowProps>(
  ({ __scopePopover, ...props }: ScopedProps<PopoverArrowProps>, forwardedRef) => {
    const popperScope = usePopperScope(__scopePopover);

    return <PopperPrimitive.Arrow {...popperScope} {...props} ref={forwardedRef} />;
  },
);

PopoverArrow.displayName = ARROW_NAME;

/* -----------------------------------------------------------------------------------------------*/

function getState(open: boolean) {
  return open ? 'open' : 'closed';
}

const Root = Popover;
const Anchor = PopoverAnchor;
const Trigger = PopoverTrigger;
const Portal = PopoverPortal;
const Content = PopoverContent;
const Close = PopoverClose;
const Arrow = PopoverArrow;

export {
  Anchor,
  Arrow,
  Close,
  Content,
  createPopoverScope,
  //
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  Portal,
  //
  Root,
  Trigger,
};

export type {
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverPortalProps,
  PopoverProps,
  PopoverTriggerProps,
};
