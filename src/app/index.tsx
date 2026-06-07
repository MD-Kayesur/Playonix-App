import { Ionicons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedView } from '@/components/themed-view';
import { TikTokVideoItem } from '@/components/tiktok-video-item';
import { MenuDrawer } from '@/components/menu-drawer';
import { useMenu } from '@/context/menu-context';
import { setColorSchemeOverride, useColorScheme } from '@/hooks/use-color-scheme';
import { VIDEOS } from '@/data/video-data';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height;

  const [activeIndex, setActiveIndex] = useState(0);
  const scheme = useColorScheme();

  // Consume the global menu state from context
  const { menuVisible, setMenuVisible, filter, setFilter } = useMenu();

  const flatListRef = useRef<FlatList>(null);

  // Filter VIDEOS list based on active filter state
  const filteredVideos = VIDEOS.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  // Whenever the filter changes, reset the active index and scroll the feed back to the top
  useEffect(() => {
    setActiveIndex(0);
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, 50);
  }, [filter]);

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

      {/* Top Right Theme Toggle Button */}
      <View style={[tw`absolute right-4 z-40`, { top: topMargin }]}>
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [tw`items-center justify-center`, pressed && tw`opacity-80`]}>
          <Ionicons
            name={scheme === 'dark' ? 'sunny' : 'moon'}
            size={24}
            color="#ffffff"
          />
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={filteredVideos}
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

      {/* Render MenuDrawer overlay directly on top of the HomeScreen */}
      <MenuDrawer
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        activeFilter={filter}
        onSelectFilter={(newFilter) => {
          setFilter(newFilter);
          setMenuVisible(false);
        }}
      />
    </ThemedView>
  );
}
