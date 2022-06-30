import { Request, Response } from "express";
import Cult from "../../models/cult";
import Candidates from "../../models/candidates";
import { Sequelize } from "sequelize-typescript";

class CandidatesList {
  public static async index(req: Request, res: Response) {
    res.json({ clans: await Cult.findAll() });
  }

  public static async list(req: Request, res: Response) {
    let candidates = await Candidates.findAll({
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
export default CandidatesList;
