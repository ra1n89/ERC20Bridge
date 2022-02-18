// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, Hardhat!");

    // await greeter.deployed();

    // console.log("Greeter deployed to:", greeter.address);

    //const bridgeBSC = await ethers.getContractAt("BridgeBSC", "0x94890De12AB8ae3C3F6777130300Ba4719BD25e8")
    const abi = require("C:/Projects/Brigge/artifacts/contracts/BridgeBSC.sol/BridgeBSC.json")

    const bridgeETH = await ethers.getContractAt("BridgeETH", "0x44FeA08ec92c9F1486e9D22520A166ef093B02d7")

    const ethProvider = new ethers.providers.AlchemyProvider(
        "rinkeby",
        process.env.ALCHEMY_API_KEY
    );

    const bscProvider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
    );

    const ethSigner = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, ethProvider);
    const bscSigner = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, bscProvider);
    console.log(bscSigner)
    const bridgeBSC = await new ethers.Contract("0x94890De12AB8ae3C3F6777130300Ba4719BD25e8", abi.abi, bscSigner)

    bridgeBSC.on("SwapInitialized", (_from, _to, _amount, _chainId, _nonce, _symbol) => {
        console.log(_from, _to, _amount, _chainId, _nonce, _symbol)

    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
