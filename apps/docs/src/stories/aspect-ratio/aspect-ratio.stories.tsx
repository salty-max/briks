import { AspectRatio } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  parameters: {
    componentSubtitle: 'Displays content within a desired ratio.',
    layout: 'centered',
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className='bg-muted'>
      <img
        src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
        alt='Photo by Drew Beamer'
        className='rounded-md object-cover'
      />
    </AspectRatio>
  ),
};
