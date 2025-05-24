// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/StdJson.sol";

// ! Important: Keep struct fields in this file in alphabetical order.
// See https://book.getfoundry.sh/cheatcodes/parse-json#decoding-json-objects-into-solidity-structs

// ======= Autonom mainnet contracts =======
struct UniV2Pairs {
    address ethDino;
    address ethUsdc;
    address virtualEth;
}

struct UniV2Deployment {
    address factory;
    UniV2Pairs pairs;
    address v2Router02;
}

struct TokensDeployment {
    address dino;
    address eth;
    address usdc;
    address virtualProtocol;
}

struct CoreDeployment {
    address gameManager;
    address tokenManager;
}

struct AaveDeployment {
    address aaveV3Pool;
    address aaveDataProvider;
}

contract IOUtils is Script {
    string deploymentDir;

    constructor() {
        string memory deploymentName = vm.envString("DEPLOYMENT");
        deploymentDir = string.concat(vm.projectRoot(), "/addresses/", deploymentName, "/");
    }

    function readUniV2Deployment() internal view returns (UniV2Deployment memory) {
        string memory raw = vm.readFile(string.concat(deploymentDir, "original/uniswapv2.json"));
        bytes memory rawBytes = vm.parseJson(raw);
        return abi.decode(rawBytes, (UniV2Deployment));
    }

    function readTokensDeployment() internal view returns (TokensDeployment memory) {
        string memory raw = vm.readFile(string.concat(deploymentDir, "original/tokens.json"));
        bytes memory rawBytes = vm.parseJson(raw);
        return abi.decode(rawBytes, (TokensDeployment));
    }

    function readCoreDeployment() internal view returns (CoreDeployment memory) {
        string memory raw = vm.readFile(string.concat(deploymentDir, "core.json"));
        bytes memory rawBytes = vm.parseJson(raw);
        return abi.decode(rawBytes, (CoreDeployment));
    }

    function readAaveDeployment() internal view returns (AaveDeployment memory) {
        string memory raw = vm.readFile(string.concat(deploymentDir, "original/aave.json"));
        bytes memory rawBytes = vm.parseJson(raw);
        return abi.decode(rawBytes, (AaveDeployment));
    }
}
