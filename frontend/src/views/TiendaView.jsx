import { useEffect, useState } from 'react';
import TarjetaProducto from '../components/TarjetaProducto';
import CarritoVentas from '../components/CarritoVentas';
import { getProductos } from '../api/client';

export default function TiendaView() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('Todos');

  const cargarProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getProductos();
      setProductos(data);
    } catch {
      setError('No se pudo conectar con el servidor. ¿Está el backend en el puerto 5000?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const categorias = ['Todos', ...new Set(productos.map((p) => p.categoria))];
  const filtrados =
    filtro === 'Todos' ? productos : productos.filter((p) => p.categoria === filtro);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-white mb-2">Tienda</h2>
        <p className="text-slate-400">Selecciona productos y confirma la venta</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <section>
          <div className="flex flex-wrap gap-2 mb-6">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFiltro(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filtro === cat
                    ? 'bg-accent text-surface shadow-lg shadow-accent/25'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-surface-card/50 animate-pulse border border-surface-border/30"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="glass rounded-2xl p-8 text-center border border-red-400/20">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                type="button"
                onClick={cargarProductos}
                className="px-4 py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtrados.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </section>

        <CarritoVentas onVentaConfirmada={cargarProductos} />
      </div>
    </div>
  );
}
