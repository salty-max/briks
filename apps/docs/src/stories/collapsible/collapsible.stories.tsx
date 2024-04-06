import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Icon } from '@briks/ui';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Collapsible',
  component: Collapsible,
  parameters: {
    componentSubtitle: 'An interactive component which expands/collapses a panel.',
    layout: 'centered',
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className='w-[350px] space-y-2'>
      <div className='flex items-center justify-between space-x-4 px-4'>
        <h4 className='text-sm font-semibold'>Ash captured 3 Pokemon</h4>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='sm' className='w-9 p-0'>
            <Icon name='ChevronsUpDown' className='h-4 w-4' />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='rounded-md border px-4 py-3 font-mono text-sm'>Pidgey</div>
      <CollapsibleContent className='space-y-2'>
        <div className='rounded-md border px-4 py-3 font-mono text-sm'>Caterpie</div>
        <div className='rounded-md border px-4 py-3 font-mono text-sm'>Charmander</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
