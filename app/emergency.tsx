import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from "react-native";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Emergency() {
  const emergencyResources = useQuery(api.legalResources.getEmergency);

  const handleCallPress = (phone: string) => {
    const cleanPhone = phone.replace(/[^\d-]/g, '');
    Linking.openURL(`tel:${cleanPhone}`);
  };

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Emergency Legal Help</Text>
          <Text style={styles.subtitle}>
            Immediate legal assistance for urgent situations
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.emergencyContactsSection}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          
          <TouchableOpacity style={styles.emergencyContactCard} onPress={() => handleCallPress('911')}>
            <View style={styles.emergencyContactIcon}>
              <Ionicons name="call" size={24} color="white" />
            </View>
            <View style={styles.emergencyContactContent}>
              <Text style={styles.emergencyContactTitle}>Emergency Services</Text>
              <Text style={styles.emergencyContactSubtitle}>Call 911 for immediate danger</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyContactCard} onPress={() => handleCallPress('310-1818')}>
            <View style={styles.emergencyContactIcon}>
              <Ionicons name="heart" size={24} color="white" />
            </View>
            <View style={styles.emergencyContactContent}>
              <Text style={styles.emergencyContactTitle}>Family Violence Info Line</Text>
              <Text style={styles.emergencyContactSubtitle}>24/7 support - 310-1818</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyContactCard} onPress={() => handleCallPress('1-800-563-0808')}>
            <View style={styles.emergencyContactIcon}>
              <Ionicons name="chatbubble" size={24} color="white" />
            </View>
            <View style={styles.emergencyContactContent}>
              <Text style={styles.emergencyContactTitle}>Distress Centre Calgary</Text>
              <Text style={styles.emergencyContactSubtitle}>24/7 crisis support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Emergency Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Emergency Legal Resources</Text>
          {emergencyResources?.map((resource) => (
            <View key={resource._id} style={styles.resourceCard}>
              <View style={styles.resourceHeader}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <View style={styles.emergencyBadge}>
                  <Text style={styles.emergencyBadgeText}>URGENT</Text>
                </View>
              </View>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
              
              <View style={styles.resourceActions}>
                {resource.phone && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleCallPress(resource.phone!)}
                  >
                    <Ionicons name="call" size={18} color={theme.colors.primary} />
                    <Text style={styles.actionButtonText}>{resource.phone}</Text>
                  </TouchableOpacity>
                )}
                {resource.email && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEmailPress(resource.email!)}
                  >
                    <Ionicons name="mail" size={18} color={theme.colors.primary} />
                    <Text style={styles.actionButtonText}>Email</Text>
                  </TouchableOpacity>
                )}
                {resource.url && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleWebsitePress(resource.url!)}
                  >
                    <Ionicons name="globe" size={18} color={theme.colors.primary} />
                    <Text style={styles.actionButtonText}>Website</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Safety Tips */}
        <View style={styles.safetySection}>
          <Text style={styles.sectionTitle}>Safety Tips</Text>
          <View style={styles.safetyCard}>
            <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.safetyText}>
              If you are in immediate physical danger, call 911 first. Legal help can wait until you are safe.
            </Text>
          </View>
          <View style={styles.safetyCard}>
            <Ionicons name="shield-checkmark" size={24} color={theme.colors.primary} />
            <Text style={styles.safetyText}>
              Document everything related to your legal issue when it's safe to do so.
            </Text>
          </View>
          <View style={styles.safetyCard}>
            <Ionicons name="time" size={24} color={theme.colors.primary} />
            <Text style={styles.safetyText}>
              Many legal issues have time limits. Seek help as soon as possible.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  backButton: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  emergencyContactsSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  emergencyContactCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  emergencyContactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  emergencyContactContent: {
    flex: 1,
  },
  emergencyContactTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emergencyContactSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  resourcesSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  resourceCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  resourceTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  emergencyBadge: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  emergencyBadgeText: {
    color: 'white',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  resourceDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  resourceActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  actionButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },
  safetySection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  safetyCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  safetyText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
    marginLeft: theme.spacing.md,
    flex: 1,
  },
});