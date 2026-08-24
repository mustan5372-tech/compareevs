import React, { useState } from 'react';
import { 
  X, Zap, Battery, Clock, Gauge, ShieldCheck, Check, Plus, Award, 
  ThumbsUp, ThumbsDown, Calculator, ChevronRight, ExternalLink
} from 'lucide-react';

export default function EvDetailModal({ ev, isOpen, onClose, isCompared, onToggleCompare }) {
  const [tenureYears, setTenureYears] = useState(5);
  const [downPaymentPct, setDownPaymentPct] = useState(20);

  if (!isOpen || !ev) return null;

  // EMI Calculator logic
  const principal = ev.priceMin * (1 - downPaymentPct / 100);
  const annualInterest = 8.5; // 8.5% EV Green Loan Rate
  const r = annualInterest / 12 / 100;
  const n = tenureYears * 12;
  const monthlyEmi = Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="oneui-card w-full max-w-3xl overflow-hidden bg-slate-900 border-slate-700 text-white shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header Hero Image with Close Button */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-950">
          <img 
            src={ev.image} 
            alt={ev.name} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Badges Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="oneui-badge bg-indigo-500/80 text-white backdrop-blur-md uppercase text-[10px]">
                {ev.brand} • {ev.category === '4W' ? '4W Electric Car' : '2W Electric Scooter'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {ev.name}
              </h2>
              <p className="text-sm font-extrabold text-indigo-400">
                {ev.displayPrice} <span className="text-xs text-slate-300 font-medium">(Ex-Showroom)</span>
              </p>
            </div>

            <button
              onClick={() => onToggleCompare(ev.id)}
              className={`oneui-pill text-xs font-bold py-2.5 px-5 shadow-lg ${
                isCompared 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'active'
              }`}
            >
              {isCompared ? <Check className="w-4 h-4 inline mr-1" /> : <Plus className="w-4 h-4 inline mr-1" />}
              {isCompared ? 'In Compare' : 'Add to Compare'}
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Key Metric 4-Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
              <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block font-semibold">Real Range</span>
              <span className="text-sm font-black text-white">{ev.realWorldRange} km</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
              <Battery className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block font-semibold">Battery Pack</span>
              <span className="text-sm font-black text-white">{ev.batteryCapacity} kWh</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
              <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block font-semibold">DC Fast Charge</span>
              <span className="text-sm font-black text-white">{ev.fastChargingTime} mins</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
              <Gauge className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block font-semibold">0-100 Speed</span>
              <span className="text-sm font-black text-white">{ev.acceleration}s</span>
            </div>
          </div>

          {/* Pros & Cons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pros */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4" /> Why Buy (Pros)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {ev.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <h4 className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                <ThumbsDown className="w-4 h-4" /> Keep in Mind (Cons)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {ev.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Detailed Technical Specification Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider">
              Technical Specifications
            </h4>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden text-xs">
              <div className="grid grid-cols-2 p-3 border-b border-slate-800">
                <span className="text-slate-400">ARAI Claimed Range</span>
                <span className="font-bold text-white">{ev.araiRange} km</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-slate-800">
                <span className="text-slate-400">Motor Power / Torque</span>
                <span className="font-bold text-white">{ev.powerHp} PS / {ev.torqueNm} Nm</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-slate-800">
                <span className="text-slate-400">Battery Type & Chemistry</span>
                <span className="font-bold text-white">{ev.batteryType}</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-slate-800">
                <span className="text-slate-400">DC Fast Charger Standard</span>
                <span className="font-bold text-white">{ev.chargerType}</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-slate-800">
                <span className="text-slate-400">Safety & ADAS Rating</span>
                <span className="font-bold text-white">{ev.ncapRating} • {ev.adas}</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-slate-800">
                <span className="text-slate-400">Infotainment Touchscreen</span>
                <span className="font-bold text-white">{ev.touchscreen}</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-slate-800">
                <span className="text-slate-400">Vehicle Warranty</span>
                <span className="font-bold text-white">{ev.warranty}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-slate-400">MyNewCar & CarDekho API Ref</span>
                <span className="font-mono text-indigo-400">{ev.myNewCarId} • {ev.carDekhoId}</span>
              </div>
            </div>
          </div>

          {/* Quick Green Loan EMI Calculator Widget */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-indigo-400 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" /> EV Green Loan EMI Calculator
              </h4>
              <span className="text-xs font-black text-emerald-400">
                Est. ₹{monthlyEmi.toLocaleString('en-IN')} / month
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block">Down Payment ({downPaymentPct}%):</label>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block">Tenure ({tenureYears} Years):</label>
                <input 
                  type="range" 
                  min="2" 
                  max="7" 
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
