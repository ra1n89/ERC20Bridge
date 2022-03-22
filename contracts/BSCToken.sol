//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenBase.sol";

contract BSCToken is TokenBase {
    constructor() TokenBase("BSCToken", "TTT") {
        _mint(msg.sender, (10000000000000000000000));
    }
}
