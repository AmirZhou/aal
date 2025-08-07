// Auth imports
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// View
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Fonts
import { useFonts } from "expo-font";

// react
import { useEffect } from "react";

// Components
import CustomSplashScreen from "@/components/SplashScreen";

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
  
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  
  // Show native splash while fonts load
  if (!loaded && !error) {
    return <CustomSplashScreen fontsLoaded={false}/>;
  }
  if (!loaded && error) {
    return <CustomSplashScreen fontsLoaded={true}/>;
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
      </ConvexAuthProvider>
  );
}
