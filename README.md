Контракт кроссчейн моста для отправки токенов стандарта ERC-20 между сетями Ethereum и Binance Smart chain.

Crosschain ERC20 Tokens Bridge between Ethereum and BSChain

- Функция swap(): списывает токены с пользователя и испускает event ‘swapInitialized’
- Функция redeem(): вызывает функцию ecrecover и восстанавливает по хэшированному сообщению и сигнатуре адрес валидатора, если адрес совпадает с адресом указанным на контракте моста то пользователю отправляются токены

ETH:
token rinkeby: 0x49eA3a1089ec7dA043f7Bee3Fc967237014Db143
bridge rinkeby: https://rinkeby.etherscan.io/address/0x40ffa4C955EFAdEE55c64eAD5D18C28136351935#code

BSC:
token bsc testnet: 0x3e45AB08fc568827aB276D4510F91a2903dA4FD7
bridge bsc testnet: https://testnet.bscscan.com/address/0xf1cb2047cde6e04a496Dfbf36850a0839f61dE7f#code
