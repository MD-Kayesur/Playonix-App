import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Appearance, Pressable, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import tw from 'twrnc';

import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const toggleTheme = () => {
    const nextScheme = colorScheme === 'dark' ? 'light' : 'dark';
    Appearance.setColorScheme(nextScheme);
  };

  const topMargin = insets.top > 0 ? insets.top + 8 : 16;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      
      <AppTabs />

      {/* Global Theme Toggle Button */}
      <Pressable
        onPress={toggleTheme}
        style={({ pressed }) => [
          tw`absolute right-4 z-50 w-11 h-11 rounded-full bg-black/40 items-center justify-center border border-white/10`,
          { top: topMargin },
          pressed && tw`opacity-80`
        ]}>
        <SymbolView
          tintColor="#ffffff"
          name={{
            ios: colorScheme === 'dark' ? 'sun.max.fill' : 'moon.fill',
            android: colorScheme === 'dark' ? 'wb_sunny' : 'nights_stay',
            web: colorScheme === 'dark' ? 'wb_sunny' : 'nights_stay',
          }}
          size={22}
        />
      </Pressable>
    </ThemeProvider>
  );
}
