import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useMenu } from '@/context/menu-context';

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { setIsLoggedIn } = useMenu();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      if (Platform.OS === 'web') {
        alert('Please fill out all fields.');
      } else {
        Alert.alert('Error', 'Please fill out all fields.');
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true); // Toggle global logged in state
      if (Platform.OS === 'web') {
        alert('Logged in successfully!');
      } else {
        Alert.alert('Success', 'Logged in successfully!');
      }
      router.replace('/');
    }, 1200);
  };

  return (
    <ThemedView style={[tw`flex-1 bg-black`, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={tw`flex-grow px-6 py-8 justify-between`}>
        {/* Header with Back Button */}
        <View style={tw`flex-row items-center justify-between mb-8`}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              tw`p-2 bg-neutral-800/40 rounded-full border border-neutral-700/30`,
              pressed && tw`opacity-70`,
            ]}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <ThemedText style={tw`text-white font-bold text-lg`}>Log In</ThemedText>
          <View style={tw`w-10`} />
        </View>

        {/* Logo/Icon Section */}
        <View style={tw`items-center my-6`}>
          <View style={tw`w-16 h-16 bg-purple-600 rounded-2xl items-center justify-center mb-4`}>
            <Ionicons name="game-controller" size={36} color="#ffffff" />
          </View>
          <ThemedText type="subtitle" style={tw`text-white font-extrabold text-2xl tracking-wide`}>
            PLAYONIX
          </ThemedText>
          <ThemedText style={tw`text-neutral-400 mt-2 text-center text-sm`}>
            Log in to access your casino and sports portal
          </ThemedText>
        </View>

        {/* Inputs Form */}
        <View style={tw`gap-4 mb-6`}>
          <View>
            <ThemedText type="smallBold" style={tw`text-neutral-300 mb-2`}>
              Email Address
            </ThemedText>
            <View style={tw`flex-row items-center bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3`}>
              <Ionicons name="mail-outline" size={20} color="#666666" style={tw`mr-3`} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[tw`flex-1 text-base`, { color: '#ffffff' }]}
              />
            </View>
          </View>

          <View>
            <ThemedText type="smallBold" style={tw`text-neutral-300 mb-2`}>
              Password
            </ThemedText>
            <View style={tw`flex-row items-center bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3`}>
              <Ionicons name="lock-closed-outline" size={20} color="#666666" style={tw`mr-3`} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#666666"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={[tw`flex-1 text-base`, { color: '#ffffff' }]}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={tw`p-1`}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#666666"
                />
              </Pressable>
            </View>
          </View>

          <Pressable style={tw`items-end mt-1`}>
            <ThemedText style={tw`text-purple-400 text-sm font-semibold`}>
              Forgot Password?
            </ThemedText>
          </Pressable>
        </View>

        {/* Login & Social Sign-In Buttons */}
        <View style={tw`gap-4`}>
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [
              tw`py-4 rounded-xl flex-row items-center justify-center bg-purple-600`,
              (pressed || loading) && tw`opacity-85`,
            ]}>
            <ThemedText style={tw`text-white font-extrabold text-base`}>
              {loading ? 'Logging in...' : 'Log In'}
            </ThemedText>
          </Pressable>

          <View style={tw`flex-row items-center my-4`}>
            <View style={tw`flex-1 h-[1px] bg-neutral-800`} />
            <ThemedText style={tw`text-neutral-500 text-xs px-4`}>OR CONTINUE WITH</ThemedText>
            <View style={tw`flex-1 h-[1px] bg-neutral-800`} />
          </View>

          <View style={tw`flex-row gap-4 mb-8`}>
            <Pressable
              style={({ pressed }) => [
                tw`flex-1 flex-row justify-center items-center py-3 bg-neutral-900 border border-neutral-800 rounded-xl`,
                pressed && tw`opacity-80`,
              ]}>
              <Ionicons name="logo-google" size={20} color="#ffffff" style={tw`mr-2`} />
              <ThemedText style={tw`text-white font-semibold text-sm`}>Google</ThemedText>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                tw`flex-1 flex-row justify-center items-center py-3 bg-neutral-900 border border-neutral-800 rounded-xl`,
                pressed && tw`opacity-80`,
              ]}>
              <Ionicons name="logo-discord" size={20} color="#ffffff" style={tw`mr-2`} />
              <ThemedText style={tw`text-white font-semibold text-sm`}>Discord</ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
