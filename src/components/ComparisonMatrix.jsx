import React, { useState } from 'react';
import { 
  Zap, Battery, Gauge, ShieldCheck, Plus, X, Award, CheckCircle2, 
  Sparkles, SlidersHorizontal, ArrowLeftRight, Download, Share2, AlertCircle, Info, ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ComparisonMatrix({ 
  comparedEvs, 
  allEvs, 
  onRemoveEv, 
  onAddEv, 
  onOpenSelector, 
  onViewDetails 
}) {
  const [showOnlyDiffs, setShowOnlyDiffs] = useState(false);
  const [highlightWinners, setHighlightWinners] = useState(true);

  if (comparedEvs.length === 0) {
    return (
      <div className="oneui-card p-10 text-center max-w-2xl mx-auto my-12">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
          <ArrowLeftRight className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          No EVs Selected for Side-by-Side Comparison
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Select up to 4 electric vehicles (Cars or Scooters) from the EV Catalog to view an in-depth spec matrix side by side.
        </p>
        <button
          onClick={onOpenSelector}
          className="oneui-pill active text-sm py-3 px-6 shadow-lg shadow-indigo-500/30"
        >
          <Plus className="w-4 h-4 inline mr-2" /> Browse EV Catalog
        </button>
      </div>
    );
  }

  // Calculate Winners for each numeric field
  const getWinnerId = (key, mode = 'max') => {
    if (comparedEvs.length < 2) return null;
    let winner = comparedEvs[0];
    for (let i = 1; i < comparedEvs.length; i++) {
      const current = comparedEvs[i];
      if (mode === 'max' && current[key] > winner[key]) winner = current;
      if (mode === 'min' && current[key] < winner[key]) winner = current;
    }
    return winner.id;
  };

  const winners = {
    priceMin: getWinnerId('priceMin', 'min'),
    realWorldRange: getWinnerId('realWorldRange', 'max'),
    araiRange: getWinnerId('araiRange', 'max'),
    batteryCapacity: getWinnerId('batteryCapacity', 'max'),
    fastChargingTime: getWinnerId('fastChargingTime', 'min'),
    powerHp: getWinnerId('powerHp', 'max'),
    torqueNm: getWinnerId('torqueNm', 'max'),
    acceleration: getWinnerId('acceleration', 'min'),
    topSpeed: getWinnerId('topSpeed', 'max'),
    bootSpace: getWinnerId('bootSpace', 'max'),
    runningCost: getWinnerId('runningCost', 'min'),
    score: getWinnerId('score', 'max')
  };

  // Helper to check if specs in row are different across selected EVs
  const isDifferent = (key) => {
    if (comparedEvs.length < 2) return false;
    const val0 = comparedEvs[0][key];
    return comparedEvs.some(ev => ev[key] !== val0);
  };

  const handleShare = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Comparison link copied to clipboard!");
    }
  };

  const renderRow = (label, key, formatter, winnerKey = null) => {
    if (showOnlyDiffs && !isDifferent(key)) return null;

    return (
      <tr className="border-b border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-500/5 transition-colors">
        <td className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-900/50 sticky left-0 z-10 w-48 shadow-sm">
          {label}
        </td>
        {comparedEvs.map(ev => {
          const val = ev[key];
          const isWinner = highlightWinners && winnerKey && winners[winnerKey] === ev.id;

          return (
            <td 
              key={ev.id} 
              className={`p-4 text-xs md:text-sm font-semibold text-center transition-all ${
                isWinner ? 'winner-highlight font-extrabold' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              {formatter ? formatter(val, ev) : val}
              {isWinner && (
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold inline-block">
                  BEST
                </span>
              )}
            </td>
          );
        })}

        {/* Empty cells if fewer than 4 items */}
        {Array.from({ length: 4 - comparedEvs.length }).map((_, idx) => (
          <td key={idx} className="p-4 text-center text-slate-400 text-xs italic">--</td>
        ))}
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Controls & Quick Action Bar */}
      <div className="oneui-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Show Differences Toggle */}
          <button
            onClick={() => setShowOnlyDiffs(!showOnlyDiffs)}
            className={`oneui-pill text-xs font-bold ${
              showOnlyDiffs ? 'active' : 'bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 inline mr-1.5" />
            {showOnlyDiffs ? 'Showing Differences Only' : 'Show Only Differences'}
          </button>

          {/* Highlight Winners Toggle */}
          <button
            onClick={() => setHighlightWinners(!highlightWinners)}
            className={`oneui-pill text-xs font-bold ${
              highlightWinners ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' : 'bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <Award className="w-3.5 h-3.5 inline mr-1.5" />
            Highlight Winners
          </button>

        </div>

        {/* Share / Export */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleShare}
            className="oneui-pill text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20"
          >
            <Share2 className="w-3.5 h-3.5 inline mr-1.5" /> Share Comparison
          </button>
        </div>
      </div>

      {/* Side-by-Side Table Matrix */}
      <div className="oneui-card overflow-hidden shadow-2xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* STICKY HEADER WITH EV VEHICLE CARDS */}
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
                
                {/* Top-Left Corner Label */}
                <th className="p-4 text-xs font-black uppercase text-slate-400 sticky left-0 z-20 bg-slate-100 dark:bg-slate-900 w-48 border-r border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <Zap className="w-4 h-4" /> Specs Matrix
                  </div>
                </th>

                {/* EV Columns */}
                {comparedEvs.map(ev => (
                  <th key={ev.id} className="p-4 text-center w-1/4 min-w-[200px] align-top relative">
                    <button
                      onClick={() => onRemoveEv(ev.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <img 
                      src={ev.image} 
                      alt={ev.name}
                      className="w-full h-28 object-cover rounded-2xl mb-3 shadow-md border border-slate-200/50 dark:border-slate-800"
                    />
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
                      {ev.brand}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 line-clamp-1">
                      {ev.name}
                    </h4>
                    <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                      {ev.displayPrice}
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onViewDetails(ev)}
                        className="oneui-pill text-[11px] py-1 px-3 bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      >
                        Full Specs
                      </button>
                    </div>
                  </th>
                ))}

                {/* Add EV Column Slot (If < 4) */}
                {Array.from({ length: 4 - comparedEvs.length }).map((_, idx) => (
                  <th key={idx} className="p-4 text-center w-1/4 min-w-[200px] align-middle bg-slate-50/40 dark:bg-slate-900/30">
                    <button
                      onClick={onOpenSelector}
                      className="w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 hover:border-indigo-500 transition-all p-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-extrabold">Add EV Slot</span>
                    </button>
                  </th>
                ))}

              </tr>
            </thead>

            <tbody>
              {/* CATEGORY 1: PRICING & RATING */}
              <tr className="bg-indigo-500/10 border-y border-indigo-500/20">
                <td colSpan={5} className="p-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pl-4">
                  💰 Pricing, Value & Warranty
                </td>
              </tr>
              {renderRow("EV Specs Score", "score", (v) => `${v} / 10`, "score")}
              {renderRow("Ex-Showroom Price", "displayPrice", null, "priceMin")}
              {renderRow("Estimated On-Road (Delhi)", "onRoadDelhi")}
              {renderRow("Estimated On-Road (Mumbai)", "onRoadMumbai")}
              {renderRow("Running Cost / km", "runningCost", (v) => `₹${v} / km`, "runningCost")}
              {renderRow("Battery Warranty", "warranty")}

              {/* CATEGORY 2: BATTERY & CHARGING */}
              <tr className="bg-emerald-500/10 border-y border-emerald-500/20">
                <td colSpan={5} className="p-2.5 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 pl-4">
                  ⚡ Battery, Range & DC Fast Charging
                </td>
              </tr>
              {renderRow("Battery Capacity", "batteryCapacity", (v) => `${v} kWh`, "batteryCapacity")}
              {renderRow("Battery Tech Chemistry", "batteryType")}
              {renderRow("Real-World Range (Est.)", "realWorldRange", (v) => `${v} km`, "realWorldRange")}
              {renderRow("ARAI Claimed Range", "araiRange", (v) => `${v} km`, "araiRange")}
              {renderRow("DC Fast Charge (10-80%)", "fastChargingTime", (v) => `${v} minutes`, "fastChargingTime")}
              {renderRow("Home AC Charge Time", "homeChargingTime", (v) => `${v} hours`)}
              {renderRow("Fast Charger Plug Standard", "chargerType")}

              {/* CATEGORY 3: PERFORMANCE & MOTOR */}
              <tr className="bg-purple-500/10 border-y border-purple-500/20">
                <td colSpan={5} className="p-2.5 text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 pl-4">
                  🚀 Power, Acceleration & Speed
                </td>
              </tr>
              {renderRow("Max Motor Power", "powerHp", (v, ev) => `${v} PS (${ev.powerKw} kW)`, "powerHp")}
              {renderRow("Peak Torque", "torqueNm", (v) => `${v} Nm`, "torqueNm")}
              {renderRow("0-100 km/h Acceleration", "acceleration", (v) => `${v} seconds`, "acceleration")}
              {renderRow("Top Speed", "topSpeed", (v) => `${v} km/h`, "topSpeed")}
              {renderRow("Drivetrain Layout", "drivetrain")}

              {/* CATEGORY 4: SAFETY & TECH */}
              <tr className="bg-blue-500/10 border-y border-blue-500/20">
                <td colSpan={5} className="p-2.5 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 pl-4">
                  🛡️ Safety & Connected Car Tech
                </td>
              </tr>
              {renderRow("NCAP Safety Rating", "ncapRating")}
              {renderRow("ADAS Autonomous Tech", "adas")}
              {renderRow("Infotainment Touchscreen", "touchscreen")}
              {renderRow("Sunroof", "sunroof")}
              {renderRow("V2L (Vehicle-to-Load)", "v2lSupport", (v) => (v ? "✅ Supported (3.6 kW)" : "❌ Not Available"))}
              {renderRow("Boot Cargo Capacity", "bootSpace", (v) => `${v} Liters`, "bootSpace")}
              {renderRow("Seating Capacity", "seating", (v) => `${v} Persons`)}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
