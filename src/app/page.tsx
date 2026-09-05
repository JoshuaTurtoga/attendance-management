import Link from "next/link";
import {
  GraduationCap,
  Users,
  LogIn,
  CheckCircle2,
  Database,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project.supabase.co")
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation */}
      <header
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          backdropFilter: "var(--glass-backdrop)",
          backgroundColor: "rgba(9, 13, 22, 0.8)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                background: "var(--accent-gradient)",
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
              }}
            >
              <CheckCircle2 size={22} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Attend<span style={{ color: "var(--accent-primary)" }}>Ease</span>
              </span>
              <span
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.7rem",
                  padding: "0.15rem 0.45rem",
                  borderRadius: "4px",
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                }}
              >
                v1.0
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: isSupabaseConfigured
                  ? "var(--status-present-bg)"
                  : "rgba(245, 158, 11, 0.12)",
                color: isSupabaseConfigured
                  ? "var(--status-present)"
                  : "var(--status-late)",
                border: `1px solid ${
                  isSupabaseConfigured
                    ? "var(--status-present-border)"
                    : "var(--status-late-border)"
                }`,
              }}
            >
              <Database size={14} />
              <span>
                {isSupabaseConfigured
                  ? "Supabase Connected"
                  : "Supabase Ready (Pending Keys)"}
              </span>
            </div>

            <Link href="/login" className="btn btn-primary btn-sm">
              <LogIn size={16} />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main style={{ flex: 1, padding: "3.5rem 0 5rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 1rem",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-gradient-subtle)",
                border: "1px solid var(--border-glow)",
                fontSize: "0.85rem",
                color: "#c7d2fe",
                marginBottom: "1.25rem",
              }}
            >
              <Sparkles size={16} color="#818cf8" />
              <span>Next.js App Router + Supabase Attendance Platform</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                marginBottom: "1.25rem",
              }}
            >
              Intelligent Attendance Management for{" "}
              <span
                style={{
                  background: "var(--accent-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Students & Faculty
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              Streamline classroom attendance with QR check-in, real-time teacher
              rosters, automated absence tracking, and Supabase integration.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Link href="/login" className="btn btn-primary" style={{ padding: "0.75rem 1.75rem" }}>
                <span>Access System</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/dashboard/student"
                className="btn btn-secondary"
                style={{ padding: "0.75rem 1.75rem" }}
              >
                <span>Student Preview</span>
              </Link>
              <Link
                href="/dashboard/teacher"
                className="btn btn-secondary"
                style={{ padding: "0.75rem 1.75rem" }}
              >
                <span>Teacher Preview</span>
              </Link>
            </div>
          </div>

          {/* Quick Access Portal Grid */}
          <div className="grid-cols-3" style={{ marginBottom: "4rem" }}>
            {/* Student Portal Card */}
            <div className="card card-interactive" style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <GraduationCap size={26} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Student Portal
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, flex: 1, marginBottom: "1.5rem" }}>
                View personal attendance records, check in to active lectures via QR code, track attendance percentages, and monitor streaks.
              </p>
              <Link
                href="/dashboard/student"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Open Student Dashboard</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Teacher Portal Card */}
            <div className="card card-interactive" style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "var(--status-present)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <Users size={26} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Faculty & Teacher Portal
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, flex: 1, marginBottom: "1.5rem" }}>
                Launch class attendance sessions, generate dynamic QR codes, monitor live check-ins, and override or export student attendance logs.
              </p>
              <Link
                href="/dashboard/teacher"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Open Teacher Dashboard</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Authentication Card */}
            <div className="card card-interactive" style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(236, 72, 153, 0.15)",
                  color: "#ec4899",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <LogIn size={26} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Role-Based Login
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, flex: 1, marginBottom: "1.5rem" }}>
                Sign in with school credentials. Includes separate flows for students and faculty, pre-configured with Supabase authentication.
              </p>
              <Link
                href="/login"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Go to Login Page</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Architecture / Status Box */}
          <div
            className="card"
            style={{
              background: "linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 100%)",
              border: "1px solid var(--border-glow)",
              padding: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <Database size={20} color="#818cf8" />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    Supabase Connection Setup
                  </h3>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "680px" }}>
                  Client and server Supabase helpers are initialized at <code>src/lib/supabase/client.ts</code> and <code>src/lib/supabase/server.ts</code>. Simply replace the dummy keys in <code>.env.local</code> when you have your credentials ready.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <div
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <ShieldCheck size={16} color="#10b981" />
                  <span>SSR & Middleware Ready</span>
                </div>
                <div
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <QrCode size={16} color="#6366f1" />
                  <span>QR Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "1.5rem 0",
          backgroundColor: "rgba(9, 13, 22, 0.9)",
          marginTop: "auto",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          <div>© {new Date().getFullYear()} AttendEase Attendance Management. All rights reserved.</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/login" style={{ color: "var(--text-secondary)" }}>Login</Link>
            <Link href="/dashboard/student" style={{ color: "var(--text-secondary)" }}>Student View</Link>
            <Link href="/dashboard/teacher" style={{ color: "var(--text-secondary)" }}>Teacher View</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
