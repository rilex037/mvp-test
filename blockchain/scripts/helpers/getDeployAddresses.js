const {getContractAddress} = require("@ethersproject/address");

/**
 * Get addresses of the smart contracts that will be deployed
 */
exports.getDeployAddresses = async function (owner) {
    const transactionCount = await owner.getTransactionCount();

    return {
        wakandaToken: getContractAddress({
            from: owner.address,
            nonce: transactionCount,
        }),
        voteController: getContractAddress({
            from: owner.address,
            nonce: transactionCount + 1,
        }),
    };
};
