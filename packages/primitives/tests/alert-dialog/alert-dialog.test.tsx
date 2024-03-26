import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { AlertDialogPrimitive } from '../../lib/primitives';
import axe from '../../../ui/tests/axe-helper';

const OPEN_TEXT = 'Open';
const CANCEL_TEXT = 'Cancel';
const ACTION_TEXT = 'Do it';
const TITLE_TEXT = 'Warning';
const DESC_TEXT = 'This is a warning.';
const OVERLAY_TEST_ID = 'alert-dialog-overlay';

const DialogTest = (props: React.ComponentProps<typeof AlertDialogPrimitive.Root>) => (
  <AlertDialogPrimitive.Root {...props}>
    <AlertDialogPrimitive.Trigger>{OPEN_TEXT}</AlertDialogPrimitive.Trigger>
    <AlertDialogPrimitive.Overlay data-testid={OVERLAY_TEST_ID} />
    <AlertDialogPrimitive.Content>
      <AlertDialogPrimitive.Title>{TITLE_TEXT}</AlertDialogPrimitive.Title>
      <AlertDialogPrimitive.Description>{DESC_TEXT}</AlertDialogPrimitive.Description>
      <AlertDialogPrimitive.Cancel>{CANCEL_TEXT}</AlertDialogPrimitive.Cancel>
      <AlertDialogPrimitive.Action>{ACTION_TEXT}</AlertDialogPrimitive.Action>
    </AlertDialogPrimitive.Content>
  </AlertDialogPrimitive.Root>
);

describe('given a default alert dialog', () => {
  let rendered: RenderResult;
  let title: HTMLElement;
  let trigger: HTMLElement;
  let cancelButton: HTMLElement;

  beforeEach(() => {
    rendered = render(<DialogTest />);
    trigger = rendered.getByText(OPEN_TEXT);
  });

  afterEach(() => {
    cleanup();
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(rendered.container)).toHaveNoViolations();
  });

  describe('after clicking the trigger', () => {
    beforeEach(() => {
      fireEvent.click(trigger);
      title = rendered.getByText(TITLE_TEXT);
      cancelButton = rendered.getByText(CANCEL_TEXT);
    });

    it('should open the content', () => {
      expect(title).toBeVisible();
      expect(cancelButton).toBeVisible();
    });

    it('should have no accessibility violations', async () => {
      expect(await axe(rendered.container)).toHaveNoViolations();
    });

    it('should focus the cancel button', () => {
      expect(cancelButton).toHaveFocus();
    });
  });
});
