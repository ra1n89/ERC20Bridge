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

    it("Event 'SwapInitialized' works correctly", async function () {
        const _from = bob.address;
        const _to = alice.address;
        const amount = 10
        const _amount = ethers.utils.parseEther(amount.toString())
        let _chainId = 3;
        const _nonce = 0;
        const _symbol = "ETHT";
        expect(await bridgeBSC.swap(_to, _amount, _chainId, _symbol)).to.emit(bridgeBSC, "SwapInitialized").withArgs(_from, _to, _amount, _chainId, _nonce, _symbol)
    })

    it("Bridge works correct to BSC => ETH direction", async function () {
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
        const _symbol = "TTT";
        expect(await bridgeBSC.swap(_to, _amount, _chainId, _symbol)).to.emit(bridgeBSC, "SwapInitialized").withArgs(_from, _to, _amount, _chainId, _nonce, _symbol)
        expect(await bscToken.balanceOf(bob.address)).to.be.equal(_diff)
        expect(await bscToken.balanceOf(alice.address)).to.be.equal(0)
        expect(await ethToken.balanceOf(alice.address)).to.be.equal(_mintedToken)
        expect(await ethToken.balanceOf(bob.address)).to.be.equal(0)

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

    it("Bridge works correct to ETH => BSC direction", async function () {
        const _from = alice.address;
        const _to = bob.address;
        const amount = 10
        const mintedToken = 10000
        const diff = mintedToken - amount
        const sum = mintedToken + amount
        const _amount = ethers.utils.parseEther(amount.toString())
        const _mintedToken = ethers.utils.parseEther(mintedToken.toString())
        const _diff = ethers.utils.parseEther(diff.toString())
        const _sum = ethers.utils.parseEther(sum.toString())
        let _chainId = 97;
        const _nonce = 0;
        const _symbol = "TTT";
        expect(await bridgeETH.connect(alice).swap(_to, _amount, _chainId, _symbol)).to.emit(bridgeETH, "SwapInitialized").withArgs(_from, _to, _amount, _chainId, _nonce, _symbol)
        expect(await ethToken.balanceOf(alice.address)).to.be.equal(_diff)
        expect(await ethToken.balanceOf(bob.address)).to.be.equal(0)
        expect(await bscToken.balanceOf(bob.address)).to.be.equal(_mintedToken)
        expect(await bscToken.balanceOf(alice.address)).to.be.equal(0)

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

        expect(await ethToken.balanceOf(alice.address)).to.be.equal(_diff)
        expect(await ethToken.balanceOf(bob.address)).to.be.equal(0)
        expect(await bscToken.balanceOf(bob.address)).to.be.equal(_sum)
        expect(await bscToken.balanceOf(alice.address)).to.be.equal(0)
    })
})