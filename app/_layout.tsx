// Auth imports
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";


// View
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Fonts
import { useFonts } from "expo-font";

// react
import { useEffect, useState } from "react";

// Components
import CustomSplashScreen from "@/components/SplashScreen";
import WelcomeScreen from "./(onBoarding)/welcome";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'PublicSans-Italic-Variable': require('../assets/fonts/PublicSans-Italic-VariableFont_wght.ttf'),
    'PublicSans-Variable': require('../assets/fonts/PublicSans-VariableFont_wght.ttf'),
  });
  const [appReady, setAppReady] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        // Ensure minimum splash duration for smooth UX
        const minDuration = new Promise(resolve => setTimeout(resolve, 1500));
        
        // Wait for both fonts and minimum duration
        await Promise.all([
          loaded || error ? Promise.resolve() : new Promise(resolve => {}),
          minDuration
        ]);
        
        // Hide native splash and show app
        await SplashScreen.hideAsync();
        setAppReady(true);
      } catch (e) {
        console.warn('Error during app initialization:', e);
        // Fallback: show app even if there's an error
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    }
    
    if (loaded || error) {
      prepare();
    }
  }, [loaded, error]);
  
  // Show custom splash until app is ready
  if (!appReady) {
    return <CustomSplashScreen />;
  }
  
  return (
      <ConvexAuthProvider 
        client={convex}
        storage={
          Platform.OS == "android" || Platform.OS == "ios"
            ? secureStorage
            : undefined
        }
      >

          <StatusBar style="dark" backgroundColor="#FEF8F5" />
          


          <AuthLoading>Loading</AuthLoading>
          
          <Unauthenticated>
            <WelcomeScreen />
          </Unauthenticated>

          {/* <Authenticated>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#FEF8F5" }
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="emergency" />
              <Stack.Screen name="lawyers" />
              <Stack.Screen name="legal-aid" />
            </Stack>
          </Authenticated> */}
          



      </ConvexAuthProvider>
  );
}
