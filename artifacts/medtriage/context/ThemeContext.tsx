import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemePreferenceValue = {
  mode: ThemeMode;
  colorScheme: 'light' | 'dark';
  loading: boolean;
  setMode: (mode: ThemeMode) => Promise<void>;
};

const THEME_STORAGE_KEY = 'medtriage:theme-mode';
const ThemePreferenceContext = createContext<ThemePreferenceValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((value) => {
        if (!active) return;
        if (value === 'light' || value === 'dark' || value === 'system') {
          setModeState(value);
        }
      })
      .catch(() => {
        // Keep the system setting if the non-sensitive preference cannot be read.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const setMode = useCallback(async (nextMode: ThemeMode) => {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
    setModeState(nextMode);
  }, []);

  const colorScheme =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const value = useMemo(
    () => ({ mode, colorScheme, loading, setMode }),
    [mode, colorScheme, loading, setMode],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);
  if (!context) {
    throw new Error('useThemePreference must be used within ThemeProvider');
  }
  return context;
}
