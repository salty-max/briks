import { AspectRatio } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  parameters: {
    componentSubtitle: 'Displays content within a desired ratio.',
    layout: 'padded',
  },
  args: {
    ratio: 16 / 9,
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <AspectRatio ratio={args.ratio} className='bg-muted'>
      <img
        src='https://source.unsplash.com/velo-de-sport-orange-et-noir-gare-sur-une-chaussee-en-beton-gris-pendant-la-journee-7GeprSfVqLQ?w=800&dpr=2&q=100'
        alt='Photo by Drew Beamer'
        className='absolute left-0 top-0 h-full w-full rounded-md object-cover'
      />
    </AspectRatio>
  ),
};
