import { useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark';

let currentOverride: ColorScheme | null = null;
const listeners = new Set<(scheme: ColorScheme) => void>();

export function setColorSchemeOverride(scheme: ColorScheme) {
  currentOverride = scheme;
  listeners.forEach((listener) => listener(scheme));
}

export function useColorScheme(): ColorScheme {
  const [hasHydrated, setHasHydrated] = useState(false);
  const deviceScheme = useDeviceColorScheme() || 'dark';

  const [scheme, setSchemeState] = useState<ColorScheme>(
    currentOverride || (deviceScheme === 'unspecified' ? 'light' : deviceScheme)
  );

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    const listener = (newScheme: ColorScheme) => {
      setSchemeState(newScheme);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (!currentOverride && hasHydrated) {
      setSchemeState(deviceScheme === 'unspecified' ? 'light' : deviceScheme);
    }
  }, [deviceScheme, hasHydrated]);

  if (hasHydrated) {
    return scheme;
  }

  return currentOverride || 'light';
}
