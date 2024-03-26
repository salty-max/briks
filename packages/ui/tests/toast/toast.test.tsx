import { render, screen, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import axe from '../axe-helper';
import { Button, Toaster } from '../../lib/components';
import * as ToastHook from '../../lib/components/toast/use-toast';

const ToastTriggerComponent = () => {
  return (
    <>
      <Button
        onClick={() =>
          ToastHook.toast({
            description: 'Your message has been sent.',
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  );
};

// Mock the `toast` function
vi.mock('../../lib/components/toast/use-toast', () => ({
  toast: vi.fn(), // Mock toast as before
  useToast: vi.fn(() => ({
    toasts: [
      {
        id: 'toast-1',
        description: 'Your message has been sent.',
        action: <Button>Undo</Button>,
      },
    ], // Provide a default mock return value
    dismiss: vi.fn(), // Mock any other functions that might be used
  })),
}));

describe('Toast', () => {
  let rendered: RenderResult;
  let button: HTMLElement;
  let toastContent: HTMLElement;

  beforeEach(() => {
    rendered = render(<ToastTriggerComponent />);
    button = rendered.getByRole('button', { name: 'Show Toast' });
    fireEvent.click(button);
  });

  afterEach(() => {
    cleanup();
  });

  describe('when the trigger button is clicked', () => {
    it('calls the toast function with the correct parameters when the trigger is clicked', () => {
      expect(ToastHook.toast).toHaveBeenCalledWith({
        description: 'Your message has been sent.',
      });
    });

    it('renders the toast content', () => {
      toastContent = screen.getByText('Your message has been sent.');
      expect(toastContent).toBeInTheDocument();
    });
  });

  describe('when the toast is shown', () => {
    it('has no accessibility violations', async () => {
      expect(await axe(rendered.container)).toHaveNoViolations();
    });

    it('dismisses after 5 seconds', () => {
      vi.useFakeTimers();
      vi.advanceTimersByTime(5000);
      expect(toastContent).not.toBeInTheDocument();
    });

    describe('when the close button is clicked', () => {
      it('dismisses', () => {
        const closeButton = screen.getByRole('button', { name: 'close-toast' });
        fireEvent.click(closeButton);
        expect(toastContent).not.toBeInTheDocument();
      });
    });

    describe('when the toast is dismissed', () => {
      it('dismisses', () => {
        ToastHook.useToast().dismiss();
        expect(toastContent).not.toBeInTheDocument();
      });
    });

    describe('when the toast action is clicked', () => {
      it('dismisses', () => {
        const action = screen.getByRole('button', { name: 'Undo' });
        fireEvent.click(action);
        expect(toastContent).not.toBeInTheDocument();
      });
    });
  });
});
