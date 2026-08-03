"use client";

const NEIGHBORHOODS_DATA = [
  { id: "n1", name: "Bole Medhanialem", subCity: "Bole", city: "Addis Ababa", securityScore: 4.9, generator: "92%", water: "98%" },
  { id: "n2", name: "Kazanchis", subCity: "Kirkos", city: "Addis Ababa", securityScore: 4.8, generator: "88%", water: "95%" },
  { id: "n3", name: "Old Airport", subCity: "Nifas Silk-Lafto", city: "Addis Ababa", securityScore: 4.95, generator: "96%", water: "99%" },
  { id: "n4", name: "CMC Sunshine", subCity: "Yeka", city: "Addis Ababa", securityScore: 4.7, generator: "78%", water: "90%" },
];

export default function AdminNeighborhoodsPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-[#ECE7DA] pb-6">
        <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
          INFRASTRUCTURE INDEX
        </span>
        <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
          Sub-City Neighborhood Infrastructure
        </h1>
        <p className="text-xs text-[#736F4E] font-mono-label mt-1">
          Neighborhood security ratings & backup generator/water reliability statistics
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs">
        <table>
          <thead>
            <tr>
              <th>Neighborhood Name</th>
              <th>Sub-City</th>
              <th>City</th>
              <th>Security Score</th>
              <th>Generator Penetration</th>
              <th>Water Reliability</th>
            </tr>
          </thead>
          <tbody>
            {NEIGHBORHOODS_DATA.map((n) => (
              <tr key={n.id}>
                <td className="font-bold text-[#1C1B12]">{n.name}</td>
                <td className="font-mono-label text-xs text-[#1C1B12]">{n.subCity}</td>
                <td className="font-mono-label text-xs text-[#736F4E]">{n.city}</td>
                <td className="font-mono-label font-bold text-amber-600">★ {n.securityScore} / 5.0</td>
                <td className="font-mono-label font-bold text-[#4C061D]">{n.generator}</td>
                <td className="font-mono-label font-bold text-[#4C061D]">{n.water}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
