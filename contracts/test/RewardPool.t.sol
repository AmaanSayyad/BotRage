// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/NodeRegistry.sol";
import "../src/RewardPool.sol";

contract RewardPoolTest is Test {
    NodeRegistry registry;
    RewardPool pool;
    address user1 = address(0x1);
    address deployer = address(this);

    function setUp() public {
        registry = new NodeRegistry();
        pool = new RewardPool(address(registry));
        vm.deal(deployer, 100 ether);
        pool.depositRewards{value: 10 ether}();
    }

    function testDeposit() public view {
        assertEq(pool.getPoolBalance(), 10 ether);
    }

    function testClaimReward() public {
        vm.prank(user1);
        registry.registerNode(8, 16, "GPU", 500);

        vm.warp(block.timestamp + 3600); // 1 hour later

        vm.prank(user1);
        pool.claimReward(1);

        assertGt(user1.balance, 0);
    }

    function testClaimNotOwner() public {
        vm.prank(user1);
        registry.registerNode(8, 16, "GPU", 500);

        vm.warp(block.timestamp + 3600);

        vm.prank(address(0x2));
        vm.expectRevert("Not node owner");
        pool.claimReward(1);
    }

    // Required so the test contract can receive funds if needed
    receive() external payable {}
}
