import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import { FlatList, Pressable, useWindowDimensions, Platform, Alert, View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { TikTokVideoItem } from '@/components/tiktok-video-item';
import { setColorSchemeOverride, useColorScheme } from '@/hooks/use-color-scheme';
import { VIDEOS } from '@/data/video-data';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const { height, width: SCREEN_WIDTH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height;

  const [activeIndex, setActiveIndex] = useState(0);
  const scheme = useColorScheme();

  // Menu Drawer State and Animation (Left side slide-in)
  const [menuVisible, setMenuVisible] = useState(false);
  const panelWidth = Math.min(SCREEN_WIDTH * 0.75, 300);
  const slideAnim = useRef(new Animated.Value(-panelWidth)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const toggleTheme = () => {
    const nextScheme = scheme === 'dark' ? 'light' : 'dark';
    setColorSchemeOverride(nextScheme);
  };

  const openMenu = () => {
    slideAnim.setValue(-panelWidth);
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -panelWidth,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const topMargin = insets.top > 0 ? insets.top + 8 : 16;

  return (
    <ThemedView style={tw`flex-1 bg-black`}>
      <StatusBar style="light" />

      {/* Top Right Stacked Action Buttons */}
      <View style={[tw`absolute right-4 z-50 gap-4`, { top: topMargin }]}>
        {/* Dark/Light Mode Toggle Button */}
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [tw`items-center justify-center`, pressed && tw`opacity-80`]}>
          <SymbolView
            tintColor="#ffffff"
            name={{
              ios: scheme === 'dark' ? 'sun.max.fill' : 'moon.fill',
              android: scheme === 'dark' ? 'wb_sunny' : 'nights_stay',
              web: scheme === 'dark' ? 'wb_sunny' : 'nights_stay'
            }}
            size={22}
          />
        </Pressable>

        {/* Hamburger Menu Button */}
        <Pressable
          onPress={openMenu}
          style={({ pressed }) => [tw`items-center justify-center`, pressed && tw`opacity-80`]}>
          <SymbolView
            tintColor="#ffffff"
            name={{
              ios: 'line.3.horizontal',
              android: 'menu',
              web: 'menu'
            }}
            size={22}
          />
        </Pressable>
      </View>

      <FlatList
        data={VIDEOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TikTokVideoItem
            type={item.type}
            videoUrl={item.url}
            isActive={index === activeIndex}
            username={item.username}
            avatar={item.avatar}
            rating={item.rating}
            description={item.description}
            likes={item.likes}
            comments={item.comments}
            shares={item.shares}
            buttonText={item.buttonText}
            clickUrl={item.clickUrl}
            itemHeight={itemHeight}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        decelerationRate="fast"
      />

      {/* Drawer Menu Overlay */}
      {menuVisible && (
        <View style={tw`absolute inset-0 z-50`}>
          {/* Backdrop */}
          <Pressable
            onPress={closeMenu}
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
              <Pressable onPress={closeMenu} style={tw`p-1`}>
                <SymbolView
                  tintColor="#ffffff"
                  name={{ ios: 'xmark', android: 'close', web: 'close' }}
                  size={24}
                />
              </Pressable>
            </View>

            {/* Menu Items */}
            <View style={tw`gap-4`}>
              {/* Images Route */}
              <Pressable
                onPress={() => {
                  if (Platform.OS === 'web') {
                    alert('Images clicked!');
                  } else {
                    Alert.alert('Images', 'Images route clicked!');
                  }
                  closeMenu();
                }}
                style={({ pressed }) => [
                  tw`flex-row items-center gap-4 py-3 border-b border-white/5`,
                  pressed && tw`opacity-70`,
                ]}>
                <SymbolView
                  tintColor="#ffffff"
                  name={{ ios: 'photo', android: 'image', web: 'image' }}
                  size={22}
                />
                <ThemedText style={tw`text-white text-base font-semibold`}>Images</ThemedText>
              </Pressable>

              {/* Videos Route */}
              <Pressable
                onPress={() => {
                  if (Platform.OS === 'web') {
                    alert('Videos clicked!');
                  } else {
                    Alert.alert('Videos', 'Videos route clicked!');
                  }
                  closeMenu();
                }}
                style={({ pressed }) => [
                  tw`flex-row items-center gap-4 py-3 border-b border-white/5`,
                  pressed && tw`opacity-70`,
                ]}>
                <SymbolView
                  tintColor="#ffffff"
                  name={{ ios: 'video', android: 'videocam', web: 'videocam' }}
                  size={22}
                />
                <ThemedText style={tw`text-white text-base font-semibold`}>Videos</ThemedText>
              </Pressable>

              {/* All Route */}
              <Pressable
                onPress={() => {
                  if (Platform.OS === 'web') {
                    alert('All clicked!');
                  } else {
                    Alert.alert('All', 'All route clicked!');
                  }
                  closeMenu();
                }}
                style={({ pressed }) => [
                  tw`flex-row items-center gap-4 py-3 border-b border-white/5`,
                  pressed && tw`opacity-70`,
                ]}>
                <SymbolView
                  tintColor="#ffffff"
                  name={{ ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' }}
                  size={22}
                />
                <ThemedText style={tw`text-white text-base font-semibold`}>All</ThemedText>
              </Pressable>

              {/* Language Route */}
              <Pressable
                onPress={() => {
                  if (Platform.OS === 'web') {
                    alert('Language clicked!');
                  } else {
                    Alert.alert('Language', 'Language route clicked!');
                  }
                  closeMenu();
                }}
                style={({ pressed }) => [
                  tw`flex-row items-center gap-4 py-3 border-b border-white/5`,
                  pressed && tw`opacity-70`,
                ]}>
                <SymbolView
                  tintColor="#ffffff"
                  name={{ ios: 'globe', android: 'language', web: 'language' }}
                  size={22}
                />
                <ThemedText style={tw`text-white text-base font-semibold`}>Language</ThemedText>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      )}
    </ThemedView>
  );
}
