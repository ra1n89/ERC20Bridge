pragma solidity ^0.8.4;

import "./Bridge.sol";

/** @notice This contract is just to simplify the deployment process. */
contract BridgeBSC is Bridge {
    constructor(address token) Bridge(token) {}
}

//0x94890De12AB8ae3C3F6777130300Ba4719BD25e8
