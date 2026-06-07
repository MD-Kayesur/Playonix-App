import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Animated, useWindowDimensions, Platform, Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

import { ThemedText } from '@/components/themed-text';

interface MenuDrawerProps {
  visible: boolean;
  onClose: () => void;
  activeFilter: 'all' | 'video' | 'image';
  onSelectFilter: (filter: 'all' | 'video' | 'image') => void;
}

export function MenuDrawer({ visible, onClose, activeFilter, onSelectFilter }: MenuDrawerProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const panelWidth = Math.min(SCREEN_WIDTH * 0.79, 1000);
  
  // Animation setup
  const slideAnim = useRef(new Animated.Value(-panelWidth)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -panelWidth,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, panelWidth, slideAnim]);

  if (!shouldRender) return null;

  return (
    <View style={tw`absolute inset-0 z-50`}>
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        style={tw`absolute inset-0 bg-black/60`}
      />

      {/* Sliding Panel (from Left side) */}
      <Animated.View
        style={[
          tw`absolute top-0 bottom-0 left-0 bg-neutral-900 border-r border-white/10 p-6`,
          {
            width: panelWidth,
            transform: [{ translateX: slideAnim }],
            paddingTop: insets.top + 20,
          },
        ]}>
        {/* Header */}
        <View style={tw`flex-row justify-between items-center mb-8`}>
          <ThemedText style={tw`text-white font-bold text-lg`}>Menu</ThemedText>
          <Pressable onPress={onClose} style={tw`p-1`}>
            <Ionicons
              name="close"
              size={24}
              color="#ffffff"
            />
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuItemsContainer}>
          {/* All Route */}
          <Pressable
            onPress={() => onSelectFilter('all')}
            style={({ pressed }) => [
              styles.menuItem,
              activeFilter === 'all' && styles.activeMenuItem,
              pressed && { opacity: 0.7 },
            ]}>
            <Ionicons
              name="grid-outline"
              size={24}
              color={activeFilter === 'all' ? '#fbbf24' : '#ffffff'}
            />
            <ThemedText style={[styles.menuItemText, activeFilter === 'all' ? { color: '#fbbf24' } : { color: '#ffffff' }]}>
              All
            </ThemedText>
          </Pressable>

          {/* Photos Route */}
          <Pressable
            onPress={() => onSelectFilter('image')}
            style={({ pressed }) => [
              styles.menuItem,
              activeFilter === 'image' && styles.activeMenuItem,
              pressed && { opacity: 0.7 },
            ]}>
            <Ionicons
              name="image-outline"
              size={24}
              color={activeFilter === 'image' ? '#fbbf24' : '#ffffff'}
            />
            <ThemedText style={[styles.menuItemText, activeFilter === 'image' ? { color: '#fbbf24' } : { color: '#ffffff' }]}>
              Photos
            </ThemedText>
          </Pressable>

          {/* Videos Route */}
          <Pressable
            onPress={() => onSelectFilter('video')}
            style={({ pressed }) => [
              styles.menuItem,
              activeFilter === 'video' && styles.activeMenuItem,
              pressed && { opacity: 0.7 },
            ]}>
            <Ionicons
              name="videocam-outline"
              size={24}
              color={activeFilter === 'video' ? '#fbbf24' : '#ffffff'}
            />
            <ThemedText style={[styles.menuItemText, activeFilter === 'video' ? { color: '#fbbf24' } : { color: '#ffffff' }]}>
              Videos
            </ThemedText>
          </Pressable>

          {/* Language Route */}
          <Pressable
            onPress={() => {
              if (Platform.OS === 'web') {
                alert('Language clicked!');
              } else {
                Alert.alert('Language', 'Language route clicked!');
              }
              onClose();
            }}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { opacity: 0.7 },
            ]}>
            <Ionicons
              name="globe-outline"
              size={24}
              color="#ffffff"
            />
            <ThemedText style={[styles.menuItemText, { color: '#ffffff' }]}>Language</ThemedText>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItemsContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
});
