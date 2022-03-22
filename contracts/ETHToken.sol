//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenBase.sol";

contract ETHToken is TokenBase {
    constructor() TokenBase("ETHToken", "TTT") {
        _mint(msg.sender, (10000000000000000000000));
    }
}
