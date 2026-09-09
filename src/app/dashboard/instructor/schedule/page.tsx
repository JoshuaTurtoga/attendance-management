const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const schedule = [
  { code: "CS308", title: "Web Systems & Technologies", room: "Lab 1A", section: "CS-401", days: ["Tuesday", "Thursday"], startHour: 14, duration: 1.5, color: "#0033a0" },
  { code: "CS301", title: "Database Systems", room: "Room 204", section: "CS-402", days: ["Monday", "Wednesday", "Friday"], startHour: 9, duration: 1.5, color: "#059669" },
  { code: "STAS101", title: "Science, Technology & Society", room: "Room 105", section: "GE-A", days: ["Tuesday", "Thursday"], startHour: 10, duration: 1.5, color: "#dc2626" },
];

function toPercent(hour: number) { return ((hour - 7) / 11) * 100; }

export default function InstructorSchedulePage() {
  return (
    <div className="container">
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.35rem" }}>My Schedule</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>Auto-generated weekly timetable of all your handled classes.</p>

      <div className="card" style={{ overflowX: "auto", padding: "0" }}>
        <div style={{ minWidth: "700px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", borderBottom: "1px solid var(--border-subtle)", backgroundColor: "#f8fafc" }}>
            <div style={{ padding: "0.75rem" }} />
            {DAYS.map((d) => (
              <div key={d} style={{ padding: "0.75rem 0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", textAlign: "center" }}>{d.slice(0, 3)}</div>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            {Array.from({ length: 11 }, (_, i) => i + 7).map((h) => (
              <div key={h} style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", borderBottom: "1px solid var(--border-subtle)", minHeight: "56px" }}>
                <div style={{ padding: "0.4rem 0.75rem", fontSize: "0.72rem", color: "var(--text-muted)", borderRight: "1px solid var(--border-subtle)", whiteSpace: "nowrap" }}>{String(h).padStart(2, "0")}:00</div>
                {DAYS.map((d) => <div key={d} style={{ borderRight: "1px solid var(--border-subtle)" }} />)}
              </div>
            ))}
            {schedule.flatMap((cls) =>
              cls.days.map((day) => {
                const col = DAYS.indexOf(day);
                const top = toPercent(cls.startHour);
                const height = (cls.duration / 11) * 100;
                return (
                  <div key={`${cls.code}-${day}`} style={{
                    position: "absolute", top: `${top}%`, height: `${height}%`,
                    left: `calc(80px + (100% - 80px) * ${col / 6})`,
                    width: `calc((100% - 80px) / 6 - 4px)`,
                    backgroundColor: cls.color, borderRadius: "6px", padding: "0.35rem 0.5rem",
                    color: "#ffffff", fontSize: "0.72rem", overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)", margin: "0 2px",
                  }}>
                    <div style={{ fontWeight: 700, fontSize: "0.78rem" }}>{cls.code}</div>
                    <div style={{ opacity: 0.85, lineHeight: 1.2 }}>{cls.section}</div>
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
