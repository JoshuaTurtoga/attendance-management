"use client";

import { useState } from "react";
import {
  Users,
  QrCode,
  Download,
  Search,
  CheckCircle2,
  Clock,
  UserX,
  PlayCircle,
  StopCircle,
  X,
  Sparkles,
} from "lucide-react";

type AttendanceState = "present" | "late" | "absent";

interface StudentRecord {
  id: string;
  name: string;
  studentId: string;
  checkInTime: string;
  method: "QR Code" | "Manual" | "--";
  status: AttendanceState;
}

export default function TeacherDashboard() {
  const [sessionActive, setSessionActive] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [filter, setFilter] = useState<"all" | AttendanceState>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: "1",
      name: "Alex Morgan",
      studentId: "STU-2026-0891",
      checkInTime: "02:01 PM",
      method: "QR Code",
      status: "present",
    },
    {
      id: "2",
      name: "Liam Chen",
      studentId: "STU-2026-0892",
      checkInTime: "02:02 PM",
      method: "QR Code",
      status: "present",
    },
    {
      id: "3",
      name: "Sophia Rodriguez",
      studentId: "STU-2026-0893",
      checkInTime: "02:04 PM",
      method: "QR Code",
      status: "present",
    },
    {
      id: "4",
      name: "Marcus Aurelius",
      studentId: "STU-2026-0894",
      checkInTime: "02:18 PM",
      method: "QR Code",
      status: "late",
    },
    {
      id: "5",
      name: "Emma Watson",
      studentId: "STU-2026-0895",
      checkInTime: "02:00 PM",
      method: "QR Code",
      status: "present",
    },
    {
      id: "6",
      name: "Noah Jackson",
      studentId: "STU-2026-0896",
      checkInTime: "--",
      method: "--",
      status: "absent",
    },
    {
      id: "7",
      name: "Olivia Kim",
      studentId: "STU-2026-0897",
      checkInTime: "02:05 PM",
      method: "QR Code",
      status: "present",
    },
    {
      id: "8",
      name: "James Wilson",
      studentId: "STU-2026-0898",
      checkInTime: "--",
      method: "--",
      status: "absent",
    },
  ]);

  const updateStatus = (id: string, newStatus: AttendanceState) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: newStatus,
            method: "Manual",
            checkInTime:
              newStatus === "absent"
                ? "--"
                : s.checkInTime === "--"
                ? "02:15 PM"
                : s.checkInTime,
          };
        }
        return s;
      })
    );
  };

  const presentCount = students.filter((s) => s.status === "present").length;
  const lateCount = students.filter((s) => s.status === "late").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const totalCount = students.length;
  const attendancePercent = totalCount > 0 ? Math.round(((presentCount + lateCount) / totalCount) * 100) : 0;

  const filteredStudents = students.filter((s) => {
    const matchesFilter = filter === "all" || s.status === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container">
      {/* Teacher Profile & Active Class Header */}
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "2rem",
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.35)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            DM
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Prof. David Miller</h1>
              <span className="badge badge-present">Faculty Verified</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.2rem" }}>
              Faculty ID: <strong style={{ color: "var(--text-primary)" }}>FAC-1024</strong> &bull; Dept of Computer Science
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="btn btn-primary"
          >
            <QrCode size={18} />
            <span>Project QR Code</span>
          </button>
          <button
            type="button"
            onClick={() => alert("CSV export triggered for Supabase attendance logs.")}
            className="btn btn-secondary"
          >
            <Download size={18} />
            <span>Export Roster</span>
          </button>
        </div>
      </div>

      {/* Active Session Control Banner */}
      <div
        className="card"
        style={{
          border: sessionActive ? "1px solid var(--border-glow)" : "1px solid var(--border-subtle)",
          marginBottom: "2rem",
          padding: "1.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: sessionActive ? "var(--status-present)" : "var(--text-muted)",
                  boxShadow: sessionActive ? "0 0 10px var(--status-present)" : "none",
                }}
              />
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: sessionActive ? "var(--status-present)" : "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {sessionActive ? "Live Attendance Session Active" : "Session Closed"}
              </span>
            </div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800 }}>
              CS308: Web Systems & Technologies
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
              Room: Lab 1A &bull; Schedule: 02:00 PM - 03:30 PM &bull; Section: CS-401
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              type="button"
              onClick={() => setSessionActive(!sessionActive)}
              className={sessionActive ? "btn btn-secondary" : "btn btn-primary"}
              style={{ padding: "0.65rem 1.25rem" }}
            >
              {sessionActive ? (
                <>
                  <StopCircle size={18} color="#f43f5e" />
                  <span>End Live Session</span>
                </>
              ) : (
                <>
                  <PlayCircle size={18} />
                  <span>Start New Session</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Realtime Attendance Metric Cards */}
      <div className="grid-cols-4" style={{ marginBottom: "2rem" }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Present Rate</span>
            <Users size={16} color="#818cf8" />
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--accent-primary)" }}>
            {attendancePercent}%
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            {presentCount + lateCount} of {totalCount} students checked in
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>On Time</span>
            <CheckCircle2 size={16} color="var(--status-present)" />
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--status-present)" }}>
            {presentCount}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Verified within grace period
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Late Check-ins</span>
            <Clock size={16} color="var(--status-late)" />
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--status-late)" }}>
            {lateCount}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Checked in &gt; 15 mins after start
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Absent / Unrecorded</span>
            <UserX size={16} color="var(--status-absent)" />
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--status-absent)" }}>
            {absentCount}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Awaiting check-in or manual update
          </div>
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="card">
        {/* Table Filters & Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Class Attendance Roster</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Live real-time updates connected with Supabase Database
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            {/* Search Input */}
            <div style={{ position: "relative", minWidth: "220px" }}>
              <input
                type="text"
                placeholder="Search student or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.2rem", paddingBottom: "0.55rem", paddingTop: "0.55rem" }}
              />
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                padding: "0.25rem",
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {(["all", "present", "late", "absent"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    cursor: "pointer",
                    backgroundColor: filter === tab ? "var(--accent-primary)" : "transparent",
                    color: filter === tab ? "#ffffff" : "var(--text-secondary)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Check-in Time</th>
                <th>Method</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Manual Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                    No students matching the current filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{student.name}</div>
                    </td>
                    <td style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>
                      {student.studentId}
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                      {student.checkInTime}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: student.method === "--" ? "var(--text-muted)" : "var(--text-secondary)",
                        }}
                      >
                        {student.method}
                      </span>
                    </td>
                    <td>
                      {student.status === "present" && (
                        <span className="badge badge-present">Present</span>
                      )}
                      {student.status === "late" && (
                        <span className="badge badge-late">Late</span>
                      )}
                      {student.status === "absent" && (
                        <span className="badge badge-absent">Absent</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          onClick={() => updateStatus(student.id, "present")}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.7rem",
                            borderColor: student.status === "present" ? "var(--status-present)" : undefined,
                            color: student.status === "present" ? "var(--status-present)" : undefined,
                          }}
                          title="Mark Present"
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStatus(student.id, "late")}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.7rem",
                            borderColor: student.status === "late" ? "var(--status-late)" : undefined,
                            color: student.status === "late" ? "var(--status-late)" : undefined,
                          }}
                          title="Mark Late"
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStatus(student.id, "absent")}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.7rem",
                            borderColor: student.status === "absent" ? "var(--status-absent)" : undefined,
                            color: student.status === "absent" ? "var(--status-absent)" : undefined,
                          }}
                          title="Mark Absent"
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Projected QR Code Modal for Classroom Projector */}
      {showQrModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "1.5rem",
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "520px",
              width: "100%",
              textAlign: "center",
              position: "relative",
              padding: "2.5rem 2rem",
            }}
          >
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              <X size={22} />
            </button>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.85rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--status-present-bg)",
                color: "var(--status-present)",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              <Sparkles size={14} />
              <span>Projector Display Mode</span>
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>CS308 Web Systems</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Students: Scan this dynamic QR code with your mobile camera or AttendEase portal
            </p>

            {/* Aesthetic QR Display Card */}
            <div
              style={{
                background: "#ffffff",
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                display: "inline-block",
                boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)",
                marginBottom: "1.5rem",
              }}
            >
              <QrCode size={220} color="#0f172a" />
              <div
                style={{
                  marginTop: "0.5rem",
                  color: "#64748b",
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                TOKEN: ATT-2026-CS308-LIVE
              </div>
            </div>

            <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Rotates every 30 seconds to prevent fraudulent check-in sharing.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
