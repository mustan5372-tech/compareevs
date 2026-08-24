import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { BarChart3, Zap, Battery, Clock, DollarSign } from 'lucide-react';

export default function VisualCharts({ evList }) {
  const [metric, setMetric] = useState('range');

  // Format data for Recharts
  const chartData = evList.map(ev => ({
    name: ev.name.length > 14 ? ev.name.substring(0, 12) + '...' : ev.name,
    fullName: ev.name,
    realRange: ev.realWorldRange,
    araiRange: ev.araiRange,
    battery: ev.batteryCapacity,
    priceLakh: +(ev.priceMin / 100000).toFixed(2),
    fastChargeMin: ev.fastChargingTime,
    score: ev.score
  }));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Chart Selector Controls */}
      <div className="oneui-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
            Interactive EV Visual Analytics
          </h3>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-full">
          <button
            onClick={() => setMetric('range')}
            className={`oneui-pill text-xs py-1.5 px-3.5 ${
              metric === 'range' ? 'active' : ''
            }`}
          >
            <Zap className="w-3.5 h-3.5 inline mr-1" /> Range (km)
          </button>

          <button
            onClick={() => setMetric('battery')}
            className={`oneui-pill text-xs py-1.5 px-3.5 ${
              metric === 'battery' ? 'active' : ''
            }`}
          >
            <Battery className="w-3.5 h-3.5 inline mr-1" /> Battery (kWh)
          </button>

          <button
            onClick={() => setMetric('charging')}
            className={`oneui-pill text-xs py-1.5 px-3.5 ${
              metric === 'charging' ? 'active' : ''
            }`}
          >
            <Clock className="w-3.5 h-3.5 inline mr-1" /> Charge Speed
          </button>
        </div>
      </div>

      {/* Chart Canvas Card */}
      <div className="oneui-card p-6 min-h-[420px] flex flex-col justify-between">
        
        <div className="mb-4">
          <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
            {metric === 'range' && 'Real World Range vs Claimed ARAI Range (km)'}
            {metric === 'battery' && 'Battery Size (kWh) vs Starting Price (₹ Lakh)'}
            {metric === 'charging' && 'DC Fast Charging Time (10-80% in Minutes)'}
          </h4>
          <p className="text-xs text-slate-400">
            Comparing top models across Indian EV market
          </p>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            {metric === 'range' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} interval={0} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderRadius: '16px', 
                    borderColor: '#334155', 
                    color: '#FFF',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="realRange" name="Real-World Range (km)" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="araiRange" name="ARAI Claimed (km)" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : metric === 'battery' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} interval={0} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderRadius: '16px', 
                    borderColor: '#334155', 
                    color: '#FFF',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="battery" name="Battery Pack (kWh)" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="priceLakh" name="Price (₹ Lakh)" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} interval={0} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderRadius: '16px', 
                    borderColor: '#334155', 
                    color: '#FFF',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="fastChargeMin" name="DC Fast Charge (Minutes)" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}
