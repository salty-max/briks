import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent } from '../../lib/components/popover';
import axe from '../axe-helper';

describe('Popover', () => {
  let rendered: RenderResult;
  let trigger: HTMLElement;
  let content: HTMLElement | null;

  const onOpenChangeMock = vi.fn();

  beforeEach(() => {
    rendered = render(
      <Popover onOpenChange={onOpenChangeMock}>
        <PopoverTrigger asChild>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid='content'>
          <div>Popover content</div>
        </PopoverContent>
      </Popover>,
    );
    trigger = rendered.getByRole('button', { name: 'Open popover' });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the trigger', () => {
    expect(trigger).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    expect(await axe(rendered.container)).toHaveNoViolations();
  });

  describe('when the trigger is clicked', () => {
    beforeEach(() => {
      fireEvent.click(trigger);
      content = rendered.getByTestId('content');
    });

    it('calls onOpenChange with true', () => {
      expect(onOpenChangeMock).toHaveBeenCalledWith(true);
    });

    it('renders the content', () => {
      content = screen.getByText('Popover content');
      expect(content).toBeInTheDocument();
    });

    it('moves focus to the content', () => {
      expect(document.activeElement).toBe(content);
    });

    it('has no accessibility violations', async () => {
      expect(await axe(rendered.container)).toHaveNoViolations();
    });

    describe('when the trigger is clicked again', () => {
      beforeEach(() => {
        fireEvent.click(trigger);
      });

      it('calls onOpenChange with false', () => {
        expect(onOpenChangeMock).toHaveBeenCalledWith(false);
      });

      it('dismisses the content', () => {
        content = screen.queryByText('Popover content');
        expect(content).not.toBeInTheDocument();
      });
    });
  });
});
