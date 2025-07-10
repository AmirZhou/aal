import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("legalResources").collect();
  }
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("legalResources")
      .filter(q => q.eq(q.field("category"), args.category))
      .collect();
  }
});

export const getEmergency = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("legalResources")
      .filter(q => q.eq(q.field("isEmergency"), true))
      .collect();
  }
});

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existing = await ctx.db.query("legalResources").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    // Insert sample data
    const sampleResources = [
      {
        title: "Legal Aid Alberta",
        description: "Free legal services for low-income Albertans",
        category: "Legal Aid",
        type: "resource",
        phone: "1-866-845-3425",
        email: "info@legalaid.ab.ca",
        address: "Edmonton, Calgary, and other locations",
        url: "https://www.legalaid.ab.ca",
        tags: ["free", "low-income", "general"],
        isEmergency: false,
        isFree: true,
        createdAt: Date.now(),
      },
      {
        title: "Family Violence Info Line",
        description: "24/7 confidential support for family violence",
        category: "Family Law",
        type: "resource",
        phone: "310-1818",
        tags: ["family", "violence", "emergency", "24/7"],
        isEmergency: true,
        isFree: true,
        createdAt: Date.now(),
      },
      {
        title: "Alberta Human Rights Commission",
        description: "Information and complaint process for human rights violations",
        category: "Human Rights",
        type: "resource",
        phone: "780-427-7661",
        email: "humanrights@gov.ab.ca",
        address: "800 6th Avenue SW, Calgary",
        url: "https://www.albertahumanrights.ab.ca",
        tags: ["discrimination", "human rights", "complaints"],
        isEmergency: false,
        isFree: true,
        createdAt: Date.now(),
      },
      {
        title: "Landlord and Tenant Advisory Board",
        description: "Information about rental housing rights and responsibilities",
        category: "Housing",
        type: "resource",
        phone: "780-644-3000",
        address: "Edmonton and Calgary offices",
        url: "https://www.alberta.ca/landlord-tenant-advisory-board.aspx",
        tags: ["rental", "housing", "landlord", "tenant"],
        isEmergency: false,
        isFree: true,
        createdAt: Date.now(),
      },
      {
        title: "Employment Standards Information",
        description: "Workplace rights and employment law information",
        category: "Employment",
        type: "resource",
        phone: "780-427-3731",
        email: "employmentstandards@gov.ab.ca",
        url: "https://www.alberta.ca/employment-standards.aspx",
        tags: ["employment", "workplace", "rights"],
        isEmergency: false,
        isFree: true,
        createdAt: Date.now(),
      },
      {
        title: "Alberta Motor Vehicle Accident Claims",
        description: "Information about motor vehicle accident claims and insurance",
        category: "Motor Vehicle",
        type: "resource",
        phone: "780-427-7013",
        url: "https://www.alberta.ca/motor-vehicle-accident-claims.aspx",
        tags: ["motor vehicle", "accident", "insurance", "claims"],
        isEmergency: false,
        isFree: true,
        createdAt: Date.now(),
      },
      {
        title: "Criminal Law Self-Help Guide",
        description: "Understanding criminal law processes and your rights",
        category: "Criminal Law",
        type: "guide",
        url: "https://www.cplea.ca/criminal-law/",
        tags: ["criminal", "self-help", "guide"],
        isEmergency: false,
        isFree: true,
        createdAt: Date.now(),
      },
      {
        title: "Duty Counsel Services",
        description: "Free legal advice for people appearing in court without a lawyer",
        category: "Criminal Law",
        type: "resource",
        phone: "Check with local courthouse",
        tags: ["criminal", "court", "free", "counsel"],
        isEmergency: true,
        isFree: true,
        createdAt: Date.now(),
      },
    ];

    for (const resource of sampleResources) {
      await ctx.db.insert("legalResources", resource);
    }
  }
});