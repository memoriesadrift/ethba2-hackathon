// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {AaveV3PoolClone} from "src/aave/AaveV3PoolClone.sol";
import {TokenManager} from "src/TokenManager.sol";
import {AaveDeployment, CoreDeployment, IOUtils, TokensDeployment} from "script/Utils.sol";

contract Deploy is Script, IOUtils {
    function run() public {
        AaveDeployment memory aave = readAaveDeployment();
        CoreDeployment memory core = readCoreDeployment();
        TokensDeployment memory tokens = readTokensDeployment();

        vm.startBroadcast();
        AaveV3PoolClone aavePoolClone = new AaveV3PoolClone(
            aave.aaveV3Pool,
            core.tokenManager,
            aave.aaveDataProvider
        );

        TokenManager tokenManager = TokenManager(core.tokenManager);
        tokenManager.addMintAuthority(address(aavePoolClone));

        uint256 aaveUsdcId = tokenManager.createNewToken(
            address(69),
            "AAVE Supplied USD Coin",
            "aUSDC",
            6
        );
        uint256 usdcId = tokenManager.tokenAddressToId(tokens.usdc);
        aavePoolClone.addSupportedAsset(usdcId, aaveUsdcId);
        vm.stopBroadcast();

        // store deployed contract addresses
        string memory file = string.concat(deploymentDir, "clone/aave.json");
        vm.writeJson(vm.toString(address(aavePoolClone)), file, ".aaveV3Pool");
    }
}
