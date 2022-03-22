//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./IToken.sol";
import "./BSCToken.sol";
import "./ETHToken.sol";
import "./TokenBase.sol";

/** @title Crosschain bridge
 * @author Rishat Akhmetzyanov
 * @notice not for using in real projects beacause it's not audited
 * @notice backend function implements in testBrdge
 */
contract Bridge {
    using ECDSA for bytes32;
    address public admin;
    TokenBase public token;
    uint256 public nonce;
    bytes32 public dataHash;
    mapping(uint256 => bool) transactionIsDone;

    event SwapInitialized(
        address _from,
        address _to,
        uint256 _amount,
        uint256 _chainId,
        uint256 _nonce,
        string _symbol
    );

    constructor(address _token) {
        admin = msg.sender;
        token = TokenBase(_token);
    }

    function swap(
        address _to,
        uint256 _amount,
        uint256 _chainId,
        string memory _symbol
    ) external returns (bytes32) {
        require(_chainId == 3 || _chainId == 97, "choose correct chainId");
        token.burn(msg.sender, _amount);

        emit SwapInitialized(
            msg.sender,
            _to,
            _amount,
            _chainId,
            nonce,
            _symbol
        );

        nonce++;
    }

    function reedem(
        address _to,
        uint256 _amount,
        uint256 _nonce,
        string memory _symbol,
        bytes memory signature
    ) external {
        require(
            transactionIsDone[_nonce] == false,
            "transaction already proccesed"
        );
        bytes32 signedDataHash = keccak256(
            abi.encode(_to, _amount, _nonce, _symbol)
        );
        bytes32 message = ECDSA.toEthSignedMessageHash(signedDataHash);
        address signer = message.recover(signature);
        require(signer == address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266));
        token.mint(_to, _amount);
        transactionIsDone[_nonce] = true;
    }
}
