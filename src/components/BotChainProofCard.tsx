import type { ReactNode } from "react";
import { BOT_CHAIN, CONTRACTS, LATEST_REGISTRY_RECEIPT } from "@/lib/constants";

const registryUrl = `${BOT_CHAIN.explorer}/address/${CONTRACTS.nodeRegistry}`;
const receiptUrl = `${BOT_CHAIN.explorer}/tx/${LATEST_REGISTRY_RECEIPT}`;

function ProofValue({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 text-[13px] font-medium leading-none tracking-tight text-[#2EE6C8] hover:text-[#7dffe4] sm:text-[15px]"
    >
      <span className="whitespace-nowrap">{children}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0">
        <path d="M3.2 8.8 8.8 3.2M5 3.2h3.8V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function BotChainProofCard() {
  return (
    <section className="w-full overflow-x-auto rounded-2xl border border-[#163832] bg-[#071210] px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1AD6A0]">
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden>
            <path fill="#fff" d="M3.1 2.1h8.4L13.2 5H6L3.1 2.1Z" />
            <path fill="#fff" d="M5.2 6.1h6.6L10 9.1H3.2l2-3Z" />
            <path fill="#fff" d="M2.8 10.2h8.6L13.2 14H4.4L2.8 10.2Z" />
          </svg>
        </span>
        <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white sm:text-[15px]">
          PROOF ON BOT MAINNET
        </h2>
      </div>

      <dl className="mt-8 min-w-[640px] space-y-5 sm:mt-9 sm:min-w-0">
        <div className="flex items-center justify-between gap-6">
          <dt className="text-[11px] font-medium tracking-[0.18em] text-[#7d8b88]">CHAIN ID</dt>
          <dd>
            <ProofValue href={BOT_CHAIN.explorer}>{BOT_CHAIN.chainId}</ProofValue>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-6">
          <dt className="text-[11px] font-medium tracking-[0.18em] text-[#7d8b88]">REGISTRY ADDRESS</dt>
          <dd>
            <ProofValue href={registryUrl}>{CONTRACTS.nodeRegistry}</ProofValue>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-6">
          <dt className="text-[11px] font-medium tracking-[0.18em] text-[#7d8b88]">LATEST RECEIPT</dt>
          <dd>
            <ProofValue href={receiptUrl}>{LATEST_REGISTRY_RECEIPT}</ProofValue>
          </dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
        <a
          href="https://www.botchain.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2EE6C8] hover:text-[#7dffe4] sm:text-[15px]"
        >
          Built on BOT Chain
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3.2 8.8 8.8 3.2M5 3.2h3.8V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href={BOT_CHAIN.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2EE6C8] hover:text-[#7dffe4] sm:text-[15px]"
        >
          BOTScan explorer
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3.2 8.8 8.8 3.2M5 3.2h3.8V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
