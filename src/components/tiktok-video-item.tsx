import React, { useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useVideoPlayer, VideoView } from 'expo-video';
import tw from 'twrnc';

import { ThemedText } from '@/components/themed-text';

interface TikTokVideoItemProps {
  videoUrl: string;
  isActive: boolean;
  username: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  itemHeight: number;
}

export function TikTokVideoItem({
  videoUrl,
  isActive,
  username,
  description,
  likes,
  comments,
  shares,
  itemHeight,
}: TikTokVideoItemProps) {
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
              name={{
                ios: liked ? 'heart.fill' : 'heart',
                android: liked ? 'favorite' : 'favorite_border',
                web: liked ? 'favorite' : 'favorite_border',
              }}
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
              name={{
                ios: bookmarked ? 'bookmark.fill' : 'bookmark',
                android: bookmarked ? 'bookmark' : 'bookmark_border',
                web: bookmarked ? 'bookmark' : 'bookmark_border',
              }}
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
