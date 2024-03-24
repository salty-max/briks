import { Button, Text, useTheme } from '@briks/ui';

function App() {
  const { theme, setTheme, darkMode, toggleDarkMode } = useTheme();

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
      <Button asChild>
        <span data-testid='toto'>Toto</span>
      </Button>
    </div>
  );
}

export default App;
