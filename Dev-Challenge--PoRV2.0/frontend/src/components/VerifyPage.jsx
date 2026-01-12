import React from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, Calendar, HardDrive, User, CheckCircle, Zap, ExternalLink } from 'lucide-react';

const VerifyPage = () => {
  const { id } = useParams(); // Esto capturaría el ID del QR o la URL

  // Datos simulados de un dispositivo verificado
  const deviceData = {
    id: id || "POR-9928-X2",
    model: "iPhone 13 Pro",
    owner: "USER_01",
    status: "ORIGINAL VERIFICADO",
    repairDate: "12 Oct 2025",
    technician: "TechFix Solutions - Nodo #44",
    blockchainHash: "0x71C939521234567890ABCDEF1234567890ABCDEF",
    co2Saved: "45 KG"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* CABECERA DE ESTADO */}
        <div className="bg-[#01c38e] p-10 text-white text-center">
          <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Certificado de Autenticidad</h1>
          <p className="text-sm font-bold opacity-80 tracking-widest uppercase">Protocolo Proof of Repair</p>
        </div>

        {/* DETALLES DEL ACTIVO */}
        <div className="p-10 space-y-8">
          
          <div className="flex justify-between items-center border-b border-gray-100 pb-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ID DEL ACTIVO</p>
              <p className="font-mono font-bold text-lg text-gray-900">{deviceData.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ESTADO</p>
              <span className="bg-[#01c38e]/10 text-[#01c38e] px-4 py-1 rounded-full font-black text-xs">
                {deviceData.status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl text-[#01c38e]">
                <HardDrive size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Modelo</p>
                <p className="font-bold text-gray-900">{deviceData.model}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl text-[#01c38e]">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Última Certificación</p>
                <p className="font-bold text-gray-900">{deviceData.repairDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl text-[#01c38e]">
                <User size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Técnico Autorizado</p>
                <p className="font-bold text-gray-900">{deviceData.technician}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#01c38e] rounded-2xl text-white">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Impacto Ambiental</p>
                <p className="font-bold text-[#01c38e]">+{deviceData.co2Saved} CO2 Ahorrado</p>
              </div>
            </div>
          </div>

          {/* PRUEBA BLOCKCHAIN */}
          <div className="mt-10 p-6 bg-black rounded-[30px] text-white overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#01c38e] rounded-full animate-pulse"></div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Verificación On-Chain</p>
              </div>
              <p className="text-[10px] font-mono break-all text-gray-300 opacity-80 leading-relaxed mb-6">
                TX_HASH: {deviceData.blockchainHash}
              </p>
              <button className="flex items-center gap-2 text-[#01c38e] font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                Ver en el explorador <ExternalLink size={12} />
              </button>
            </div>
            {/* Círculo decorativo */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#01c38e]/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="p-8 text-center bg-gray-50 border-t border-gray-100">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <CheckCircle size={12} /> Garantía de Economía Circular Verificada
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;