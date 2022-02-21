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

  const BridgeETH = await ethers.getContractFactory("BridgeETH");
  const bridgeETH = await BridgeETH.deploy("0x72F80717BDF3c1B1288Dee4611c30c3d73b3dC9E");
  await bridgeETH.deployed();

  console.log("BridgeETH deployed to:", bridgeETH.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x44FeA08ec92c9F1486e9D22520A166ef093B02d7
//ropsten//0x994Ef7003B670E53B1E9C82595f78F337d2B0070