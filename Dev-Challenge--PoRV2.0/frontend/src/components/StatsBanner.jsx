import React, { useEffect, useState } from 'react';

const StatsBanner = () => {
  const [stats, setStats] = useState({ total_co2: 0, total_repairs: 0, unique_devices: 0 });

  useEffect(() => {
    fetch('http://192.168.100.28:3000/api/stats/global')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Tarjeta Impacto Ambiental (Oscura) */}
      <div className="flex-1 bg-[#1a1e29] p-6 rounded-2xl shadow-xl border-b-4 border-[#01c38e]">
        <p className="text-[10px] text-[#01c38e] font-black tracking-widest uppercase mb-2">Impacto Ambiental</p>
        <p className="text-4xl font-black text-white">{Number(stats.total_co2).toFixed(2)}</p>
        <p className="text-sm font-bold text-white mb-2">kg CO₂</p>
        <p className="text-[9px] text-gray-400 uppercase">Evitados globalmente</p>
      </div>

      {/* Tarjeta Reparaciones (Blanca) */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center">
        <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-1">Reparaciones Totales</p>
        <p className="text-5xl font-black text-[#1a1e29]">{stats.total_repairs}</p>
      </div>

      {/* Tarjeta Equipos (Blanca) */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center">
        <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-1">Equipos Salvados</p>
        <p className="text-5xl font-black text-[#01c38e]">{stats.unique_devices}</p>
      </div>
    </div>
  );
};

export default StatsBanner;