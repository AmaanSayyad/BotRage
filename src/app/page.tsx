"use client";

import { motion } from "framer-motion";
import { useBotChain } from "@/providers/BotChainProvider";
import { ArrowRight, Cpu, Layers, Zap, ExternalLink, ShieldCheck, Activity, Terminal, CheckCircle2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { BOT_CHAIN } from "@/lib/constants";

export default function LandingPage() {
  const { connect, isConnecting, isConnected, isCorrectChain, switchToBotChain, address } = useBotChain();
  const router = useRouter();

  // Interactive Hardware Tier Calculator state
  const [allocatedCores, setAllocatedCores] = useState(8);
  const [allocatedRam, setAllocatedRam] = useState(16);
  const [hasGpu, setHasGpu] = useState(true);

  // Real-time calculated monthly BOT yield
  const estimatedDailyBot = useMemo(() => {
    const base = allocatedCores * 0.12 + allocatedRam * 0.04;
    const gpuMultiplier = hasGpu ? 1.85 : 1.0;
    return (base * gpuMultiplier).toFixed(2);
  }, [allocatedCores, allocatedRam, hasGpu]);

  const estimatedMonthlyBot = useMemo(() => {
    return (parseFloat(estimatedDailyBot) * 30).toFixed(1);
  }, [estimatedDailyBot]);

  useEffect(() => {
    if (isConnected && isCorrectChain) {
      router.push("/onboard");
    }
  }, [isConnected, isCorrectChain, router]);

  const handleCtaClick = async () => {
    if (!isConnected) {
      await connect();
    } else if (!isCorrectChain) {
      await switchToBotChain();
    } else {
      router.push("/onboard");
    }
  };

  return (
    <main className="bg-[#08090d] text-slate-100 min-h-screen selection:bg-cyan-400 selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Background Architectural Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/[0.04] blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 h-16 border-b border-white/[0.08] bg-[#08090d]/80 backdrop-blur-xl flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center">
              <Zap className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="font-mono font-bold tracking-tight text-base text-white">
              BOT<span className="text-cyan-400">RAGE</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-[#0e1117] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>BOT Chain</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">Chain ID 677</span>
            </div>

            <button
              onClick={handleCtaClick}
              disabled={isConnecting}
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all bg-white hover:bg-zinc-200 text-black flex items-center gap-2 shrink-0"
            >
              {isConnecting ? (
                <span>Connecting...</span>
              ) : isConnected ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92dvh] flex flex-col justify-center px-6 pt-20 pb-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>BOT Chain DePIN Settlement</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white font-mono mb-5">
              Turn idle compute into <span className="text-cyan-400">streaming yield</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-[54ch] mb-8">
              Provision sandboxed hardware nodes in one click. Earn BOT settled directly on BOT Chain Mainnet.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleCtaClick}
                disabled={isConnecting}
                className="px-7 py-3.5 rounded-xl font-mono text-xs uppercase font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-2.5 shadow-[0_0_24px_rgba(0,229,255,0.25)] hover:shadow-[0_0_32px_rgba(0,229,255,0.4)] disabled:opacity-50"
              >
                <span>
                  {isConnecting ? "Connecting..." : isConnected && !isCorrectChain ? "Switch to BOT Chain" : isConnected ? "Launch Node" : "Connect Wallet"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl font-mono text-xs text-zinc-400 hover:text-white tech-panel tech-panel-hover transition-all flex items-center gap-2"
              >
                <span>View BOTScan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-white/[0.08] w-full max-w-lg font-mono">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">~0.75s</div>
                <div className="text-[11px] text-zinc-500 uppercase mt-0.5">Block Latency</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">$0.06</div>
                <div className="text-[11px] text-zinc-500 uppercase mt-0.5">Avg Gas Fee</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-[11px] text-zinc-500 uppercase mt-0.5">EVM Native</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Yield Calculator */}
          <div className="lg:col-span-5 w-full">
            <div className="tech-panel p-6 sm:p-7 rounded-2xl relative overflow-hidden border-white/[0.12] cyan-border-glow">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold uppercase text-zinc-200">Hardware Yield Estimator</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Live Rates
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1.5">
                    <span>CPU Core Allocation</span>
                    <span className="text-white font-semibold">{allocatedCores} Cores</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="32"
                    step="2"
                    value={allocatedCores}
                    onChange={(e) => setAllocatedCores(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1.5">
                    <span>RAM Reservation</span>
                    <span className="text-white font-semibold">{allocatedRam} GB</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    step="4"
                    value={allocatedRam}
                    onChange={(e) => setAllocatedRam(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 pb-1">
                  <span className="text-zinc-400">WebGL / GPU Acceleration</span>
                  <button
                    type="button"
                    onClick={() => setHasGpu(!hasGpu)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      hasGpu ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {hasGpu ? "Enabled (+85%)" : "Disabled"}
                  </button>
                </div>
              </div>

              {/* Yield Output Result Box */}
              <div className="mt-5 p-4 rounded-xl bg-black/50 border border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Estimated Monthly Yield</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 mt-0.5">
                    +{estimatedMonthlyBot} <span className="text-xs text-zinc-400">BOT / mo</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Daily Accrual</div>
                  <div className="text-sm font-mono font-semibold text-zinc-200 mt-0.5">
                    ~{estimatedDailyBot} BOT
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Yield settles continuously every 750ms block.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Ecosystem Logo Wall */}
      <section className="py-12 px-6 border-y border-white/[0.08] bg-[#08090d]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider shrink-0">
            Powered by Open Standards
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs font-semibold">
              <svg className="w-5 h-5 fill-current text-cyan-400" viewBox="0 0 24 24">
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.7 8 12 11.8 5.3 8 12 4.2zm-7 5.1l6 3.4v6.8l-6-3.4V9.3zm8 10.2v-6.8l6-3.4v6.8l-6 3.4z" />
              </svg>
              <span>BOT Chain L1</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs font-semibold">
              <svg className="w-5 h-5 fill-current text-zinc-400" viewBox="0 0 24 24">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
              </svg>
              <span>EVM Compatible</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs font-semibold">
              <svg className="w-5 h-5 fill-current text-zinc-400" viewBox="0 0 24 24">
                <path d="M2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zm10-4.5h-1v5.25l4.5 2.67.75-1.23-3.75-2.22V7.5z" />
              </svg>
              <span>WebAssembly (WASM)</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs font-semibold">
              <svg className="w-5 h-5 fill-current text-zinc-400" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              <span>IPFS DePIN Protocol</span>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Architecture Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold font-mono tracking-tight text-white mb-3">
            Decentralized compute architecture
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Zero kernel drivers. Zero configuration files. Sandboxed execution right from your browser.
          </p>
        </div>

        {/* Bento Grid: 3 Distinct Visual Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Tile 1: Hardware Sandboxing (Span 7) */}
          <div className="lg:col-span-7 tech-panel p-8 rounded-2xl flex flex-col justify-between border-white/[0.08]">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase text-zinc-200">Execution Sandbox</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">WASM Runtime</span>
              </div>

              <h3 className="text-xl font-mono font-bold text-white mb-3">
                Browser isolated compute containers
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-[50ch] mb-6">
                Workloads run inside isolated WebAssembly memory blocks with zero host disk access. Your private files, network, and operating system remain 100% untouched.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs space-y-2 text-zinc-400">
              <div className="flex items-center justify-between text-zinc-300">
                <span>[sandbox:init]</span>
                <span className="text-emerald-400">PASSED</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[wasm:heap_alloc]</span>
                <span className="text-zinc-200">512 MB isolated</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[gpu:webgl_context]</span>
                <span className="text-cyan-400">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Sub-second Settlement (Span 5) */}
          <div className="lg:col-span-5 tech-panel p-8 rounded-2xl flex flex-col justify-between border-white/[0.08]">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase text-zinc-200">BOT Chain Settlement</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">750ms</span>
              </div>

              <h3 className="text-xl font-mono font-bold text-white mb-3">
                Real-time micro-yield streaming
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Incentive rewards accrue per block directly into smart contract treasuries with on-chain cryptographic proofs.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Contract Verification</span>
              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>BOTScan Explorer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Tile 3: Node Registry (Span 12 Full Width) */}
          <div className="lg:col-span-12 tech-panel p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-white/[0.08]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>On-Chain Node Registry (NodeRegistry.sol)</span>
              </div>
              <h3 className="text-lg font-mono font-bold text-white">
                Ready to contribute compute to BOT Chain?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Connect your Web3 wallet, audit your system in seconds, and start earning BOT.
              </p>
            </div>

            <button
              onClick={handleCtaClick}
              disabled={isConnecting}
              className="px-6 py-3 rounded-xl font-mono text-xs uppercase font-semibold text-black bg-white hover:bg-zinc-200 transition-all flex items-center gap-2 shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}
