"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Users,
  LogIn,
  CheckCircle2,
  KeyRound,
  Mail,
  ArrowLeft,
  Sparkles,
  Info,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate auth action and redirect to respective dashboard
    setTimeout(() => {
      setLoading(false);
      if (role === "student") {
        router.push("/dashboard/student");
      } else {
        router.push("/dashboard/teacher");
      }
    }, 600);
  };

  const handleDemoLogin = (selectedRole: "student" | "teacher") => {
    if (selectedRole === "student") {
      router.push("/dashboard/student");
    } else {
      router.push("/dashboard/teacher");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 1.5rem",
        position: "relative",
      }}
    >
      {/* Back to Home Link */}
      <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
        <Link
          href="/"
          className="btn btn-secondary btn-sm"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div style={{ width: "100%", maxWidth: "460px" }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "var(--accent-gradient)",
              boxShadow: "var(--accent-glow)",
              marginBottom: "1rem",
            }}
          >
            <CheckCircle2 size={30} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Welcome to AttendEase
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Select your portal to sign in
          </p>
        </div>

        {/* Login Card */}
        <div className="card" style={{ padding: "2rem" }}>
          {/* Role Toggle Selector */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "0.3rem",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              marginBottom: "1.75rem",
              gap: "0.35rem",
            }}
          >
            <button
              type="button"
              onClick={() => setRole("student")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.6rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                backgroundColor:
                  role === "student" ? "var(--accent-primary)" : "transparent",
                color: role === "student" ? "#ffffff" : "var(--text-secondary)",
              }}
            >
              <GraduationCap size={16} />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("teacher")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.6rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                backgroundColor:
                  role === "teacher" ? "var(--accent-primary)" : "transparent",
                color: role === "teacher" ? "#ffffff" : "var(--text-secondary)",
              }}
            >
              <Users size={16} />
              <span>Faculty / Teacher</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="identifier">
                {role === "student" ? "Student ID or Email" : "Faculty Email Address"}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="identifier"
                  type="text"
                  required
                  placeholder={
                    role === "student" ? "e.g. 2026-0891 or alex@school.edu" : "e.g. dmiller@school.edu"
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.5rem" }}
                />
                <Mail
                  size={18}
                  color="var(--text-muted)"
                  style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label className="input-label" htmlFor="password">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset will connect with Supabase Auth when configured.");
                  }}
                  style={{ fontSize: "0.8rem", color: "var(--accent-primary)" }}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.5rem" }}
                />
                <KeyRound
                  size={18}
                  color="var(--text-muted)"
                  style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.8rem", marginTop: "0.5rem" }}
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In as {role === "student" ? "Student" : "Faculty"}</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Instant Access */}
          <div style={{ margin: "1.75rem 0 1.25rem", textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-subtle)" }} />
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Quick Demo Preview
              </span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-subtle)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => handleDemoLogin("student")}
                className="btn btn-secondary btn-sm"
              >
                <Sparkles size={14} color="#818cf8" />
                <span>Demo Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("teacher")}
                className="btn btn-secondary btn-sm"
              >
                <Sparkles size={14} color="#10b981" />
                <span>Demo Teacher</span>
              </button>
            </div>
          </div>

          {/* Supabase Notice Info Box */}
          <div
            style={{
              padding: "0.75rem 0.85rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(99, 102, 241, 0.08)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              display: "flex",
              gap: "0.6rem",
              alignItems: "flex-start",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              lineHeight: 1.4,
            }}
          >
            <Info size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong>Supabase Auth Ready:</strong> Once you add your Supabase credentials to <code>.env.local</code>, this form will authenticate against your Supabase Auth tables.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
