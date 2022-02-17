//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenBase.sol";

contract ETHToken is TokenBase {
    constructor() TokenBase("ETHToken", "ETHT") {
        _mint(msg.sender, (1000 * 10) ^ 18);
    }
}

//0x9eBDF9AC0752f7C947A44Af615872D12c5416042
