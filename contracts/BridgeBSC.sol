pragma solidity ^0.8.4;

import "./Bridge.sol";

/** @notice This contract is just to simplify the deployment process. */
contract BridgeBSC is Bridge {
    constructor(address token) Bridge(token) {}
}

//0x69cc18a33a0ae14F1796915c28F2B4E23Dc44EA6
