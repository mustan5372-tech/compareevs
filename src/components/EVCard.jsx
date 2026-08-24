import React, { useState } from 'react';
import { Zap, Battery, Gauge, ShieldCheck, Plus, Check, Eye, DollarSign, Award, Clock, Car, Bike, Sparkles } from 'lucide-react';
import { getVehicleImageryApiUrl, getImaginStudioUrl } from '../services/vehicleImageryApi';

export default function EVCard({ ev, isCompared, onToggleCompare, onViewDetails }) {
  // Multistage fallback state for Vehicle Imagery API
  const [imgStage, setImgStage] = useState(0); 

  // Compute image sources array in order of priority:
  // 1. Official VehicleImagery.com API (https://api.vehicleimagery.com)
  // 2. ev.image property
  // 3. Official Imagin.Studio 3D Vehicle Render API
  // 4. Fallback High-Res Unsplash Vehicle Studio Photo
  const imageSources = [
    getVehicleImageryApiUrl(ev.brand, ev.name),
    ev.image,
    getImaginStudioUrl(ev.brand, ev.name),
    ev.category === '4W' 
      ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80'
  ];

  const currentImgSrc = imageSources[imgStage] || imageSources[0];

  const handleImageError = () => {
    if (imgStage < imageSources.length - 1) {
      setImgStage(prev => prev + 1);
    } else {
      setImgStage(99); // Metallic fallback state
    }
  };

  return (
    <div className="oneui-card overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
      
      {/* EV Image Container with Pill Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
        {imgStage !== 99 ? (
          <img 
            src={currentImgSrc} 
            alt={ev.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-4 text-center">
            {ev.category === '4W' ? (
              <Car className="w-12 h-12 text-indigo-400 mb-2 animate-bounce" />
            ) : (
              <Bike className="w-12 h-12 text-purple-400 mb-2 animate-bounce" />
            )}
            <span className="text-xs font-black tracking-wide text-slate-200">{ev.name}</span>
            <span className="text-[10px] text-slate-400 mt-1">{ev.brand} • {ev.bodyType}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Top Floating Pill Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="oneui-badge bg-black/60 backdrop-blur-md text-white border border-white/20">
            {ev.category === '4W' ? '🚗 4W' : '🛵 2W'} • {ev.bodyType}
          </span>
          <span className="oneui-badge bg-indigo-600/80 backdrop-blur-md text-white text-[10px] border border-indigo-400/30">
            <Sparkles className="w-2.5 h-2.5 inline mr-1" /> Vehicle API
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="oneui-badge bg-emerald-500/90 text-white shadow-lg backdrop-blur-md font-bold">
            ★ {ev.score} / 10
          </span>
        </div>

        {/* Bottom Title overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-indigo-300">
              {ev.brand}
            </p>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug drop-shadow-md">
              {ev.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Card Content & Key Spec Metrics */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Price Pill Tag */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Ex-Showroom Price
            </span>
            <span className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400">
              {ev.displayPrice}
            </span>
          </div>
          {ev.v2lSupport && (
            <span className="oneui-badge bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px]">
              <Zap className="w-3 h-3 inline" /> V2L Tech
            </span>
          )}
        </div>

        {/* Grid of 4 Key Specs Pills */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Range Pill */}
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Real Range</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                {ev.realWorldRange} km
              </span>
            </div>
          </div>

          {/* Battery Pill */}
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Battery className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Battery</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                {ev.batteryCapacity} kWh
              </span>
            </div>
          </div>

          {/* Fast Charge Pill */}
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">DC Charge</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                {ev.fastChargingTime} min
              </span>
            </div>
          </div>

          {/* Acceleration / Power Pill */}
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">0-100 km/h</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                {ev.acceleration}s
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 pt-2">
          
          {/* Add to Compare Pill Button */}
          <button
            onClick={() => onToggleCompare(ev.id)}
            className={`oneui-pill flex-1 justify-center text-xs py-2.5 font-bold transition-all ${
              isCompared 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-700' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-md shadow-indigo-600/20'
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-4 h-4 inline stroke-[3]" /> Added to Compare
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 inline" /> Compare Specs
              </>
            )}
          </button>

          {/* Quick View Button */}
          <button
            onClick={() => onViewDetails(ev)}
            className="oneui-pill p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            title="View Full Specs & Gallery"
          >
            <Eye className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
