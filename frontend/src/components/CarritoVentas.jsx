import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { crearVenta } from '../api/client';

function formatMoney(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export default function CarritoVentas({ onVentaConfirmada }) {
  const { items, total, updateQty, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleConfirmar = async () => {
    if (items.length === 0) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      items: items.map(({ producto, cantidad }) => ({
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
      })),
      total,
    };

    try {
      await crearVenta(payload);
      clearCart();
      setSuccess(true);
      onVentaConfirmada?.();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const msg =
        err.response?.data?.error || 'No se pudo registrar la venta. Intenta de nuevo.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="glass rounded-2xl p-6 shadow-card sticky top-24 animate-slide-up border border-surface-border/80">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-xl text-white">Carrito</h2>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            Vaciar
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-4xl mb-3 opacity-40">🛒</p>
          <p className="text-slate-500 text-sm">El carrito está vacío</p>
          <p className="text-slate-600 text-xs mt-1">Agrega productos desde la tienda</p>
        </div>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-6">
          {items.map(({ producto, cantidad }) => (
            <li
              key={producto.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-raised/80 border border-surface-border/50"
            >
              <span className="text-2xl">{producto.imagen}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{producto.nombre}</p>
                <p className="text-xs text-slate-500">{formatMoney(producto.precio)} c/u</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => updateQty(producto.id, cantidad - 1)}
                  className="w-7 h-7 rounded-lg bg-surface border border-surface-border text-slate-300 hover:bg-surface-card text-sm"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{cantidad}</span>
                <button
                  type="button"
                  onClick={() => updateQty(producto.id, cantidad + 1)}
                  disabled={cantidad >= producto.stock}
                  className="w-7 h-7 rounded-lg bg-surface border border-surface-border text-slate-300 hover:bg-surface-card text-sm disabled:opacity-40"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(producto.id)}
                className="text-slate-600 hover:text-red-400 text-xs ml-1"
                aria-label="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-surface-border pt-4 space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-slate-400">Total</span>
          <span className="text-2xl font-bold text-white font-display">{formatMoney(total)}</span>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-success bg-success/10 border border-success/20 rounded-lg px-3 py-2">
            ¡Venta registrada correctamente!
          </p>
        )}

        <button
          type="button"
          disabled={items.length === 0 || loading}
          onClick={handleConfirmar}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-cyan-400 text-surface font-bold text-sm tracking-wide hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-glow"
        >
          {loading ? 'Procesando...' : 'Confirmar Venta'}
        </button>
      </div>
    </aside>
  );
}
