import React, { useEffect, useState } from 'react';
import { ShieldCheck, Leaf, Cpu, ArrowRight, Gauge, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stats, setStats] = useState({ total_co2: 0, total_repairs: 0, unique_devices: 0 });

  useEffect(() => {
    fetch('http://localhost:3000/api/stats/global')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log("Backend offline, usando datos demo"));
  }, []);

  return (
    <div className="bg-white">
      <section className="max-w-[1600px] mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#01c38e]/10 text-[#01c38e] px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8 border border-[#01c38e]/30">
            <ShieldCheck size={14} /> Protocolo de Confianza con Nuestros Usuarios
          </div>
          <h1 className="text-7xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-10 text-gray-900">
            REPARAR <br /> ES EL ACTO <br /> 
            <span className="text-[#01c38e]">MÁS REBELDE.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium mb-12 max-w-lg leading-relaxed">
            Proof of Repair transforma la reparación técnica en un activo digital inmutable. Certificamos cada gramo de CO2 evitado al planeta.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/login" className="flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-[#01c38e] transition-all">
              INICIAR PROTOCOLO <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-[40px] p-12 text-white col-span-2 relative overflow-hidden group">
            <Leaf className="text-[#01c38e] mb-8" size={48} />
            <div className="text-8xl font-black mb-2 tracking-tighter">
                {stats.total_co2}<span className="text-2xl ml-2 text-[#01c38e]">KG</span>
            </div>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">CO2 Neto evitado</p>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#01c38e]/20 blur-[100px] rounded-full"></div>
          </div>
          <div className="bg-gray-100 rounded-[40px] p-10">
            <Gauge className="text-black mb-6" size={32} />
            <div className="text-4xl font-black mb-1">{stats.total_repairs}</div>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Servicios</p>
          </div>
          <div className="bg-[#01c38e] rounded-[40px] p-10 text-white flex flex-col justify-between">
            <Globe size={32} className="mb-6" />
            <div className="font-black text-xl leading-none tracking-tighter italic">NODOS ACTIVOS</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;