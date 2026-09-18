"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { login } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/client";

type LoginStep = "login" | "forgot-email" | "forgot-otp" | "forgot-reset" | "done";

function LoginPageInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<LoginStep>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlError = searchParams.get("error");
    const urlMessage = searchParams.get("message");
    if (urlError) setError(urlError);
    if (urlMessage) setMessage(urlMessage);
  }, [searchParams]);

  // ── Password Recovery via Supabase OTP ─────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your registered email."); return; }
    setLoading(true);
    const supabase = createClient();
    const { error: otpError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setLoading(false);
    if (otpError) { setError(otpError.message); return; }
    setStep("done");
    setMessage("A password reset link has been sent to your email.");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length < 6) { setError("Please enter the 6-digit OTP."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("forgot-reset"); }, 600);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (resetError) { setError(resetError.message); return; }
    setStep("done");
    setMessage("Your password has been updated. You can now sign in.");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem 1.5rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
        {step === "login" ? (
          <Link href="/" className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <ArrowLeft size={16} /><span>Back to Home</span>
          </Link>
        ) : step !== "done" ? (
          <button type="button" onClick={() => { setStep("login"); setError(""); setMessage(""); }} className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
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
            {step === "done" && "Check Your Email"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
            {step === "login" && "Sign in to your account"}
            {step === "forgot-email" && "Enter your registered email to receive a reset link"}
            {step === "forgot-otp" && `We sent a 6-digit code to ${email}`}
            {step === "forgot-reset" && "Create your new secure password"}
            {step === "done" && message}
          </p>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          {error && (
            <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-absent-bg)", border: "1px solid var(--status-absent-border)", color: "var(--status-absent)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}
          {message && !error && (
            <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--status-present-bg)", border: "1px solid var(--status-present-border)", color: "var(--status-present)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              {message}
            </div>
          )}

          {step === "login" && (
            <form action={async (formData) => {
              setError("");
              setMessage("");
              setLoading(true);
              await login(formData);
              // If login() didn't redirect (error), loading stays true until the page redirects
              // so we don't need to setLoading(false) — the page will navigate away
            }}>
              <div className="input-group">
                <label className="input-label" htmlFor="login-email">Email Address</label>
                <div style={{ position: "relative" }}>
                  <input id="login-email" name="email" type="email" required placeholder="e.g. student@ub.edu.ph" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem" }} />
                  <Mail size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>
              <div className="input-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="input-label" htmlFor="login-password">Password</label>
                  <button type="button" onClick={() => { setStep("forgot-email"); setError(""); setMessage(""); }} style={{ fontSize: "0.8rem", color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <input id="login-password" name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} />
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
                {loading ? <span>Sending...</span> : <><Shield size={18} /><span>Send Reset Link</span></>}
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
                {message || "Check your inbox for next steps."}
              </p>
              <button type="button" onClick={() => { setStep("login"); setPassword(""); setOtp(""); setNewPassword(""); setConfirmPassword(""); setMessage(""); }} className="btn btn-primary" style={{ width: "100%", padding: "0.8rem" }}>
                <LogIn size={18} /><span>Go to Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <LoginPageInner />
    </Suspense>
  );
}
