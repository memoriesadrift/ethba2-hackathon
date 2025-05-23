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
        require(_mintAuthority[msg.sender] == true, "Only mint authority can call this method!");
        _;
    }

    /**
      * @notice Creates a new mocked token based on a real token address
    */
    function createNewToken(address token) public onlyOwner() returns (uint256) {
        require(
            IERC165(token).supportsInterface(type(IERC20).interfaceId), 
            "Token doesn't support IERC20!"
        );
        require(
            IERC165(token).supportsInterface(type(IERC20Metadata).interfaceId), 
            "Token doesn't support IERC20Metadata!"
        );

        uint256 tokenId = nextFreeTokenId;

        // Save token metadata
        realTokenAddress[tokenId] = token;
        tokenNames[tokenId] =  IERC20Metadata(token).name();
        tokenSymbols[tokenId] = IERC20Metadata(token).symbol();
        tokenDecimals[tokenId] = IERC20Metadata(token).decimals();

        nextFreeTokenId++;

        return tokenId;
    }

    function mint() public onlyMintAuthority() {}
    function burn() public onlyMintAuthority() {}
    function consolidate() public {}
    function annulUserHoldings() public {}
}

