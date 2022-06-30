import { Request, Response, NextFunction } from "express";

class Cors {
  public static handle(req: Request, res: Response, next: NextFunction): void {
    res.set({
      "Access-Control-Allow-Origin": "*",
    });
    return next();
  }
}

export default Cors;
