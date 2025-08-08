import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FEF8F5" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FEF8F5" },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="features" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="complete" />
      </Stack>
    </>
  );
}