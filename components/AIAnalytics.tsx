
import React, { useState } from 'react';
import { BrainCircuit, Loader2, Sparkles, TrendingUp, Music, Globe } from 'lucide-react';
import { detectOpportunities } from '../services/geminiService';

const AIAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const data = {
        genre: 'Synthwave',
        mood: 'Nostalgic, Energetic',
        bpm: 124,
        streams: 145000,
        geoData: { topRegions: ['Tokyo', 'Berlin', 'London'], growthRate: '14%' }
      };
      const opportunities = await detectOpportunities(data);
      setResults(opportunities);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-blue-500/20 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
              <BrainCircuit className="text-white w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Synergistic Opportunity Radar</h3>
              <p className="text-zinc-400">Genie-powered market intelligence and strategic mapping.</p>
            </div>
          </div>
          <button 
            onClick={runAnalysis}
            disabled={loading}
            className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Run Live Analysis
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
             <div className="flex items-center gap-3 mb-4">
               <Music className="text-blue-400 w-5 h-5" />
               <span className="text-sm font-bold">Acoustic Fingerprint</span>
             </div>
             <p className="text-xs text-zinc-500 leading-relaxed">Phase-lock detected in high-frequency spectrum. Optimal for immersive gaming placements.</p>
           </div>
           <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
             <div className="flex items-center gap-3 mb-4">
               <Globe className="text-emerald-400 w-5 h-5" />
               <span className="text-sm font-bold">Geo-Synergy Score</span>
             </div>
             <p className="text-xs text-zinc-500 leading-relaxed">Anomalous growth in Scandinavian markets. Recommendation: localized digital campaign.</p>
           </div>
           <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
             <div className="flex items-center gap-3 mb-4">
               <TrendingUp className="text-purple-400 w-5 h-5" />
               <span className="text-sm font-bold">Viral Probability</span>
             </div>
             <p className="text-xs text-zinc-500 leading-relaxed">Short-form video resonance: High (88%). Trigger: "IAED_MUTATION_01" audio snippet.</p>
           </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom duration-500">
          {results.map((opp, idx) => (
            <div key={idx} className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl hover:border-zinc-700 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {opp.type}
                </span>
                <span className="text-2xl font-bold text-white">{Math.round(opp.confidence * 100)}%</span>
              </div>
              <h4 className="text-lg font-bold mb-2">{opp.description}</h4>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-800">
                <span className="text-sm text-zinc-500">Potential Impact</span>
                <span className="text-sm font-bold text-emerald-500">{opp.potentialROI}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAnalytics;
