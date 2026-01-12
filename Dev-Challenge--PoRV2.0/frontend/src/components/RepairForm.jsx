import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsBanner from './StatsBanner';
import ImpactChart from './ImpactChart';
import RepairCertificate from './RepairCertificate';

const RepairForm = () => {
  const [loading, setLoading] = useState(false);
  const [repairResult, setRepairResult] = useState(null);
  const navigate = useNavigate();

  // FUNCIÓN: Genera un ID alfanumérico realista (Ej: PR-A9B2-F311-882C)
  const generateRandomVerificationCode = () => {
    const chars = '0123456789ABCDEF';
    const segment = (len) => Array.from({length: len}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `PR-${segment(4)}-${segment(4)}-${segment(4)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Si el usuario deja el ID vacío, generamos el nuevo ID realista
    const inputId = e.target.device_id.value;
    const finalId = inputId || generateRandomVerificationCode();
    
    const category = e.target.category.value;
    const description = e.target.description.value;

    const co2Map = { 
      'Laptop': 300, 
      'Smartphone': 60, 
      'Monitor': 150, 
      'Tablet': 120 
    };

    try {
      // 1. Creamos el objeto para el historial local (Profile/Dashboard)
      const newDevice = {
        id: finalId,
        name: `${category} Certificado`,
        status: 'Verificado',
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        co2: co2Map[category] || 0,
        blockchainHash: "0x" + Math.random().toString(16).slice(2, 12).toUpperCase()
      };
      
      const current = JSON.parse(localStorage.getItem('myDevices') || '[]');
      localStorage.setItem('myDevices', JSON.stringify([...current, newDevice]));

      // 2. Simulamos respuesta exitosa para mostrar el certificado inmediatamente
      setRepairResult({
        record: {
          id: finalId,
          device_id: finalId,
          category: category,
          description: description,
          co2_saved_this_session: co2Map[category] || 0
        }
      });

    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error al procesar el registro.");
    } finally {
      setLoading(false);
    }
  };

  // Si se generó el resultado, mostramos el componente del certificado
  if (repairResult) return <RepairCertificate repairData={repairResult.record} />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <button 
          onClick={() => navigate('/profile')}
          className="group text-gray-400 hover:text-[#01c38e] font-black text-[10px] uppercase tracking-widest mb-8 flex items-center gap-2 transition-colors"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> 
          Cancelar y Volver al Perfil
        </button>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#1a1e29] mb-2 uppercase tracking-tight">Registro de Reparación</h1>
          <p className="text-gray-500 text-lg">Convierte basura electrónica en hardware certificado.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#1a1e29] rounded-[40px] shadow-2xl overflow-hidden border border-[#132d46]">
            <div className="p-8 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-[#01c38e]/20 p-2 rounded-lg text-[#01c38e]">♻️</div>
                <div>
                  <h2 className="text-white font-bold text-xl">Nueva Certificación</h2>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Protocolo de Verificación Industrial</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div>
                <label className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest block mb-3 italic">
                  ID de Seguimiento (Hash Alfanumérico)
                </label>
                <input 
                  name="device_id" 
                  className="w-full bg-[#132d46] border-none rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#01c38e] outline-none" 
                  placeholder="Dejar vacío para autogenerar ID realista" 
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest block mb-3 italic">Categoría de Hardware</label>
                <select name="category" className="w-full bg-[#132d46] border-none rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#01c38e]">
                  <option value="Laptop">Laptop (300kg CO2)</option>
                  <option value="Smartphone">Smartphone (60kg CO2)</option>
                  <option value="Monitor">Monitor (150kg CO2)</option>
                  <option value="Tablet">Tablet (120kg CO2)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest block mb-3 italic">Descripción Técnica</label>
                <textarea 
                  name="description" 
                  required 
                  rows="3" 
                  className="w-full bg-[#132d46] border-none rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#01c38e]" 
                  placeholder="Detalles de la reparación..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-[#01c38e] hover:bg-[#00e0a1] text-[#1a1e29] font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95"
              >
                {loading ? "Generando ID..." : "Emitir Proof of Repair"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <StatsBanner />
            <div className="h-[350px]">
              <ImpactChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairForm;