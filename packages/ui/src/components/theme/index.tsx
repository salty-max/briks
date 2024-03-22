/* eslint-disable no-unused-vars */
import React from "react";
import { themes } from "./themes";

const themesNames = [
  "none",
  "zinc",
  "slate",
  "stone",
  "neutral",
  "gray",
  "orange",
  "rose",
  "red",
  "blue",
  "green",
  "yellow",
  "violet",
];
type ThemeTuple = typeof themesNames;
type Theme = ThemeTuple[number];
type DarkMode = "enabled" | "disabled";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme | null;
  storageKey?: string;
}

interface ThemeProviderState {
  theme?: Theme | null;
  darkMode: DarkMode;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
}

const initialState: ThemeProviderState = {
  theme: null,
  darkMode: "disabled",
  setTheme: () => null,
  toggleDarkMode: () => null,
};

const ThemeProviderContext =
  React.createContext<ThemeProviderState>(initialState);

function ThemeProvider({
  children,
  defaultTheme = null,
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const cachedTheme = localStorage.getItem(storageKey);
  const cachedDarkMode = localStorage.getItem("dark-mode") as DarkMode | null;
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const systemValue: DarkMode = systemPrefersDark ? "enabled" : "disabled";

  const [theme, setTheme] = React.useState<Theme | null>(
    themesNames.includes(cachedTheme ?? "") ? cachedTheme : defaultTheme,
  );
  const [darkMode, setDarkMode] = React.useState<DarkMode>(
    cachedDarkMode ?? systemValue,
  );

  // Listen to system theme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches ? "enabled" : "disabled");
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("dark");
    if (darkMode === "enabled") root.classList.add("dark");

    if (theme) {
      const selectedTheme = themes[theme];
      if (!selectedTheme) return;

      const lightVars = selectedTheme.light;
      const darkVars = selectedTheme.dark;

      const rootCssText = Object.entries(lightVars)
        .map(([key, value]) => `--${key}: ${value};`)
        .join("\n");

      const darkCssText = Object.entries(darkVars)
        .map(([key, value]) => `--${key}: ${value};`)
        .join("\n");

      let styleElement = document.head.querySelector(
        "style#dynamic-theme-vars",
      );
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "dynamic-theme-vars";
        document.head.appendChild(styleElement);
      }

      styleElement.textContent = `
        :root { ${rootCssText} }
        .dark { ${darkCssText} }
      `;
    }
  }, [theme, darkMode]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
      darkMode,
      toggleDarkMode: () => {
        const newDarkMode = darkMode === "enabled" ? "disabled" : "enabled";
        localStorage.setItem("dark-mode", newDarkMode);
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme, themesNames as themes };
export type { Theme };
