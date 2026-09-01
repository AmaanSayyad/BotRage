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

// Replace these with real deployed addresses after running Deploy.s.sol
export const CONTRACTS = {
  nodeRegistry: "0x0000000000000000000000000000000000000000",
  rewardPool: "0x0000000000000000000000000000000000000000",
} as const;

export const isContractsDeployed = () => {
  return (
    CONTRACTS.nodeRegistry !== "0x0000000000000000000000000000000000000000" &&
    CONTRACTS.rewardPool !== "0x0000000000000000000000000000000000000000"
  );
};
