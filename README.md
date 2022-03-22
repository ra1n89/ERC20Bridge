## ERC20 Bridge

This project implements a crosschain bridge contract for sending ERC20 tokens between Ethereum blockchain and Binance Smart Chain


- Function swap(): burn users token and emits ‘swapInitialized’
- Function redeem(): call ecrecover function and recover validator address from hashed message and signature. If address is correct then tokens sended to user

ETH:
token rinkeby: 0x49eA3a1089ec7dA043f7Bee3Fc967237014Db143
bridge rinkeby: https://rinkeby.etherscan.io/address/0x40ffa4C955EFAdEE55c64eAD5D18C28136351935#code

BSC:
token bsc testnet: 0x3e45AB08fc568827aB276D4510F91a2903dA4FD7
bridge bsc testnet: https://testnet.bscscan.com/address/0xf1cb2047cde6e04a496Dfbf36850a0839f61dE7f#code


## How to use

Create a .env file using the .env.example template

ETHERSCAN_API_KEY  
BSCSCAN_API_KEY  
RINKEBY_URL  
ROPSTEN_URL  
PRIVATE_KEY  
ALCHEMY_API_KEY  
ALCHEMY_API_KEY_ROPSTEN  
PRIVATE_KEY_BSC  
