import type { Meta, StoryFn } from '@storybook/react';
import { Button, toast, ToastAction } from '@briks/ui';

const meta = {
  title: 'Portals/Toast',
  parameters: {
    componentSubtitle: 'A succinct message that is displayed temporarily.',
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryFn<typeof meta>;

export const Simple: Story = () => (
  <>
    <Button
      onClick={() =>
        toast({
          description: 'Your message has been sent.',
        })
      }
    >
      Show Toast
    </Button>
  </>
);

export const WithTitle: Story = () => (
  <>
    <Button
      onClick={() =>
        toast({
          title: 'Success',
          description: 'Your message has been sent.',
        })
      }
    >
      Show Toast
    </Button>
  </>
);

export const WithAction: Story = () => (
  <>
    <Button
      onClick={() =>
        toast({
          title: 'Upgrade available',
          description: 'A new version of your app is available. Download now.',
          action: <ToastAction altText='Download'>Download</ToastAction>,
        })
      }
    >
      Show Toast
    </Button>
  </>
);

export const Destructive: Story = () => (
  <>
    <Button
      onClick={() =>
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
      }
    >
      Show Toast
    </Button>
  </>
);
