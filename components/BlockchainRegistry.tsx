
import React from 'react';
import { ProvenanceRecord } from '../types';
import { Database, Search, ExternalLink } from 'lucide-react';

const BlockchainRegistry: React.FC = () => {
  const records: ProvenanceRecord[] = [
    {
      id: 'BC-001',
      releaseId: 'REL-2024-X',
      timestamp: '2024-05-20 14:22:10',
      fingerprint: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      txHash: '0x742d...456c',
      status: 'VERIFIED'
    },
    {
      id: 'BC-002',
      releaseId: 'REL-2024-Y',
      timestamp: '2024-05-20 16:45:02',
      fingerprint: '1289138471289371289371289371289371289371289371289371289371289371',
      txHash: '0x891a...902d',
      status: 'VERIFIED'
    },
    {
      id: 'BC-003',
      releaseId: 'REL-2024-Z',
      timestamp: '2024-05-21 09:12:33',
      fingerprint: '3812903812903812903812903812903812903812903812903812903812903812',
      txHash: '0x12c4...231e',
      status: 'PENDING'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search Fingerprint, TX Hash, Release..." 
            className="w-full bg-[#121214] border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-600/10 border border-blue-600/20 text-blue-400 px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <Database className="w-4 h-4" />
            Mainnet Online
          </div>
        </div>
      </div>

      <div className="bg-[#121214] border border-zinc-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-800">
              <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Release ID</th>
              <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Timestamp</th>
              <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Digital Fingerprint</th>
              <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">TX Hash</th>
              <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {records.map((record) => (
              <tr key={record.id} className="border-b border-zinc-800 hover:bg-zinc-800/20 transition-colors">
                <td className="p-4 font-bold text-zinc-200">{record.releaseId}</td>
                <td className="p-4 text-zinc-500">{record.timestamp}</td>
                <td className="p-4">
                  <div className="font-mono text-[10px] text-zinc-400 truncate w-48 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                    {record.fingerprint}
                  </div>
                </td>
                <td className="p-4 font-mono text-blue-400">{record.txHash}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    record.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlockchainRegistry;
