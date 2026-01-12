import React, { useState } from 'react';
import { Package, Zap, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SellerPanel = ({ addNewProduct }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    device: '',
    price: '',
    category: 'Pantallas',
    origin: 'Nodo-772-BETA', // Nodo por defecto del técnico
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=400'
  });

  // Cálculo automático de ahorro de CO2 según categoría
  const co2Estimates = {
    'Pantallas': 12,
    'Baterías': 25,
    'Placas Base': 40,
    'Teclados': 8,
    'Otros': 15
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      ...formData,
      id: Date.now(), // ID único temporal
      price: Number(formData.price),
      co2: co2Estimates[formData.category] || 15
    };

    addNewProduct(newProduct); // Enviamos al estado global en App.jsx
    navigate('/marketplace');  // Redirigimos para ver el producto publicado
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 lg:p-16">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12">
          <span className="text-[#01c38e] font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">
            Área de Recuperación
          </span>
          <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
            Publicar <span className="text-[#01c38e]">Componente</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* FORMULARIO DE ENTRADA */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-6">
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Nombre del Componente</label>
                <input 
                  required
                  type="text" 
                  placeholder="EJ: PANTALLA OLED ORIGINAL"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-[#01c38e] outline-none transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Dispositivo</label>
                  <input 
                    required
                    type="text" 
                    placeholder="EJ: IPHONE 13 PRO"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-[#01c38e] outline-none transition-all"
                    onChange={(e) => setFormData({...formData, device: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Precio ($)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-[#01c38e] outline-none transition-all"
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Categoría</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-[#01c38e] outline-none transition-all appearance-none"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Pantallas</option>
                  <option>Baterías</option>
                  <option>Placas Base</option>
                  <option>Teclados</option>
                  <option>Otros</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#01c38e] hover:text-black transition-all"
                >
                  Listar en Marketplace <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>

          {/* SIDEBAR DE INFO AMBIENTAL */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#01c38e] p-8 rounded-[40px] text-black">
              <Zap size={32} className="mb-6" />
              <h3 className="font-black text-xl uppercase italic leading-tight mb-4">Impacto Estimado</h3>
              <p className="text-sm font-bold opacity-80 mb-8">Calculamos el ahorro de carbono basado en la categoría del componente seleccionado.</p>
              
              <div className="bg-black/10 rounded-2xl p-6 border border-black/5">
                <span className="block text-[10px] font-black uppercase tracking-widest mb-1">CO2 Evitado</span>
                <span className="text-4xl font-black">-{co2Estimates[formData.category] || 15}KG</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100">
              <div className="flex items-center gap-3 text-gray-400 mb-4">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Garantía PoR</span>
              </div>
              <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
                Al publicar este componente, certificas que ha sido verificado y cumple con los estándares de funcionamiento para una segunda vida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPanel;