import { Request, Response } from "express";
import Cult from "../../models/cult";
import Candidate from "../../models/candidate";
import { Sequelize } from "sequelize-typescript";

class CandidatesController {
  public static async list(req: Request, res: Response) {
    let candidates = await Candidate.findAll({
      raw: true,
      attributes: ["name", "age", [Sequelize.col("cult.name"), "cult"]],
      include: [
        {
          model: Cult,
          attributes: [],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json({ candidates: candidates });
  }
}

export default CandidatesController;
