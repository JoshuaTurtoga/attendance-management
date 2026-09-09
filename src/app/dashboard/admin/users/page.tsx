"use client";

import { useState } from "react";
import { Plus, Search, Trash2, Edit2 } from "lucide-react";

type Role = "Admin" | "Instructor" | "Student";

const allUsers: { id: string; name: string; email: string; role: Role; status: string }[] = [
  { id: "1", name: "Maria Santos", email: "admin@ub.edu.ph", role: "Admin", status: "Active" },
  { id: "2", name: "Prof. David Miller", email: "prof.miller@ub.edu.ph", role: "Instructor", status: "Active" },
  { id: "3", name: "Dr. Elena Vance", email: "dr.vance@ub.edu.ph", role: "Instructor", status: "Active" },
  { id: "4", name: "Alex Morgan", email: "a.morgan@students.ub.edu.ph", role: "Student", status: "Active" },
  { id: "5", name: "Liam Chen", email: "l.chen@students.ub.edu.ph", role: "Student", status: "Active" },
  { id: "6", name: "Sophia Rodriguez", email: "s.rodriguez@students.ub.edu.ph", role: "Student", status: "Inactive" },
];

const ROLE_COLORS: Record<Role, string> = { Admin: "#dc2626", Instructor: "#0033a0", Student: "#059669" };

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<"All" | Role>("All");
  const [search, setSearch] = useState("");

  const filtered = allUsers.filter((u) => {
    const matchRole = filter === "All" || u.role === filter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="container">
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>User Management</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>Manage all Admin, Instructor, and Student accounts.</p>
        </div>
        <button className="btn btn-primary btn-sm"><Plus size={15} /> Add Instructor Account</button>
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field" style={{ paddingLeft: "2.2rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} />
            <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.65rem", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <div style={{ display: "flex", gap: "0.3rem", backgroundColor: "#f1f5f9", padding: "0.3rem", borderRadius: "var(--radius-md)" }}>
            {(["All", "Admin", "Instructor", "Student"] as const).map((r) => (
              <button key={r} type="button" onClick={() => setFilter(r)} style={{ padding: "0.4rem 0.85rem", borderRadius: "var(--radius-sm)", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: filter === r ? "#ffffff" : "transparent", color: filter === r ? "var(--text-primary)" : "var(--text-secondary)", transition: "all var(--transition-fast)", boxShadow: filter === r ? "var(--glass-shadow)" : "none" }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: "var(--text-secondary)", fontFamily: "monospace", fontSize: "0.82rem" }}>{u.email}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: `${ROLE_COLORS[u.role]}15`, color: ROLE_COLORS[u.role], border: `1px solid ${ROLE_COLORS[u.role]}30` }}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.status === "Active" ? "badge-present" : "badge-absent"}`}>{u.status}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                      <button className="btn btn-secondary btn-sm" style={{ padding: "0.3rem 0.6rem" }} title="Edit"><Edit2 size={13} /></button>
                      <button className="btn btn-secondary btn-sm" style={{ padding: "0.3rem 0.6rem", color: "var(--status-absent)" }} title="Delete"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
