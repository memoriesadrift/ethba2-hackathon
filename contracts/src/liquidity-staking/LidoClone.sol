// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {TokenManager} from "../TokenManager.sol";

interface IWstETH {
    function getStETHByWstETH(
        uint256 wstETHAmount
    ) external view returns (uint256);

    function getWstETHByStETH(
        uint256 stETHAmount
    ) external view returns (uint256);
}

contract WrappedStETHClone {
    IWstETH original;
    TokenManager public tokenManager;
    uint256 ethId;
    uint256 wstETHId;

    constructor(
        address _tokenManager,
        address _original,
        uint256 _ETHId,
        uint256 _wstETHId
    ) {
        original = IWstETH(_original);
        tokenManager = TokenManager(_tokenManager);
        ethId = _ETHId;
        wstETHId = _wstETHId;
    }

    function swapETHForWstETH(uint256 amountToSwap) external {
        require(
            tokenManager.balanceOf(msg.sender, ethId) >= amountToSwap,
            "Not enough ETH"
        );
        uint256 amountToMint = original.getWstETHByStETH(amountToSwap);
        tokenManager.burn(msg.sender, ethId, amountToSwap);
        tokenManager.mint(msg.sender, wstETHId, amountToMint);
    }

    function swapWstETHForETH(uint256 amountToSwap) external {
        require(
            tokenManager.balanceOf(msg.sender, wstETHId) >= amountToSwap,
            "Not enough wstETH"
        );
        uint256 amountToMint = original.getStETHByWstETH(amountToSwap);
        tokenManager.burn(msg.sender, wstETHId, amountToSwap);
        tokenManager.mint(msg.sender, ethId, amountToMint);
    }
}
