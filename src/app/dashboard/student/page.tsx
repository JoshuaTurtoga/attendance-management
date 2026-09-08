"use client";

import { useState } from "react";
import {
  GraduationCap,
  Calendar,
  Clock,
  QrCode,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Sparkles,
  MapPin,
  X,
} from "lucide-react";

export default function StudentDashboard() {
  const [showQrModal, setShowQrModal] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState<"idle" | "success">("idle");

  const handleSimulateCheckIn = () => {
    setCheckInStatus("success");
    setTimeout(() => {
      setShowQrModal(false);
      setCheckInStatus("idle");
    }, 1500);
  };

  const attendanceRecords = [
    {
      date: "Today, Sep 5",
      course: "CS308 Web Systems & Technologies",
      time: "02:00 PM - 03:30 PM",
      instructor: "Prof. David Miller",
      status: checkInStatus === "success" ? "present" : "open",
      checkInTime: checkInStatus === "success" ? "02:01 PM" : "--",
    },
    {
      date: "Today, Sep 5",
      course: "CS305 Software Engineering",
      time: "11:00 AM - 12:30 PM",
      instructor: "Dr. Elena Vance",
      status: "present",
      checkInTime: "11:04 AM",
    },
    {
      date: "Today, Sep 5",
      course: "CS301 Database Systems",
      time: "09:00 AM - 10:30 AM",
      instructor: "Prof. Robert Thorne",
      status: "present",
      checkInTime: "09:02 AM",
    },
    {
      date: "Yesterday, Sep 4",
      course: "CS302 Algorithms & Complexity",
      time: "01:00 PM - 02:30 PM",
      instructor: "Prof. Sarah Connor",
      status: "late",
      checkInTime: "01:16 PM",
    },
    {
      date: "Yesterday, Sep 4",
      course: "MATH204 Discrete Mathematics",
      time: "10:00 AM - 11:30 AM",
      instructor: "Dr. Gregory House",
      status: "present",
      checkInTime: "10:01 AM",
    },
    {
      date: "Wednesday, Sep 3",
      course: "CS308 Web Systems & Technologies",
      time: "02:00 PM - 03:30 PM",
      instructor: "Prof. David Miller",
      status: "present",
      checkInTime: "02:03 PM",
    },
  ];

  return (
    <div className="container">
      {/* Student Profile Header */}
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "2rem",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--accent-glow)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            AM
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Alex Morgan</h1>
              <span className="badge badge-present">Active Student</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.2rem" }}>
              Student ID: <strong style={{ color: "var(--text-primary)" }}>STU-2026-0891</strong> &bull; BS Computer Science (Year 3)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowQrModal(true)}
          className="btn btn-primary"
          style={{ padding: "0.75rem 1.5rem" }}
        >
          <QrCode size={18} />
          <span>Scan Attendance QR</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid-cols-4" style={{ marginBottom: "2rem" }}>
        {/* Attendance Rate */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Attendance Rate</span>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "var(--status-present-bg)",
                color: "var(--status-present)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--status-present)" }}>
            94.2%
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
            Target: 80% minimum required
          </div>
        </div>

        {/* Total Present */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Sessions Present</span>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "rgba(0, 51, 160, 0.1)",
                color: "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
            48 <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500 }}>/ 51</span>
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.35rem" }}>
            2 Late &bull; 1 Unexcused
          </div>
        </div>

        {/* Current Streak */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Attendance Streak</span>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                color: "var(--status-late)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Award size={16} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#f59e0b" }}>
            14 Days
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
            Personal best this semester!
          </div>
        </div>

        {/* Today's Classes */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Today's Classes</span>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "rgba(14, 165, 233, 0.15)",
                color: "var(--status-excused)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Calendar size={16} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
            3 Classes
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--status-present)", marginTop: "0.35rem" }}>
            {checkInStatus === "success" ? "All check-ins completed!" : "1 class awaiting check-in"}
          </div>
        </div>
      </div>

      {/* Active Session & Today's Schedule */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
          Today&apos;s Class Schedule
        </h2>
        <div className="grid-cols-3">
          {/* Class 1 */}
          <div className="card" style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span className="badge badge-present">Completed &bull; Present</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>09:00 - 10:30 AM</span>
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0.4rem 0" }}>
              CS301 Database Systems
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <MapPin size={14} /> Room 204 &bull; Prof. Robert Thorne
            </p>
            <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--status-present)" }}>
              ✓ Verified via QR at 09:02 AM
            </div>
          </div>

          {/* Class 2 */}
          <div className="card" style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span className="badge badge-present">Completed &bull; Present</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>11:00 AM - 12:30 PM</span>
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0.4rem 0" }}>
              CS305 Software Engineering
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <MapPin size={14} /> Lab 3B &bull; Dr. Elena Vance
            </p>
            <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--status-present)" }}>
              ✓ Verified via QR at 11:04 AM
            </div>
          </div>

          {/* Class 3 (Live / In Progress) */}
          <div
            className="card"
            style={{
              borderColor: checkInStatus === "success" ? "rgba(16, 185, 129, 0.5)" : "var(--border-glow)",
              boxShadow: checkInStatus === "success" ? "none" : "var(--accent-glow)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              {checkInStatus === "success" ? (
                <span className="badge badge-present">Checked In</span>
              ) : (
                <span
                  className="badge"
                  style={{
                    backgroundColor: "rgba(0, 51, 160, 0.1)",
                    color: "var(--accent-primary)",
                    border: "1px solid rgba(0, 51, 160, 0.2)",
                  }}
                >
                  ● Session Open Now
                </span>
              )}
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>02:00 - 03:30 PM</span>
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0.4rem 0" }}>
              CS308 Web Systems
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <MapPin size={14} /> Lab 1A &bull; Prof. David Miller
            </p>
            <div style={{ marginTop: "1rem" }}>
              {checkInStatus === "success" ? (
                <div style={{ fontSize: "0.75rem", color: "var(--status-present)" }}>
                  ✓ Verified via QR at 02:01 PM
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ width: "100%" }}
                >
                  <QrCode size={15} />
                  <span>Check In Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Recent Attendance Records</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Synchronized log from Supabase database
            </p>
          </div>
          <span className="badge" style={{ backgroundColor: "rgba(15, 23, 42, 0.05)", color: "var(--text-secondary)" }}>
            Showing last 6 sessions
          </span>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Course Name</th>
                <th>Schedule</th>
                <th>Instructor</th>
                <th>Time Logged</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 500 }}>{item.date}</td>
                  <td>{item.course}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{item.time}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{item.instructor}</td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{item.checkInTime}</td>
                  <td>
                    {item.status === "present" && (
                      <span className="badge badge-present">Present</span>
                    )}
                    {item.status === "late" && (
                      <span className="badge badge-late">Late (16m)</span>
                    )}
                    {item.status === "absent" && (
                      <span className="badge badge-absent">Absent</span>
                    )}
                    {item.status === "open" && (
                      <span className="badge badge-late">Pending Check-in</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Check-in Modal Simulator */}
      {showQrModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "1.5rem",
          }}
        >
          <div className="card" style={{ maxWidth: "420px", width: "100%", textAlign: "center", position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "var(--accent-gradient)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <QrCode size={24} color="#ffffff" />
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Attendance QR Scanner
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Point your camera at the teacher&apos;s live QR screen to record attendance for <strong>CS308 Web Systems</strong>.
            </p>

            {/* Simulated Camera Viewfinder */}
            <div
              style={{
                height: "200px",
                background: "#f1f5f9",
                borderRadius: "var(--radius-md)",
                border: "2px dashed var(--accent-primary)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
            >
              <QrCode size={64} color="var(--accent-primary)" style={{ opacity: 0.8 }} />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                }}
              >
                Simulated Scanner Viewfinder
              </div>
            </div>

            {checkInStatus === "success" ? (
              <div
                style={{
                  padding: "0.75rem",
                  backgroundColor: "var(--status-present-bg)",
                  color: "var(--status-present)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <CheckCircle2 size={18} />
                <span>Attendance Verified Successfully!</span>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSimulateCheckIn}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Sparkles size={16} />
                  <span>Simulate Scan</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
