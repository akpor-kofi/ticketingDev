import { Request, Response } from "express";

export const getCurrentUser = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};
