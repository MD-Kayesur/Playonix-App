import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

import { MenuDrawer } from '@/components/menu-drawer';
import { ThemedView } from '@/components/themed-view';

export default function MenuTabScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ filter?: 'all' | 'video' | 'image' }>();
  const activeFilter = params.filter ?? 'all';

  const [visible, setVisible] = useState(true);

  // When this tab is focused, ensure the menu drawer opens/slides in
  useEffect(() => {
    setVisible(true);
  }, []);

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
