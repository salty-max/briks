import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import axe from '../axe-helper';
import { Text } from '../../lib/components/text/text';

describe('Text', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly with default variant', () => {
    const { getByText } = render(<Text>Default Text</Text>);
    expect(getByText('Default Text').tagName).toBe('P');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Text>Accessible Text</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('with a title variant', () => {
    it('should render as an h1 element', () => {
      const { getByText } = render(<Text variant='title'>Title Text</Text>);
      expect(getByText('Title Text').tagName).toBe('H1');
    });
  });

  describe('with a subtitle variant', () => {
    it('should render as an h2 element', () => {
      const { getByText } = render(<Text variant='subtitle'>Subtitle Text</Text>);
      expect(getByText('Subtitle Text').tagName).toBe('H2');
    });
  });

  describe('with a cardTitle variant', () => {
    it('should render as an h3 element', () => {
      const { getByText } = render(<Text variant='cardTitle'>Card Title Text</Text>);
      expect(getByText('Card Title Text').tagName).toBe('H3');
    });
  });

  describe('with a caption variant', () => {
    it('should render as a small element', () => {
      const { getByText } = render(<Text variant='caption'>Caption Text</Text>);
      expect(getByText('Caption Text').tagName).toBe('SMALL');
    });
  });
});
