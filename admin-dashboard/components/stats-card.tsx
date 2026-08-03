export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  trend?: string;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#ECE7DA] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-mono-label text-[#736F4E] font-bold uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D]">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mb-1">
          {value}
        </div>
        {subtitle && (
          <div className="text-xs text-[#736F4E] flex items-center justify-between font-mono-label">
            <span>{subtitle}</span>
            {trend && <span className="text-[#4C061D] font-bold">{trend}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
