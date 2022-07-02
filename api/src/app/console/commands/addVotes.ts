import { ethers } from "ethers";
import Config from "../../../config/config";
import { VoteControllerABI } from "../../../config/abi/VoteControllerABI";
import Vote from "../../models/vote";
import { Sequelize } from "sequelize-typescript";

const AddVotes = async () => {
  let provider = new ethers.providers.JsonRpcProvider(Config.BLOCKCHAIN_URL);

  let lastDbBlock = await getlastDbBlock();
  let lastEthBlock = await provider.getBlock("latest");

  let events = await getEvents();

  events.forEach((element) => {
    Vote.findOrCreate({
      where: {
        block_id: element.blockNumber,
      },
      defaults: {
        block_id: element.blockNumber,
        user_address: element.args?.sender,
        token_amount: parseInt(element.args?.votes),
        candidate_id: parseInt(element.args?.candidateId),
      },
    });
  });

  function getEvents(): Promise<ethers.Event[]> {
    let addr = Config.VOTE_CONTROLLER_ADDRESS as string;
    const voteControllerContract = new ethers.Contract(
      addr,
      VoteControllerABI(),
      provider
    );
    let filterFrom = voteControllerContract.filters.NewVote();

    return voteControllerContract.queryFilter(
      filterFrom,
      lastDbBlock?.block_id,
      lastEthBlock.number
    );
  }

  function getlastDbBlock(): Promise<Vote | null> {
    return Vote.findOne({
      attributes: ["block_id"],
      order: [["block_id", "DESC"]],
    });
  }
};

export default AddVotes;
