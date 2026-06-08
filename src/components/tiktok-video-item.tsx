import React, { useState, useEffect } from 'react';
import { View, Pressable, Platform, Alert, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ThemedText } from '@/components/theme/themed-text';
import { BottomTabInset } from '@/constants/theme';

interface TikTokVideoItemProps {
  type: 'video' | 'image';
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
  clickUrl: string | null;
  itemHeight: number;
}

export function TikTokVideoItem({
  type,
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

  // Safely initialize video player with a dummy URL if this item is an image type
  const player = useVideoPlayer(type === 'video' ? videoUrl : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = false;
  });

  useEffect(() => {
    if (type === 'video') {
      if (isActive && isFocused) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [isActive, isFocused, player, type]);

  const toggleMute = () => {
    player.muted = !player.muted;
    setIsMuted(player.muted);
  };

  const bottomInset = insets.bottom + BottomTabInset + 8;

  return (
    <View style={[tw`bg-black relative justify-center items-center overflow-hidden`, { height: itemHeight }]}>
      {/* Media View (Video or Image) */}
      {type === 'video' ? (
        <VideoView
          player={player}
          style={tw`absolute inset-0 w-full h-full`}
          contentFit="cover"
          nativeControls={false}
        />
      ) : (
        <Image source={{ uri: videoUrl }} style={tw`absolute inset-0 w-full h-full`} resizeMode="cover" />
      )}

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
              <Ionicons
                name="star"
                size={14}
                color="#fbbf24"
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
            <Ionicons
              name="chevron-forward"
              size={12}
              color="#a3a3a3"
            />
          </Pressable>
        </View>

      </View>

      {/* Right Side Buttons Overlay */}
      <View style={[tw`absolute right-4 gap-6 items-center z-30`, { bottom: bottomInset + 12 }]}>
        
        {/* Rating / Star Button */}
        <Pressable onPress={() => setLiked(!liked)} style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <Ionicons
              name={liked ? "star" : "star-outline"}
              size={24}
              color={liked ? '#fbbf24' : '#ffffff'}
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>{likes}</ThemedText>
        </Pressable>

        {/* Comments */}
        <Pressable style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#ffffff"
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>{comments}</ThemedText>
        </Pressable>

        {/* Bookmark */}
        <Pressable onPress={() => setBookmarked(!bookmarked)} style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={bookmarked ? '#eab308' : '#ffffff'}
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>{shares}</ThemedText>
        </Pressable>

        {/* Share */}
        <Pressable style={tw`items-center`}>
          <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
            <Ionicons
              name="share-social-outline"
              size={24}
              color="#ffffff"
            />
          </View>
          <ThemedText style={tw`text-white text-xs font-bold mt-1`}>Share</ThemedText>
        </Pressable>

        {/* Mute/Unmute Audio Button (only show if type is video) */}
        {type === 'video' && (
          <Pressable onPress={toggleMute} style={tw`items-center`}>
            <View style={tw`w-11 h-11 rounded-full bg-black/40 items-center justify-center`}>
              <Ionicons
                name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
                size={24}
                color="#ffffff"
              />
            </View>
          </Pressable>
        )}

      </View>
    </View>
  );
}
