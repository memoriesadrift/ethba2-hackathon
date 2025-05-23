// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
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

}

