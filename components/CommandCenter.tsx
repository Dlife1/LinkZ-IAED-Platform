
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Metrics } from '../types';
import { TrendingUp, Users, Wallet, CheckCircle2, AlertCircle, Zap, ShieldCheck, Activity } from 'lucide-react';

const velocityData = [
  { name: '00:00', val: 4000 },
  { name: '04:00', val: 3000 },
  { name: '08:00', val: 5000 },
  { name: '12:00', val: 4500 },
  { name: '16:00', val: 6500 },
  { name: '20:00', val: 5800 },
  { name: '23:59', val: 7200 },
];

const healthData = [
  { name: '00:00', synergy: 82, stability: 99.8 },
  { name: '04:00', synergy: 85, stability: 99.7 },
  { name: '08:00', synergy: 80, stability: 99.9 },
  { name: '12:00', synergy: 88, stability: 99.8 },
  { name: '16:00', synergy: 92, stability: 99.6 },
  { name: '20:00', synergy: 85, stability: 99.9 },
  { name: '23:59', synergy: 90, stability: 99.8 },
];

interface Props {
  metrics: Metrics;
}

const CommandCenter: React.FC<Props> = ({ metrics }) => {
  const [announcement, setAnnouncement] = useState('');

  // Announce major metric milestones to screen readers
  useEffect(() => {
    if (metrics.totalStreams % 1000 < 50) {
      setAnnouncement(`Total streams updated to ${metrics.totalStreams.toLocaleString()}`);
    }
  }, [metrics.totalStreams]);

  const cards = [
    { label: 'Active Releases', val: metrics.activeReleases, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10', description: 'Total number of live distribution campaigns' },
    { label: 'Total Streams', val: metrics.totalStreams.toLocaleString(), icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10', description: 'Aggregated playback count across all global DSPs' },
    { label: 'Equity Value', val: `$${(metrics.equityValue / 1000).toFixed(1)}k`, icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-500/10', description: 'Calculated financial value of artist rights and equity' },
    { label: 'Verified Nodes', val: metrics.blockchainVerified, icon: CheckCircle2, color: 'text-amber-500', bg: 'bg-amber-500/10', description: 'Cryptographic proof-of-distribution nodes active' },
    { label: 'Synergy Score', val: `${metrics.synergyScore}%`, icon: Zap, color: 'text-pink-500', bg: 'bg-pink-500/10', description: 'AI-calculated alignment of asset metadata and market demand' },
    { label: 'CLS Stability', val: (1 - metrics.clsScore).toFixed(4), icon: ShieldCheck, color: 'text-orange-500', bg: 'bg-orange-500/10', description: 'Protocol stability index (Cumulative Logic Stability)' },
  ];

  return (
    <div 
      className="space-y-8 animate-in fade-in duration-500" 
      role="region" 
      aria-label="Dashboard Command Center"
    >
      {/* Screen Reader Announcements */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className="bg-[#121214] border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors focus-within:ring-2 focus-within:ring-blue-500/50 outline-none"
            role="group"
            aria-labelledby={`card-label-${idx}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${card.bg}`} aria-hidden="true">
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter" aria-label="Status: Live Update">Live</span>
            </div>
            <div className="space-y-1">
              <div 
                id={`card-val-${idx}`} 
                className="text-2xl font-bold text-white tracking-tight"
                aria-label={`${card.label} is ${card.val}`}
              >
                {card.val}
              </div>
              <div 
                id={`card-label-${idx}`} 
                className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest"
              >
                {card.label}
              </div>
              <p className="sr-only">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl" role="region" aria-label="Streaming Performance Chart">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Stream Velocity</h3>
              <p className="text-sm text-zinc-500">Real-time aggregate playback performance</p>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-mono rounded-full uppercase">Global_Live</div>
            </div>
          </div>
          
          <div className="h-[300px] w-full" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl" role="region" aria-label="Ecosystem Health Chart">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Protocol Health</h3>
              <p className="text-sm text-zinc-500">Neural Synergy & Logic Stability metrics</p>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-pink-600/10 border border-pink-600/20 text-pink-400 text-[10px] font-mono rounded-full uppercase">Neural_Sync</div>
            </div>
          </div>
          
          <div className="h-[300px] w-full" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} domain={[99, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="synergy" stroke="#ec4899" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="stability" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex items-start gap-4">
        <Activity className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div>
          <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">Autonomous Oversight Engine</h4>
          <p className="text-xs text-zinc-500 leading-relaxed mt-1">
            Gresham Protocol's IAED engine continuously monitors ecosystem metrics. <span className="text-pink-400 font-bold">Synergy Score</span> represents the alignment of deployed assets with current market liquidity nodes, while <span className="text-orange-400 font-bold">CLS Stability</span> tracks Cumulative Logic Stability across decentralized distribution clusters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
