const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ——— Inventario y ventas en memoria ———
let productos = [
  { id: 1, nombre: 'Café Americano', precio: 3.5, categoria: 'Bebidas', stock: 50, imagen: '☕' },
  { id: 2, nombre: 'Cappuccino', precio: 4.25, categoria: 'Bebidas', stock: 40, imagen: '🥤' },
  { id: 3, nombre: 'Croissant', precio: 2.75, categoria: 'Panadería', stock: 30, imagen: '🥐' },
  { id: 4, nombre: 'Sandwich Club', precio: 7.99, categoria: 'Comida', stock: 25, imagen: '🥪' },
  { id: 5, nombre: 'Ensalada César', precio: 8.5, categoria: 'Comida', stock: 20, imagen: '🥗' },
  { id: 6, nombre: 'Brownie', precio: 3.25, categoria: 'Postres', stock: 35, imagen: '🍫' },
  { id: 7, nombre: 'Agua Mineral', precio: 1.5, categoria: 'Bebidas', stock: 60, imagen: '💧' },
  { id: 8, nombre: 'Jugo Natural', precio: 4.0, categoria: 'Bebidas', stock: 28, imagen: '🍊' },
];

let ventas = [];
let nextVentaId = 1;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'POS API',
      version: '1.0.0',
      description: 'API de punto de venta — productos y ventas en memoria',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /api/productos:
 *   get:
 *     summary: Lista todos los productos del inventario
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Arreglo de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   nombre: { type: string }
 *                   precio: { type: number }
 *                   categoria: { type: string }
 *                   stock: { type: integer }
 *                   imagen: { type: string }
 */
app.get('/api/productos', (_req, res) => {
  res.json(productos);
});

/**
 * @openapi
 * /api/ventas:
 *   get:
 *     summary: Historial de ventas registradas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
app.get('/api/ventas', (_req, res) => {
  res.json(ventas);
});

/**
 * @openapi
 * /api/ventas:
 *   post:
 *     summary: Registra una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, total]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productoId: { type: integer }
 *                     nombre: { type: string }
 *                     precio: { type: number }
 *                     cantidad: { type: integer }
 *               total: { type: number }
 *     responses:
 *       201:
 *         description: Venta creada
 *       400:
 *         description: Datos inválidos
 */
app.post('/api/ventas', (req, res) => {
  const { items, total } = req.body;

  if (!Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
    return res.status(400).json({ error: 'Se requieren items (array) y total (número)' });
  }

  for (const item of items) {
    const producto = productos.find((p) => p.id === item.productoId);
    if (!producto) {
      return res.status(400).json({ error: `Producto ${item.productoId} no encontrado` });
    }
    if (producto.stock < item.cantidad) {
      return res.status(400).json({
        error: `Stock insuficiente para ${producto.nombre}`,
      });
    }
  }

  for (const item of items) {
    const producto = productos.find((p) => p.id === item.productoId);
    producto.stock -= item.cantidad;
  }

  const venta = {
    id: nextVentaId++,
    fecha: new Date().toISOString(),
    items,
    total,
  };

  ventas.unshift(venta);
  res.status(201).json(venta);
});

app.get('/', (_req, res) => {
  res.json({
    mensaje: 'POS API activa',
    docs: `http://localhost:${PORT}/api-docs`,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor POS en http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});
