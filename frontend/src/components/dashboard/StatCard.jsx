export default function StatCard({ icon, label, value, sub, accent = 'accent' }) {
  const accentClasses = {
    accent: 'from-accent/20 to-cyan-500/5 border-accent/25 text-accent',
    success: 'from-success/20 to-emerald-500/5 border-success/25 text-success',
    indigo: 'from-indigo-500/20 to-violet-500/5 border-indigo-400/25 text-indigo-300',
    warning: 'from-warning/20 to-amber-500/5 border-warning/25 text-warning',
  };

  return (
    <article
      className={`glass rounded-2xl p-5 border bg-gradient-to-br ${accentClasses[accent]} animate-fade-in`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-white font-display">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
        </div>
        <span className="text-2xl opacity-80" aria-hidden>
          {icon}
        </span>
      </div>
    </article>
  );
}
