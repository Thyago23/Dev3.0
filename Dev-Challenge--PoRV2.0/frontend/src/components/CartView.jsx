import React, { useState } from 'react';
import { Trash2, ArrowRight, ShoppingBag, Zap, ChevronLeft, CheckCircle, Leaf, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Añadimos useNavigate

const CartView = ({ cart, removeFromCart, onCompleteOrder }) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate(); // Inicializamos el navegador

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const totalCO2 = cart.reduce((acc, item) => acc + item.co2, 0);

  const handleCheckout = () => {
    // 1. Preparamos el objeto del pedido con datos reales
    const newOrder = {
      id: `PoR-${Math.floor(1000 + Math.random() * 9000)}`, 
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: [...cart],
      total: total,
      totalCO2: totalCO2
    };

    // 2. Enviamos el pedido al estado global en App.jsx
    onCompleteOrder(newOrder);

    // 3. Activamos la vista de éxito interna
    setIsOrdered(true);
  };

  // 1. VISTA DE ÉXITO (CONFIRMACIÓN)
  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-[#01c38e]/10 p-10 rounded-[50px] mb-8 relative">
          <CheckCircle size={80} className="text-[#01c38e] animate-bounce" />
          <Leaf size={24} className="text-[#01c38e] absolute top-4 right-4 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
          ¡Pedido <span className="text-[#01c38e]">Confirmado</span>!
        </h2>
        <p className="text-gray-500 font-bold text-lg mb-2">Gracias por elegir componentes recuperados.</p>
        <p className="text-gray-400 font-bold text-sm mb-12 max-w-sm">
          Has evitado la emisión de <span className="text-black">{totalCO2}kg de CO2</span> a la atmósfera.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            to="/profile" 
            className="bg-gray-100 text-black px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
          >
            Ver mis Pedidos
          </Link>
          
          {/* BOTÓN CLAVE: Redirige al Certificado pasando los datos por el estado */}
          <button 
            onClick={() => navigate('/certificate', { state: { totalCo2: totalCO2, itemsCount: cart.length } })}
            className="bg-[#01c38e] text-black px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-[#01c38e]/20"
          >
            <FileText size={14} /> Obtener Certificado de Impacto
          </button>
        </div>
      </div>
    );
  }

  // 2. VISTA DE CARRITO VACÍO (Sin cambios)
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-gray-50 p-8 rounded-[40px] mb-8">
          <ShoppingBag size={64} className="text-gray-200" />
        </div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Tu carrito está <span className="text-[#01c38e]">vacío</span></h2>
        <Link to="/marketplace" className="bg-black text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#01c38e] transition-all">
          <ChevronLeft size={16} /> Ir al Marketplace
        </Link>
      </div>
    );
  }

  // 3. VISTA DEL CARRITO ACTIVO (Sin cambios)
  return (
    <div className="min-h-screen bg-[#fafafa] p-8 lg:p-16 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/marketplace" className="p-3 bg-white rounded-full shadow-sm hover:text-[#01c38e] transition-all">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Resumen de <span className="text-[#01c38e]">Pedido</span></h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-[30px] flex items-center gap-6 border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all group">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-[20px] grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="flex-grow">
                  <h3 className="font-black text-lg uppercase italic leading-none mb-1">{item.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{item.device}</p>
                  <span className="bg-[#01c38e]/10 text-[#01c38e] px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1 w-fit">
                    <Zap size={10} /> -{item.co2}kg CO2
                  </span>
                </div>
                <div className="text-right flex flex-col items-end gap-4">
                  <span className="font-black text-xl tracking-tighter">${item.price}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black rounded-[40px] p-8 text-white sticky top-32 shadow-2xl shadow-black/20">
              <h3 className="text-xl font-black uppercase italic mb-8 border-b border-white/10 pb-4">Total Pedido</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${total}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#01c38e]">
                  <span>Impacto Positivo</span>
                  <span>{totalCO2}KG CO2</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Final</span>
                <span className="text-4xl font-black tracking-tighter text-[#01c38e]">${total}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#01c38e] text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] transition-all active:scale-95"
              >
                Finalizar Compra <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;