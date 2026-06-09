// src/components/theme/ThemeButton.tsx
import React from "react";
import { Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useTheme } from "./ThemeProvider"; // Adjust relative import based on it being in the same folder

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        tw`flex-row items-center px-3 py-2 rounded-full`,
        isDark ? tw`bg-white` : tw`bg-black`,
        pressed && tw`opacity-70`,
      ]}
    >
      <Ionicons
        name={isDark ? "sunny" : "moon"}
        size={18}
        color={isDark ? "black" : "white"}
      />
      {/* <Text style={tw`ml-2 font-semibold ${isDark ? "text-black" : "text-white"}`}>
        {isDark ? "Light" : "Dark"}
      </Text> */}
    </Pressable>
  );
}