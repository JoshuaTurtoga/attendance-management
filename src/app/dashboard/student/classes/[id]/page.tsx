import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const attendance = [
  { date: "Sep 5", status: "present", checkIn: "09:02 AM" },
  { date: "Sep 3", status: "present", checkIn: "09:01 AM" },
  { date: "Sep 1", status: "late", checkIn: "09:16 AM" },
  { date: "Aug 29", status: "present", checkIn: "09:03 AM" },
  { date: "Aug 27", status: "absent", checkIn: "--" },
  { date: "Aug 25", status: "present", checkIn: "09:00 AM" },
];

const grades = [
  { activity: "Quiz 1", type: "Quiz", date: "Aug 15", maxScore: 20, score: 18 },
  { activity: "Quiz 2", type: "Quiz", date: "Aug 22", maxScore: 20, score: 20 },
  { activity: "Quiz 3", type: "Quiz", date: "Sep 1", maxScore: 20, score: 17 },
  { activity: "Prelim Exam", type: "Exam", date: "Aug 28", maxScore: 100, score: 85 },
  { activity: "Reporting Project 1", type: "Performance Task", date: "Aug 20", maxScore: 50, score: 45 },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "present") return <span className="badge badge-present">Present</span>;
  if (status === "late") return <span className="badge badge-late">Late</span>;
  if (status === "absent") return <span className="badge badge-absent">Absent</span>;
  return null;
}

export default function StudentClassDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container">
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/dashboard/student/classes" className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
          <ArrowLeft size={15} /> Back to Classes
        </Link>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>CS308 – Web Systems &amp; Technologies</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>CS-401 · Lab 1A · Prof. David Miller · TTh 2:00–3:30 PM</p>
      </div>

      {/* Attendance Summary */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Attendance Record</h2>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check-In Time</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{a.date}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{a.checkIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grades */}
      <div className="card">
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Grades</h2>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Type</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{g.activity}</td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: g.type === "Quiz" ? "rgba(37,99,235,0.1)" : g.type === "Exam" ? "rgba(220,38,38,0.1)" : "rgba(245,158,11,0.1)",
                      color: g.type === "Quiz" ? "var(--status-excused)" : g.type === "Exam" ? "var(--status-absent)" : "var(--status-late)",
                      border: "none",
                    }}>{g.type}</span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{g.date}</td>
                  <td style={{ textAlign: "right", fontWeight: 700, fontFamily: "monospace" }}>
                    <span style={{ color: g.score / g.maxScore >= 0.75 ? "var(--status-present)" : "var(--status-absent)" }}>{g.score}</span>
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> / {g.maxScore}</span>
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
