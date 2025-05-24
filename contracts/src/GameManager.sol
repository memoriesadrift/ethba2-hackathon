// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {TokenManager} from "./TokenManager.sol";

contract GameManager is Ownable {
    TokenManager public tokenManager;
    uint256 public testUSDCTokenId = 0;
    uint256 public testETHTokenId = 1;
    uint256 public testDinoTokenId = 2;
    uint256 public testVirtualTokenId = 3;
    bool public isSubmissionActive = true;

    struct Player {
        address playerAddress;
        bool isRegistered;
        uint256 registeredAt;
        uint256 leftAt;
        uint256 score;
    }

    mapping(address => Player) public players;

    Player[] public top5Players;

    event PlayerRegistered(address indexed player, uint256 registeredAt);
    event PlayerLeft(address indexed player, uint256 leftAt);

    constructor(address _tokenManager) Ownable(msg.sender) {
        tokenManager = TokenManager(_tokenManager);
    }

    function enterCompetition() external {
        require(!players[msg.sender].isRegistered, "Already registered");
        players[msg.sender].playerAddress = msg.sender;
        players[msg.sender].isRegistered = true;
        players[msg.sender].registeredAt = block.timestamp;
        players[msg.sender].score = 0;
        tokenManager.mint(msg.sender, testUSDCTokenId, 1e6);
        tokenManager.mint(msg.sender, testETHTokenId, 1e6);
        tokenManager.mint(msg.sender, testDinoTokenId, 1e6);
        tokenManager.mint(msg.sender, testVirtualTokenId, 1e6);
        emit PlayerRegistered(msg.sender, players[msg.sender].registeredAt);
    }

    function leaveCompetition() external {
        require(players[msg.sender].isRegistered, "Not registered");
        tokenManager.removeUserHoldings(msg.sender);
        players[msg.sender].isRegistered = false;
        players[msg.sender].leftAt = block.timestamp;
        emit PlayerLeft(msg.sender, players[msg.sender].leftAt);
    }

    function submitScore() external {
        require(players[msg.sender].isRegistered, "Not registered");
        require(isSubmissionActive, "Submission window is closed");
        players[msg.sender].score = tokenManager.consolidate(msg.sender);
        if (
            top5Players.length < 5 ||
            players[msg.sender].score > top5Players[4].score
        ) {
            updateTop5Players(msg.sender);
        }
        tokenManager.removeUserHoldings(msg.sender);
        players[msg.sender].isRegistered = false;
        players[msg.sender].leftAt = block.timestamp;
        emit PlayerLeft(msg.sender, players[msg.sender].leftAt);
    }

    function updateTop5Players(address player) internal {
        // update top 5 players based on their scores
        Player[] memory newTop5Players = new Player[](5);
        Player storage current = players[player];
        uint256 index = 0;

        while (index < 5 && index < top5Players.length) {
            if (current.score > top5Players[index].score) {
                newTop5Players[index] = current;
                current = top5Players[index];
            } else {
                newTop5Players[index] = top5Players[index];
            }
            index++;
        }
        if (index < 5) {
            newTop5Players[index] = current;
        }
        top5Players = newTop5Players;
    }

    function openSubmission() external onlyOwner {
        isSubmissionActive = true;
    }

    function closeSubmission() external onlyOwner {
        isSubmissionActive = false;
    }
}
