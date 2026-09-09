"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hash, BookOpen, CheckCircle2 } from "lucide-react";

export default function JoinClassPage() {
  const router = useRouter();
  const [courseCode, setCourseCode] = useState("");
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ courseName: string; instructor: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!courseCode.trim() || !classCode.trim()) { setError("Both fields are required."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock: any code works for demo
      setSuccess({ courseName: "CS308 – Web Systems & Technologies", instructor: "Prof. David Miller" });
    }, 800);
  };

  return (
    <div className="container" style={{ maxWidth: "520px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>Join a Class</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Enter the Course Code and Class Code provided by your instructor.
      </p>

      {success ? (
        <div className="card" style={{ textAlign: "center", padding: "2.5rem 2rem" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--status-present-bg)", border: "2px solid var(--status-present-border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
            <CheckCircle2 size={34} color="var(--status-present)" />
          </div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>Request Sent!</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            Successfully sent a request to join the class <strong>{success.courseName}</strong> to Instructor <strong>{success.instructor}</strong>.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "0.75rem" }}>You will be notified once the instructor approves your request.</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.75rem", flexWrap: "wrap" }}>
            <button type="button" onClick={() => { setSuccess(null); setCourseCode(""); setClassCode(""); }} className="btn btn-secondary">
              Join Another Class
            </button>
            <button type="button" onClick={() => router.push("/dashboard/student/requests")} className="btn btn-primary">
              View Requests
            </button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: "2rem" }}>
          {error && (
            <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-absent-bg)", border: "1px solid var(--status-absent-border)", color: "var(--status-absent)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="course-code">Course Code</label>
              <div style={{ position: "relative" }}>
                <input id="course-code" type="text" required placeholder="e.g. CS308" value={courseCode} onChange={(e) => setCourseCode(e.target.value.toUpperCase())} className="input-field" style={{ paddingLeft: "2.5rem" }} />
                <BookOpen size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="class-code">Class Code</label>
              <div style={{ position: "relative" }}>
                <input id="class-code" type="text" required placeholder="e.g. ATT-2026-CS308-A1" value={classCode} onChange={(e) => setClassCode(e.target.value.toUpperCase())} className="input-field" style={{ paddingLeft: "2.5rem", fontFamily: "monospace", letterSpacing: "0.05em" }} />
                <Hash size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Ask your instructor for the Class Code.</span>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem", marginTop: "0.5rem" }}>
              {loading ? <span>Sending request...</span> : <><BookOpen size={18} /><span>Send Join Request</span></>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
