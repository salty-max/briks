import { Avatar, AvatarFallback, AvatarImage } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Misc/Avatar',
  component: Avatar,
  parameters: {
    componentSubtitle: 'An image element with a fallback for representing the user.',
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='https://github.com/salty-max.png' alt='@salty-max' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};
