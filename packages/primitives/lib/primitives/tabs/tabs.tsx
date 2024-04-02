import { createContextScope, type Scope } from '@briks/core';
import { useControllableState, useDirection, useId } from '@briks/hooks';
import React from 'react';

import { Presence } from '..';
import { composeEventHandlers, Primitive } from '../primitive';
import { createRovingFocusGroupScope } from '../roving-focus-group';
import * as RovingFocusGroup from '../roving-focus-group';

import type * as Briks from '../primitive';

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

const TABS_NAME = 'Tabs';

type ScopedProps<P> = P & { __scopeTabs?: Scope };
const [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope,
]);
const useRovingFocusGroupScope = createRovingFocusGroupScope();

type TabsContextValue = {
  baseId: string;
  value?: string;
  onValueChange(value: string): void;
  orientation?: TabsProps['orientation'];
  dir?: TabsProps['dir'];
  activationMode?: TabsProps['activationMode'];
};

const [TabsProvider, useTabsContext] = createTabsContext<TabsContextValue>(TABS_NAME);

type TabsElement = React.ElementRef<typeof Primitive.div>;
type RovingFocusGroupProps = Briks.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PrimitiveDivProps = Briks.ComponentPropsWithoutRef<typeof Primitive.div>;

interface TabsProps extends PrimitiveDivProps {
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab by default, if uncontrolled */
  defaultValue?: string;
  /** A function called when a new tab is selected */
  onValueChange?(value: string): void;
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly. (left & right vs up & down)
   * @defaultValue 'horizontal'
   */
  orientation?: RovingFocusGroupProps['orientation'];
  /** The direction of navigation between toolbar items. */
  dir?: RovingFocusGroupProps['dir'];
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue 'auto'
   */
  activationMode?: 'auto' | 'manual';
}

const Tabs = React.forwardRef<TabsElement, TabsProps>(
  (
    {
      __scopeTabs,
      value: valueProp,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      dir,
      activationMode = 'auto',
      ...props
    }: ScopedProps<TabsProps>,
    forwardedRef,
  ) => {
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    return (
      <TabsProvider
        scope={__scopeTabs}
        baseId={useId()}
        value={value}
        onValueChange={setValue}
        orientation={orientation}
        dir={direction}
        activationMode={activationMode}
      >
        <Primitive.div
          dir={direction}
          data-orientation={orientation}
          {...props}
          ref={forwardedRef}
        />
      </TabsProvider>
    );
  },
);

Tabs.displayName = TABS_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsList
 * -----------------------------------------------------------------------------------------------*/

const TABS_LIST_NAME = 'TabsList';

type TabsListElement = React.ElementRef<typeof Primitive.div>;
interface TabsListProps extends PrimitiveDivProps {
  loop?: RovingFocusGroupProps['loop'];
}

const TabsList = React.forwardRef<TabsListElement, TabsListProps>(
  ({ __scopeTabs, loop = true, ...props }: ScopedProps<TabsListProps>, forwardedRef) => {
    const context = useTabsContext(TABS_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);

    return (
      <RovingFocusGroup.Root
        asChild
        {...rovingFocusGroupScope}
        orientation={context.orientation}
        dir={context.dir}
        loop={loop}
      >
        <Primitive.div
          role='tablist'
          aria-orientation={context.orientation}
          {...props}
          ref={forwardedRef}
        />
      </RovingFocusGroup.Root>
    );
  },
);

TabsList.displayName = TABS_LIST_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'TabsTrigger';

type TabsTriggerElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = Briks.ComponentPropsWithoutRef<typeof Primitive.button>;
interface TabsTriggerProps extends PrimitiveButtonProps {
  value: string;
}

const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  (
    { __scopeTabs, value, disabled = false, ...props }: ScopedProps<TabsTriggerProps>,
    forwardedRef,
  ) => {
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = context.value === value;

    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!disabled}
        active={isSelected}
      >
        <Primitive.button
          type='button'
          role='tab'
          aria-selected={isSelected}
          aria-controls={contentId}
          data-state={isSelected ? 'active' : 'inactive'}
          data-disabled={disabled ? '' : undefined}
          disabled={disabled}
          id={triggerId}
          {...props}
          ref={forwardedRef}
          onMouseDown={composeEventHandlers(props.onMouseDown, event => {
            // Only call handler if it's the left button (mouse down gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onValueChange(value);
            } else {
              // Prevent focus to avoid accidental activation
              event.preventDefault();
            }
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, event => {
            if ([' ', 'Enter'].includes(event.key)) context.onValueChange(value);
          })}
          onFocus={composeEventHandlers(props.onFocus, () => {
            // Handle automatic activation if necessary
            // ie. activate tab following focus
            const isAutomaticActivation = context.activationMode !== 'manual';
            if (!isSelected && !disabled && isAutomaticActivation) {
              context.onValueChange(value);
            }
          })}
        />
      </RovingFocusGroup.Item>
    );
  },
);

TabsTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'TabsContent';

type TabsContentElement = React.ElementRef<typeof Primitive.div>;
interface TabsContentProps extends PrimitiveDivProps {
  value: string;

  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  (
    { __scopeTabs, value, forceMount, children, ...props }: ScopedProps<TabsContentProps>,
    forwardedRef,
  ) => {
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = context.value === value;
    const isMountAnimationPreventedRef = React.useRef(isSelected);

    React.useEffect(() => {
      const rAF = requestAnimationFrame(() => (isMountAnimationPreventedRef.current = false));
      return () => cancelAnimationFrame(rAF);
    }, []);

    return (
      <Presence present={forceMount || isSelected}>
        {({ present }) => (
          <Primitive.div
            data-state={isSelected ? 'active' : 'inactive'}
            data-orientation={context.orientation}
            role='tabpanel'
            aria-labelledby={triggerId}
            hidden={!present}
            id={contentId}
            tabIndex={0}
            {...props}
            ref={forwardedRef}
            style={{
              ...props.style,
              animationDuration: isMountAnimationPreventedRef.current ? '0s' : undefined,
            }}
          >
            {present && children}
          </Primitive.div>
        )}
      </Presence>
    );
  },
);

TabsContent.displayName = CONTENT_NAME;

/* -----------------------------------------------------------------------------------------------*/

function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`;
}

function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`;
}

const Root = Tabs;
const List = TabsList;
const Trigger = TabsTrigger;
const Content = TabsContent;

export {
  Content,
  createTabsScope,
  List,
  //
  Root,
  //
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Trigger,
};

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps };
