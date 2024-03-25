// TODO: Replace labels and inputs with briks components
import { Meta, StoryFn } from '@storybook/react';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Icon,
} from '@briks/ui';

import './style.css';

const meta: Meta = {
  title: 'Atoms/Dialog',
  parameters: {
    componentSubtitle:
      'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryFn<typeof meta>;

export const Basic: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant='outline'>Edit Profile</Button>
    </DialogTrigger>
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <label
            htmlFor='name'
            style={{
              textAlign: 'right',
            }}
          >
            Name
          </label>
          <input
            id='name'
            defaultValue='Pedro Duarte'
            style={{
              gridColumn: 'span 3 / span 3',
            }}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <label
            htmlFor='username'
            style={{
              textAlign: 'right',
            }}
          >
            Username
          </label>
          <input
            id='username'
            defaultValue='@peduarte'
            style={{
              gridColumn: 'span 3 / span 3',
            }}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type='submit'>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const WithCustomCloseButton: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant='outline'>Share</Button>
    </DialogTrigger>
    <DialogContent className='sm:max-w-md'>
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
      </DialogHeader>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            flex: 1,
            gap: '0.5rem',
          }}
        >
          <label htmlFor='link' className='sr-only'>
            Link
          </label>
          <input id='link' defaultValue='https://ui.shadcn.com/docs/installation' readOnly />
        </div>
        <Button
          type='submit'
          size='sm'
          style={{
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
          }}
        >
          <span className='sr-only'>Copy</span>
          <Icon
            name='Copy'
            style={{
              width: '1rem',
              height: '1rem',
            }}
          />
        </Button>
      </div>
      <DialogFooter className='sm:justify-start'>
        <DialogClose asChild>
          <Button type='button' variant='secondary'>
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
