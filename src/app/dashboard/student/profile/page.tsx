"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function StudentProfilePage() {
  const [form, setForm] = useState({ firstName: "Alex", lastName: "Morgan", course: "BS Computer Science", department: "College of Computing", year: "3rd Year", studentId: "STU-2026-0891", mobile: "0917 123 4567", altEmail: "alex.morgan@gmail.com" });
  const [saved, setSaved] = useState(false);

  const update = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };

  const handleSave = (e: React.FormEvent) => { e.preventDefault(); setSaved(true); };

  return (
    <div className="container" style={{ maxWidth: "640px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>My Profile</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>Update your personal information.</p>

      {saved && (
        <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-present-bg)", border: "1px solid var(--status-present-border)", color: "var(--status-present)", fontSize: "0.875rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={16} /> Profile saved successfully.
        </div>
      )}

      <div className="card" style={{ padding: "2rem" }}>
        <form onSubmit={handleSave}>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            {[["firstName", "First Name", "e.g. Alex"], ["lastName", "Last Name", "e.g. Morgan"]].map(([key, label, placeholder]) => (
              <div key={key} className="input-group">
                <label className="input-label" htmlFor={`pf-${key}`}>{label}</label>
                <input id={`pf-${key}`} type="text" required placeholder={placeholder} value={(form as Record<string, string>)[key]} onChange={(e) => update(key, e.target.value)} className="input-field" />
              </div>
            ))}
          </div>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="pf-course">Course / Program</label>
              <input id="pf-course" type="text" value={form.course} onChange={(e) => update("course", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="pf-dept">Department</label>
              <input id="pf-dept" type="text" value={form.department} onChange={(e) => update("department", e.target.value)} className="input-field" />
            </div>
          </div>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="pf-year">Year Level</label>
              <select id="pf-year" value={form.year} onChange={(e) => update("year", e.target.value)} className="input-field">
                {["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"].map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="pf-sid">Student ID</label>
              <input id="pf-sid" type="text" value={form.studentId} readOnly className="input-field" style={{ backgroundColor: "#f1f5f9", color: "var(--text-muted)" }} />
            </div>
          </div>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="pf-mobile">Mobile</label>
              <input id="pf-mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="pf-alt">Alternative Email</label>
              <input id="pf-alt" type="email" value={form.altEmail} onChange={(e) => update("altEmail", e.target.value)} className="input-field" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.8rem", marginTop: "0.5rem" }}>
            <CheckCircle2 size={18} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
