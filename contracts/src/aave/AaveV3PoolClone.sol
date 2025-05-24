// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {TokenManager} from '../TokenManager.sol';
import {AaveProtocolDataProvider} from '@aave-v3/contracts/helpers/AaveProtocolDataProvider.sol';

contract AaveV3CoreClone is Ownable {
    TokenManager private tokenManager;
    AaveProtocolDataProvider private aaveDataProvider;
    address public original;

    mapping(address => uint256) private indices;
    mapping(uint256 => uint256) private assetIdToAAssetId;
    mapping(uint256 => uint256) private aAssetIdToAssetId;
    mapping(uint256 => bool) private supportedAssets;

    constructor(address _original, address _tokenManager, address _aaveDataProvider) Ownable(msg.sender) {
        original = _original;
        tokenManager = TokenManager(_tokenManager);
        aaveDataProvider = AaveProtocolDataProvider(_aaveDataProvider);
    }

    function supply(uint256 assetId, uint256 amount) external {
        require(!!supportedAssets[assetId], "Supplying this asset to AAVE is not supported for now");
        address asset = tokenManager.realTokenAddress(assetId);
        (, , , , , , , , , uint256 liquidityIndex, , ) = aaveDataProvider.getReserveData(asset);

        indices[msg.sender] = liquidityIndex;
        // Give the user the aToken for their token
        tokenManager.burn(msg.sender, assetId, amount);
        tokenManager.mint(msg.sender, assetIdToAAssetId[assetId], amount);
    }

    function withdraw(uint256 aAssetId, uint256 amount) external returns (uint256) {
        // Give the user the aToken for their token
        tokenManager.burn(msg.sender, aAssetId, amount);
        // NOTE: Also claim the user's rewards, not the case by default, 
        // but ok for our simulation
        address asset = tokenManager.realTokenAddress(aAssetIdToAssetId[aAssetId]);
        (, , , , , , , , , uint256 currentIndex, , ) = aaveDataProvider.getReserveData(asset);
        uint256 delta = currentIndex - indices[msg.sender];

        uint256 owedRewards = amount + amount * delta;

        tokenManager.mint(msg.sender, aAssetIdToAssetId[aAssetId], owedRewards);

        return owedRewards;
    }

    /// @dev Populates the necessary data fields for supply / withdraw to work
    function addSupportedAsset(uint256 assetId, uint256 aAssetId) external onlyOwner {
        supportedAssets[assetId] = true;
        assetIdToAAssetId[assetId] = aAssetId;
        aAssetIdToAssetId[aAssetId] = assetId;
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
