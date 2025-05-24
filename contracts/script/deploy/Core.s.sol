// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {GameManager} from "src/GameManager.sol";
import {TokenManager} from "src/TokenManager.sol";
import {IOUtils, UniV2Deployment} from "script/Utils.sol";

contract Deploy is Script, IOUtils {
    function run() public {
        vm.startBroadcast();
        TokenManager tokenManager = new TokenManager();
        GameManager gameManager = new GameManager(address(tokenManager));
        tokenManager.addMintAuthority(address(gameManager));
        tokenManager.createNewToken(0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913, "USD Coin", "USDC", 6);
        vm.stopBroadcast();

        // store deployed contract addresses
        string memory file = string.concat(deploymentDir, "core.json");
        vm.writeJson(vm.toString(address(gameManager)), file, ".gameManager");
        vm.writeJson(vm.toString(address(tokenManager)), file, ".tokenManager");
    }
}
