# Access Alberta Legal – Business Requirements Document

**Prepared by**: Joseph Mathew  
**Date:** August 7, 2025  
**Project Phase:** Phase 3 – Business Requirements and UI Mockups  
**App Name:** Access Alberta Legal  
**Team:** Boundary Breakers  

---

## 📌 1. Purpose of the App

Access Alberta Legal is a free mobile app designed to connect Calgarians and Albertans with legal resources, aid services, and emergency contacts. It simplifies legal navigation with easy search, location-based filtering, and direct contact options — no login required. The app is especially designed for people who may be in distress or unfamiliar with the legal system and need help quickly and clearly.

---

## 👥 2. User Roles

| Role             | Description                                                       |
|------------------|-------------------------------------------------------------------|
| Public User      | General public seeking legal help, contacts, or services         |
| Legal Aid Provider | Legal professionals or service providers listed on the app     |
| App Admin        | (Future phase) Will manage and update legal data, resources      |

---

## 📲 3. Core Features

| Feature                    | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| Search Legal Aid           | Find legal services by type, location, urgency                              |
| AI Legal Chat (Stitch)     | Ask legal questions and receive curated responses using an AI chatbot       |
| Emergency Contacts         | Quick access to legal aid during emergencies                                |
| Legal Topics Directory     | Browse categorized legal topics and linked resources                        |
| Bookmark/Save Services     | Save favorite legal providers (optional feature)                            |
| Map Integration            | Display nearby legal services using GPS and provide directions              |

---

## 📦 4. Functional Requirements

| ID   | Requirement                                                              |
|------|---------------------------------------------------------------------------|
| FR1  | User can search for legal aid services                                   |
| FR2  | User can view service details (name, contact, type, map, hours, etc.)    |
| FR3  | User can initiate an AI legal chat session using Stitch                  |
| FR4  | User can access location-based suggestions using GPS                     |
| FR5  | Legal info and contacts are fetched from Oracle APEX database            |
| FR6  | User can view categorized legal topics and open associated resources     |
| FR7  | User can contact providers via phone or get map directions                |
| FR8  | User can use the app without logging in                                  |

---

## 🔐 5. Non-Functional Requirements

| ID     | Requirement                                                                 |
|--------|------------------------------------------------------------------------------|
| NFR1   | App must work on both Android and iOS                                       |
| NFR2   | Data must be loaded within 2 seconds for optimal user experience            |
| NFR3   | App should work offline for previously viewed or cached data                |
| NFR4   | Styling must comply with accessibility guidelines using OKLCH color system  |
| NFR5   | Navigation must use Expo Router for consistent routing structure            |
| NFR6   | App should be responsive and mobile-optimized                               |
| NFR7   | App must be maintainable with modular components and documented structure    |

---

## 🌐 6. Data Sources & Technologies

- **Oracle APEX DB** – Stores legal contacts, topics, locations, and resources
- **React Native + Expo** – Mobile development framework
- **pnpm + monorepo** – Package management and workspace structure
- **Stitch AI (via API)** – Chatbot for legal Q&A support
- **Google Maps API** *(planned)* – For displaying and navigating to nearby legal aid

---

## ✅ 7. Milestone Checklist

| Milestone                          | Status        |
|------------------------------------|---------------|
| App architecture complete (Phase 2) | ✅ Completed  |
| Business requirements defined       | ✅ This Document |
| UI wireframes/mockups               | ✅ Completed  |
| First screen components coded       | ⬜ Not started |
| Backend connection tested           | ⬜ Not started |

---

## 📝 Notes

- The app must remain free, accessible, and privacy-respecting.
- No login should be required for accessing the core features.
- AI chatbot must make it clear that it's not providing legal advice but general guidance.
- Backend and database schema design must support scalability for future data expansion.

---