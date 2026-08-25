"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App route error:", error);
  }, [error]);

  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>Something went wrong!</h2>
      <p style={{ color: "#4B5563", maxWidth: "500px", marginBottom: "1.5rem" }}>
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "0.625rem 1.5rem",
          backgroundColor: "#0A6DAA",
          color: "white",
          fontWeight: 600,
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
