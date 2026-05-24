import { useEffect, useState } from 'react';
import HistorialVentas from '../components/HistorialVentas';
import { getVentas } from '../api/client';

export default function HistorialView() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarVentas = async () => {
    setLoading(true);
    try {
      const { data } = await getVentas();
      setVentas(data);
    } catch {
      setVentas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-white mb-2">Historial</h2>
          <p className="text-slate-400">Ventas registradas en el sistema</p>
        </div>
        <button
          type="button"
          onClick={cargarVentas}
          className="px-4 py-2 rounded-xl glass text-sm font-medium text-slate-300 hover:text-accent hover:border-accent/30 transition-all"
        >
          Actualizar
        </button>
      </div>

      <HistorialVentas ventas={ventas} loading={loading} />
    </div>
  );
}
