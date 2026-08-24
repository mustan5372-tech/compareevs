import React from 'react';
import { Search, Filter, SlidersHorizontal, Car, Bike, Sparkles, RefreshCw } from 'lucide-react';
import { API_SOURCES } from '../services/evApi';

export default function FilterBar({ 
  filters, 
  setFilters, 
  selectedApi, 
  setSelectedApi, 
  onResetFilters,
  totalResults 
}) {
  return (
    <div className="oneui-card p-5 mb-8">
      
      {/* Top Bar: Search & Category Toggle */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-5">
        
        {/* Category Selector Pills (4W / 2W / All) */}
        <div className="flex items-center gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-full w-full lg:w-auto">
          <button
            onClick={() => setFilters({ ...filters, category: 'all', bodyType: 'all' })}
            className={`oneui-pill text-xs font-bold py-2 px-4 flex-1 lg:flex-initial text-center ${
              filters.category === 'all' ? 'active' : ''
            }`}
          >
            All EVs ({totalResults})
          </button>

          <button
            onClick={() => setFilters({ ...filters, category: '4W', bodyType: 'all' })}
            className={`oneui-pill text-xs font-bold py-2 px-4 flex-1 lg:flex-initial text-center ${
              filters.category === '4W' ? 'active' : ''
            }`}
          >
            <Car className="w-4 h-4 inline mr-1.5" /> 4W Cars
          </button>

          <button
            onClick={() => setFilters({ ...filters, category: '2W', bodyType: 'all' })}
            className={`oneui-pill text-xs font-bold py-2 px-4 flex-1 lg:flex-initial text-center ${
              filters.category === '2W' ? 'active' : ''
            }`}
          >
            <Bike className="w-4 h-4 inline mr-1.5" /> 2W Scooters
          </button>
        </div>

        {/* Search Input Pill */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Nexon, BE 6e, Windsor, Seal, Curvv..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="oneui-input w-full pl-11 pr-4 text-xs md:text-sm"
          />
          {filters.search && (
            <button 
              onClick={() => setFilters({ ...filters, search: '' })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* API Feed Source Pill Dropdown */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-400 hidden xl:inline">Data Source:</span>
          <select
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
            className="oneui-input text-xs font-bold cursor-pointer py-2 px-4 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20"
          >
            <option value="all">🌐 Consolidated Multi-API Feed</option>
            <option value="carwale">🚘 CarWale EV API</option>
            <option value="zyla">⚡ Zyla Indian EV Dataset</option>
            <option value="carapis">🚗 Carapis API Feed</option>
            <option value="mynewcar">🏎️ MyNewCar API Endpoint</option>
            <option value="cardekho">🚙 CarDekho EV Service</option>
          </select>
        </div>

      </div>

      {/* Secondary Row: Quick Body Type Pills & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        
        {/* Body Type Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Body:</span>
          
          {['all', 'SUV', 'Sedan', 'Hatchback', 'Crossover', 'Scooter'].map(type => (
            <button
              key={type}
              onClick={() => setFilters({ ...filters, bodyType: type })}
              className={`oneui-pill text-xs py-1.5 px-3 capitalize ${
                filters.bodyType === type 
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {type === 'all' ? 'All Styles' : type}
            </button>
          ))}
        </div>

        {/* Sorting & Filter Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="oneui-input text-xs font-semibold py-1.5 px-3"
            >
              <option value="score-high">Top EV Rating ⭐</option>
              <option value="range-high">Highest Range (km)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="accel-fast">0-100 Acceleration</option>
            </select>
          </div>

          <button
            onClick={onResetFilters}
            className="oneui-pill text-xs py-1.5 px-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            title="Reset All Filters"
          >
            <RefreshCw className="w-3.5 h-3.5 inline mr-1" /> Reset
          </button>
        </div>

      </div>

    </div>
  );
}
