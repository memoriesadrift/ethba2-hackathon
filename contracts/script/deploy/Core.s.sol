// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {GameManager} from "src/GameManager.sol";
import {TokenManager} from "src/TokenManager.sol";
import {IOUtils, UniV2Deployment} from "script/Utils.sol";

contract Deploy is Script, IOUtils {
    function run() public {
        vm.startBroadcast();
        TokenManager tokenManager = new TokenManager("");
        GameManager gameManager = new GameManager(address(tokenManager));
        vm.stopBroadcast();

        // store deployed contract addresses
        string memory file = string.concat(deploymentDir, "core.json");
        vm.writeJson(vm.toString(address(gameManager)), file, ".gameManager");
        vm.writeJson(vm.toString(address(tokenManager)), file, ".tokenManager");
    }
}
