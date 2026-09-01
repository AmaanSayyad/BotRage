"use client";

import { motion } from "framer-motion";
import { useBotChain } from "@/providers/BotChainProvider";
import { ArrowRight, Cpu, Layers, Zap, ExternalLink, ShieldCheck, Activity, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BOT_CHAIN } from "@/lib/constants";

export default function LandingPage() {
  const { connect, isConnecting, isConnected, isCorrectChain, switchToBotChain, address, balance } = useBotChain();
  const router = useRouter();
  
  // Custom cursor state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isConnected && isCorrectChain) {
      router.push("/onboard");
    }
  }, [isConnected, isCorrectChain, router]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "transparent",
      borderColor: "rgba(6, 182, 212, 0.6)",
    },
    hover: {
      x: mousePosition.x - 28,
      y: mousePosition.y - 28,
      height: 56,
      width: 56,
      backgroundColor: "rgba(6, 182, 212, 0.15)",
      borderColor: "rgba(6, 182, 212, 1)",
    }
  };

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
    <main className="bg-[#0a0a0f] text-white min-h-screen cursor-none selection:bg-cyan-500 selection:text-black font-sans relative overflow-hidden">
      
      {/* Custom Cursor */}
      <motion.div
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/80 rounded-full pointer-events-none z-50 flex items-center justify-center backdrop-blur-[1px]"
      >
        {isHovering && <span className="text-[9px] text-cyan-300 font-mono font-bold tracking-tighter">CLICK</span>}
      </motion.div>

      {/* Background Animated Gradient Mesh Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-600/15 via-violet-600/10 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-600/15 via-cyan-500/10 to-transparent blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Top Navbar / Network Status Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 border-b border-white/[0.06] bg-[#0a0a0f]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px] flex items-center justify-center">
              <div className="h-full w-full bg-[#0a0a0f] rounded-[7px] flex items-center justify-center">
                <Zap className="h-4 w-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-mono font-bold tracking-tight text-lg">
              BOT<span className="gradient-text">RAGE</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* BOT Chain Network Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121a] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BOT Chain Mainnet</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">ID: 677</span>
            </div>

            {/* Wallet Button in Nav */}
            <button
              onClick={handleCtaClick}
              disabled={isConnecting}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-2"
            >
              {isConnecting ? (
                <span>Connecting...</span>
              ) : isConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        
        {/* Pulsing Concentric Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-cyan-500/10 animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-violet-500/10 pointer-events-none" />

        <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-cyan-500/20 text-xs font-mono text-cyan-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>BOT Chain DePIN Protocol</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">~0.75s Block Time</span>
          </motion.div>

          {/* Main Hero Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-none mb-6 font-mono">
              BOT<span className="gradient-text">RAGE</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-48 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-6"
          />

          {/* Subtitle / Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg sm:text-2xl text-zinc-300 font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
              Monetize idle hardware on BOT Chain. <br className="hidden sm:block" />
              <span className="text-white font-semibold">Earn BOT while you sleep.</span>
            </p>
          </motion.div>

          {/* CTA Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={handleCtaClick}
              disabled={isConnecting}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative group px-10 py-4 rounded-xl font-mono text-sm tracking-wider uppercase font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-wait"
            >
              <span className="flex items-center gap-3">
                {isConnecting ? (
                  "Connecting Wallet..."
                ) : isConnected && !isCorrectChain ? (
                  "Switch to BOT Chain (677)"
                ) : isConnected ? (
                  "Launch Node →"
                ) : (
                  "Connect Wallet"
                )}
                {!isConnecting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>

            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="px-6 py-4 rounded-xl font-mono text-xs text-zinc-400 hover:text-white glass glass-hover transition-all flex items-center gap-2"
            >
              <span>Explore BOTScan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Key Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-3 gap-6 sm:gap-12 mt-16 pt-10 border-t border-white/[0.08] w-full max-w-2xl font-mono text-center"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold gradient-text">~0.75s</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Block Latency</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">$0.06</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Avg Transaction</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">EVM Compatible</div>
            </div>
          </motion.div>

        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest"
        >
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent" />
        </motion.div>
      </section>

      {/* Feature Section Architecture */}
      <section className="py-28 px-6 md:px-16 relative border-t border-white/[0.08] bg-[#0a0a0f]/40">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex items-baseline gap-4">
              <span className="text-cyan-400 font-mono text-sm font-bold">01 //</span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">System Architecture</h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">BOT Chain DePIN Core</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "001",
                title: "Hardware Agnostic",
                icon: Cpu,
                accent: "text-cyan-400",
                borderGlow: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]",
                desc: "Auto-detects CPU threads, RAM, and GPU capabilities directly through the browser environment. No drivers, no kernel installs, zero friction."
              },
              {
                number: "002",
                title: "Sandboxed Compute",
                icon: Layers,
                accent: "text-violet-400",
                borderGlow: "hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]",
                desc: "Workloads deploy inside isolated WebAssembly and microVM containers, guaranteeing absolute security and zero host environment contamination."
              },
              {
                number: "003",
                title: "BOT Chain Settlement",
                icon: Zap,
                accent: "text-emerald-400",
                borderGlow: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
                desc: "Micro-payments and yield streams settle natively on BOT Chain (Chain ID: 677) with sub-second finality, verifiable on BOTScan in real-time."
              }
            ].map((ft, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`group glass p-8 transition-all duration-300 flex flex-col justify-between ${ft.borderGlow}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                    <span className="text-zinc-500 font-mono text-xs">{ft.number}</span>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <ft.icon className={`w-5 h-5 ${ft.accent}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-3 tracking-wide">{ft.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-light text-sm">{ft.desc}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified on Chain ID 677</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Ecosystem Links Banner */}
          <div className="mt-16 p-8 glass flex flex-col sm:flex-row items-center justify-between gap-6 border-white/[0.08]">
            <div className="flex items-center gap-4">
              <Activity className="w-6 h-6 text-cyan-400" />
              <div>
                <h4 className="font-bold text-sm">Ready to provision your first BOT node?</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Connect with any EVM wallet and begin earning BOT in seconds.</p>
              </div>
            </div>
            <button
              onClick={handleCtaClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="px-6 py-3 rounded-lg font-mono text-xs uppercase font-semibold bg-white text-black hover:bg-zinc-200 transition-all shrink-0"
            >
              Get Started →
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}
