import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedView } from '@/components/themed-view';
import { TikTokVideoItem } from '@/components/tiktok-video-item';
import { MenuDrawer } from '@/components/menu-drawer';
import { setColorSchemeOverride, useColorScheme } from '@/hooks/use-color-scheme';
import { VIDEOS } from '@/data/video-data';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height;

  const [activeIndex, setActiveIndex] = useState(0);
  const scheme = useColorScheme();

  // Filtering State
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all');
  const flatListRef = useRef<FlatList>(null);

  // Menu Drawer State
  const [menuVisible, setMenuVisible] = useState(false);

  // Filter VIDEOS list based on active filter state
  const filteredVideos = VIDEOS.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

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

  const handleSelectFilter = (newFilter: 'all' | 'video' | 'image') => {
    setFilter(newFilter);
    setActiveIndex(0);
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, 50);
    setMenuVisible(false);
  };

  const topMargin = insets.top > 0 ? insets.top + 8 : 16;

  return (
    <ThemedView style={tw`flex-1 bg-black`}>
      <StatusBar style="light" />

      {/* Top Right Stacked Action Buttons */}
      <View style={[tw`absolute right-4 z-40 gap-4`, { top: topMargin }]}>
        {/* Dark/Light Mode Toggle Button */}
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [tw`items-center justify-center`, pressed && tw`opacity-80`]}>
          <Ionicons
            name={scheme === 'dark' ? 'sunny' : 'moon'}
            size={24}
            color="#ffffff"
          />
        </Pressable>

        {/* Hamburger Menu Button */}
        <Pressable
          onPress={() => setMenuVisible(true)}
          style={({ pressed }) => [tw`items-center justify-center`, pressed && tw`opacity-80`]}>
          <Ionicons
            name="menu"
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

      {/* Modular Drawer Menu Overlay */}
      <MenuDrawer
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        activeFilter={filter}
        onSelectFilter={handleSelectFilter}
      />
    </ThemedView>
  );
}
