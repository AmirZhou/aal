
import { AuthProvider } from "@/contexts/AuthContext";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider>
        <AuthProvider>
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
        </AuthProvider>
      </ConvexAuthProvider>
    </ConvexProvider>
  );
}
