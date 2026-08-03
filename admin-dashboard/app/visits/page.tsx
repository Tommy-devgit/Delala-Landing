"use client";

const VISITS_DATA = [
  { id: "v1", property: "Bole Medhanialem Modern G+1 Villa", seeker: "Tewodros Kassahun", broker: "Abebe Tesfaye", date: "2026-08-05", time: "10:00 AM", status: "CONFIRMED" },
  { id: "v2", property: "Old Airport Diplomatic Family Compound", seeker: "Bethlehem Tadesse", broker: "Tigist Haile", date: "2026-08-06", time: "02:30 PM", status: "PENDING" },
  { id: "v3", property: "Kazanchis Executive Serviced Studio", seeker: "Samuel Worku", broker: "Selamawit Alemu", date: "2026-08-04", time: "11:00 AM", status: "COMPLETED" },
];

export default function AdminVisitsPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-[#ECE7DA] pb-6">
        <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
          WALKTHROUGH MONITOR
        </span>
        <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
          Walkthrough Visits Monitor
        </h1>
        <p className="text-xs text-[#736F4E] font-mono-label mt-1">
          Scheduled property walkthrough appointments between home seekers & certified brokers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs">
        <table>
          <thead>
            <tr>
              <th>Property Title</th>
              <th>Home Seeker</th>
              <th>Assigned Broker</th>
              <th>Scheduled Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {VISITS_DATA.map((visit) => (
              <tr key={visit.id}>
                <td className="font-bold text-[#1C1B12]">{visit.property}</td>
                <td className="font-mono-label text-xs text-[#1C1B12]">{visit.seeker}</td>
                <td className="font-mono-label text-xs text-[#736F4E]">{visit.broker}</td>
                <td className="font-mono-label text-xs font-bold text-[#4C061D]">
                  {visit.date} at {visit.time}
                </td>
                <td>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-label font-bold ${
                      visit.status === "CONFIRMED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : visit.status === "PENDING"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-slate-50 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {visit.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
