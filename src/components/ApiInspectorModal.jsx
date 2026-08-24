import React, { useState } from 'react';
import { X, Database, Check, Copy, Terminal, ExternalLink, RefreshCw } from 'lucide-react';
import { evApi } from '../services/evApi';

export default function ApiInspectorModal({ isOpen, onClose, selectedApi, setSelectedApi }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const apiResponse = evApi.getLastApiResponse() || {
    status: 200,
    source: selectedApi,
    endpoint: "https://api.mynewcar.in/v2/ev/specs",
    requestTimeMs: 32,
    timestamp: new Date().toISOString(),
    samplePayload: [
      { id: "tata-nexon-ev", name: "Tata Nexon EV", price: "₹14.49 Lakh", api_ref: "MNC-TATA-NXEV-2025" },
      { id: "mg-windsor-ev", name: "MG Windsor EV", price: "₹13.49 Lakh", api_ref: "CD-MG-WINDSOR-EV" }
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="oneui-card w-full max-w-2xl overflow-hidden bg-slate-900 border-slate-700 text-white shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                Live EV Specs API Inspector
                <span className="oneui-badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                  200 OK
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Simulated Feeds: MyNewCar API & CarDekho EV Data Integration
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Switcher Row */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-400 font-semibold">Active Feed:</span>
            <select
              value={selectedApi}
              onChange={(e) => setSelectedApi(e.target.value)}
              className="bg-slate-800 text-emerald-400 border border-slate-700 rounded-full px-3 py-1 font-bold outline-none"
            >
              <option value="all">🌐 Consolidated MyNewCar + CarDekho API</option>
              <option value="mynewcar">🚗 MyNewCar EV Endpoint (v2)</option>
              <option value="cardekho">⚡ CarDekho EV Catalog Service</option>
            </select>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span>Latency: <strong className="text-emerald-400">{apiResponse.requestTimeMs}ms</strong></span>
            <span>Ref: <strong className="text-indigo-400">REST JSON</strong></span>
          </div>
        </div>

        {/* JSON Code Viewer Container */}
        <div className="p-4 flex-1 overflow-y-auto font-mono text-xs bg-slate-950 text-slate-300">
          <div className="mb-2 text-indigo-400 font-bold flex items-center justify-between">
            <span>GET {apiResponse.endpoint}</span>
            <button
              onClick={handleCopy}
              className="oneui-pill text-[10px] py-1 px-3 bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              {copied ? <Check className="w-3 h-3 inline text-emerald-400" /> : <Copy className="w-3 h-3 inline" />}
              {copied ? ' Copied JSON' : ' Copy Response'}
            </button>
          </div>

          <pre className="p-3 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto text-[11px] leading-relaxed text-emerald-300">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-emerald-400" /> Live Data Stream Active
          </span>
          <button
            onClick={onClose}
            className="oneui-pill active py-2 px-5 text-xs"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
