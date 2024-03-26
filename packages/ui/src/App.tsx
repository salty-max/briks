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
  Label,
  RadioGroup,
  RadioGroupItem,
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
    <div className='flex gap-2 p-4'>
      <Button icon={darkMode ? 'Moon' : 'Sun'} size='icon' onClick={() => toggleDarkMode()} />
      <Button
        icon='Palette'
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
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <label htmlFor='link' className='sr-only'>
                Link
              </label>
              <input id='link' defaultValue='https://ui.shadcn.com/docs/installation' readOnly />
            </div>
            <Button type='submit' size='sm' className='px-3'>
              <span className='sr-only'>Copy</span>
              <Icon name='Copy' className='h-4 w-4' />
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
      <RadioGroup defaultValue='comfortable' className='grid space-y-0.5'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='default' id='r1' />
          <Label htmlFor='r1'>Default</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='comfortable' id='r2' />
          <Label htmlFor='r2'>Comfortable</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='compact' id='r3' />
          <Label htmlFor='r3'>Compact</Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default App;
