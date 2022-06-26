const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Tests For WakandaToken", function () {
    beforeEach(async function () {
        addrs = await ethers.getSigners();

        // Deploy WakandaToken
        const WakandaToken = await ethers.getContractFactory("WakandaToken");
        wakandaToken = await WakandaToken.deploy(6000000, addrs[0].address);
    });

    it("Should check if owner has total supply", async function () {
        const ownerBalance = await wakandaToken.balanceOf(addrs[0].address);
        expect(await wakandaToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should let you send tokens to another address", async function () {
        await wakandaToken.transfer(addrs[1].address, ethers.utils.parseEther("100"));
        expect(await wakandaToken.balanceOf(addrs[1].address)).to.equal(ethers.utils.parseEther("100"));
    });

    it("Should display error for exceeding balance", async function () {
        await expect(wakandaToken.transfer(addrs[1].address, ethers.utils.parseEther("6000001"))).to.be.revertedWith(
            "transfer amount exceeds balance"
        );
    });
});
