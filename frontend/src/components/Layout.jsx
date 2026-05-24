import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout({ children }) {
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-50 border-b border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-indigo-500 flex items-center justify-center shadow-glow font-display font-bold text-surface text-lg">
              P
            </div>
            <div>
              <h1 className="font-display font-semibold text-lg tracking-tight text-white">
                POS Dashboard
              </h1>
              <p className="text-xs text-slate-400">Punto de venta</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'text-slate-400 hover:text-white hover:bg-surface-raised'
                }`
              }
            >
              Tienda
            </NavLink>
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'text-slate-400 hover:text-white hover:bg-surface-raised'
                }`
              }
            >
              Historial
            </NavLink>
            {itemCount > 0 && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/40">
                {itemCount} en carrito
              </span>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
