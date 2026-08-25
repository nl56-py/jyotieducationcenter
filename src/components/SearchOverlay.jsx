"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { countries } from "../data/countries.js";
import { testCourses } from "../data/testCourses.js";
import { services } from "../data/services.js";
import { blogs } from "../data/blogs.js";

export function SearchOverlay({ open, onClose }) {
  const router = useRouter();
  const [term, setTerm] = useState("");

  const staticPages = [
    { type: "Page", title: "Home", path: "/" },
    { type: "Page", title: "About Us", path: "/about" },
    { type: "Page", title: "Services", path: "/services" },
    { type: "Page", title: "Test Preparation", path: "/test-preparation" },
    { type: "Page", title: "Entrance Preparations", path: "/entrance-preparations" },
    { type: "Page", title: "Blogs", path: "/blogs" },
    { type: "Page", title: "Videos Gallery", path: "/videos-gallery" },
    { type: "Page", title: "Contact Us", path: "/contact" }
  ];

  const searchable = useMemo(
    () => [
      ...staticPages,
      ...countries.map((country) => ({ type: "Destination", title: country.name, path: `/destinations/${country.slug}` })),
      ...testCourses.map((course) => ({ type: "Test Prep", title: course.name, path: `/test-preparation/${course.slug}` })),
      ...services.map((service) => ({ type: "Service", title: service.title, path: `/services/${service.slug}` })),
      ...blogs.map((blog) => ({ type: "Blog", title: blog.title, path: `/blogs/${blog.slug}` })),
      { type: "Admin", title: "Admin Panel", path: "/admin" },
    ],
    [],
  );

  const results = searchable
    .filter((item) => `${item.type} ${item.title}`.toLowerCase().includes(term.toLowerCase()))
    .slice(0, 10);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search">
      <div className="search-card">
        <div className="search-head">
          <h2>Search Jyoti Educations</h2>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <input
          autoFocus
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search destinations, tests, services, blogs..."
        />
        <div className="search-results">
          {results.map((item) => (
            <button
              type="button"
              key={`${item.type}-${item.title}`}
              onClick={() => {
                router.push(item.path);
                onClose();
                setTerm("");
              }}
            >
              <span>{item.type}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
