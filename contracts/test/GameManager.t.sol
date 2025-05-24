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
    address public player2 = address(0x2);
    address public player3 = address(0x3);
    address public player4 = address(0x4);
    address public player5 = address(0x5);
    address public player6 = address(0x6);

    function setUp() public {
        tokenManager = new TokenManager();
        gameManager = new GameManager(address(tokenManager));
        tokenManager.createNewToken(address(token), "USD Coin", "USDC", 6);
        tokenManager.addMintAuthority(address(gameManager));
        tokenManager.addMintAuthority(address(this));
    }

    function testEnterCompetition() public {
        vm.startPrank(player);
        gameManager.enterCompetition();
        (
            ,
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
            address playerAddress,
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
        (playerAddress, isRegistered, registeredAt, leftAt, score) = gameManager
            .players(player);
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

    function testSubmitScore() public {
        vm.startPrank(player);
        gameManager.enterCompetition();
        vm.stopPrank();
        tokenManager.mint(player, gameManager.testUSDCTokenId(), 2e4);
        vm.startPrank(player);
        gameManager.submitScore();
        vm.stopPrank();
        vm.startPrank(player2);
        gameManager.enterCompetition();
        vm.stopPrank();
        tokenManager.mint(player2, gameManager.testUSDCTokenId(), 3e4);
        vm.startPrank(player2);
        gameManager.submitScore();
        vm.stopPrank();
        assertEq(
            gameManager.getTop5Players()[0].score,
            1e6 + 3e4,
            "Top player doesn't have the correct score"
        );
        assertEq(
            gameManager.getTop5Players()[1].score,
            1e6 + 2e4,
            "Second player doesn't have the correct score"
        );
        assertEq(
            gameManager.getTop5Players()[2].score,
            0,
            "Third player should not have a score"
        );
        vm.startPrank(player3);
        gameManager.enterCompetition();
        vm.stopPrank();
        tokenManager.mint(player3, gameManager.testUSDCTokenId(), 6e4);
        vm.startPrank(player3);
        gameManager.submitScore();
        vm.stopPrank();

        vm.startPrank(player4);
        gameManager.enterCompetition();
        vm.stopPrank();
        tokenManager.mint(player4, gameManager.testUSDCTokenId(), 5e4);
        vm.startPrank(player4);
        gameManager.submitScore();
        vm.stopPrank();

        vm.startPrank(player5);
        gameManager.enterCompetition();
        vm.stopPrank();
        tokenManager.mint(player, gameManager.testUSDCTokenId(), 1e4);
        vm.startPrank(player5);
        gameManager.submitScore();
        vm.stopPrank();

        vm.startPrank(player6);
        gameManager.enterCompetition();
        vm.stopPrank();
        tokenManager.mint(player6, gameManager.testUSDCTokenId(), 8e4);
        vm.startPrank(player6);
        gameManager.submitScore();
        vm.stopPrank();

        console.log(
            "Top 1 Player: %s, Score: %s",
            gameManager.getTop5Players()[0].playerAddress,
            gameManager.getTop5Players()[0].score
        );
        console.log(
            "Top 2 Player: %s, Score: %s",
            gameManager.getTop5Players()[1].playerAddress,
            gameManager.getTop5Players()[1].score
        );
        console.log(
            "Top 3 Player: %s, Score: %s",
            gameManager.getTop5Players()[2].playerAddress,
            gameManager.getTop5Players()[2].score
        );
        console.log(
            "Top 4 Player: %s, Score: %s",
            gameManager.getTop5Players()[3].playerAddress,
            gameManager.getTop5Players()[3].score
        );
        console.log(
            "Top 5 Player: %s, Score: %s",
            gameManager.getTop5Players()[4].playerAddress,
            gameManager.getTop5Players()[4].score
        );
    }
}
