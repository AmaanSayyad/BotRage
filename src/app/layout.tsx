import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BotChainProvider } from "@/providers/BotChainProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "BOTRAGE | Decentralized Compute on BOT Chain",
  description: "Turn idle hardware into a private cloud node. Earn BOT on BOT Chain Mainnet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-base text-white antialiased min-h-screen flex flex-col`}>
        <BotChainProvider>
          <div className="flex-grow">{children}</div>
          <footer className="w-full border-t border-white/[0.08] py-8 px-6 mt-auto bg-[#0a0a0f]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300">BOTRage Network v1.0.0</span>
              </div>
              <div className="text-zinc-400">Decentralized Compute on BOT Chain</div>
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
