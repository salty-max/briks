import { Meta, StoryFn } from '@storybook/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
} from '@briks/ui';

const meta: Meta = {
  title: 'Atoms/AlertDialog',
  parameters: {
    componentSubtitle:
      'A modal dialog that interrupts the user with important content and expects a response.',
    layout: 'centered',
  },
};

export default meta;
type Story = StoryFn<typeof meta>;

export const Basic: Story = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant='outline'>Show Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const Destructive: Story = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant='outline'>Show Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          destructive
          // eslint-disable-next-line no-console
          onClick={() => console.log('BOOM')}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
