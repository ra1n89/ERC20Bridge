pragma solidity ^0.8.4;

import "./Bridge.sol";

/** @notice This contract is just to simplify the deployment process. */
contract BridgeBSC is Bridge {
    constructor(address token) Bridge(token) {}
}
