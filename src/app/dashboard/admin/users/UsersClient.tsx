"use client";

import { useState, useTransition } from "react";
import {
  Plus, Search, Trash2, UserCheck, X, Mail, KeyRound,
  User, Loader2, ShieldCheck, GraduationCap, Users,
} from "lucide-react";
import {
  createInstructor,
  createStudent,
  deleteUser,
  updateUserRole,
} from "@/app/admin/actions";

type AppRole = "admin" | "instructor" | "student";
type UserRow = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  createdAt: string;
  emailConfirmed: boolean;
};

const ROLE_CONFIG: Record<AppRole, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  admin: { label: "Admin", color: "#dc2626", bg: "#dc262615", icon: <ShieldCheck size={12} /> },
  instructor: { label: "Instructor", color: "#0033a0", bg: "#0033a015", icon: <Users size={12} /> },
  student: { label: "Student", color: "#059669", bg: "#05966915", icon: <GraduationCap size={12} /> },
};

type ModalMode = "instructor" | "student";

export default function UsersClient({ initialUsers, currentUserId }: { initialUsers: UserRow[]; currentUserId: string }) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [filter, setFilter] = useState<"all" | AppRole>("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalMode | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const resetForm = () => {
    setFirstName(""); setLastName(""); setEmail(""); setPassword(""); setShowPw(false);
  };

  const closeModal = () => { setModal(null); resetForm(); };

  const filtered = users.filter((u) => {
    const matchRole = filter === "all" || u.role === filter;
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("password", password);

    startTransition(async () => {
      const action = modal === "instructor" ? createInstructor : createStudent;
      const result = await action(formData);
      if (result.success) {
        showToast(result.message, true);
        closeModal();
        // Refresh users list from server
        const { getUsers } = await import("@/app/admin/actions");
        const fresh = await getUsers();
        setUsers(fresh);
      } else {
        showToast(result.message, false);
      }
    });
  };

  const handleDelete = (userId: string, userName: string) => {
    if (!confirm(`Delete "${userName}"? This action cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteUser(userId);
      if (result.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        showToast("User deleted.", true);
      } else {
        showToast(result.message, false);
      }
    });
  };

  const handleRoleChange = (userId: string, newRole: AppRole) => {
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role: newRole } : u));
        showToast("Role updated.", true);
      } else {
        showToast(result.message, false);
      }
    });
  };

  return (
    <div className="container">
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 1000,
          padding: "0.85rem 1.25rem", borderRadius: "var(--radius-md)",
          backgroundColor: toast.ok ? "var(--status-present-bg)" : "var(--status-absent-bg)",
          border: `1px solid ${toast.ok ? "var(--status-present-border)" : "var(--status-absent-border)"}`,
          color: toast.ok ? "var(--status-present)" : "var(--status-absent)",
          fontWeight: 600, fontSize: "0.875rem", boxShadow: "var(--glass-shadow)",
          animation: "fadeIn 0.2s ease",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>User Management</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            {users.length} account{users.length !== 1 ? "s" : ""} in total
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setModal("student")}>
            <GraduationCap size={15} /> Add Student
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setModal("instructor")}>
            <Plus size={15} /> Add Instructor
          </button>
        </div>
      </div>

      <div className="card">
        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.2rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
            />
            <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.65rem", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <div style={{ display: "flex", gap: "0.3rem", backgroundColor: "#f1f5f9", padding: "0.3rem", borderRadius: "var(--radius-md)" }}>
            {(["all", "admin", "instructor", "student"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFilter(r)}
                style={{
                  padding: "0.4rem 0.85rem", borderRadius: "var(--radius-sm)", border: "none",
                  fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                  backgroundColor: filter === r ? "#ffffff" : "transparent",
                  color: filter === r ? "var(--text-primary)" : "var(--text-secondary)",
                  transition: "all var(--transition-fast)",
                  boxShadow: filter === r ? "var(--glass-shadow)" : "none",
                  textTransform: "capitalize",
                }}
              >
                {r === "all" ? "All" : ROLE_CONFIG[r].label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2.5rem", fontStyle: "italic" }}>
                    No users found.
                  </td>
                </tr>
              ) : filtered.map((u) => {
                const cfg = ROLE_CONFIG[u.role];
                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td style={{ color: "var(--text-secondary)", fontFamily: "monospace", fontSize: "0.82rem" }}>{u.email}</td>
                    <td>
                      <div title={u.id === currentUserId ? "You cannot change your own role" : undefined} style={{ display: "inline-block" }}>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as AppRole)}
                        disabled={isPending || u.id === currentUserId}
                        style={{
                          padding: "0.25rem 0.5rem", borderRadius: "999px", fontSize: "0.78rem",
                          fontWeight: 700, border: `1px solid ${cfg.color}30`,
                          backgroundColor: cfg.bg, color: cfg.color,
                          cursor: u.id === currentUserId ? "not-allowed" : "pointer",
                          outline: "none",
                          opacity: u.id === currentUserId ? 0.55 : 1,
                        }}
                      >
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="student">Student</option>
                      </select>
                    </div>
                    </td>
                    <td>
                      <span className={`badge ${u.emailConfirmed ? "badge-present" : "badge-late"}`}>
                        {u.emailConfirmed ? "Confirmed" : "Pending"}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "0.3rem 0.6rem", color: "var(--status-absent)" }}
                        title="Delete user"
                        disabled={isPending}
                        onClick={() => handleDelete(u.id, u.name)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="card" style={{ width: "100%", maxWidth: "460px", padding: "2rem", position: "relative" }}>
            <button
              onClick={closeModal}
              style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
            >
              <X size={20} />
            </button>

            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "10px",
                background: "var(--accent-gradient)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {modal === "instructor" ? <UserCheck size={22} color="#fff" /> : <GraduationCap size={22} color="#fff" />}
              </div>
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                  {modal === "instructor" ? "Add Instructor Account" : "Add Student Account"}
                </h2>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  {modal === "instructor"
                    ? "Creates a confirmed instructor account immediately."
                    : "Creates a confirmed student account immediately."}
                </p>
              </div>
            </div>

            <form onSubmit={handleCreate}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label" htmlFor="modal-fname">First Name</label>
                  <div style={{ position: "relative" }}>
                    <input id="modal-fname" required placeholder="e.g. Maria" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" style={{ paddingLeft: "2.3rem" }} />
                    <User size={15} color="var(--text-muted)" style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                </div>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label" htmlFor="modal-lname">Last Name</label>
                  <div style={{ position: "relative" }}>
                    <input id="modal-lname" required placeholder="e.g. Santos" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" style={{ paddingLeft: "2.3rem" }} />
                    <User size={15} color="var(--text-muted)" style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="modal-email">Email Address</label>
                <div style={{ position: "relative" }}>
                  <input id="modal-email" type="email" required placeholder={modal === "instructor" ? "prof@ub.edu.ph" : "student@ub.edu.ph"} value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: "2.3rem" }} />
                  <Mail size={15} color="var(--text-muted)" style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="modal-password">
                  Initial Password <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(share this with the user)</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="modal-password"
                    type={showPw ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: "2.3rem", paddingRight: "5rem" }}
                  />
                  <KeyRound size={15} color="var(--text-muted)" style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)" }} />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{ position: "absolute", right: "0.7rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700 }}
                  >
                    {showPw ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={closeModal} className="btn btn-secondary" style={{ flex: 1, padding: "0.75rem" }}>
                  Cancel
                </button>
                <button type="submit" disabled={isPending} className="btn btn-primary" style={{ flex: 1, padding: "0.75rem" }}>
                  {isPending
                    ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Creating...</>
                    : <><Plus size={16} /> Create Account</>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
