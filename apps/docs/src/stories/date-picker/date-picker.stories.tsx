import { DatePicker } from '@briks/ui';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'A date picker component with range and presets.',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Default: Story = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDate = (date?: Date) => {
    setDate(date);
  };

  return <DatePicker value={date} onChange={handleDate} />;
};
