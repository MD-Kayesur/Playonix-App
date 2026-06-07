import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import { FlatList, Pressable, useWindowDimensions, Platform, Alert, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedView } from '@/components/themed-view';
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
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height;

  const [activeIndex, setActiveIndex] = useState(0);
  const scheme = useColorScheme();

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
          onPress={() => {
            if (Platform.OS === 'web') {
              alert('Menu clicked!');
            } else {
              Alert.alert('Menu', 'Menu clicked!');
            }
          }}
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
    </ThemedView>
  );
}
