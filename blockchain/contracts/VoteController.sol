// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WakandaToken.sol";

import "hardhat/console.sol";

contract VoteController {
    address private wakandaTokenAddress;

    struct Voter {
        bool registered;
        bool voted;
    }

    mapping(address => Voter) private voter;
    address[] private userAddress;

    constructor(address wakandaToken) {
        wakandaTokenAddress = wakandaToken;
    }

    function award() external {
        uint256 dappBalance = WakandaToken(wakandaTokenAddress).balanceOf(address(this));

        require(voter[msg.sender].registered != true, "User is already registered!");
        require(dappBalance >= formatToken(1), "Insufficient balance of supply tokens!");

        WakandaToken(wakandaTokenAddress).transfer(msg.sender, formatToken(1));
        voter[msg.sender].registered = true;
        userAddress.push(msg.sender);
    }

    function getVoters() external view returns (address[] memory) {
        return userAddress;
    }

    function formatToken(uint256 number) private pure returns (uint256) {
        return number * (10**18);
    }
}
