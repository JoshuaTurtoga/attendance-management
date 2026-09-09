"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ siteName: "AttendEase", universityName: "University of Bohol", emailDomain: "@ub.edu.ph", minAttendance: "80", graceMinutes: "15", allowSelfReg: true, maintenanceMode: false });
  const [saved, setSaved] = useState(false);

  const upd = (k: string, v: string | boolean) => { setSettings((s) => ({ ...s, [k]: v })); setSaved(false); };

  return (
    <div className="container" style={{ maxWidth: "680px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>System Settings</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>Configure global site-wide parameters.</p>

      {saved && (
        <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-present-bg)", border: "1px solid var(--status-present-border)", color: "var(--status-present)", fontSize: "0.875rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={16} /> Settings saved.
        </div>
      )}

      <div className="card" style={{ padding: "2rem" }}>
        <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "1rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>General</h2>
          {[["siteName", "System Name", "text"], ["universityName", "University Name", "text"], ["emailDomain", "Student Email Domain", "text"]].map(([key, label, type]) => (
            <div key={key} className="input-group">
              <label className="input-label" htmlFor={`set-${key}`}>{label}</label>
              <input id={`set-${key}`} type={type} value={(settings as Record<string, string | boolean>)[key] as string} onChange={(e) => upd(key, e.target.value)} className="input-field" />
            </div>
          ))}

          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "1rem", marginTop: "0.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Attendance Rules</h2>
          <div className="grid-cols-2" style={{ gap: "1rem" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="set-min">Minimum Attendance (%)</label>
              <input id="set-min" type="number" min={0} max={100} value={settings.minAttendance} onChange={(e) => upd("minAttendance", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="set-grace">Late Grace Period (minutes)</label>
              <input id="set-grace" type="number" min={0} max={60} value={settings.graceMinutes} onChange={(e) => upd("graceMinutes", e.target.value)} className="input-field" />
            </div>
          </div>

          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "1rem", marginTop: "0.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Access Control</h2>
          {[["allowSelfReg", "Allow Student Self-Registration"], ["maintenanceMode", "Maintenance Mode"]].map(([key, label]) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{label}</div>
                {key === "maintenanceMode" && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Blocks all non-admin access to the system.</div>}
              </div>
              <button type="button" onClick={() => upd(key, !(settings as Record<string, string | boolean>)[key])} style={{ width: "46px", height: "26px", borderRadius: "13px", border: "none", cursor: "pointer", backgroundColor: (settings as Record<string, string | boolean>)[key] ? "var(--accent-primary)" : "#cbd5e1", transition: "background var(--transition-fast)", position: "relative" }}>
                <div style={{ position: "absolute", top: "3px", left: (settings as Record<string, string | boolean>)[key] ? "23px" : "3px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#ffffff", transition: "left var(--transition-fast)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </button>
            </div>
          ))}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem", marginTop: "1.5rem" }}>
            <CheckCircle2 size={18} /> Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
