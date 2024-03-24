/* eslint-disable no-unused-vars */
import React from 'react';

import briksConfig from '../../../briks.config.json';
import { Theme, themes } from './themes';

type DarkMode = 'enabled' | 'disabled';
type ThemeName = keyof typeof themes;

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName | null;
  storageKey?: string;
}

interface ThemeProviderState {
  theme?: ThemeName | null;
  darkMode: DarkMode;
  setTheme: (theme: ThemeName) => void;
  toggleDarkMode: () => void;
}

const initialState: ThemeProviderState = {
  theme: null,
  darkMode: 'disabled',
  setTheme: () => null,
  toggleDarkMode: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

function ThemeProvider({
  children,
  defaultTheme = null,
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const cachedDarkMode = localStorage.getItem('dark-mode') as DarkMode | null;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const systemValue: DarkMode = systemPrefersDark ? 'enabled' : 'disabled';

  const allThemes: Record<string, Theme> = {
    ...themes,
    ...briksConfig.customThemes,
  };

  function getInitialTheme(): ThemeName {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme && allThemes[storedTheme]) {
      return storedTheme as ThemeName;
    }

    const configTheme = briksConfig.defaultTheme;
    if (configTheme && allThemes[configTheme]) {
      return configTheme as ThemeName;
    }

    // Fallback to 'defaultTheme' if no valid theme is found in localStorage or config
    // Ensure 'defaultTheme' is a valid key in 'allThemes', or choose a specific valid theme as the final fallback
    return defaultTheme || 'neutral';
  }

  const [theme, setThemeState] = React.useState<ThemeName | null>(getInitialTheme());
  const [darkMode, setDarkMode] = React.useState<DarkMode>(cachedDarkMode ?? systemValue);

  // Listen to system theme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches ? 'enabled' : 'disabled');
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('dark');
    if (darkMode === 'enabled') root.classList.add('dark');

    if (theme) {
      const selectedTheme = themes[theme];
      if (!selectedTheme) return;

      const lightVars = selectedTheme.light;
      const darkVars = selectedTheme.dark;

      const rootCssText = Object.entries(lightVars)
        .map(([key, value]) => `--${key}: ${value};`)
        .join('\n');

      const darkCssText = Object.entries(darkVars)
        .map(([key, value]) => `--${key}: ${value};`)
        .join('\n');

      let styleElement = document.head.querySelector('style#dynamic-theme-vars');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'dynamic-theme-vars';
        document.head.appendChild(styleElement);
      }

      styleElement.textContent = `
        :root { ${rootCssText} }
        .dark { ${darkCssText} }
      `;
    }
  }, [theme, darkMode]);

  function setTheme(newTheme: ThemeName) {
    if (!allThemes[newTheme]) {
      // eslint-disable-next-line no-console
      console.warn(`Theme "${newTheme}" does not exist.`);
      return;
    }

    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  }

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      darkMode,
      toggleDarkMode: () => {
        const newDarkMode = darkMode === 'enabled' ? 'disabled' : 'enabled';
        localStorage.setItem('dark-mode', newDarkMode);
        setDarkMode(newDarkMode);
      },
    }),
    [theme, darkMode, storageKey],
  );

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themeNames = Object.keys(themes) as ThemeName[];

export { themeNames, ThemeProvider, useTheme };
export type { ThemeName as Theme };
