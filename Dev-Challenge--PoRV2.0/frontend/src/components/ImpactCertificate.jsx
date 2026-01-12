import React from 'react';
import { ShieldCheck, Share2, Download, TreePine, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ImpactCertificate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Recibimos los datos de la compra (o usamos datos de ejemplo si entramos directo)
  const { totalCo2 = 0, itemsCount = 0 } = location.state || { totalCo2: 55, itemsCount: 2 };

  // Cálculo de equivalencias
  const treesEquivalent = (totalCo2 / 20).toFixed(1); // Un árbol absorbe aprox 20kg/año

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100 relative">
        
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <ShieldCheck size={300} />
        </div>

        <div className="p-12 relative z-10">
          {/* Encabezado del Certificado */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[#01c38e] font-black text-[10px] tracking-[0.4em] uppercase mb-6 bg-[#01c38e]/10 px-4 py-2 rounded-full">
              <ShieldCheck size={14} /> Certificado Oficial de Recuperación
            </div>
            <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
              IMPACTO <span className="text-[#01c38e]">VALIDADO</span>
            </h2>
          </div>

          {/* Bloque Central de Datos */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-black text-white p-8 rounded-[40px] flex flex-col items-center text-center">
              <Zap className="text-[#01c38e] mb-4" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">CO2 Evitado</span>
              <span className="text-5xl font-black italic">-{totalCo2}KG</span>
            </div>
            <div className="bg-gray-100 p-8 rounded-[40px] flex flex-col items-center text-center text-black">
              <TreePine className="text-[#01c38e] mb-4" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Equivalencia</span>
              <span className="text-5xl font-black italic">{treesEquivalent}</span>
              <span className="text-[10px] font-black uppercase">Árboles / año</span>
            </div>
          </div>

          <div className="space-y-4 mb-12 px-4">
            <p className="text-sm font-bold text-gray-500 leading-relaxed text-center">
              Este documento certifica que se han rescatado <span className="text-black underline decoration-[#01c38e]">{itemsCount} componentes originales</span>, evitando la fabricación de nuevas piezas y reduciendo la huella de carbono digital en el nodo correspondiente.
            </p>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#01c38e] hover:text-black transition-all">
                <Download size={16} /> Descargar PDF
              </button>
              <button className="flex-1 border-2 border-gray-100 py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:border-black transition-all">
                <Share2 size={16} /> Compartir
              </button>
            </div>
            <button 
              onClick={() => navigate('/marketplace')}
              className="w-full py-4 text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-black transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={12} /> Volver al Marketplace
            </button>
          </div>
        </div>

        {/* Footer del certificado */}
        <div className="bg-gray-50 p-6 border-t border-gray-100 text-center text-[9px] font-black text-gray-400 tracking-[0.2em] uppercase">
          ID de Validación: POR-2026-{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default ImpactCertificate;