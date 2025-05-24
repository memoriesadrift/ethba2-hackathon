// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {TokenManager} from "../TokenManager.sol";
import {console} from "forge-std/Test.sol";

contract LidoClone {
    uint256 public constant PRECISION = 1e18;
    uint256 public constant ETH_PER_WSTETH = 1.205402e18;
    TokenManager public tokenManager;
    uint256 public ethId;
    uint256 public wstETHId;

    constructor(address _tokenManager, uint256 _ETHId, uint256 _wstETHId) {
        tokenManager = TokenManager(_tokenManager);
        ethId = _ETHId;
        wstETHId = _wstETHId;
    }

    function swapETHForWstETH(uint256 amountToSwap) external {
        require(
            tokenManager.balanceOf(msg.sender, ethId) >= amountToSwap,
            "Not enough ETH"
        );
        console.log("Swapping %s ETH for wstETH", amountToSwap);
        uint256 amountToMint = (amountToSwap * PRECISION) / ETH_PER_WSTETH;
        console.log("Minting %s wstETH", amountToMint);
        tokenManager.burn(msg.sender, ethId, amountToSwap);
        tokenManager.mint(msg.sender, wstETHId, amountToMint);
    }

    function swapWstETHForETH(uint256 amountToSwap) external {
        require(
            tokenManager.balanceOf(msg.sender, wstETHId) >= amountToSwap,
            "Not enough wstETH"
        );
        uint256 amountToMint = (amountToSwap * ETH_PER_WSTETH) / PRECISION;
        tokenManager.burn(msg.sender, wstETHId, amountToSwap);
        tokenManager.mint(msg.sender, ethId, amountToMint);
    }
}
