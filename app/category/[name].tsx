import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name?: string }>();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Stack.Screen options={{ title: name ? String(name) : "Category" }} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Category: {name}
      </Text>
      <Text>Here you can load resources for {name}.</Text>
    </SafeAreaView>
  );
}
