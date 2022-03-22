pragma solidity ^0.8.4;

import "./Bridge.sol";

/** @notice This contract is just to simplify the deployment process. */
contract BridgeETH is Bridge {
    constructor(address token) Bridge(token) {}
}
