import React, { useState, useEffect } from 'react';
import { View, Pressable, Platform, Alert, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset } from '@/constants/theme';

interface TikTokVideoItemProps {
  videoUrl: string;
  isActive: boolean;
  username: string;
  avatar: string;
  rating: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  buttonText: string;
  clickUrl: string;
  itemHeight: number;
}

export function TikTokVideoItem({
  videoUrl,
  isActive,
  username,
  avatar,
  rating,
  description,
  likes,
  comments,
  shares,
  buttonText,
  clickUrl,
  itemHeight,
}: TikTokVideoItemProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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

  const toggleMute = () => {
    player.muted = !player.muted;
    setIsMuted(player.muted);
  };

  const bottomInset = insets.bottom + BottomTabInset + 8;

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
      <View style={[tw`absolute left-4 right-20 gap-3 z-30`, { bottom: bottomInset }]}>
        
        {/* Profile/Casino Info Row */}
        <View style={tw`flex-row items-center gap-3`}>
          {/* Avatar / Logo (Rounded Square) */}
          <View style={tw`w-12 h-12 rounded-xl bg-black border border-white/10 items-center justify-center overflow-hidden`}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={tw`w-full h-full`} resizeMode="cover" />
            ) : (
              <ThemedText style={tw`text-yellow-400 font-black text-xl`}>🎮</ThemedText>
            )}
          </View>
          
          {/* Name & Rating Column */}
          <View style={tw`gap-0.5`}>
            <ThemedText style={tw`text-white font-bold text-base`}>{username}</ThemedText>
            <View style={tw`flex-row items-center gap-1`}>
              <SymbolView
                tintColor="#fbbf24"
                name={{ ios: 'star.fill', android: 'star', web: 'star' }}
                size={14}
              />
              <ThemedText style={tw`text-neutral-300 text-xs font-semibold`}>{rating}</ThemedText>
            </View>
          </View>
        </View>

        {/* Claim Bonus / CTA Button */}
        <Pressable
          onPress={() => {
            if (Platform.OS === 'web') {
              alert(`Navigating to ${clickUrl}`);
            } else {
              Alert.alert('Redirecting', `Opening: ${clickUrl}`);
            }
          }}
          style={({ pressed }) => [
            tw`w-full h-12 rounded-xl bg-amber-400 items-center justify-center border border-amber-300`,
            pressed && tw`opacity-80`
          ]}>
          <ThemedText style={tw`text-black font-black text-base`}>{buttonText}</ThemedText>
        </Pressable>

        {/* Description Text */}
        <View style={tw`gap-1`}>
          <ThemedText style={tw`text-neutral-200 text-sm leading-4`} numberOfLines={2}>
            {description}
          </ThemedText>
          <Pressable style={tw`flex-row items-center gap-1`}>
            <ThemedText style={tw`text-neutral-400 text-xs font-bold`}>See More</ThemedText>
            <SymbolView
              tintColor="#a3a3a3"
              name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              size={12}
            />
          </Pressable>
        </View>

      </View>

      {/* Right Side Buttons Overlay */}
      <View style={[tw`absolute right-4 gap-6 items-center z-30`, { bottom: bottomInset + 12 }]}>
        
        {/* Rating / Star Button */}
        <Pressable onPress={() => setLiked(!liked)} style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <SymbolView
              tintColor={liked ? '#fbbf24' : '#ffffff'}
              name={{
                ios: liked ? 'star.fill' : 'star',
                android: liked ? 'star' : 'star_border',
                web: liked ? 'star' : 'star_border',
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

        {/* Mute/Unmute Audio Button */}
        <Pressable onPress={toggleMute} style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <SymbolView
              tintColor="#ffffff"
              name={{
                ios: isMuted ? 'speaker.slash.fill' : 'speaker.wave.2.fill',
                android: isMuted ? 'volume_off' : 'volume_up',
                web: isMuted ? 'volume_off' : 'volume_up',
              }}
              size={24}
            />
          </View>
        </Pressable>

      </View>
    </View>
  );
}
