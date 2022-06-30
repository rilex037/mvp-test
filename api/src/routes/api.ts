import { Router, Request, Response, NextFunction } from "express";
import Greeter from "../app/http/controllers/greeter";
import CandidatesList from "../app/http/controllers/candidatesList";
import Cors from "../app/http/middleware/cors";

const v1 = Router();

/**
 * Assign Middlewares
 */
v1.use("/", Cors.handle);

/**
 *  Assign Controllers
 */
v1.get("/", Greeter.index);
v1.get("/candidates-list", CandidatesList.list);

export default v1;
