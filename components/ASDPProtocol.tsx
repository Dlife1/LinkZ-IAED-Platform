
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, Cpu, Zap, Activity, Code2, CheckCircle2, AlertTriangle } from 'lucide-react';

const ASDPProtocol: React.FC = () => {
  const [logs, setLogs] = useState<{msg: string, type: 'info' | 'error' | 'success'}[]>([]);
  const [isHealing, setIsHealing] = useState(false);
  const [healingProgress, setHealingProgress] = useState(0);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: 'info' | 'error' | 'success' = 'info') => {
    setLogs(prev => [...prev, { msg, type }]);
  };

  useEffect(() => {
    const sequence = [
      { msg: 'ASDP Core Booting...', type: 'info' },
      { msg: 'Connecting to Gresham Neural Net...', type: 'info' },
      { msg: 'System Status: OPTIMAL', type: 'success' },
      { msg: 'Monitoring stream velocity nodes...', type: 'info' },
      { msg: 'ANOMALY DETECTED: Latency spike in Region_EU_West', type: 'error' },
      { msg: 'ACME Engine Engaged: Self-healing protocol initiated', type: 'error' },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        addLog(sequence[i].msg, sequence[i].type as any);
        if (sequence[i].msg.includes('ACME Engine Engaged')) {
          setIsHealing(true);
        }
        i++;
      } else {
        clearInterval(interval);
        if (isHealing) startHealingProcess();
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const startHealingProcess = () => {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      setHealingProgress(progress);
      if (progress >= 100) {
        clearInterval(progressInterval);
        setIsHealing(false);
        addLog('MUTATION_SUCCESS: Node re-routed. Latency normalized.', 'success');
        addLog('Blockchain Build Receipt: 0x82...f92 confirmed.', 'success');
      }
    }, 150);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-3xl group hover:border-blue-500/50 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/10 rounded-xl group-hover:bg-red-500/20">
              <ShieldAlert className="text-red-500 w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Self-Healing</div>
              <div className="text-xl font-bold text-white">Active</div>
            </div>
          </div>
          <div className="text-xs text-zinc-500 font-mono">ACME Status: <span className={isHealing ? "text-amber-500 animate-pulse" : "text-emerald-500"}>{isHealing ? 'HEALING' : 'MONITORING'}</span></div>
        </div>

        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-3xl group hover:border-blue-500/50 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20">
              <Cpu className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">AI Mutation Node</div>
              <div className="text-xl font-bold text-white">4.2.1-stable</div>
            </div>
          </div>
          <div className="text-xs text-zinc-500 font-mono">Last Mutation: <span className="text-blue-400">14m ago</span></div>
        </div>

        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-3xl group hover:border-blue-500/50 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20">
              <Zap className="text-emerald-500 w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Latency Recovery</div>
              <div className="text-xl font-bold text-white">99.98%</div>
            </div>
          </div>
          <div className="text-xs text-zinc-500 font-mono">Node Health: <span className="text-emerald-500">EXCELLENT</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden flex flex-col h-[500px] shadow-2xl relative">
            {isHealing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
                <div className="w-20 h-20 relative mb-6">
                  <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <Activity className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Autonomous Mutation in Progress</h4>
                <p className="text-zinc-400 text-sm mb-6 max-w-xs">Genie is re-writing distribution logic to counteract regional latency spike.</p>
                <div className="w-full max-w-sm h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${healingProgress}%` }}></div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-blue-500 uppercase tracking-widest">Step: Generating surgical code diff... {healingProgress}%</div>
              </div>
            )}
            
            <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">ASDP Terminal_v4</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
              </div>
            </div>
            <div className="flex-1 p-8 font-mono text-sm overflow-y-auto space-y-3 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4 animate-in slide-in-from-left duration-300">
                  <span className="text-zinc-600 shrink-0 text-xs">[{new Date().toLocaleTimeString()}]</span>
                  <span className={`${
                    log.type === 'error' ? 'text-red-400' : 
                    log.type === 'success' ? 'text-emerald-400' : 
                    'text-blue-400'
                  } leading-relaxed`}>
                    <span className="opacity-50 mr-2">❯</span>
                    {log.msg}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#121214] border border-zinc-800 p-8 rounded-[2.5rem] h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="text-blue-400 w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Mutation DNA</h3>
            </div>
            <div className="flex-1 space-y-6">
              {[
                { label: 'Core Distro', health: 100, status: 'STABLE' },
                { label: 'AP2 Protocol', health: 98, status: 'STABLE' },
                { label: 'Blockchain Node', health: 100, status: 'STABLE' },
                { label: 'Metadata Sync', health: 85, status: 'RECOVERING' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{item.label}</span>
                    <span className="text-xs font-bold text-white">{item.health}%</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${item.health > 95 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                      style={{ width: `${item.health}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-zinc-200">Mutation Protocol</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed italic">
                "Code is never static. It is a living entity that evolves to meet the market's demand for equity distribution." — Gresham v4
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASDPProtocol;
