"use client";

import Link from "next/link";
import { BookOpen, Clock, CheckCircle2, AlertCircle, CalendarDays, QrCode, Bell } from "lucide-react";

const todayClasses = [
  { id: "1", code: "CS308", title: "Web Systems & Technologies", section: "CS-401", time: "02:00 PM – 03:30 PM", room: "Lab 1A", instructor: "Prof. David Miller", attendanceStatus: "open" },
  { id: "2", code: "CS305", title: "Software Engineering", section: "CS-401", time: "11:00 AM – 12:30 PM", room: "Lab 3B", instructor: "Dr. Elena Vance", attendanceStatus: "present" },
  { id: "3", code: "CS301", title: "Database Systems", section: "CS-401", time: "09:00 AM – 10:30 AM", room: "Room 204", instructor: "Prof. Robert Thorne", attendanceStatus: "present" },
];

const notifications = [
  { id: 1, text: "Prof. Miller recorded grades for CS308 – Quiz 3.", time: "2 hours ago", unread: true },
  { id: 2, text: "Your join request for CS302 was approved.", time: "Yesterday", unread: false },
];

export default function StudentTodayPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="container">
      {/* Page Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem" }}>Good day, Alex! 👋</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{today}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/dashboard/student/join" className="btn btn-primary btn-sm">
              <QrCode size={15} /><span>Join a Class</span>
            </Link>
            <Link href="/dashboard/student/schedule" className="btn btn-secondary btn-sm">
              <CalendarDays size={15} /><span>My Schedule</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid-cols-4" style={{ marginBottom: "2rem" }}>
        {[
          { label: "Attendance Rate", value: "94.2%", sub: "Target: ≥80%", color: "var(--status-present)" },
          { label: "Classes Today", value: "3", sub: "1 awaiting check-in", color: "var(--accent-primary)" },
          { label: "Joined Classes", value: "5", sub: "This semester", color: "var(--status-excused)" },
          { label: "Streak", value: "14 days", sub: "Personal best!", color: "#f59e0b" },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>{stat.label}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: stat.color, lineHeight: 1.1 }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }} className="today-layout">
        {/* Today's Classes */}
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CalendarDays size={18} color="var(--accent-primary)" /> Today&apos;s Classes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {todayClasses.map((cls) => (
              <div key={cls.id} className="card" style={{ borderLeft: `4px solid ${cls.attendanceStatus === "open" ? "var(--accent-primary)" : "var(--status-present)"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                      <span className={`badge ${cls.attendanceStatus === "present" ? "badge-present" : ""}`} style={cls.attendanceStatus === "open" ? { backgroundColor: "rgba(0,51,160,0.1)", color: "var(--accent-primary)", border: "1px solid rgba(0,51,160,0.2)" } : {}}>
                        {cls.attendanceStatus === "present" ? "✓ Present" : "● Session Open"}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{cls.time}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>{cls.code} – {cls.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                      {cls.section} · {cls.room} · {cls.instructor}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {cls.attendanceStatus === "open" && (
                      <button className="btn btn-primary btn-sm">
                        <QrCode size={14} /> Check In
                      </button>
                    )}
                    <Link href={`/dashboard/student/classes/${cls.id}`} className="btn btn-secondary btn-sm">
                      <BookOpen size={14} /> View Class
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Panel */}
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Bell size={18} color="var(--accent-primary)" /> Notifications
          </h2>
          <div className="card" style={{ padding: "1rem" }}>
            {notifications.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", textAlign: "center", padding: "1rem 0" }}>No new notifications.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem", borderRadius: "var(--radius-md)", backgroundColor: n.unread ? "rgba(0,51,160,0.05)" : "transparent", border: n.unread ? "1px solid rgba(0,51,160,0.1)" : "1px solid transparent" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: n.unread ? "var(--accent-primary)" : "var(--border-subtle)", flexShrink: 0, marginTop: "5px" }} />
                    <div>
                      <p style={{ fontSize: "0.825rem", color: "var(--text-primary)", lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Nav */}
          <div className="card" style={{ marginTop: "1rem", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-secondary)" }}>Quick Navigation</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                { href: "/dashboard/student/classes", label: "My Classes", icon: <BookOpen size={15} /> },
                { href: "/dashboard/student/schedule", label: "Class Schedule", icon: <CalendarDays size={15} /> },
                { href: "/dashboard/student/requests", label: "Join Requests", icon: <CheckCircle2 size={15} /> },
                { href: "/dashboard/student/join", label: "Join a Class", icon: <QrCode size={15} /> },
                { href: "/dashboard/student/profile", label: "My Profile", icon: <AlertCircle size={15} /> },
              ].map((item) => (
                <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0.6rem", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, transition: "background var(--transition-fast)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                  <span style={{ color: "var(--accent-primary)" }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .today-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
