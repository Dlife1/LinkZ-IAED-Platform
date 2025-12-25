
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Shield, Globe, DollarSign, ArrowUpRight, Lock, CheckCircle, Clock } from 'lucide-react';

const ownershipData = [
  { name: 'Artist Equity', value: 70, color: '#3b82f6' },
  { name: 'Producer Pool', value: 15, color: '#8b5cf6' },
  { name: 'LinkZ IAED Fund', value: 10, color: '#10b981' },
  { name: 'Marketing DAO', value: 5, color: '#f59e0b' },
];

const RightsManagement: React.FC = () => {
  const [payouts, setPayouts] = useState<{ id: string, amount: string, territory: string, time: string }[]>([]);
  const [totalEquity, setTotalEquity] = useState(145820.45);

  useEffect(() => {
    const territories = ['US', 'EU', 'JP', 'BR', 'AU', 'KR', 'GB'];
    const interval = setInterval(() => {
      const newPayout = {
        id: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        amount: (Math.random() * 15).toFixed(4),
        territory: territories[Math.floor(Math.random() * territories.length)],
        time: new Date().toLocaleTimeString(),
      };
      setPayouts(prev => [newPayout, ...prev].slice(0, 10));
      setTotalEquity(prev => prev + parseFloat(newPayout.amount));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Total Equity Value</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tighter">
            ${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +14.2% (24h)
          </div>
        </div>

        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Protection Status</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tighter">Active</div>
          <div className="mt-2 text-zinc-500 text-xs">ISRC/ISWC Cross-Verification: <span className="text-emerald-500">Passed</span></div>
        </div>

        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Territories Claimed</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tighter">192 / 195</div>
          <div className="mt-2 text-zinc-500 text-sm">GEMA/SGAE pending verification</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Licensing Inventory */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-lg">Licensing & Rights Hub</h3>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] text-zinc-400 font-mono">AP2_PROTOCOL_v4</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/50 border-b border-zinc-800 text-[10px] text-zinc-500 uppercase font-mono tracking-widest">
                    <th className="p-4">Type</th>
                    <th className="p-4">Track / Release</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Yield (24h)</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { type: 'Mechanical', title: 'Neon Vanguard', status: 'COLLECTING', yield: '+$42.10', icon: CheckCircle, color: 'text-emerald-500' },
                    { type: 'Sync', title: 'Cyber City Night', status: 'PENDING_TX', yield: '--', icon: Clock, color: 'text-amber-500' },
                    { type: 'Performance', title: 'Concrete Jungle', status: 'VERIFIED', yield: '+$12.04', icon: CheckCircle, color: 'text-emerald-500' },
                    { type: 'Neighboring', title: 'Global Echo', status: 'LOCKED', yield: '--', icon: Lock, color: 'text-zinc-600' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/20 transition-colors">
                      <td className="p-4 font-bold text-zinc-400">{row.type}</td>
                      <td className="p-4 text-zinc-200">{row.title}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <row.icon className={`w-4 h-4 ${row.color}`} />
                          <span className="text-xs font-mono">{row.status}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-emerald-400">{row.yield}</td>
                      <td className="p-4 text-right">
                        <button className="text-[10px] text-blue-500 font-bold hover:underline">AUDIT</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Royalty Feed */}
          <div className="bg-black border border-zinc-800 rounded-3xl p-6 font-mono text-xs">
            <div className="flex items-center gap-2 mb-4 text-zinc-500 uppercase tracking-widest text-[10px]">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
              Live Royalty Ingestion Stream
            </div>
            <div className="space-y-2">
              {payouts.map((p) => (
                <div key={p.id} className="flex justify-between items-center py-1 border-b border-zinc-900 animate-in fade-in slide-in-from-top">
                  <div className="flex gap-4">
                    <span className="text-zinc-600">[{p.time}]</span>
                    <span className="text-blue-400 font-bold">{p.id}</span>
                    <span className="text-zinc-500">Ingested from <span className="text-zinc-300">Region_{p.territory}</span></span>
                  </div>
                  <span className="text-emerald-500 font-bold">+${p.amount}</span>
                </div>
              ))}
              {payouts.length === 0 && <div className="text-zinc-700 italic">Listening for micro-payouts on AP2 Protocol...</div>}
            </div>
          </div>
        </div>

        {/* Ownership Split */}
        <div className="space-y-6">
          <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl h-full flex flex-col">
            <h3 className="font-bold text-lg mb-8">IAED Equity Split</h3>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ownershipData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ownershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="text-xs text-zinc-500 mb-2 uppercase font-mono tracking-widest">Smart Contract Info</div>
              <div className="text-sm font-mono text-zinc-300 truncate">iaed_contract_v4_mainnet_0x8f...21a</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightsManagement;
