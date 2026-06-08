// src/app/(tabs)/languages.tsx
import React, { useState } from 'react';
import { View, Pressable, Alert, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import tw from 'twrnc';

import { ThemedText } from '@/components/theme/themed-text';
import { ThemedView } from '@/components/theme/themed-view';
import { useTheme } from '@/components/theme/ThemeProvider';

interface LanguageItem {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
}

export default function LanguageScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  const [selectedLang, setSelectedLang] = useState('en');

  const languagesList: LanguageItem[] = [
    { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { id: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
    { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
    { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  ];

  const handleLanguageSelect = (lang: LanguageItem) => {
    setSelectedLang(lang.id);
    const message = `Language switched to ${lang.name} (${lang.nativeName})`;
    
    if (Platform.OS === 'web') {
      alert(message);
    } else {
      Alert.alert('Language Updated', message, [{ text: 'OK' }]);
    }
  };

  const viewBg = isDark ? 'bg-neutral-950' : 'bg-neutral-50';
  const headerText = isDark ? 'text-white' : 'text-neutral-900';
  const cardBg = isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <ThemedView style={[tw`flex-1 ${viewBg}`, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={tw`px-6 py-8`}>
        
        {/* Navigation Top Header Row */}
        <View style={tw`flex-row items-center justify-between mb-8`}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              tw`p-2 rounded-full border`,
              isDark ? tw`bg-neutral-900 border-neutral-800` : tw`bg-white border-neutral-200`,
              pressed && tw`opacity-70`,
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </Pressable>
          <ThemedText style={tw`${headerText} font-bold text-lg`}>Select Language</ThemedText>
          <View style={tw`w-10`} />
        </View>

        {/* Descriptor Text Sub-title */}
        <View style={tw`mb-6`}>
          <ThemedText style={tw`text-neutral-500 text-sm`}>
            Choose your preferred display language for the platform interface elements.
          </ThemedText>
        </View>

        {/* Selectable Row Content Cards */}
        <View style={tw`gap-3`}>
          {languagesList.map((lang) => {
            const isCurrent = selectedLang === lang.id;

            return (
              <Pressable
                key={lang.id}
                onPress={() => handleLanguageSelect(lang)}
                style={({ pressed }) => [
                  tw`flex-row items-center justify-between p-4 rounded-xl border ${cardBg}`,
                  isCurrent && (isDark ? tw`border-purple-500 bg-purple-950/20` : tw`border-purple-500 bg-purple-50`),
                  pressed && tw`opacity-80`,
                ]}
              >
                <View style={tw`flex-row items-center gap-4`}>
                  <ThemedText style={tw`text-2xl`}>{lang.flag}</ThemedText>
                  <View style={tw`flex-col`}>
                    <ThemedText style={[tw`font-bold text-base`, { color: textColor }]}>
                      {lang.name}
                    </ThemedText>
                    <ThemedText style={tw`text-xs ${subTextColor}`}>
                      {lang.nativeName}
                    </ThemedText>
                  </View>
                </View>

                {/* Status indicator button bullet */}
                <View 
                  style={[
                    tw`w-5 h-5 rounded-full border items-center justify-center`,
                    isCurrent 
                      ? tw`border-purple-500 bg-purple-500` 
                      : (isDark ? tw`border-neutral-700` : tw`border-neutral-300`)
                  ]}
                >
                  {isCurrent && (
                    <Ionicons name="checkmark" size={12} color="#ffffff" />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

      </ScrollView>
    </ThemedView>
  );
}