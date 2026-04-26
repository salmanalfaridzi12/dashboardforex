export function StatsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      <div className="glass-panel p-6 flex flex-col justify-between">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Current Balance</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">$100.00</span>
          <span className="text-emerald-green text-sm flex items-center">
            +2.4% <span className="text-gray-500 ml-1">daily</span>
          </span>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl -z-10 rounded-full"></div>
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Equity</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-neon-blue animate-pulse neon-text-blue">$102.40</span>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col justify-between">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Today's Profit</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-emerald-green">+$2.40</span>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col justify-between items-center relative">
        <div className="w-full flex justify-between items-start mb-2">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Drawdown Risk</h3>
        </div>
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="180" className="text-panic-red transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-white">20%</span>
            <span className="text-[10px] text-gray-500">MAX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
