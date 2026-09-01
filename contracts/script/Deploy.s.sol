// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/NodeRegistry.sol";
import "../src/RewardPool.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        NodeRegistry registry = new NodeRegistry();
        RewardPool pool = new RewardPool(address(registry));

        vm.stopBroadcast();

        console.log("NodeRegistry deployed to:", address(registry));
        console.log("RewardPool deployed to:", address(pool));
        console.log("Chain ID:", block.chainid);
    }
}
