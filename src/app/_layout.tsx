import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { MenuProvider, useMenu } from '@/context/menu-context';
import LoginScreen from './login';

function AppContent() {
  const colorScheme = useColorScheme();
  const { loginVisible } = useMenu();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {loginVisible ? <LoginScreen /> : <AppTabs />}
    </ThemeProvider>
  );
}

export default function TabLayout() {
  return (
    <MenuProvider>
      <AppContent />
    </MenuProvider>
  );
}
