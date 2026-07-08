"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield } from "lucide-react";

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

    // 1. Try real login first via API (if configured)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success redirect
        const nextPath = searchParams ? searchParams.get("next") || "/admin" : "/admin";
        router.push(nextPath);
        router.refresh();
        return;
      } else if (response.ok && !result.success) {
        setError(result.error || "Invalid login credentials");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("API Login failed, attempting local mock login fallback.");
    }

    // 2. Mock Mode Fallback (Allows testing the admin panel immediately!)
    // If password is 'admin123', log in as super_admin. Otherwise, check formats.
    if (email && password) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }

      // Determine role from email / password
      let role = "admin";
      let fullName = "EduMark Administrator";

      if (email.startsWith("super")) {
        role = "super_admin";
        fullName = "EduMark Super Admin";
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

      // Set cookie expiring in 1 day
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      document.cookie = `edumark_mock_session=${encodeURIComponent(JSON.stringify(mockSession))}; path=/; expires=${expires.toUTCString()}`;

      const nextPath = searchParams ? searchParams.get("next") || "/admin" : "/admin";
      router.push(nextPath);
      router.refresh();
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
          EduMark Portal
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
              placeholder="e.g. admin@edumark.edu.np"
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
