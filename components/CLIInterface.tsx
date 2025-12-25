
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface Log {
  cmd?: string;
  output: string;
  type: 'cmd' | 'resp' | 'error' | 'success';
}

const CLIInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<Log[]>([
    { output: 'LinkZ IAED AURA-DDEX-CLI v4.3.0', type: 'resp' },
    { output: 'Type "help" to see available commands.', type: 'resp' },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: Log[] = [...logs, { cmd: `gresham-cli $ ${input}`, output: '', type: 'cmd' }];

    if (cmd === 'help') {
      newLogs.push({ output: 'Available Commands:\n  deploy      - Trigger full distribution pipeline\n  status      - Check system & release health\n  audit       - Run DDEX compliance validation\n  blockchain  - Fetch latest provenance receipts\n  clear       - Clear terminal history', type: 'resp' });
    } else if (cmd.startsWith('deploy')) {
      newLogs.push({ output: '🚀 Starting Distribution for REL-2024-001...\n✓ Pre-flight checks completed\n✓ Asset retrieval active\n✓ AI metadata audit: PASSED\n✓ Blockchain tagging: 0x742... committed\n✓ Distribution execution: 12%...', type: 'success' });
    } else if (cmd === 'status') {
      newLogs.push({ output: 'NODE STATUS: ONLINE\nACTIVE RELEASES: 12\nHEALTH: 100%\nLAST SYNC: 12s ago', type: 'resp' });
    } else if (cmd === 'clear') {
      setLogs([{ output: 'Terminal cleared.', type: 'resp' }]);
      setInput('');
      return;
    } else {
      newLogs.push({ output: `Command not found: ${cmd}. Type "help" for a list of commands.`, type: 'error' });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <div className="bg-[#0c0c0d] border border-zinc-800 rounded-3xl overflow-hidden h-full flex flex-col shadow-2xl">
      <div className="bg-zinc-900/80 p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50"></div>
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
           <TerminalIcon className="w-3 h-3" />
           <span className="text-[10px] font-mono tracking-widest uppercase">linkz-cli-v4</span>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-3"
      >
        {logs.map((log, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {log.cmd && <div className="text-zinc-500 font-bold mb-1">{log.cmd}</div>}
            <div className={`${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'success' ? 'text-emerald-400' :
              log.type === 'cmd' ? 'hidden' : 'text-zinc-300'
            }`}>
              {log.output}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="p-4 bg-zinc-900/30 border-t border-zinc-800 flex items-center gap-3">
        <span className="text-blue-500 font-bold text-sm">gresham-cli $</span>
        <input 
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-zinc-200 text-sm font-mono"
          placeholder="..."
        />
      </form>
    </div>
  );
};

export default CLIInterface;
