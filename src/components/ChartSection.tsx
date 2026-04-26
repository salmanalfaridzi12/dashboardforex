"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', balance: 100.00 },
  { time: '04:00', balance: 100.50 },
  { time: '08:00', balance: 99.80 },
  { time: '12:00', balance: 101.20 },
  { time: '16:00', balance: 101.90 },
  { time: '20:00', balance: 102.10 },
  { time: '24:00', balance: 102.40 },
];

export function ChartSection() {
  return (
    <div className="glass-panel p-6 w-full h-[400px] flex flex-col">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Balance Growth (24H)</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="#666" tick={{fill: '#666', fontSize: 12}} />
            <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
              itemStyle={{ color: '#00f3ff' }}
            />
            <Area type="monotone" dataKey="balance" stroke="#00f3ff" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
