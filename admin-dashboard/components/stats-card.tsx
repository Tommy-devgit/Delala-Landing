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
    <div className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] shadow-xs flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-mono text-[#94A3B8] font-bold uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] text-[#B4C292]">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold text-[#F8FAFC] tracking-tight mb-1">
          {value}
        </div>
        {subtitle && (
          <div className="text-xs text-[#94A3B8] flex items-center justify-between font-mono">
            <span>{subtitle}</span>
            {trend && <span className="text-emerald-400 font-bold">{trend}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
