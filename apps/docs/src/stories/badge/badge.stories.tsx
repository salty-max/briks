import { Badge } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Misc/Badge',
  component: Badge,
  parameters: {
    componentSubtitle: 'Displays a badge or a component that looks like a badge.',
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Badge>Badge</Badge>,
};

export const Secondary: Story = {
  render: () => <Badge variant='secondary'>Badge</Badge>,
};

export const Destructive: Story = {
  render: () => <Badge variant='destructive'>Badge</Badge>,
};

export const Outline: Story = {
  render: () => <Badge variant='outline'>Badge</Badge>,
};
