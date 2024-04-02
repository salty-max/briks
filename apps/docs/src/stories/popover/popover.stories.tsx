import { Text, Popover, PopoverContent, PopoverTrigger, Button, Label, Input } from '@briks/ui';

import type { Meta, StoryFn } from '@storybook/react';

const meta = {
  title: 'Portals/Popover',
  parameters: {
    componentSubtitle: 'Displays rich content in a portal, triggered by a button.',
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryFn<typeof meta>;

const variables: Record<string, { label: string; defaultValue: string }> = {
  width: {
    label: 'Width',
    defaultValue: '100%',
  },
  maxWidth: {
    label: 'Max width',
    defaultValue: '300px',
  },
  height: {
    label: 'Height',
    defaultValue: '25px',
  },
  maxHeight: {
    label: 'Max height',
    defaultValue: 'none',
  },
};

export const Default: Story = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant='outline'>Open popover</Button>
    </PopoverTrigger>
    <PopoverContent className='w-80'>
      <div className='grid gap-4'>
        <div className='space-y-2'>
          <Text variant='popoverTitle'>Dimensions</Text>
          <Text variant='caption'>Set the dimensions for the layer.</Text>
        </div>
        <div className='grid gap-2'>
          {Object.entries(variables).map(([key, { label, defaultValue }]) => (
            <div key={key} className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor={key}>{label}</Label>
              <Input id={key} defaultValue={defaultValue} className='col-span-2 h-8' />
            </div>
          ))}
        </div>
      </div>
    </PopoverContent>
  </Popover>
);
