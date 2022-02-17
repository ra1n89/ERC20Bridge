pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IToken {
    function mint(address to, uint256 amount) external;

    function burn(address owner, uint256 amount) external;
}
