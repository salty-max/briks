import { createContextScope, type Scope } from '@briks/core';
import { useComposedRefs, usePrevious, useSize } from '@briks/hooks';
import React from 'react';

import { Presence } from '..';
import { composeEventHandlers, Primitive } from '../primitive';

import type * as Briks from '../primitive';

/* -------------------------------------------------------------------------------------------------
 * Radio
 * -----------------------------------------------------------------------------------------------*/

const RADIO_NAME = 'Radio';

type ScopedProps<P> = P & { __scopeRadio?: Scope };
const [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);

type RadioContextValue = { checked: boolean; disabled?: boolean };
const [RadioProvider, useRadioContext] = createRadioContext<RadioContextValue>(RADIO_NAME);

type RadioElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = Briks.ComponentPropsWithoutRef<typeof Primitive.button>;
interface RadioProps extends PrimitiveButtonProps {
  checked?: boolean;
  required?: boolean;
  onCheck?(): void;
}

const Radio = React.forwardRef<RadioElement, RadioProps>(
  (
    {
      __scopeRadio,
      checked = false,
      name,
      required,
      disabled,
      value = 'on',
      onCheck,
      ...radioProps
    }: ScopedProps<RadioProps>,
    forwardedRef,
  ) => {
    const [button, setButton] = React.useState<HTMLButtonElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, node => setButton(node));
    const hasConsumerStoppedPropagationRef = React.useRef(false);
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = button ? Boolean(button.closest('form')) : true;

    return (
      <RadioProvider scope={__scopeRadio} checked={checked} disabled={disabled}>
        <Primitive.button
          type='button'
          role='radio'
          aria-label={name}
          aria-checked={checked}
          data-state={getState(checked)}
          data-disabled={disabled ? '' : undefined}
          disabled={disabled}
          value={value}
          {...radioProps}
          ref={composedRefs}
          onClick={composeEventHandlers(radioProps.onClick, event => {
            // Radios cannot be unchecked so we only communicate a checked state
            if (!checked) onCheck?.();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              // If radio is in a form, stop propagation fron the button so that we only propagate
              // one click event (from the input). We propagate changes fron an input so that native
              // form validation works and form events reflect radio updates.
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })}
        />
        {isFormControl && (
          <BubbleInput
            control={button}
            bubbles={!hasConsumerStoppedPropagationRef.current}
            name={name}
            value={value}
            checked={checked}
            required={required}
            disabled={disabled}
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            style={{ transform: 'translateX(-100%)' }}
          />
        )}
      </RadioProvider>
    );
  },
);

Radio.displayName = RADIO_NAME;

/* -------------------------------------------------------------------------------------------------
 * RadioIndicator
 * -----------------------------------------------------------------------------------------------*/

const INDICATOR_NAME = 'RadioIndicator';

type RadioIndicatorElement = React.ElementRef<typeof Primitive.span>;
type PrimitiveSpanProps = Briks.ComponentPropsWithoutRef<typeof Primitive.span>;
interface RadioIndicatorProps extends PrimitiveSpanProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const RadioIndicator = React.forwardRef<RadioIndicatorElement, RadioIndicatorProps>(
  (
    { __scopeRadio, forceMount, ...indicatorProps }: ScopedProps<RadioIndicatorProps>,
    forwardedRef,
  ) => {
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);

    return (
      <Presence present={forceMount || context.checked}>
        <Primitive.span
          data-state={getState(context.checked)}
          data-disabled={context.disabled ? '' : undefined}
          {...indicatorProps}
          ref={forwardedRef}
        />
      </Presence>
    );
  },
);

RadioIndicator.displayName = INDICATOR_NAME;

/* ---------------------------------------------------------------------------------------------- */

type InputProps = Briks.ComponentPropsWithoutRef<'input'>;
interface BubbleInputProps extends Omit<InputProps, 'checked'> {
  checked: boolean;
  control: HTMLElement | null;
  bubbles: boolean;
}

const BubbleInput = ({ control, checked, bubbles = true, ...inputProps }: BubbleInputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);

  // Bubble checked change to parents (e.g form change event)
  React.useEffect(() => {
    const input = ref.current!;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor;
    const setChecked = descriptor.set;

    if (prevChecked !== checked && setChecked) {
      const event = new Event('click', { bubbles });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);

  return (
    <input
      type='radio'
      aria-hidden
      defaultChecked={checked}
      {...inputProps}
      tabIndex={-1}
      ref={ref}
      style={{
        ...inputProps.style,
        ...controlSize,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
      }}
    />
  );
};

function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked';
}

export {
  createRadioScope,
  //
  Radio,
  RadioIndicator,
};

export type { RadioIndicatorProps, RadioProps };
