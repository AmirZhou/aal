import { mutation } from './_generated/server';

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Seed categories
    const existingCategories = await ctx.db.query("categories").collect();
    if (existingCategories.length === 0) {
      const categories = [
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

      for (const category of categories) {
        await ctx.db.insert("categories", category);
      }
    }

    // Seed legal resources
    const existingResources = await ctx.db.query("legalResources").collect();
    if (existingResources.length === 0) {
      const resources = [
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

      for (const resource of resources) {
        await ctx.db.insert("legalResources", resource);
      }
    }

    // Seed lawyers
    const existingLawyers = await ctx.db.query("lawyers").collect();
    if (existingLawyers.length === 0) {
      const lawyers = [
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
      ];

      for (const lawyer of lawyers) {
        await ctx.db.insert("lawyers", lawyer);
      }
    }

    // Seed legal aid services
    const existingServices = await ctx.db.query("legalAidServices").collect();
    if (existingServices.length === 0) {
      const services = [
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
      ];

      for (const service of services) {
        await ctx.db.insert("legalAidServices", service);
      }
    }

    return { success: true, message: "Data seeded successfully" };
  }
});