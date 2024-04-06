import { Progress } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Misc/Progress',
  component: Progress,
  parameters: {
    componentSubtitle:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    layout: 'padded',
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return <Progress value={progress} className='w-[60%]' />;
  },
};
