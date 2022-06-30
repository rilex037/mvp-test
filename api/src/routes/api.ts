import { Router, Request, Response, NextFunction } from "express";
import Greeter from "../app/http/controllers/greeter";
import CandidatesList from "../app/http/controllers/candidatesList";

const v1 = Router();

/**
 * Assign Middleware
 */
v1.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("middleware called!");
  return next();
});

/**
 *  Assign Controllers
 */
v1.get("/", Greeter.index);
v1.get("/candidates-list", CandidatesList.list);

export default v1;
