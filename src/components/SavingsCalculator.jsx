import React, { useState } from 'react';
import { Sparkles, Calculator, Fuel, Zap, TrendingUp, Leaf, DollarSign, ArrowRight } from 'lucide-react';

export default function SavingsCalculator() {
  const [dailyKm, setDailyKm] = useState(45);
  const [fuelPrice, setFuelPrice] = useState(96.72); // Petrol INR / L
  const [mileage, setMileage] = useState(14); // Petrol km/L
  const [electricityTariff, setElectricityTariff] = useState(7.5); // INR / kWh
  const [evEfficiency, setEvEfficiency] = useState(8.5); // km per kWh

  // Calculations
  const monthlyKm = dailyKm * 30;
  
  // Petrol Cost
  const monthlyPetrolLitres = monthlyKm / mileage;
  const monthlyPetrolCost = monthlyPetrolLitres * fuelPrice;
  
  // EV Cost
  const monthlyEvKwh = monthlyKm / evEfficiency;
  const monthlyEvCost = monthlyEvKwh * electricityTariff;

  // Savings
  const monthlySavings = Math.max(0, monthlyPetrolCost - monthlyEvCost);
  const annualSavings = monthlySavings * 12;
  const fiveYearSavings = annualSavings * 5;

  // CO2 Saved (Approx 2.31 kg CO2 per L petrol)
  const annualCo2SavedKg = Math.round(monthlyPetrolLitres * 12 * 2.31);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="oneui-card p-6 sm:p-8 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-blue-900/40 border-indigo-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Indian Automobile EV Economics
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            EV Cost vs Petrol Savings Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Calculate your exact monthly ₹ savings, payback duration, and carbon reduction when switching from Petrol to Electric in India.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 text-center shrink-0 min-w-[200px]">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 block">
            5-Year Estimated Savings
          </span>
          <span className="text-3xl sm:text-4xl font-black text-emerald-400">
            ₹{Math.round(fiveYearSavings).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-300 block mt-1">
            Based on {dailyKm} km daily drive
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sliders & Inputs */}
        <div className="lg:col-span-6 oneui-card p-6 space-y-6">
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-500" /> Customize Your Commute
          </h3>

          {/* Daily Km Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-extrabold">
              <span className="text-slate-600 dark:text-slate-400">Daily Travel Distance:</span>
              <span className="text-indigo-600 dark:text-indigo-400 text-sm">{dailyKm} km / day</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="200" 
              value={dailyKm}
              onChange={(e) => setDailyKm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10 km</span>
              <span>100 km</span>
              <span>200 km</span>
            </div>
          </div>

          {/* Petrol Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-extrabold">
              <span className="text-slate-600 dark:text-slate-400">Petrol Fuel Rate (INR/L):</span>
              <span className="text-indigo-600 dark:text-indigo-400 text-sm">₹{fuelPrice} / L</span>
            </div>
            <input 
              type="range" 
              min="85" 
              max="120" 
              step="0.5"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Petrol Car Mileage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-extrabold">
              <span className="text-slate-600 dark:text-slate-400">Petrol Car Mileage:</span>
              <span className="text-indigo-600 dark:text-indigo-400 text-sm">{mileage} km / Litre</span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="24" 
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Electricity Tariff */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-extrabold">
              <span className="text-slate-600 dark:text-slate-400">Home Electricity Rate:</span>
              <span className="text-indigo-600 dark:text-indigo-400 text-sm">₹{electricityTariff} / kWh Unit</span>
            </div>
            <input 
              type="range" 
              min="4" 
              max="15" 
              step="0.5"
              value={electricityTariff}
              onChange={(e) => setElectricityTariff(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

        </div>

        {/* Right Column: Output Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Monthly Comparison Box */}
          <div className="oneui-card p-6 space-y-4">
            <h4 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider">
              Monthly Running Cost Comparison
            </h4>

            {/* Petrol Cost Card */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold">
                  <Fuel className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Petrol Car Cost</span>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {Math.round(monthlyPetrolLitres)} Litres / month
                  </span>
                </div>
              </div>
              <span className="text-lg font-black text-red-500">
                ₹{Math.round(monthlyPetrolCost).toLocaleString('en-IN')}
              </span>
            </div>

            {/* EV Cost Card */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">EV Electricity Cost</span>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {Math.round(monthlyEvKwh)} Units / month
                  </span>
                </div>
              </div>
              <span className="text-lg font-black text-emerald-500">
                ₹{Math.round(monthlyEvCost).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Net Monthly Savings Pill */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shadow-lg">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider block opacity-90">
                  Your Net Monthly Savings
                </span>
                <span className="text-2xl font-black">
                  ₹{Math.round(monthlySavings).toLocaleString('en-IN')} / month
                </span>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>

          </div>

          {/* Environmental Impact Pill Card */}
          <div className="oneui-card p-5 flex items-center gap-4 border-emerald-500/30 bg-emerald-500/5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                Environment Impact: {annualCo2SavedKg.toLocaleString()} kg CO₂ Reduced
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Equivalent to planting ~{Math.round(annualCo2SavedKg / 20)} trees in India every single year!
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
