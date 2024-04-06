import type { Meta, StoryObj } from '@storybook/react';
import { Input, Label, Text } from '@briks/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    componentSubtitle: 'Renders an accessible label associated with controls.',
    layout: 'centered',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithControl: Story = {
  args: {},
  render: () => (
    <div className='grid gap-4'>
      <div className='space-y-2 pb-4'>
        <Text variant='cardTitle'>Wrapping control</Text>
        <Label>
          Label
          <Input type='text' placeholder='Input' />
        </Label>
      </div>

      <div className='space-y-2'>
        <Text variant='cardTitle'>Referencing control</Text>
        <Label htmlFor='input'>Label</Label>
        <Input type='text' placeholder='Input' id='input' />
      </div>
    </div>
  ),
};

export const WithInputNumber: Story = {
  args: {},
  render: () => (
    <Label>
      <span>Age:</span>
      <Input type='number' />
    </Label>
  ),
};
