import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { useState, useEffect } from 'react';

type ColorScheme = 'light' | 'dark';

let currentOverride: ColorScheme | null = null;
const listeners = new Set<(scheme: ColorScheme) => void>();

export function setColorSchemeOverride(scheme: ColorScheme) {
  currentOverride = scheme;
  listeners.forEach((listener) => listener(scheme));
}

export function useColorScheme(): ColorScheme {
  const deviceScheme = useDeviceColorScheme() || 'dark';
  const [scheme, setSchemeState] = useState<ColorScheme>(
    currentOverride || (deviceScheme === 'unspecified' ? 'light' : deviceScheme)
  );

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
    if (!currentOverride) {
      setSchemeState(deviceScheme === 'unspecified' ? 'light' : deviceScheme);
    }
  }, [deviceScheme]);

  return scheme;
}
