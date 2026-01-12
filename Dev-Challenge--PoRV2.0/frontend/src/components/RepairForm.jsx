import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Movido al inicio
import StatsBanner from './StatsBanner';
import ImpactChart from './ImpactChart';
import RepairCertificate from './RepairCertificate';

const RepairForm = () => {
  const [loading, setLoading] = useState(false);
  const [repairResult, setRepairResult] = useState(null);
  const navigate = useNavigate(); // 2. Inicializado correctamente

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      device_id: e.target.device_id.value,
      category: e.target.category.value,
      description: e.target.description.value,
      shop_id: "1134dc87-65da-422d-9649-7597939c918b" 
    };

    try {
      const response = await fetch('http://localhost:3000/api/repair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) setRepairResult(data);
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // Si ya hay resultado, mostrar certificado
  if (repairResult) return <RepairCertificate repairData={repairResult.record} />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* BOTÓN VOLVER (Añadido arriba del todo) */}
        <button 
          onClick={() => navigate('/user-profile')}
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
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="bg-[#1a1e29] rounded-[40px] shadow-2xl overflow-hidden border border-[#132d46]">
            <div className="p-8 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-[#01c38e]/20 p-2 rounded-lg text-[#01c38e]">♻️</div>
                <div>
                  <h2 className="text-white font-bold text-xl">Nueva Certificación</h2>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Eco-PuceTech Solutions | Protocolo v1.0</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div>
                <label className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest block mb-3">ID del Dispositivo (Serial)</label>
                <input name="device_id" required className="w-full bg-[#132d46] border-none rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#01c38e] transition-all outline-none" placeholder="Ej: SN-2024-XXXX" />
              </div>
              <div>
                <label className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest block mb-3">Categoría de Hardware</label>
                <select name="category" className="w-full bg-[#132d46] border-none rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#01c38e]">
                  <option value="Laptop">Laptop (300kg CO2)</option>
                  <option value="Smartphone">Smartphone (60kg CO2)</option>
                  <option value="Monitor">Monitor (150kg CO2)</option>
                  <option value="Tablet">Tablet (120kg CO2)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest block mb-3">Descripción Técnica</label>
                <textarea name="description" required rows="3" className="w-full bg-[#132d46] border-none rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#01c38e]" placeholder="Describa el servicio..."></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#01c38e] hover:bg-[#00e0a1] text-[#1a1e29] font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95">
                {loading ? "Procesando..." : "Emitir Proof of Repair"}
              </button>
            </form>
          </div>

          {/* COLUMNA DERECHA: DASHBOARD */}
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