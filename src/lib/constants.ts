export const BOT_CHAIN = {
  chainId: 677,
  chainIdHex: "0x2a5",
  name: "BOT Chain Mainnet",
  rpcUrl: "https://rpc.botchain.ai",
  explorer: "https://scan.botchain.ai",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
} as const;

export const CONTRACTS = {
  nodeRegistry: "0x80eeedf05955a93fa4f42c16805f40da0b15f6be",
  rewardPool: "0xcff046c4bcbab4f25254fd41d94f8acd7a3334fa",
} as const;

/** Latest NodeRegistry transaction on BOT Chain mainnet. */
export const LATEST_REGISTRY_RECEIPT =
  "0x72f4f01bdd3122b511fb5d1055b23ce796e02d801a732b606d84c96a039e19d8" as const;

export const isContractsDeployed = () => {
  return (
    CONTRACTS.nodeRegistry !== "0x0000000000000000000000000000000000000000" &&
    CONTRACTS.rewardPool !== "0x0000000000000000000000000000000000000000"
  );
};
