import { useEffect } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import { useMenu } from '@/context/menu-context';
import { ThemedView } from '@/components/themed-view';
import tw from 'twrnc';

export default function MenuTabScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { setMenuVisible } = useMenu();

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Set the global state to open the drawer overlay
      setMenuVisible(true);
      // Immediately redirect back to the home feed
      router.replace('/');
    });
    return unsubscribeFocus;
  }, [navigation, setMenuVisible]);

  return <ThemedView style={tw`flex-1 bg-black`} />;
}
