import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, Pressable, useWindowDimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useVideoPlayer, VideoView } from 'expo-video';
import tw from 'twrnc';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
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

function TikTokVideoItem({
  videoUrl,
  isActive,
  username,
  description,
  likes,
  comments,
  shares,
  itemHeight,
}: {
  videoUrl: string;
  isActive: boolean;
  username: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  itemHeight: number;
}) {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => setIsFocused(true));
    const unsubscribeBlur = navigation.addListener('blur', () => setIsFocused(false));
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.muted = false;
  });

  useEffect(() => {
    if (isActive && isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, isFocused, player]);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <View style={[tw`bg-black relative justify-center items-center overflow-hidden`, { height: itemHeight }]}>
      {/* Video View */}
      <VideoView
        player={player}
        style={tw`absolute inset-0 w-full h-full`}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Left Bottom Details Overlay */}
      <View style={tw`absolute bottom-4 left-4 right-20 gap-2`}>
        <ThemedText style={tw`text-white font-bold text-base`}>{username}</ThemedText>
        <ThemedText style={tw`text-neutral-200 text-sm`} numberOfLines={3}>
          {description}
        </ThemedText>
        <View style={tw`flex-row items-center gap-2 mt-1`}>
          <SymbolView
            tintColor="#fff"
            name={{ ios: 'music.note', android: 'music_note', web: 'music_note' }}
            size={14}
          />
          <ThemedText style={tw`text-white text-xs font-semibold`}>Original Sound - Playonix</ThemedText>
        </View>
      </View>

      {/* Right Side Buttons Overlay */}
      <View style={tw`absolute bottom-6 right-4 gap-6 items-center`}>
        {/* Creator Avatar */}
        <View style={tw`relative items-center mb-2`}>
          <View style={tw`w-12 h-12 rounded-full border-2 border-white bg-neutral-800 items-center justify-center`}>
            <ThemedText style={tw`text-white text-lg font-bold`}>🎮</ThemedText>
          </View>
          <View style={tw`absolute -bottom-1.5 bg-red-500 rounded-full px-1.5 py-0.5 border border-white`}>
            <ThemedText style={tw`text-white text-[10px] font-bold`}>+</ThemedText>
          </View>
        </View>

        {/* Like */}
        <Pressable onPress={() => setLiked(!liked)} style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <SymbolView
              tintColor={liked ? '#ef4444' : '#ffffff'}
              name={{ ios: liked ? 'heart.fill' : 'heart', android: liked ? 'favorite' : 'favorite_border', web: liked ? 'favorite' : 'favorite_border' }}
              size={26}
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>{likes}</ThemedText>
        </Pressable>

        {/* Comments */}
        <Pressable style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <SymbolView
              tintColor="#ffffff"
              name={{ ios: 'bubble.left.fill', android: 'chat', web: 'chat' }}
              size={24}
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>{comments}</ThemedText>
        </Pressable>

        {/* Bookmark */}
        <Pressable onPress={() => setBookmarked(!bookmarked)} style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <SymbolView
              tintColor={bookmarked ? '#eab308' : '#ffffff'}
              name={{ ios: bookmarked ? 'bookmark.fill' : 'bookmark', android: 'bookmark', web: 'bookmark' }}
              size={24}
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>{shares}</ThemedText>
        </Pressable>

        {/* Share */}
        <Pressable style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <SymbolView
              tintColor="#ffffff"
              name={{ ios: 'arrowshape.turn.up.right.fill', android: 'share', web: 'share' }}
              size={24}
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>Share</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

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
