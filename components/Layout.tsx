
import React from 'react';
import { 
  Activity, 
  Share2, 
  FileCheck, 
  Database, 
  BrainCircuit, 
  Terminal as TerminalIcon,
  Zap,
  Globe,
  BarChart3,
  Scale,
  UploadCloud
} from 'lucide-react';
import { Tab } from '../types';

interface LayoutProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const navItems = [
    { id: Tab.COMMAND_CENTER, label: 'Command Center', icon: Activity },
    { id: Tab.ASSET_UPLOAD, label: 'Asset Upload', icon: UploadCloud },
    { id: Tab.DISTRIBUTION, label: 'Distribution', icon: Share2 },
    { id: Tab.ASDP, label: 'ASDP Protocol', icon: Zap },
    { id: Tab.DDEX, label: 'DDEX Manager', icon: FileCheck },
    { id: Tab.BLOCKCHAIN, label: 'Blockchain', icon: Database },
    { id: Tab.AI_ANALYTICS, label: 'AI Analytics', icon: BrainCircuit },
    { id: Tab.STRATEGY, label: 'Strategic Pivot', icon: BarChart3 },
    { id: Tab.RIGHTS_MANAGEMENT, label: 'Rights & Equity', icon: Scale },
    { id: Tab.TERMINAL, label: 'Terminal', icon: TerminalIcon },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0b] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121214] border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Globe className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">LinkZ IAED</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">System Online</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">NODE_US_CENTRAL_01</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#0a0a0b]/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-zinc-100">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-blue-400">
               GRESHAM_P_v4
             </div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/10 shadow-lg shadow-blue-900/20"></div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
