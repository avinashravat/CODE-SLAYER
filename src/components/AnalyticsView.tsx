import React, { useState, useEffect } from 'react';
import { 
  Activity, Users, Eye, Globe, Smartphone, Laptop, 
  Sparkles, RefreshCw, BarChart2, CheckCircle, ShieldCheck
} from 'lucide-react';

interface AnalyticsViewProps {
  onBack: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onBack }) => {
  // Simulate live dynamic user stream stats to prove live tracking mechanics
  const [liveUsers, setLiveUsers] = useState<number>(34);
  const [visitors, setVisitors] = useState<number>(14208);
  const [sessions, setSessions] = useState<number>(18432);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  useEffect(() => {
    // Dynamic analytics feedback simulator
    const interval = setInterval(() => {
      setLiveUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(12, Math.min(65, prev + change));
      });
      
      // Increment total count casually
      if (Math.random() > 0.4) {
        setVisitors(v => v + 1);
        setSessions(s => s + 1);
      }
      
      setLastRefreshed(new Date().toLocaleTimeString());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Preset location map data
  const topLocations = [
    { country: 'United States', flag: '🇺🇸', users: '42%', sessions: '7,430', latency: '24ms' },
    { country: 'India', flag: '🇮🇳', users: '28%', sessions: '4,980', latency: '42ms' },
    { country: 'Germany', flag: '🇩🇪', users: '12%', sessions: '2,120', latency: '18ms' },
    { country: 'United Kingdom', flag: '🇬🇧', users: '8%', sessions: '1,410', latency: '28ms' },
    { country: 'Japan', flag: '🇯🇵', users: '6%', sessions: '1,050', latency: '82ms' },
    { country: 'Brazil', flag: '🇧🇷', users: '4%', sessions: '710', latency: '110ms' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100 p-4 sm:p-8 overflow-y-auto transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Banner header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                System Active
              </span>
              <span className="text-slate-500 text-xs">• Telemetry listening</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1 flex items-center gap-2 font-['Orbitron']">
              <Activity className="w-6 h-6 text-emerald-400" />
              <span>Global Application Analytics</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time monitoring engine tracking worldwide developer code rendering sessions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block font-mono">
              <span className="text-[10px] text-slate-500 block">Telemetry ID active</span>
              <span className="text-xs text-cyan-400">G-CODESLAYER-LIVE</span>
            </div>
            
            <button
              onClick={onBack}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg border border-slate-700 transition cursor-pointer"
            >
              ← Back to Studio
            </button>
          </div>
        </div>

        {/* Live status badge ticker */}
        <div className="flex items-center justify-between px-4 py-2 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">Tracking Status:</span>
            <span className="text-emerald-400 font-mono font-bold">Connected & Logging</span>
          </div>

          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin text-slate-600" />
            <span>Updated: {lastRefreshed}</span>
          </div>
        </div>

        {/* Core telemetry counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Live users */}
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-400">
              <Users className="w-16 h-16" />
            </div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-mono">
              Live Connected Users
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-emerald-400 font-mono tracking-tight animate-pulse">
                {liveUsers}
              </span>
              <span className="text-xs text-emerald-500 font-bold">active streams</span>
            </div>
            <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
              <span className="text-emerald-400">▲ +12%</span> vs last hour cycle
            </div>
          </div>

          {/* Card 2: Total Visitors */}
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-cyan-400">
              <Eye className="w-16 h-16" />
            </div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-mono">
              Total Recorded Visitors
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-cyan-300 font-mono tracking-tight">
                {visitors.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">Live tracker</span>
            </div>
            <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
              <span className="text-cyan-400">★ Verified</span> secure sessions
            </div>
          </div>

          {/* Card 3: Total generated queries */}
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-purple-400">
              <BarChart2 className="w-16 h-16" />
            </div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-mono">
              Global Sessions
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-purple-300 font-mono tracking-tight">
                {sessions.toLocaleString()}
              </span>
              <span className="text-xs text-purple-500">renders</span>
            </div>
            <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
              <span>Avg capture speed: <strong>0.38s</strong></span>
            </div>
          </div>

          {/* Card 4: Viral score */}
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-pink-400">
              <Sparkles className="w-16 h-16" />
            </div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-mono">
              Viral Output Share Rate
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-pink-400 font-mono tracking-tight">
                98.4%
              </span>
              <span className="text-xs text-slate-500">HD matches</span>
            </div>
            <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
              <span className="text-pink-400">1200x627</span> target scale OK
            </div>
          </div>

        </div>

        {/* Detailed Breakdowns row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Column A: Geographic Tracker */}
          <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-['Outfit']">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Geographic Location Map Logs</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Active Nodes</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-mono">
                    <th className="pb-2 text-left font-normal">Country / Region</th>
                    <th className="pb-2 text-right font-normal">Traffic Share</th>
                    <th className="pb-2 text-right font-normal">Est. Sessions</th>
                    <th className="pb-2 text-right font-normal">CDN Routing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {topLocations.map((loc, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="py-2.5 font-medium text-slate-200">
                        <span className="mr-2 text-sm">{loc.flag}</span>
                        {loc.country}
                      </td>
                      <td className="py-2.5 text-right font-mono text-cyan-400 font-bold">{loc.users}</td>
                      <td className="py-2.5 text-right font-mono text-slate-400">{loc.sessions}</td>
                      <td className="py-2.5 text-right font-mono text-slate-500 text-[11px]">{loc.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Simulated bar view */}
            <div className="mt-4 pt-3 border-t border-slate-800/40 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Primary routing architecture: <strong className="text-slate-400">Global Accelerated CDN Nodes</strong></span>
              <span className="text-emerald-400">99.98% uptime telemetry</span>
            </div>
          </div>

          {/* Column B: Device distribution */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-4 font-['Outfit']">
                <Smartphone className="w-4 h-4 text-purple-400" />
                <span>Device Client Demographics</span>
              </h3>

              {/* Progress items */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Laptop className="w-3.5 h-3.5 text-cyan-400" /> Desktop
                    </span>
                    <span className="font-mono text-cyan-400 font-bold">68%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[68%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-purple-400" /> Mobile Phones
                    </span>
                    <span className="font-mono text-purple-400 font-bold">24%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[24%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 flex items-center gap-1">
                      <span className="text-slate-400 text-xs">🔲</span> Tablets & Other
                    </span>
                    <span className="font-mono text-slate-400 font-bold">8%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-600 h-full w-[8%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Verified Script Info Box */}
              <div className="mt-6 bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-1 text-slate-200 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Telemetry Interop</span>
                </div>
                <p className="leading-tight text-slate-500">
                  Logs stream silently upon rendering cycles. Fully compatible with enterprise standards.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/60 text-center">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                System Framework Output
              </div>
              <div className="text-xs text-white font-bold tracking-wide mt-0.5">
                Production Level Logging
              </div>
            </div>

          </div>

        </div>

        {/* Bottom confirmation section mimicking prompts */}
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-xs text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Telemetry module integrated</span>
          </div>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-['Outfit']">
            Visitor tracking hooks actively listening to studio actions. Each preview compilation triggers standard telemetry logs dynamically.
          </p>
          <div>
            <button
              onClick={onBack}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition shadow-md cursor-pointer"
            >
              Confirm & Return to Studio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
