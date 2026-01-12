import React, { useState } from 'react';
import { Search, Filter, Package, Zap, ArrowRight, ShieldCheck, Laptop, Smartphone, Cpu, MapPin, History } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // Añadimos Link

const Marketplace = ({ addToCart, newProducts: externalProducts = [] }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Todos', 'Pantallas', 'Baterías', 'Placas Base', 'Teclados'];

  // TUS PRODUCTOS ORIGINALES (Mantengo los 4 intactos aquí dentro)
  const products = [
    {
      id: 1,
      name: "Pantalla OLED Original",
      device: "iPhone 13 Pro",
      price: 120,
      co2: 12,
      category: "Pantallas",
      image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=400",
      origin: "Nodo-772-BETA",
      techId: "TECH-01"
    },
    {
      id: 2,
      name: "Batería de Alta Capacidad",
      device: "MacBook Air M1",
      price: 85,
      co2: 25,
      category: "Baterías",
      image: "https://http2.mlstatic.com/D_NQ_NP_931959-MEC85354894517_052025-O.webp",
      origin: "Nodo-405-ALFA",
      techId: "TECH-09"
    },
    {
      id: 3,
      name: "Módulo de Teclado Español",
      device: "Dell XPS 13",
      price: 45,
      co2: 8,
      category: "Teclados",
      image: "https://http2.mlstatic.com/D_NQ_NP_913878-MEC47936481520_102021-O.webp",
      origin: "Nodo-772-BETA",
      techId: "TECH-01"
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
      techId: "TECH-05"
    }
  ];

  // CORRECCIÓN DE DUPLICADOS:
  // Filtramos externalProducts para que solo añada los que NO tengan IDs 1, 2, 3 o 4.
  const uniqueExternal = externalProducts.filter(
    ext => !products.some(p => p.id === ext.id)
  );
  const allProducts = [...products, ...uniqueExternal];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = filter === 'Todos' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.device.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-black p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#01c38e] font-black text-[10px] tracking-[0.3em] uppercase mb-4">
              <Package size={14} /> Marketplace de Componentes
            </div>
            <h2 className="text-6xl font-black tracking-tighter uppercase italic leading-none mb-6">
              PIEZAS CON <span className="text-[#01c38e]">HISTORIA</span>
            </h2>
            <p className="text-gray-400 font-bold text-sm leading-relaxed max-w-md">
              Componentes originales recuperados, verificados por técnicos y listos para una segunda vida. 
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="BUSCAR COMPONENTE..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#01c38e] outline-none font-black text-[10px] uppercase tracking-widest transition-all"
              />
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full font-black text-[9px] uppercase tracking-widest transition-all border-2 ${
                filter === cat 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-[#01c38e] hover:text-[#01c38e]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group flex flex-col bg-white border border-gray-50 p-4 rounded-[48px] hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500">
              
              {/* IMAGEN CLICABLE */}
              <Link to={`/product/${product.id}`} className="relative aspect-square mb-6 overflow-hidden rounded-[40px] bg-gray-100 block">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                    <Zap size={12} className="text-[#01c38e]" />
                    <span className="font-black text-[9px] uppercase tracking-tighter">-{product.co2}KG CO2</span>
                  </div>
                </div>
              </Link>

              <div className="px-2 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* TÍTULO CLICABLE */}
                    <Link to={`/product/${product.id}`} className="hover:text-[#01c38e] transition-colors">
                      <h3 className="font-black text-lg italic uppercase leading-tight mb-1">{product.name}</h3>
                    </Link>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.device}</p>
                  </div>
                  <span className="font-black text-xl tracking-tighter">${product.price}</span>
                </div>
                
                {/* SECCIÓN DE TRAZABILIDAD POR NODOS */}
                <div className="bg-gray-50 rounded-3xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <History size={12} className="text-[#01c38e]" />
                    <span className="text-[9px] font-black text-black uppercase tracking-widest">Ruta de Recuperación</span>
                  </div>
                  
                  <div className="space-y-3 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-200">
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-[11px] h-[11px] rounded-full bg-[#01c38e] border-2 border-white shadow-sm"></div>
                      <p className="text-[8px] font-bold text-gray-500 uppercase">
                        <span className="text-black">Origen:</span> {product.origin || 'Nodo-Desconocido'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-[11px] h-[11px] rounded-full bg-[#01c38e] border-2 border-white shadow-sm"></div>
                      <p className="text-[8px] font-bold text-gray-500 uppercase">
                        <span className="text-black">Técnico:</span> {product.techId || 'PRO-VERIFIED'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={14} className="text-[#01c38e]" />
                  <span className="text-[9px] font-black text-[#01c38e] uppercase tracking-widest">Verificación PoR Activa</span>
                </div>
              </div>

              <button 
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-black text-white py-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#01c38e] hover:text-black transition-all active:scale-95 shadow-lg shadow-black/5"
              >
                Añadir al Carrito <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* BANNER */}
        <div className="mt-24 p-12 rounded-[50px] bg-gray-900 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-4xl font-black tracking-tighter uppercase italic mb-4">
                ¿Tienes piezas para <span className="text-[#01c38e]">vender</span>?
              </h3>
              <p className="text-gray-400 font-medium text-sm">
                Convierte tus reparaciones en ingresos. Sube los componentes que has recuperado y ayuda a otros técnicos a salvar dispositivos.
              </p>
            </div>
            <button 
              onClick={() => navigate('/sell')}
              className="bg-[#01c38e] text-black px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all whitespace-nowrap"
            >
              Empezar a Vender
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-5">
            <Cpu size={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;