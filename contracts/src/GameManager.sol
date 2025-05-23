// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {TokenManager} from "./TokenManager.sol";

contract GameManager is Ownable {
    TokenManager public tokenManager;
    uint256 public testUSDCTokenId = 0;

    struct Player {
        bool isRegistered;
        uint256 registeredAt;
        uint256 leftAt;
        uint256 score;
    }

    mapping(address => Player) public players;

    event PlayerRegistered(address indexed player, uint256 registeredAt);
    event PlayerLeft(address indexed player, uint256 leftAt);

    constructor(address _tokenManager) Ownable(msg.sender) {
        tokenManager = TokenManager(_tokenManager);
    }

    function enterCompetition() external {
        require(!players[msg.sender].isRegistered, "Already registered");
        players[msg.sender].isRegistered = true;
        players[msg.sender].registeredAt = block.timestamp;
        players[msg.sender].score = 0;
        tokenManager.mint(msg.sender, testUSDCTokenId, 1e6);
        emit PlayerRegistered(msg.sender, players[msg.sender].registeredAt);
    }

    function leaveCompetition() external {
        require(players[msg.sender].isRegistered, "Not registered");
        tokenManager.removeUserHoldings(msg.sender);
        players[msg.sender].isRegistered = false;
        players[msg.sender].leftAt = block.timestamp;
        emit PlayerLeft(msg.sender, players[msg.sender].leftAt);
    }
}
