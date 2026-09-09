import Link from "next/link";
import { CheckCircle2, LogOut, Home, LayoutDashboard } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Sticky Top Header */}
      <header style={{ borderBottom: "1px solid var(--border-subtle)", backdropFilter: "var(--glass-backdrop)", backgroundColor: "rgba(248, 250, 252, 0.95)", position: "sticky", top: 0, zIndex: 40 }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", minHeight: "64px", padding: "0.5rem 1.5rem", gap: "0.75rem" }}>

          {/* Brand */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{ background: "var(--accent-gradient)", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle2 size={18} color="#ffffff" />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Attend<span style={{ color: "var(--accent-primary)" }}>Ease</span>
            </span>
          </Link>

          {/* Right Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-secondary btn-sm" title="Home">
              <Home size={15} /><span>Home</span>
            </Link>
            <Link href="/dashboard" className="btn btn-secondary btn-sm" title="Dashboard">
              <LayoutDashboard size={15} /><span>Dashboard</span>
            </Link>
            <Link href="/login" className="btn btn-secondary btn-sm" style={{ color: "var(--status-absent)" }} title="Sign Out">
              <LogOut size={15} /><span>Log Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div style={{ flex: 1, padding: "2rem 0 5rem" }}>{children}</div>
    </div>
  );
}
