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
  useTheme,
} from '@briks/ui';

function App() {
  const { theme, setTheme, darkMode, toggleDarkMode } = useTheme();

  return (
    <div className='flex gap-4 p-4'>
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
      <Button asChild>
        <span data-testid='toto'>Toto</span>
      </Button>
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
              <Button type='button' variant='destructive'>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
