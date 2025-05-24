// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {LidoClone} from "src/liquidity-staking/LidoClone.sol";
import {TokenManager} from "src/TokenManager.sol";
import {CoreDeployment, IOUtils, TokensDeployment} from "script/Utils.sol";

contract Deploy is Script, IOUtils {
    function run() public {
        CoreDeployment memory core = readCoreDeployment();
        TokensDeployment memory tokens = readTokensDeployment();

        vm.startBroadcast();
        TokenManager tokenManager = TokenManager(core.tokenManager);
        uint256 ethId = tokenManager.tokenAddressToId(tokens.eth);
        uint256 wstETHId = tokenManager.createNewToken(
            address(0x0),
            "WstETHClone",
            "wstETH",
            18
        );
        LidoClone lidoClone = new LidoClone(address(tokenManager), ethId, wstETHId);
        tokenManager.addMintAuthority(address(lidoClone));
        vm.stopBroadcast();

        // store deployed contract addresses
        string memory file = string.concat(deploymentDir, "clone/lido.json");
        vm.writeJson(vm.toString(address(lidoClone)), file, ".lido");
    }
}
