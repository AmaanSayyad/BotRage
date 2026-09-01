// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/NodeRegistry.sol";

contract NodeRegistryTest is Test {
    NodeRegistry registry;
    address user1 = address(0x1);

    function setUp() public {
        registry = new NodeRegistry();
    }

    function testRegisterNode() public {
        vm.prank(user1);
        uint256 nodeId = registry.registerNode(16, 32, "NVIDIA RTX 4090", 1000);
        assertEq(nodeId, 1);

        NodeRegistry.Node memory node = registry.getNode(1);
        assertEq(node.owner, user1);
        assertEq(node.cpuCores, 16);
        assertEq(node.ramGB, 32);
        assertEq(node.active, true);
    }

    function testDeactivateNode() public {
        vm.prank(user1);
        registry.registerNode(8, 16, "AMD RX 7900", 500);

        vm.prank(user1);
        registry.deactivateNode(1);

        NodeRegistry.Node memory node = registry.getNode(1);
        assertEq(node.active, false);
    }

    function testDeactivateNotOwner() public {
        vm.prank(user1);
        registry.registerNode(8, 16, "AMD RX 7900", 500);

        vm.prank(address(0x2));
        vm.expectRevert("Not owner");
        registry.deactivateNode(1);
    }

    function testGetNodesByOwner() public {
        vm.startPrank(user1);
        registry.registerNode(8, 16, "GPU A", 500);
        registry.registerNode(16, 32, "GPU B", 1000);
        vm.stopPrank();

        uint256[] memory ids = registry.getNodesByOwner(user1);
        assertEq(ids.length, 2);
    }
}
