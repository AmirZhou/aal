# Expo Router Efficient Learning Path

*Generated on August 07, 2024 from conversation analysis*

## Overview

When building splash screens and onboarding flows in React Native with Expo, you don't need to master all of Expo Router's documentation. This guide provides a focused learning path that cuts 3 hours of study down to 1-1.5 hours while still achieving your implementation goals.

## Key Concepts

### Strategic Learning vs. Complete Documentation
Instead of reading entire documentation sections, focus on specific patterns you'll actually use. For splash/onboarding implementation, you need minimal router knowledge since the file-based routing is already working.

### Building on Existing Architecture
Your app already has:
- File-based routing working (`app/` directory structure)
- ConvexAuthProvider set up in `_layout.tsx`
- Stack navigation configured
- Authentication flow established

### Implementation-First Approach
Learn router concepts through implementing your specific feature rather than abstract study.

## Technical Implementation

### Essential Router Concepts (30-45 minutes)

```javascript
// 1. File-based routing (you already have this)
app/
  _layout.tsx     // Root layout
  index.tsx       // Home screen
  lawyers.tsx     // Lawyer screen

// 2. Navigation methods you'll need
import { router } from 'expo-router';

// Replace current route (for splash → onboarding)
router.replace('/onboarding');

// Push new route (for onboarding navigation)
router.push('/onboarding/step-2');

// 3. Redirect logic for flow control
import { Redirect } from 'expo-router';

if (isFirstTime) {
  return <Redirect href="/onboarding" />;
}
```

### Practical Implementation Pattern

```javascript
// _layout.tsx modification for splash/onboarding
export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    checkFirstTimeUser();
  }, []);

  const checkFirstTimeUser = async () => {
    const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
    setIsFirstTime(!hasSeenOnboarding);
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <ConvexAuthProvider>
      {/* Your existing navigation */}
    </ConvexAuthProvider>
  );
}
```

### Best Practices

1. **Leverage existing architecture** - Don't rebuild what's working, extend it
2. **Use AsyncStorage for persistence** - Track onboarding completion across app launches
3. **Implement redirect logic early** - Handle flow control at the layout level
4. **Test on all platforms** - Your app targets iOS, Android, and Web

## Common Pitfalls

- **Over-studying documentation** - You don't need Advanced patterns for basic splash/onboarding
- **Rebuilding working navigation** - Your current router setup is already functional
- **Ignoring existing auth flow** - Integrate with ConvexAuthProvider rather than replacing it
- **Not testing platform differences** - Web vs mobile storage behaves differently

## Resources and References

- [Expo Router File-based routing](https://docs.expo.dev/router/introduction/) (just the basics)
- [AsyncStorage for React Native](https://react-native-async-storage.github.io/async-storage/)
- Your existing codebase: `app/_layout.tsx` and `app/index.tsx`

---

## YouTube Video Script (4-minute educational video)

### Hook (0-15 seconds)
"Today we're diving straight into Expo Router learning optimization - I'll show you exactly how to implement splash screens and onboarding without wasting 3 hours on documentation. Let's get started."

### Main Content (15 seconds - 3 minutes 30 seconds)

**Section 1: The Problem (15-45 seconds)**
"Here's the challenge most developers face with Expo Router: they think they need to master the entire documentation before implementing basic features like splash screens. The truth is, if your routing is already working, you need maybe 10% of what's in those docs. Let me show you the solution."

**Section 2: The Solution (45 seconds - 2 minutes 30 seconds)**
"The key is building on what you already have. Here's how it works:"

*[Show existing _layout.tsx on screen]*

```javascript
// Instead of learning everything, just add this to your existing layout
const [isLoading, setIsLoading] = useState(true);
const [isFirstTime, setIsFirstTime] = useState(false);

// Check if user needs onboarding
useEffect(() => {
  AsyncStorage.getItem('hasSeenOnboarding').then(seen => {
    setIsFirstTime(!seen);
    setIsLoading(false);
  });
}, []);

// Simple redirect logic
if (isLoading) return <SplashScreen />;
if (isFirstTime) return <Redirect href="/onboarding" />;
```

"Notice how we're not rebuilding the navigation - we're just adding conditional rendering. This is crucial because your ConvexAuthProvider and existing routing continue to work exactly as before."

**Section 3: Pro Tips (2:30 - 3:30)**
"Here are three pro tips to level up your implementation:

1. **Study strategically** - Only learn router.replace() and Redirect component - skip Advanced patterns for now
2. **Test AsyncStorage differences** - Web uses localStorage, mobile uses native storage - test both  
3. **Leverage existing auth flow** - Your ConvexAuthProvider is already handling user state - don't duplicate that logic"

### Closing (3:30 - 4:00)
"That's efficient Expo Router learning in action. You now know how to implement splash and onboarding in 1.5 hours instead of 3. Try this focused approach in your next project and let me know how much time you save in the comments. Subscribe for more efficient development tutorials!"

### On-Screen Text Overlays
- "30-45 mins study vs 3 hours"
- "Build on existing architecture"
- "AsyncStorage + Redirect = Simple flow"
- "Links to minimal docs in description"

---

*Note: This content is generated from conversation analysis and may need refinement for specific use cases.*