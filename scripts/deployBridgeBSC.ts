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
  const BridgeBSC = await ethers.getContractFactory("BridgeBSC");
  const bridgeBSC = await BridgeBSC.deploy("0x3e45AB08fc568827aB276D4510F91a2903dA4FD7");
  await bridgeBSC.deployed();


  console.log("BridgeBSC deployed to:", bridgeBSC.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0xf1A3d4e4AD16676fcC14Bf6020B21626FF577ea2