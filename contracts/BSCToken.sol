//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenBase.sol";

contract BSCToken is TokenBase {
    constructor() TokenBase("BSCToken", "BSCT") {
        _mint(msg.sender, (1000 * 10) ^ 18);
    }
}

//0x5206b31964e14BEabeb24DA0c676058132E527C6
