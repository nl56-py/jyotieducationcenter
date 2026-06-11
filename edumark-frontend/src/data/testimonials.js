import { assets } from "./assets.js";

export const testimonials = [
  {
    name: "Sanjana R.",
    route: "UK student visa",
    quote: "EduMark helped me select universities, arrange documents, and prepare for every interview question with confidence.",
  },
  {
    name: "Aayush M.",
    route: "Australia admission",
    quote: "The counselling felt practical. I knew exactly what to submit, when to submit it, and what the next step was.",
  },
  {
    name: "Nisha P.",
    route: "CEE preparation",
    quote: "The classes were structured, the mocks were useful, and the team kept me focused after +2.",
  },
];

export const processSteps = [
  "Free counselling",
  "Course and country selection",
  "Application submission",
  "Offer and documentation",
  "Visa processing",
  "Pre-departure support",
];

export const videoItems = [
  { title: "EduMark office and student moments", category: "Office Tours", media: "video", poster: assets.brochureHero },
  { title: "Study abroad seminar highlights", category: "Destination Guides", image: assets.counselling, duration: "03:40" },
  { title: "IELTS classroom practice", category: "Test Preparation", image: assets.testPrep, duration: "02:20" },
  { title: "Visa success story", category: "Testimonials", image: assets.success, duration: "04:15" },
  { title: "Europe route overview", category: "Destination Guides", image: assets.europe, duration: "02:55" },
];
