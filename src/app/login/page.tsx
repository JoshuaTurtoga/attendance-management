"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogIn,
  CheckCircle2,
  KeyRound,
  Mail,
  ArrowLeft,
  Shield,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

type LoginStep = "login" | "forgot-email" | "forgot-otp" | "forgot-reset" | "done";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.startsWith("admin")) router.push("/dashboard/admin");
      else if (email.startsWith("instr") || email.startsWith("prof") || email.startsWith("dr")) router.push("/dashboard/instructor");
      else router.push("/dashboard/student");
    }, 700);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your registered email."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("forgot-otp"); }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length < 6) { setError("Please enter the 6-digit OTP."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("forgot-reset"); }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem 1.5rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
        {step === "login" ? (
          <Link href="/" className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <ArrowLeft size={16} /><span>Back to Home</span>
          </Link>
        ) : step !== "done" ? (
          <button type="button" onClick={() => { setStep("login"); setError(""); }} className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <ArrowLeft size={16} /><span>Back to Login</span>
          </button>
        ) : null}
      </div>

      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "14px", background: "var(--accent-gradient)", boxShadow: "var(--accent-glow)", marginBottom: "1rem" }}>
            {step === "done" ? <CheckCircle2 size={30} color="#ffffff" /> : <Shield size={30} color="#ffffff" />}
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            {step === "login" && "Welcome Back"}
            {step === "forgot-email" && "Forgot Password"}
            {step === "forgot-otp" && "Enter OTP"}
            {step === "forgot-reset" && "Set New Password"}
            {step === "done" && "Password Reset!"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
            {step === "login" && "Sign in to your account"}
            {step === "forgot-email" && "Enter your registered email to receive an OTP"}
            {step === "forgot-otp" && `We sent a 6-digit code to ${email}`}
            {step === "forgot-reset" && "Create your new secure password"}
            {step === "done" && "Your password has been updated successfully"}
          </p>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          {error && (
            <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-absent-bg)", border: "1px solid var(--status-absent-border)", color: "var(--status-absent)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}

          {step === "login" && (
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label className="input-label" htmlFor="login-email">Email Address</label>
                <div style={{ position: "relative" }}>
                  <input id="login-email" type="email" required placeholder="e.g. student@ub.edu.ph" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem" }} />
                  <Mail size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>
              <div className="input-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="input-label" htmlFor="login-password">Password</label>
                  <button type="button" onClick={() => { setStep("forgot-email"); setError(""); }} style={{ fontSize: "0.8rem", color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <input id="login-password" type={showPassword ? "text" : "password"} required placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} />
                  <KeyRound size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem", marginTop: "0.5rem" }}>
                {loading ? <span>Signing in...</span> : <><LogIn size={18} /><span>Sign In</span></>}
              </button>
              <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                New student?{" "}
                <Link href="/register" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Create an account</Link>
              </div>
            </form>
          )}

          {step === "forgot-email" && (
            <form onSubmit={handleSendOtp}>
              <div className="input-group">
                <label className="input-label" htmlFor="forgot-em">Registered Email</label>
                <div style={{ position: "relative" }}>
                  <input id="forgot-em" type="email" required placeholder="e.g. student@ub.edu.ph" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem" }} />
                  <Mail size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem" }}>
                {loading ? <span>Sending OTP...</span> : <><Shield size={18} /><span>Send OTP to Email</span></>}
              </button>
            </form>
          )}

          {step === "forgot-otp" && (
            <form onSubmit={handleVerifyOtp}>
              <div className="input-group">
                <label className="input-label" htmlFor="otp-input">One-Time Password (OTP)</label>
                <input id="otp-input" type="text" required inputMode="numeric" maxLength={6} placeholder="_ _ _ _ _ _" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="input-field" style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "0.5rem", fontWeight: 700 }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.25rem" }}>
                  <button type="button" style={{ fontSize: "0.78rem", color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <RefreshCw size={12} /> Resend OTP
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading || otp.length < 6} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem" }}>
                {loading ? <span>Verifying...</span> : <><Shield size={18} /><span>Verify OTP</span></>}
              </button>
            </form>
          )}

          {step === "forgot-reset" && (
            <form onSubmit={handleResetPassword}>
              <div className="input-group">
                <label className="input-label" htmlFor="new-pw">New Password</label>
                <div style={{ position: "relative" }}>
                  <input id="new-pw" type={showPassword ? "text" : "password"} required placeholder="At least 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} />
                  <KeyRound size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="confirm-pw">Confirm New Password</label>
                <div style={{ position: "relative" }}>
                  <input id="confirm-pw" type={showPassword ? "text" : "password"} required placeholder="Re-enter your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem" }} />
                  <KeyRound size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem" }}>
                {loading ? <span>Updating...</span> : <><CheckCircle2 size={18} /><span>Set New Password</span></>}
              </button>
            </form>
          )}

          {step === "done" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--status-present-bg)", border: "2px solid var(--status-present-border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <CheckCircle2 size={32} color="var(--status-present)" />
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                You can now sign in with your new password.
              </p>
              <button type="button" onClick={() => { setStep("login"); setPassword(""); setOtp(""); setNewPassword(""); setConfirmPassword(""); }} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem" }}>
                <LogIn size={18} /><span>Go to Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
