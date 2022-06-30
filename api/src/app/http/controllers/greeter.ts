import { Request, Response } from "express";

class Greeter {
  public static index(req: Request, res: Response) {
    res.json({ success: true });
  }
}
export default Greeter;
