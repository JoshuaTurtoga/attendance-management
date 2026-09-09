const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const HOURS = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// Each class: startHour (24h), duration in hours, days
const schedule = [
  { code: "CS301", title: "Database Systems", room: "Room 204", days: ["Monday", "Wednesday", "Friday"], startHour: 9, duration: 1.5, color: "#0033a0" },
  { code: "CS305", title: "Software Engineering", room: "Lab 3B", days: ["Monday", "Wednesday", "Friday"], startHour: 11, duration: 1.5, color: "#059669" },
  { code: "MATH204", title: "Discrete Math", room: "Room 102", days: ["Monday", "Wednesday", "Friday"], startHour: 10, duration: 1.5, color: "#d97706" },
  { code: "CS308", title: "Web Systems", room: "Lab 1A", days: ["Tuesday", "Thursday"], startHour: 14, duration: 1.5, color: "#dc2626" },
  { code: "CS302", title: "Algorithms", room: "Room 301", days: ["Tuesday", "Thursday"], startHour: 13, duration: 1.5, color: "#7c3aed" },
];

function toPercent(hour: number) {
  const start = 7; const end = 18;
  return ((hour - start) / (end - start)) * 100;
}

export default function StudentSchedulePage() {
  return (
    <div className="container">
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>Class Schedule</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>Your automatically generated weekly timetable.</p>

      <div className="card" style={{ overflowX: "auto", padding: "0" }}>
        <div style={{ minWidth: "700px" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", borderBottom: "1px solid var(--border-subtle)", backgroundColor: "#f8fafc" }}>
            <div style={{ padding: "0.75rem", fontSize: "0.78rem", color: "var(--text-muted)" }} />
            {DAYS.map((d) => (
              <div key={d} style={{ padding: "0.75rem 0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", textAlign: "center" }}>{d.slice(0, 3)}</div>
            ))}
          </div>

          {/* Time grid */}
          <div style={{ position: "relative" }}>
            {/* Hour rows */}
            {HOURS.map((h) => (
              <div key={h} style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", borderBottom: "1px solid var(--border-subtle)", minHeight: "56px" }}>
                <div style={{ padding: "0.4rem 0.75rem", fontSize: "0.72rem", color: "var(--text-muted)", borderRight: "1px solid var(--border-subtle)", whiteSpace: "nowrap" }}>{h}</div>
                {DAYS.map((d) => <div key={d} style={{ borderRight: "1px solid var(--border-subtle)" }} />)}
              </div>
            ))}

            {/* Class blocks */}
            {schedule.flatMap((cls) =>
              cls.days.map((day) => {
                const col = DAYS.indexOf(day) + 2;
                const top = toPercent(cls.startHour);
                const height = (cls.duration / 11) * 100;
                return (
                  <div key={`${cls.code}-${day}`} style={{
                    position: "absolute",
                    top: `${top}%`,
                    height: `${height}%`,
                    left: `calc(80px + (100% - 80px) * ${(col - 2) / 6})`,
                    width: `calc((100% - 80px) / 6 - 4px)`,
                    backgroundColor: cls.color,
                    borderRadius: "6px",
                    padding: "0.35rem 0.5rem",
                    color: "#ffffff",
                    fontSize: "0.72rem",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    margin: "0 2px",
                  }}>
                    <div style={{ fontWeight: 700, fontSize: "0.78rem" }}>{cls.code}</div>
                    <div style={{ opacity: 0.85, lineHeight: 1.2 }}>{cls.title}</div>
                    <div style={{ opacity: 0.7, fontSize: "0.65rem", marginTop: "0.15rem" }}>{cls.room}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
