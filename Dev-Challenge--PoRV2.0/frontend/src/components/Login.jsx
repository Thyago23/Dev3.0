import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // IMPLEMENTACIÓN: Estados para manejar la conexión real
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // LLAMADA REAL A TU API
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // GUARDAMOS LOS DATOS QUE VIENEN DE PGADMIN
        localStorage.setItem('userName', data.user.name); 
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('isAuthenticated', 'true');

        onLogin(); 
        navigate('/profile'); 
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      alert("Error: No se pudo conectar con el servidor de la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black tracking-tighter mb-4 italic text-gray-900 uppercase">
            WELCOME <span className="text-[#01c38e]">BACK</span>
          </h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Accede a tu nodo de reparación</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-5 top-5 text-gray-400" size={20} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email del Técnico o Usuario" 
              className="w-full p-5 pl-14 bg-gray-50 rounded-[25px] outline-none focus:ring-2 focus:ring-[#01c38e] font-bold text-sm transition-all border border-transparent focus:border-[#01c38e]"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-5 top-5 text-gray-400" size={20} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña" 
              className="w-full p-5 pl-14 bg-gray-50 rounded-[25px] outline-none focus:ring-2 focus:ring-[#01c38e] font-bold text-sm transition-all border border-transparent focus:border-[#01c38e]"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-6 rounded-[25px] font-black uppercase tracking-[0.2em] text-xs hover:bg-[#01c38e] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/10 mt-8 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>ENTRAR AL PROTOCOLO <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          ¿No tienes cuenta? <Link to="/register" className="text-[#01c38e] hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;