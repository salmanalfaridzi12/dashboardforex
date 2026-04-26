import { cn } from "@/lib/utils";

const openPositions = [
  { id: 1, symbol: 'BTCUSD', type: 'Buy', lot: 0.01, entry: 64200.50, currentPl: 1.25 },
  { id: 2, symbol: 'BTCUSD', type: 'Buy', lot: 0.02, entry: 64150.00, currentPl: -2.30 }, // Martingale active
  { id: 3, symbol: 'BTCUSD', type: 'Sell', lot: 0.01, entry: 64800.00, currentPl: 4.50 },
];

export function ActiveLayers() {
  return (
    <div className="glass-panel p-6 w-full h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active Layers</h3>
        <span className="bg-white/10 text-xs px-2 py-1 rounded text-gray-300">{openPositions.length} Open</span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {openPositions.map((pos) => {
          const isMartingale = pos.lot === 0.02;
          return (
            <div 
              key={pos.id} 
              className={cn(
                "p-4 rounded-xl border flex items-center justify-between transition-colors",
                isMartingale 
                  ? "bg-panic-red/5 border-panic-red/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                  : "bg-white/5 border-white/5 hover:border-white/10"
              )}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded", pos.type === 'Buy' ? "bg-emerald-green/20 text-emerald-green" : "bg-panic-red/20 text-panic-red")}>
                    {pos.type}
                  </span>
                  <span className="font-bold text-white tracking-wide">{pos.symbol}</span>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span>Entry: ${pos.entry.toFixed(2)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className={cn(isMartingale && "text-panic-red font-bold")}>Lot: {pos.lot}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className={cn("text-lg font-bold", pos.currentPl >= 0 ? "text-emerald-green" : "text-panic-red")}>
                  {pos.currentPl >= 0 ? '+' : ''}${pos.currentPl.toFixed(2)}
                </div>
                {isMartingale && <div className="text-[10px] text-panic-red uppercase tracking-wider font-bold animate-pulse mt-1">Martingale</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
