import React, { useEffect, useState } from 'react';
import { Smartphone, Package, Zap, Share2, Plus, Trash2, LogOut, Wrench, ShoppingBag, Clock, X, ShieldCheck, Info, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

const UserDashboard = ({ orders = [] }) => {
  const navigate = useNavigate();
  
  const [showQR, setShowQR] = useState(false);
  const [lastDeviceId, setLastDeviceId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [userData, setUserData] = useState({
    display_name: localStorage.getItem('userName') || 'USUARIO',
    email: localStorage.getItem('userEmail') || 'protocolo@ejemplo.com',
    role: localStorage.getItem('userRole') || 'user'
  });
  
  const [myDevices, setMyDevices] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail') || 'guest';
    const storageKey = `myDevices_${userEmail}`;
    const oldKey = 'myDevices'; // Clave antigua para no perder datos previos
    
    let savedRepairs = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // LÓGICA DE RECUPERACIÓN: Si la cuenta nueva está vacía, miramos si hay algo en la antigua
    if (savedRepairs.length === 0) {
      const oldData = JSON.parse(localStorage.getItem(oldKey) || '[]');
      if (oldData.length > 0) {
        savedRepairs = oldData;
        // Migramos los datos a la nueva clave para que ya queden vinculados a este usuario
        localStorage.setItem(storageKey, JSON.stringify(oldData));
        // Opcional: localStorage.removeItem(oldKey); // Descomenta si quieres limpiar la clave vieja
      }
    }
    
    if (savedRepairs.length > 0) {
      setLastDeviceId(savedRepairs[savedRepairs.length - 1].id);
      setMyDevices(savedRepairs);
    } else {
      setLastDeviceId(null);
      setMyDevices([]); 
    }
    
    const repairCO2 = savedRepairs.reduce((acc, dev) => acc + (Number(dev.co2) || 0), 0);
    const marketplaceCO2 = orders.reduce((acc, order) => acc + (Number(order.totalCO2) || 0), 0);
    setTotalCO2(repairCO2 + marketplaceCO2);
  }, [orders]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white p-8 lg:p-16 text-black relative">
      
      {/* MODAL: DESCRIPCIÓN DEL PRODUCTO / DISPOSITIVO */}
      {selectedItem && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white rounded-[40px] max-w-md w-full p-10 shadow-2xl animate-in fade-in zoom-in duration-200 relative">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6">
              <span className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest block mb-2">Detalles del Protocolo</span>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{selectedItem.name || `ID: ${selectedItem.id}`}</h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Estado en Red</p>
                <p className="font-bold text-sm uppercase">{selectedItem.status || 'Certificado'}</p>
              </div>
              <div className="bg-[#01c38e]/10 p-4 rounded-2xl border border-[#01c38e]/20">
                <p className="text-[9px] font-bold text-[#01c38e] uppercase mb-1">Impacto Ambiental</p>
                <p className="font-black text-[#01c38e]">+{selectedItem.co2 || selectedItem.totalCO2}KG CO2 EVITADOS</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Descripción</p>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  {selectedItem.description || "Este activo ha sido procesado bajo estándares de economía circular, extendiendo su vida útil y reduciendo el desperdicio electrónico global mediante ingeniería de precisión."}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setSelectedItem(null)}
              className="w-full py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#01c38e] hover:text-black transition-all"
            >
              Cerrar Detalles
            </button>
          </div>
        </div>
      )}

      {/* MODAL QR */}
      {showQR && lastDeviceId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
           <div className="bg-white rounded-[40px] max-w-sm w-full overflow-hidden shadow-2xl p-10 text-center">
              <div className="mb-6 inline-block p-4 bg-gray-50 rounded-3xl">
                <QRCode value={`http://localhost:5173/verify/${lastDeviceId}`} size={180} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Certificado Propietario</p>
              <p className="font-black text-xl uppercase italic mb-8">{userData.display_name}</p>
              <button onClick={() => setShowQR(false)} className="w-full py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-all">Cerrar</button>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h1 className="text-6xl font-black tracking-tighter mb-2 uppercase italic">
              HOLA, <span className="text-[#01c38e]">{userData.display_name.split(' ')[0]}</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
              Protocolo de Reparación • {userData.role === 'tech' ? 'TÉCNICO NIVEL 1' : 'USUARIO ACTIVO'}
            </p>
          </div>

          <div className="flex gap-4">
            <button onClick={handleLogout} className="border-2 border-black text-black px-6 py-4 rounded-full font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-all uppercase">
              <LogOut size={16} /> Salir
            </button>
            <button onClick={() => navigate('/dashboard')} className="bg-[#01c38e] text-black px-8 py-4 rounded-full font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-all uppercase shadow-lg shadow-[#01c38e]/20">
              <Plus size={18} /> Registrar Equipo
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h3 className="font-black text-xl tracking-tighter flex items-center gap-3 mb-8 italic">
                <Smartphone className="text-[#01c38e]" /> MIS DISPOSITIVOS
              </h3>
              <div className="grid gap-4">
                {myDevices.length === 0 ? (
                  <div className="p-16 border-2 border-dashed border-gray-100 rounded-[40px] text-center text-gray-300 font-black text-[10px] uppercase tracking-widest">Nodo Vacío</div>
                ) : (
                  myDevices.map(dev => (
                    <div 
                      key={dev.id} 
                      onClick={() => setSelectedItem(dev)} 
                      className="group flex items-center justify-between p-6 border-2 border-gray-50 rounded-[30px] hover:border-[#01c38e] transition-all cursor-pointer bg-white"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#01c38e] group-hover:bg-[#01c38e]/10 transition-all"><Smartphone /></div>
                        <div>
                          <h4 className="font-black text-lg italic uppercase">{dev.name}</h4>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{dev.date} • ID: {dev.id.substring(0,10)}...</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black uppercase mb-1 text-[#01c38e] flex items-center gap-1 justify-end"><Award size={12}/> {dev.status}</div>
                        <div className="font-mono text-sm font-bold italic">+{dev.co2}kg CO2</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
            
            <section>
              <h3 className="font-black text-xl tracking-tighter flex items-center gap-3 mb-8 italic">
                <ShoppingBag className="text-[#01c38e]" /> HISTORIAL DE COMPRAS
              </h3>
              {orders.length === 0 ? (
                <div className="p-16 border-2 border-dashed border-gray-100 rounded-[40px] text-center text-gray-300 font-black text-[10px] uppercase tracking-widest">No hay pedidos</div>
              ) : (
                <div className="grid gap-4">
                  {orders.map(order => (
                    <div key={order.id} onClick={() => setSelectedItem(order)} className="bg-gray-50 p-6 rounded-[30px] border border-transparent hover:border-black transition-all cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="bg-black text-white p-3 rounded-2xl"><Package size={20} /></div>
                          <div>
                            <span className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest">{order.id}</span>
                            <h4 className="font-black text-md uppercase italic leading-none">{order.items.length} COMPONENTES</h4>
                            <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 flex items-center gap-1"><Clock size={10}/> {order.date}</p>
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

          <div className="space-y-8">
            <div className="bg-[#01c38e] p-10 rounded-[40px] text-white shadow-xl shadow-[#01c38e]/20 sticky top-12">
              <Zap className="mb-6 text-black/20" size={32} />
              <p className="font-black text-[10px] uppercase tracking-[0.2em] mb-4 text-black/40">Huella Evitada Total</p>
              <div className="text-7xl font-black tracking-tighter mb-4">
                {totalCO2}<span className="text-xl ml-2 font-bold italic text-white/50">KG</span>
              </div>
              <button 
                onClick={() => lastDeviceId ? setShowQR(true) : alert("Registra un equipo primero")}
                className={`mt-8 flex items-center gap-2 p-4 rounded-2xl w-full justify-center font-black text-[10px] uppercase tracking-widest transition-all ${!lastDeviceId ? 'bg-black/20 cursor-not-allowed text-white/50' : 'bg-black text-white hover:bg-[#011c14] hover:scale-[1.02]'}`}
              >
                <Share2 size={16} /> Compartir Logro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;