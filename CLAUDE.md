# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Access Alberta Legal (AAL) is a React Native mobile application built with Expo that helps users connect with legal resources, lawyers, and legal aid services across Alberta. The app provides emergency legal help, lawyer search functionality, and access to legal aid services.

## Tech Stack

- **Frontend**: React Native with Expo Router for navigation
- **Backend**: Convex for real-time database and serverless functions
- **Authentication**: @convex-dev/auth with SecureStore for mobile platforms
- **Styling**: React Native StyleSheet with centralized theme system
- **TypeScript**: Strict TypeScript configuration with path aliases

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start
# or with cache clearing
npm start --clear

# Platform-specific development
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Code quality
npm run lint       # ESLint with Expo config

# Reset project (moves starter code to app-example/)
npm run reset-project
```

## Architecture

### App Structure
- **app/**: File-based routing with Expo Router
  - `_layout.tsx`: Root layout with ConvexAuthProvider and navigation stack
  - `index.tsx`: Home screen with categories and quick actions
  - `emergency.tsx`: Emergency legal help resources
  - `lawyers.tsx`: Lawyer search and listing
  - `legal-aid.tsx`: Legal aid services

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

### Theming System
- Centralized theme in `constants/theme.ts`
- Consistent color palette with primary green (#739877) and warm background (#FEF8F5)
- Responsive spacing, typography, and border radius scales
- Support for light/dark mode through Expo's system UI

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
- Set in `.env` file for local development

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