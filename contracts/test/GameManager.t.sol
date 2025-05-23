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
        tokenManager = new TokenManager("");
        gameManager = new GameManager(address(tokenManager));
        tokenManager.createNewToken(address(token));
        tokenManager.addMintAuthority(address(gameManager));
    }

    function testEnterCompetition() public {
        vm.startPrank(player);
        gameManager.enterCompetition();
        (
            bool isRegistered,
            uint256 registeredAt,
            uint256 leftAt,
            uint256 score
        ) = gameManager.players(player);
        assertTrue(isRegistered);
        assertEq(registeredAt, block.timestamp);
        assertEq(score, 0);
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            1e6
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
        assertTrue(isRegistered);
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            1e6
        );
        gameManager.leaveCompetition();
        (isRegistered, registeredAt, leftAt, score) = gameManager.players(
            player
        );
        assertFalse(isRegistered);
        assertEq(
            tokenManager.balanceOf(player, gameManager.testUSDCTokenId()),
            0
        );
        assertEq(leftAt, block.timestamp);
        vm.stopPrank();
    }
}
