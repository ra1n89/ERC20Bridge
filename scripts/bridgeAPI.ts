import { ethers } from "hardhat";

async function main() {

    const abiBSC = require("C:/Projects/Brigge/artifacts/contracts/BridgeBSC.sol/BridgeBSC.json")
    const abiETH = require("C:/Projects/Brigge/artifacts/contracts/BridgeETH.sol/BridgeETH.json")

    const ethProvider = new ethers.providers.AlchemyProvider(
        "ropsten",
        process.env.ALCHEMY_API_KEY_ROPSTEN
    );

    const bscProvider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
    );

    const ethSigner = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, ethProvider);
    const bscSigner = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, bscProvider);
    console.log(bscSigner)
    const bridgeBSC = await new ethers.Contract("0x51e458C045BAd7e667E57f69Fc580De9e7A142b2", abiBSC.abi, bscSigner)
    const bridgeETH = await new ethers.Contract("0x994Ef7003B670E53B1E9C82595f78F337d2B0070", abiETH.abi, ethSigner)

    bridgeBSC.on("SwapInitialized", (_from, _to, _amount, _chainId, _nonce, _symbol) => {
        ethSigner
        console.log(_from, _to, _amount, _chainId, _nonce, _symbol)
        bridgeETH.reedem("0x7E670e2807F96a6df5F936Ec37ff92595CEFA3E4", _amount, 2)
    })
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
