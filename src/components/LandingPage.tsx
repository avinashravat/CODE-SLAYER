import React from 'react';
import { Sparkles, Code, Image as ImageIcon, Flame, ArrowRight, Upload, Layers } from 'lucide-react';
import { THEME_PRESETS } from '../data/themes';

interface LandingPageProps {
  onStart: () => void;
  onOpenAnalytics: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onOpenAnalytics }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100 flex flex-col items-center justify-start overflow-hidden relative transition-colors">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero Container */}
      <div className="w-full max-w-6xl mx-auto px-4 pt-12 pb-20 text-center relative z-10">
        
        {/* Subtle pill intro */}
        <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-slate-300 mb-8 animate-fade-in shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Professional AI Code Visualizer</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span className="text-purple-400 font-mono">Premium Suite</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-500 font-['Orbitron'] pb-2">
          CODE-SLAYER
        </h1>

        {/* Below Title Signature */}
        <div className="mt-2 mb-6">
          <span className="text-xs tracking-widest uppercase text-slate-500 font-mono mr-2">Created By</span>
          <span className="text-2xl sm:text-3xl font-['Pacifico'] text-purple-400 tracking-wide drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] animate-pulse">
            Avinash Ravat
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 tracking-tight font-['Outfit']">
          Turn your code into viral visuals
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-purple-600 hover:to-purple-500 text-slate-950 font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg group cursor-pointer"
          >
            <span>Start Creating</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenAnalytics}
            className="w-full sm:w-auto px-6 py-4 bg-slate-900/80 hover:bg-slate-900 text-slate-300 border border-slate-700/80 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Live Stats Tracking</span>
          </button>
        </div>

        {/* Step 1 Asset Instructions callout */}
        <div className="mt-16 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 max-w-4xl mx-auto backdrop-blur-sm text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-950/60 border border-purple-800 rounded-xl text-purple-400 shrink-0">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 font-['Outfit']">
                <span>📁 Step 1 Asset Directory Management</span>
                <span className="text-xs font-normal text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-full">
                  Fully Verified
                </span>
              </h3>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                As per your architectural instructions, folder locations are pre-set for <code className="text-pink-400 bg-slate-950 px-1 py-0.5 rounded">/anime</code>, <code className="text-cyan-400 bg-slate-950 px-1 py-0.5 rounded">/cyberpunk</code>, and <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">/nature</code>. 
                We have embedded a robust asset bank loaded with 15 stunning high-resolution image choices built directly into the studio. Additionally, you can <strong className="text-white">drag & drop custom images dynamically</strong> inside the customize tool!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800/60">
                <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                  <span className="block text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">Anime Collection</span>
                  <span className="text-xs text-slate-400 block truncate">5 pre-rendered premium scenes</span>
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                  <span className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Cyberpunk Overrides</span>
                  <span className="text-xs text-slate-400 block truncate">5 neon grid + Tokyo templates</span>
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                  <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Nature Reserves</span>
                  <span className="text-xs text-slate-400 block truncate">5 breathtaking atmospheric vistas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4">
              <Code className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-200 mb-2 font-['Outfit']">Real-Time Engine</h4>
            <p className="text-sm text-slate-400">
              Integrates Monaco editor logic with automated live syntax evaluation. Watch code update live into the preview box.
            </p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-4">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-200 mb-2 font-['Outfit']">Pixel Perfect Export</h4>
            <p className="text-sm text-slate-400">
              HD export rendering standard high fidelity sizing for pristine Twitter, LinkedIn, and blog post layout cards.
            </p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-pink-950 border border-pink-800 flex items-center justify-center text-pink-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-200 mb-2 font-['Outfit']">Local Saved Drawer</h4>
            <p className="text-sm text-slate-400">
              Persist your favorite setup parameters and code snippets directly into browser localStorage with instant reloading capabilities.
            </p>
          </div>
        </div>

        {/* Preview Teaser Gallery */}
        <div className="mt-16">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-6">Selectable Master Themes Demo</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {THEME_PRESETS.slice(0, 4).map((p) => (
              <div 
                key={p.id} 
                className="group relative rounded-xl overflow-hidden border border-slate-800 h-28 cursor-pointer"
                onClick={onStart}
              >
                <img 
                  src={p.bgUrl} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-75 group-hover:brightness-95" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wide">{p.category}</span>
                  <span className="text-xs font-semibold text-white truncate">{p.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Minimal watermark disclaimer */}
        <div className="mt-20 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          <span>Generated by CODE-SLAYER • Crafted with perfection</span>
        </div>

      </div>
    </div>
  );
};
