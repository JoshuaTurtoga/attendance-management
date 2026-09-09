const requests = [
  { id: 1, course: "CS308 – Web Systems & Technologies", instructor: "Prof. David Miller", submittedAt: "Sep 5, 2026", status: "approved", reason: "" },
  { id: 2, course: "CS401 – Advanced Programming", instructor: "Prof. James Torres", submittedAt: "Sep 6, 2026", status: "pending", reason: "" },
  { id: 3, course: "MATH301 – Calculus II", instructor: "Dr. Marie Curie", submittedAt: "Sep 4, 2026", status: "declined", reason: "Section is full. Please contact the registrar." },
];

export default function JoinRequestsPage() {
  return (
    <div className="container">
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>Join Requests</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>Track the status of your class join applications.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {requests.map((r) => (
          <div key={r.id} className="card" style={{ borderLeft: `4px solid ${r.status === "approved" ? "var(--status-present)" : r.status === "declined" ? "var(--status-absent)" : "var(--status-late)"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
              <div>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>{r.course}</h2>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{r.instructor} · Submitted {r.submittedAt}</p>
                {r.reason && (
                  <div style={{ marginTop: "0.75rem", padding: "0.6rem 0.85rem", backgroundColor: "var(--status-absent-bg)", border: "1px solid var(--status-absent-border)", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "var(--status-absent)" }}>
                    <strong>Declined:</strong> {r.reason}
                  </div>
                )}
              </div>
              <span className={`badge ${r.status === "approved" ? "badge-present" : r.status === "declined" ? "badge-absent" : "badge-late"}`} style={{ textTransform: "capitalize", flexShrink: 0 }}>
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
