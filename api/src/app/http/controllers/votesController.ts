import { Request, Response } from "express";
import Candidate from "../../models/candidate";
import { Sequelize } from "sequelize-typescript";
import Vote from "../../models/vote";

class VotesController {
  public static async list(req: Request, res: Response) {
    let votes = await Vote.findAll({
      raw: true,
      subQuery: false,
      attributes: [
        [Sequelize.col("candidate.name"), "candidate"],
        [Sequelize.fn("sum", Sequelize.col("votes.token_amount")), "votes"],
      ],
      include: [
        {
          model: Candidate,
          attributes: [],
        },
      ],
      group: ["votes.candidate_id", "candidate.name"],
      order: Sequelize.literal('"votes" DESC'),
    });

    res.json({ candidates: votes });
  }
}

export default VotesController;
