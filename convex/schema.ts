import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
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