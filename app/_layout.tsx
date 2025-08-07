
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";

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
        storage={undefined}
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
