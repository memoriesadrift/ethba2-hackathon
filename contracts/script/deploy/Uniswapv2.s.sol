// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {UniswapV2FactoryClone} from "src/uniswapv2/UniswapV2FactoryClone.sol";
import {IOUtils, UniV2Deployment} from "script/Utils.sol";

contract Deploy is Script, IOUtils {
    function run() public {
        UniV2Deployment memory deployment = readUniV2Deployment();

        vm.startBroadcast();
        UniswapV2FactoryClone factory = new UniswapV2FactoryClone(
            deployment.factory
        );
        vm.stopBroadcast();

        // store deployed contract addresses
        string memory file = string.concat(deploymentDir, "clone/uniswapv2.json");
        vm.writeJson(vm.toString(address(factory)), file, ".factory");
    }
}
