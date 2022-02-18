//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenBase.sol";

contract ETHToken is TokenBase {
    constructor() TokenBase("ETHToken", "ETHT") {
        _mint(msg.sender, (10000000000000000000000));
    }
}

//0x49eA3a1089ec7dA043f7Bee3Fc967237014Db143
