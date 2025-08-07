import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  _id: string;
  email?: string;
  name?: string;
  image?: string;
  emailVerificationTime?: number;
  phone?: string;
  phoneVerificationTime?: number;
  isAnonymous?: boolean;
}

interface UserProfile {
  _id: string;
  userId: string;
  location?: {
    city: string;
    province: string;
    postalCode?: string;
  };
  legalInterests: string[];
  preferredLanguages: string[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  searchRadius?: number;
  updatedAt: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { signIn: convexSignIn, signOut: convexSignOut } = useAuthActions();
  const [isLoading, setIsLoading] = useState(true);
  
  // Queries
  const user = useQuery(api.users.getCurrentUser);
  const userProfile = useQuery(api.users.getUserProfile);
  
  // Mutations
  const createUserProfile = useMutation(api.users.createUserProfile);
  const updateUserProfile = useMutation(api.users.updateUserProfile);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Set loading to false once we have attempted to load user data
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Create user profile if user exists but no profile
    if (user && !userProfile && userProfile !== undefined) {
      createUserProfile().catch(console.error);
    }
  }, [user, userProfile, createUserProfile]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await convexSignIn("password", { email, password, flow: "signIn" });
      
      // Store credentials securely for session persistence
      await SecureStore.setItemAsync('userEmail', email);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      await convexSignIn("password", { email, password, name, flow: "signUp" });
      
      // Store credentials securely
      await SecureStore.setItemAsync('userEmail', email);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await convexSignOut();
      
      // Clear stored credentials
      await SecureStore.deleteItemAsync('userEmail');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    try {
      await updateUserProfile(profileData);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};