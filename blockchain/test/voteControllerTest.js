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
        wakandaToken = await WakandaToken.deploy(15, deployAddresses.voteController);

        // Deploy VoteController
        const VoteController = await ethers.getContractFactory("VoteController");
        voteController = await VoteController.deploy(deployAddresses.wakandaToken);
    });

    /**
     * Check VoteController balance
     */
    it("Should check if VoteController has 15 tokens", async function () {
        expect(await wakandaToken.balanceOf(voteController.address)).to.equal(ethers.utils.parseEther("15"));
    });

    /**
     * REGISTER
     */
    it("Should give one token if user is not registered", async function () {
        for (let i = 0; i < 15; i++) {
            await voteController.connect(addrs[i]).award();
            await wakandaToken.connect(addrs[i]).approve(voteController.address, ethers.utils.parseEther("1"));
        }
        expect(await wakandaToken.balanceOf(addrs[0].address)).to.equal(ethers.utils.parseEther("1"));
        expect(await wakandaToken.balanceOf(voteController.address)).to.equal(ethers.utils.parseEther("0"));
    });
    it("Should give give error if user is already registered", async function () {
        await expect(voteController.connect(addrs[0]).award()).to.be.revertedWith("User is already registered!");
    });
    it("Should give error if balance of tokens is exhausted", async function () {
        await expect(voteController.connect(addrs[15]).award()).to.be.revertedWith(
            "Insufficient balance of supply tokens!"
        );
    });

    /**
     * VOTE
     */
    it("Should give error if user is not registered", async function () {
        await expect(voteController.connect(addrs[15]).vote(1, 1)).to.be.revertedWith("User is not registered!");
    });
    it("Should give error if user already voted", async function () {
        await voteController.connect(addrs[0]).vote(1, 1);
        await expect(voteController.connect(addrs[0]).vote(1, 2)).to.be.revertedWith("User is already voted!");
    });
    it("Should give error if user has no token balance", async function () {
        await expect(voteController.connect(addrs[1]).vote(11, 2)).to.be.revertedWith("Invalid candidate!");
    });
    it("Should give error if user has no token balance", async function () {
        await expect(voteController.connect(addrs[1]).vote(1, 2)).to.be.revertedWith("Insufficient balance of tokens");
    });
    it("Should vote for a third candidate", async function () {
        await voteController.connect(addrs[2]).vote(3, 1);
        candidate = await voteController.candidates(3);
        expect(candidate.voteCount).to.equal(1);
    });
    it("Should emit wining candidates event, with candidate 5 as leader", async function () {
        await voteController.connect(addrs[3]).vote(5, 1);
        await voteController.connect(addrs[4]).vote(5, 1);
    });
    it("Should emit wining candidates event, with candidate 6 as last", async function () {
        await voteController.connect(addrs[5]).vote(6, 1);
        await voteController.connect(addrs[6]).vote(6, 1);

        await voteController.connect(addrs[7]).vote(6, 1);


        await voteController.connect(addrs[8]).vote(3, 1);

        await voteController.connect(addrs[9]).vote(3, 1);
        await voteController.connect(addrs[10]).vote(3, 1);
        await voteController.connect(addrs[11]).vote(3, 1);

        await voteController.connect(addrs[12]).vote(1, 1);
        await voteController.connect(addrs[13]).vote(1, 1);

    });
});
