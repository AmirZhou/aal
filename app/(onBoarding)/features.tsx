import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

export default function FeaturesScreen() {
  const handleNext = () => {
    router.push('/(onBoarding)/permissions');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Features Screen</Text>
        <Text style={styles.subtitle}>Placeholder for app features content</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <View style={styles.leftButtons}>
          <Text style={styles.backButton} onPress={handleBack}>
            Back
          </Text>
          <Text style={styles.skipButton} onPress={handleSkip}>
            Skip
          </Text>
        </View>
        <Text style={styles.nextButton} onPress={handleNext}>
          Next
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
  leftButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  backButton: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    padding: theme.spacing.md,
  },
  skipButton: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    padding: theme.spacing.md,
  },
  nextButton: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
    padding: theme.spacing.md,
  },
});