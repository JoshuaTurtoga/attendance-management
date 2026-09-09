"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Mail, KeyRound, Eye, EyeOff, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) { setError("Please enter a valid university email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/student/onboarding");
    }, 800);
  };

  const strengthScore = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthScore];
  const strengthColor = ["", "#dc2626", "#d97706", "#2563eb", "#059669"][strengthScore];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem 1.5rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
        <Link href="/login" className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={16} /><span>Back to Login</span>
        </Link>
      </div>

      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "14px", background: "var(--accent-gradient)", boxShadow: "var(--accent-glow)", marginBottom: "1rem" }}>
            <UserPlus size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Create Account</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
            Register using your official university email
          </p>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          {error && (
            <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-absent-bg)", border: "1px solid var(--status-absent-border)", color: "var(--status-absent)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label className="input-label" htmlFor="reg-email">University Email Address</label>
              <div style={{ position: "relative" }}>
                <input id="reg-email" type="email" required placeholder="e.g. firstname.lastname@ub.edu.ph" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem" }} />
                <Mail size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                Must be an official university email address.
              </span>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="reg-password">Create Password</label>
              <div style={{ position: "relative" }}>
                <input id="reg-password" type={showPassword ? "text" : "password"} required placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} />
                <KeyRound size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <div style={{ marginTop: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "0.3rem" }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", backgroundColor: i <= strengthScore ? strengthColor : "var(--border-subtle)", transition: "background-color 0.2s" }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: strengthColor, fontWeight: 600 }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="reg-confirm">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input id="reg-confirm" type={showPassword ? "text" : "password"} required placeholder="Re-enter your password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem" }} />
                <KeyRound size={18} color={confirm && confirm === password ? "var(--status-present)" : "var(--text-muted)"} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "rgba(0,51,160,0.06)", border: "1px solid rgba(0,51,160,0.15)", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
              <CheckCircle2 size={14} color="var(--accent-primary)" style={{ display: "inline", marginRight: "0.4rem" }} />
              By registering, you agree that your account is subject to verification by your institution. Instructor accounts cannot be self-registered.
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem" }}>
              {loading ? <span>Creating account...</span> : <><UserPlus size={18} /><span>Create Account</span></>}
            </button>

            <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
