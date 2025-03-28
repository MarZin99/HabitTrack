import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Suspense, useEffect, useMemo } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavigation from '@/components/BottomNavigation';

import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { ActivityIndicator } from 'react-native';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import migrations from "@/drizzle/migrations";
import { addDummyData } from '@/db/addDummyData';
export const DATABASE_NAME = "habits"


// Prevent the splash screen from auto-hiding before asset loading is complete.
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

  if (!loaded) {
    return null;
  }

  const db = useMemo(() => {
    const expoDb = openDatabaseSync(DATABASE_NAME);
    return drizzle(expoDb);
  }, []
)
  
  const {success, error} = useMigrations(db, migrations);

  useEffect(() => {
    if(success) {
      addDummyData(db);
    }
  }, [success])

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
