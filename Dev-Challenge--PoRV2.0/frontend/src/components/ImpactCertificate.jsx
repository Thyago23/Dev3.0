import React, { useRef } from 'react';
import { ShieldCheck, Share2, Download, TreePine, Zap, ArrowLeft, Lightbulb } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';

const ImpactCertificate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const certificateRef = useRef(); // Referencia para la captura del PDF

  // Recibimos los datos de la compra (o usamos ejemplo si no hay datos)
  const { totalCo2 = 55, itemsCount = 2 } = location.state || { totalCo2: 55, itemsCount: 2 };

  // --- CÁLCULOS DE EQUIVALENCIA REAL ---
  const treesEquivalent = (totalCo2 / 20).toFixed(1); // 1 árbol absorbe ~20kg/año
  const lightDays = (totalCo2 / 0.15).toFixed(0);    // 1 bombilla LED 10W encendida 24h ~0.15kg CO2

  // --- FUNCIÓN: DESCARGAR PDF ---
  const handleDownloadPDF = async () => {
    const element = certificateRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Mejora la calidad de la imagen en el PDF
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificado_EcoTech_Impacto.pdf`);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Hubo un error al generar el PDF.");
    }
  };

  // --- FUNCIÓN: COMPARTIR ---
  const handleShare = async () => {
    const text = `¡He evitado la emisión de ${totalCo2}kg de CO2 gracias al protocolo circular de EcoTech! 🌍♻️`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Certificado de Impacto EcoTech',
          text: text,
          url: window.location.href,
        });
      } catch (err) { 
        console.log("Error al compartir:", err); 
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("¡Logro copiado al portapapeles! Ya puedes pegarlo en tus redes.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      
      {/* ÁREA QUE SE CAPTURA EN EL PDF */}
      <div 
        ref={certificateRef}
        className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100 relative mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-[#01c38e]">
          <ShieldCheck size={300} />
        </div>

        <div className="p-12 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[#01c38e] font-black text-[10px] tracking-[0.4em] uppercase mb-6 bg-[#01c38e]/10 px-6 py-2 rounded-full">
              <ShieldCheck size={14} /> Impacto Ambiental Verificado
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
              Eco <span className="text-[#01c38e]">Certificate</span>
            </h1>
          </div>

          {/* MÉTRICA PRINCIPAL: CO2 */}
          <div className="bg-black rounded-[40px] p-10 text-center text-white mb-8 shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#01c38e] mb-4">Huella Evitada Total</p>
            <div className="text-8xl font-black tracking-tighter flex items-center justify-center gap-2 leading-none">
              {totalCo2}<span className="text-2xl text-gray-500 italic uppercase font-bold">kg</span>
            </div>
            <p className="mt-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">CO₂ no liberado a la atmósfera</p>
          </div>

          {/* EQUIVALENCIAS REALES */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-50 p-8 rounded-[35px] text-center border border-gray-100">
              <TreePine className="text-[#01c38e] mx-auto mb-4" size={32} />
              <h4 className="text-3xl font-black italic">{treesEquivalent}</h4>
              <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-tight mt-1">
                Árboles absorbiendo CO₂ en un año
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-[35px] text-center border border-gray-100">
              <Lightbulb className="text-yellow-500 mx-auto mb-4" size={32} />
              <h4 className="text-3xl font-black italic">{lightDays}</h4>
              <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-tight mt-1">
                Días de luz LED constante ahorrada
              </p>
            </div>
          </div>

          {/* QR DE VALIDACIÓN DENTRO DEL CERTIFICADO */}
          <div className="flex flex-col items-center justify-center bg-gray-50/50 rounded-[30px] p-6 border border-dashed border-gray-200">
            <QRCodeCanvas value={`https://ecotech.com/verify/${Math.random().toString(36).substr(2, 9)}`} size={80} />
            <p className="mt-3 text-[8px] font-black text-gray-300 uppercase tracking-widest text-center">
              Escanea para validar autenticidad en el nodo Eco-Tech
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100 text-center text-[9px] font-black text-gray-300 tracking-[0.2em] uppercase">
          Eco-Tech Solutions Protocol v1.2 • {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* BOTONES DE INTERACCIÓN (Fuera del PDF) */}
      <div className="max-w-2xl w-full space-y-4">
        <div className="flex gap-4">
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#01c38e] hover:text-black transition-all shadow-xl active:scale-95"
          >
            <Download size={18} /> Descargar PDF
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 border-2 border-gray-200 bg-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:border-black transition-all active:scale-95"
          >
            <Share2 size={18} /> Compartir Logro
          </button>
        </div>
        <button 
          onClick={() => navigate('/marketplace')}
          className="w-full py-4 text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-black transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft size={14} /> Volver al Marketplace
        </button>
      </div>
    </div>
  );
};

export default ImpactCertificate;