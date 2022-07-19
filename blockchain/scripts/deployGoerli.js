const {ethers} = require("hardhat");
const {getDeployAddresses} = require("../scripts/helpers/getDeployAddresses.js");
const candidates = require("../scripts/helpers/getCandidates.js");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://goerli.infura.io/v3/e7a8b10fb7394e128c97723db70ed5f9"
    );
    const owner = new ethers.Wallet(PR_KEY, provider);
    deployAddresses = await getDeployAddresses(owner);

    // Deploy WakandaToken
    const WakandaToken = await ethers.getContractFactory("WakandaToken");
    wakandaToken = await WakandaToken.deploy(6000000, deployAddresses.voteController);
    await wakandaToken.deployed();
    console.log("WakandaToken deployed to:", wakandaToken.address);

    // Deploy VoteController
    const VoteController = await ethers.getContractFactory("VoteController");
    voteController = await VoteController.deploy(deployAddresses.wakandaToken, await candidates.getCandidates());
    await voteController.deployed();
    console.log("VoteController deployed to:", voteController.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
