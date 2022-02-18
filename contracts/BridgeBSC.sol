pragma solidity ^0.8.4;

import "./Bridge.sol";

/** @notice This contract is just to simplify the deployment process. */
contract BridgeBSC is Bridge {
    constructor(address token) Bridge(token) {}
}

//v1 0x94890De12AB8ae3C3F6777130300Ba4719BD25e8
//v2 (with reedem) 0x51e458C045BAd7e667E57f69Fc580De9e7A142b2
