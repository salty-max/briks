import {
  Switch,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
} from '@briks/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    componentSubtitle: 'Displays a card with header, content, and footer.',
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

export const Default: Story = {
  render: () => (
    <Card className='w-[380px]'>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className=' flex items-center space-x-4 rounded-md border p-4'>
          <Icon name='BellRing' />
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>Push Notifications</p>
            <p className='text-muted-foreground text-sm'>Send notifications to device.</p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
            >
              <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>{notification.title}</p>
                <p className='text-muted-foreground text-sm'>{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button icon='Check' className='w-full'>
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};
