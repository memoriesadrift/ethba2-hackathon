// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {Test, console} from "forge-std/Test.sol";
import {TokenManager} from "../src/TokenManager.sol";
import {GameManager} from "../src/GameManager.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
}

contract GameManagerTest is Test {
    TokenManager public tokenManager;
    GameManager public gameManager;
    TestERC20 token = new TestERC20("USD Circle", "USDC");
    address public player = address(0x1);

    function setUp() public {
        tokenManager = new TokenManager();
        gameManager = new GameManager(address(tokenManager));
        tokenManager.createNewToken(address(token), "USD Coin", "USDC", 6);
        tokenManager.addMintAuthority(address(gameManager));
    }

    function testEnterCompetition() public {
        vm.startPrank(player);
        gameManager.enterCompetition();
        (
            bool isRegistered,
            uint256 registeredAt,
            ,
            uint256 score
        ) = gameManager.players(player);
        assertTrue(isRegistered, "Player should be registered after entering");
        assertEq(
            registeredAt,
            block.timestamp,
            "Player should be registered at the current block timestamp"
        );
        assertEq(
            score,
            0,
            "Player's score should be 0 after entering competition"
        );
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            1e6,
            "Plater should have initial tokens after entering competition"
        );
        vm.stopPrank();
    }

    function testLeaveCompetition() public {
        vm.startPrank(player);
        gameManager.enterCompetition();
        (
            bool isRegistered,
            uint256 registeredAt,
            uint256 leftAt,
            uint256 score
        ) = gameManager.players(player);
        assertTrue(isRegistered, "Player should be registered after entering");
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            1e6,
            "Player should have initial tokens after entering competition"
        );
        gameManager.leaveCompetition();
        (isRegistered, registeredAt, leftAt, score) = gameManager.players(
            player
        );
        assertFalse(
            isRegistered,
            "Player should not be registered after leaving"
        );
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            0,
            "Player should have 0 tokens after leaving the competition"
        );
        assertEq(
            leftAt,
            block.timestamp,
            "Player should have left at the current block timestamp"
        );
        vm.stopPrank();
    }
}
