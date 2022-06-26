const {expect} = require("chai");
const {ethers} = require("hardhat");

const {getDeployAddresses} = require("../scripts/helpers/getDeployAddresses.js");

describe("Tests For the VoteController", function () {
    let voteController, wakandaToken;
    let addrs;
    let deployAddresses;

    before(async function () {
        addrs = await ethers.getSigners();
        //  console.log(ethers.Wallet.createRandom());
        // console.log(addrs[10]);

        /*
        console.log(addrs.map(function(i) {
            return i.address;
          }));
        */

        deployAddresses = await getDeployAddresses(addrs[0]);

        // Deploy WakandaToken
        const WakandaToken = await ethers.getContractFactory("WakandaToken");
        wakandaToken = await WakandaToken.deploy(10, deployAddresses.voteController);

        // Deploy VoteController
        const VoteController = await ethers.getContractFactory("VoteController");
        voteController = await VoteController.deploy(deployAddresses.wakandaToken);
    });

    /**
     * Check VoteController balance
     */
    it("Should check if VoteController has 10 tokens", async function () {
        expect(await wakandaToken.balanceOf(voteController.address)).to.equal(ethers.utils.parseEther("10"));
    });

    /**
     * REGISTER
     */
    it("Should give one token if user is not registered", async function () {
        for (let i = 0; i < 10; i++) {
            await voteController.connect(addrs[i]).award();
        }
        expect(await wakandaToken.balanceOf(addrs[0].address)).to.equal(ethers.utils.parseEther("1"));
        expect(await wakandaToken.balanceOf(voteController.address)).to.equal(ethers.utils.parseEther("0"));
    });
    it("Should give give error if user is already registered", async function () {
        await expect(voteController.connect(addrs[0]).award()).to.be.revertedWith("User is already registered!");
    });
    it("Should give error if balance of tokens is exhausted", async function () {
        await expect(voteController.connect(addrs[10]).award()).to.be.revertedWith(
            "Insufficient balance of supply tokens!"
        );
    });
});
