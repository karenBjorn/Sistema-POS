import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from './ChartCard';
import { formatMoney } from '../../utils/format';

const tooltipStyle = {
  backgroundColor: '#1e2a3a',
  border: '1px solid #2d3f54',
  borderRadius: '12px',
  color: '#f1f5f9',
  fontSize: '13px',
};

function IngresosTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle} className="px-3 py-2 shadow-card">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-accent font-semibold">{formatMoney(payload[0].value)}</p>
      {payload[1] && (
        <p className="text-slate-300 text-xs mt-1">{payload[1].value} venta(s)</p>
      )}
    </div>
  );
}

function VentasCountTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle} className="px-3 py-2 shadow-card">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-indigo-300 font-semibold">{payload[0].value} venta(s)</p>
    </div>
  );
}

function ProductosTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div style={tooltipStyle} className="px-3 py-2 shadow-card">
      <p className="text-white font-medium text-sm mb-1">{item.nombre}</p>
      <p className="text-slate-400 text-xs">{item.cantidad} unidades</p>
      <p className="text-accent text-xs mt-1">{formatMoney(item.ingresos)}</p>
    </div>
  );
}

export function IngresosPorDiaChart({ data }) {
  const empty = !data?.length;

  return (
    <ChartCard
      title="Ingresos por día"
      description="Últimos días con actividad registrada"
      empty={empty}
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ingresosGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3f54" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<IngresosTooltip />} />
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#ingresosGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function VentasPorDiaChart({ data }) {
  const empty = !data?.length;

  return (
    <ChartCard title="Cantidad de ventas" description="Transacciones por día" empty={empty}>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3f54" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<VentasCountTooltip />} />
            <Bar dataKey="ventas" fill="#6366f1" radius={[8, 8, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function TopProductosChart({ data }) {
  const empty = !data?.length;

  return (
    <ChartCard
      title="Productos más vendidos"
      description="Top 5 por unidades vendidas"
      empty={empty}
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3f54" horizontal={false} />
            <XAxis type="number" allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="nombre"
              width={100}
              tick={{ fill: '#cbd5e1', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ProductosTooltip />} cursor={{ fill: 'rgba(34, 211, 238, 0.08)' }} />
            <Bar dataKey="cantidad" fill="#22d3ee" radius={[0, 8, 8, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
