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

  const bridgeBSC = await ethers.getContractAt("BridgeBSC", "0x69cc18a33a0ae14F1796915c28F2B4E23Dc44EA6")
  const bridgeETH = await ethers.getContractAt("BridgeETH", "0xBbdebFb4e30cda8d626F083BA6558d97F098433e")

  const providerAlchemy = new ethers.providers.AlchemyProvider(
    "rinkeby",
    process.env.ALCHEMY_API_KEY
  );

  const ethSigner = new Wallet(process.env.PRIVATE_KEY, providerAlchemy);




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
