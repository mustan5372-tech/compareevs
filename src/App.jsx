import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import EVCard from './components/EVCard';
import ComparisonMatrix from './components/ComparisonMatrix';
import SavingsCalculator from './components/SavingsCalculator';
import VisualCharts from './components/VisualCharts';
import ApiInspectorModal from './components/ApiInspectorModal';
import EvDetailModal from './components/EvDetailModal';
import FloatingCompareBar from './components/FloatingCompareBar';
import Footer from './components/Footer';
import { evApi } from './services/evApi';
import { Zap, Sparkles, ArrowRight, ShieldCheck, Database, RefreshCw, Car } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedApi, setSelectedApi] = useState('all');
  
  // Compared EV IDs state (Preset with Nexon EV and MG Windsor EV for immediate preview!)
  const [comparedIds, setComparedIds] = useState(['tata-nexon-ev', 'mg-windsor-ev', 'mahindra-be-6e']);
  
  // Modals state
  const [selectedEvForModal, setSelectedEvForModal] = useState(null);
  const [isApiInspectorOpen, setIsApiInspectorOpen] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    category: 'all',
    bodyType: 'all',
    search: '',
    sortBy: 'score-high',
    maxPrice: 8000000,
    minRange: 0
  });

  // EV List state from API
  const [evList, setEvList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Apply dark mode class to <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync API Service source & Fetch EVs
  useEffect(() => {
    const fetchEvs = async () => {
      setLoading(true);
      evApi.setSource(selectedApi);
      const res = await evApi.getAllEvs(filters);
      setEvList(res.data);
      setLoading(false);
    };

    fetchEvs();
  }, [filters, selectedApi]);

  // Toggle vehicle in comparison list
  const handleToggleCompare = (id) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter(i => i !== id));
    } else {
      if (comparedIds.length >= 4) {
        alert("You can compare up to 4 EVs side by side.");
        return;
      }
      setComparedIds([...comparedIds, id]);
    }
  };

  const handleRemoveCompare = (id) => {
    setComparedIds(comparedIds.filter(i => i !== id));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      bodyType: 'all',
      search: '',
      sortBy: 'score-high',
      maxPrice: 8000000,
      minRange: 0
    });
  };

  const comparedEvs = evList.filter(ev => comparedIds.includes(ev.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-[#06080D] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* One UI Glass Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedApi={selectedApi}
        setSelectedApi={setSelectedApi}
        onOpenApiInspector={() => setIsApiInspectorOpen(true)}
        comparedCount={comparedIds.length}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8">
        
        {/* SAMSUNG ONE UI HERO HEADER SECTION (Shows on Catalog Tab) */}
        {activeTab === 'catalog' && (
          <div className="relative overflow-hidden oneui-card p-6 sm:p-10 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white border-indigo-500/20 shadow-2xl">
            
            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img 
                src="/hero-ev.png" 
                alt="Electric Vehicles"
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" /> Samsung One UI 9.0 EV Portal
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                Compare Every Electric Vehicle in India Side by Side.
              </h2>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Real-world range, DC fast charging speeds, battery chemistry, ex-showroom & on-road pricing aggregated from MyNewCar & CarDekho API feeds.
              </p>

              {/* Quick Hero Action Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('compare')}
                  className="oneui-pill active text-xs sm:text-sm py-3 px-6 shadow-xl shadow-indigo-500/30 font-bold"
                >
                  <Zap className="w-4 h-4 inline mr-2" /> Launch Side-by-Side Matrix ({comparedIds.length})
                </button>

                <button
                  onClick={() => setIsApiInspectorOpen(true)}
                  className="oneui-pill text-xs sm:text-sm py-3 px-5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20"
                >
                  <Database className="w-4 h-4 inline mr-2 text-emerald-400" /> MyNewCar & CarDekho API Live
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 1: EV CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              selectedApi={selectedApi}
              setSelectedApi={setSelectedApi}
              onResetFilters={handleResetFilters}
              totalResults={evList.length}
            />

            {/* EV Grid */}
            {loading ? (
              <div className="py-20 text-center space-y-4">
                <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
                <p className="text-xs text-slate-400 font-semibold">Fetching latest specs from API feed...</p>
              </div>
            ) : evList.length === 0 ? (
              <div className="oneui-card p-12 text-center space-y-4">
                <Car className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No EVs match your current filters</h3>
                <button 
                  onClick={handleResetFilters}
                  className="oneui-pill active text-xs py-2 px-4"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {evList.map(ev => (
                  <EVCard
                    key={ev.id}
                    ev={ev}
                    isCompared={comparedIds.includes(ev.id)}
                    onToggleCompare={handleToggleCompare}
                    onViewDetails={(selected) => setSelectedEvForModal(selected)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: SIDE-BY-SIDE MATRIX VIEW */}
        {activeTab === 'compare' && (
          <ComparisonMatrix
            comparedEvs={comparedEvs}
            allEvs={evList}
            onRemoveEv={handleRemoveCompare}
            onAddEv={(id) => setComparedIds([...comparedIds, id])}
            onOpenSelector={() => setActiveTab('catalog')}
            onViewDetails={(selected) => setSelectedEvForModal(selected)}
          />
        )}

        {/* TAB 3: FUEL SAVINGS CALCULATOR VIEW */}
        {activeTab === 'savings' && (
          <SavingsCalculator />
        )}

        {/* TAB 4: VISUAL ANALYTICS CHARTS */}
        {activeTab === 'charts' && (
          <VisualCharts evList={evList} />
        )}

      </main>

      {/* Floating Bottom Compare Bar */}
      <FloatingCompareBar
        comparedEvs={comparedEvs}
        onRemove={handleRemoveCompare}
        onCompareNow={() => setActiveTab('compare')}
        onClearAll={() => setComparedIds([])}
      />

      {/* Detail Specs Modal */}
      <EvDetailModal
        ev={selectedEvForModal}
        isOpen={Boolean(selectedEvForModal)}
        onClose={() => setSelectedEvForModal(null)}
        isCompared={selectedEvForModal ? comparedIds.includes(selectedEvForModal.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* API Inspector Modal */}
      <ApiInspectorModal
        isOpen={isApiInspectorOpen}
        onClose={() => setIsApiInspectorOpen(false)}
        selectedApi={selectedApi}
        setSelectedApi={setSelectedApi}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
