"use client";

import { useEffect, useState } from "react";
import { useBotChain } from "@/providers/BotChainProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Activity, ExternalLink, Cpu, HardDrive, ShieldCheck, Zap, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import { BOT_CHAIN } from "@/lib/constants";

export default function DashboardPage() {
  const { address, balance, isConnected, isCorrectChain, switchToBotChain } = useBotChain();
  const router = useRouter();
  
  const [earnedBot, setEarnedBot] = useState(0.048215);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedNotice, setClaimedNotice] = useState(false);
  const [logs, setLogs] = useState<{ id: number; text: string; time: string; tag: string }[]>([]);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  // Streaming BOT Yield Incrementer
  useEffect(() => {
    if (!isConnected) return;

    const earnInterval = setInterval(() => {
      setEarnedBot((prev) => prev + (Math.random() * 0.00008 + 0.00002));
    }, 1200);

    // Initial seed logs
    setLogs([
      { id: 1, text: "NODE : WebGL hardware verification verified", time: new Date(Date.now() - 15000).toISOString().split("T")[1].slice(0, 8), tag: "SYS" },
      { id: 2, text: "NET : Connected to BOT Chain Mainnet (Chain ID 677)", time: new Date(Date.now() - 10000).toISOString().split("T")[1].slice(0, 8), tag: "RPC" },
      { id: 3, text: "POOL : Reward accrual stream online (~0.75s blocks)", time: new Date(Date.now() - 5000).toISOString().split("T")[1].slice(0, 8), tag: "YIELD" },
    ]);

    let logId = 4;
    const logInterval = setInterval(() => {
      const messages = [
        { text: "EXEC : Worker #42 assigned compute payload", tag: "EXEC" },
        { text: "SYNC : Confirming micro-settlement on BOT Chain...", tag: "SYNC" },
        { text: "POOL : Reward accrual tick - 0.0001 BOT credited", tag: "POOL" },
        { text: "NET : BOT Chain heartbeat OK. Block latency 750ms", tag: "NET" },
        { text: "NODE : Sandboxed workload cycle 90% complete", tag: "NODE" },
        { text: "MEM : Flushed isolated WebAssembly memory block", tag: "MEM" },
        { text: "TX : Batch proof registered with BOTScan validator", tag: "TX" },
      ];
      const selected = messages[Math.floor(Math.random() * messages.length)];
      setLogs((prevLogs) => {
        const newLogs = [
          ...prevLogs,
          {
            id: logId++,
            text: selected.text,
            time: new Date().toISOString().split("T")[1].slice(0, 8),
            tag: selected.tag,
          },
        ];
        return newLogs.slice(-7);
      });
    }, 2800);

    return () => {
      clearInterval(earnInterval);
      clearInterval(logInterval);
    };
  }, [isConnected]);

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      setClaimedNotice(true);
      setEarnedBot(0.0001);
      setTimeout(() => setClaimedNotice(false), 4000);
    }, 1800);
  };

  return (
    <main className="min-h-screen p-6 lg:p-10 relative bg-[#08090d] text-slate-100 selection:bg-cyan-400 selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-white/[0.08] pb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-lg tech-panel text-zinc-400 hover:text-white transition-colors"
              title="Return to Overview"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-mono text-white">Node Control Center</h1>
              <p className="text-zinc-400 font-mono text-xs mt-0.5">Active Node Runtime Diagnostics on BOT Chain</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="tech-panel px-3.5 py-1.5 rounded-lg flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-white">BOT Chain (677)</span>
              <span className="text-zinc-600">|</span>
              <span className="text-cyan-300">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>

            {balance && (
              <div className="tech-panel px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
                <span className="text-zinc-500">Balance:</span>
                <span className="text-white font-bold">{parseFloat(balance).toFixed(4)} BOT</span>
              </div>
            )}
          </div>
        </header>

        {/* Claimed Toast Notice */}
        {claimedNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between font-mono text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Rewards successfully claimed and broadcast to BOT Chain.</span>
            </div>
            <a
              href={`https://scan.botchain.ai/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline flex items-center gap-1 hover:text-emerald-200"
            >
              View on BOTScan <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Yield Card (Span 8) */}
          <div className="lg:col-span-8 tech-panel p-7 rounded-2xl flex flex-col justify-between relative overflow-hidden border-white/[0.12] cyan-border-glow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-zinc-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Yield Accrued (Live)
                </span>
                <p className="text-[11px] font-mono text-zinc-500 mt-0.5">Real-time compute reward streaming</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Node
              </div>
            </div>
            
            <div className="my-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-6xl font-mono font-bold tracking-tight tabular-nums text-cyan-400">
                  {earnedBot.toFixed(6)}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-zinc-500">BOT</span>
              </div>
              <div className="text-xs font-mono text-zinc-500 mt-2 flex items-center gap-2">
                <span>Estimated 24h Yield:</span>
                <span className="text-zinc-200 font-semibold">~1.7280 BOT / day</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Settles to: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>

              <button
                onClick={handleClaim}
                disabled={isClaiming || earnedBot <= 0.001}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs uppercase font-semibold transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isClaiming ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Claiming BOT...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Claim to Wallet</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Telemetry Hardware Card (Span 4) */}
          <div className="lg:col-span-4 tech-panel p-7 rounded-2xl flex flex-col justify-between border-white/[0.08]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
                <span className="text-xs font-mono font-semibold uppercase text-zinc-400">
                  Node Telemetry
                </span>
                <span className="text-[10px] font-mono text-emerald-400">HEALTH: 99.8%</span>
              </div>
              
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU Load
                    </span>
                    <span className="text-white font-semibold">64.2%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: "64.2%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-zinc-300" /> RAM Allocation
                    </span>
                    <span className="text-white font-semibold">82.1%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-zinc-300 h-full rounded-full" style={{ width: "82.1%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-emerald-400" /> VRAM Memory
                    </span>
                    <span className="text-white font-semibold">14.0%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "14%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 flex justify-between">
              <span>SANDBOX: WASM-VM</span>
              <span className="text-zinc-400">LATENCY: 12ms</span>
            </div>
          </div>

          {/* Terminal Window (Span 12) */}
          <div className="lg:col-span-12 tech-panel rounded-2xl border-white/[0.08] overflow-hidden">
            <div className="border-b border-white/[0.08] px-5 py-3 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-zinc-300 uppercase font-semibold">
                  daemon-stdout.log / BOT Chain Event Stream
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500">RPC: rpc.botchain.ai</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              </div>
            </div>

            <div className="p-5 font-mono text-xs space-y-2 h-52 flex flex-col justify-end bg-black/60 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="flex items-baseline gap-3">
                  <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/5 text-cyan-300 shrink-0">
                    {log.tag}
                  </span>
                  <span className="text-zinc-300">{log.text}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-cyan-400/80 mt-1">
                <span className="text-zinc-600 shrink-0">[{new Date().toISOString().split("T")[1].slice(0, 8)}]</span>
                <span>waiting for next BOT Chain batch proof...</span>
              </div>
            </div>

            <div className="border-t border-white/[0.06] px-5 py-3 bg-black/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <span className="text-zinc-500">Node ID: #BOT-0677-{address?.slice(2, 8).toUpperCase()}</span>
              
              <a
                href={`https://scan.botchain.ai/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>View Node on BOTScan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
