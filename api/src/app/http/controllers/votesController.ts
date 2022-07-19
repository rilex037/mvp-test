import { Request, Response } from "express";
import { ethers } from "ethers";
import Config from "../../../config/config";

import { VoteControllerABI } from "../../../config/abi/VoteControllerABI";

interface Candidate {
  name: string;
  age: number;
  cult: string;
  votes: number;
}

class VotesController {
  public static async index(req: Request, res: Response) {
    const provider = new ethers.providers.JsonRpcProvider(Config.INFURA);
    let contract = new ethers.Contract(
      String(Config.VOTE_CONTROLLER_ADDRESS),
      VoteControllerABI(),
      provider.getSigner(Config.ADDRESS)
    );
    let contractData = await contract.getCandidates();
    let candidates: Candidate[] = [];

    contractData.forEach((el: any) => {
      candidates.push({
        name: el.details.name,
        age: el.details.age.toNumber(),
        cult: el.details.cult,
        votes: el.voteCount.toNumber(),
      });
    });

    res.json({ candidates: candidates.sort((a, b) => b.votes - a.votes) });
  }
}

export default VotesController;
