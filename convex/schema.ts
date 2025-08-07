import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Authentication tables
  // auth step 3: employ the auth tables.
  ...authTables,
  
  // User management tables  
  userProfiles: defineTable({
    userId: v.id("users"),
    location: v.optional(v.object({
      city: v.string(),
      province: v.string(),
      postalCode: v.optional(v.string()),
    })),
    legalInterests: v.array(v.string()),
    preferredLanguages: v.array(v.string()),
    notificationPreferences: v.object({
      email: v.boolean(),
      push: v.boolean(),
      sms: v.boolean(),
    }),
    searchRadius: v.optional(v.number()), // in kilometers
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
  
  userFavorites: defineTable({
    userId: v.id("users"),
    itemType: v.string(), // "lawyer", "legalAidService", "legalResource"
    itemId: v.string(),
    addedAt: v.number(),
    notes: v.optional(v.string()),
  }).index("by_user", ["userId"])
    .index("by_user_and_type", ["userId", "itemType"])
    .index("by_user_and_item", ["userId", "itemId"]),
  
  userSearchHistory: defineTable({
    userId: v.id("users"),
    searchType: v.string(), // "lawyer", "legalAid", "resource"
    searchQuery: v.optional(v.string()),
    filters: v.object({
      specialty: v.optional(v.array(v.string())),
      location: v.optional(v.string()),
      acceptsLegalAid: v.optional(v.boolean()),
      languages: v.optional(v.array(v.string())),
      rating: v.optional(v.number()),
    }),
    resultsCount: v.number(),
    clickedResults: v.array(v.string()),
    searchedAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_and_type", ["userId", "searchType"]),
  
  userRecommendations: defineTable({
    userId: v.id("users"),
    itemType: v.string(),
    itemId: v.string(),
    relevanceScore: v.number(),
    reasons: v.array(v.string()),
    generatedAt: v.number(),
    clicked: v.boolean(),
  }).index("by_user", ["userId"])
    .index("by_user_and_type", ["userId", "itemType"]),
  legalResources: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    type: v.string(), // "resource", "guide", "form"
    url: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    tags: v.array(v.string()),
    isEmergency: v.boolean(),
    isFree: v.boolean(),
    createdAt: v.number(),
  }),
  
  lawyers: defineTable({
    name: v.string(),
    firm: v.optional(v.string()),
    specialties: v.array(v.string()),
    phone: v.string(),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    website: v.optional(v.string()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    acceptsLegalAid: v.boolean(),
    languages: v.array(v.string()),
    yearsOfExperience: v.optional(v.number()),
    createdAt: v.number(),
  }),
  
  legalAidServices: defineTable({
    name: v.string(),
    description: v.string(),
    serviceType: v.string(), // "clinic", "program", "hotline"
    phone: v.string(),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    website: v.optional(v.string()),
    hoursOfOperation: v.optional(v.string()),
    eligibilityRequirements: v.optional(v.string()),
    areasOfLaw: v.array(v.string()),
    isWalkInAvailable: v.boolean(),
    appointmentRequired: v.boolean(),
    languages: v.array(v.string()),
    createdAt: v.number(),
  }),
  
  categories: defineTable({
    name: v.string(),
    description: v.string(),
    icon: v.string(),
    color: v.string(),
    isEmergency: v.boolean(),
    createdAt: v.number(),
  }),
});