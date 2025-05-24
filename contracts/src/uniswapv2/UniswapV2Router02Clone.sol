// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {UniswapV2Library} from "./UniswapV2Library.sol";
import {IUniswapV2Pair} from "@uniswap-v2/core/interfaces/IUniswapV2Pair.sol";
import {TokenManager} from "../TokenManager.sol";

contract UniswapV2Router02Clone {
    address public original;
    address public factory;
    TokenManager public tokenManager;

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, "UniswapV2Router: EXPIRED");
        _;
    }

    constructor(address _original, address _factory, address _tokenManager) {
        tokenManager = TokenManager(_tokenManager);
        factory = _factory;
        original = _original;
    }

    // SWAP
    function _swap(
        uint[] memory amounts,
        address[] memory path,
        address _to
    ) internal {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
            (uint amount0Out, uint amount1Out) = input == token0
                ? (uint(0), amountOut)
                : (amountOut, uint(0));
            address to = i < path.length - 2
                ? UniswapV2Library.pairFor(factory, output, path[i + 2])
                : _to;
            tokenManager.mint(
                to,
                tokenManager.tokenAddressToId(output),
                amount0Out
            );
            tokenManager.burn(
                to,
                tokenManager.tokenAddressToId(input),
                amount1Out
            );
        }
    }

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(
            amounts[0] <= amountInMax,
            "UniswapV2Router: EXCESSIVE_INPUT_AMOUNT"
        );
        tokenManager.burn(
            msg.sender,
            tokenManager.tokenAddressToId(path[0]),
            amounts[0]
        );
        _swap(amounts, path, to);
    }

    // Fallback function to delegate calls to the original contract
    fallback() external {
        address orig = original;
        assembly {
            // Copy msg.data. We overwrite the Solidity scratch pad at memory position 0
            calldatacopy(0, 0, calldatasize())

            // Call the implementation
            let result := delegatecall(gas(), orig, 0, calldatasize(), 0, 0)

            // Copy the returned data
            returndatacopy(0, 0, returndatasize())

            // Return or revert depending on the result
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {}
}
