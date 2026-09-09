import Link from "next/link";
import { Plus, ArrowRight, Users, Clock } from "lucide-react";

const classes = [
  { id: "1", code: "CS308", title: "Web Systems & Technologies", section: "CS-401 Lecture", schedule: "TTh 2:00–3:30 PM", room: "Lab 1A", students: 32, term: "1st Semester 2026" },
  { id: "2", code: "CS301", title: "Database Systems", section: "CS-402 Lecture", schedule: "MWF 9:00–10:30 AM", room: "Room 204", students: 30, term: "1st Semester 2026" },
  { id: "3", code: "STAS101", title: "Science, Technology & Society", section: "GE-A Lecture", schedule: "TTh 10:00–11:30 AM", room: "Room 105", students: 45, term: "1st Semester 2026" },
];

export default function InstructorClassesPage() {
  return (
    <div className="container">
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>My Classes</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>All classes you are currently handling.</p>
        </div>
        <Link href="/dashboard/instructor/classes/new" className="btn btn-primary">
          <Plus size={16} /><span>Create New Class</span>
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {classes.map((cls) => (
          <div key={cls.id} className="card card-interactive">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-primary)", backgroundColor: "rgba(0,51,160,0.08)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{cls.code}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{cls.section}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", backgroundColor: "#f1f5f9", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>{cls.term}</span>
                </div>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem" }}>{cls.title}</h2>
                <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}><Clock size={13} />{cls.schedule}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}><Users size={13} />{cls.students} students</span>
                </div>
              </div>
              <Link href={`/dashboard/instructor/classes/${cls.id}`} className="btn btn-secondary btn-sm">
                Open <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
