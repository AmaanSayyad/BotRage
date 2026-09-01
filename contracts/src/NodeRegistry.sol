// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract NodeRegistry {
    struct Node {
        uint256 id;
        address owner;
        uint16 cpuCores;
        uint16 ramGB;
        string gpuModel;
        uint16 storageGB;
        bool active;
        uint256 registeredAt;
    }

    uint256 public nextNodeId = 1;
    mapping(uint256 => Node) public nodes;
    mapping(address => uint256[]) public ownerNodes;

    event NodeRegistered(uint256 indexed nodeId, address indexed owner, uint16 cpuCores, uint16 ramGB, string gpuModel, uint16 storageGB);
    event NodeDeactivated(uint256 indexed nodeId, address indexed owner);

    function registerNode(uint16 cpuCores, uint16 ramGB, string calldata gpuModel, uint16 storageGB) external returns (uint256) {
        uint256 nodeId = nextNodeId++;
        nodes[nodeId] = Node({
            id: nodeId,
            owner: msg.sender,
            cpuCores: cpuCores,
            ramGB: ramGB,
            gpuModel: gpuModel,
            storageGB: storageGB,
            active: true,
            registeredAt: block.timestamp
        });
        ownerNodes[msg.sender].push(nodeId);
        emit NodeRegistered(nodeId, msg.sender, cpuCores, ramGB, gpuModel, storageGB);
        return nodeId;
    }

    function deactivateNode(uint256 nodeId) external {
        require(nodes[nodeId].owner == msg.sender, "Not owner");
        require(nodes[nodeId].active, "Already inactive");
        nodes[nodeId].active = false;
        emit NodeDeactivated(nodeId, msg.sender);
    }

    function getNode(uint256 nodeId) external view returns (Node memory) {
        return nodes[nodeId];
    }

    function getNodesByOwner(address owner) external view returns (uint256[] memory) {
        return ownerNodes[owner];
    }

    function getNodeCount() external view returns (uint256) {
        return nextNodeId - 1;
    }
}
