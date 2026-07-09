"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchOverlay } from "@/components/SearchOverlay";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Initial observe
    const elements = document.querySelectorAll(".em-section-title-wrapper");
    elements.forEach((el) => observer.observe(el));

    // MutationObserver to capture dynamically rendered headings (e.g. destinations accordion tab switching)
    const mutationObserver = new MutationObserver(() => {
      const currentElements = document.querySelectorAll(".em-section-title-wrapper");
      currentElements.forEach((el) => observer.observe(el));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden", position: "relative", width: "100%" }}>
      <Header onSearch={() => setSearchOpen(true)} />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
