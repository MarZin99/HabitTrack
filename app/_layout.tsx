import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Suspense, useEffect, useMemo } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavigation from '@/components/BottomNavigation';

import { SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator } from 'react-native';
import { addDummyData } from '@/db/addDummyData';
export const DATABASE_NAME = "habits"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // addDummyData();

  return (
     <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME}
        options={{enableChangeListener:true}}
        useSuspense>
        <GestureHandlerRootView>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <BottomNavigation />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  );
}
