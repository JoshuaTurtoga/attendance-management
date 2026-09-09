import Link from "next/link";
import {
  GraduationCap,
  Users,
  LogIn,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation */}
      <header
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          backdropFilter: "var(--glass-backdrop)",
          backgroundColor: "rgba(248, 250, 252, 0.8)",
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
            flexWrap: "wrap",
            minHeight: "70px",
            padding: "0.5rem 0",
            gap: "1rem",
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
                boxShadow: "0 4px 12px rgba(0, 51, 160, 0.25)",
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
                  backgroundColor: "rgba(0, 51, 160, 0.1)",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                }}
              >
                v1.0
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>


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
              A fully digital class record system for universities. Instructors manage classes, attendance, and grades — students join and track their academic progress in real time.
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
                <span>Sign In to Your Portal</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/register"
                className="btn btn-secondary"
                style={{ padding: "0.75rem 1.75rem" }}
              >
                <span>Student Registration</span>
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
                  backgroundColor: "rgba(0, 51, 160, 0.1)",
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
                href="/login"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Student Login</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Instructor Portal Card */}
            <div className="card card-interactive" style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(5, 150, 105, 0.1)",
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
                Instructor Portal
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, flex: 1, marginBottom: "1.5rem" }}>
                Create and manage classes with customizable grade sheets. Record attendance, input grades, generate QR codes, and approve student join requests.
              </p>
              <Link
                href="/login"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Instructor Login</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Admin Portal Card */}
            <div className="card card-interactive" style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(220, 38, 38, 0.1)",
                  color: "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Admin Portal
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, flex: 1, marginBottom: "1.5rem" }}>
                Manage users, oversee all classes, provision instructor accounts, and configure global system settings.
              </p>
              <Link
                href="/login"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Admin Login</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "1.5rem 0",
          backgroundColor: "#ffffff",
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
