# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Access Alberta Legal (AAL) is a React Native mobile application built with Expo that helps users connect with legal resources, lawyers, and legal aid services across Alberta. The app provides emergency legal help, lawyer search functionality, and access to legal aid services.

## Tech Stack

- **Frontend**: React Native with Expo Router for navigation
- **Backend**: Convex for real-time database and serverless functions
- **Styling**: React Native StyleSheet with centralized theme system
- **TypeScript**: Strict TypeScript configuration with path aliases

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npx expo start

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
  - `_layout.tsx`: Root layout with Convex provider and navigation stack
  - `index.tsx`: Home screen with categories and quick actions
  - `emergency.tsx`: Emergency legal help resources
  - `lawyers.tsx`: Lawyer search and listing
  - `legal-aid.tsx`: Legal aid services

### Backend (Convex)
- **convex/**: Serverless functions and database schema
  - `schema.ts`: Database tables for legal resources, lawyers, legal aid services, and categories
  - `lawyers.ts`: Query and mutation functions for lawyer data
  - `legalResources.ts`: Functions for legal resources and guides
  - `legalAidServices.ts`: Functions for legal aid service data
  - `categories.ts`: Category management functions
  - `seedData.ts`: Data seeding functions

### Database Schema
- **legalResources**: Legal guides, forms, and resources with categories, emergency flags, and contact info
- **lawyers**: Lawyer profiles with specialties, ratings, legal aid acceptance, and multilingual support
- **legalAidServices**: Legal aid clinics and programs with eligibility requirements and service types
- **categories**: Legal help categories with icons, colors, and emergency status

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

### Navigation
- File-based routing with Expo Router
- Use `router.push()` for navigation: `router.push('/lawyers')`
- Stack navigation with shared screen options for consistent styling

### Environment Variables
- `EXPO_PUBLIC_CONVEX_URL`: Required for Convex client connection
- Set in `.env` file for local development

## Data Seeding
The app includes comprehensive seed data for Alberta legal resources. Run seeding through the UI on first load or manually trigger via Convex dashboard.

## Testing
- Use Expo's built-in testing capabilities
- Test on multiple platforms (iOS, Android, Web) using Expo development build

## Deployment
- Production builds through Expo EAS
- Web deployment outputs static files with Metro bundler
- Requires Convex deployment for backend functionality
