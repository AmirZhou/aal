# Expo Router Screen Flow Control

*Generated on August 07, 2024 from conversation analysis*

## Overview

Expo Router uses a hierarchical flow control system where `_layout.tsx` acts as the root controller. By understanding conditional rendering patterns and state management, you can control the entire app's screen flow from a single entry point. This approach enables complex flows like splash screens, onboarding, and authentication without complex navigation logic.

## Key Concepts

### Root Layout as State Machine
The `_layout.tsx` file functions as a state machine where different states render completely different UI trees. Each conditional return statement represents a different "screen state" in your application flow.

### Conditional Rendering Pattern
Instead of traditional navigation, Expo Router uses conditional rendering at the root level. This means you can show splash screens, onboarding flows, or the main app based on application state, all controlled from one location.

### Screen Order Hierarchy
The screen display order follows a specific hierarchy:
1. `app/_layout.tsx` (root layout - always loads first)
2. `app/index.tsx` (default first screen after providers load)
3. Other screens based on navigation

## Technical Implementation

### Basic Flow Control Structure

```typescript
// app/_layout.tsx - Root controller
export default function RootLayout() {
  const [loaded, error] = useFonts({...});
  const [showSplash, setShowSplash] = useState(true);
  
  // Step 1: Show native splash while fonts load
  if (!loaded && !error) {
    return null; // Native splash screen
  }
  
  // Step 2: Show custom splash
  if (showSplash) {
    return <CustomSplashScreen />;
  }
  
  // Step 3: Show main app
  return (
    <ConvexAuthProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ConvexAuthProvider>
  );
}
```

### State Transition Management

```typescript
// Control state transitions with useEffect
useEffect(() => {
  if (loaded || error) {
    SplashScreen.hideAsync(); // Hide native splash
    setTimeout(() => {
      setShowSplash(false); // Transition to main app
    }, 2000);
  }
}, [loaded, error]);
```

### Extended Flow Pattern (Splash → Onboarding → Main App)

```typescript
export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(null);
  
  // Loading states
  if (showSplash) return <CustomSplashScreen />;
  if (isFirstTime === null) return <LoadingScreen />; // Checking first-time status
  
  // Flow control
  if (showOnboarding || isFirstTime) return <OnboardingFlow />;
  
  // Main application
  return <MainApp />;
}
```

### Best Practices

1. **Single Source of Truth** - Control all major flow logic from `_layout.tsx`
2. **State-Based Rendering** - Use React state to determine which UI tree to render
3. **Async State Management** - Handle loading states properly with null returns
4. **Platform Awareness** - Consider platform-specific behaviors (SecureStore vs localStorage)

## Common Pitfalls

- **Multiple Return Points** - Remember only ONE return statement executes per render
- **State Race Conditions** - Initialize states properly to avoid flickering between screens
- **Memory Leaks** - Clear timeouts and intervals when components unmount
- **Platform Differences** - Web and mobile platforms handle splash screens differently

## Resources and References

- [Expo Router File-based Routing](https://docs.expo.dev/router/introduction/)
- [Expo SplashScreen API](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
- [React Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [AsyncStorage for React Native](https://react-native-async-storage.github.io/async-storage/)

---

## YouTube Video Script (4-minute educational video)

### Hook (0-15 seconds)
"Today we're diving straight into Expo Router screen flow control - I'll show you exactly how to control your entire app's screen flow from one file in under 4 minutes. Let's get started."

### Main Content (15 seconds - 3 minutes 30 seconds)

**Section 1: The Problem (15-45 seconds)**
"Here's the challenge most developers face with Expo Router: they don't understand how screen order works or how to control complex flows like splash screens and onboarding. You might think you need complex navigation logic, but the truth is simpler. Let me show you the solution."

**Section 2: The Solution (45 seconds - 2 minutes 30 seconds)**
"The key is understanding that _layout.tsx acts as a state machine. Here's how it works:"

*[Show _layout.tsx file on screen]*

```typescript
export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  
  // Step 1: Native splash while loading
  if (!loaded && !error) {
    return null;
  }
  
  // Step 2: Custom splash screen
  if (showSplash) {
    return <CustomSplashScreen />;
  }
  
  // Step 3: Main app
  return <MainApp />;
}
```

"Notice how each return statement renders a completely different UI tree. This is crucial because you're controlling the ENTIRE app from one location. When showSplash changes to false, React re-renders and shows your main app instead."

**Section 3: Pro Tips (2:30 - 3:30)**
"Here are three pro tips to level up your implementation:

1. **Use state transitions** - Control timing with useEffect and setTimeout to create smooth transitions between screens
2. **Handle loading states properly** - Return null to show native splash while async operations complete  
3. **Think in states, not navigation** - Each conditional return is a different app state, not a navigation action"

### Closing (3:30 - 4:00)
"That's Expo Router flow control in action. You now know how to control your entire app's screen flow using conditional rendering patterns. Try this state machine approach in your next project and let me know how it works for you in the comments. Subscribe for more React Native tutorials!"

### On-Screen Text Overlays
- "_layout.tsx = State Machine"
- "Conditional Returns = Different Screens"
- "useState + useEffect = Flow Control"
- "Links to Expo Router docs in description"

---

*Note: This content is generated from conversation analysis and may need refinement for specific use cases.*