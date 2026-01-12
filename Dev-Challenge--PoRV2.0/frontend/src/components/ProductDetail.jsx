import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Zap, ShieldCheck, ArrowLeft, ShoppingCart, 
  MapPin, Calendar, User, CheckCircle2, Cpu, History // Añadido History aquí
} from 'lucide-react';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // CORRECCIÓN: Comparamos convirtiendo ambos a String para evitar errores de tipo (int vs string)
  const product = products?.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <h2 className="text-2xl font-black uppercase italic mb-4">Producto no encontrado</h2>
        <Link to="/marketplace" className="bg-black text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest">
          Volver al Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* BARRA DE NAVEGACIÓN SUPERIOR */}
      <div className="max-w-[1400px] mx-auto p-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all"
        >
          <ArrowLeft size={14} /> Volver atrás
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 mt-8">
        
        {/* COLUMNA IZQUIERDA: VISUAL */}
        <div className="space-y-8">
          <div className="relative aspect-square rounded-[60px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl shadow-gray-200/50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-8 left-8">
              <div className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl">
                <Zap size={16} className="text-[#01c38e]" />
                <span className="font-black text-xs uppercase tracking-tighter">Impacto: -{product.co2}KG CO2</span>
              </div>
            </div>
          </div>

          {/* BLOQUE DE VERIFICACIÓN TÉCNICA */}
          <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#01c38e] mb-6 flex items-center gap-2">
              <ShieldCheck size={16} /> Estado de Validación PoR
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase">Técnico Asignado</p>
                <p className="text-sm font-bold flex items-center gap-2"><User size={14} className="text-gray-400"/> {product.techId || 'PRO-VERIFIED'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase">Nodo de Origen</p>
                <p className="text-sm font-bold flex items-center gap-2"><MapPin size={14} className="text-gray-400"/> {product.origin}</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-white rounded-2xl border border-gray-100">
              <p className="text-[11px] font-bold text-gray-600 italic leading-relaxed">
                "{product.repairDetails || 'Esta pieza ha superado los protocolos de estrés térmico y conductividad. 100% operativa.'}"
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO Y TRAZABILIDAD */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-[10px] font-black text-[#01c38e] bg-[#01c38e]/10 px-4 py-2 rounded-full uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-6xl font-black tracking-tighter uppercase italic mt-6 leading-none">
              {product.name}
            </h1>
            <p className="text-xl font-bold text-gray-400 mt-2 uppercase tracking-tight">{product.device}</p>
          </div>

          <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 italic">Descripción de Recuperación</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              {product.description || 'Componente original recuperado de terminales en desuso, testeado bajo estándares industriales para garantizar su durabilidad y rendimiento idéntico a una pieza nueva.'}
            </p>
          </div>

          {/* LÍNEA DEL TIEMPO (TRAZABILIDAD) */}
          <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
              <History size={16} /> Historial del Componente (PoR)
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {product.steps ? product.steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative">
                  <div className="w-9 h-9 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center z-10 shadow-sm">
                    <CheckCircle2 size={18} className="text-[#01c38e]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black uppercase tracking-tighter">{step.label}</span>
                      <span className="text-[9px] font-bold text-gray-300">{step.date}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-bold">{step.desc}</p>
                  </div>
                </div>
              )) : (
                <p className="text-[10px] font-bold text-gray-400 italic">Cargando datos de trazabilidad desde el nodo...</p>
              )}
            </div>
          </div>

          {/* COMPRA */}
          <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Precio Final</p>
              <p className="text-5xl font-black tracking-tighter">${product.price}</p>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="flex-grow bg-black text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-[#01c38e] hover:text-black transition-all active:scale-95 shadow-2xl shadow-black/10"
            >
              <ShoppingCart size={18} /> Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;