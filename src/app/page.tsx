import { Header } from "@/components/Header";
import { StatsRow } from "@/components/StatsRow";
import { ChartSection } from "@/components/ChartSection";
import { ActiveLayers } from "@/components/ActiveLayers";
import { HistoryTable } from "@/components/HistoryTable";
import { TerminalLogs } from "@/components/TerminalLogs";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-deep-black text-foreground relative overflow-hidden font-sans">
      {/* Dynamic Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-green/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Header />
        
        <StatsRow />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ChartSection />
          </div>
          <div className="lg:col-span-1">
            <ActiveLayers />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <HistoryTable />
          <TerminalLogs />
        </div>
      </div>
    </main>
  );
}
