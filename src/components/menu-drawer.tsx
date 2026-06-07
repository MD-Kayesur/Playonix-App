import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Platform, Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
        <View style={tw`gap-5`}>
          {/* All Route */}
          <Pressable
            onPress={() => onSelectFilter('all')}
            style={({ pressed }) => [
              tw`py-3 border-b border-white/5`,
              activeFilter === 'all' && tw`bg-white/5 rounded-lg px-2 -mx-2`,
              pressed && tw`opacity-70`,
            ]}>
            <View style={tw`flex-row items-center gap-4`}>
              <Ionicons
                name="grid-outline"
                size={24}
                color={activeFilter === 'all' ? '#fbbf24' : '#ffffff'}
              />
              <ThemedText style={[tw`text-base font-semibold`, activeFilter === 'all' ? tw`text-amber-400` : tw`text-white`]}>
                All
              </ThemedText>
            </View>
          </Pressable>

          {/* Photos Route */}
          <Pressable
            onPress={() => onSelectFilter('image')}
            style={({ pressed }) => [
              tw`py-3 border-b border-white/5`,
              activeFilter === 'image' && tw`bg-white/5 rounded-lg px-2 -mx-2`,
              pressed && tw`opacity-70`,
            ]}>
            <View style={tw`flex-row items-center gap-4`}>
              <Ionicons
                name="image-outline"
                size={24}
                color={activeFilter === 'image' ? '#fbbf24' : '#ffffff'}
              />
              <ThemedText style={[tw`text-base font-semibold`, activeFilter === 'image' ? tw`text-amber-400` : tw`text-white`]}>
                Photos
              </ThemedText>
            </View>
          </Pressable>

          {/* Videos Route */}
          <Pressable
            onPress={() => onSelectFilter('video')}
            style={({ pressed }) => [
              tw`py-3 border-b border-white/5`,
              activeFilter === 'video' && tw`bg-white/5 rounded-lg px-2 -mx-2`,
              pressed && tw`opacity-70`,
            ]}>
            <View style={tw`flex-row items-center gap-4`}>
              <Ionicons
                name="videocam-outline"
                size={24}
                color={activeFilter === 'video' ? '#fbbf24' : '#ffffff'}
              />
              <ThemedText style={[tw`text-base font-semibold`, activeFilter === 'video' ? tw`text-amber-400` : tw`text-white`]}>
                Videos
              </ThemedText>
            </View>
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
              tw`py-3 border-b border-white/5`,
              pressed && tw`opacity-70`,
            ]}>
            <View style={tw`flex-row items-center gap-4`}>
              <Ionicons
                name="globe-outline"
                size={24}
                color="#ffffff"
              />
              <ThemedText style={tw`text-white text-base font-semibold`}>Language</ThemedText>
            </View>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}
