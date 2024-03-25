import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
  Text,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
  useTheme,
} from '../lib/components';

function App() {
  const { theme, setTheme, darkMode, toggleDarkMode } = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div className='bk-flex bk-gap-2 bk-p-4'>
      <Button icon={darkMode ? 'Moon' : 'Sun'} size='icon' onClick={() => toggleDarkMode()} />
      <Button
        loading
        onClick={() => {
          console.log('coucou');
          setTheme(theme === 'violet' ? 'neutral' : 'violet');
        }}
      >
        Toggle theme
      </Button>
      <Text>Current theme: {theme ? theme : 'neutral'}</Text>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              // eslint-disable-next-line no-console
              onClick={() => console.log('BOOM')}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Share</Button>
        </DialogTrigger>
        <DialogContent className='sm:bk-max-w-md'>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className='bk-flex bk-items-center bk-space-x-2'>
            <div className='bk-grid bk-flex-1 bk-gap-2'>
              <label htmlFor='link' className='bk-sr-only'>
                Link
              </label>
              <input id='link' defaultValue='https://ui.shadcn.com/docs/installation' readOnly />
            </div>
            <Button type='submit' size='sm' className='bk-px-3'>
              <span className='bk-sr-only'>Copy</span>
              <Icon name='Copy' className='bk-h-4 bk-w-4' />
            </Button>
          </div>
          <DialogFooter className='sm:bk-justify-start'>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Tooltip delayDuration={300} open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Text>{`I'm controlled, look I'm ${open ? 'open' : 'closed'}`}</Text>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent align='center' side='bottom' sideOffset={5}>
            Nicely done!
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </div>
  );
}

export default App;
