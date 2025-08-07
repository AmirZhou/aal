import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Get current user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }

    const user = await ctx.db.get(userId);
    return user;
  },
});

// Get user profile
export const getUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return profile;
  },
});

// Create user profile after authentication (called automatically after signup)
export const createUserProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if profile already exists
    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingProfile) {
      return existingProfile._id;
    }

    // Create default user profile
    const profileId = await ctx.db.insert("userProfiles", {
      userId,
      legalInterests: [],
      preferredLanguages: ["English"],
      notificationPreferences: {
        email: true,
        push: true,
        sms: false,
      },
      updatedAt: Date.now(),
    });

    return profileId;
  },
});

// Update user profile
export const updateUserProfile = mutation({
  args: {
    location: v.optional(v.object({
      city: v.string(),
      province: v.string(),
      postalCode: v.optional(v.string()),
    })),
    legalInterests: v.optional(v.array(v.string())),
    preferredLanguages: v.optional(v.array(v.string())),
    notificationPreferences: v.optional(v.object({
      email: v.boolean(),
      push: v.boolean(),
      sms: v.boolean(),
    })),
    searchRadius: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const updateData = {
      ...args,
      updatedAt: Date.now(),
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof typeof updateData] === undefined) {
        delete updateData[key as keyof typeof updateData];
      }
    });

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, updateData);
      return existingProfile._id;
    } else {
      // Create profile if it doesn't exist
      const profileData = {
        userId,
        location: args.location,
        legalInterests: args.legalInterests || [],
        preferredLanguages: args.preferredLanguages || ["English"],
        notificationPreferences: args.notificationPreferences || {
          email: true,
          push: true,
          sms: false,
        },
        searchRadius: args.searchRadius,
        updatedAt: Date.now(),
      };

      return await ctx.db.insert("userProfiles", profileData);
    }
  },
});