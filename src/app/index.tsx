import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={tw`flex-1 justify-center flex-row`}>
      <SafeAreaView
        style={[tw`flex-1 px-6 items-center gap-4 max-w-[800px]`, { paddingBottom: BottomTabInset + Spacing.three }]}>
        <ThemedView style={tw`items-center justify-center flex-1 px-6 gap-6`}>
          <AnimatedIcon />
          <ThemedText type="title" style={tw`text-center`}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={tw`uppercase mt-16`}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={tw`gap-4 self-stretch px-4 py-6 rounded-[24px]`}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}
