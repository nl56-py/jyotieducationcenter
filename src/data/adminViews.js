import { countries } from "./countries.js";

export const adminViews = [
  {
    key: "dashboard",
    label: "Dashboard",
    summary: [
      ["42", "New inquiries"],
      ["18", "Consultation slots"],
      ["10", "Destination pages"],
      ["6", "Content drafts"],
    ],
    rows: ["Lead sources by page", "Destination interest trend", "Upcoming follow ups", "Recent content changes"],
  },
  {
    key: "leads",
    label: "Leads",
    rows: ["Sanjay - Australia - New", "Ritika - IELTS - Follow up", "Manish - CEE - Booked", "Priya - Finland - Contacted"],
  },
  {
    key: "bookings",
    label: "Bookings",
    rows: ["Tomorrow 8:00 AM - Study Abroad", "Tomorrow 2:00 PM - PTE", "Friday 10:00 AM - CMAT"],
  },
  {
    key: "destinations",
    label: "Destinations",
    rows: countries.slice(0, 7).map((country) => `${country.name} - published - ${country.intake}`),
  },
  {
    key: "content",
    label: "Content",
    rows: ["Home hero", "Services", "Blogs and SEO", "Videos gallery", "Testimonials"],
  },
  {
    key: "security",
    label: "Security",
    rows: ["MFA required for admins", "Role-based access", "Row level security enabled", "Form spam checks", "No service key in client"],
  },
];
