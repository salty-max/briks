import { Text } from '@briks/ui';

import type { TextProps } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    componentSubtitle: 'Text component is divided in semantic variants.',
    layout: 'centered',
  },

  args: {
    children: 'Lorem ipsum dolor sit amet',
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'title', 'subtitle', 'cardTitle', 'caption'],
    },
  },
} satisfies Meta<TextProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

/**
 * 5 variants are supported.
 */
export const Variants: Story = {
  args: {
    children: 'Lorem ipsum solor sit amet',
  },
  render: args => (
    <div className='grid gap-4'>
      <Text {...args} variant='title' />
      <Text {...args} variant='subtitle' />
      <Text {...args} variant='cardTitle' />
      <Text {...args} />
      <Text {...args} variant='caption' />
    </div>
  ),
};
