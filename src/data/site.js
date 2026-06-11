export const site = {
  address: "Araniko Bhawan, Traffic Chowk, Biratnagar-09, Nepal",
  phone: "021-590823",
  mobile: "9802724823",
  alternateMobile: "9807095059",
  whatsapp: "9820490823",
  email: "info@edumark.edu.np",
  hours: "Sunday to Friday, 7:00 AM - 6:00 PM",
};

export const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Career Counselling", path: "/services/career-counselling" },
      { label: "Admission Guidance", path: "/services/admission-guidance" },
      { label: "Visa Assistance", path: "/services/visa-assistance" },
      { label: "Pre-Departure", path: "/services/pre-departure-support" },
    ],
  },
  {
    label: "Destinations",
    path: "/destinations",
    children: [
      { label: "United Kingdom", path: "/destinations/uk" },
      { label: "Australia", path: "/destinations/australia" },
      { label: "USA", path: "/destinations/usa" },
      { label: "Europe", path: "/destinations/finland" },
      { label: "Japan", path: "/destinations/japan" },
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
    ],
  },
  { label: "Entrance", path: "/entrance-preparations" },
  { label: "Blogs", path: "/blogs" },
  { label: "Videos", path: "/videos-gallery" },
  { label: "Contact", path: "/contact" },
];
