import { Text } from '@briks/ui';

import type { TextProps } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    componentSubtitle: 'Text component is divided in semantic variants.',
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'title', 'subtitle', 'cardTitle', 'caption'],
    },
  },
} satisfies Meta<TextProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
    <div
      style={{
        display: 'grid',
        gap: '1rem',
      }}
    >
      <Text {...args} variant='title' />
      <Text {...args} variant='subtitle' />
      <Text {...args} variant='cardTitle' />
      <Text {...args} />
      <Text {...args} variant='caption' />
    </div>
  ),
};
