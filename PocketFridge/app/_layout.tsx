import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { FridgeProvider } from '../contexts/FridgeContext'; // Arielle's Brain
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // 1. Theme Provider (Visuals)
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      {/* 2. Fridge Provider (Data/Brain) - Wraps the Stack */}
      <FridgeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="confirm" 
            options={{ 
              presentation: 'modal', 
              headerShown: false 
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </FridgeProvider>

    </ThemeProvider>
  );
}