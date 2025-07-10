import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("lawyers").collect();
  }
});

export const getBySpecialty = query({
  args: { specialty: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("lawyers")
      .filter(q => q.eq(q.field("specialties"), args.specialty))
      .collect();
  }
});

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existing = await ctx.db.query("lawyers").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    // Insert sample data
    const sampleLawyers = [
      {
        name: "Sarah Johnson",
        firm: "Johnson & Associates",
        specialties: ["Family Law", "Divorce", "Child Custody"],
        phone: "403-555-0123",
        email: "sarah@johnsonlaw.ca",
        address: "1234 Main St SW, Calgary, AB T2T 1A1",
        website: "https://www.johnsonlaw.ca",
        rating: 4.8,
        reviewCount: 45,
        acceptsLegalAid: true,
        languages: ["English", "French"],
        yearsOfExperience: 12,
        createdAt: Date.now(),
      },
      {
        name: "Michael Chen",
        firm: "Chen Legal Services",
        specialties: ["Criminal Law", "DUI", "Traffic Violations"],
        phone: "403-555-0456",
        email: "michael@chenlegal.ca",
        address: "5678 Centre St N, Calgary, AB T2E 2R5",
        website: "https://www.chenlegal.ca",
        rating: 4.6,
        reviewCount: 32,
        acceptsLegalAid: true,
        languages: ["English", "Mandarin", "Cantonese"],
        yearsOfExperience: 8,
        createdAt: Date.now(),
      },
      {
        name: "Emma Rodriguez",
        firm: "Rodriguez Employment Law",
        specialties: ["Employment Law", "Wrongful Dismissal", "Human Rights"],
        phone: "403-555-0789",
        email: "emma@rodriguezlaw.ca",
        address: "9012 17th Ave SW, Calgary, AB T3C 0J5",
        rating: 4.9,
        reviewCount: 28,
        acceptsLegalAid: false,
        languages: ["English", "Spanish"],
        yearsOfExperience: 15,
        createdAt: Date.now(),
      },
      {
        name: "David Thompson",
        firm: "Thompson & Partners",
        specialties: ["Personal Injury", "Motor Vehicle Accidents", "Insurance Claims"],
        phone: "403-555-0321",
        email: "david@thompsonpartners.ca",
        address: "3456 4th St NE, Calgary, AB T2E 3M7",
        website: "https://www.thompsonpartners.ca",
        rating: 4.7,
        reviewCount: 67,
        acceptsLegalAid: true,
        languages: ["English"],
        yearsOfExperience: 20,
        createdAt: Date.now(),
      },
      {
        name: "Lisa Patel",
        firm: "Patel Immigration Law",
        specialties: ["Immigration Law", "Refugee Law", "Citizenship"],
        phone: "403-555-0654",
        email: "lisa@patelimmigration.ca",
        address: "7890 Macleod Trail S, Calgary, AB T2H 0L3",
        website: "https://www.patelimmigration.ca",
        rating: 4.5,
        reviewCount: 41,
        acceptsLegalAid: true,
        languages: ["English", "Hindi", "Gujarati"],
        yearsOfExperience: 10,
        createdAt: Date.now(),
      },
      {
        name: "Robert Anderson",
        firm: "Anderson Real Estate Law",
        specialties: ["Real Estate", "Property Law", "Construction Law"],
        phone: "403-555-0987",
        email: "robert@andersonrealestate.ca",
        address: "2345 Kensington Rd NW, Calgary, AB T2N 3T5",
        rating: 4.4,
        reviewCount: 23,
        acceptsLegalAid: false,
        languages: ["English"],
        yearsOfExperience: 18,
        createdAt: Date.now(),
      },
    ];

    for (const lawyer of sampleLawyers) {
      await ctx.db.insert("lawyers", lawyer);
    }
  }
});