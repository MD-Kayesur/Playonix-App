import React, { useState } from 'react';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, TextInput, Alert, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ContactScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('bug'); // 'bug', 'feedback', 'other'
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  const handleSubmit = () => {
    if (!email || !message) {
      if (Platform.OS === 'web') {
        alert('Please fill out all fields.');
      } else {
        Alert.alert('Error', 'Please fill out all fields.');
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      setMessage('');
      if (Platform.OS === 'web') {
        alert('Thank you! Your message has been sent successfully.');
      } else {
        Alert.alert('Success', 'Thank you! Your message has been sent successfully.');
      }
    }, 1200);
  };

  return (
    <ThemedView style={tw`flex-1`}>
      <ThemeToggle />
      <ScrollView
        style={[tw`flex-1`, { backgroundColor: theme.background }]}
        contentInset={insets}
        contentContainerStyle={contentPlatformStyle}>
        <ThemedView style={tw`max-w-[800px] grow flex-row justify-center`}>
          <ThemedView style={tw`w-full px-6 py-10`}>
            
            {/* Header */}
            <ThemedView style={tw`items-center mb-8`}>
              <ThemedText type="subtitle" style={tw`mb-2 text-center`}>Get in Touch</ThemedText>
              <ThemedText style={tw`text-center max-w-[500px]`} themeColor="textSecondary">
                Have feedback, questions, or bugs to report? Our support team and community are here to help you.
              </ThemedText>
            </ThemedView>

            {/* Social / Contact Grid */}
            <ThemedView style={tw`flex-row flex-wrap justify-between gap-4 mb-10`}>
              {/* Discord */}
              <ThemedView type="backgroundElement" style={tw`flex-1 min-w-[200px] p-5 rounded-2xl border border-neutral-800/10`}>
                <View style={tw`flex-row items-center gap-2 mb-2`}>
                  <SymbolView
                    tintColor="#5865F2"
                    name={{ ios: 'message.fill', android: 'chat', web: 'chat' }}
                    size={20}
                  />
                  <ThemedText style={tw`font-bold`}>Discord</ThemedText>
                </View>
                <ThemedText type="small" themeColor="textSecondary" style={tw`mb-3`}>
                  Join our Discord community for real-time support.
                </ThemedText>
                <ExternalLink href="https://discord.gg/playonix" asChild>
                  <Pressable style={({ pressed }) => pressed && tw`opacity-70`}>
                    <ThemedView style={tw`bg-indigo-600/10 py-2 rounded-xl items-center`}>
                      <ThemedText style={tw`text-indigo-400 font-bold text-sm`}>Join Server</ThemedText>
                    </ThemedView>
                  </Pressable>
                </ExternalLink>
              </ThemedView>

              {/* Email Support */}
              <ThemedView type="backgroundElement" style={tw`flex-1 min-w-[200px] p-5 rounded-2xl border border-neutral-800/10`}>
                <View style={tw`flex-row items-center gap-2 mb-2`}>
                  <SymbolView
                    tintColor="#10B981"
                    name={{ ios: 'envelope.fill', android: 'mail', web: 'mail' }}
                    size={20}
                  />
                  <ThemedText style={tw`font-bold`}>Email Us</ThemedText>
                </View>
                <ThemedText type="small" themeColor="textSecondary" style={tw`mb-3`}>
                  Direct support via email for billing or account issues.
                </ThemedText>
                <ExternalLink href="mailto:support@playonix.gg" asChild>
                  <Pressable style={({ pressed }) => pressed && tw`opacity-70`}>
                    <ThemedView style={tw`bg-emerald-600/10 py-2 rounded-xl items-center`}>
                      <ThemedText style={tw`text-emerald-400 font-bold text-sm`}>Send Email</ThemedText>
                    </ThemedView>
                  </Pressable>
                </ExternalLink>
              </ThemedView>
            </ThemedView>

            {/* Contact Form */}
            <ThemedView type="backgroundElement" style={tw`p-6 rounded-2xl border border-neutral-800/10 mb-8`}>
              <ThemedText style={tw`font-bold text-lg mb-4`}>Send a Message</ThemedText>

              {/* Topic Selector */}
              <View style={tw`mb-4`}>
                <ThemedText type="smallBold" style={tw`mb-2`}>What is this regarding?</ThemedText>
                <View style={tw`flex-row gap-2`}>
                  {['bug', 'feedback', 'other'].map((type) => (
                    <Pressable
                      key={type}
                      onPress={() => setSubject(type)}
                      style={tw`flex-1 py-2 rounded-xl border ${
                        subject === type
                          ? 'bg-purple-600 border-purple-600'
                          : 'bg-neutral-800/20 border-neutral-800/40'
                      }`}>
                      <ThemedText
                        style={tw`text-center capitalize text-sm font-semibold ${
                          subject === type ? 'text-white' : 'text-neutral-400'
                        }`}>
                        {type}
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Email Input */}
              <View style={tw`mb-4`}>
                <ThemedText type="smallBold" style={tw`mb-2`}>Your Email Address</ThemedText>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[
                    tw`px-4 py-3 rounded-xl border bg-neutral-800/20 border-neutral-800/40`,
                    { color: theme.text }
                  ]}
                />
              </View>

              {/* Message Input */}
              <View style={tw`mb-5`}>
                <ThemedText type="smallBold" style={tw`mb-2`}>Message</ThemedText>
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Tell us what's on your mind..."
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={[
                    tw`px-4 py-3 rounded-xl border bg-neutral-800/20 border-neutral-800/40 min-h-[120px]`,
                    { color: theme.text }
                  ]}
                />
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={({ pressed }) => [
                  tw`py-3 rounded-full flex-row items-center justify-center bg-purple-600`,
                  pressed && tw`opacity-80`,
                  isSubmitting && tw`opacity-50`
                ]}>
                <ThemedText style={tw`text-white font-bold text-base`}>
                  {isSubmitting ? 'Sending...' : 'Submit Message'}
                </ThemedText>
              </Pressable>
            </ThemedView>

            {Platform.OS === 'web' && <WebBadge />}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
