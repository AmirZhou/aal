import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("legalAidServices").collect();
  }
});

export const getByServiceType = query({
  args: { serviceType: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("legalAidServices")
      .filter(q => q.eq(q.field("serviceType"), args.serviceType))
      .collect();
  }
});

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existing = await ctx.db.query("legalAidServices").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    // Insert sample data
    const sampleServices = [
      {
        name: "Legal Aid Alberta - Calgary Office",
        description: "Free legal services for qualifying low-income individuals and families",
        serviceType: "clinic",
        phone: "403-297-2260",
        email: "calgary@legalaid.ab.ca",
        address: "1019 7th Ave SW, Calgary, AB T2P 1A8",
        website: "https://www.legalaid.ab.ca",
        hoursOfOperation: "Monday-Friday 8:30 AM - 4:30 PM",
        eligibilityRequirements: "Must meet income and asset guidelines",
        areasOfLaw: ["Family Law", "Criminal Law", "Immigration", "Housing"],
        isWalkInAvailable: true,
        appointmentRequired: false,
        languages: ["English", "French", "Spanish", "Mandarin"],
        createdAt: Date.now(),
      },
      {
        name: "Student Legal Assistance",
        description: "Free legal clinic run by law students under supervision",
        serviceType: "clinic",
        phone: "403-220-6637",
        email: "sla@ucalgary.ca",
        address: "University of Calgary, 2500 University Dr NW, Calgary, AB T2N 1N4",
        website: "https://www.ucalgary.ca/student-legal-assistance",
        hoursOfOperation: "Monday-Thursday 9:00 AM - 4:00 PM",
        eligibilityRequirements: "Available to all community members",
        areasOfLaw: ["Landlord-Tenant", "Employment", "Consumer Protection", "Family Law"],
        isWalkInAvailable: false,
        appointmentRequired: true,
        languages: ["English"],
        createdAt: Date.now(),
      },
      {
        name: "Calgary Women's Emergency Shelter Legal Clinic",
        description: "Legal services for women experiencing domestic violence",
        serviceType: "clinic",
        phone: "403-234-7233",
        address: "1715 17th Ave SE, Calgary, AB T2G 1H7",
        hoursOfOperation: "By appointment only",
        eligibilityRequirements: "Women experiencing or fleeing domestic violence",
        areasOfLaw: ["Family Law", "Criminal Law", "Immigration", "Housing"],
        isWalkInAvailable: false,
        appointmentRequired: true,
        languages: ["English", "French", "Spanish"],
        createdAt: Date.now(),
      },
      {
        name: "Dial-A-Law",
        description: "Free recorded legal information available 24/7",
        serviceType: "hotline",
        phone: "403-234-9266",
        website: "https://www.cplea.ca/dial-a-law/",
        hoursOfOperation: "24/7 recorded information",
        eligibilityRequirements: "Available to all Albertans",
        areasOfLaw: ["General Legal Information", "Family Law", "Criminal Law", "Employment"],
        isWalkInAvailable: false,
        appointmentRequired: false,
        languages: ["English"],
        createdAt: Date.now(),
      },
      {
        name: "Alberta Law Line",
        description: "Free legal information and referral service",
        serviceType: "hotline",
        phone: "1-888-451-4999",
        website: "https://www.lawline.ab.ca",
        hoursOfOperation: "Monday-Friday 9:00 AM - 4:00 PM",
        eligibilityRequirements: "Available to all Albertans",
        areasOfLaw: ["General Legal Information", "Referrals", "Self-Help Resources"],
        isWalkInAvailable: false,
        appointmentRequired: false,
        languages: ["English"],
        createdAt: Date.now(),
      },
      {
        name: "Indigenous Legal Clinic",
        description: "Legal services specifically for Indigenous community members",
        serviceType: "clinic",
        phone: "403-538-7400",
        address: "140 10th Ave SE, Calgary, AB T2G 0R1",
        hoursOfOperation: "Monday-Friday 9:00 AM - 5:00 PM",
        eligibilityRequirements: "Indigenous community members",
        areasOfLaw: ["Family Law", "Criminal Law", "Child Welfare", "Treaty Rights"],
        isWalkInAvailable: true,
        appointmentRequired: false,
        languages: ["English", "Cree", "Blackfoot"],
        createdAt: Date.now(),
      },
    ];

    for (const service of sampleServices) {
      await ctx.db.insert("legalAidServices", service);
    }
  }
});