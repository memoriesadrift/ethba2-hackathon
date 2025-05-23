// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract UniswapV2Router02Clone {
    address public original;

    constructor(address _original) {
        original = _original;
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
