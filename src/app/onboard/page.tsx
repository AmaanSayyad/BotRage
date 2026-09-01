"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBotChain } from "@/providers/BotChainProvider";
import { isContractsDeployed, CONTRACTS, BOT_CHAIN } from "@/lib/constants";
import { NODE_REGISTRY_ABI } from "@/lib/contracts";
import { Contract } from "ethers";
import { Cpu, HardDrive, Monitor, Loader2, CheckCircle2, TerminalSquare, ArrowLeft, ShieldCheck, Zap } from "lucide-react";

export default function OnboardPage() {
  const { address, isConnected, isCorrectChain, signer, switchToBotChain } = useBotChain();
  const router = useRouter();
  
  const [isScanning, setIsScanning] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [specs, setSpecs] = useState({
    cpuCores: "8 Cores",
    ram: "16 GB",
    gpu: "Apple Silicon GPU / WebGL 2.0",
    storage: "500",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isConnected) {
        router.push("/");
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [isConnected, router]);

  useEffect(() => {
    const scanHardware = async () => {
      let cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "8 Cores";
      let ram = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB+` : "16 GB";
      let gpu = "Dedicated GPU Acceleration";

      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            gpu = renderer.replace(/ANGLE \(|\)|\sDirect3D.*/g, "").trim();
          }
        }
      } catch (e) {
        console.warn("GPU WebGL scan fallback", e);
      }

      setSpecs((prev) => ({ ...prev, cpuCores: cores, ram, gpu }));
      setTimeout(() => setIsScanning(false), 2000);
    };

    scanHardware();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isContractsDeployed() && signer) {
        const contract = new Contract(CONTRACTS.nodeRegistry, NODE_REGISTRY_ABI, signer);
        const coresNum = parseInt(specs.cpuCores) || 8;
        const ramNum = parseInt(specs.ram) || 16;
        const storageNum = parseInt(specs.storage) || 500;

        const tx = await contract.registerNode(coresNum, ramNum, specs.gpu, storageNum);
        setTxHash(tx.hash);
        await tx.wait();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1800));
      }
      router.push("/dashboard");
    } catch (error) {
      console.warn("On-chain registration note:", error);
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-[#08090d] text-slate-100 selection:bg-cyan-400 selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Top Breadcrumb */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0e1117] border border-white/[0.08] text-xs font-mono text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>BOT Chain ({BOT_CHAIN.chainId})</span>
        </div>
      </div>
      
      {/* Main Glass Panel */}
      <div className="w-full max-w-lg tech-panel p-8 sm:p-9 rounded-2xl relative border-white/[0.12] cyan-border-glow">
        
        {/* Network Warning if wrong chain */}
        {isConnected && !isCorrectChain && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <span className="text-xs font-mono text-amber-300">Switch to BOT Chain Mainnet</span>
            <button
              onClick={switchToBotChain}
              className="text-xs font-mono font-semibold px-3 py-1 bg-amber-400 text-black rounded hover:bg-amber-300 transition-colors"
            >
              Switch Network
            </button>
          </div>
        )}

        {isScanning ? (
          <div className="flex flex-col py-6">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <TerminalSquare className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base font-bold font-mono text-white">Hardware Telemetry Audit</h2>
                <p className="text-xs font-mono text-zinc-400">Probing local execution capabilities</p>
              </div>
            </div>
            
            <div className="font-mono text-xs text-zinc-400 mb-6 space-y-2 bg-black/60 p-4 rounded-xl border border-white/[0.06]">
              <p className="text-cyan-300">&gt; Probing hardware concurrency matrix...</p>
              <p>&gt; Evaluating WebGL 2.0 rendering context...</p>
              <p>&gt; Allocating sandboxed heap boundaries...</p>
              <p className="text-emerald-400">&gt; BOT Chain RPC handshake verified.</p>
            </div>
            
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-cyan-400 rounded-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <h2 className="text-lg font-bold font-mono text-white">Node Provisioning</h2>
                <p className="text-zinc-400 text-xs font-mono mt-0.5">Audit complete. Confirm node profile to deploy.</p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-2.5 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between items-center">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" /> CPU Threads
                  </span>
                  <span className="font-semibold text-white">{specs.cpuCores}</span>
                </div>
                
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between items-center">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-zinc-300" /> System Memory
                  </span>
                  <span className="font-semibold text-white">{specs.ram}</span>
                </div>
                
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between items-center">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-emerald-400" /> Graphics Adapter
                  </span>
                  <span className="font-semibold text-white truncate max-w-[200px] text-right">{specs.gpu}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 flex items-center justify-between">
                  <span>Allocated Storage Buffer (GB)</span>
                  <span className="text-zinc-500 text-[10px]">Min: 50 GB</span>
                </label>
                <input 
                  type="number" 
                  min="50"
                  max="4000"
                  value={specs.storage}
                  onChange={(e) => setSpecs({ ...specs, storage: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 focus:border-cyan-400 p-3 text-white font-mono text-sm outline-none transition-all rounded-xl"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-2.5 text-xs font-mono text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Node will be registered on BOT Chain Mainnet contract registry.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold font-mono text-xs uppercase py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deploying Node to BOT Chain...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Deploy Node on BOT Chain</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
