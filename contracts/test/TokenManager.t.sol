// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TokenManager} from "../src/TokenManager.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
}

contract TokenManagerTest is Test {
    TokenManager public tokenManager;
    address admin = makeAddr("admin");
    address user = makeAddr("user");
    address authorisedContract = makeAddr("authorisedContract");
    TestERC20 token = new TestERC20("USD Circle", "USDC");

    function setUp() public {
        vm.startPrank(admin);
        tokenManager = new TokenManager();
        vm.stopPrank();
    }

    function test_onlyOwner() public {
        vm.startPrank(user);
        vm.expectRevert();
        tokenManager.addMintAuthority(authorisedContract);
        vm.stopPrank();
    }

    function test_createNewToken() public {
        vm.startPrank(admin);
        tokenManager.createNewToken(address(token), "USD Coin", "USDC", 6);
        vm.stopPrank();
    }

    function test_mintAuthority() public {
        vm.startPrank(admin);
        tokenManager.addMintAuthority(authorisedContract);
        tokenManager.createNewToken(address(token), "USD Coin", "USDC", 6);
        vm.startPrank(authorisedContract);
        tokenManager.mint(user, 0, 10);
        assertEq(tokenManager.balanceOf(user, 0), 10);
        vm.stopPrank();
    }
}
