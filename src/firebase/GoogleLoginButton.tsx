// src/components/ui/GoogleLoginButton.tsx
import React, { useState } from 'react';
import { Pressable, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { ThemedText } from '@/components/theme/themed-text';
import { useTheme } from '@/components/theme/ThemeProvider';

interface GoogleLoginButtonProps {
  onLoginSuccess?: (userInfo: any) => void;
}

export default function GoogleLoginButton({ onLoginSuccess }: GoogleLoginButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      
      if (isSuccessResponse(response)) {
        Alert.alert('Success', `Logged in as: ${response.data.user.name}`);
        if (onLoginSuccess) {
          onLoginSuccess(response.data);
        }
      } else {
        console.log('Google Sign-In flow was dismissed by the user');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert('Please Wait', 'Authentication operation is already running.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('Play Services Error', 'Google Play Services are not functional or missing.');
            break;
          default:
            Alert.alert('Sign-In Error', 'Something went wrong during Google synchronization.');
            console.error('Google Native Error:', error);
        }
      } else {
        Alert.alert('System Error', 'An unexpected app engine exception occurred.');
        console.error('Core app crash logs:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={handleGoogleSignIn}
      disabled={loading}
      style={({ pressed }) => [
        tw`flex-row justify-center items-center py-3 px-4 rounded-xl border w-full h-12`,
        isDark 
          ? tw`bg-neutral-900 border-neutral-800` 
          : tw`bg-neutral-100 border-neutral-200`,
        (pressed || loading) && tw`opacity-80`,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={isDark ? '#ffffff' : '#000000'} />
      ) : (
        <>
          <Ionicons 
            name="logo-google" 
            size={18} 
            color={isDark ? "#ffffff" : "#DB4437"} 
            style={tw`mr-2`} 
          />
          <ThemedText style={[tw`font-semibold text-sm`, { color: isDark ? '#ffffff' : '#000000' }]}>
            Google
          </ThemedText>
        </>
      )}
    </Pressable>
  );
}