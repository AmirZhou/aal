import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

export default function CompleteScreen() {
  const handleGetStarted = () => {
    // TODO: Set onboarding complete flag in AsyncStorage
    router.replace('/');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Complete Screen</Text>
        <Text style={styles.subtitle}>Ready to get started with Access Alberta Legal!</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Text style={styles.backButton} onPress={handleBack}>
          Back
        </Text>
        <Text style={styles.getStartedButton} onPress={handleGetStarted}>
          Get Started
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  backButton: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    padding: theme.spacing.md,
  },
  getStartedButton: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
    padding: theme.spacing.md,
  },
});