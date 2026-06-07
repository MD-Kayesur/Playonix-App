import { DarkTheme, DefaultTheme, ThemeProvider, usePathname } from 'expo-router';
import { useColorScheme } from 'react-native';

import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { MenuProvider } from '@/context/menu-context';
import LoginScreen from './login';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <MenuProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        {isLoginPage ? <LoginScreen /> : <AppTabs />}
      </ThemeProvider>
    </MenuProvider>
  );
}
