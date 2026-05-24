import { useCart } from '../context/CartContext';

function formatMoney(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export default function TarjetaProducto({ producto }) {
  const { addItem } = useCart();
  const sinStock = producto.stock <= 0;

  return (
    <article
      className={`group relative glass rounded-2xl p-5 shadow-card transition-all duration-300 animate-fade-in hover:border-accent/40 hover:shadow-glow ${
        sinStock ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl" role="img" aria-hidden>
          {producto.imagen}
        </span>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-raised text-slate-400 border border-surface-border">
          {producto.categoria}
        </span>
      </div>

      <h3 className="font-display font-semibold text-white text-lg mb-1 group-hover:text-accent transition-colors">
        {producto.nombre}
      </h3>

      <p className="text-2xl font-bold text-accent mb-3">{formatMoney(producto.precio)}</p>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium ${
            producto.stock < 10 ? 'text-warning' : 'text-slate-500'
          }`}
        >
          Stock: {producto.stock}
        </span>
        <button
          type="button"
          disabled={sinStock}
          onClick={() => addItem(producto)}
          className="px-4 py-2 rounded-xl bg-accent text-surface font-semibold text-sm hover:bg-cyan-300 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
