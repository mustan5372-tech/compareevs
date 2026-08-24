import React from 'react';
import { Zap, Globe, ExternalLink, ShieldCheck, Heart, Database, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 transition-colors py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
                CompareEVs India
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Samsung One UI 9.0 Indian Automobile EV Specs Portal
              </p>
            </div>
          </div>

          {/* Quick External Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/mustan5372-tech/compareevs"
              target="_blank"
              rel="noopener noreferrer"
              className="oneui-pill text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
            >
              <Code2 className="w-4 h-4 inline" /> GitHub Repository
            </a>

            <a
              href="https://compareevs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="oneui-pill text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
            >
              <Globe className="w-4 h-4 inline" /> compareevs.vercel.app
            </a>
          </div>

        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              API Feeds Integrated
            </h4>
            <p className="leading-relaxed">
              Consolidated real-time specs data aggregated from MyNewCar API, CarDekho EV Service feeds, and Indian Automobile ARAI registry records.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Design Architecture
            </h4>
            <p className="leading-relaxed">
              Built with pure Samsung One UI 9.0 design tokens: rounded squircle containers, full pill icons, glassmorphism, dynamic side-by-side matrices, and AMOLED dark mode.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Indian EV Coverage
            </h4>
            <p className="leading-relaxed">
              Tata Motors (Nexon EV, Punch EV, Curvv EV, Tiago EV), MG Motor (Windsor, Comet, ZS), Mahindra (BE 6e, XUV400), BYD, Hyundai, Kia, BMW, Ola, Ather & TVS.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <span>© 2026 CompareEVs • Indian Automobile Electric Vehicles Platform</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-current inline" /> for Indian EV Buyers
          </span>
        </div>

      </div>
    </footer>
  );
}
