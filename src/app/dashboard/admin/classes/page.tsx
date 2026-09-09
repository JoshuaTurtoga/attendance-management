import { BookOpen, Users } from "lucide-react";
import Link from "next/link";

const classes = [
  { id: "1", code: "CS308", title: "Web Systems & Technologies", instructor: "Prof. David Miller", section: "CS-401", students: 32, term: "1st Semester 2026", status: "Active" },
  { id: "2", code: "CS301", title: "Database Systems", instructor: "Prof. David Miller", section: "CS-402", students: 30, term: "1st Semester 2026", status: "Active" },
  { id: "3", code: "STAS101", title: "Science, Technology & Society", instructor: "Prof. David Miller", section: "GE-A", students: 45, term: "1st Semester 2026", status: "Active" },
  { id: "4", code: "CS401", title: "Advanced Programming", instructor: "Dr. Elena Vance", section: "CS-501", students: 28, term: "1st Semester 2026", status: "Active" },
  { id: "5", code: "MATH204", title: "Discrete Mathematics", instructor: "Dr. Gregory House", section: "CS-401B", students: 35, term: "1st Semester 2026", status: "Inactive" },
];

export default function AdminClassesPage() {
  return (
    <div className="container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>All Classes</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>System-wide overview of all active and inactive classes.</p>
      </div>

      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Section</th>
                <th style={{ textAlign: "center" }}>Students</th>
                <th>Term</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{c.code}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{c.title}</div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{c.instructor}</td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.82rem" }}>{c.section}</td>
                  <td style={{ textAlign: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem" }}>
                      <Users size={13} color="var(--text-muted)" />{c.students}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{c.term}</td>
                  <td>
                    <span className={`badge ${c.status === "Active" ? "badge-present" : "badge-absent"}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
