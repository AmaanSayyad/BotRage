// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./NodeRegistry.sol";

contract RewardPool {
    NodeRegistry public registry;
    address public owner;
    mapping(uint256 => uint256) public lastClaimed;

    uint256 public constant REWARD_RATE = 0.0001 ether; // 0.0001 BOT per second per active node

    event RewardDeposited(address indexed depositor, uint256 amount);
    event RewardClaimed(uint256 indexed nodeId, address indexed claimer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _registry) {
        registry = NodeRegistry(_registry);
        owner = msg.sender;
    }

    function depositRewards() external payable onlyOwner {
        require(msg.value > 0, "Zero deposit");
        emit RewardDeposited(msg.sender, msg.value);
    }

    function getAccruedReward(uint256 nodeId) public view returns (uint256) {
        NodeRegistry.Node memory node = registry.getNode(nodeId);
        if (!node.active || node.owner == address(0)) return 0;

        uint256 lastTime = lastClaimed[nodeId];
        if (lastTime == 0) lastTime = node.registeredAt;

        uint256 elapsed = block.timestamp - lastTime;
        return elapsed * REWARD_RATE;
    }

    function claimReward(uint256 nodeId) external {
        NodeRegistry.Node memory node = registry.getNode(nodeId);
        require(node.owner == msg.sender, "Not node owner");
        require(node.active, "Node inactive");

        uint256 reward = getAccruedReward(nodeId);
        require(reward > 0, "No reward");
        require(address(this).balance >= reward, "Pool empty");

        lastClaimed[nodeId] = block.timestamp;
        (bool sent, ) = payable(msg.sender).call{value: reward}("");
        require(sent, "Transfer failed");

        emit RewardClaimed(nodeId, msg.sender, reward);
    }

    function getPoolBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}
