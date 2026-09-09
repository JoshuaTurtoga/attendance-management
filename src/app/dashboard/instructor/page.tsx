import Link from "next/link";
import { Plus, CalendarDays, ClipboardList, BookOpen, Clock } from "lucide-react";

const todayClasses = [
  { id: "1", code: "CS308", title: "Web Systems & Technologies", section: "CS-401", time: "02:00 PM – 03:30 PM", room: "Lab 1A", students: 32, sessionActive: true },
  { id: "2", code: "CS301", title: "Database Systems", section: "CS-402", time: "09:00 AM – 10:30 AM", room: "Room 204", students: 30, sessionActive: false },
];

export default function InstructorTodayPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="container">
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem" }}>Good day, Prof. Miller! 👋</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{today}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/dashboard/instructor/classes/new" className="btn btn-primary btn-sm">
              <Plus size={15} /><span>New Class</span>
            </Link>
            <Link href="/dashboard/instructor/schedule" className="btn btn-secondary btn-sm">
              <CalendarDays size={15} /><span>My Schedule</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-cols-4" style={{ marginBottom: "2rem" }}>
        {[
          { label: "Classes Handling", value: "5", sub: "This semester", color: "var(--accent-primary)" },
          { label: "Today's Classes", value: `${todayClasses.length}`, sub: `${todayClasses.filter(c => c.sessionActive).length} session active`, color: "var(--status-present)" },
          { label: "Total Students", value: "148", sub: "Across all classes", color: "var(--status-excused)" },
          { label: "Pending Requests", value: "3", sub: "Awaiting approval", color: "var(--status-late)" },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>{stat.label}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: stat.color, lineHeight: 1.1 }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Today's Classes with Quick Actions */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Clock size={18} color="var(--accent-primary)" /> Today&apos;s Classes
        </h2>

        {todayClasses.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
            No classes scheduled for today.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {todayClasses.map((cls) => (
              <div key={cls.id} className="card" style={{ borderLeft: `4px solid ${cls.sessionActive ? "var(--status-present)" : "var(--border-subtle)"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                      {cls.sessionActive && (
                        <span className="badge badge-present">● Live Session</span>
                      )}
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{cls.time}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>{cls.code} – {cls.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                      {cls.section} · {cls.room} · {cls.students} students
                    </p>
                  </div>
                  {/* Quick Actions */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <Link href={`/dashboard/instructor/classes/${cls.id}?tab=attendance`} className="btn btn-primary btn-sm">
                      <ClipboardList size={14} /> Record Attendance
                    </Link>
                    <Link href={`/dashboard/instructor/classes/${cls.id}?tab=grades`} className="btn btn-secondary btn-sm">
                      <BookOpen size={14} /> Record Grades
                    </Link>
                    <Link href={`/dashboard/instructor/classes/${cls.id}`} className="btn btn-secondary btn-sm">
                      View Class
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Nav */}
      <div className="card">
        <h3 style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-secondary)" }}>Quick Navigation</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {[
            { href: "/dashboard/instructor/classes", label: "All My Classes" },
            { href: "/dashboard/instructor/classes/new", label: "Create New Class" },
            { href: "/dashboard/instructor/schedule", label: "My Schedule" },
            { href: "/dashboard/instructor/profile", label: "My Profile" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="btn btn-secondary btn-sm">{item.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
