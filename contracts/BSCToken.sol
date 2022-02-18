//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenBase.sol";

contract BSCToken is TokenBase {
    constructor() TokenBase("BSCToken", "BSCT") {
        _mint(msg.sender, (10000000000000000000000));
    }
}

//0x3e45AB08fc568827aB276D4510F91a2903dA4FD7
