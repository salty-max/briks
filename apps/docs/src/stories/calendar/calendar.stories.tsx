import { Calendar } from '@briks/ui';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Core/Calendar',
  parameters: {
    componentSubtitle: 'A date field component that allows users to enter and edit date.',
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Single: Story = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />
  );
};
