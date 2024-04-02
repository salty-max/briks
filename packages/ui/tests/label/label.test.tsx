import { cleanup, render, RenderResult } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Label } from '../../lib/components/label/label';

describe('Label', () => {
  let rendered: RenderResult;

  afterEach(() => {
    cleanup();
  });

  describe('given a default Label', () => {
    beforeEach(() => {
      rendered = render(<Label>Test Label</Label>);
    });

    it('should render correctly', () => {
      expect(rendered.container.firstChild).toBeInTheDocument();
    });

    it('should have correct default styles', () => {
      const labelElement = rendered.container.firstChild as HTMLElement;
      expect(labelElement).toHaveClass(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      );
    });

    it('should pass down additional props', () => {
      const testId = 'test-label';
      rendered.rerender(<Label data-testid={testId}>Test Label</Label>);
      const labelElement = rendered.getByTestId(testId) as HTMLElement;
      expect(labelElement).toBeInTheDocument();
    });
  });

  describe('given a custom className', () => {
    beforeEach(() => {
      rendered = render(<Label className='custom-class'>Test Label</Label>);
    });

    it('should apply the custom className', () => {
      const labelElement = rendered.container.firstChild as HTMLElement;
      expect(labelElement).toHaveClass('custom-class');
    });
  });
});
