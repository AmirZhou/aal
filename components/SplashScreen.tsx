import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <Ionicons 
            name="scale" 
            size={80} 
            color={theme.colors.primary} 
          />
        </View>
        
        {/* App Name */}
        <Text style={styles.title}>Access Alberta Legal</Text>
        <Text style={styles.subtitle}>Your Legal Gateway</Text>
        
        {/* Loading Indicator */}
        <ActivityIndicator 
          size="large" 
          color={theme.colors.primary}
          style={styles.loader}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  loader: {
    marginTop: theme.spacing.lg,
  },
});