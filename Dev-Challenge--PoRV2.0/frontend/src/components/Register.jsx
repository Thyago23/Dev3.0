import React, { useState } from "react";
import { User, Wrench, Mail, Lock, ShieldCheck, ArrowRight, Fingerprint, CheckCircle2, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseCode, setLicenseCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validación de licencia técnica
    if (role === "tech" && licenseCode !== "POR-2026-TECH") {
      setLoading(false);
      alert("ERROR: Código de licencia técnica no válido.");
      return;
    }

    try {
      // IMPORTANTE: Verifica que tu backend esté en el puerto 3000
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.toLowerCase().trim(), 
          password: password, 
          role: role 
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos temporalmente para que el dashboard tenga datos al redirigir
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
        
        setShowSuccess(true);
      } else {
        alert("Error del servidor: " + (data.error || "No se pudo guardar"));
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No hay conexión con el servidor. Revisa si tu backend Node.js está corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 relative overflow-hidden">
      {/* MODAL DE ÉXITO */}
      {showSuccess && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 text-center shadow-2xl">
            <CheckCircle2 className="text-[#01c38e] mx-auto mb-6" size={60} />
            <h3 className="text-3xl font-black uppercase italic mb-2">Registro Exitoso</h3>
            <p className="text-gray-400 font-bold text-[10px] tracking-widest mb-8">DATOS INYECTADOS EN PGADMIN</p>
            <button onClick={() => navigate("/login")} className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase hover:bg-[#01c38e] transition-all">
              IR AL LOGIN
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1100px] bg-white rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
        {/* LADO IZQUIERDO (DISEÑO) */}
        <div className="md:w-5/12 bg-black p-12 flex flex-col justify-between text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#01c38e] blur-[120px] opacity-20"></div>
          <h2 className="text-5xl font-black italic leading-none uppercase">System<br/><span className="text-[#01c38e]">Access</span></h2>
          <div className="flex items-center gap-4 opacity-50"><Fingerprint size={20}/> <span className="text-[10px] font-black uppercase tracking-widest">Protocolo Seguro</span></div>
        </div>

        {/* LADO DERECHO (FORMULARIO) */}
        <div className="md:w-7/12 p-12 lg:p-20">
          <h3 className="text-3xl font-black uppercase italic mb-8">Registro</h3>
          
          <form onSubmit={handleRegister} className="space-y-6">
            {/* SELECTOR DE ROL */}
            <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl">
                <button type="button" onClick={() => setRole("user")} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${role === "user" ? "bg-white shadow-sm" : "text-gray-400"}`}>Usuario</button>
                <button type="button" onClick={() => setRole("tech")} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${role === "tech" ? "bg-white shadow-sm" : "text-gray-400"}`}>Técnico</button>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="NOMBRE COMPLETO" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-b-2 border-transparent focus:border-[#01c38e] font-bold text-xs" value={name} onChange={(e)=>setName(e.target.value)} required />
              <input type="email" placeholder="EMAIL" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-b-2 border-transparent focus:border-[#01c38e] font-bold text-xs" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              <input type="password" placeholder="CONTRASEÑA" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-b-2 border-transparent focus:border-[#01c38e] font-bold text-xs" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              
              {role === "tech" && (
                <input type="text" placeholder="CÓDIGO PoR-2026-TECH" className="w-full p-4 bg-[#01c38e]/10 text-[#01c38e] rounded-2xl outline-none border border-[#01c38e] font-black text-xs" value={licenseCode} onChange={(e)=>setLicenseCode(e.target.value.toUpperCase())} required />
              )}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-black text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#01c38e] transition-all">
              {loading ? "Sincronizando..." : "Registrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;