import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importante para leer el ID de la URL
import { ShieldCheck, Search, Calendar, HardDrive, Leaf, UserCheck, Award, X } from 'lucide-react';

const VerifyPublic = () => {
  const { id } = useParams(); // Captura el ID si viene de /verify/POR-XXXX
  const [searchId, setSearchId] = useState(id || '');
  const [repairData, setRepairData] = useState(null);
  const [error, setError] = useState(false);

  // EFECTO: Si hay un ID en la URL (por el QR), ejecutar la búsqueda automáticamente
  useEffect(() => {
    if (id) {
      performVerification(id);
    }
  }, [id]);

  const performVerification = (code) => {
    const savedDevices = JSON.parse(localStorage.getItem('myDevices') || '[]');
    const found = savedDevices.find(d => d.id.toUpperCase() === code.toUpperCase());

    if (found) {
      setRepairData({
        id: found.id,
        date: found.date,
        device: found.name,
        technician: "EcoTech Labs - Nodo 7",
        impact: `${found.co2}kg CO2 Ahorrados`,
        status: "Certificado Verificado"
      });
      setError(false);
    } else {
      setError(true);
      setRepairData(null);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    performVerification(searchId);
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
          <p className="text-gray-500 font-bold text-sm">Validación de activos mediante identificador único de protocolo.</p>
        </div>

        {/* BUSCADOR */}
        <form onSubmit={handleVerify} className="relative mb-16">
          <input 
            type="text" 
            placeholder="Introduce el ID del certificado"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full bg-white border-2 border-gray-100 rounded-[30px] px-8 py-6 text-xl font-black uppercase tracking-widest focus:border-[#01c38e] outline-none transition-all shadow-xl shadow-black/5"
          />
          <button type="submit" className="absolute right-3 top-3 bottom-3 bg-black text-white px-8 rounded-[22px] font-black text-[10px] uppercase tracking-widest hover:bg-[#01c38e] hover:text-black transition-all flex items-center gap-2">
            Validar <Search size={16} />
          </button>
        </form>

        {/* RESULTADO (CERTIFICADO) */}
        {repairData && (
          <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-black p-8 text-white flex justify-between items-center">
              <div className="text-left">
                <p className="text-[10px] font-black text-[#01c38e] uppercase tracking-[0.3em] mb-1">Certificado Oficial</p>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">{repairData.id}</h3>
              </div>
              <div className="flex flex-col items-end">
                <Award size={40} className="text-[#01c38e]" />
                <span className="text-[8px] font-bold text-[#01c38e] mt-2">AUTÉNTICO</span>
              </div>
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

            <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-between items-center">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Protocolo v1.0 • Verificación Descentralizada
              </p>
              <div className="flex gap-2">
                 <div className="w-2 h-2 bg-[#01c38e] rounded-full animate-pulse"></div>
                 <span className="text-[8px] font-black text-gray-400 uppercase">Nodo Activo</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-6 rounded-3xl border border-red-100 inline-block">
            <p className="font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
              <X size={14} /> ID de certificado no encontrado en el sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPublic;