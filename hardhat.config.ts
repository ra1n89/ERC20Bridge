import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


//npx hardhat swap --address 0x69cc18a33a0ae14F1796915c28F2B4E23Dc44EA6 --to 0x7E670e2807F96a6df5F936Ec37ff92595CEFA3E4 --amount 1 --chainId 0 --nonce 0  --symbol BSCT --network rinkeby
task("swap", "swap token")
  .addParam("address", "The contract address on Rinkeby")
  .addParam("to", "to")
  .addParam("amount", "amount")
  .addParam("chainid", "chainid")
  .addParam("symbol", "symbol")
  .setAction(async (taskArgs, hre) => {
    const contract = await hre.ethers.getContractAt("BridgeBSC", taskArgs.address)
    const balance = await contract.swap(taskArgs.to, taskArgs.amount, taskArgs.chainid, taskArgs.symbol);
  });

task("reedem", "mint token")
  .addParam("address", "The contract address on Rinkeby")
  .addParam("to", "to")
  .addParam("amount", "amount")
  .addParam("nonce", "amount")
  .addParam("symbol", "symbol")
  .addParam("singnature", "symbol")
  .setAction(async (taskArgs, hre) => {
    const contract = await hre.ethers.getContractAt("BridgeBSC", taskArgs.address)
    const balance = await contract.swap(taskArgs.to, taskArgs.amount, taskArgs.nonce, taskArgs.symbol, taskArgs.singnature,);
  });




//https://data-seed-prebsc-1-s1.binance.org:8545/

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    binance: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts:
        process.env.PRIVATE_KEY_BSC !== undefined ? [process.env.PRIVATE_KEY_BSC] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    //apiKey: process.env.BSCSCAN_API_KEY,
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};


// module.exports = {
//   solidity: "0.8.4",
//   networks: {
//     rinkeby: {
//       url: process.env.RINKEBY_URL || "",
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
//   etherscan: {
//     // Your API key for Etherscan
//     // Obtain one at https://etherscan.io/
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   }
// };


export default config;
