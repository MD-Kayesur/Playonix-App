// src/app/index.tsx
import { useRef, useState, useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedView } from '@/components/theme/themed-view';
import { TikTokVideoItem } from '@/components/tiktok-video-item';
import { MenuDrawer } from '@/components/menu-drawer';
import { useMenu } from '@/context/menu-context';
import { VIDEOS } from '@/data/video-data';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '@/components/theme/ThemeProvider';
import ThemeButton from '@/components/theme/ThemeButton';
import { CustomInput } from '@/components/CustomInput';
// Correct import path to find the component where it's located in your file tree

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height;
  
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { menuVisible, setMenuVisible, filter, setFilter } = useMenu();
  const flatListRef = useRef<FlatList>(null);

  const filteredVideos = VIDEOS.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

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

  // Use this margin on the unified container block below
  const topMargin = insets.top > 0 ? insets.top + 8 : 16;

  return (
    <ThemedView style={[tw`flex-1`, { backgroundColor: isDark ? "#000000" : "#ffffff" }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Clean Header Bar Overlay */}
      <View style={[tw`absolute left-4 right-4 z-40 flex-row items-center gap-3`, { top: topMargin }]}>
        
        {/* Search Field takes up the main space */}
        <View style={tw`flex-1`}>
          <CustomInput
            iconName="search-outline"
            placeholder="Search here..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Theme Toggle sits right next to it */}
        <ThemeButton />
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