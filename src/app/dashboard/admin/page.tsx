import Link from "next/link";
import { Users, BookOpen, Settings, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Total Users", value: "312", sub: "23 Instructors · 287 Students · 2 Admins", color: "var(--accent-primary)" },
  { label: "Active Classes", value: "47", sub: "Across all instructors", color: "var(--status-present)" },
  { label: "Pending Requests", value: "8", sub: "Join requests awaiting approval", color: "var(--status-late)" },
  { label: "System Status", value: "Healthy", sub: "All services operational", color: "var(--status-present)" },
];

export default function AdminDashboardPage() {
  return (
    <div className="container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem" }}>Admin Dashboard</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>System-wide overview and management tools.</p>
      </div>

      {/* Stats */}
      <div className="grid-cols-4" style={{ marginBottom: "2.5rem" }}>
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>{s.label}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Admin Quick Nav Cards */}
      <div className="grid-cols-3" style={{ marginBottom: "2.5rem" }}>
        {[
          { href: "/dashboard/admin/users", label: "Manage Users", desc: "Create, edit, and manage Admin, Instructor, and Student accounts.", icon: <Users size={24} />, color: "#0033a0" },
          { href: "/dashboard/admin/classes", label: "Oversee Classes", desc: "View all classes across the system. Monitor activity.", icon: <BookOpen size={24} />, color: "#059669" },
          { href: "/dashboard/admin/settings", label: "System Settings", desc: "Configure global parameters and site-wide settings.", icon: <Settings size={24} />, color: "#7c3aed" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="card card-interactive" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: `${item.color}18`, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              {item.icon}
            </div>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem" }}>{item.label}</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", flex: 1 }}>{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Restriction Notice */}
      <div className="card" style={{ backgroundColor: "rgba(0,51,160,0.04)", borderColor: "rgba(0,51,160,0.15)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <ShieldCheck size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.3rem" }}>Academic Data Restriction</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Admins have systemic oversight but <strong>cannot edit, alter, or manipulate grades, attendance, or individual student records</strong> within any class. Academic data modification is exclusively locked to the assigned instructor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
