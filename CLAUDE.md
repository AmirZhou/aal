# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Access Alberta Legal (AAL) is a React Native mobile application built with Expo that helps users connect with legal resources, lawyers, and legal aid services across Alberta. The app provides emergency legal help, lawyer search functionality, and access to legal aid services.

## Tech Stack

- **Frontend**: React Native with Expo Router for navigation
- **Backend**: Convex for real-time database and serverless functions
- **Authentication**: @convex-dev/auth with Google OAuth and SecureStore for mobile platforms
- **Styling**: Hybrid approach - React Native StyleSheet + NativeWind/TailwindCSS
- **UI Framework**: GlueStack UI component library with platform-specific variants
- **TypeScript**: Strict TypeScript configuration with path aliases (@/* mapping)
- **Animations**: React Native Animated API for splash screen and transitions

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (auto-clears cache)
npm start

# Platform-specific development with dark mode support
npm run android    # Android emulator with DARK_MODE=media
npm run ios        # iOS simulator with DARK_MODE=media  
npm run web        # Web browser with DARK_MODE=media

# Code quality
npm run lint       # ESLint with Expo config

# Reset project (moves starter code to app-example/)
npm run reset-project
```

### Important Notes:
- All platform commands automatically set `DARK_MODE=media` for system UI integration
- `npm start` automatically runs with `--clear` flag for cache clearing
- Development server supports hot reloading across all platforms

## Architecture

### App Structure
- **app/**: File-based routing with Expo Router
  - `_layout.tsx`: Root layout with ConvexAuthProvider, splash screen management, and navigation stack
  - `index.tsx`: Home screen with categories, quick actions, and auto-seeding logic
  - `emergency.tsx`: Emergency legal help resources
  - `lawyers.tsx`: Lawyer search and listing
  - `legal-aid.tsx`: Legal aid services
  - `(onBoarding)/`: Route group for onboarding flow with nested layout
  - `SignIn.tsx`: Google OAuth authentication with platform-specific web browser handling
  - `SignOut.tsx`: Authentication sign-out functionality

### Backend (Convex)
- **convex/**: Serverless functions and database schema
  - `schema.ts`: Database tables for legal resources, lawyers, legal aid services, categories, and user management
  - `auth.config.js`: Authentication configuration
  - `lawyers.ts`: Query and mutation functions for lawyer data
  - `legalResources.ts`: Functions for legal resources and guides
  - `legalAidServices.ts`: Functions for legal aid service data
  - `categories.ts`: Category management functions
  - `seedData.ts`: Data seeding functions
  - `users.ts`: User profile and management functions
  - `favorites.ts`: User favorites functionality

### Database Schema
- **legalResources**: Legal guides, forms, and resources with categories, emergency flags, and contact info
- **lawyers**: Lawyer profiles with specialties, ratings, legal aid acceptance, and multilingual support
- **legalAidServices**: Legal aid clinics and programs with eligibility requirements and service types
- **categories**: Legal help categories with icons, colors, and emergency status
- **userProfiles**: User location, preferences, and notification settings
- **userFavorites**: User-saved items across all content types
- **userSearchHistory**: Search tracking with filters and results
- **userRecommendations**: AI-generated recommendations for users

### Authentication System
- Uses @convex-dev/auth for authentication
- SecureStore integration for mobile platforms (iOS/Android)
- Web fallback for browser environments
- User profiles linked to auth system through userId references

### Styling System
- **Dual Approach**: React Native StyleSheet + NativeWind/TailwindCSS integration
- **Centralized Theme**: `constants/theme.ts` with consistent color palette, spacing, and typography scales
- **Primary Colors**: Green (#739877) and warm background (#FEF8F5)
- **GlueStack UI**: Platform-specific component variants (index.tsx vs index.web.tsx)
- **TailwindCSS**: Full configuration with CSS variables for dynamic theming
- **Dark Mode**: System-level dark mode support through DARK_MODE=media environment variable
- **Global Styles**: CSS imports through Metro bundler configuration

## Key Development Patterns

### Convex Integration
- Use `useQuery()` for data fetching: `useQuery(api.lawyers.getAll)`
- Use `useMutation()` for data updates: `useMutation(api.lawyers.seedData)`
- All database operations are type-safe with generated API types
- Authentication context provided through ConvexAuthProvider

### Navigation
- File-based routing with Expo Router
- Use `router.push()` for navigation: `router.push('/lawyers')`
- Stack navigation with shared screen options for consistent styling
- No header shown by default, custom navigation implemented

### TypeScript Configuration
- Strict TypeScript enabled
- Path aliases configured: `@/*` maps to project root
- Expo TypeScript base configuration extended
- Generated Convex types for API safety

### Environment Variables
- `EXPO_PUBLIC_CONVEX_URL`: Required for Convex client connection
- `CONVEX_SITE_URL`: Used in auth configuration
- `DARK_MODE`: Set to "media" for system-level dark mode support
- Set in `.env` file for local development

### Splash Screen Implementation
- **Production-Ready**: Custom animated splash screen with React Native Animated API
- **Minimum Duration**: 1500ms minimum display time for smooth UX
- **Error Handling**: Robust error handling with fallback mechanisms
- **Font Loading**: Coordinated with custom font loading (PublicSans Variable fonts)
- **Platform Integration**: Proper integration with Expo's native splash screen API
- **Animation**: Parallel fade and scale animations for smooth entrance

## Data Seeding
The app includes comprehensive seed data for Alberta legal resources. Seeding is triggered automatically on first load when no categories exist (see `app/index.tsx:14-20`). Manual seeding can also be triggered via Convex dashboard.

## Authentication Flow
- Authentication handled through ConvexAuthProvider in root layout
- Secure storage used on mobile platforms
- User profiles created and managed separately from auth users
- Favorites, search history, and recommendations tied to authenticated users

## Testing
- Use Expo's built-in testing capabilities
- Test on multiple platforms (iOS, Android, Web) using Expo development build
- ESLint configured with Expo standards

## Deployment
- Production builds through Expo EAS
- Web deployment outputs static files with Metro bundler
- Requires Convex deployment for backend functionality
- Authentication requires proper domain configuration in auth.config.js

## Current Implementation Status
- **Authentication**: Complete Google OAuth implementation with @convex-dev/auth, SecureStore, and platform-specific web browser handling
- **Splash Screen**: Production-ready animated splash with minimum duration control and error handling
- **UI Framework**: GlueStack UI components with platform-specific variants and NativeWind integration
- **Data Seeding**: Automatic seeding triggers on first load when no categories exist (app/index.tsx:18-23)
- **Platform Support**: iOS, Android, and Web with complete platform-specific implementations
- **Navigation**: Stack navigation with custom headerless screens, route groups, and consistent styling
- **App State**: Currently on 'auth' branch with working SignIn/SignOut functionality
- **Build Configuration**: New Architecture enabled, Metro + NativeWind integration, custom fonts loaded

## Critical Architecture Patterns

### Platform-Specific Storage Integration
```typescript
// _layout.tsx storage pattern
const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync
}

// Conditional storage based on platform
storage={
  Platform.OS == "android" || Platform.OS == "ios"
    ? secureStorage
    : undefined  // Web uses default localStorage
}
```

### Auto-Seeding Pattern
```typescript
// app/index.tsx automatic seeding pattern
const categories = useQuery(api.categories.getAll);
const seedData = useMutation(api.seedData.seedAll);

useEffect(() => {
  if (categories && categories.length === 0) {
    // Only seed if no categories exist
    seedData().catch(console.error);
  }
}, [categories, seedData]);
```

### Splash Screen Management Pattern
```typescript
// _layout.tsx splash screen with minimum duration
const [appReady, setAppReady] = useState(false);

useEffect(() => {
  async function prepare() {
    try {
      const minDuration = new Promise(resolve => setTimeout(resolve, 1500));
      await Promise.all([
        loaded || error ? Promise.resolve() : new Promise(resolve => {}),
        minDuration
      ]);
      await SplashScreen.hideAsync();
      setAppReady(true);
    } catch (e) {
      console.warn('Error during app initialization:', e);
      await SplashScreen.hideAsync();
      setAppReady(true);
    }
  }
  if (loaded || error) prepare();
}, [loaded, error]);
```

### Convex Client Configuration
- Convex client configured with `unsavedChangesWarning: false` for mobile UX
- Environment variable `EXPO_PUBLIC_CONVEX_URL` is required for client connection
- Auth domain configuration through `CONVEX_SITE_URL` in auth.config.js

### Theme Integration Pattern
**Hybrid Styling Approach**: The app uses both React Native StyleSheet and NativeWind/TailwindCSS:

```typescript
// Traditional React Native styling with theme constants
import { theme } from '@/constants/theme';
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  }
});
```

```typescript
// GlueStack UI components with built-in theming
import { Heading } from "@/components/ui/heading";
<Heading size="3xl">Access Alberta Legal</Heading>
```

The centralized theme in `constants/theme.ts` provides:
- Consistent spacing scale (xs: 4px → xxl: 48px)
- Typography scale with semantic font weights
- Border radius scale for consistent visual hierarchy
- Color palette with semantic naming (primary, background, text, textSecondary, etc.)

### Build Configuration Patterns
```javascript
// babel.config.js - Path alias setup
plugins: [
  'react-native-reanimated/plugin',
  ['module-resolver', {
    root: ['./'],
    alias: { '@': './' }
  }]
]

// metro.config.js - NativeWind integration
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(config, { input: './global.css' });

// app.json - New Architecture & Splash Screen
{
  "newArchEnabled": true,
  "plugins": [
    "expo-router",
    ["expo-splash-screen", {
      "image": "./assets/images/splash-icon.png",
      "imageWidth": 200,
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }]
  ]
}
```

## Development Workflow

### Expo Router File-Based Routing
- All screens in `app/` directory are automatically routed
- **Current screens**: index, emergency, lawyers, legal-aid, SignIn, SignOut
- **Route Groups**: `(onBoarding)/` for grouped onboarding screens with nested layout
- **Stack configuration**: `_layout.tsx` with `headerShown: false` for custom navigation
- **Navigation**: Use `router.push('/screen-name')` for navigation
- **Typed Routes**: Enabled via `experiments: { typedRoutes: true }` in app.json

### Authentication Flow Implementation
```typescript
// SignIn.tsx - Platform-specific OAuth flow
const { signIn } = useAuthActions();
const redirectTo = makeRedirectUri();

const handleSignIn = async () => {
  const { redirect } = await signIn("google", { redirectTo });
  if (Platform.OS === "web") return;
  
  // Mobile-specific web browser handling
  const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);
  if (result.type === "success") {
    const code = new URL(result.url).searchParams.get("code")!;
    await signIn("google", { code });
  }
};
```

### Database Operations
- Use `useQuery(api.tableName.functionName)` for data fetching
- Use `useMutation(api.tableName.functionName)` for data modifications
- All operations are type-safe with generated Convex API types
- Query results automatically re-render components on data changes

## Quick Start for Claude Instances

### Essential Files to Understand First:
1. **`/Users/yuezhou/projs/mobile-class/aal/package.json`** - Dependencies and scripts
2. **`/Users/yuezhou/projs/mobile-class/aal/app/_layout.tsx`** - App initialization, auth provider, splash screen
3. **`/Users/yuezhou/projs/mobile-class/aal/app/index.tsx`** - Main screen with auto-seeding logic
4. **`/Users/yuezhou/projs/mobile-class/aal/constants/theme.ts`** - Centralized styling constants
5. **`/Users/yuezhou/projs/mobile-class/aal/convex/schema.ts`** - Database schema and tables

### Common Patterns to Follow:
- **Always use absolute paths** in tool calls: `/Users/yuezhou/projs/mobile-class/aal/...`
- **Import patterns**: Use `@/` for path aliases (e.g., `@/components/ui/button`)
- **Styling approach**: Mix of React Native StyleSheet + GlueStack UI components
- **Platform handling**: Check Platform.OS for mobile-specific features
- **Error handling**: Always include try-catch for async operations

### Development Environment:
- **Current branch**: `auth` (working authentication implementation)
- **Node environment**: React 19.0.0, React Native 0.79.5, Expo SDK 53
- **Key features**: New Architecture enabled, typed routes, NativeWind integration
- **Platform testing**: iOS simulator, Android emulator, and web browser all supported

### Integration Notes:
- **Authentication**: Google OAuth working across all platforms
- **Data**: Auto-seeds Alberta legal resources on first run
- **Splash**: Custom animated splash screen with proper timing
- **Styling**: Hybrid approach allows both traditional RN styles and modern CSS-in-JS
- **Assets**: Custom fonts, icons, illustrations, and Rive animations ready to use