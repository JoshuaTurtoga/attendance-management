import Link from "next/link";
import { CheckCircle2, GraduationCap, Users, LogOut, Home } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Dashboard Top Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          backdropFilter: "var(--glass-backdrop)",
          backgroundColor: "rgba(9, 13, 22, 0.85)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  background: "var(--accent-gradient)",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2 size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                Attend<span style={{ color: "var(--accent-primary)" }}>Ease</span>
              </span>
            </Link>

            {/* View Switcher Pills */}
            <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link
                href="/dashboard/student"
                className="btn btn-secondary btn-sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <GraduationCap size={15} />
                <span>Student View</span>
              </Link>

              <Link
                href="/dashboard/teacher"
                className="btn btn-secondary btn-sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Users size={15} />
                <span>Teacher View</span>
              </Link>
            </nav>
          </div>

          {/* Right Header Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/"
              className="btn btn-secondary btn-sm"
              title="Return to Landing Page"
            >
              <Home size={15} />
              <span>Home</span>
            </Link>

            <Link
              href="/login"
              className="btn btn-secondary btn-sm"
              style={{ color: "var(--text-secondary)" }}
              title="Sign Out"
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div style={{ flex: 1, padding: "2rem 0 4rem" }}>{children}</div>
    </div>
  );
}
