// Auth imports
import { Platform } from "react-native";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";

// UI
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync
}

export default function RootLayout() {
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
