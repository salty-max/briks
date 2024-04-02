import { cleanup, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import axe from '../../../primitives/tests/axe-helper';
import { RadioGroup, RadioGroupItem } from '../../lib/components/radio-group';

afterEach(() => {
  cleanup();
});

describe('RadioGroup', () => {
  it('should update the group value when an item is clicked', () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(
      <RadioGroup onValueChange={handleChange} name='test-group'>
        <RadioGroupItem value='1' data-testid='Option 1' />
        <RadioGroupItem value='2' data-testid='Option 2' />
      </RadioGroup>,
    );

    fireEvent.click(getByTestId('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('1');

    fireEvent.click(getByTestId('Option 2'));
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('should only allow one item to be selected at a time', () => {
    const { getByTestId } = render(
      <RadioGroup defaultValue='1' name='test-group'>
        <RadioGroupItem value='1' data-testid='Option 1' />
        <RadioGroupItem value='2' data-testid='Option 2' />
      </RadioGroup>,
    );

    expect(getByTestId('Option 1')).toBeChecked();
    fireEvent.click(getByTestId('Option 2'));
    expect(getByTestId('Option 2')).toBeChecked();
    expect(getByTestId('Option 1')).not.toBeChecked();
  });

  it('should not change selection when the group or items are disabled', () => {
    const { getByTestId } = render(
      <RadioGroup disabled name='test-group'>
        <RadioGroupItem value='1' data-testid='Option 1' disabled />
        <RadioGroupItem value='2' data-testid='Option 2' />
      </RadioGroup>,
    );

    fireEvent.click(getByTestId('Option 2'));
    expect(getByTestId('Option 1')).not.toBeChecked();
    expect(getByTestId('Option 2')).not.toBeChecked();
  });

  it('should not navigate between items when the group is disabled', () => {
    const { getByTestId } = render(
      <RadioGroup disabled name='test-group'>
        <RadioGroupItem value='1' data-testid='Option 1' />
        <RadioGroupItem value='2' data-testid='Option 2' />
      </RadioGroup>,
    );

    getByTestId('Option 1').focus();
    fireEvent.keyDown(getByTestId('Option 1'), { key: 'ArrowDown' });
    // Since the group is disabled, focus should not move
    expect(getByTestId('Option 1')).toHaveFocus();
  });

  it('should pass accessibility checks', async () => {
    const { container } = render(
      <RadioGroup name='test-group'>
        <RadioGroupItem value='1' data-testid='Option 1' />
        <RadioGroupItem value='2' data-testid='Option 2' />
      </RadioGroup>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  // Additional props passed to the underlying DOM element
  it('passes additional props to the underlying DOM element', () => {
    const { getByTestId } = render(
      <RadioGroup data-testid='group' name='test-group'>
        <RadioGroupItem value='1' data-testid='Option 1' />
      </RadioGroup>,
    );

    expect(getByTestId('group')).toBeInTheDocument();
  });
});
