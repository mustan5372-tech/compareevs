import React from 'react';
import { Zap, X, ArrowRight, Trash2 } from 'lucide-react';

export default function FloatingCompareBar({ comparedEvs, onRemove, onCompareNow, onClearAll }) {
  if (comparedEvs.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl animate-bounce-short">
      <div className="oneui-card p-3 sm:p-4 bg-slate-900/90 text-white backdrop-blur-xl border-slate-700 shadow-2xl flex items-center justify-between gap-3">
        
        {/* Thumbnails of selected EVs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 hidden sm:inline shrink-0">
            Comparing ({comparedEvs.length}/4):
          </span>

          {comparedEvs.map(ev => (
            <div 
              key={ev.id} 
              className="relative shrink-0 flex items-center gap-1.5 bg-slate-800/90 pr-2 pl-1 py-1 rounded-full border border-slate-700"
            >
              <img 
                src={ev.image} 
                alt={ev.name} 
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-[11px] font-bold max-w-[80px] sm:max-w-[110px] truncate">
                {ev.name}
              </span>
              <button 
                onClick={() => onRemove(ev.id)}
                className="text-slate-400 hover:text-red-400 ml-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {comparedEvs.length < 4 && (
            <span className="text-[10px] text-slate-500 shrink-0 italic hidden md:inline">
              + Add {4 - comparedEvs.length} more
            </span>
          )}
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={onCompareNow}
            className="oneui-pill active text-xs py-2 px-4 shadow-lg shadow-indigo-500/30 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Zap className="w-4 h-4" />
            Compare ({comparedEvs.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
