# POS — Punto de Venta

Sistema POS básico con arquitectura en dos capas: **backend** (Express + Swagger) y **frontend** (React + Vite + Tailwind).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Ejecución local

Abre **dos terminales**:

**Terminal 1 — API (puerto 5000)**

```bash
cd backend
npm start
```

Documentación Swagger: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

**Terminal 2 — App React (puerto 5173)**

```bash
cd frontend
npm run dev
```

Interfaz: [http://localhost:5173](http://localhost:5173)

> Inicia siempre el backend antes que el frontend para cargar productos correctamente.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Lista inventario |
| GET | `/api/ventas` | Historial de ventas |
| POST | `/api/ventas` | Registra una venta |

## Estructura

```
pos-app/
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        └── views/
```
