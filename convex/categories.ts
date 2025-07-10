import { query, mutation } from './_generated/server';

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  }
});

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existing = await ctx.db.query("categories").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    // Insert sample data
    const sampleCategories = [
      {
        name: "Emergency Legal Help",
        description: "Immediate legal assistance for urgent situations",
        icon: "warning",
        color: "#F44336",
        isEmergency: true,
        createdAt: Date.now(),
      },
      {
        name: "Family Law",
        description: "Divorce, custody, support, and family violence",
        icon: "home",
        color: "#739877",
        isEmergency: false,
        createdAt: Date.now(),
      },
      {
        name: "Criminal Law",
        description: "Criminal charges, court proceedings, and legal rights",
        icon: "shield",
        color: "#739877",
        isEmergency: false,
        createdAt: Date.now(),
      },
      {
        name: "Employment Law",
        description: "Workplace rights, wrongful dismissal, and employment standards",
        icon: "briefcase",
        color: "#739877",
        isEmergency: false,
        createdAt: Date.now(),
      },
      {
        name: "Housing & Landlord-Tenant",
        description: "Rental issues, evictions, and housing rights",
        icon: "home",
        color: "#739877",
        isEmergency: false,
        createdAt: Date.now(),
      },
      {
        name: "Immigration Law",
        description: "Immigration applications, refugee claims, and citizenship",
        icon: "globe",
        color: "#739877",
        isEmergency: false,
        createdAt: Date.now(),
      },
      {
        name: "Personal Injury",
        description: "Motor vehicle accidents, slip and fall, and insurance claims",
        icon: "medical",
        color: "#739877",
        isEmergency: false,
        createdAt: Date.now(),
      },
      {
        name: "Legal Aid Services",
        description: "Free and low-cost legal services for qualifying individuals",
        icon: "heart",
        color: "#739877",
        isEmergency: false,
        createdAt: Date.now(),
      },
    ];

    for (const category of sampleCategories) {
      await ctx.db.insert("categories", category);
    }
  }
});