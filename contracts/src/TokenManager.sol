// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract TokenManager is ERC1155, Ownable {
    constructor(string memory _uri) ERC1155(_uri) Ownable(msg.sender) {
        nextFreeTokenId = 0;
    }

    uint256 private nextFreeTokenId;
    mapping(uint256 => string) public tokenNames;
    mapping(uint256 => string) public tokenSymbols;
    mapping(uint256 => uint8) public tokenDecimals;

    /// Maps the token id to the corresponding real token
    mapping(uint256 => address) public realTokenAddress;

    /// Who is allowed to mint tokens
    mapping(address => bool) private _mintAuthority;

    modifier onlyMintAuthority() {
        require(
            _mintAuthority[msg.sender] == true,
            "Only mint authority can call this method!"
        );
        _;
    }

    /// @dev Adds a new mint authority, enabling them to mint and burn tokens
    function addMintAuthority(address newAuthority) public onlyOwner {
        _mintAuthority[newAuthority] = true;
    }

    /**
     * @notice Creates a new mocked token based on a real token address
     */
    function createNewToken(address token) public onlyOwner returns (uint256) {
        uint256 tokenId = nextFreeTokenId;

        // Save token metadata
        realTokenAddress[tokenId] = token;
        tokenNames[tokenId] = IERC20Metadata(token).name();
        tokenSymbols[tokenId] = IERC20Metadata(token).symbol();
        tokenDecimals[tokenId] = IERC20Metadata(token).decimals();

        nextFreeTokenId++;

        return tokenId;
    }

    function mint(
        address to,
        uint256 id,
        uint256 value
    ) public onlyMintAuthority {
        _mint(to, id, value, bytes("0"));
    }

    function burn(
        address from,
        uint256 id,
        uint256 value
    ) public onlyMintAuthority {
        _burn(from, id, value);
    }

    // TODO: Use our uniswap clone to swap the tokens to USDC at market rate
    // Used when a user submits their earnings to the competition
    function consolidate() public {}

    /**
     * @dev removes all of the caller's holdings, if they wish to start over or something
     */
    function removeUserHoldings() public {
        for (uint256 id = 0; id < nextFreeTokenId; id++) {
            burn(msg.sender, id, balanceOf(msg.sender, id));
        }
    }

    /// @dev overridden to disable transferring, for a fair competition
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override {}

    /// @dev overridden to disable transferring, for a fair competition
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public override {}
}
