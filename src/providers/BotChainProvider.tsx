"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { BrowserProvider, JsonRpcSigner, formatEther } from "ethers";
import { BOT_CHAIN } from "@/lib/constants";

interface BotChainContextType {
  address: string | null;
  balance: string | null;       // formatted BOT balance e.g. "12.345"
  chainId: number | null;
  isConnected: boolean;
  isCorrectChain: boolean;
  isConnecting: boolean;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToBotChain: () => Promise<void>;
}

const BotChainContext = createContext<BotChainContextType>({
  address: null,
  balance: null,
  chainId: null,
  isConnected: false,
  isCorrectChain: false,
  isConnecting: false,
  provider: null,
  signer: null,
  connect: async () => {},
  disconnect: () => {},
  switchToBotChain: async () => {},
});

export function BotChainProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const isConnected = !!address;
  const isCorrectChain = chainId === BOT_CHAIN.chainId;

  const fetchBalance = useCallback(async (prov: BrowserProvider, addr: string) => {
    try {
      const bal = await prov.getBalance(addr);
      setBalance(formatEther(bal));
    } catch {
      setBalance(null);
    }
  }, []);

  const switchToBotChain = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BOT_CHAIN.chainIdHex }],
      });
    } catch (switchError: any) {
      // Chain not added to wallet — add it
      if (switchError.code === 4902 || switchError.message?.includes("Unrecognized chain ID")) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: BOT_CHAIN.chainIdHex,
              chainName: BOT_CHAIN.name,
              rpcUrls: [BOT_CHAIN.rpcUrl],
              blockExplorerUrls: [BOT_CHAIN.explorer],
              nativeCurrency: BOT_CHAIN.nativeCurrency,
            }],
          });
        } catch (addError) {
          console.error("Failed to add BOT Chain to wallet:", addError);
        }
      }
    }
  }, []);

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask, Rabby, or any compatible EVM wallet to connect to BOT Chain.");
      return;
    }
    setIsConnecting(true);
    try {
      const prov = new BrowserProvider(window.ethereum);
      await prov.send("eth_requestAccounts", []);
      const s = await prov.getSigner();
      const addr = await s.getAddress();
      const network = await prov.getNetwork();

      setProvider(prov);
      setSigner(s);
      setAddress(addr);
      const currentChainId = Number(network.chainId);
      setChainId(currentChainId);
      await fetchBalance(prov, addr);

      // Auto-switch to BOT Chain if not on it
      if (currentChainId !== BOT_CHAIN.chainId) {
        await switchToBotChain();
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance, switchToBotChain]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance(null);
    setChainId(null);
    setProvider(null);
    setSigner(null);
  }, []);

  // Listen for account & chain changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
        if (provider) fetchBalance(provider, accounts[0]);
      }
    };

    const handleChainChanged = (newChainId: string) => {
      setChainId(parseInt(newChainId, 16));
      if (window.ethereum) {
        const prov = new BrowserProvider(window.ethereum);
        setProvider(prov);
      }
    };

    window.ethereum.on?.("accountsChanged", handleAccountsChanged);
    window.ethereum.on?.("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [provider, fetchBalance, disconnect]);

  return (
    <BotChainContext.Provider value={{
      address, balance, chainId, isConnected, isCorrectChain,
      isConnecting, provider, signer, connect, disconnect, switchToBotChain,
    }}>
      {children}
    </BotChainContext.Provider>
  );
}

export const useBotChain = () => useContext(BotChainContext);
