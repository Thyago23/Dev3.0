import React, { useEffect, useState } from 'react';

const ImpactChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.100.28:3000/api/stats/categories')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const maxVal = Math.max(...data.map(d => parseInt(d.total_co2)), 1);

  return (
    <div className="bg-[#1a1e29] p-6 rounded-3xl shadow-xl w-full h-full min-h-[250px] flex flex-col">
      <h3 className="text-[#01c38e] text-[10px] font-black uppercase tracking-[0.2em] mb-8">Ahorro por Categoría (kg)</h3>
      <div className="flex items-end justify-around flex-grow gap-2 px-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 w-full">
            <div 
              className="bg-[#01c38e] w-full rounded-t-lg transition-all duration-1000 shadow-[0_0_15px_rgba(1,195,142,0.4)]"
              style={{ height: `${(item.total_co2 / maxVal) * 120}px` }}
            ></div>
            <span className="text-[8px] text-gray-500 font-bold uppercase truncate w-full text-center">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactChart;