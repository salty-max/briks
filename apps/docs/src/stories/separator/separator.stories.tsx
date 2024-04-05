import { Separator } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Separator',
  component: Separator,
  parameters: {
    componentSubtitle: 'Visually or semantically separates content.',
    layout: 'centered',
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <div className='space-y-1'>
        <h4 className='text-sm font-medium leading-none'>Radix Primitives</h4>
        <p className='text-muted-foreground text-sm'>An open-source UI component library.</p>
      </div>
      <Separator className='my-4' />
      <div className='flex h-5 items-center space-x-4 text-sm'>
        <div>Blog</div>
        <Separator orientation='vertical' />
        <div>Docs</div>
        <Separator orientation='vertical' />
        <div>Source</div>
      </div>
    </div>
  ),
};
