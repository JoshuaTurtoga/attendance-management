"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function InstructorOnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", middleName: "" });
  const [loading, setLoading] = useState(false);
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/dashboard/instructor"); }, 700);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "3rem 1.5rem" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "14px", background: "var(--accent-gradient)", boxShadow: "var(--accent-glow)", marginBottom: "1rem" }}>
            <CheckCircle2 size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Welcome, Instructor!</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
            Please complete your profile before proceeding.
          </p>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="io-fn">First Name</label>
              <input id="io-fn" type="text" required placeholder="e.g. David" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="io-mn">Middle Name</label>
              <input id="io-mn" type="text" placeholder="Optional" value={form.middleName} onChange={(e) => update("middleName", e.target.value)} className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="io-ln">Last Name</label>
              <input id="io-ln" type="text" required placeholder="e.g. Miller" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}>
              {loading ? <span>Saving...</span> : <><span>Save & Go to Dashboard</span><ArrowRight size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
