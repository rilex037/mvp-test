// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WakandaToken is ERC20 {
    constructor(uint256 initialSupply, address voteControllerAddress) ERC20("Wakanda Token", "WKND") {
        _mint(voteControllerAddress, initialSupply * (10**18));
    }
}
