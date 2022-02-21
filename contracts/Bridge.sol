//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./IToken.sol";
import "./BSCToken.sol";
import "./ETHToken.sol";
import "./TokenBase.sol";

contract Bridge {
    using ECDSA for bytes32;
    address public admin;
    TokenBase public token;
    uint256 public nonce;

    //вызываем фукнцию свап в сети эфира
    //выолняется логика
    //отправляется event
    //backend видит данные и разрешает вызвать функцию reedem в сети Бинанс
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
        uint256 _nonce,
        string memory _symbol
    ) external {
        token.burn(msg.sender, _amount);
        emit SwapInitialized(
            msg.sender,
            _to,
            _amount,
            _chainId,
            _nonce,
            _symbol
        );
    }

    // //далее вызываем функцию ридиим и токены минтятся
    function reedem(
        address _to,
        uint256 _amount,
        uint256 _nonce,
        string memory _symbol,
        bytes8 _signatureV,
        bytes32 _signatureR,
        bytes32 _signatureS
    ) external {
        bytes32 signedDataHash = keccak256(
            abi.encodePacked(_to, _amount, _nonce, _symbol)
        );
        bytes32 message = signedDataHash.toEthSignedMessageHash();

        // address signer = message.tryRecover(
        //     _signatureV,
        //     _signatureR,
        //     _signatureS
        // );
        // token.mint(_to, _amount);
        // message.recover(_signatureV);
    }
}

//пользователи не могут вызвать просто так функцию ридим и свап. ВАлидатор долженр проверить
// бекенд тоже не может распорядаться нашими деньгами
