import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const RepairCertificate = ({ repairData }) => {
  // URL dinámica para que el QR funcione al escanear
  const myIP = "192.168.100.28"; // cambiar en la u por ipconfig
  const verifyUrl = `http://${myIP}:5173/verify/${repairData.id}`;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
      {/* Contenedor Estilo Sborg */}
      <div className="max-w-md w-full bg-[#1a1e29] border border-[#132d46] p-10 rounded-[50px] shadow-[0_25px_80px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
        
        {/* Adorno de fondo (Brillo sutil) */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#01c38e]/10 rounded-full blur-3xl"></div>

        {/* Encabezado */}
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#01c38e]/10 rounded-2xl mb-6 border border-[#01c38e]/20">
            <span className="text-3xl text-[#01c38e]">✓</span>
          </div>
          <h2 className="text-3xl font-black text-[#01c38e] tracking-tighter uppercase mb-2">
            Certificado Emitido
          </h2>
          <p className="text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-8">
            Protocolo de Impacto Ambiental v1.0
          </p>
        </div>

        {/* Área del QR */}
        <div className="bg-white p-6 inline-block rounded-[35px] shadow-[0_0_40px_rgba(1,195,142,0.15)] mb-8 border-4 border-[#01c38e]">
          <QRCodeCanvas 
            value={verifyUrl} 
            size={180} 
            level={"H"}
            includeMargin={false}
          />
        </div>

        {/* Stats de Impacto */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-[#132d46] w-full py-4 rounded-2xl border border-[#01c38e]/20">
            <p className="text-[10px] text-[#01c38e] font-black uppercase tracking-[0.3em] mb-1">Ahorro Estimado</p>
            <p className="text-3xl font-black text-white leading-none">
              -{repairData.co2_saved_this_session}kg <span className="text-[#01c38e]">CO₂</span>
            </p>
          </div>
          
          <p className="text-gray-400 text-sm italic font-medium px-4">
            "Has evitado la fabricación de un nuevo dispositivo mediante ingeniería circular."
          </p>
        </div>

        {/* Footer del Certificado */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">ID de Seguimiento</span>
            <code className="text-[#01c38e] text-[11px] font-mono bg-[#01c38e]/5 py-1 px-3 rounded-full">
              {repairData.id}
            </code>
          </div>
          
          <button 
            onClick={() => window.location.reload()} 
            className="w-full py-4 text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-[0.4em] transition-all border-t border-[#132d46] mt-4"
          >
            ← Registrar Nueva Reparación
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        Eco-Pucetech Solutions | 2026
      </p>
    </div>
  );
};

export default RepairCertificate;