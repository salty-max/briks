import { cleanup, render, RenderResult } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import axe from '../axe-helper';
import { Button } from '../../lib/components/button/button';

describe('Button', () => {
  let rendered: RenderResult;

  afterEach(() => {
    cleanup();
  });

  describe('given a default Button', () => {
    beforeEach(() => {
      rendered = render(<Button>Click me</Button>);
    });

    it('should render correctly', () => {
      expect(rendered.getByRole('button')).toHaveTextContent('Click me');
    });

    it('should have no accessibility violations', async () => {
      expect(await axe(rendered.container)).toHaveNoViolations();
    });
  });

  describe('with an icon on the left', () => {
    beforeEach(() => {
      rendered = render(<Button icon='Settings'>Settings</Button>);
    });

    it('should render the icon on the left', () => {
      const button = rendered.getByRole('button');
      const icon = rendered.getByTestId('button-icon-left');
      expect(button.firstChild).toEqual(icon);
      expect(icon).toHaveClass('lucide-settings');
    });
  });

  describe('with an icon on the right', () => {
    beforeEach(() => {
      rendered = render(
        <Button icon='Settings' iconPosition='right'>
          Settings
        </Button>,
      );
    });

    it('should render the icon on the right', () => {
      const button = rendered.getByRole('button');
      const icon = rendered.getByTestId('button-icon-right');
      expect(button.lastChild).toEqual(icon);
      expect(icon).toHaveClass('lucide-settings');
    });
  });

  describe('in a loading state', () => {
    beforeEach(() => {
      rendered = render(<Button loading>Loading</Button>);
    });

    it('should display a loader instead of children', () => {
      const button = rendered.getByRole('button');
      const icon = rendered.getByTestId('button-loader');
      expect(button.firstChild).toEqual(icon);
      expect(icon).toHaveClass('lucide-loader-circle');
    });
  });

  describe('with an asChild prop', () => {
    beforeEach(() => {
      rendered = render(
        <>
          <Button asChild>
            <span data-testid='span-slot'>Slotted Content</span>
          </Button>
        </>,
      );
    });

    it('replaces content with Slottable content', () => {
      const slot = rendered.getByTestId('span-slot');
      expect(slot).toHaveTextContent('Slotted Content');
      expect(slot).toHaveClass('bg-primary');
    });
  });
});
