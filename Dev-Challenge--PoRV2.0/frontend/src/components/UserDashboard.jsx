import React, { useEffect, useState } from 'react';
import { Smartphone, Package, Zap, Share2, Plus, Trash2, LogOut, Wrench, ShoppingBag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ orders = [] }) => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    // DINÁMICO: Lee del localStorage, si no existe pone 'USUARIO'
    display_name: localStorage.getItem('userName') || 'USUARIO',
    email: localStorage.getItem('userEmail') || 'protocolo@ejemplo.com',
    role: localStorage.getItem('userRole') || 'user'
  });
  
  const [myDevices, setMyDevices] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);

  useEffect(() => {
    // 1. Cargar reparaciones
    const savedRepairs = JSON.parse(localStorage.getItem('myDevices') || '[]');
    
    // 2. Calcular CO2 de reparaciones
    const repairCO2 = savedRepairs.length === 0 
      ? 165 
      : savedRepairs.reduce((acc, dev) => acc + (Number(dev.co2) || 0), 0);

    // 3. Calcular CO2 de compras del Marketplace
    const marketplaceCO2 = orders.reduce((acc, order) => acc + (Number(order.totalCO2) || 0), 0);

    if (savedRepairs.length === 0) {
      setMyDevices([
        { id: 'DEMO-1', name: 'iPhone 13 Pro', status: 'Verificado', date: '12 Oct 2025', co2: 45 },
        { id: 'DEMO-2', name: 'MacBook Air M2', status: 'En Proceso', date: '05 Jan 2026', co2: 120 },
      ]);
    } else {
      setMyDevices(savedRepairs);
    }

    // 4. Suma total (Reparaciones + Compras)
    setTotalCO2(repairCO2 + marketplaceCO2);
  }, [orders]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const deleteAccount = () => {
    const confirm = window.confirm("¿ELIMINAR CUENTA?\n\nEsta acción es irreversible.");
    if (confirm) handleLogout();
  };

  return (
    <div className="min-h-screen bg-white p-8 lg:p-16 text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h1 className="text-6xl font-black tracking-tighter mb-2 uppercase italic">
              HOLA, <span className="text-[#01c38e]">{userData.display_name}</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
              Protocolo de Reparación • {userData.role === 'tech' ? 'TÉCNICO NIVEL 1' : 'USUARIO'}
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleLogout}
              className="border-2 border-black text-black px-6 py-4 rounded-full font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-all uppercase"
            >
              <LogOut size={16} /> Salir
            </button>
            
            {userData.role === 'tech' ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-black text-white px-8 py-4 rounded-full font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-[#01c38e] hover:text-black transition-all uppercase shadow-lg shadow-black/20"
              >
                <Wrench size={18} /> Terminal de Reparación
              </button>
            ) : (
              <button className="bg-[#01c38e] text-black px-8 py-4 rounded-full font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-all uppercase shadow-lg shadow-[#01c38e]/20">
                <Plus size={18} /> Registrar Equipo
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* MIS DISPOSITIVOS */}
            <section>
              <h3 className="font-black text-xl tracking-tighter flex items-center gap-3 mb-8 italic">
                <Smartphone className="text-[#01c38e]" /> MIS DISPOSITIVOS
              </h3>

              <div className="grid gap-4">
                {myDevices.map(dev => (
                  <div key={dev.id} className="group flex items-center justify-between p-6 border-2 border-gray-50 rounded-[30px] hover:border-[#01c38e] transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#01c38e] transition-colors">
                        <Smartphone />
                      </div>
                      <div>
                        <h4 className="font-black text-lg italic uppercase">{dev.name}</h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{dev.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-black uppercase mb-1 ${dev.status === 'Reparado' || dev.status === 'Verificado' ? 'text-[#01c38e]' : 'text-orange-400'}`}>
                        ● {dev.status}
                      </div>
                      <div className="font-mono text-sm font-bold italic">+{dev.co2}kg CO2</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NUEVA SECCIÓN: HISTORIAL DE COMPRAS */}
            <section>
              <h3 className="font-black text-xl tracking-tighter flex items-center gap-3 mb-8 italic">
                <ShoppingBag className="text-[#01c38e]" /> HISTORIAL DE COMPRAS
              </h3>
              {orders.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-gray-100 rounded-[40px] text-center">
                  <p className="text-gray-300 font-black text-[10px] uppercase tracking-widest">No hay pedidos registrados</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-gray-50 p-6 rounded-[30px] border border-transparent hover:border-black/5 transition-all">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="bg-black text-white p-3 rounded-2xl">
                            <Package size={20} />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest">{order.id}</span>
                            <h4 className="font-black text-md uppercase italic leading-none">{order.items.length} Componentes</h4>
                            <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 flex items-center gap-1">
                               <Clock size={10}/> {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black italic">${order.total}</div>
                          <div className="text-[10px] font-black text-[#01c38e] uppercase">-{order.totalCO2}kg CO2</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* COLUMNA DERECHA: IMPACTO */}
          <div className="space-y-8">
            <div className="bg-[#01c38e] p-10 rounded-[40px] text-white shadow-xl shadow-[#01c38e]/20">
              <Zap className="mb-6 text-black/20" size={32} />
              <p className="font-black text-[10px] uppercase tracking-[0.2em] mb-4 text-black/40">Huella Evitada Total</p>
              <div className="text-7xl font-black tracking-tighter mb-4">
                {totalCO2}
                <span className="text-xl ml-2 font-bold italic text-white/50">KG</span>
              </div>
              <p className="text-sm font-medium leading-relaxed opacity-90 italic">Economía circular activa en tu nodo.</p>
              <button className="mt-8 flex items-center gap-2 bg-black text-white p-4 rounded-2xl w-full justify-center transition-all font-black text-[10px] uppercase tracking-widest hover:bg-[#011c14]">
                <Share2 size={16} /> Compartir Logro
              </button>
            </div>

            <div className="p-8 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center">
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-4 text-center">Protocolo de eliminación de rastro</p>
              <button 
                onClick={deleteAccount}
                className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <Trash2 size={16} /> Eliminar Cuenta
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;