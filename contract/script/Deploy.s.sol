// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/WomanTech.sol";

contract Deploy is Script {
    function run() external {
        // Read environment variables
        string memory rpcUrl = vm.envString("RPC_URL");
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(privateKey);

        // Deploy WomanTech contract
        WomanTech womanTech = new WomanTech();
        
        vm.stopBroadcast();

        // Log deployment information
        console.log("WomanTech Connect deployed successfully!");
        console.log("Contract address:", address(womanTech));
        console.log("Deployer:", vm.addr(privateKey));
        console.log("Network RPC:", rpcUrl);
        
        // Save deployment info for easy access
        string memory deploymentInfo = string(abi.encodePacked(
            "WomanTech Connect Deployment\n",
            "============================\n",
            "Contract Address: ", vm.toString(address(womanTech)), "\n",
            "Deployer: ", vm.toString(vm.addr(privateKey)), "\n",
            "Network: ", rpcUrl, "\n",
            "Deployment Time: ", vm.toString(block.timestamp), "\n"
        ));
        
        vm.writeFile("deployment.txt", deploymentInfo);
    }
}
