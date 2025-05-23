// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface GameToken is IERC20 {
    function mint(address to, uint256 amount) external;

    function burn(address from, uint256 amount) external;
}

contract GameManager is Ownable {
    GameToken public testETH;

    struct Player {
        bool isRegistered;
        uint256 registeredAt;
        uint256 leftAt;
        uint256 score;
    }

    mapping(address => Player) public players;

    event PlayerRegistered(address indexed player, uint256 registeredAt);
    event PlayerLeft(address indexed player, uint256 leftAt);

    constructor(GameToken _testETH) Ownable(msg.sender) {
        testETH = _testETH;
    }

    function register() external {
        require(!players[msg.sender].isRegistered, "Already registered");
        players[msg.sender].isRegistered = true;
        players[msg.sender].registeredAt = block.timestamp;
        testETH.mint(msg.sender, 100 ether);
        emit PlayerRegistered(msg.sender, players[msg.sender].registeredAt);
    }

    function leaveCompetition() external {
        require(players[msg.sender].isRegistered, "Not registered");
        testETH.burn(msg.sender, testETH.balanceOf(msg.sender));
        players[msg.sender].isRegistered = false;
        players[msg.sender].leftAt = block.timestamp;
        emit PlayerLeft(msg.sender, players[msg.sender].leftAt);
    }
}
