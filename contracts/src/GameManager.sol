// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//TODO upgrade when token manager is added
interface TokenManager {

}

contract GameManager is Ownable {
    TokenManager public testETH;

    struct Player {
        bool isRegistered;
        uint256 registeredAt;
        uint256 leftAt;
        uint256 score;
    }

    mapping(address => Player) public players;

    event PlayerRegistered(address indexed player, uint256 registeredAt);
    event PlayerLeft(address indexed player, uint256 leftAt);

    constructor() Ownable(msg.sender) {}

    function register() external {
        require(!players[msg.sender].isRegistered, "Already registered");
        players[msg.sender].isRegistered = true;
        players[msg.sender].registeredAt = block.timestamp;
        players[msg.sender].score = 0;
        // TODO call token manager to mint test token
        emit PlayerRegistered(msg.sender, players[msg.sender].registeredAt);
    }

    function leaveCompetition() external {
        require(players[msg.sender].isRegistered, "Not registered");
        // TODO call token manager to burn full use's balance of test token
        players[msg.sender].isRegistered = false;
        players[msg.sender].leftAt = block.timestamp;
        emit PlayerLeft(msg.sender, players[msg.sender].leftAt);
    }
}
