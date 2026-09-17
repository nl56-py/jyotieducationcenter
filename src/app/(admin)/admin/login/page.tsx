"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield } from "lucide-react";

/**
 * SECURITY (OWASP A01): Validate redirect target to prevent open redirects.
 * Only allows relative paths starting with /admin.
 */
function getSafeRedirectPath(raw: string | null | undefined): string {
  if (!raw) return "/admin";
  // Block protocol-relative URLs, absolute URLs, and paths outside /admin
  if (raw.includes("://") || raw.startsWith("//") || !raw.startsWith("/")) {
    return "/admin";
  }
  // Ensure path is within /admin
  if (!raw.startsWith("/admin")) {
    return "/admin";
  }
  return raw;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Try real login first via API
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Clear any old mock cookies to prevent role/session clashes
        document.cookie = "edumark_mock_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "jyoti_mock_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        // CRITICAL: Hard navigation flush forces Next.js to dump in-memory router cache
        // and re-render server layouts with the new user's session.
        const nextPath = getSafeRedirectPath(searchParams?.get("next"));
        window.location.href = nextPath;
        return;
      } else {
        // Real API responded with auth failure (401, 403, 429, etc.) -> show real error
        setError(result?.error || "Invalid email or password");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("API Login fetch failed (offline / network error), checking local mock fallback.");
    }

    // 2. Mock Mode Fallback (ONLY used if the API server was completely unreachable / offline)
    if (email && password) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        setLoading(false);
        return;
      }

      // Clear any existing real server session so it doesn't take priority over the mock session
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (e) {
        // Ignore offline error
      }

      // Determine role from email / password
      let role = "admin";
      let fullName = "Jyoti Educations Administrator";

      if (email.startsWith("super")) {
        role = "super_admin";
        fullName = "Jyoti Educations Super Admin";
      } else if (email.startsWith("counselor")) {
        role = "counselor";
        fullName = "Senior Counselor";
      } else if (email.startsWith("editor")) {
        role = "editor";
        fullName = "Content Editor";
      } else if (email.startsWith("viewer")) {
        role = "viewer";
        fullName = "General Viewer";
      }

      const mockSession = {
        id: `mock-admin-${Date.now()}`,
        email: email,
        role: role,
        fullName: fullName,
      };

      // Set session cookie
      document.cookie = `edumark_mock_session=${encodeURIComponent(JSON.stringify(mockSession))}; path=/; SameSite=Lax`;

      const nextPath = getSafeRedirectPath(searchParams?.get("next"));
      window.location.href = nextPath;
    } else {
      setError("Please fill in all fields.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <Shield size={32} />
          Jyoti Educations Portal
        </div>
        <p className="login-subtitle">
          Sign in with your credentials to manage leads and content.
        </p>

        {error && (
          <div 
            style={{ 
              background: "var(--dm-error-container)", 
              color: "var(--dm-error)", 
              padding: "12px", 
              borderRadius: "var(--dm-rounded-md)",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="e.g. admin@jyotieducation.edu.np"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%", marginTop: "12px" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="login-container"><div className="login-card" style={{ textAlign: "center" }}>Loading login portal...</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
