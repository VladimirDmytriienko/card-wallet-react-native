import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { initReactQueryPersist, queryClient } from '@/react-query/queryClient';

import Toast from '@/components/Toast/Toast';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      if (loaded) {
        await initReactQueryPersist()
        await SplashScreen.hideAsync()
        setIsReady(true);
      }
    };
    prepare();
  }, [loaded]);


  if (!loaded || !isReady) return null;


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modal-edit-screen"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />

      </ThemeProvider>
      <Toast />
    </QueryClientProvider>
  )
}
