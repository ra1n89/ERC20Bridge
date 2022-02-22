import { Provider } from "@ethersproject/abstract-provider";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { providers } from "ethers";
import { ethers, network } from "hardhat";
import { BridgeBSC, BridgeBSC__factory, BridgeETH, BridgeETH__factory, BSCToken, BSCToken__factory, ETHToken, } from "../typechain";



describe("Brigde", function () {
    let bob: SignerWithAddress,
        alice: SignerWithAddress,
        bscToken: BSCToken,
        ethToken: ETHToken,
        bridgeBSC: BridgeBSC,
        bridgeETH: BridgeETH;

    before(async () => {
        [bob, alice] = await ethers.getSigners();
    })

    beforeEach(async () => {
        const BSCToken = await ethers.getContractFactory("BSCToken") as BSCToken__factory;
        const ETHToken = await ethers.getContractFactory("BSCToken") as BSCToken__factory;
        const BridgeBSC = await ethers.getContractFactory("BridgeBSC") as BridgeBSC__factory;
        const BridgeETH = await ethers.getContractFactory("BridgeETH") as BridgeETH__factory;

        bscToken = await BSCToken.deploy() as BSCToken;
        await bscToken.deployed();
        ethToken = await ETHToken.connect(alice).deploy() as ETHToken;
        await ethToken.deployed();
        bridgeBSC = await BridgeBSC.deploy(bscToken.address) as BridgeBSC;
        await bridgeBSC.deployed();
        bridgeETH = await BridgeETH.deploy(ethToken.address) as BridgeETH;
        await bridgeETH.deployed();
    })

    it("Contracts deployed ", async function () {
        expect(await bscToken.address).not.to.be.equal(0x0000000000000000000000000000000000000000)
        expect(await ethToken.address).not.to.be.equal(0x0000000000000000000000000000000000000000);
        expect(await bridgeBSC.address).not.to.be.equal(0x0000000000000000000000000000000000000000);
        expect(await bridgeETH.address).not.to.be.equal(0x0000000000000000000000000000000000000000);

    })

    it("Bob's bscToken and Alice's ethToken started balances correct ", async function () {
        const mintedToken = ethers.utils.parseEther("10000")
        expect(await bscToken.balanceOf(bob.address)).to.be.equal(mintedToken)
        expect(await bscToken.balanceOf(alice.address)).to.be.equal(0)
        expect(await ethToken.balanceOf(alice.address)).to.be.equal(mintedToken)
        expect(await ethToken.balanceOf(bob.address)).to.be.equal(0)
    })

    it("Nonce counts correctly", async function () {
        const _from = bob.address;
        const _to = alice.address;
        const amount = 10
        const _amount = ethers.utils.parseEther(amount.toString())
        let _chainId = 3;
        const _nonce1 = 0;
        const _nonce2 = 1;
        const _symbol = "ETHT";
        expect(await bridgeBSC.swap(_to, _amount, _chainId, _symbol)).to.emit(bridgeBSC, "SwapInitialized").withArgs(_from, _to, _amount, _chainId, _nonce1, _symbol)
        expect(await bridgeBSC.swap(_to, _amount, _chainId, _symbol)).to.emit(bridgeBSC, "SwapInitialized").withArgs(_from, _to, _amount, _chainId, _nonce2, _symbol)
    })


    it("Bridge ", async function () {

        // const ethProvider = new ethers.providers.AlchemyProvider(
        //     "ropsten",
        //     process.env.ALCHEMY_API_KEY_ROPSTEN
        // );

        // const bscProvider = new ethers.providers.JsonRpcProvider(
        //     "https://data-seed-prebsc-1-s1.binance.org:8545/"
        // );

        // const ethSigner = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, ethers.provider);
        // const bscSigner = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, ethers.provider);

        // const bridgeBSC = await new ethers.ContractAt("0x51e458C045BAd7e667E57f69Fc580De9e7A142b2", abiBSC.abi, bscSigner)
        // const bridgeETH = await new ethers.Contract("0x994Ef7003B670E53B1E9C82595f78F337d2B0070", abiETH.abi, ethSigner)

        //await bridgeETH.reedem("0x7E670e2807F96a6df5F936Ec37ff92595CEFA3E4", 1000000000000000, 2)
        const _from = bob.address;
        const _to = alice.address;
        const amount = 10
        const mintedToken = 10000
        const diff = mintedToken - amount
        const sum = mintedToken + amount
        const _amount = ethers.utils.parseEther(amount.toString())
        const _mintedToken = ethers.utils.parseEther(mintedToken.toString())
        const _diff = ethers.utils.parseEther(diff.toString())
        const _sum = ethers.utils.parseEther(sum.toString())
        let _chainId = 3;
        const _nonce = 0;
        const _symbol = "ETHT";
        expect(await bridgeBSC.swap(_to, _amount, _chainId, _symbol)).to.emit(bridgeBSC, "SwapInitialized").withArgs(_from, _to, _amount, _chainId, _nonce, _symbol)

        expect(await bscToken.balanceOf(bob.address)).to.be.equal(_diff)
        expect(await bscToken.balanceOf(alice.address)).to.be.equal(0)
        expect(await ethToken.balanceOf(alice.address)).to.be.equal(_mintedToken)
        expect(await ethToken.balanceOf(bob.address)).to.be.equal(0)

        const message = {
            _to,
            _amount,
            _nonce,
            _symbol
        }

        const signature = await bob.signMessage(
            ethers.utils.arrayify(
                ethers.utils.keccak256(
                    ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'uint256', 'string'], [_to, _amount, _nonce, _symbol])
                )
            )
        );


        if (_chainId == 97) {
            bridgeBSC.reedem(_to, _amount, _nonce, _symbol, signature)
        } else if (_chainId === 3) {
            bridgeETH.reedem(_to, _amount, _nonce, _symbol, signature)
        }

        expect(await bscToken.balanceOf(bob.address)).to.be.equal(_diff)
        expect(await bscToken.balanceOf(alice.address)).to.be.equal(0)
        expect(await ethToken.balanceOf(alice.address)).to.be.equal(_sum)
        expect(await ethToken.balanceOf(bob.address)).to.be.equal(0)

    })

})






/*



// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.


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

    //await bridgeETH.reedem("0x7E670e2807F96a6df5F936Ec37ff92595CEFA3E4", 1000000000000000, 2)

    bridgeBSC.on("SwapInitialized", (_from, _to, _amount, _chainId, _nonce, _symbol) => {
        ethSigner
        console.log(_from, _to, _amount, _chainId, _nonce, _symbol)
        bridgeETH.reedem("0x7E670e2807F96a6df5F936Ec37ff92595CEFA3E4", _amount, 2)
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});






*/
