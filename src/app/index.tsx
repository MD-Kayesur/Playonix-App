import { useRef, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedView } from '@/components/themed-view';
import { TikTokVideoItem } from '@/components/tiktok-video-item';
import { ThemeToggle } from '@/components/theme-toggle';
import { BottomTabInset } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

const VIDEOS = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-in-a-futuristic-city-34359-large.mp4',
    username: '@playonix_gg',
    description: 'Welcome to Playonix! Check out this futuristic gaming environment. #playonix #cyberpunk #gaming',
    likes: '124.5K',
    comments: '1.2K',
    shares: '4.8K',
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-in-front-of-a-neon-sign-34336-large.mp4',
    username: '@cyber_pro',
    description: 'Vibe check in the neon arcade zone 🕹️ Let us know what you want to play next! #arcade #neon #vibes',
    likes: '89.2K',
    comments: '932',
    shares: '2.1K',
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-34357-large.mp4',
    username: '@metro_rider',
    description: 'Navigating through the Playonix cyberpunk underground metro system. #underground #cyber #transit',
    likes: '45.1K',
    comments: '421',
    shares: '890',
  },
  {
    id: '4',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-futuristic-tunnel-34356-large.mp4',
    username: '@neon_runner',
    description: 'Fast run through the light speed tunnel. Can you beat the record? ⚡ #speedrun #tunnel #fast',
    likes: '210.7K',
    comments: '3.4K',
    shares: '12.6K',
  }
];

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height - insets.top - insets.bottom - BottomTabInset;

  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <ThemedView style={tw`flex-1 bg-black`}>
      <StatusBar style="light" />
      <ThemeToggle />
      <FlatList
        data={VIDEOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TikTokVideoItem
            videoUrl={item.url}
            isActive={index === activeIndex}
            username={item.username}
            description={item.description}
            likes={item.likes}
            comments={item.comments}
            shares={item.shares}
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
