// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {Test, console} from "forge-std/Test.sol";
import {TokenManager} from "../src/TokenManager.sol";
import {LidoClone} from "../src/liquidity-staking/LidoClone.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
}

contract LidoCloneTest is Test {
    TokenManager public tokenManager;
    LidoClone public lidoClone;
    address originalLido = address(0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84);
    TestERC20 tokenETH = new TestERC20("EthClone", "ETH");
    TestERC20 tokenWstETH = new TestERC20("WstETHClone", "wstETH");
    address public admin = makeAddr("admin");
    address public player = address(0x1);

    function setUp() public {
        vm.startPrank(admin);
        tokenManager = new TokenManager("");
        uint256 ethId = tokenManager.createNewToken(address(tokenETH));
        uint256 wstETHId = tokenManager.createNewToken(address(tokenWstETH));
        lidoClone = new LidoClone(address(tokenManager), ethId, wstETHId);
        tokenManager.addMintAuthority(address(lidoClone));
        tokenManager.addMintAuthority(admin);
        tokenManager.mint(player, ethId, 100);
        vm.stopPrank();
    }

    function testFunctionality() public {
        vm.startPrank(player);
        lidoClone.swapETHForWstETH(50);
        assertEq(
            tokenManager.balanceOf(player, lidoClone.wstETHId()),
            41,
            "Player should have wstETH after swapping ETH for wstETH"
        );
        lidoClone.swapWstETHForETH(
            tokenManager.balanceOf(player, lidoClone.wstETHId())
        );
        assertEq(
            tokenManager.balanceOf(player, lidoClone.ethId()),
            99,
            "Player should have ETH after swapping wstETH for ETH"
        );
        assertEq(
            tokenManager.balanceOf(player, lidoClone.wstETHId()),
            0,
            "Player should have no wstETH after swapping back to ETH"
        );
        vm.stopPrank();
    }
}
