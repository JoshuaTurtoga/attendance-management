"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, ClipboardList, BookOpen, FileText, Check, Clock, UserX, UserCheck, CheckCircle2, Download, Plus, X, Search } from "lucide-react";

type Tab = "classlist" | "attendance" | "grades" | "notes";
type AttStatus = "present" | "late" | "excused" | "absent";

const DATES = ["Sep 1", "Sep 3", "Sep 5"];
const STUDENTS = [
  { id: "1", num: "STU-2026-0891", name: "Morgan, Alex", program: "BS CS", year: "3rd Year" },
  { id: "2", num: "STU-2026-0892", name: "Chen, Liam", program: "BS CS", year: "3rd Year" },
  { id: "3", num: "STU-2026-0893", name: "Rodriguez, Sophia", program: "BS CS", year: "3rd Year" },
  { id: "4", num: "STU-2026-0894", name: "Aurelius, Marcus", program: "BS CS", year: "3rd Year" },
  { id: "5", num: "STU-2026-0895", name: "Watson, Emma", program: "BS CS", year: "3rd Year" },
];

const initialAttendance: Record<string, Record<string, AttStatus>> = {
  "1": { "Sep 1": "present", "Sep 3": "present", "Sep 5": "present" },
  "2": { "Sep 1": "present", "Sep 3": "late", "Sep 5": "present" },
  "3": { "Sep 1": "excused", "Sep 3": "present", "Sep 5": "absent" },
  "4": { "Sep 1": "present", "Sep 3": "absent", "Sep 5": "late" },
  "5": { "Sep 1": "present", "Sep 3": "present", "Sep 5": "present" },
};

const ACTIVITIES = [
  { id: "q1", type: "Quiz", name: "Quiz 1", maxScore: 20 },
  { id: "q2", type: "Quiz", name: "Quiz 2", maxScore: 20 },
  { id: "e1", type: "Exam", name: "Prelim Exam", maxScore: 100 },
  { id: "pt1", type: "Performance Task", name: "Reporting Project 1", maxScore: 50 },
];

const initialGrades: Record<string, Record<string, number | null>> = {
  "1": { q1: 18, q2: 20, e1: 85, pt1: 45 },
  "2": { q1: 15, q2: 17, e1: 78, pt1: 40 },
  "3": { q1: 20, q2: 19, e1: 92, pt1: 48 },
  "4": { q1: 12, q2: 14, e1: 68, pt1: 35 },
  "5": { q1: 16, q2: 18, e1: 88, pt1: 44 },
};

const PENDING_REQUESTS = [
  { id: "p1", name: "Jackson, Noah", num: "STU-2026-0896", match: true },
  { id: "p2", name: "Kim, Olivia", num: "STU-2026-0897", match: false },
];

const STATUS_COLORS: Record<AttStatus, string> = {
  present: "var(--status-present)", late: "var(--status-late)", excused: "var(--status-excused)", absent: "var(--status-absent)",
};

export default function ClassWorkspacePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<Tab>("classlist");
  const [attendance, setAttendance] = useState(initialAttendance);
  const [grades, setGrades] = useState(initialGrades);
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState(PENDING_REQUESTS);
  const [notes, setNotes] = useState("Class notes and to-do items go here...");
  const [showAttendanceOverlay, setShowAttendanceOverlay] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(0);
  const [overlayDate] = useState("Sep 5");

  const setAttValue = (studentId: string, date: string, val: AttStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: { ...prev[studentId], [date]: val } }));
  };

  const approveRequest = (id: string) => setRequests((r) => r.filter((req) => req.id !== id));

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "classlist", label: "Class List", icon: <Users size={16} /> },
    { key: "attendance", label: "Attendance", icon: <ClipboardList size={16} /> },
    { key: "grades", label: "Grades", icon: <BookOpen size={16} /> },
    { key: "notes", label: "Notes & To-Do", icon: <FileText size={16} /> },
  ];

  const filtered = STUDENTS.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.num.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/dashboard/instructor/classes" className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
          <ArrowLeft size={15} /> Back to Classes
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800 }}>CS308 – Web Systems &amp; Technologies</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.2rem" }}>CS-401 · Lab 1A · TTh 2:00–3:30 PM · {STUDENTS.length} students</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAttendanceOverlay(true)}>
              <ClipboardList size={14} /> Record Attendance Today
            </button>
            <button className="btn btn-secondary btn-sm">
              <Download size={14} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "0.25rem", backgroundColor: "#f1f5f9", borderRadius: "var(--radius-md)", padding: "0.3rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t.key} type="button" onClick={() => setActiveTab(t.key)} style={{
            flex: 1, minWidth: "120px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
            padding: "0.55rem 1rem", borderRadius: "var(--radius-sm)", border: "none", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
            backgroundColor: activeTab === t.key ? "#ffffff" : "transparent",
            color: activeTab === t.key ? "var(--accent-primary)" : "var(--text-secondary)",
            boxShadow: activeTab === t.key ? "var(--glass-shadow)" : "none",
            transition: "all var(--transition-fast)",
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── CLASS LIST TAB ── */}
      {activeTab === "classlist" && (
        <div>
          {/* Pending Requests */}
          {requests.length > 0 && (
            <div className="card" style={{ marginBottom: "1.5rem", borderColor: "rgba(0,51,160,0.2)", backgroundColor: "rgba(0,51,160,0.03)" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <UserCheck size={16} color="var(--accent-primary)" /> Pending Join Requests ({requests.length})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {requests.map((r) => (
                  <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", backgroundColor: "#ffffff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{r.name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: "0.75rem" }}>{r.num}</span>
                      {r.match && <span className="badge badge-present" style={{ marginLeft: "0.5rem", fontSize: "0.7rem" }}>✓ ID Match</span>}
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="button" onClick={() => approveRequest(r.id)} className="btn btn-primary btn-sm" style={{ padding: "0.3rem 0.75rem" }}>
                        <Check size={13} /> Approve
                      </button>
                      <button type="button" onClick={() => approveRequest(r.id)} className="btn btn-secondary btn-sm" style={{ padding: "0.3rem 0.75rem", color: "var(--status-absent)" }}>
                        <X size={13} /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Roster */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Enrolled Students ({STUDENTS.length})</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div style={{ position: "relative" }}>
                  <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field" style={{ paddingLeft: "2.2rem", paddingTop: "0.45rem", paddingBottom: "0.45rem", fontSize: "0.85rem" }} />
                  <Search size={15} color="var(--text-muted)" style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
                <button className="btn btn-secondary btn-sm"><Plus size={14} /> Add Student</button>
              </div>
            </div>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Number</th>
                    <th>Student Name</th>
                    <th>Program / Strand</th>
                    <th>Academic Level</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.id}>
                      <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{s.num}</td>
                      <td style={{ fontWeight: 600 }}>{s.name}</td>
                      <td>{s.program}</td>
                      <td>{s.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── ATTENDANCE TAB ── */}
      {activeTab === "attendance" && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Attendance Grid</h3>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAttendanceOverlay(true)}>
              <ClipboardList size={14} /> Record Today
            </button>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  {DATES.map((d) => <th key={d} style={{ textAlign: "center" }}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{s.name}</td>
                    {DATES.map((d) => {
                      const val = attendance[s.id]?.[d] ?? "absent";
                      return (
                        <td key={d} style={{ textAlign: "center" }}>
                          <select value={val} onChange={(e) => setAttValue(s.id, d, e.target.value as AttStatus)} style={{ fontSize: "0.78rem", padding: "0.2rem 0.4rem", borderRadius: "6px", border: `1.5px solid ${STATUS_COLORS[val]}`, color: STATUS_COLORS[val], backgroundColor: `${STATUS_COLORS[val]}15`, fontWeight: 600, cursor: "pointer", outline: "none" }}>
                            <option value="present">Present</option>
                            <option value="late">Late</option>
                            <option value="excused">Excused</option>
                            <option value="absent">Absent</option>
                          </select>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── GRADES TAB ── */}
      {activeTab === "grades" && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Grades</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Activity</button>
              <button className="btn btn-secondary btn-sm"><Download size={14} /> Export .xlsx</button>
            </div>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  {ACTIVITIES.map((a) => (
                    <th key={a.id} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 400 }}>{a.type}</div>
                      <div>{a.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 400 }}>/{a.maxScore}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{s.name}</td>
                    {ACTIVITIES.map((a) => {
                      const val = grades[s.id]?.[a.id];
                      return (
                        <td key={a.id} style={{ textAlign: "center" }}>
                          <input type="number" min={0} max={a.maxScore} value={val ?? ""} onChange={(e) => setGrades((g) => ({ ...g, [s.id]: { ...g[s.id], [a.id]: e.target.value === "" ? null : Number(e.target.value) } }))} style={{ width: "56px", textAlign: "center", padding: "0.3rem", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, outline: "none", background: "#ffffff" }} placeholder="–" />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── NOTES TAB ── */}
      {activeTab === "notes" && (
        <div className="card">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Notes &amp; To-Do <span className="badge badge-late" style={{ fontSize: "0.7rem", marginLeft: "0.5rem" }}>BETA</span></h3>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: "100%", minHeight: "300px", padding: "1rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", fontSize: "0.9rem", color: "var(--text-primary)", resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.6 }} />
          <button className="btn btn-primary btn-sm" style={{ marginTop: "0.75rem" }}><CheckCircle2 size={14} /> Save Notes</button>
        </div>
      )}

      {/* ── ATTENDANCE OVERLAY ── */}
      {showAttendanceOverlay && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1.5rem" }}>
          <div className="card" style={{ maxWidth: "500px", width: "100%", padding: "2rem", position: "relative" }}>
            <button type="button" onClick={() => { setShowAttendanceOverlay(false); setOverlayIndex(0); }} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
              <X size={20} />
            </button>

            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Recording attendance for {overlayDate} · Student {overlayIndex + 1} of {STUDENTS.length}</div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800 }}>{STUDENTS[overlayIndex]?.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{STUDENTS[overlayIndex]?.num} · {STUDENTS[overlayIndex]?.program}</p>
            </div>

            {/* Progress */}
            <div style={{ height: "4px", backgroundColor: "#f1f5f9", borderRadius: "2px", marginBottom: "1.5rem" }}>
              <div style={{ height: "100%", borderRadius: "2px", backgroundColor: "var(--accent-primary)", width: `${((overlayIndex + 1) / STUDENTS.length) * 100}%`, transition: "width 0.3s" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {([["present", "P", "Present", "var(--status-present)"], ["late", "L", "Late", "var(--status-late)"], ["excused", "E", "Excused", "var(--status-excused)"], ["absent", "A", "Absent", "var(--status-absent)"]] as const).map(([val, key, label, color]) => {
                const current = attendance[STUDENTS[overlayIndex]?.id]?.[overlayDate];
                return (
                  <button key={val} type="button" onClick={() => { setAttValue(STUDENTS[overlayIndex].id, overlayDate, val as AttStatus); }} style={{ padding: "0.9rem", border: `2px solid ${current === val ? color : "var(--border-subtle)"}`, borderRadius: "var(--radius-md)", backgroundColor: current === val ? `${color}15` : "#ffffff", color: current === val ? color : "var(--text-secondary)", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", transition: "all var(--transition-fast)" }}>
                    <span style={{ fontSize: "1.1rem" }}>{key}</span>
                    <span style={{ fontSize: "0.78rem" }}>{label}</span>
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", marginBottom: "1rem" }}>Keyboard shortcuts: P · L · E · A</p>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {overlayIndex > 0 && (
                <button type="button" onClick={() => setOverlayIndex((i) => i - 1)} className="btn btn-secondary" style={{ flex: 1 }}>
                  ← Go Back
                </button>
              )}
              <button type="button" onClick={() => {
                if (overlayIndex < STUDENTS.length - 1) setOverlayIndex((i) => i + 1);
                else { setShowAttendanceOverlay(false); setOverlayIndex(0); }
              }} className="btn btn-primary" style={{ flex: 2 }}>
                {overlayIndex < STUDENTS.length - 1 ? "Confirm & Next →" : "✓ Finish Recording"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
