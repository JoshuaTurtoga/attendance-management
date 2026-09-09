"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function InstructorProfilePage() {
  const [form, setForm] = useState({ firstName: "David", middleName: "James", lastName: "Miller" });
  const [saved, setSaved] = useState(false);
  const update = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };

  return (
    <div className="container" style={{ maxWidth: "520px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>My Profile</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>Update your instructor profile information.</p>
      {saved && (
        <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-present-bg)", border: "1px solid var(--status-present-border)", color: "var(--status-present)", fontSize: "0.875rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={16} /> Profile saved.
        </div>
      )}
      <div className="card" style={{ padding: "2rem" }}>
        <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
          {[["firstName", "First Name", "e.g. David"], ["middleName", "Middle Name", "Optional"], ["lastName", "Last Name", "e.g. Miller"]].map(([key, label, placeholder]) => (
            <div key={key} className="input-group">
              <label className="input-label" htmlFor={`ip-${key}`}>{label}</label>
              <input id={`ip-${key}`} type="text" placeholder={placeholder} value={(form as Record<string, string>)[key]} onChange={(e) => update(key, e.target.value)} className="input-field" />
            </div>
          ))}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.8rem", marginTop: "0.25rem" }}>
            <CheckCircle2 size={18} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
