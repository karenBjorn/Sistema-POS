export default function ChartCard({ title, description, children, empty }) {
  return (
    <section className="glass rounded-2xl p-6 border border-surface-border/60 animate-fade-in">
      <div className="mb-6">
        <h3 className="font-display font-semibold text-lg text-white">{title}</h3>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      {empty ? (
        <div className="h-56 flex flex-col items-center justify-center text-slate-500 text-sm">
          <span className="text-3xl mb-2 opacity-40">📊</span>
          Sin datos aún — realiza ventas en la tienda
        </div>
      ) : (
        children
      )}
    </section>
  );
}
