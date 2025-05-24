// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {GameManager} from "src/GameManager.sol";
import {TokenManager} from "src/TokenManager.sol";
import {IOUtils, TokensDeployment} from "script/Utils.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract Deploy is Script, IOUtils {
    function run() public {
        TokensDeployment memory tokens = readTokensDeployment();

        vm.startBroadcast();
        TokenManager tokenManager = new TokenManager();
        GameManager gameManager = new GameManager(address(tokenManager));
        tokenManager.addMintAuthority(address(gameManager));

        IERC20Metadata usdc = IERC20Metadata(tokens.usdc);
        IERC20Metadata eth = IERC20Metadata(tokens.eth);
        IERC20Metadata dino = IERC20Metadata(tokens.dino);
        IERC20Metadata virtualProtocol = IERC20Metadata(tokens.virtualProtocol);
        tokenManager.createNewToken(tokens.usdc, usdc.name(), usdc.symbol(), usdc.decimals());
        tokenManager.createNewToken(tokens.eth, eth.name(), eth.symbol(), eth.decimals());
        tokenManager.createNewToken(tokens.dino, dino.name(), dino.symbol(), dino.decimals());
        tokenManager.createNewToken(tokens.virtualProtocol, virtualProtocol.name(), virtualProtocol.symbol(), virtualProtocol.decimals());
        vm.stopBroadcast();

        // store deployed contract addresses
        string memory file = string.concat(deploymentDir, "core.json");
        vm.writeJson(vm.toString(address(gameManager)), file, ".gameManager");
        vm.writeJson(vm.toString(address(tokenManager)), file, ".tokenManager");
    }
}
