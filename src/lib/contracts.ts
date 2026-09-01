export const NODE_REGISTRY_ABI = [
  "function registerNode(uint16 cpuCores, uint16 ramGB, string calldata gpuModel, uint16 storageGB) external returns (uint256)",
  "function deactivateNode(uint256 nodeId) external",
  "function getNode(uint256 nodeId) external view returns (tuple(uint256 id, address owner, uint16 cpuCores, uint16 ramGB, string gpuModel, uint16 storageGB, bool active, uint256 registeredAt))",
  "function getNodesByOwner(address owner) external view returns (uint256[])",
  "function getNodeCount() external view returns (uint256)",
  "event NodeRegistered(uint256 indexed nodeId, address indexed owner, uint16 cpuCores, uint16 ramGB, string gpuModel, uint16 storageGB)",
  "event NodeDeactivated(uint256 indexed nodeId, address indexed owner)",
] as const;

export const REWARD_POOL_ABI = [
  "function getAccruedReward(uint256 nodeId) public view returns (uint256)",
  "function claimReward(uint256 nodeId) external",
  "function getPoolBalance() external view returns (uint256)",
  "function depositRewards() external payable",
  "event RewardDeposited(address indexed depositor, uint256 amount)",
  "event RewardClaimed(uint256 indexed nodeId, address indexed claimer, uint256 amount)",
] as const;
