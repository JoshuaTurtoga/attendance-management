"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function generateCode() {
  return "ATT-" + Math.random().toString(36).toUpperCase().slice(2, 8);
}

export default function NewClassPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    courseCode: "", courseTitle: "", section: "", classType: "Lecture",
    room: "TBA", units: "", miniTerm: "", term: "1st Semester",
    days: [] as string[], startTime: "", endTime: "",
  });
  const [classCode, setClassCode] = useState(generateCode());
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string | string[]) => setForm((f) => ({ ...f, [k]: v }));

  const toggleDay = (day: string) => {
    setForm((f) => ({
      ...f,
      days: f.days.includes(day) ? f.days.filter((d) => d !== day) : [...f.days, day],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/dashboard/instructor/classes/1"); }, 900);
  };

  return (
    <div className="container" style={{ maxWidth: "680px" }}>
      <Link href="/dashboard/instructor/classes" className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} /> Back to Classes
      </Link>

      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>Create New Class</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Configure your class profile and share the generated code with your students.
      </p>

      <div className="card" style={{ padding: "2rem" }}>
        <form onSubmit={handleSubmit}>
          {/* Course Info */}
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Course Information</h2>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-code">Course Code</label>
              <input id="nc-code" type="text" required placeholder="e.g. CS308" value={form.courseCode} onChange={(e) => update("courseCode", e.target.value.toUpperCase())} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-title">Course Title</label>
              <input id="nc-title" type="text" required placeholder="e.g. Web Systems & Technologies" value={form.courseTitle} onChange={(e) => update("courseTitle", e.target.value)} className="input-field" />
            </div>
          </div>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-section">Section</label>
              <input id="nc-section" type="text" required placeholder="e.g. E106-R" value={form.section} onChange={(e) => update("section", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-type">Class Type</label>
              <select id="nc-type" value={form.classType} onChange={(e) => update("classType", e.target.value)} className="input-field">
                <option>Lecture</option>
                <option>Laboratory</option>
              </select>
            </div>
          </div>

          {/* Schedule */}
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", marginTop: "0.5rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Schedule & Room</h2>
          <div className="input-group">
            <label className="input-label">Days</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {DAYS.map((d) => (
                <button key={d} type="button" onClick={() => toggleDay(d)} style={{
                  padding: "0.4rem 0.85rem", borderRadius: "var(--radius-full)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                  backgroundColor: form.days.includes(d) ? "var(--accent-primary)" : "transparent",
                  color: form.days.includes(d) ? "#ffffff" : "var(--text-secondary)",
                  borderColor: form.days.includes(d) ? "var(--accent-primary)" : "var(--border-subtle)",
                  transition: "all var(--transition-fast)",
                }}>{d.slice(0, 3)}</button>
              ))}
            </div>
          </div>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-start">Start Time</label>
              <input id="nc-start" type="time" value={form.startTime} onChange={(e) => update("startTime", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-end">End Time</label>
              <input id="nc-end" type="time" value={form.endTime} onChange={(e) => update("endTime", e.target.value)} className="input-field" />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="nc-room">Room</label>
            <input id="nc-room" type="text" placeholder="TBA" value={form.room} onChange={(e) => update("room", e.target.value)} className="input-field" />
          </div>

          {/* Academic Metadata */}
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", marginTop: "0.5rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Academic Metadata</h2>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-units">Units</label>
              <input id="nc-units" type="number" min={1} max={6} placeholder="e.g. 3" value={form.units} onChange={(e) => update("units", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="nc-term">Term / Semester</label>
              <select id="nc-term" value={form.term} onChange={(e) => update("term", e.target.value)} className="input-field">
                <option>1st Semester</option>
                <option>2nd Semester</option>
                <option>Summer</option>
              </select>
            </div>
          </div>

          {/* Class Join Code */}
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", marginTop: "0.5rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Class Join Code</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>Share this code with your students</div>
              <div style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-primary)", letterSpacing: "0.08em" }}>{classCode}</div>
            </div>
            <button type="button" onClick={() => setClassCode(generateCode())} className="btn btn-secondary btn-sm" title="Regenerate Code">
              <RefreshCw size={14} /> Regenerate
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
            {loading ? <span>Creating class...</span> : <><CheckCircle2 size={18} /><span>Create Class</span></>}
          </button>
        </form>
      </div>
    </div>
  );
}
