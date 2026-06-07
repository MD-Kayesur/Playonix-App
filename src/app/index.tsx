import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import { FlatList, Pressable, useWindowDimensions, Platform, Alert, View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { TikTokVideoItem } from '@/components/tiktok-video-item';
import { setColorSchemeOverride, useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';

const VIDEOS = [
  {
    id: '1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: 'Energy Casino',
    rating: '4.4 (2 Reviews)',
    description: 'The casino holds an MGA license and also offers a fully Finnish-language interface! **100% bonus up to €200 + 400 free spins**',
    likes: '4.4',
    comments: '2',
    shares: '0',
    buttonText: 'Claim Bonus',
    clickUrl: 'https://playonix.gg/bonus/energy',
  },
  {
    id: '2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: 'Playonix Sports',
    rating: '4.8 (12 Reviews)',
    description: 'Get ready for the ultimate cyberpunk sports betting experience. Real-time odds and 100% match deposit bonus up to $500!',
    likes: '4.8',
    comments: '12',
    shares: '3',
    buttonText: 'Play Now',
    clickUrl: 'https://playonix.gg/sports',
  },
  {
    id: '3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: 'Vegas Slots',
    rating: '4.2 (8 Reviews)',
    description: 'Spin to win! Over 500+ slot games with progressive jackpots. Sign up today and get 200 free spins instantly.',
    likes: '4.2',
    comments: '8',
    shares: '1',
    buttonText: 'Spin Now',
    clickUrl: 'https://playonix.gg/slots',
  },
  {
    id: '4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    username: 'Live Blackjack',
    rating: '4.6 (15 Reviews)',
    description: 'Play live blackjack with professional dealers. 24/7 streaming, interactive chat, and special cashback deals.',
    likes: '4.6',
    comments: '15',
    shares: '4',
    buttonText: 'Join Table',
    clickUrl: 'https://playonix.gg/live',
  }
];

export default function HomeScreen() {
  const { height, width: SCREEN_WIDTH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height;

  const [activeIndex, setActiveIndex] = useState(0);
  const scheme = useColorScheme();

  // Menu Drawer State and Animation
  const [menuVisible, setMenuVisible] = useState(false);
  const panelWidth = Math.min(SCREEN_WIDTH * 0.75, 300);
  const slideAnim = useRef(new Animated.Value(panelWidth)).current;

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
    slideAnim.setValue(panelWidth);
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: panelWidth,
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

      {/* Top Left Stacked Action Buttons */}
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
            videoUrl={item.url}
            isActive={index === activeIndex}
            username={item.username}
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

          {/* Sliding Panel */}
          <Animated.View
            style={[
              tw`absolute top-0 bottom-0 right-0 bg-neutral-900 border-l border-white/10 p-6`,
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
