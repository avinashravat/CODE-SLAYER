import React from 'react';
import { Code2, Sparkles, Activity, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenSaved: () => void;
  savedCount: number;
  currentView: 'landing' | 'dashboard' | 'analytics';
  setView: (view: 'landing' | 'dashboard' | 'analytics') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSaved, 
  savedCount, 
  currentView, 
  setView 
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Area */}
        <div 
          onClick={() => setView('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            <div className="relative bg-slate-900 p-2 rounded-lg border border-slate-700">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-slate-100 font-['Orbitron']">
                CODE-SLAYER
              </span>
              <span className="text-[10px] bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-widest">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-1 hidden sm:block italic">
              By <span className="font-['Pacifico'] text-purple-300 text-xs tracking-wide">Avinash Ravat</span>
            </p>
          </div>
        </div>

        {/* Center Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-slate-800">
          <button 
            onClick={() => setView('landing')} 
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentView === 'landing' 
                ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setView('dashboard')} 
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'dashboard' 
                ? 'bg-gradient-to-r from-cyan-600/30 to-purple-600/30 text-cyan-300 border border-cyan-500/30 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            Studio
          </button>
          <button 
            onClick={() => setView('analytics')} 
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'analytics' 
                ? 'bg-slate-800 text-purple-400 shadow-sm border border-slate-700' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3 h-3 text-green-400" />
            GA Live Stats
          </button>
        </nav>

        {/* Right CTA / Counters */}
        <div className="flex items-center gap-3">
          {/* Saved Items badge */}
          {currentView === 'dashboard' && (
            <button 
              onClick={onOpenSaved}
              className="relative bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-2 transition"
              title="View LocalStorage Saved Visuals"
            >
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">Saved Designs</span>
              {savedCount > 0 && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          {/* Quick Stats Pill */}
          <div 
            onClick={() => setView('analytics')}
            className="hidden lg:flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1 rounded-lg cursor-pointer hover:border-slate-700 transition"
            title="Google Analytics Tracking active"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Live: <strong className="text-green-400">34</strong>
            </span>
          </div>

          {/* Mobile view trigger */}
          {currentView !== 'dashboard' ? (
            <button
              onClick={() => setView('dashboard')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-xs px-3.5 py-2 rounded-lg shadow-md hover:opacity-95 transition flex items-center gap-1.5"
            >
              <span>Launch</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="text-xs font-mono text-purple-400 px-2 py-1 bg-purple-950/40 rounded border border-purple-800/40 hidden sm:block">
              AI Code Studio
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
