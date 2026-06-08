import React, { useRef, useState, useEffect } from 'react';
import { FlatList, useWindowDimensions, View, Pressable, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';

// Component Imports
import { ThemedView } from '@/components/theme/themed-view';
import { TikTokVideoItem } from '@/components/tiktok-video-item';
import { MenuDrawer } from '@/components/menu-drawer';
import ThemeButton from '@/components/theme/ThemeButton';

// Context & Data Imports
import { useMenu } from '@/context/menu-context';
import { VIDEOS } from '@/data/video-data';
import { useTheme } from '@/components/theme/ThemeProvider';
import { CustomInput } from '@/components/CustomInput';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/themed-text';

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const itemHeight = height;
  
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { menuVisible, setMenuVisible, filter, setFilter } = useMenu();
  const flatListRef = useRef<FlatList>(null);

  // Filter out matching usernames for the real-time suggestion dropdown list
  const suggestions = VIDEOS.filter((item) => {
    const searchString = search.toLowerCase().trim();
    return (
      searchString !== '' && 
      item.username.toLowerCase().includes(searchString)
    );
  });

  // Filter items for the main full-screen vertical swipe feed
  const filteredVideos = VIDEOS.filter((item) => {
    const matchesCategory = filter === 'all' || item.type === filter;
    const searchString = search.toLowerCase().trim();
    const matchesSearch = 
      searchString === '' || 
      item.username.toLowerCase().includes(searchString) ||
      item.description.toLowerCase().includes(searchString);

    return matchesCategory && matchesSearch;
  });

  // Reset scroll index back to 0 whenever the category tab or search query string changes
  useEffect(() => {
    setActiveIndex(0);
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, 50);
  }, [filter, search]);

  const handleSelectSuggestion = (username: string) => {
    setSearch(username);
    setShowSuggestions(false);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const topMargin = insets.top > 0 ? insets.top + 8 : 16;

  return (
    <ThemedView style={[tw`flex-1`, { backgroundColor: isDark ? "#000000" : "#ffffff" }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Floating Header Control Layer */}
      <View style={[tw`absolute left-4 right-4 z-50`, { top: topMargin }]}>
        <View style={tw`flex-row items-center gap-3`}>
          {/* Dynamic Search Box Input Component */}
          <View style={tw`flex-1`}>
            <CustomInput
              iconName="search-outline"
              placeholder="Search here..."
              value={search}
              onChangeText={(text) => {
                setSearch(text);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              clearButtonMode="while-editing"
            />
          </View>

          {/* Manual Theme Selector Trigger */}
          <ThemeButton />
        </View>

        {/* Username Dropdown Selection Layer */}
        {showSuggestions && suggestions.length > 0 && (
          <View 
            style={[
              tw`mt-2 p-3 rounded-xl overflow-hidden border max-h-48`,
              isDark ? tw`bg-neutral-900 border-neutral-800` : tw`bg-white border-neutral-200`
            ]}
          >
            <FlatList
              data={suggestions}
              keyExtractor={(item) => `suggest-${item.id}`}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                // <Pressable
                //   onPress={() => handleSelectSuggestion(item.username)}
                //   style={({ pressed }) => [
                //     tw`px-4 py-3  border-b flex-row items-center justify-between`,
                //     isDark ? tw`border-neutral-800/50` : tw`border-neutral-100`,
                //     pressed ? (isDark ? tw`bg-neutral-800` : tw`bg-neutral-100`) : tw`bg-transparent`
                //   ]}
                // >
                //  <View style={tw`flex-row items-center gap-2`}>
                //   {/* <View>
                //     <Image 
                //       source={{ uri: item.avatar }}
                //       style={tw`w-8 h-8 rounded-full`}
                //     />
                //   </View> */}
                //    <ThemedText style={[tw`font-medium text-sm`, { color: isDark ? '#ffffff' : '#000000' }]}>
                //     {item.username}
                //   </ThemedText>
                //   <ThemedText style={tw`text-xs text-neutral-500 capitalize`}>
                //     {item.type}
                //   </ThemedText>
                //  </View>
               
                // </Pressable>

                <Pressable
  onPress={() => handleSelectSuggestion(item.username)}
  style={({ pressed }) => [
    tw`px-4 py-3 flex-row items-center justify-between border-b`,
    isDark ? tw`border-neutral-800/60` : tw`border-neutral-200/60`,
    pressed ? (isDark ? tw`bg-neutral-800/50` : tw`bg-neutral-100`) : tw`bg-transparent`
  ]}
>
  {/* Left Side: Avatar and Text Column Stacked Vertically */}
  <View style={tw`flex-row items-center gap-3`}>
    {/* Optional Avatar integration matching your code */}
    {item.avatar && (
      <Image 
        source={{ uri: item.avatar }}
        style={tw`w-8 h-8 rounded-lg bg-neutral-800`}
        resizeMode="cover"
      />
    )}

    {/* Username on top, Stage/Type on bottom */}
    <View style={tw`flex-col gap-0.5`}>
      <ThemedText style={[tw`font-semibold text-sm`, { color: isDark ? '#ffffff' : '#000000' }]}>
        {item.username}
      </ThemedText>
      
      <ThemedText style={tw`text-xs text-neutral-500 capitalize font-medium`}>
        {item.type} 
      </ThemedText>
    </View>
  </View>

  {/* Right Side Indicator: Small decorative arrow or icon showing it is clickable */}

<Text style={tw`text-xs text-neutral-500 capitalize font-medium`}>
  -------------------------------------
</Text>

  {/* <Ionicons 
    name="arrow-forward-outline" 
    size={14} 
    color={isDark ? '#404040' : '#a3a3a3'} 
  /> */}
</Pressable>
        )}
            />
          </View>
        )}
      </View>

      {/* Primary Video/Image List Component */}
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
        ListEmptyComponent={() => (
          <View style={[tw`flex-1 justify-center items-center px-8`, { height: itemHeight }]}>
            <View style={[tw`p-4 rounded-xl items-center`, isDark ? tw`bg-neutral-900` : tw`bg-neutral-100`]}>
              <Text style={[tw`text-sm font-semibold`, { color: isDark ? '#a3a3a3' : '#525252' }]}>
                No results found for "{search}"
              </Text>
            </View>
          </View>
        )}
      />

      {/* Menu Overlay Drawer */}
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






// // src/app/index.tsx
// import { useRef, useState, useEffect } from 'react';
// import { FlatList, useWindowDimensions, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import tw from 'twrnc';

// import { ThemedView } from '@/components/theme/themed-view';
// import { TikTokVideoItem } from '@/components/tiktok-video-item';
// import { MenuDrawer } from '@/components/menu-drawer';
// import { useMenu } from '@/context/menu-context';
// import { VIDEOS } from '@/data/video-data';
// import { StatusBar } from 'expo-status-bar';

// import { useTheme } from '@/components/theme/ThemeProvider';
// import ThemeButton from '@/components/theme/ThemeButton';
// import { CustomInput } from '@/components/CustomInput';
// // Correct import path to find the component where it's located in your file tree

// export default function HomeScreen() {
//   const { height } = useWindowDimensions();
//   const insets = useSafeAreaInsets();
//   const itemHeight = height;
  
//   const [search, setSearch] = useState('');
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const { menuVisible, setMenuVisible, filter, setFilter } = useMenu();
//   const flatListRef = useRef<FlatList>(null);

//   const filteredVideos = VIDEOS.filter((item) => {
//     if (filter === 'all') return true;
//     return item.type === filter;
//   });

//   useEffect(() => {
//     setActiveIndex(0);
//     setTimeout(() => {
//       flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
//     }, 50);
//   }, [filter]);

//   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
//     if (viewableItems.length > 0) {
//       setActiveIndex(viewableItems[0].index ?? 0);
//     }
//   }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;

//   // Use this margin on the unified container block below
//   const topMargin = insets.top > 0 ? insets.top + 8 : 16;

//   return (
//     <ThemedView style={[tw`flex-1`, { backgroundColor: isDark ? "#000000" : "#ffffff" }]}>
//       <StatusBar style={isDark ? "light" : "dark"} />

//       {/* Clean Header Bar Overlay */}
//       <View style={[tw`absolute left-4 right-4 z-40 flex-row items-center gap-3`, { top: topMargin }]}>
        
//         {/* Search Field takes up the main space */}
//         <View style={tw`flex-1`}>
//           <CustomInput
//             iconName="search-outline"
//             placeholder="Search here..."
//             value={search}
//             onChangeText={setSearch}
//           />
//         </View>

//         {/* Theme Toggle sits right next to it */}
//         <ThemeButton />
//       </View>

//       <FlatList
//         ref={flatListRef}
//         data={filteredVideos}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
//           <TikTokVideoItem
//             type={item.type}
//             videoUrl={item.url}
//             isActive={index === activeIndex}
//             username={item.username}
//             avatar={item.avatar}
//             rating={item.rating}
//             description={item.description}
//             likes={item.likes}
//             comments={item.comments}
//             shares={item.shares}
//             buttonText={item.buttonText}
//             clickUrl={item.clickUrl}
//             itemHeight={itemHeight}
//           />
//         )}
//         pagingEnabled
//         showsVerticalScrollIndicator={false}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={viewabilityConfig}
//         decelerationRate="fast"
//       />

//       <MenuDrawer
//         visible={menuVisible}
//         onClose={() => setMenuVisible(false)}
//         activeFilter={filter}
//         onSelectFilter={(newFilter) => {
//           setFilter(newFilter);
//           setMenuVisible(false);
//         }}
//       />
//     </ThemedView>
//   );
// }