import React from 'react';
import { Zap, Moon, Sun, Database, GitBranch, ArrowRight, ShieldCheck, Car, Bike, Sparkles } from 'lucide-react';
import { API_SOURCES } from '../services/evApi';

export default function Header({ 
  darkMode, 
  setDarkMode, 
  activeTab, 
  setActiveTab, 
  selectedApi, 
  setSelectedApi, 
  onOpenApiInspector,
  comparedCount 
}) {
  return (
    <header className="oneui-header sticky top-0 z-40 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand - Samsung One UI Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Zap className="w-6 h-6 fill-current text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
                  CompareEVs
                </h1>
                <span className="oneui-badge bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  One UI 9.0
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Indian Automobile Market • MyNewCar & CarDekho Feeds
              </p>
            </div>
          </div>

          {/* Mobile Dark Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="oneui-pill p-2 text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Center Pill Navigation Bar */}
        <nav className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-800/60 p-1.5 rounded-full overflow-x-auto max-w-full no-scrollbar">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`oneui-pill text-xs md:text-sm py-2 px-4 whitespace-nowrap transition-all ${
              activeTab === 'catalog' ? 'active' : ''
            }`}
          >
            <Car className="w-4 h-4 inline mr-1" /> EV Catalog
          </button>
          
          <button
            onClick={() => setActiveTab('compare')}
            className={`oneui-pill text-xs md:text-sm py-2 px-4 whitespace-nowrap transition-all relative ${
              activeTab === 'compare' ? 'active' : ''
            }`}
          >
            <Zap className="w-4 h-4 inline mr-1" /> Side-by-Side Matrix
            {comparedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-white text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 rounded-full font-bold">
                {comparedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('savings')}
            className={`oneui-pill text-xs md:text-sm py-2 px-4 whitespace-nowrap transition-all ${
              activeTab === 'savings' ? 'active' : ''
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-1" /> Fuel Savings
          </button>

          <button
            onClick={() => setActiveTab('charts')}
            className={`oneui-pill text-xs md:text-sm py-2 px-4 whitespace-nowrap transition-all ${
              activeTab === 'charts' ? 'active' : ''
            }`}
          >
            Visual Analytics
          </button>
        </nav>

        {/* Right Tools & API Source Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* API Inspector Button */}
          <button
            onClick={onOpenApiInspector}
            className="oneui-pill text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Database className="w-3.5 h-3.5" />
            API Feeds Live
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="oneui-pill p-2.5 text-slate-700 dark:text-slate-200"
            title="Toggle Light/Dark AMOLED Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>

      </div>
    </header>
  );
}
