import React, { useState } from 'react';
import { ShieldCheck, Search, Calendar, HardDrive, Leaf, UserCheck, Award } from 'lucide-react';

const VerifyPublic = () => {
  const [searchId, setSearchId] = useState('');
  const [repairData, setRepairData] = useState(null);
  const [error, setError] = useState(false);

  // Simulación de búsqueda (luego esto conectará con tu lógica de guardado)
  const handleVerify = (e) => {
    e.preventDefault();
    // Simulamos que encontramos una reparación si el ID tiene algo de texto
    if (searchId.length > 3) {
      setRepairData({
        id: searchId.toUpperCase(),
        date: "12 OCT 2025",
        device: "MacBook Pro M2",
        technician: "EcoTech Labs - Nodo 7",
        impact: "24kg CO2 Ahorrados",
        status: "Certificado Verificado"
      });
      setError(false);
    } else {
      setError(true);
      setRepairData(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center py-20 px-6">
      <div className="max-w-3xl w-full text-center">
        {/* ENCABEZADO */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#01c38e]/10 text-[#01c38e] px-4 py-2 rounded-full mb-6">
            <ShieldCheck size={16} />
            <span className="font-black text-[10px] uppercase tracking-widest">Protocolo de Validación Pública</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-4">
            Verifica tu <span className="text-[#01c38e]">Reparación</span>
          </h1>
          <p className="text-gray-500 font-bold text-sm">Introduce el ID único de tu certificado para comprobar su autenticidad e impacto ambiental.</p>
        </div>

        {/* BUSCADOR GIGANTE */}
        <form onSubmit={handleVerify} className="relative mb-16">
          <input 
            type="text" 
            placeholder="EJ: POR-9923-X"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full bg-white border-2 border-gray-100 rounded-[30px] px-8 py-6 text-xl font-black uppercase tracking-widest focus:border-[#01c38e] outline-none transition-all shadow-xl shadow-black/5"
          />
          <button className="absolute right-3 top-3 bottom-3 bg-black text-white px-8 rounded-[22px] font-black text-[10px] uppercase tracking-widest hover:bg-[#01c38e] hover:text-black transition-all flex items-center gap-2">
            Verificar <Search size={16} />
          </button>
        </form>

        {/* RESULTADO: EL CERTIFICADO */}
        {repairData && (
          <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-black p-8 text-white flex justify-between items-center">
              <div className="text-left">
                <p className="text-[10px] font-black text-[#01c38e] uppercase tracking-[0.3em] mb-1">Certificado Oficial</p>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">{repairData.id}</h3>
              </div>
              <Award size={40} className="text-[#01c38e]" />
            </div>
            
            <div className="p-10 grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><Calendar size={20} /></div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Fecha de Registro</p>
                    <p className="font-bold text-sm uppercase">{repairData.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><HardDrive size={20} /></div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Dispositivo</p>
                    <p className="font-bold text-sm uppercase">{repairData.device}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><UserCheck size={20} /></div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Técnico Asignado</p>
                    <p className="font-bold text-sm uppercase">{repairData.technician}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#01c38e]">
                  <div className="bg-[#01c38e]/10 p-3 rounded-2xl"><Leaf size={20} /></div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest">Impacto Positivo</p>
                    <p className="font-bold text-sm uppercase">{repairData.impact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-100">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Este documento garantiza que el dispositivo ha sido reparado siguiendo estándares de economía circular.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 font-black text-[10px] uppercase tracking-widest animate-pulse">
            ID de certificado no encontrado. Por favor, revisa el código.
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPublic;