// src/app/login.tsx
import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, Platform, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import logo from '@/assets/expo.icon/Assets/playonix.png';
import { ThemedText } from '@/components/theme/themed-text';
import { ThemedView } from '@/components/theme/themed-view';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useMenu } from '@/context/menu-context';
  
// NOTICE THE WORDS HERE: "export default function"
export default function LoginScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const { setIsLoggedIn, setLoginVisible, setMenuVisible } = useMenu();

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
      setIsLoggedIn(true); 
      setLoginVisible(false); 
      setMenuVisible(false); 
      if (Platform.OS === 'web') {
        alert('Logged in successfully!');
      } else {
        Alert.alert('Success', 'Logged in successfully!');
      }
    }, 1200);
  };

  const viewBg = isDark ? 'bg-neutral-950' : 'bg-neutral-50';
  const headerText = isDark ? 'text-white' : 'text-neutral-900';
  const inputBg = isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200';
  const textColor = isDark ? '#ffffff' : '#000000';
  const placeholderColor = isDark ? '#666666' : '#94a3b8';

  return (
    <ThemedView style={[tw`flex-1 ${viewBg}`, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={tw`flex-grow px-6 py-8 justify-between`}>
        
        {/* Header with Back Button */}
        <View style={tw`flex-row items-center justify-between mb-8`}>
          <Pressable
            onPress={() => setLoginVisible(false)}
            style={({ pressed }) => [
              tw`p-2 rounded-full border`,
              isDark ? tw`bg-neutral-900 border-neutral-800` : tw`bg-white border-neutral-200`,
              pressed && tw`opacity-70`,
            ]}>
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </Pressable>
          <ThemedText style={tw`${headerText} font-bold text-lg`}>Log In</ThemedText>
          <View style={tw`w-10`} />
        </View>

        {/* Logo Section */}
        <View style={tw`items-center `}>
          <View  >
             <Image
            source={logo}
            width={200}
            height={200}
            style={{width:200, height:200}} 
            resizeMode="contain" 
          />
          </View>
          <ThemedText style={tw`${headerText} font-black text-2xl tracking-wide`}>
            Playonix
          </ThemedText>
          <ThemedText style={tw`text-neutral-500 mt-2 text-center text-sm`}>
            Log in to access your casino and sports portal
          </ThemedText>
        </View>

        {/* Input Form Fields */}
        <View style={tw`gap-4 mb-6`}>
          <View>
            <ThemedText style={tw`text-neutral-400 mb-2 font-medium text-xs uppercase tracking-wider`}>
              Email Address
            </ThemedText>
            <View style={tw`flex-row items-center border rounded-xl px-4 py-3 ${inputBg}`}>
              <Ionicons name="mail-outline" size={20} color={placeholderColor} style={tw`mr-3`} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={placeholderColor}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[tw`flex-1 text-base p-0 m-0`, { color: textColor }]}
              />
            </View>
          </View>

          <View>
            <ThemedText style={tw`text-neutral-400 mb-2 font-medium text-xs uppercase tracking-wider`}>
              Password
            </ThemedText>
            <View style={tw`flex-row items-center border rounded-xl px-4 py-3 ${inputBg}`}>
              <Ionicons name="lock-closed-outline" size={20} color={placeholderColor} style={tw`mr-3`} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={placeholderColor}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={[tw`flex-1 text-base p-0 m-0`, { color: textColor }]}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={tw`p-1`}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={placeholderColor}
                />
              </Pressable>
            </View>
          </View>

          <Pressable style={tw`items-end mt-1`}>
            <ThemedText style={tw`text-purple-500 text-sm font-semibold`}>
              Forgot Password?
            </ThemedText>
          </Pressable>
        </View>

        {/* Login Action Buttons */}
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

          {/* Divider line */}
          <View style={tw`flex-row items-center my-2`}>
            <View style={tw`flex-1 h-[1px] ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
            <ThemedText style={tw`text-neutral-500 text-xs px-4 font-bold`}>OR CONTINUE WITH</ThemedText>
            <View style={tw`flex-1 h-[1px] ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
          </View>

          {/* Social Logins */}
          <View style={tw`flex-row gap-3 mb-4`}>
             <Pressable onPress={() => Alert.alert('Google Login')}>
              <Ionicons name="logo-google" size={38} color={isDark ? "#ffffff" : "#db4437"} style={tw`mr-2`} /> 
               
             </Pressable>

           <Pressable onPress={() => Alert.alert('Discord Login')}>
              <Ionicons name="logo-discord" size={38} color={isDark ? "#ffffff" : "#5865F2"} style={tw`mr-2`} /> 
              
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </ThemedView>
  );
}