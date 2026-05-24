import { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { producto, cantidad = 1 } = action.payload;
      const existing = state.items.find((i) => i.producto.id === producto.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.producto.id === producto.id
              ? { ...i, cantidad: i.cantidad + cantidad }
              : i
          ),
        };
      }

      return {
        items: [...state.items, { producto, cantidad }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((i) => i.producto.id !== action.payload.productoId),
      };
    case 'UPDATE_QTY': {
      const { productoId, cantidad } = action.payload;
      if (cantidad <= 0) {
        return {
          items: state.items.filter((i) => i.producto.id !== productoId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.producto.id === productoId ? { ...i, cantidad } : i
        ),
      };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const total = useMemo(
    () =>
      state.items.reduce(
        (sum, { producto, cantidad }) => sum + producto.precio * cantidad,
        0
      ),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, { cantidad }) => sum + cantidad, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      total,
      itemCount,
      addItem: (producto, cantidad = 1) =>
        dispatch({ type: 'ADD_ITEM', payload: { producto, cantidad } }),
      removeItem: (productoId) =>
        dispatch({ type: 'REMOVE_ITEM', payload: { productoId } }),
      updateQty: (productoId, cantidad) =>
        dispatch({ type: 'UPDATE_QTY', payload: { productoId, cantidad } }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, total, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
