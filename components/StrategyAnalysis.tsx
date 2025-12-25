
import React from 'react';
import { Target, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

const StrategyAnalysis: React.FC = () => {
  const data = [
    {
      dim: 'Core Function',
      traditional: 'Digital Distribution (DSP focus)',
      linkz: 'AI-Driven Equity Generation (Strategic growth)',
      icon: Target
    },
    {
      dim: 'Monetization',
      traditional: 'Subscription / SaaS Fees',
      linkz: 'Equity-First / Success-Based',
      icon: TrendingUp
    },
    {
      dim: 'Technology',
      traditional: 'Static Web Dashboard',
      linkz: 'AI-Native & Serverless (Gresham Protocol)',
      icon: Zap
    },
    {
      dim: 'Governance',
      traditional: 'Manual Intervention',
      linkz: 'Autonomous Smart Contracts',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight text-white">Strategic Advantage</h2>
        <p className="text-zinc-500 text-lg">Comparing the LinkZ IAED Engine (Gresham Protocol) against legacy distribution models.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
        {data.map((item, idx) => (
          <div key={idx} className="group flex flex-col md:flex-row gap-6 p-8 bg-[#121214] border border-zinc-800 rounded-[2rem] hover:border-blue-600/50 transition-all duration-300">
            <div className="flex items-center gap-4 md:w-1/4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white">{item.dim}</h4>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Traditional Service</span>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.traditional}</p>
              </div>
              <div className="space-y-2 border-l border-zinc-800 pl-8">
                <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">LinkZ IAED</span>
                <p className="text-zinc-200 text-sm leading-relaxed font-medium">{item.linkz}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-blue-600/5 border border-blue-600/20 p-8 rounded-[2rem] text-center">
        <h3 className="text-xl font-bold mb-4">Autonomous Strategic Action</h3>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Traditional services provide tools that require manual execution. The Gresham Protocol uses the 
          <span className="text-blue-400 font-bold"> Synergistic Opportunity Radar</span> and the 
          <span className="text-blue-400 font-bold"> 'Genie' API</span> to automate execution. It doesn't 
          just show you a problem; it deploys a dedicated mission to solve it.
        </p>
      </div>
    </div>
  );
};

export default StrategyAnalysis;
