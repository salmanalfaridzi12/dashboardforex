import { ShieldAlert, Activity, Cpu } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-deep-black border-b border-white/10 glass-panel mb-6">
      <div className="flex items-center gap-3">
        <Cpu className="text-neon-blue w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-wider neon-text-blue text-white">
          THE HITCHER BOT <span className="text-sm text-gray-400">V9.1</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-green/10 border border-emerald-green/30">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-green animate-pulse"></div>
          <span className="text-emerald-green font-mono text-sm tracking-widest neon-text-green">LIVE</span>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-panic-red/50 text-panic-red hover:bg-panic-red/10 transition-colors">
          <ShieldAlert className="w-4 h-4" />
          <span className="font-bold text-sm">PANIC STOP</span>
        </button>
      </div>
    </header>
  );
}
