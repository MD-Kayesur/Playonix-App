// src/components/ui/CustomInput.tsx
import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useTheme } from '@/components/theme/ThemeProvider';

interface CustomInputProps extends TextInputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
}

export function CustomInput({ iconName = "mail-outline", style, ...props }: CustomInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    // Any structural or positioning styles passed down now attach here safely
    <View
      style={[
        tw`flex-row items-center w-full h-12 px-4 rounded-xl border`,
        isDark 
          ? tw`bg-neutral-900/90 border-neutral-800/40` 
          : tw`bg-neutral-100 border-neutral-200`,
        style, 
      ]}
    >
      {/* Search/Mail Icon */}
      <Ionicons
        name={iconName}
        size={18}
        color={isDark ? '#525252' : '#a3a3a3'}
        style={tw`mr-2`}
      />

      {/* Actual Input Text Field */}
      <TextInput
        placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
        style={[
          tw`flex-1 text-sm h-full p-0 m-0`,
          { color: isDark ? '#ffffff' : '#000000' }
        ]}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}