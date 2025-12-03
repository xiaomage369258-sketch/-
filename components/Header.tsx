import React from 'react';
import { Bitcoin, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-cyan-900/30 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-40 rounded-full animate-pulse"></div>
          <Bitcoin className="w-10 h-10 text-cyan-400 relative z-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            <span className="text-cyan-400">Crypto</span>Tycoon<span className="text-xs ml-1 align-top text-slate-400 font-normal border border-slate-700 px-1 rounded">GEN</span>
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">AI-Powered Avatar Generator</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-900 flex items-center gap-1">
          <Zap size={12} fill="currentColor" /> System Online
        </span>
      </div>
    </header>
  );
};

export default Header;