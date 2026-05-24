function formatMoney(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatFecha(iso) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export default function HistorialVentas({ ventas, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Cargando historial...</p>
      </div>
    );
  }

  if (!ventas?.length) {
    return (
      <div className="glass rounded-2xl p-16 text-center animate-fade-in">
        <p className="text-5xl mb-4 opacity-30">📋</p>
        <h3 className="font-display text-xl text-white mb-2">Sin ventas aún</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Las transacciones confirmadas en la tienda aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {ventas.map((venta) => (
        <article
          key={venta.id}
          className="glass rounded-2xl p-6 shadow-card border border-surface-border/60 hover:border-accent/20 transition-colors"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Venta #{venta.id}
              </span>
              <p className="text-slate-500 text-sm mt-1">{formatFecha(venta.fecha)}</p>
            </div>
            <p className="text-2xl font-bold text-white font-display">
              {formatMoney(venta.total)}
            </p>
          </div>

          <ul className="divide-y divide-surface-border/50">
            {venta.items.map((item, idx) => (
              <li
                key={`${venta.id}-${item.productoId}-${idx}`}
                className="flex justify-between py-2.5 text-sm"
              >
                <span className="text-slate-300">
                  {item.nombre}{' '}
                  <span className="text-slate-500">× {item.cantidad}</span>
                </span>
                <span className="text-slate-400 font-medium">
                  {formatMoney(item.precio * item.cantidad)}
                </span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
