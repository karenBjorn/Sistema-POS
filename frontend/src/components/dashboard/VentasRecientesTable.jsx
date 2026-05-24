import { formatFecha, formatMoney } from '../../utils/format';

export default function VentasRecientesTable({ ventas }) {
  if (!ventas?.length) {
    return (
      <section className="glass rounded-2xl p-6 border border-surface-border/60">
        <h3 className="font-display font-semibold text-lg text-white mb-4">Últimas ventas</h3>
        <p className="text-slate-500 text-sm text-center py-8">Aún no hay transacciones</p>
      </section>
    );
  }

  return (
    <section className="glass rounded-2xl p-6 border border-surface-border/60 animate-fade-in">
      <h3 className="font-display font-semibold text-lg text-white mb-4">Últimas ventas</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-surface-border/60">
              <th className="pb-3 font-medium">#</th>
              <th className="pb-3 font-medium">Fecha</th>
              <th className="pb-3 font-medium">Ítems</th>
              <th className="pb-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/40">
            {ventas.map((v) => (
              <tr key={v.id} className="hover:bg-surface-raised/40 transition-colors">
                <td className="py-3 text-accent font-medium">#{v.id}</td>
                <td className="py-3 text-slate-400">{formatFecha(v.fecha)}</td>
                <td className="py-3 text-slate-300">
                  {v.items.reduce((s, i) => s + i.cantidad, 0)} uds.
                </td>
                <td className="py-3 text-right font-semibold text-white">
                  {formatMoney(v.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
