import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import tw from 'twrnc';

import { MenuDrawer } from '@/components/menu-drawer';
import { ThemedView } from '@/components/themed-view';

export default function MenuTabScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ filter?: 'all' | 'video' | 'image' }>();
  const activeFilter = params.filter ?? 'all';

  const [visible, setVisible] = useState(false);

  // Use navigation focus/blur listeners to trigger drawer visibility
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => setVisible(true));
    const unsubscribeBlur = navigation.addListener('blur', () => setVisible(false));
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      router.replace({
        pathname: '/',
        params: { filter: activeFilter },
      });
    }, 250);
  };

  const handleSelectFilter = (filter: 'all' | 'video' | 'image') => {
    setVisible(false);
    setTimeout(() => {
      router.replace({
        pathname: '/',
        params: { filter },
      });
    }, 250);
  };

  return (
    <ThemedView style={tw`flex-1 bg-black`}>
      <MenuDrawer
        visible={visible}
        onClose={handleClose}
        activeFilter={activeFilter}
        onSelectFilter={handleSelectFilter}
      />
    </ThemedView>
  );
}
