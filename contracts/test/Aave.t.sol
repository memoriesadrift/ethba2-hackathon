// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {Test, console} from "forge-std/Test.sol";
import {AaveProtocolDataProvider} from "@aave-v3/contracts/helpers/AaveProtocolDataProvider.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {TokenManager} from "../src/TokenManager.sol";
import {GameManager} from "../src/GameManager.sol";
import {AaveV3PoolClone} from "../src/aave/AaveV3PoolClone.sol";

contract TestERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
}

contract AaveTest is Test {
    TokenManager public tokenManager;
    GameManager public gameManager;
    AaveV3PoolClone public aave;
    TestERC20 token = new TestERC20("USD Circle", "USDC");
    address public player = address(0x1);

    function setUp() public {
        tokenManager = new TokenManager();
        gameManager = new GameManager(address(tokenManager));
        aave = new AaveV3PoolClone(
            0xA238Dd80C259a72e81d7e4664a9801593F98d1c5,
            address(tokenManager),
            address(0xC4Fcf9893072d61Cc2899C0054877Cb752587981)
        );
        tokenManager.createNewToken(
            address(0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913),
            "USD Coin",
            "USDC",
            6
        );
        tokenManager.addMintAuthority(address(gameManager));
        tokenManager.addMintAuthority(address(aave));
        tokenManager.createNewToken(
            address(69),
            "AAVE Supplied USD Coin",
            "aUSDC",
            6
        );
        aave.addSupportedAsset(0, 1);
    }

    function testAaveInteraction() public {
        vm.startPrank(player);
        gameManager.enterCompetition();
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            1e6
        );
        aave.supply(0, 1e6);
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            0
        );
        assertEq(tokenManager.balanceOf(player, 1), 1e6);
        aave.withdraw(1, 1e6);
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            1e6
        );
        assertEq(tokenManager.balanceOf(player, 1), 0);

        vm.stopPrank();
    }
}
