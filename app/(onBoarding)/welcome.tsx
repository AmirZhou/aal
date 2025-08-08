import { Button, ButtonText } from "@/components/ui/button";
import { theme } from '@/constants/theme';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from "@/components/ui/text";
	
export default function WelcomeScreen() {
  const handleNext = () => {
    router.push('/(onBoarding)/features');
  };

  const handleSkip = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>

      // carousal goes here
      <View style={styles.content}>
        <Text size="md">Welcome Screen</Text>
      </View>

      <Button size='md' variant='solid' action='primary'>
        <ButtonText>Test Button</ButtonText>
      </Button>      
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