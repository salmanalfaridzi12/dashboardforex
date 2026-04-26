"use client";

import { useEffect, useState, useRef } from "react";

const initialLogs = [
  "[10:14:00] System initialized. The Hitcher V9.1 active.",
  "[10:14:05] Connected to MT5 Server. Ping: 24ms.",
  "[10:14:10] Scanning BTCUSD M1 timeframe for layout patterns...",
  "[10:14:45] Signal Generated: Bullish Divergence on RSI.",
  "[10:15:00] Entry Triggered: Breakout M1 High. Placed BUYLIMIT @ 64200.50",
];

export function TerminalLogs() {
  const [logs, setLogs] = useState(initialLogs);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogs(prev => {
        const newLog = `[${new Date().toLocaleTimeString()}] Monitoring market liquidity zones...`;
        return [...prev, newLog].slice(-20);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="glass-panel p-0 w-full flex flex-col h-[300px] overflow-hidden bg-black/60 font-mono text-xs">
      <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-panic-red/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-green/80"></div>
        </div>
        <span className="text-gray-500 ml-2">hitcher-bot-logs ~ mt5-client</span>
      </div>
      
      <div className="p-4 flex-1 overflow-auto text-gray-300 space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="whitespace-pre-wrap flex gap-2">
            <span className="text-neon-blue shrink-0">&gt;</span>
            <span dangerouslySetInnerHTML={{
              __html: log
                .replace(/(\[\d{2}:\d{2}:\d{2}\])/, '<span class="text-gray-500">$1</span>')
                .replace(/(Entry Triggered.*|Signal Generated.*)/, '<span class="text-emerald-green">$1</span>')
                .replace(/(Error|Failed|Panic)/, '<span class="text-panic-red">$1</span>')
            }} />
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
