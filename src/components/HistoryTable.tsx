import { cn } from "@/lib/utils";

const history = [
  { id: 1, symbol: 'BTCUSD', type: 'Buy', result: 4.50, timestamp: '2023-10-27 10:15:00' },
  { id: 2, symbol: 'BTCUSD', type: 'Buy', result: -2.10, timestamp: '2023-10-27 09:30:22' },
  { id: 3, symbol: 'BTCUSD', type: 'Sell', result: 1.20, timestamp: '2023-10-27 08:05:10' },
  { id: 4, symbol: 'BTCUSD', type: 'Buy', result: 8.90, timestamp: '2023-10-26 23:45:00' },
];

export function HistoryTable() {
  return (
    <div className="glass-panel p-6 w-full flex flex-col h-[300px]">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Recent History</h3>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-white/5 sticky top-0">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Symbol</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Result</th>
              <th className="px-4 py-3 rounded-tr-lg">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{record.symbol}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded", record.type === 'Buy' ? "bg-emerald-green/20 text-emerald-green" : "bg-panic-red/20 text-panic-red")}>
                    {record.type}
                  </span>
                </td>
                <td className={cn("px-4 py-3 font-bold", record.result >= 0 ? "text-emerald-green" : "text-panic-red")}>
                  {record.result >= 0 ? '+' : ''}${record.result.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{record.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
