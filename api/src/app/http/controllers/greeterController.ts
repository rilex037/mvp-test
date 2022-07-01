import { Request, Response } from "express";

class GreeterController {
  public static index(req: Request, res: Response) {
    res.json({ success: true });
  }
}
export default GreeterController;
