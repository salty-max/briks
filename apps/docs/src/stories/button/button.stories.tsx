import { fn, userEvent, within, expect } from '@storybook/test';

import { Button } from '@briks/ui';

import type { ButtonProps } from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<ButtonProps> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    componentSubtitle: 'Displays a button or a component that looks like a button.',
    layout: 'centered',
  },

  args: {
    onClick: fn(),
  },

  argTypes: {
    icon: { control: 'text' },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    asChild: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Click me',
  },
  render: args => <Button {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('When', async () => {
      await userEvent.click(button);
    });

    await step('Then', async () => {
      await expect(canvas.getByText('Click me')).toBeInTheDocument();
    });
  },
};

/**
 * 6 variants are supported.
 */
export const Variants: Story = {
  args: {
    children: 'Click me',
  },
  render: args => (
    <div className='grid gap-4'>
      <Button {...args} variant='primary'>
        Click me
      </Button>
      <Button {...args} variant='destructive'>
        Click me
      </Button>
      <Button {...args} variant='outline'>
        Click me
      </Button>
      <Button {...args} variant='secondary'>
        Click me
      </Button>
      <Button {...args} variant='ghost'>
        Click me
      </Button>
      <Button {...args} variant='link'>
        Click me
      </Button>
    </div>
  ),
};

/**
 * 4 sizes are supported.
 */
export const Sizes: Story = {
  args: {},
  render: args => (
    <div className='grid gap-4'>
      <Button {...args} size='lg'>
        Click me
      </Button>
      <Button {...args} size='default'>
        Click me
      </Button>
      <Button {...args} icon='Bell' size='icon' />
      <Button {...args} size='sm'>
        Click me
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Send',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Send',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Send',
    icon: 'Send',
  },
};

export const WithIconRight: Story = {
  args: {
    children: 'Send',
    icon: 'Send',
    iconPosition: 'right',
  },
};
