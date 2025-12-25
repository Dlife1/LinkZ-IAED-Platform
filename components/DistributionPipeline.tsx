
import React from 'react';
import { WaterfallPhase } from '../types';
import { ArrowRight, Clock, Shield, Globe } from 'lucide-react';

const DistributionPipeline: React.FC = () => {
  const phases: WaterfallPhase[] = [
    {
      name: 'Nocturnal Scarcity',
      status: 'COMPLETED',
      platforms: ['Private Nodes', 'Token Gates'],
      access: 'Equity Holders'
    },
    {
      name: 'Concrete Jungle Expansion',
      status: 'ACTIVE',
      platforms: ['Spotify', 'Apple Music', 'Amazon Music'],
      access: 'Public'
    },
    {
      name: 'Unyielding Longtail',
      status: 'PENDING',
      platforms: ['Sync Libraries', 'Secondary Markets'],
      access: 'Broad Licensing'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-2">SMART_WATERFALL</h3>
        <p className="text-zinc-500">Autonomous multi-phase deployment logic for decentralized equity growth.</p>
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-[2.25rem] w-px bg-zinc-800"></div>
        <div className="space-y-12">
          {phases.map((phase, idx) => (
            <div key={idx} className="relative flex gap-8 group">
              <div className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                phase.status === 'COMPLETED' ? 'bg-emerald-500 text-black' : 
                phase.status === 'ACTIVE' ? 'bg-blue-600 text-white animate-pulse shadow-lg shadow-blue-900/40' : 
                'bg-zinc-800 text-zinc-500'
              }`}>
                {phase.status === 'COMPLETED' ? <Shield className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
              </div>
              
              <div className={`flex-1 bg-[#121214] border p-6 rounded-3xl transition-all duration-300 ${
                phase.status === 'ACTIVE' ? 'border-blue-600/50 ring-1 ring-blue-600/20' : 'border-zinc-800'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold tracking-tight">{phase.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest ${
                    phase.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
                    phase.status === 'ACTIVE' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Target Platforms</span>
                    <div className="flex flex-wrap gap-2">
                      {phase.platforms.map(p => (
                        <span key={p} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[11px] text-zinc-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Access Level</span>
                    <div className="flex items-center gap-2 text-zinc-300 text-sm">
                      <Globe className="w-4 h-4 text-blue-400" />
                      {phase.access}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributionPipeline;
