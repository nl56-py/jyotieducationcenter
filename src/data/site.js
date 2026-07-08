export const site = {
  address: "Arniko Bhawan, Traffic Chowk, Biratnagar-09, Nepal",
  phone: "021-590823",
  mobile: "9802724823",
  alternateMobile: "9807095059",
  whatsapp: "9820490823",
  email: "info@edumark.edu.np",
  hours: "Sunday to Friday, 7:00 AM - 6:00 PM",
};

export const navItems = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    children: [
      { label: "Our Story", path: "/about#story" },
      { label: "CEO Message", path: "/about#ceo" },
      { label: "Our Team", path: "/about#team" },
      { label: "Milestones", path: "/about#milestones" },
      { label: "Approvals & Certifications", path: "/approvals" },
    ],
  },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "All Services", path: "/services" },
      { label: "Career Counselling", path: "/services/career-counselling" },
      { label: "Admission Guidance", path: "/services/admission-guidance" },
      { label: "Visa Assistance", path: "/services/visa-assistance" },
      { label: "Test Preparation", path: "/services/test-preparation-support" },
      { label: "Travel & Accommodation", path: "/services/travel-accommodation" },
      { label: "Pre-Departure Support", path: "/services/pre-departure-support" },
    ],
  },
  {
    label: "Destinations",
    path: "#",
    children: [
      { label: "United Kingdom", path: "/destinations/uk" },
      { label: "United States", path: "/destinations/usa" },
      { label: "Australia", path: "/destinations/australia" },
      { label: "Finland", path: "/destinations/finland" },
      { label: "Lithuania", path: "/destinations/lithuania" },
      { label: "South Korea", path: "/destinations/south-korea" },
      { label: "Japan", path: "/destinations/japan" },
      { label: "India", path: "/destinations/india" },
      { label: "Malta", path: "/destinations/malta" },
      { label: "Dubai", path: "/destinations/dubai" },
    ],
  },
  {
    label: "Test Prep",
    path: "/test-preparation",
    children: [
      { label: "IELTS", path: "/test-preparation/ielts" },
      { label: "PTE", path: "/test-preparation/pte" },
      { label: "TOEFL", path: "/test-preparation/toefl" },
      { label: "SAT", path: "/test-preparation/sat" },
      { label: "Japanese (JLPT)", path: "/test-preparation/japanese-jlpt" },
    ],
  },
  {
    label: "Entrance",
    path: "/entrance-preparations",
    children: [
      { label: "All Entrance Prep", path: "/entrance-preparations" },
      { label: "CEE Prep", path: "/entrance-preparations/cee" },
      { label: "CMAT Prep", path: "/entrance-preparations/cmat" },
      { label: "Engineering Prep", path: "/entrance-preparations/engineering" },
    ],
  },
  { label: "Blogs", path: "/blogs" },
  { label: "Videos", path: "/videos-gallery" },
  { label: "Notices & Events", path: "/notices" },
  { label: "Contact", path: "/contact" },
];
