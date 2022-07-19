// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./WakandaToken.sol";

import "hardhat/console.sol";

contract VoteController {
    address private wakandaTokenAddress;

    struct CandidateDetail {
        string name;
        uint age;
        string cult;
    }

    struct Candidate {
        uint id;
        uint voteCount;
        CandidateDetail details;
    }

    struct Voter {
        bool registered;
        bool voted;
    }

    mapping(address => Voter) public voter;

    Candidate[] public candidates;

    uint[] private wkArray = [0, 0, 0];

    event NewChallenger(uint indexed candidateId);

    constructor(address wakandaToken, CandidateDetail[] memory candidatesArray) {
        wakandaTokenAddress = wakandaToken;

        for (uint i = 0; i < candidatesArray.length; i++) {
            candidates.push(Candidate(i, 0, candidatesArray[i]));
        }
    }

    function award() external {
        uint256 dappBalance = WakandaToken(wakandaTokenAddress).balanceOf(address(this));

        require(voter[msg.sender].registered != true, "User is already registered!");
        require(dappBalance >= formatToken(1), "Insufficient balance of supply tokens!");

        WakandaToken(wakandaTokenAddress).transfer(msg.sender, formatToken(1));
        voter[msg.sender].registered = true;
    }

    function vote(uint candidateId, uint256 tokens) external {
        uint256 voterBalance = WakandaToken(wakandaTokenAddress).balanceOf(address(msg.sender));

        require(voter[msg.sender].registered == true, "User is not registered!");
        require(voter[msg.sender].voted != true, "User already voted!");
        require(candidateId >= 0 && candidateId < 10, "Invalid candidate!");
        require(voterBalance >= formatToken(tokens), "Insufficient balance of tokens!");

        WakandaToken(wakandaTokenAddress).transferFrom(address(msg.sender), address(this), formatToken(tokens));
        candidates[candidateId].voteCount += tokens;
        voter[msg.sender].voted = true;
        calculcatewkArray(candidateId);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function winningCandidates() public view returns (uint[] memory) {
        return wkArray;
    }

    function calculcatewkArray(uint candidateId) private {
        int target = -1;

        if (wkArray[0] == candidateId) {
            target = 0;
        } else if (wkArray[1] == candidateId) {
            target = 1;
        } else if (wkArray[2] == candidateId) {
            target = 2;
        }

        if (candidates[wkArray[0]].voteCount <= candidates[candidateId].voteCount) {
            if (target == -1) {
                emit NewChallenger(candidateId);
                wkArray[2] = wkArray[1];
                wkArray[1] = wkArray[0];
                wkArray[0] = candidateId;
            } else if (target == 1) {
                wkArray[1] = wkArray[0];
                wkArray[0] = candidateId;
            } else if (target == 2) {
                wkArray[2] = wkArray[1];
                wkArray[1] = wkArray[0];
                wkArray[0] = candidateId;
            }
        } else if (candidates[wkArray[1]].voteCount <= candidates[candidateId].voteCount) {
            if (target == -1) {
                emit NewChallenger(candidateId);
                wkArray[2] = wkArray[1];
                wkArray[1] = candidateId;
            } else if (target == 0) {
                wkArray[1] = candidateId;
            } else if (target == 2) {
                wkArray[2] = wkArray[1];
                wkArray[1] = candidateId;
            }
        } else if (candidates[wkArray[2]].voteCount <= candidates[candidateId].voteCount) {
            if (target == -1) {
                emit NewChallenger(candidateId);
                wkArray[2] = candidateId;
            }
        }
    }

    function formatToken(uint256 number) private pure returns (uint256) {
        return number * (10**18);
    }
}
