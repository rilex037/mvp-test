import { Router, Request, Response, NextFunction } from "express";
import GreeterController from "../app/http/controllers/greeterController";
import CandidatesController from "../app/http/controllers/candidatesController";
import Cors from "../app/http/middleware/cors";

const v1 = Router();

/**
 * Assign Middlewares
 */
v1.use("/", Cors.handle);

/**
 *  Assign Controllers
 */
v1.get("/", GreeterController.index);

export default v1;
