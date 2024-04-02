import { cleanup, render, RenderResult } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Input } from '../../lib/components/input/input';

describe('Input', () => {
  let rendered: RenderResult;

  afterEach(() => {
    cleanup();
  });

  describe('given a default Input', () => {
    beforeEach(() => {
      rendered = render(<Input />);
    });

    it('should render correctly', () => {
      expect(rendered.container.firstChild).toBeInTheDocument();
    });

    it('should have correct default styles', () => {
      const inputElement = rendered.container.firstChild as HTMLInputElement;
      expect(inputElement).toHaveClass(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      );
    });

    it('should pass down additional props', () => {
      const testId = 'test-input';
      rendered.rerender(<Input data-testid={testId} />);
      const inputElement = rendered.getByTestId(testId) as HTMLInputElement;
      expect(inputElement).toBeInTheDocument();
    });
  });

  describe('given a disabled Input', () => {
    beforeEach(() => {
      rendered = render(<Input disabled />);
    });

    it('should render as disabled', () => {
      const inputElement = rendered.container.firstChild as HTMLInputElement;
      expect(inputElement.disabled).toBe(true);
    });
  });

  describe('given a specific type Input', () => {
    beforeEach(() => {
      rendered = render(<Input type='password' />);
    });

    it('should render with the correct type', () => {
      const inputElement = rendered.container.firstChild as HTMLInputElement;
      expect(inputElement.type).toBe('password');
    });
  });

  describe('given a custom className', () => {
    beforeEach(() => {
      rendered = render(<Input className='custom-class' />);
    });

    it('should apply the custom className', () => {
      const inputElement = rendered.container.firstChild as HTMLElement;
      expect(inputElement).toHaveClass('custom-class');
    });
  });
});
