import { Router, Request, Response, NextFunction } from "express";
import GreeterController from "../app/http/controllers/greeterController";
import CandidatesController from "../app/http/controllers/candidatesController";
import Cors from "../app/http/middleware/cors";
import VotesController from "../app/http/controllers/votesController";

const v1 = Router();

/**
 * Assign Middlewares
 */
v1.use("/", Cors.handle);

/**
 *  Assign Controllers
 */
v1.get("/", GreeterController.index);
v1.get("/candidates", CandidatesController.list);
v1.get("/votes", VotesController.list);

export default v1;
