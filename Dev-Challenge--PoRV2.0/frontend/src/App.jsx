import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ShoppingCart, PlusSquare } from 'lucide-react';
import Home from './components/Home';
import RepairForm from './components/RepairForm';
import VerifyPage from './components/VerifyPage';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import Marketplace from './components/Marketplace';
import VerifyPublic from './components/VerifyPublic';
import CartView from './components/CartView';
import SellerPanel from './components/SellerPanel';
import ImpactCertificate from './components/ImpactCertificate';
import ProductDetail from './components/ProductDetail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const userRole = localStorage.getItem('userRole') || 'user';

  const [cart, setCart] = useState([]);
  
  // MODIFICACIÓN: Leer pedidos del localStorage al iniciar
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('myOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pantalla OLED Original",
      device: "iPhone 13 Pro",
      price: 120,
      co2: 12,
      category: "Pantallas",
      image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=400",
      origin: "Nodo-772-BETA",
      description: "Pantalla extraída de un terminal con fallo en placa base. Panel sin arañazos, verificado con herramientas de diagnóstico oficiales.",
      repairDetails: "Limpieza de conectores flex y refuerzo de sellado contra humedad.",
      techId: "TECH-01",
      steps: [
        { date: "02 Ene 2026", label: "Recuperado en Nodo-772", desc: "Extracción segura de terminal donante." },
        { date: "04 Ene 2026", label: "Verificación Técnica", desc: "Prueba de 24pts de presión y colorimetría." },
        { date: "05 Ene 2026", label: "Listado en Marketplace", desc: "Certificado de Impacto PoR generado." }
      ]
    },
    {
      id: 2,
      name: "Batería de Alta Capacidad",
      device: "MacBook Air M1",
      price: 85,
      co2: 25,
      category: "Baterías",
      image: "https://images.unsplash.com/photo-1589561253898-768105ca9118?auto=format&fit=crop&q=80&w=400",
      origin: "Nodo-405-ALFA",
      description: "Batería con solo 15 ciclos de carga. Salud al 99%. Procedente de equipo con pantalla rota no reparada.",
      repairDetails: "Calibración de celdas y verificación de integridad química.",
      techId: "TECH-09",
      steps: [
        { date: "28 Dic 2025", label: "Recuperado en Nodo-405", desc: "Desmontaje de chasis MacBook Air." },
        { date: "30 Dic 2025", label: "Test de Ciclos", desc: "Validación de curva de descarga estable." },
        { date: "01 Ene 2026", label: "Listado en Marketplace", desc: "Disponible para envío global." }
      ]
    },
    {
      id: 3,
      name: "Módulo de Teclado Español",
      device: "Dell XPS 13",
      price: 45,
      co2: 8,
      category: "Teclados",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83bac1?auto=format&fit=crop&q=80&w=400",
      origin: "Nodo-772-BETA",
      description: "Módulo de teclado original retroiluminado. Respuesta táctil perfecta en todas las teclas.",
      repairDetails: "Limpieza ultrasónica y test de continuidad en membrana.",
      techId: "TECH-01",
      steps: [
        { date: "05 Ene 2026", label: "Extracción", desc: "Recuperado de equipo corporativo Dell." },
        { date: "07 Ene 2026", label: "Certificación", desc: "Limpieza profunda y mapeo de teclas." },
        { date: "08 Ene 2026", label: "Stock", desc: "Listo para sustitución inmediata." }
      ]
    },
    {
      id: 4,
      name: "Placa Base Verificada",
      device: "iPad Pro 11\"",
      price: 210,
      co2: 40,
      category: "Placas Base",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
      origin: "Nodo-112-GAMMA",
      description: "Placa lógica original verificada por microscopio. Libre de bloqueos iCloud y MDM.",
      repairDetails: "Inspección de pads de soldadura y test de consumo de corriente.",
      techId: "TECH-05",
      steps: [
        { date: "01 Ene 2026", label: "Desmontaje", desc: "Recuperada de iPad con chasis doblado." },
        { date: "03 Ene 2026", label: "Análisis SMD", desc: "Escaneo de componentes bajo microscopio." },
        { date: "04 Ene 2026", label: "Validación", desc: "Suscripción de hash de autenticidad PoR." }
      ]
    }
  ]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // MODIFICACIÓN: Guardar el pedido en localStorage para persistencia
  const onCompleteOrder = (newOrder) => {
    setOrders((prevOrders) => {
      const updatedOrders = [newOrder, ...prevOrders];
      localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    setCart([]);
  };

  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 p-6 border-b border-gray-100">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center px-4">
            <Link to="/" className="text-2xl font-black text-[#01c38e] tracking-tighter uppercase flex items-center gap-2">
              <span className="bg-[#01c38e] text-white px-2 py-1 rounded-lg text-sm">PoR</span>
              Proof of Repair
            </Link>

            <div className="flex gap-8 items-center font-bold text-[11px] uppercase tracking-widest text-gray-500">
              <Link to="/" className="hover:text-[#01c38e] transition-colors">Inicio</Link>
              <Link to="/marketplace" className="hover:text-[#01c38e] transition-colors">Marketplace</Link>
              
              {isAuthenticated && userRole === 'tech' && (
                <Link to="/sell" className="flex items-center gap-1 text-[#01c38e] hover:opacity-70 transition-all">
                  <PlusSquare size={14} /> Vender Pieza
                </Link>
              )}

              <Link to="/verify-repair" className="hover:text-[#01c38e] transition-colors">Validar</Link>
              
              <Link to="/cart" className="relative group p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all">
                <ShoppingCart size={18} className="text-black" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#01c38e] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {cart.length}
                  </span>
                )}
              </Link>
              
              {isAuthenticated ? (
                <>
                  {userRole === 'tech' && (
                    <Link to="/dashboard" className="hover:text-[#01c38e] transition-colors text-[#01c38e]">Terminal Técnico</Link>
                  )}
                  <Link to="/profile" className="text-black hover:text-[#01c38e] transition-colors font-black underline decoration-[#01c38e] decoration-2 underline-offset-4">Mi Perfil</Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="text-gray-900 hover:text-[#01c38e] transition-colors">Crear Cuenta</Link>
                  <Link to="/login" className="bg-black text-white px-8 py-3 rounded-full hover:bg-[#01c38e] transition-all shadow-lg shadow-black/5">
                    Acceso Técnico
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/marketplace" element={<Marketplace newProducts={products} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            <Route path="/verify-repair" element={<VerifyPublic />} />
            <Route path="/cart" element={<CartView cart={cart} removeFromCart={removeFromCart} onCompleteOrder={onCompleteOrder} />} />
            <Route path="/profile" element={isAuthenticated ? <UserDashboard orders={orders} /> : <Navigate to="/login" />} />
            <Route path="/sell" element={isAuthenticated && userRole === 'tech' ? <SellerPanel addNewProduct={addNewProduct} /> : <Navigate to="/marketplace" />} />
            
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <RepairForm /> : <Navigate to="/profile" />} 
            />
            
            <Route path="/certificate" element={<ImpactCertificate />} />
            <Route path="/verify/:id" element={<VerifyPage />} />
          </Routes>
        </main>

        <footer className="py-20 border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-[1600px] mx-auto px-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            © 2026 Eco-Tech Solutions - Defending the Right to Repair
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;