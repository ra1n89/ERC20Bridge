//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenBase is ERC20 {
    address public admin;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        admin = msg.sender;
    }

    function updateAdmin(address newAdmin) external {
        //require(msg.sender == admin, "only admin");
        admin = newAdmin;
    }

    function mint(address to, uint256 amount) external {
        //require(msg.sender == admin, "only admin");
        _mint(to, amount);
    }

    function burn(address owner, uint256 amount) external {
        //require(msg.sender == admin, "only admin");
        _burn(owner, amount);
    }
}
