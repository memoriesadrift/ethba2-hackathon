// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {UniswapV2FactoryClone} from "src/uniswapv2/UniswapV2FactoryClone.sol";
import {UniswapV2Router02Clone} from "src/uniswapv2/UniswapV2Router02Clone.sol";
import {IOUtils, UniV2Deployment} from "script/Utils.sol";

contract Deploy is Script, IOUtils {
    function run() public {
        UniV2Deployment memory deployment = readUniV2Deployment();

        vm.startBroadcast();
        UniswapV2FactoryClone factory = new UniswapV2FactoryClone(deployment.factory);
        UniswapV2Router02Clone router = new UniswapV2Router02Clone(deployment.v2Router02);
        vm.stopBroadcast();

        // store deployed contract addresses
        string memory file = string.concat(deploymentDir, "clone/uniswapv2.json");
        vm.writeJson(vm.toString(address(factory)), file, ".factory");
        vm.writeJson(vm.toString(address(router)), file, ".v2Router02");
    }
}
