import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Add item to favorites
export const addToFavorites = mutation({
  args: {
    itemType: v.string(),
    itemId: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if already favorited
    const existing = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_and_item", (q) => 
        q.eq("userId", userId).eq("itemId", args.itemId)
      )
      .first();

    if (existing) {
      throw new Error("Item already in favorites");
    }

    return await ctx.db.insert("userFavorites", {
      userId,
      itemType: args.itemType,
      itemId: args.itemId,
      notes: args.notes,
      addedAt: Date.now(),
    });
  },
});

// Remove item from favorites
export const removeFromFavorites = mutation({
  args: {
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const favorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_and_item", (q) => 
        q.eq("userId", userId).eq("itemId", args.itemId)
      )
      .first();

    if (!favorite) {
      throw new Error("Item not in favorites");
    }

    await ctx.db.delete(favorite._id);
    return favorite._id;
  },
});

// Get user favorites
export const getUserFavorites = query({
  args: {
    itemType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    let query = ctx.db
      .query("userFavorites")
      .withIndex("by_user", (q) => q.eq("userId", userId));

    if (args.itemType) {
      query = ctx.db
        .query("userFavorites")
        .withIndex("by_user_and_type", (q) => 
          q.eq("userId", userId).eq("itemType", args.itemType!)
        );
    }

    return await query.collect();
  },
});

// Check if item is favorited
export const isFavorited = query({
  args: {
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return false;
    }

    const favorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_and_item", (q) => 
        q.eq("userId", userId).eq("itemId", args.itemId)
      )
      .first();

    return !!favorite;
  },
});

// Update favorite notes
export const updateFavoriteNotes = mutation({
  args: {
    itemId: v.string(),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const favorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_and_item", (q) => 
        q.eq("userId", userId).eq("itemId", args.itemId)
      )
      .first();

    if (!favorite) {
      throw new Error("Item not in favorites");
    }

    await ctx.db.patch(favorite._id, {
      notes: args.notes,
    });

    return favorite._id;
  },
});