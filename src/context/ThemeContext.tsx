import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';

export type ThemeContextType = 'light' | 'dark';

const ThemeContext = createContext<ThemeContextType>('light');

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeContextType>('light');

  useEffect(() => {
    if (
      localStorage.getItem('VCLASS_COLOR_MODE') === 'dark' ||
      (!('VCLASS_COLOR_MODE' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
