import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import TiendaView from './views/TiendaView';
import HistorialView from './views/HistorialView';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<TiendaView />} />
            <Route path="/historial" element={<HistorialView />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}
