import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import axe from '../axe-helper';
import { Switch } from '../../lib/components/switch';

afterEach(() => {
  cleanup();
});

describe('Switch', () => {
  it('toggles its checked state when clicked', () => {
    const handleChange = vi.fn();
    render(<Switch aria-label='Toggle switch' onCheckedChange={handleChange} />);

    const switchButton = screen.getByRole('switch');
    fireEvent.click(switchButton);
    expect(handleChange).toHaveBeenCalledWith(true);

    fireEvent.click(switchButton);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('should pass accessibility checks', async () => {
    const rendered = render(<Switch aria-label='Toggle switch' />);
    expect(await axe(rendered.container)).toHaveNoViolations();
  });

  it('does not toggle when disabled', () => {
    const handleChange = vi.fn();
    render(<Switch aria-label='Toggle switch' disabled onCheckedChange={handleChange} />);

    const switchButton = screen.getByRole('switch');
    fireEvent.click(switchButton);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
