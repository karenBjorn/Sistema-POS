import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVentas } from '../api/client';
import StatCard from '../components/dashboard/StatCard';
import {
  IngresosPorDiaChart,
  TopProductosChart,
  VentasPorDiaChart,
} from '../components/dashboard/VentasCharts';
import VentasRecientesTable from '../components/dashboard/VentasRecientesTable';
import { formatMoney } from '../utils/format';
import { calcularEstadisticas } from '../utils/ventasStats';

export default function DashboardView() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getVentas();
      setVentas(data);
    } catch {
      setError('No se pudo cargar el historial. Verifica que el backend esté activo.');
      setVentas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const stats = useMemo(() => calcularEstadisticas(ventas), [ventas]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 animate-fade-in">
        <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Cargando métricas...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-slate-400">Resumen de ventas e indicadores clave</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={cargar}
            className="px-4 py-2 rounded-xl glass text-sm font-medium text-slate-300 hover:text-accent hover:border-accent/30 transition-all"
          >
            Actualizar
          </button>
          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-accent/15 text-accent text-sm font-medium border border-accent/30 hover:bg-accent/25 transition-all"
          >
            Ir a tienda
          </Link>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon="💰"
          label="Ingresos totales"
          value={formatMoney(stats.ingresosTotales)}
          sub={`${stats.totalVentas} transacciones`}
        />
        <StatCard
          icon="🧾"
          label="Ventas realizadas"
          value={stats.totalVentas}
          accent="indigo"
        />
        <StatCard
          icon="📈"
          label="Ticket promedio"
          value={formatMoney(stats.ticketPromedio)}
          sub="Por transacción"
          accent="success"
        />
        <StatCard
          icon="📦"
          label="Unidades vendidas"
          value={stats.unidadesVendidas}
          accent="warning"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <IngresosPorDiaChart data={stats.ventasPorDia} />
        <VentasPorDiaChart data={stats.ventasPorDia} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <TopProductosChart data={stats.topProductos} />
        </div>
        <div className="lg:col-span-2">
          <VentasRecientesTable ventas={stats.ventasRecientes} />
        </div>
      </div>
    </div>
  );
}
