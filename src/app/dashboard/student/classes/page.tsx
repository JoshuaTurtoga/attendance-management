import Link from "next/link";
import { BookOpen, Users, Clock, ArrowRight, CalendarDays } from "lucide-react";

const classes = [
  { id: "1", code: "CS308", title: "Web Systems & Technologies", section: "CS-401 Lecture", instructor: "Prof. David Miller", schedule: "TTh 2:00–3:30 PM", room: "Lab 1A", attendance: 88, students: 32 },
  { id: "2", code: "CS305", title: "Software Engineering", section: "CS-401 Lecture", instructor: "Dr. Elena Vance", schedule: "MWF 11:00 AM–12:30 PM", room: "Lab 3B", attendance: 95, students: 30 },
  { id: "3", code: "CS301", title: "Database Systems", section: "CS-401 Lecture", instructor: "Prof. Robert Thorne", schedule: "MWF 9:00–10:30 AM", room: "Room 204", attendance: 100, students: 30 },
  { id: "4", code: "CS302", title: "Algorithms & Complexity", section: "CS-401 Lecture", instructor: "Prof. Sarah Connor", schedule: "TTh 1:00–2:30 PM", room: "Room 301", attendance: 80, students: 29 },
  { id: "5", code: "MATH204", title: "Discrete Mathematics", section: "CS-401 Lecture", instructor: "Dr. Gregory House", schedule: "MWF 10:00–11:30 AM", room: "Room 102", attendance: 90, students: 35 },
];

export default function StudentClassesPage() {
  return (
    <div className="container">
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>My Classes</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>All classes you are currently enrolled in.</p>
          </div>
          <Link href="/dashboard/student/join" className="btn btn-primary btn-sm">
            <BookOpen size={15} /><span>Join a Class</span>
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {classes.map((cls) => (
          <div key={cls.id} className="card card-interactive" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-primary)", backgroundColor: "rgba(0,51,160,0.08)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{cls.code}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{cls.section}</span>
              </div>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem" }}>{cls.title}</h2>
              <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Users size={13} /> {cls.instructor}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Clock size={13} /> {cls.schedule}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <CalendarDays size={13} /> {cls.room}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: cls.attendance >= 80 ? "var(--status-present)" : "var(--status-absent)" }}>{cls.attendance}%</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Attendance</div>
              </div>
              <Link href={`/dashboard/student/classes/${cls.id}`} className="btn btn-secondary btn-sm">
                View <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
