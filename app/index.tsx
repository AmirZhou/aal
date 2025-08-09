import { theme } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import type { Href } from "expo-router";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/** Narrow type so TS knows what a category looks like */
type Category = {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  isEmergency?: boolean;
};

export default function Index() {
  const categories = useQuery(api.categories.getAll) as Category[] | undefined;
  const seedData = useMutation(api.seedData.seedAll);

  // Seed data on first load (only if no categories)
  useEffect(() => {
    if (categories && categories.length === 0) {
      seedData().catch(console.error);
    }
  }, [categories, seedData]);

  // --- Navigation handlers (typed Href everywhere) ---
  const handleCategoryPress = (category: Category) => {
    const href: Href = {
      pathname: "/category/[name]" as const,
      params: { name: String(category.name) },
    };
    router.push(href);
  };

  const handleEmergencyPress = () => router.push("/emergency" as const);
  const handleFindLawyerPress = () => router.push("/lawyers" as const);
  const handleLegalAidPress = () => router.push("/legal-aid" as const);

  const handleAiChatPress = () => router.push("/ai-chat" as const);
  const handleQuizPress = () => router.push("/quiz" as const);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Access Alberta Legal</Text>
          <Text style={styles.subtitle}>
            Connect with legal resources, lawyers, and legal aid services across Alberta.
          </Text>
        </View>

        {/* Emergency Section */}
        <View style={styles.emergencySection}>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyPress}>
            <Ionicons name="warning-outline" size={24} color="white" />
            <Text style={styles.emergencyButtonText}>Emergency Legal Help</Text>
            <Text style={styles.emergencyButtonSubtext}>Need immediate assistance?</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleFindLawyerPress}>
              <Ionicons name="person-outline" size={28} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Find a Lawyer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={handleLegalAidPress}>
              <Ionicons name="heart-outline" size={28} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Legal Aid</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={handleAiChatPress}>
              <Ionicons name="chatbubbles-outline" size={28} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>AI Legal Assistant</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={handleQuizPress}>
              <Ionicons name="list-circle-outline" size={28} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Legal Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Legal Help Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories
              ?.filter((cat) => !cat.isEmergency)
              .map((category) => (
                <TouchableOpacity
                  key={category._id}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                >
                  <View style={styles.categoryIcon}>
                    <Ionicons
                      name={getIoniconName(category.icon)}
                      size={24}
                      color={theme.colors.primary}
                    />
                  </View>
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                  {!!category.description && (
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                  )}
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Access Alberta Legal is a free service to help you find legal resources and support.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/** Map your category icon keys to real Ionicons names */
function getIoniconName(icon?: string): any {
  const map: Record<string, any> = {
    warning: "warning-outline",
    home: "home-outline",
    shield: "shield-checkmark-outline",
    briefcase: "briefcase-outline",
    globe: "globe-outline",
    medical: "medkit-outline",
    heart: "heart-outline",
    document: "document-text-outline",
  };
  return (icon && map[icon]) || "document-text-outline";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: { flex: 1 },
  header: {
    padding: theme.spacing.lg,
    alignItems: "center",
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  emergencySection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  emergencyButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emergencyButtonText: {
    color: "white",
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    marginTop: theme.spacing.sm,
  },
  emergencyButtonSubtext: {
    color: "white",
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
    opacity: 0.9,
  },

  quickActionsSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  quickActionButton: {
    flexBasis: "48%",
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickActionText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },

  categoriesSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  categoriesGrid: {
    gap: theme.spacing.md,
  },
  categoryCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  categoryTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  categoryDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },

  footer: {
    padding: theme.spacing.lg,
    alignItems: "center",
  },
  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
