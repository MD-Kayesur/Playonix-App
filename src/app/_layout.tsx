// src/app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider as ExpoNavigationProvider } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animations/animated-icon';
import AppTabs from '@/components/app-tabs';
import { MenuProvider, useMenu } from '@/context/menu-context';
import LoginScreen from './login';

// Import your custom ThemeProvider and hook
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';

function AppContent() {
  const { loginVisible } = useMenu();
  // Get manual theme state from your custom context
  const { theme } = useTheme(); 

  return (
    <ExpoNavigationProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <View style={{ flex: 1 }}>
        <AppTabs />
        {loginVisible && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}>
            <LoginScreen />
          </View>
        )}
      </View>
    </ExpoNavigationProvider>
  );
}

export default function TabLayout() {
  return (
    <MenuProvider>
      {/* Your custom manual provider goes on the absolute top */}
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </MenuProvider>
  );
}