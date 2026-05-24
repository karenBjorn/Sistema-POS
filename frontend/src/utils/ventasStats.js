export function calcularEstadisticas(ventas) {
  const vacio = {
    totalVentas: 0,
    ingresosTotales: 0,
    ticketPromedio: 0,
    unidadesVendidas: 0,
    ventasPorDia: [],
    topProductos: [],
    ventasRecientes: [],
  };

  if (!ventas?.length) return vacio;

  const ingresosTotales = ventas.reduce((sum, v) => sum + v.total, 0);
  const unidadesVendidas = ventas.reduce(
    (sum, v) => sum + v.items.reduce((acc, i) => acc + i.cantidad, 0),
    0
  );

  const porDiaMap = {};
  ventas.forEach((v) => {
    const key = v.fecha.slice(0, 10);
    const label = new Date(v.fecha).toLocaleDateString('es-CO', {
      weekday: 'short',
      day: 'numeric',
    });
    if (!porDiaMap[key]) {
      porDiaMap[key] = { fecha: key, label, ingresos: 0, ventas: 0 };
    }
    porDiaMap[key].ingresos += v.total;
    porDiaMap[key].ventas += 1;
  });

  const ventasPorDia = Object.values(porDiaMap)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(-7);

  const prodMap = {};
  ventas.forEach((v) => {
    v.items.forEach((item) => {
      if (!prodMap[item.nombre]) {
        prodMap[item.nombre] = { nombre: item.nombre, cantidad: 0, ingresos: 0 };
      }
      prodMap[item.nombre].cantidad += item.cantidad;
      prodMap[item.nombre].ingresos += item.precio * item.cantidad;
    });
  });

  const topProductos = Object.values(prodMap)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  return {
    totalVentas: ventas.length,
    ingresosTotales,
    ticketPromedio: ingresosTotales / ventas.length,
    unidadesVendidas,
    ventasPorDia,
    topProductos,
    ventasRecientes: ventas.slice(0, 5),
  };
}
