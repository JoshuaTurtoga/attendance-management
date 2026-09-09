"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle2, ArrowRight } from "lucide-react";

export default function StudentOnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", course: "", department: "", year: "", studentId: "", mobile: "", altEmail: "" });
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/dashboard/student"); }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "3rem 1.5rem", position: "relative" }}>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "14px", background: "var(--accent-gradient)", boxShadow: "var(--accent-glow)", marginBottom: "1rem" }}>
            <CheckCircle2 size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Complete Your Profile</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
            This information is required before you can access the system.
          </p>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          <form onSubmit={handleSubmit}>
            <div className="grid-cols-2" style={{ gap: "1rem" }}>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-fn">First Name</label>
                <input id="ob-fn" type="text" required placeholder="e.g. Alex" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-ln">Last Name</label>
                <input id="ob-ln" type="text" required placeholder="e.g. Morgan" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="input-field" />
              </div>
            </div>

            <div className="grid-cols-2" style={{ gap: "1rem" }}>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-course">Course / Program</label>
                <input id="ob-course" type="text" required placeholder="e.g. BS Computer Science" value={form.course} onChange={(e) => update("course", e.target.value)} className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-dept">Department</label>
                <input id="ob-dept" type="text" required placeholder="e.g. College of Computing" value={form.department} onChange={(e) => update("department", e.target.value)} className="input-field" />
              </div>
            </div>

            <div className="grid-cols-2" style={{ gap: "1rem" }}>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-year">Year Level</label>
                <select id="ob-year" required value={form.year} onChange={(e) => update("year", e.target.value)} className="input-field">
                  <option value="">Select year</option>
                  {["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"].map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-sid">Student ID Number</label>
                <input id="ob-sid" type="text" required placeholder="e.g. 2026-0891" value={form.studentId} onChange={(e) => update("studentId", e.target.value)} className="input-field" />
              </div>
            </div>

            <div className="grid-cols-2" style={{ gap: "1rem" }}>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-mobile">Mobile Number</label>
                <input id="ob-mobile" type="tel" required placeholder="e.g. 09XX XXX XXXX" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="ob-alt">Alternative Email</label>
                <input id="ob-alt" type="email" placeholder="e.g. personal@gmail.com" value={form.altEmail} onChange={(e) => update("altEmail", e.target.value)} className="input-field" />
              </div>
            </div>

            {/* ID Upload */}
            <div className="input-group">
              <label className="input-label">Upload School ID Photo</label>
              <div style={{ border: "2px dashed var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "2rem", textAlign: "center", backgroundColor: "#f8fafc", cursor: "pointer" }}>
                <Upload size={28} color="var(--text-muted)" style={{ margin: "0 auto 0.5rem" }} />
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>Click to upload or drag and drop</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>PNG, JPG up to 5MB</div>
                <input type="file" accept="image/*" style={{ display: "none" }} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}>
              {loading ? <span>Saving...</span> : <><span>Save Profile & Continue</span><ArrowRight size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
