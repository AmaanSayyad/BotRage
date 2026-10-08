import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BotChainProvider } from "@/providers/BotChainProvider";
import BotChainProofCard from "@/components/BotChainProofCard";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "BOTRAGE | Decentralized Compute on BOT Chain",
  description: "Monetize idle compute on BOT Chain Mainnet. Sub-second settlement and native EVM telemetry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-[#08090d] text-slate-100 antialiased min-h-[100dvh] flex flex-col`}>
        <BotChainProvider>
          <div className="flex-grow flex flex-col">{children}</div>
          <footer className="w-full border-t border-white/[0.08] py-6 px-6 bg-[#08090d]/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto mb-6">
              <BotChainProofCard />
            </div>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-zinc-300 font-medium">BOT Chain Mainnet (Chain ID 677)</span>
              </div>
              <div className="flex gap-6">
                <a href="https://scan.botchain.ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">BOTScan</a>
                <a href="https://dex.botchain.ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">DEX</a>
                <a href="https://bridge.botchain.ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Bridge</a>
                <a href="https://dev-docs.botchain.ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Docs</a>
              </div>
            </div>
          </footer>
        </BotChainProvider>
      </body>
    </html>
  );
}
